import type { ParsedThemeSource } from '../types/theme';
import { derivePaletteTheme } from './derivePaletteTheme';

const softMauve: ParsedThemeSource = {
  sourceKind: 'palette',
  filePath: 'palettes/soft-mauve.md',
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
    expect(theme.warnings).toContain('Palette-derived theme uses Base UI Foundation typography, spacing, radius, and component tokens.');
  });
});

