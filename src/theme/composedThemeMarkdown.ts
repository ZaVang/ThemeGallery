import type { InspirationDimension } from '../inspirations/inspirationReferences';
import type { ComponentToken, GradientToken, NormalizedTheme, TypographyToken } from '../types/theme';
import {
  composeDesignMarkdown,
  type DesignMdSectionId,
  type DesignMdSelections,
} from './designMdComposer';

interface SelectedAtomSummary {
  name: string;
  dimensions: InspirationDimension[];
}

interface ComposeThemeMarkdownInput {
  name: string;
  themes: NormalizedTheme[];
  selections: DesignMdSelections;
  selectedAtoms?: SelectedAtomSummary[];
}

type YamlValue =
  | string
  | number
  | boolean
  | null
  | YamlValue[]
  | { [key: string]: YamlValue };

const sectionTokenSource: Partial<Record<DesignMdSectionId, keyof NormalizedTheme>> = {
  colors: 'colors',
  typography: 'typography',
  spacing: 'spacing',
  radius: 'rounded',
  components: 'components',
};

export function createDesignFileName(name: string): string {
  const slug = name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

  return `${slug || 'composed-theme'}.md`;
}

function yamlScalar(value: string | number | boolean | null): string {
  if (typeof value === 'string') {
    return JSON.stringify(value);
  }

  if (value === null) {
    return 'null';
  }

  return String(value);
}

function yamlLines(key: string, value: YamlValue, indent = 0): string[] {
  const prefix = ' '.repeat(indent);
  if (Array.isArray(value)) {
    if (value.length === 0) {
      return [`${prefix}${key}: []`];
    }

    return [
      `${prefix}${key}:`,
      ...value.flatMap((item) => {
        if (item && typeof item === 'object' && !Array.isArray(item)) {
          return [`${prefix}  -`, ...yamlObjectLines(item as Record<string, YamlValue>, indent + 4)];
        }

        return [`${prefix}  - ${yamlScalar(item as string | number | boolean | null)}`];
      }),
    ];
  }

  if (value && typeof value === 'object') {
    const entries = Object.entries(value);
    if (entries.length === 0) {
      return [`${prefix}${key}: {}`];
    }

    return [`${prefix}${key}:`, ...yamlObjectLines(value as Record<string, YamlValue>, indent + 2)];
  }

  return [`${prefix}${key}: ${yamlScalar(value as string | number | boolean | null)}`];
}

function yamlObjectLines(value: Record<string, YamlValue>, indent = 0): string[] {
  return Object.entries(value).flatMap(([key, child]) => yamlLines(key, child, indent));
}

function frontmatter(data: Record<string, YamlValue>): string {
  return ['---', ...yamlObjectLines(data), '---'].join('\n');
}

function selectedThemeForSection(
  themesById: Map<string, NormalizedTheme>,
  themes: NormalizedTheme[],
  selections: DesignMdSelections,
  sectionId: DesignMdSectionId,
): NormalizedTheme {
  return themesById.get(selections[sectionId]) ?? themes[0];
}

function selectedToken<T extends Record<string, unknown> | GradientToken[]>(
  themesById: Map<string, NormalizedTheme>,
  themes: NormalizedTheme[],
  selections: DesignMdSelections,
  sectionId: DesignMdSectionId,
  fallback: T,
): T {
  const sourceKey = sectionTokenSource[sectionId];
  if (!sourceKey) {
    return fallback;
  }

  return (selectedThemeForSection(themesById, themes, selections, sectionId)[sourceKey] as T | undefined) ?? fallback;
}

function unique(values: string[]): string[] {
  return Array.from(new Set(values.filter(Boolean)));
}

function themeNamesForMood(themes: NormalizedTheme[], selections: DesignMdSelections): string {
  const themesById = new Map(themes.map((theme) => [theme.id, theme]));
  const names = unique(
    Object.values(selections).flatMap((themeId) => {
      const theme = themesById.get(themeId);

      return theme ? [theme.name] : [];
    }),
  );

  return names.length > 0 ? names.join(', ') : 'available design sources';
}

export function composeThemeMarkdown({
  name,
  themes,
  selections,
  selectedAtoms = [],
}: ComposeThemeMarkdownInput): string {
  const safeName = name.trim() || 'Composed Design Direction';
  const themesById = new Map(themes.map((theme) => [theme.id, theme]));
  const firstTheme = themes[0];
  const body = composeDesignMarkdown({ title: safeName, themes, selections });
  const atomDimensions = selectedAtoms.flatMap((atom) => atom.dimensions);
  const atomNames = selectedAtoms.map((atom) => atom.name);
  const sourceThemeNames = themeNamesForMood(themes, selections);

  if (!firstTheme) {
    return `${frontmatter({
      name: safeName,
      source: 'ThemeGallery Composer',
      tags: ['composed'],
      colors: {},
    })}\n\n${body}`;
  }

  const data: Record<string, YamlValue> = {
    name: safeName,
    source: 'ThemeGallery Composer',
    mood: `Composed in ThemeGallery from ${sourceThemeNames}${atomNames.length > 0 ? ` with ${atomNames.join(', ')}` : ''}.`,
    tags: unique(['composed', ...firstTheme.tags, ...atomDimensions]),
    colors: selectedToken<Record<string, string>>(themesById, themes, selections, 'colors', firstTheme.colors),
    gradients: selectedThemeForSection(themesById, themes, selections, 'colors').gradients as unknown as YamlValue,
    typography: selectedToken<Record<string, TypographyToken>>(themesById, themes, selections, 'typography', firstTheme.typography) as unknown as YamlValue,
    rounded: selectedToken<Record<string, string>>(themesById, themes, selections, 'radius', firstTheme.rounded),
    spacing: selectedToken<Record<string, string>>(themesById, themes, selections, 'spacing', firstTheme.spacing),
    components: selectedToken<Record<string, ComponentToken>>(themesById, themes, selections, 'components', firstTheme.components) as unknown as YamlValue,
  };

  return `${frontmatter(data)}\n\n${body}`;
}
