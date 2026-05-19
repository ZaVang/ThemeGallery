import { parseThemeSource } from './parseTheme';

describe('parseThemeSource', () => {
  it('parses full theme markdown frontmatter and body', () => {
    const parsed = parseThemeSource(
      `---\nname: Test Theme\ntags: [calm, product]\ncolors:\n  primary: "#ABC"\n---\n\n## Notes\nUseful.`,
      'themes/test-theme.md',
      'theme',
    );

    expect(parsed.id).toBe('test-theme');
    expect(parsed.name).toBe('Test Theme');
    expect(parsed.tags).toEqual(['calm', 'product']);
    expect(parsed.colors).toEqual({ primary: '#ABC' });
    expect(parsed.markdownBody).toContain('## Notes');
  });

  it('parses palette markdown as color arrays', () => {
    const parsed = parseThemeSource(
      `---\nname: Palette\ncolors:\n  - name: Ink\n    hex: "#111111"\n    role: primary\n---\nBody`,
      'palettes/palette.md',
      'palette',
    );

    expect(Array.isArray(parsed.colors)).toBe(true);
    expect(parsed.colors).toEqual([{ name: 'Ink', hex: '#111111', role: 'primary' }]);
    expect(parsed.warnings).toEqual([]);
  });

  it('keeps the last duplicate YAML key and records a warning', () => {
    const parsed = parseThemeSource(
      `---\nname: Duplicate\ncolors:\n  primary: "#111111"\n  primary: "#222222"\n---\nBody`,
      'themes/duplicate.md',
      'theme',
    );

    expect(parsed.colors).toEqual({ primary: '#222222' });
    expect(parsed.warnings[0]).toContain('Duplicate YAML key "colors.primary"');
  });

  it('parses mixed token strings that contain quotes inside a scalar', () => {
    const parsed = parseThemeSource(
      `---\nname: Mixed String\ncomponents:\n  hero:\n    padding: "{spacing.hero-height}" 0\n---\nBody`,
      'themes/mixed-string.md',
      'theme',
    );

    expect(parsed.components?.hero.padding).toBe('"{spacing.hero-height}" 0');
    expect(parsed.warnings[0]).toContain('Mixed quoted YAML scalar "components.hero.padding"');
  });

  it('does not treat repeated keys in separate YAML list items as duplicates', () => {
    const parsed = parseThemeSource(
      `---\nname: List\ncolors:\n  - name: A\n    hex: "#111111"\n    role: primary\n  - name: B\n    hex: "#222222"\n    role: secondary\ngradients:\n  - from: "#111111"\n    to: "#222222"\n  - from: "#222222"\n    to: "#333333"\n---\nBody`,
      'palettes/list.md',
      'palette',
    );

    expect(parsed.colors).toEqual([
      { name: 'A', hex: '#111111', role: 'primary' },
      { name: 'B', hex: '#222222', role: 'secondary' },
    ]);
    expect(parsed.gradients).toEqual([
      { from: '#111111', to: '#222222' },
      { from: '#222222', to: '#333333' },
    ]);
    expect(parsed.warnings).toEqual([]);
  });
});
