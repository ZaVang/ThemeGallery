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

export function mergeAppAppearancePatches(patches: Array<AppAppearancePatch | undefined>): AppAppearancePatch {
  return patches.reduce<AppAppearancePatch>((merged, patch) => {
    if (!patch) {
      return merged;
    }

    return {
      material: patch.material ?? merged.material,
      tokens: {
        ...(merged.tokens ?? {}),
        ...(patch.tokens ?? {}),
      },
    };
  }, {});
}
