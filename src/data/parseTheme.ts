import { Buffer } from 'buffer';
import matter from 'gray-matter';
import type { GradientToken, PaletteColor, ParsedThemeSource, SourceKind, TypographyToken } from '../types/theme';

type Frontmatter = Record<string, unknown>;

if (!globalThis.Buffer) {
  globalThis.Buffer = Buffer;
}

interface PreparedMarkdown {
  markdown: string;
  warnings: string[];
}

function normalizePath(filePath: string): string {
  return filePath.replaceAll('\\', '/').replace(/^(\.\.\/)+/, '');
}

function nameFromPath(filePath: string): string {
  const fileName = normalizePath(filePath).split('/').pop() ?? 'theme';
  return fileName.replace(/\.[^.]+$/, '').replace(/[-_]+/g, ' ');
}

function slugify(value: string): string {
  const slug = value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

  return slug || 'theme';
}

function normalizeTags(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.map(String).map((tag) => tag.trim()).filter(Boolean);
  }

  if (typeof value === 'string') {
    return value.split(',').map((tag) => tag.trim()).filter(Boolean);
  }

  return [];
}

function normalizeRecord(value: unknown): Record<string, string> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return {};
  }

  return Object.fromEntries(
    Object.entries(value as Record<string, unknown>).map(([key, child]) => [key, String(child)]),
  );
}

function normalizeTypography(value: unknown): Record<string, TypographyToken> | undefined {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return undefined;
  }

  return Object.fromEntries(
    Object.entries(value as Record<string, Record<string, unknown>>).map(([name, token]) => [
      name,
      {
        fontFamily: String(token.fontFamily ?? 'Inter'),
        fontSize: String(token.fontSize ?? '16px'),
        fontWeight: String(token.fontWeight ?? '400'),
        lineHeight: String(token.lineHeight ?? '24px'),
        ...(token.letterSpacing !== undefined ? { letterSpacing: String(token.letterSpacing) } : {}),
      },
    ]),
  );
}

function normalizePaletteColors(value: unknown): PaletteColor[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .filter((entry): entry is Record<string, unknown> => Boolean(entry) && typeof entry === 'object')
    .map((entry, index) => ({
      name: String(entry.name ?? `Color ${index + 1}`),
      hex: String(entry.hex ?? ''),
      ...(entry.role !== undefined ? { role: String(entry.role) } : {}),
    }));
}

function normalizeGradients(value: unknown): GradientToken[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .filter((entry): entry is Record<string, unknown> => Boolean(entry) && typeof entry === 'object')
    .flatMap((entry) => {
      if (entry.from === undefined || entry.to === undefined) {
        return [];
      }

      return [{ from: String(entry.from), to: String(entry.to) }];
    });
}

function normalizeComponents(value: unknown): ParsedThemeSource['components'] {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return undefined;
  }

  return value as ParsedThemeSource['components'];
}

function getIndent(line: string): number {
  return line.match(/^\s*/)?.[0].length ?? 0;
}

function dedupeFrontmatterKeys(frontmatter: string): { frontmatter: string; warnings: string[] } {
  const lines = frontmatter.split(/\r?\n/);
  const lastSeen = new Map<string, number>();
  const duplicateLines = new Set<number>();
  const warnings: string[] = [];
  const scopeStack: Array<{ indent: number; key: string }> = [];
  const listCounters = new Map<string, number>();

  lines.forEach((line, index) => {
    const listItemMatch = line.match(/^(\s*)-\s+([A-Za-z0-9_-]+):(?:\s*(.*))?$/);
    const match = listItemMatch ?? line.match(/^(\s*)([A-Za-z0-9_-]+):(?:\s*(.*))?$/);
    if (!match) {
      return;
    }

    const indent = getIndent(line);
    while (scopeStack.length > 0 && scopeStack[scopeStack.length - 1].indent >= indent) {
      scopeStack.pop();
    }

    if (listItemMatch) {
      const parentPath = scopeStack.map((entry) => entry.key).join('.');
      const listKey = `${parentPath}@${indent}`;
      const nextIndex = (listCounters.get(listKey) ?? -1) + 1;
      listCounters.set(listKey, nextIndex);
      scopeStack.push({ indent, key: `[${nextIndex}]` });
    }

    const key = match[2];
    const path = [...scopeStack.map((entry) => entry.key), key].join('.');
    const previousIndex = lastSeen.get(path);
    if (previousIndex !== undefined) {
      duplicateLines.add(previousIndex);
      warnings.push(`Duplicate YAML key "${path}" encountered; last value was used.`);
    }
    lastSeen.set(path, index);

    const value = match[3]?.trim() ?? '';
    const isFullyQuoted =
      (value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"));
    if (value.includes('"') && !isFullyQuoted) {
      lines[index] = listItemMatch
        ? `${match[1]}- ${key}: '${value.replaceAll("'", "''")}'`
        : `${match[1]}${key}: '${value.replaceAll("'", "''")}'`;
      warnings.push(`Mixed quoted YAML scalar "${path}" was wrapped for parsing.`);
    }

    if (value === '') {
      scopeStack.push({ indent: listItemMatch ? indent + 2 : indent, key });
    }
  });

  return {
    frontmatter: lines.filter((_, index) => !duplicateLines.has(index)).join('\n'),
    warnings,
  };
}

function prepareMarkdown(rawMarkdown: string): PreparedMarkdown {
  const match = rawMarkdown.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) {
    return { markdown: rawMarkdown, warnings: ['Missing YAML frontmatter block.'] };
  }

  const deduped = dedupeFrontmatterKeys(match[1]);
  const markdown = rawMarkdown.replace(match[0], `---\n${deduped.frontmatter}\n---`);

  return { markdown, warnings: deduped.warnings };
}

export function parseThemeSource(rawMarkdown: string, filePath: string, sourceKind: SourceKind): ParsedThemeSource {
  const prepared = prepareMarkdown(rawMarkdown);
  const parsed = matter(prepared.markdown);
  const data = parsed.data as Frontmatter;
  const normalizedPath = normalizePath(filePath);
  const fallbackName = nameFromPath(normalizedPath);
  const name = String(data.name ?? fallbackName);
  const warnings: string[] = [...prepared.warnings];

  if (!data.name) {
    warnings.push('Missing "name" frontmatter; derived from file name.');
  }

  if (!data.colors) {
    warnings.push('Missing "colors" frontmatter.');
  }

  const colors = sourceKind === 'palette' ? normalizePaletteColors(data.colors) : normalizeRecord(data.colors);

  return {
    sourceKind,
    filePath: normalizedPath,
    id: slugify(String(data.id ?? name)),
    name,
    tags: normalizeTags(data.tags),
    source: data.source !== undefined ? String(data.source) : undefined,
    mood: data.mood !== undefined ? String(data.mood) : undefined,
    colors,
    gradients: normalizeGradients(data.gradients),
    typography: normalizeTypography(data.typography),
    rounded: data.rounded ? normalizeRecord(data.rounded) : undefined,
    spacing: data.spacing ? normalizeRecord(data.spacing) : undefined,
    components: normalizeComponents(data.components),
    markdownBody: parsed.content.trim(),
    warnings,
  };
}
