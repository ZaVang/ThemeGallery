import type { NormalizedTheme, ThemeRiskItem, ThemeRiskSummary } from '../types/theme';
import { contrastRatio, isHexColor } from './colorMath';

const contrastChecks = [
  { label: 'Page text', foreground: 'on-background', background: 'background', minimum: 4.5 },
  { label: 'Surface text', foreground: 'on-surface', background: 'surface', minimum: 4.5 },
  { label: 'Muted surface text', foreground: 'on-surface-variant', background: 'surface', minimum: 3 },
  { label: 'Primary button text', foreground: 'on-primary', background: 'primary', minimum: 4.5 },
  { label: 'Secondary button text', foreground: 'on-secondary', background: 'secondary', minimum: 4.5 },
  { label: 'Tertiary button text', foreground: 'on-tertiary', background: 'tertiary', minimum: 4.5 },
  { label: 'Error text', foreground: 'on-error', background: 'error', minimum: 4.5 },
] as const;

const layerChecks = [
  { a: 'background', b: 'surface' },
  { a: 'surface', b: 'surface-container' },
  { a: 'surface-container', b: 'surface-container-high' },
] as const;

const semanticPairs = [
  ['primary', 'secondary'],
  ['primary', 'tertiary'],
  ['secondary', 'tertiary'],
] as const;

function roundRatio(value: number): number {
  return Math.round(value * 100) / 100;
}

function colorIsCheckable(value: string | undefined): value is string {
  return Boolean(value && isHexColor(value));
}

function maybeContrast(colors: Record<string, string>, a: string, b: string): number | undefined {
  const first = colors[a];
  const second = colors[b];
  if (!colorIsCheckable(first) || !colorIsCheckable(second)) {
    return undefined;
  }

  return roundRatio(contrastRatio(first, second));
}

function createContrastFailures(colors: Record<string, string>): ThemeRiskItem[] {
  return contrastChecks.flatMap((check) => {
    const ratio = maybeContrast(colors, check.foreground, check.background);
    if (ratio === undefined || ratio >= check.minimum) {
      return [];
    }

    return [
      {
        severity: 'fail' as const,
        label: check.label,
        message: `${check.label} contrast is ${ratio.toFixed(2)}:1; raise it to at least ${check.minimum.toFixed(2)}:1.`,
        ratio,
      },
    ];
  });
}

function createLayeringNotes(colors: Record<string, string>): ThemeRiskItem[] {
  const weakPairs = layerChecks.filter((check) => {
    const ratio = maybeContrast(colors, check.a, check.b);
    return ratio !== undefined && ratio < 1.08;
  });

  if (weakPairs.length === 0) {
    return [];
  }

  return [
    {
      severity: 'note' as const,
      label: 'Surface layering',
      message: 'Background, surface, and container colors are very close; cards may not separate clearly.',
    },
  ];
}

function createAccentNotes(colors: Record<string, string>): ThemeRiskItem[] {
  const weakAccent = ['primary', 'secondary', 'tertiary'].find((token) => {
    const surfaceRatio = maybeContrast(colors, token, 'surface');
    const backgroundRatio = maybeContrast(colors, token, 'background');
    return (
      (surfaceRatio !== undefined && surfaceRatio < 1.6) ||
      (backgroundRatio !== undefined && backgroundRatio < 1.6)
    );
  });

  if (!weakAccent) {
    return [];
  }

  return [
    {
      severity: 'note' as const,
      label: 'Low contrast accent',
      message: `${weakAccent} is close to the main surfaces; links, charts, or selected states may feel too quiet.`,
    },
  ];
}

function createSemanticNotes(colors: Record<string, string>): ThemeRiskItem[] {
  const similarPair = semanticPairs.find(([a, b]) => {
    const ratio = maybeContrast(colors, a, b);
    return ratio !== undefined && ratio < 1.15;
  });

  if (!similarPair) {
    return [];
  }

  return [
    {
      severity: 'note' as const,
      label: 'Similar semantic colors',
      message: `${similarPair[0]} and ${similarPair[1]} are very close; actions may be hard to distinguish.`,
    },
  ];
}

export function analyzeThemeRisks(theme: Pick<NormalizedTheme, 'colors'>): ThemeRiskSummary {
  const items = [
    ...createContrastFailures(theme.colors),
    ...createLayeringNotes(theme.colors),
    ...createAccentNotes(theme.colors),
    ...createSemanticNotes(theme.colors),
  ];
  const failCount = items.filter((item) => item.severity === 'fail').length;
  const noteCount = items.filter((item) => item.severity === 'note').length;

  return {
    status: failCount > 0 ? 'fail' : noteCount > 0 ? 'review' : 'pass',
    failCount,
    noteCount,
    items,
  };
}
