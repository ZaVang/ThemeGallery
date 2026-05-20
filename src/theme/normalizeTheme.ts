import type {
  ColorSwatch,
  ComponentToken,
  GradientToken,
  NormalizedTheme,
  ParsedThemeSource,
  TokenProvenance,
  TypographyToken,
} from '../types/theme';
import { baseFoundation } from './baseFoundation';
import { contrastRatio, isHexColor, mixHex, normalizeColorValue, readableTextColor } from './colorMath';
import { derivePaletteTheme } from './derivePaletteTheme';
import { resolveReferences } from './resolveReferences';
import { analyzeThemeRisks } from './themeRisks';

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

interface ColorResolution {
  colors: Record<string, string>;
  provenance: Record<string, TokenProvenance>;
}

function mixColor(a: string, b: string, amount: number, fallback: string): string {
  return isHexColor(a) && isHexColor(b) ? mixHex(a, b, amount) : fallback;
}

function textColorFor(background: string, preferred: string): string {
  if (isHexColor(background) && isHexColor(preferred) && contrastRatio(background, preferred) >= 4.5) {
    return normalizeColorValue(preferred);
  }

  return isHexColor(background) ? readableTextColor(background) : preferred;
}

function resolveThemeColors(sourceColors: Record<string, string>): ColorResolution {
  const colors: Record<string, string> = { ...sourceColors };
  const provenance: Record<string, TokenProvenance> = Object.fromEntries(
    Object.keys(sourceColors).map((token) => [token, 'authored' as const]),
  );

  function setDerived(token: string, value: string) {
    if (!colors[token]) {
      colors[token] = normalizeColorValue(value);
      provenance[token] = 'derived';
    }
  }

  function setFallback(token: string, value: string) {
    if (!colors[token]) {
      colors[token] = normalizeColorValue(value);
      provenance[token] = 'fallback';
    }
  }

  setFallback('background', baseFoundation.colors.background);
  setDerived('surface', mixColor(colors.background, '#ffffff', 0.86, baseFoundation.colors.surface));
  setFallback('surface', baseFoundation.colors.surface);
  setFallback('primary', baseFoundation.colors.primary);
  setFallback('secondary', baseFoundation.colors.secondary);
  if (colors.accent) {
    setDerived('tertiary', colors.accent);
  }
  setFallback('tertiary', baseFoundation.colors.tertiary);
  setFallback('error', baseFoundation.colors.error);
  setFallback('success', '#166534');
  setFallback('warning', '#ca8a04');
  setFallback('info', '#1e40af');

  setDerived('on-background', textColorFor(colors.background, colors.surface));
  setDerived('on-surface', textColorFor(colors.surface, colors['on-background']));
  setDerived(
    'on-surface-variant',
    mixColor(colors['on-surface'], colors.surface, 0.34, baseFoundation.colors['on-surface-variant']),
  );

  setDerived('surface-dim', mixColor(colors.background, colors['on-background'], 0.05, baseFoundation.colors['surface-dim']));
  setDerived('surface-bright', mixColor(colors.background, '#ffffff', 0.72, baseFoundation.colors['surface-bright']));
  setDerived('surface-container-lowest', colors.surface);
  setDerived('surface-container-low', mixColor(colors.background, colors.surface, 0.35, baseFoundation.colors['surface-container-low']));
  setDerived('surface-container', mixColor(colors.surface, colors.background, 0.55, baseFoundation.colors['surface-container']));
  setDerived('surface-container-high', mixColor(colors.surface, colors.background, 0.72, baseFoundation.colors['surface-container-high']));
  setDerived(
    'surface-container-highest',
    mixColor(colors.surface, colors.background, 0.86, baseFoundation.colors['surface-container-highest']),
  );
  setDerived('surface-variant', colors['surface-container-high']);
  setDerived('outline', colors.neutral ?? mixColor(colors['on-surface-variant'], colors.surface, 0.58, baseFoundation.colors.outline));
  setDerived('outline-variant', mixColor(colors.outline, colors.background, 0.55, baseFoundation.colors['outline-variant']));
  setDerived('surface-tint', colors.primary);

  setDerived('on-primary', textColorFor(colors.primary, colors.background));
  setDerived('primary-container', mixColor(colors.primary, colors.background, 0.72, baseFoundation.colors['primary-container']));
  setDerived('on-primary-container', textColorFor(colors['primary-container'], colors['on-background']));
  setDerived('inverse-primary', colors.primary);

  setDerived('on-secondary', textColorFor(colors.secondary, colors['on-background']));
  setDerived('secondary-container', mixColor(colors.secondary, colors.background, 0.66, baseFoundation.colors['secondary-container']));
  setDerived('on-secondary-container', textColorFor(colors['secondary-container'], colors['on-background']));

  setDerived('on-tertiary', textColorFor(colors.tertiary, colors['on-background']));
  setDerived('tertiary-container', mixColor(colors.tertiary, colors.background, 0.72, baseFoundation.colors['tertiary-container']));
  setDerived('on-tertiary-container', textColorFor(colors['tertiary-container'], colors['on-background']));

  setDerived('on-error', textColorFor(colors.error, colors.surface));
  setDerived('error-container', mixColor(colors.error, colors.background, 0.82, baseFoundation.colors['error-container']));
  setDerived('on-error-container', textColorFor(colors['error-container'], colors['on-background']));

  setDerived('inverse-surface', colors['on-background']);
  setDerived('inverse-on-surface', colors.background);

  for (const [token, value] of Object.entries(baseFoundation.colors)) {
    setFallback(token, value);
  }

  return { colors, provenance };
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

function finalizeTheme(theme: NormalizedTheme): NormalizedTheme {
  const resolved = resolveThemeReferences(theme);

  return {
    ...resolved,
    riskSummary: analyzeThemeRisks(resolved),
  };
}

export function normalizeTheme(source: ParsedThemeSource): NormalizedTheme {
  if (source.sourceKind === 'palette' || Array.isArray(source.colors)) {
    return finalizeTheme(derivePaletteTheme(source));
  }

  const warnings = [...source.warnings];
  const sourceColors = normalizeColors(source.colors);
  const resolvedColors = resolveThemeColors(sourceColors);

  const theme: NormalizedTheme = {
    id: source.id,
    kind: 'theme',
    filePath: source.filePath,
    name: source.name,
    tags: source.tags,
    source: source.source,
    mood: source.mood,
    colors: resolvedColors.colors,
    colorProvenance: resolvedColors.provenance,
    colorSwatches: createThemeColorSwatches(resolvedColors.colors),
    gradients: normalizeGradients(source.gradients),
    typography: mergeTypography(source.typography),
    rounded: mergeStringTokens(baseFoundation.rounded, source.rounded),
    spacing: mergeStringTokens(baseFoundation.spacing, source.spacing),
    components: mergeComponents(source.components),
    markdownBody: source.markdownBody,
    warnings,
  };

  return finalizeTheme(theme);
}
