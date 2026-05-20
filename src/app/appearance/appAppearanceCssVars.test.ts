import { appAppearancePresets } from './appAppearance';
import { appAppearanceToCssVars } from './appAppearanceCssVars';

describe('appAppearanceToCssVars', () => {
  it('maps app appearance tokens into isolated --app CSS variables', () => {
    const quietDark = appAppearancePresets.find((preset) => preset.id === 'quiet-dark');

    expect(quietDark).toBeDefined();

    const vars = appAppearanceToCssVars(quietDark!);
    const rawVars = vars as Record<string, string | undefined>;

    expect(vars['--app-bg']).toBe(quietDark!.tokens.bg);
    expect(vars['--app-surface']).toBe(quietDark!.tokens.surface);
    expect(vars['--app-accent']).toBe(quietDark!.tokens.accent);
    expect(vars['--app-radius-md']).toBe(quietDark!.tokens.radiusMd);
    expect(rawVars['--tg-color-primary']).toBeUndefined();
  });
});
