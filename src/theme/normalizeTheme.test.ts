import type { ParsedThemeSource } from '../types/theme';
import { normalizeTheme } from './normalizeTheme';

describe('normalizeTheme', () => {
  it('normalizes full themes and resolves component references', () => {
    const source: ParsedThemeSource = {
      sourceKind: 'theme',
      filePath: 'themes/example.md',
      id: 'example',
      name: 'Example',
      tags: ['dark'],
      colors: {
        background: '#101010',
        'on-background': '#ffffff',
        surface: '#181818',
        'on-surface': '#ffffff',
        primary: '#5E6AD2',
        'on-primary': '#ffffff',
      },
      gradients: [],
      components: {
        'button-primary': {
          backgroundColor: '{colors.primary}',
          border: '1px solid {colors.primary}',
        },
      },
      markdownBody: 'Body',
      warnings: [],
    };

    const theme = normalizeTheme(source);

    expect(theme.kind).toBe('theme');
    expect(theme.colors.primary).toBe('#5e6ad2');
    expect(theme.colors['surface-container']).toBeDefined();
    expect(theme.components['button-primary'].backgroundColor).toBe('#5e6ad2');
    expect(theme.components['button-primary'].border).toBe('1px solid #5e6ad2');
    expect(theme.warnings).toEqual(
      expect.arrayContaining([expect.stringContaining('Missing color token "secondary"')]),
    );
  });
});

