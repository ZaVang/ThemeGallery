import type { AppAppearanceMaterial, AppAppearancePreset, AppAppearanceTokens } from './appAppearance';

export interface AppAppearancePatch {
  material?: AppAppearanceMaterial;
  tokens?: Partial<AppAppearanceTokens>;
}

export function resolveAppAppearance(
  preset: AppAppearancePreset,
  patch?: AppAppearancePatch,
): AppAppearancePreset {
  if (!patch) {
    return preset;
  }

  return {
    ...preset,
    material: patch.material ?? preset.material,
    tokens: {
      ...preset.tokens,
      ...(patch.tokens ?? {}),
    },
  };
}
