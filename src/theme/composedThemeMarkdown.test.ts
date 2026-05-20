import { composeThemeMarkdown, createDesignFileName } from './composedThemeMarkdown';
import type { NormalizedTheme } from '../types/theme';

function makeTheme(id: string, name: string): NormalizedTheme {
  return {
    id,
    kind: 'theme',
    filePath: `assets/designs/${id}.md`,
    name,
    tags: ['luxury'],
    colors: {
      background: '#fffbeb',
      surface: '#ffffff',
      primary: '#1c1917',
      secondary: '#fffbeb',
      tertiary: '#b8860b',
    },
    colorSwatches: [],
    gradients: [{ from: '#1c1917', to: '#b8860b' }],
    typography: {
      body: {
        fontFamily: 'Raleway',
        fontSize: '16px',
        fontWeight: '400',
        lineHeight: '27px',
      },
    },
    rounded: { md: '4px' },
    spacing: { lg: '24px' },
    components: {
      button: {
        background: '#1c1917',
      },
    },
    markdownBody: [
      '## Overview',
      'Luxury shopping system.',
      '',
      '## Colors',
      '- **Primary** (#1C1917): Charcoal',
    ].join('\n'),
    warnings: [],
  };
}

describe('composedThemeMarkdown', () => {
  it('creates a safe design asset file name', () => {
    expect(createDesignFileName('LuxCart Linear Mix')).toBe('luxcart-linear-mix.md');
  });

  it('wraps composed design sections with full theme frontmatter', () => {
    const theme = makeTheme('luxcart', 'LuxCart');
    const markdown = composeThemeMarkdown({
      name: 'LuxCart Linear Mix',
      themes: [theme],
      selections: {
        overview: 'luxcart',
        colors: 'luxcart',
        typography: 'luxcart',
        spacing: 'luxcart',
        radius: 'luxcart',
        components: 'luxcart',
        guidance: 'luxcart',
      },
      selectedAtoms: [{ name: 'Luna Ocean Color', dimensions: ['color'] }],
    });

    expect(markdown).toContain('name: "LuxCart Linear Mix"');
    expect(markdown).toContain('tags:');
    expect(markdown).toContain('- "composed"');
    expect(markdown).toContain('colors:');
    expect(markdown).toContain('tertiary: "#b8860b"');
    expect(markdown).toContain('typography:');
    expect(markdown).toContain('rounded:');
    expect(markdown).toContain('components:');
    expect(markdown).toContain('# LuxCart Linear Mix');
    expect(markdown).toContain('Luxury shopping system.');
  });
});
