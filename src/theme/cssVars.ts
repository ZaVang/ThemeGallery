import type { CSSProperties } from 'react';
import type { NormalizedTheme, TypographyToken } from '../types/theme';

type CssVariableStyle = CSSProperties & Record<`--${string}`, string>;

function typographyVars(name: string, token: TypographyToken): CssVariableStyle {
  return {
    [`--tg-text-${name}-family`]: token.fontFamily,
    [`--tg-text-${name}-size`]: token.fontSize,
    [`--tg-text-${name}-weight`]: token.fontWeight,
    [`--tg-text-${name}-line`]: token.lineHeight,
    [`--tg-text-${name}-tracking`]: token.letterSpacing ?? '0',
  };
}

export function themeToCssVars(theme: NormalizedTheme): CssVariableStyle {
  const vars: CssVariableStyle = {};

  for (const [name, value] of Object.entries(theme.colors)) {
    vars[`--tg-color-${name}`] = value;
  }

  for (const [name, value] of Object.entries(theme.rounded)) {
    vars[`--tg-radius-${name}`] = value;
  }

  for (const [name, value] of Object.entries(theme.spacing)) {
    vars[`--tg-space-${name}`] = value;
  }

  for (const [name, token] of Object.entries(theme.typography)) {
    Object.assign(vars, typographyVars(name, token));
  }

  theme.gradients.forEach((gradient, index) => {
    vars[`--tg-gradient-${index}`] = `linear-gradient(135deg, ${gradient.from}, ${gradient.to})`;
  });

  return vars;
}

