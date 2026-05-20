import type { ColorSwatch } from '../types/theme';

export const displayColorTokens = ['background', 'surface', 'primary', 'secondary', 'tertiary'] as const;

const roleOrder = new Map<string, number>(
  displayColorTokens.flatMap((token, index) => (token === 'tertiary' ? [[token, index], ['accent', index]] : [[token, index]])),
);

function swatchRoleKey(swatch: ColorSwatch): string {
  return (swatch.token ?? swatch.role ?? '').toLowerCase();
}

export function sortColorSwatchesForDisplay(swatches: ColorSwatch[]): ColorSwatch[] {
  return swatches
    .map((swatch, index) => ({ swatch, index, order: roleOrder.get(swatchRoleKey(swatch)) ?? Number.MAX_SAFE_INTEGER }))
    .sort((a, b) => a.order - b.order || a.index - b.index)
    .map((entry) => entry.swatch);
}
