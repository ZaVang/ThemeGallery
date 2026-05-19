import type {
  ColorSwatch,
  ComponentToken,
  GradientToken,
  NormalizedTheme,
  ParsedThemeSource,
  TypographyToken,
} from '../types/theme';
import { baseFoundation } from './baseFoundation';
import { isHexColor, normalizeColorValue } from './colorMath';
import { derivePaletteTheme } from './derivePaletteTheme';
import { resolveReferences } from './resolveReferences';

const requiredColorTokens = [
  'background',
  'on-background',
  'surface',
  'on-surface',
  'on-surface-variant',
  'surface-container',
  'surface-container-high',
  'outline',
  'outline-variant',
  'primary',
  'on-primary',
  'primary-container',
  'on-primary-container',
  'secondary',
  'on-secondary',
  'secondary-container',
  'on-secondary-container',
  'tertiary',
  'on-tertiary',
  'error',
  'on-error',
];

const colorCardTokens: Array<{ token: string; name: string; role: string }> = [
  { token: 'background', name: 'Background', role: 'background' },
  { token: 'surface', name: 'Surface', role: 'surface' },
  { token: 'primary', name: 'Primary', role: 'primary' },
  { token: 'secondary', name: 'Secondary', role: 'secondary' },
  { token: 'tertiary', name: 'Tertiary', role: 'tertiary' },
];

function normalizeColors(colors: Record<string, string>): Record<string, string> {
  return Object.fromEntries(
    Object.entries(colors).map(([name, value]) => [name, typeof value === 'string' ? normalizeColorValue(value) : String(value)]),
  );
}

function normalizeGradients(gradients: GradientToken[]): GradientToken[] {
  return gradients.map((gradient) => ({
    from: isHexColor(gradient.from) ? normalizeColorValue(gradient.from) : gradient.from,
    to: isHexColor(gradient.to) ? normalizeColorValue(gradient.to) : gradient.to,
  }));
}

function mergeTypography(
  typography?: Record<string, TypographyToken>,
): Record<string, TypographyToken> {
  return {
    ...baseFoundation.typography,
    ...(typography ?? {}),
  };
}

function mergeStringTokens(tokens: Record<string, string>, overrides?: Record<string, string>): Record<string, string> {
  return {
    ...tokens,
    ...(overrides ?? {}),
  };
}

function mergeComponents(
  components?: Record<string, ComponentToken>,
): Record<string, ComponentToken> {
  return {
    ...baseFoundation.components,
    ...(components ?? {}),
  };
}

function createThemeColorSwatches(colors: Record<string, string>): ColorSwatch[] {
  return colorCardTokens.flatMap((item) => {
    const value = colors[item.token];
    if (!value) {
      return [];
    }

    return [
      {
        name: item.name,
        hex: value,
        role: item.role,
        token: item.token,
      },
    ];
  });
}

function resolveThemeReferences(theme: NormalizedTheme): NormalizedTheme {
  const warnings = [...theme.warnings];
  const context = {
    colors: theme.colors,
    gradients: theme.gradients,
    typography: theme.typography,
    rounded: theme.rounded,
    spacing: theme.spacing,
  };

  return {
    ...theme,
    components: resolveReferences(theme.components, context, warnings, 'components') as Record<string, ComponentToken>,
    warnings,
  };
}

export function normalizeTheme(source: ParsedThemeSource): NormalizedTheme {
  if (source.sourceKind === 'palette' || Array.isArray(source.colors)) {
    return resolveThemeReferences(derivePaletteTheme(source));
  }

  const warnings = [...source.warnings];
  const sourceColors = normalizeColors(source.colors);
  for (const token of requiredColorTokens) {
    if (!sourceColors[token]) {
      warnings.push(`Missing color token "${token}"; used Base UI Foundation fallback.`);
    }
  }

  const theme: NormalizedTheme = {
    id: source.id,
    kind: 'theme',
    filePath: source.filePath,
    name: source.name,
    tags: source.tags,
    source: source.source,
    mood: source.mood,
    colors: {
      ...baseFoundation.colors,
      ...sourceColors,
    },
    colorSwatches: createThemeColorSwatches({
      ...baseFoundation.colors,
      ...sourceColors,
    }),
    gradients: normalizeGradients(source.gradients),
    typography: mergeTypography(source.typography),
    rounded: mergeStringTokens(baseFoundation.rounded, source.rounded),
    spacing: mergeStringTokens(baseFoundation.spacing, source.spacing),
    components: mergeComponents(source.components),
    markdownBody: source.markdownBody,
    warnings,
  };

  return resolveThemeReferences(theme);
}
