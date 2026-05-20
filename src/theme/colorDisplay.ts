import type { ColorSwatch, NormalizedTheme } from '../types/theme';

export const displayColorTokens = ['background', 'surface', 'primary', 'secondary', 'tertiary'] as const;
const themePaletteTokens = ['primary', 'secondary', 'tertiary', 'neutral', 'background', 'surface'] as const;

const roleOrder = new Map<string, number>(
  displayColorTokens.flatMap((token, index) => (token === 'tertiary' ? [[token, index], ['accent', index]] : [[token, index]])),
);

function swatchRoleKey(swatch: ColorSwatch): string {
  return (swatch.token ?? swatch.role ?? '').toLowerCase();
}

function displayNameForToken(token: string): string {
  return token
    .split('-')
    .map((part) => `${part.charAt(0).toUpperCase()}${part.slice(1)}`)
    .join(' ');
}

function dedupeByHex(swatches: ColorSwatch[]): ColorSwatch[] {
  const seen = new Set<string>();

  return swatches.filter((swatch) => {
    const key = swatch.hex.toLowerCase();
    if (seen.has(key)) {
      return false;
    }

    seen.add(key);
    return true;
  });
}

export function sortColorSwatchesForDisplay(swatches: ColorSwatch[]): ColorSwatch[] {
  return swatches
    .map((swatch, index) => ({ swatch, index, order: roleOrder.get(swatchRoleKey(swatch)) ?? Number.MAX_SAFE_INTEGER }))
    .sort((a, b) => a.order - b.order || a.index - b.index)
    .map((entry) => entry.swatch);
}

export function createDisplayColorSwatches(theme: Pick<NormalizedTheme, 'kind' | 'colors' | 'colorSwatches'>): ColorSwatch[] {
  if (theme.kind === 'theme') {
    return dedupeByHex(
      themePaletteTokens.flatMap((token) => {
        const hex = theme.colors[token];
        if (!hex) {
          return [];
        }

        return [
          {
            name: displayNameForToken(token),
            hex,
            role: token,
            token,
          },
        ];
      }),
    );
  }

  return sortColorSwatchesForDisplay(theme.colorSwatches);
}
