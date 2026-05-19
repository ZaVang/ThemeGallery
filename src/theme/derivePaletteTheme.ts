import type { NormalizedTheme, PaletteColor, ParsedThemeSource } from '../types/theme';
import { baseFoundation } from './baseFoundation';
import { mixHex, normalizeHex, readableTextColor } from './colorMath';

interface NormalizedSwatch extends PaletteColor {
  hex: string;
}

const foundationWarning =
  'Palette-derived theme uses Base UI Foundation typography, spacing, radius, and component tokens.';

function cloneFoundation<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

function normalizeSwatches(colors: PaletteColor[], warnings: string[]): NormalizedSwatch[] {
  return colors.flatMap((color, index) => {
    try {
      return [
        {
          name: color.name || `Color ${index + 1}`,
          hex: normalizeHex(color.hex),
          role: color.role?.toLowerCase(),
        },
      ];
    } catch {
      warnings.push(`Invalid palette color "${color.name || index + 1}" was ignored.`);
      return [];
    }
  });
}

function byRole(colors: NormalizedSwatch[], role: string): NormalizedSwatch | undefined {
  return colors.find((color) => color.role === role);
}

function pickRole(
  colors: NormalizedSwatch[],
  role: string,
  fallback: NormalizedSwatch,
  warnings: string[],
): NormalizedSwatch {
  const color = byRole(colors, role);
  if (color) {
    return color;
  }

  warnings.push(`Missing palette role "${role}"; derived from available colors.`);
  return fallback;
}

function slugify(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function derivePaletteTheme(source: ParsedThemeSource): NormalizedTheme {
  const warnings = [...source.warnings, foundationWarning];
  const rawColors = Array.isArray(source.colors) ? source.colors : [];
  const swatches = normalizeSwatches(rawColors, warnings);
  const fallback: NormalizedSwatch = swatches[0] ?? { name: 'Base Primary', hex: baseFoundation.colors.primary, role: 'primary' };

  if (swatches.length === 0) {
    warnings.push('Palette did not include valid colors; Base UI Foundation colors were used.');
  }

  const background = pickRole(swatches, 'background', fallback, warnings);
  const primary = pickRole(swatches, 'primary', swatches[1] ?? fallback, warnings);
  const secondary = pickRole(swatches, 'secondary', swatches[2] ?? primary, warnings);
  const tertiary = byRole(swatches, 'accent') ?? pickRole(swatches, 'tertiary', swatches[3] ?? secondary, warnings);
  const surface = pickRole(swatches, 'surface', background, warnings);
  const surfaceContainer = mixHex(surface.hex, background.hex, 0.22);
  const surfaceContainerHigh = mixHex(surface.hex, background.hex, 0.36);
  const primaryContainer = mixHex(primary.hex, background.hex, 0.72);
  const secondaryContainer = mixHex(secondary.hex, background.hex, 0.72);
  const tertiaryContainer = mixHex(tertiary.hex, background.hex, 0.72);

  const paletteTokens = Object.fromEntries(
    swatches.map((swatch) => [`palette-${slugify(swatch.name) || swatch.hex.slice(1)}`, swatch.hex]),
  );

  const gradients = source.gradients.map((gradient) => ({
    from: normalizeHex(gradient.from),
    to: normalizeHex(gradient.to),
  }));

  return {
    id: source.id,
    kind: 'palette-derived',
    filePath: source.filePath,
    name: source.name,
    tags: source.tags,
    source: source.source,
    mood: source.mood,
    colorSwatches: swatches.map((swatch) => ({
      name: swatch.name,
      hex: swatch.hex,
      role: swatch.role,
    })),
    colors: {
      ...baseFoundation.colors,
      ...paletteTokens,
      background: background.hex,
      'on-background': readableTextColor(background.hex),
      surface: surface.hex,
      'on-surface': readableTextColor(surface.hex),
      'on-surface-variant': readableTextColor(surfaceContainerHigh),
      'surface-dim': mixHex(background.hex, surface.hex, 0.12),
      'surface-bright': mixHex(background.hex, '#ffffff', 0.55),
      'surface-container-lowest': background.hex,
      'surface-container-low': mixHex(background.hex, surface.hex, 0.1),
      'surface-container': surfaceContainer,
      'surface-container-high': surfaceContainerHigh,
      'surface-container-highest': mixHex(surface.hex, background.hex, 0.48),
      'surface-variant': surfaceContainerHigh,
      outline: mixHex(surface.hex, background.hex, 0.6),
      'outline-variant': mixHex(surface.hex, background.hex, 0.76),
      'surface-tint': primary.hex,
      primary: primary.hex,
      'on-primary': readableTextColor(primary.hex),
      'primary-container': primaryContainer,
      'on-primary-container': readableTextColor(primaryContainer),
      'inverse-primary': primary.hex,
      secondary: secondary.hex,
      'on-secondary': readableTextColor(secondary.hex),
      'secondary-container': secondaryContainer,
      'on-secondary-container': readableTextColor(secondaryContainer),
      tertiary: tertiary.hex,
      'on-tertiary': readableTextColor(tertiary.hex),
      'tertiary-container': tertiaryContainer,
      'on-tertiary-container': readableTextColor(tertiaryContainer),
      'inverse-surface': readableTextColor(background.hex) === '#ffffff' ? '#f8fafc' : '#111827',
      'inverse-on-surface': readableTextColor(background.hex) === '#ffffff' ? '#111827' : '#ffffff',
    },
    gradients,
    typography: cloneFoundation(baseFoundation.typography),
    rounded: cloneFoundation(baseFoundation.rounded),
    spacing: cloneFoundation(baseFoundation.spacing),
    components: cloneFoundation(baseFoundation.components),
    markdownBody: source.markdownBody,
    warnings,
  };
}
