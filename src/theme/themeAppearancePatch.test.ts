import { themeToAppAppearancePatch } from './themeAppearancePatch';
import { baseFoundation } from './baseFoundation';
import type { NormalizedTheme } from '../types/theme';

describe('themeToAppAppearancePatch', () => {
  it('maps a full theme into app shell appearance tokens', () => {
    const theme: NormalizedTheme = {
      id: 'luxcart',
      kind: 'theme',
      filePath: 'assets/designs/luxcart.md',
      name: 'LuxCart',
      tags: ['luxury'],
      ...baseFoundation,
      colors: {
        ...baseFoundation.colors,
        background: '#fffbeb',
        surface: '#ffffff',
        'surface-container': '#fafaf9',
        'on-background': '#1c1917',
        'on-surface-variant': '#57534e',
        outline: '#d4d4d8',
        'outline-variant': '#e7e5e4',
        primary: '#1c1917',
        'on-primary': '#fffbeb',
        tertiary: '#b8860b',
        'on-tertiary': '#ffffff',
        error: '#991b1b',
      },
      typography: {
        ...baseFoundation.typography,
        display: {
          fontFamily: 'Cormorant Garamond',
          fontSize: '48px',
          fontWeight: '300',
          lineHeight: '52px',
        },
        body: {
          fontFamily: 'Raleway',
          fontSize: '16px',
          fontWeight: '400',
          lineHeight: '27px',
        },
      },
      rounded: {
        ...baseFoundation.rounded,
        sm: '2px',
        md: '4px',
        lg: '6px',
        xl: '8px',
      },
      colorSwatches: [],
      markdownBody: '',
      warnings: [],
    };

    expect(themeToAppAppearancePatch(theme)).toEqual(expect.objectContaining({
      material: 'solid',
      tokens: expect.objectContaining({
        bg: '#fffbeb',
        surface: '#ffffff',
        accent: '#b8860b',
        accentText: '#ffffff',
        danger: '#991b1b',
        radiusMd: '4px',
        fontBody: expect.stringContaining('Raleway'),
        fontDisplay: expect.stringContaining('Cormorant Garamond'),
      }),
    }));
  });
});
