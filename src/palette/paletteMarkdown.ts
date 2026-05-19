import { normalizeHex } from '../theme/colorMath';

export interface EditablePaletteColor {
  id: string;
  name: string;
  hex: string;
  role: string;
}

export interface PaletteMarkdownInput {
  name: string;
  source: string;
  mood: string;
  colors: EditablePaletteColor[];
}

export const defaultPaletteRoles = ['background', 'secondary', 'primary', 'accent', 'surface'];

export function normalizeEditableHex(value: string): string {
  try {
    return normalizeHex(value).toUpperCase();
  } catch {
    return value.trim().toUpperCase();
  }
}

export function createPaletteFileName(name: string): string {
  const slug = name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

  return `${slug || 'imported-palette'}.md`;
}

function escapeYamlString(value: string): string {
  return value.replaceAll('"', '\\"');
}

export function createPaletteMarkdown({ name, source, mood, colors }: PaletteMarkdownInput): string {
  const safeName = name.trim() || 'Imported Palette';
  const lines = [
    '---',
    `name: ${safeName}`,
    'tags: [imported, palette]',
  ];

  if (mood.trim()) {
    lines.push(`mood: ${mood.trim()}`);
  }

  if (source.trim()) {
    lines.push(`source: ${source.trim()}`);
  }

  lines.push('colors:');
  for (const color of colors) {
    lines.push(`  - name: ${escapeYamlString(color.name.trim() || 'Color')}`);
    lines.push(`    hex: "${normalizeEditableHex(color.hex)}"`);
    lines.push(`    role: ${color.role || 'accent'}`);
  }

  lines.push('---', '', '## 感受', mood.trim() || 'Imported from image. Adjust names, roles, and colors before saving.');

  return `${lines.join('\n')}\n`;
}
