import type { CSSProperties } from 'react';
import type { AppAppearancePreset } from './appAppearance';

type AppAppearanceCssVars = CSSProperties & Record<`--app-${string}`, string>;

export function appAppearanceToCssVars(preset: AppAppearancePreset): AppAppearanceCssVars {
  return {
    '--app-bg': preset.tokens.bg,
    '--app-bg-elevated': preset.tokens.bgElevated,
    '--app-surface': preset.tokens.surface,
    '--app-surface-muted': preset.tokens.surfaceMuted,
    '--app-text': preset.tokens.text,
    '--app-text-muted': preset.tokens.textMuted,
    '--app-border': preset.tokens.border,
    '--app-border-strong': preset.tokens.borderStrong,
    '--app-accent': preset.tokens.accent,
    '--app-accent-text': preset.tokens.accentText,
    '--app-danger': preset.tokens.danger,
    '--app-radius-sm': preset.tokens.radiusSm,
    '--app-radius-md': preset.tokens.radiusMd,
    '--app-radius-lg': preset.tokens.radiusLg,
    '--app-radius-xl': preset.tokens.radiusXl,
    '--app-shadow-sm': preset.tokens.shadowSm,
    '--app-shadow-md': preset.tokens.shadowMd,
    '--app-font-body': preset.tokens.fontBody,
    '--app-font-display': preset.tokens.fontDisplay,
    '--app-space-panel': preset.tokens.spacePanel,
    '--app-space-control': preset.tokens.spaceControl,
  };
}
