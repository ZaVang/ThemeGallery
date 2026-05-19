import { loadThemeLibrary } from './themeLoader';

describe('loadThemeLibrary', () => {
  it('loads and normalizes local theme and palette markdown files', () => {
    const themes = loadThemeLibrary();
    const names = themes.map((theme) => theme.name);

    expect(names).toContain('Linear');
    expect(names).toContain('Apple');
    expect(names).toContain('Soft Mauve');
    expect(themes.every((theme) => !theme.filePath.endsWith('tailwind.css'))).toBe(true);
  });
});

