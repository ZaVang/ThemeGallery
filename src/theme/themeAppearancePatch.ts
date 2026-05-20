import type { AppAppearancePatch } from '../app/appearance/appAppearancePatch';
import type { NormalizedTheme, TypographyToken } from '../types/theme';

function firstValue(values: Array<string | undefined>, fallback: string): string {
  return values.find((value) => value && value.trim()) ?? fallback;
}

function themeColor(theme: NormalizedTheme, tokens: string[], fallback: string): string {
  return firstValue(tokens.map((token) => theme.colors[token]), fallback);
}

function themeRadius(theme: NormalizedTheme, tokens: string[], fallback: string): string {
  return firstValue(tokens.map((token) => theme.rounded[token]), fallback);
}

function typography(theme: NormalizedTheme, tokens: string[]): TypographyToken | undefined {
  return tokens.map((token) => theme.typography[token]).find(Boolean);
}

function fontStack(token: TypographyToken | undefined, fallback: string): string {
  if (!token?.fontFamily) {
    return fallback;
  }

  return `${token.fontFamily}, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`;
}

function themeMaterial(theme: NormalizedTheme): AppAppearancePatch['material'] {
  const searchable = [theme.name, theme.mood ?? '', theme.markdownBody, ...theme.tags].join(' ').toLowerCase();

  return searchable.includes('glass') ? 'glass' : 'solid';
}

export function themeToAppAppearancePatch(theme: NormalizedTheme): AppAppearancePatch {
  const bodyTypography = typography(theme, ['body', 'body-md']);
  const displayTypography = typography(theme, ['display', 'display-lg', 'headline', 'headline-lg']);

  return {
    material: themeMaterial(theme),
    tokens: {
      bg: themeColor(theme, ['background'], '#f3f5f7'),
      bgElevated: themeColor(theme, ['surface', 'surface-container-lowest'], '#ffffff'),
      surface: themeColor(theme, ['surface'], '#ffffff'),
      surfaceMuted: themeColor(theme, ['surface-container', 'surface-container-high', 'surface-dim'], '#f8fafc'),
      text: themeColor(theme, ['on-background', 'on-surface'], '#172026'),
      textMuted: themeColor(theme, ['on-surface-variant', 'outline'], '#697586'),
      border: themeColor(theme, ['outline-variant', 'outline'], '#d8e0e5'),
      borderStrong: themeColor(theme, ['outline', 'primary'], '#172026'),
      accent: themeColor(theme, ['tertiary', 'primary'], '#2563eb'),
      accentText: themeColor(theme, ['on-tertiary', 'on-primary'], '#ffffff'),
      danger: themeColor(theme, ['error'], '#b42318'),
      radiusSm: themeRadius(theme, ['sm'], '6px'),
      radiusMd: themeRadius(theme, ['md', 'DEFAULT'], '8px'),
      radiusLg: themeRadius(theme, ['lg', 'md'], '12px'),
      radiusXl: themeRadius(theme, ['xl', 'lg'], '18px'),
      shadowSm: '0 1px 2px rgb(15 23 42 / 0.08)',
      shadowMd: '0 18px 50px rgb(15 23 42 / 0.12)',
      fontBody: fontStack(bodyTypography, 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'),
      fontDisplay: fontStack(displayTypography, 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'),
      spacePanel: firstValue([theme.spacing['container-padding'], theme.spacing.lg], '16px'),
      spaceControl: firstValue([theme.spacing.md, theme.spacing.sm], '12px'),
    },
  };
}
