import { render, screen } from '@testing-library/react';
import { baseFoundation } from '../../theme/baseFoundation';
import type { NormalizedTheme } from '../../types/theme';
import { ColorCardPreview } from './ColorCardPreview';

function makeTheme(): NormalizedTheme {
  return {
    id: 'role-order',
    kind: 'palette-derived',
    filePath: 'palettes/role-order.md',
    name: 'Role Order',
    tags: [],
    ...baseFoundation,
    colorSwatches: [
      { name: 'Accent', hex: '#7F3B07', role: 'accent' },
      { name: 'Primary', hex: '#355410', role: 'primary' },
      { name: 'Secondary', hex: '#B5C472', role: 'secondary' },
      { name: 'Surface', hex: '#E5D699', role: 'surface' },
      { name: 'Background', hex: '#E6E6BA', role: 'background' },
    ],
    gradients: [{ from: '#7F3B07', to: '#E5D699' }],
    markdownBody: '',
    warnings: [],
  };
}

function makeFullTheme(): NormalizedTheme {
  return {
    id: 'apple-like',
    kind: 'theme',
    filePath: 'themes/apple-like.md',
    name: 'Apple Like',
    tags: [],
    ...baseFoundation,
    colors: {
      ...baseFoundation.colors,
      background: '#ffffff',
      surface: '#ffffff',
      primary: '#0071e3',
      secondary: '#86868b',
      tertiary: '#bf5af2',
    },
    colorSwatches: [
      { name: 'Background', hex: '#ffffff', role: 'background', token: 'background' },
      { name: 'Surface', hex: '#ffffff', role: 'surface', token: 'surface' },
      { name: 'Primary', hex: '#0071e3', role: 'primary', token: 'primary' },
      { name: 'Secondary', hex: '#86868b', role: 'secondary', token: 'secondary' },
      { name: 'Tertiary', hex: '#bf5af2', role: 'tertiary', token: 'tertiary' },
    ],
    gradients: [],
    markdownBody: '',
    warnings: [],
  };
}

describe('ColorCardPreview', () => {
  it('orders color rows like the library swatch strip', () => {
    render(<ColorCardPreview theme={makeTheme()} />);

    const card = screen.getByLabelText('Role Order color card');
    const rowNames = [...card.querySelectorAll('.color-card-row strong')].map((node) => node.textContent);

    expect(rowNames).toEqual(['Background', 'Surface', 'Primary', 'Secondary', 'Accent']);
  });

  it('shows full design templates as a distinct design palette', () => {
    render(<ColorCardPreview theme={makeFullTheme()} />);

    const card = screen.getByLabelText('Apple Like color card');
    const rowNames = [...card.querySelectorAll('.color-card-row strong')].map((node) => node.textContent);

    expect(rowNames).toEqual(['Primary', 'Secondary', 'Tertiary', 'Background']);
  });

  it('can ignore theme gradients for structural comparison', () => {
    render(<ColorCardPreview theme={makeTheme()} useThemeGradient={false} />);

    expect(screen.getByLabelText('Role Order color card')).not.toHaveAttribute('style');
  });
});
