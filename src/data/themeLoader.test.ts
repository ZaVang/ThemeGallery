import { loadThemeLibrary } from './themeLoader';

describe('loadThemeLibrary', () => {
  it('loads and normalizes local theme and palette markdown files', () => {
    const themes = loadThemeLibrary();
    const names = themes.map((theme) => theme.name);
    const luxCart = themes.find((theme) => theme.name === 'LuxCart');

    expect(names).toContain('LuxCart');
    expect(names).toContain('Soft Mauve');
    expect(luxCart?.filePath).toBe('assets/designs/luxcart.md');
    expect(luxCart?.colors.primary).toBe('#1c1917');
    expect(luxCart?.colors.background).toBe('#fffbeb');
    expect(luxCart?.colors.tertiary).toBe('#b8860b');
    expect(luxCart?.warnings).not.toContain('Missing YAML frontmatter block.');
    expect(luxCart?.warnings.some((warning) => warning.startsWith('Missing color token'))).toBe(false);
    expect(themes.find((theme) => theme.name === 'Soft Mauve')?.filePath).toBe('assets/colors/soft-mauve.md');
    expect(themes.every((theme) => !theme.filePath.endsWith('tailwind.css'))).toBe(true);
  });
});
