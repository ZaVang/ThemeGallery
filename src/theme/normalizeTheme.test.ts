import type { ParsedThemeSource } from '../types/theme';
import { normalizeTheme } from './normalizeTheme';

describe('normalizeTheme', () => {
  it('normalizes full themes and resolves component references', () => {
    const source: ParsedThemeSource = {
      sourceKind: 'theme',
      filePath: 'assets/designs/example.md',
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
    expect(theme.colorProvenance?.primary).toBe('authored');
    expect(theme.colorProvenance?.['on-primary']).toBe('authored');
    expect(theme.colorProvenance?.['surface-container']).toBe('derived');
    expect(theme.colorProvenance?.secondary).toBe('fallback');
    expect(theme.components['button-primary'].backgroundColor).toBe('#5e6ad2');
    expect(theme.components['button-primary'].border).toBe('1px solid #5e6ad2');
    expect(theme.colorSwatches).toEqual([
      { name: 'Background', hex: '#101010', role: 'background', token: 'background' },
      { name: 'Surface', hex: '#181818', role: 'surface', token: 'surface' },
      { name: 'Primary', hex: '#5e6ad2', role: 'primary', token: 'primary' },
      { name: 'Secondary', hex: '#0f766e', role: 'secondary', token: 'secondary' },
      { name: 'Tertiary', hex: '#a855f7', role: 'tertiary', token: 'tertiary' },
    ]);
    expect(theme.warnings.some((warning) => warning.startsWith('Missing color token'))).toBe(false);
  });

  it('derives missing semantic colors from authored theme colors', () => {
    const theme = normalizeTheme({
      sourceKind: 'theme',
      filePath: 'assets/designs/luxcart.md',
      id: 'luxcart',
      name: 'LuxCart',
      tags: [],
      colors: {
        background: '#FFFBEB',
        surface: '#FFFFFF',
        primary: '#1C1917',
        secondary: '#FFFBEB',
        tertiary: '#B8860B',
        neutral: '#D4D4D8',
      },
      gradients: [],
      markdownBody: '',
      warnings: [],
    });

    expect(theme.colors['on-primary']).toBeDefined();
    expect(theme.colors['primary-container']).toBeDefined();
    expect(theme.colors.outline).toBe('#d4d4d8');
    expect(theme.colorProvenance?.background).toBe('authored');
    expect(theme.colorProvenance?.['on-primary']).toBe('derived');
    expect(theme.colorProvenance?.['primary-container']).toBe('derived');
    expect(theme.colorProvenance?.outline).toBe('derived');
    expect(theme.colorProvenance?.error).toBe('fallback');
  });
});
