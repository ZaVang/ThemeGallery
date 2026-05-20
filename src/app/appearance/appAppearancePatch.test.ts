import { appAppearancePresets } from './appAppearance';
import { resolveAppAppearance } from './appAppearancePatch';

describe('resolveAppAppearance', () => {
  it('overlays a partial inspiration patch without changing the base preset', () => {
    const quietLight = appAppearancePresets.find((preset) => preset.id === 'quiet-light')!;

    const resolved = resolveAppAppearance(quietLight, {
      material: 'glass',
      tokens: {
        accent: '#54ACBF',
        radiusMd: '18px',
      },
    });

    expect(resolved.material).toBe('glass');
    expect(resolved.tokens.bg).toBe(quietLight.tokens.bg);
    expect(resolved.tokens.accent).toBe('#54ACBF');
    expect(resolved.tokens.radiusMd).toBe('18px');
    expect(quietLight.tokens.accent).not.toBe('#54ACBF');
  });
});
