import type { PaletteColor, ParsedThemeSource } from '../types/theme';
import { derivePaletteTheme } from './derivePaletteTheme';

const softMauve: ParsedThemeSource = {
  sourceKind: 'palette',
  filePath: 'assets/colors/soft-mauve.md',
  id: 'soft-mauve',
  name: 'Soft Mauve',
  tags: ['soft', 'mauve'],
  mood: '柔和雅致',
  source: '小红书',
  colors: [
    { name: 'Alice Blue', hex: '#F0F8FF', role: 'background' },
    { name: 'Pearl Aqua', hex: '#88D8C0', role: 'secondary' },
    { name: 'Pale Slate', hex: '#B8A9C9', role: 'primary' },
    { name: 'Lilac Ash', hex: '#C9A0B0', role: 'accent' },
    { name: 'Mauve Shadow', hex: '#5C3D52', role: 'surface' },
  ],
  gradients: [{ from: '#F0F8FF', to: '#88D8C0' }],
  markdownBody: '## 感受\n柔和雅致',
  warnings: [],
};

describe('derivePaletteTheme', () => {
  it('maps palette roles into a full normalized theme', () => {
    const theme = derivePaletteTheme(softMauve);

    expect(theme.kind).toBe('palette-derived');
    expect(theme.colors.background).toBe('#f0f8ff');
    expect(theme.colors.primary).toBe('#b8a9c9');
    expect(theme.colors.secondary).toBe('#88d8c0');
    expect(theme.colors.tertiary).toBe('#c9a0b0');
    expect(theme.colors.surface).toBe('#5c3d52');
    expect(theme.colors['on-surface']).toBe('#ffffff');
    expect(theme.typography['body-md'].fontFamily).toBe('Inter');
    expect(theme.components['button-primary'].backgroundColor).toBe('{colors.primary}');
    expect(theme.colorSwatches).toEqual([
      { name: 'Alice Blue', hex: '#f0f8ff', role: 'background' },
      { name: 'Pearl Aqua', hex: '#88d8c0', role: 'secondary' },
      { name: 'Pale Slate', hex: '#b8a9c9', role: 'primary' },
      { name: 'Lilac Ash', hex: '#c9a0b0', role: 'accent' },
      { name: 'Mauve Shadow', hex: '#5c3d52', role: 'surface' },
    ]);
    expect(theme.warnings).toContain('Palette-derived theme uses Base UI Foundation typography, spacing, radius, and component tokens.');
  });

  it('generates gradients when palette markdown does not provide them', () => {
    const theme = derivePaletteTheme({
      ...softMauve,
      gradients: [],
    });

    expect(theme.gradients).toEqual([
      { from: '#b8a9c9', to: '#f0f8ff' },
      { from: '#88d8c0', to: '#5c3d52' },
      { from: '#c9a0b0', to: '#f0f8ff' },
    ]);
  });

  it('maps text and danger roles into readable UI tokens', () => {
    const theme = derivePaletteTheme({
      ...softMauve,
      colors: [
        ...(softMauve.colors as PaletteColor[]),
        { name: 'Ink', hex: '#102030', role: 'text' },
        { name: 'Warning Red', hex: '#B00020', role: 'danger' },
      ],
    });

    expect(theme.colors['on-background']).toBe('#102030');
    expect(theme.colors['on-surface']).toBe('#102030');
    expect(theme.colors['on-surface-variant']).toBe('#102030');
    expect(theme.colors.error).toBe('#b00020');
    expect(theme.colors['on-error']).toBe('#ffffff');
  });
});
