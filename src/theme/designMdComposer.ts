import type { NormalizedTheme } from '../types/theme';

export const designMdSectionConfigs = [
  { id: 'overview', label: 'Overview', headings: ['Overview', 'Introduction', 'Concept'] },
  { id: 'colors', label: 'Colors', headings: ['Colors', 'Color', 'Color Palette'] },
  { id: 'typography', label: 'Typography', headings: ['Typography', 'Type', 'Fonts'] },
  { id: 'spacing', label: 'Spacing', headings: ['Spacing', 'Layout', 'Density'] },
  { id: 'radius', label: 'Radius', headings: ['Border Radius', 'Radius', 'Shape'] },
  { id: 'components', label: 'Components', headings: ['Components', 'UI Components'] },
  { id: 'guidance', label: 'Guidance', headings: ["Do's and Don'ts", 'Dos and Donts', 'Guidance', 'Usage'] },
] as const;

export type DesignMdSectionId = (typeof designMdSectionConfigs)[number]['id'];
export type DesignMdSelections = Record<DesignMdSectionId, string>;

export interface MissingDesignMdSection {
  sectionId: DesignMdSectionId;
  label: string;
  themeName: string;
}

export function getDesignMdCandidateThemes(themes: NormalizedTheme[]): NormalizedTheme[] {
  const fullThemes = themes.filter((theme) => theme.kind === 'theme');

  return fullThemes.length > 0 ? fullThemes : themes;
}

function normalizeHeading(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/['']/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

function h2Text(line: string): string | undefined {
  const match = line.match(/^##\s+(.+?)\s*#*\s*$/);

  return match?.[1];
}

export function extractDesignMdSection(markdownBody: string, headings: readonly string[]): string {
  const wantedHeadings = new Set(headings.map(normalizeHeading));
  const lines = markdownBody.split(/\r?\n/);
  let startIndex = -1;
  let endIndex = lines.length;

  for (let index = 0; index < lines.length; index += 1) {
    const heading = h2Text(lines[index]);
    if (!heading) {
      continue;
    }

    if (startIndex === -1 && wantedHeadings.has(normalizeHeading(heading))) {
      startIndex = index + 1;
      continue;
    }

    if (startIndex !== -1) {
      endIndex = index;
      break;
    }
  }

  if (startIndex === -1) {
    return '';
  }

  return lines.slice(startIndex, endIndex).join('\n').trim();
}

export function createDefaultDesignMdSelections(themes: NormalizedTheme[]): DesignMdSelections {
  const fallbackThemeId = themes[0]?.id ?? '';

  return Object.fromEntries(
    designMdSectionConfigs.map((section) => [section.id, fallbackThemeId]),
  ) as DesignMdSelections;
}

interface ComposeDesignMarkdownInput {
  title?: string;
  themes: NormalizedTheme[];
  selections: DesignMdSelections;
}

export function findMissingDesignMdSections({
  themes,
  selections,
}: Omit<ComposeDesignMarkdownInput, 'title'>): MissingDesignMdSection[] {
  const themeById = new Map(themes.map((theme) => [theme.id, theme]));

  if (themes.length === 0) {
    return [];
  }

  return designMdSectionConfigs.flatMap((section) => {
    const theme = themeById.get(selections[section.id]) ?? themes[0];
    const sectionBody = extractDesignMdSection(theme.markdownBody, section.headings);

    if (sectionBody) {
      return [];
    }

    return [
      {
        sectionId: section.id,
        label: section.label,
        themeName: theme.name,
      },
    ];
  });
}

export function composeDesignMarkdown({
  title = 'Composed Design Direction',
  themes,
  selections,
}: ComposeDesignMarkdownInput): string {
  const themeById = new Map(themes.map((theme) => [theme.id, theme]));

  if (themes.length === 0) {
    return `# ${title}\n\nNo design sources are available yet. Add Markdown files under assets/designs/ to compose a design.md draft.`;
  }

  const sectionLines = designMdSectionConfigs.flatMap((section) => {
    const theme = themeById.get(selections[section.id]) ?? themes[0];
    const sectionBody = extractDesignMdSection(theme.markdownBody, section.headings);

    if (!sectionBody) {
      return [];
    }

    return [
      '',
      `## ${section.label}`,
      '',
      sectionBody,
    ];
  });

  return [
    `# ${title}`,
    ...sectionLines,
  ].join('\n');
}
