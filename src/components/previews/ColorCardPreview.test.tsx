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

describe('ColorCardPreview', () => {
  it('orders color rows like the library swatch strip', () => {
    render(<ColorCardPreview theme={makeTheme()} />);

    const card = screen.getByLabelText('Role Order color card');
    const rowNames = [...card.querySelectorAll('.color-card-row strong')].map((node) => node.textContent);

    expect(rowNames).toEqual(['Background', 'Surface', 'Primary', 'Secondary', 'Accent']);
  });

  it('can ignore theme gradients for structural comparison', () => {
    render(<ColorCardPreview theme={makeTheme()} useThemeGradient={false} />);

    expect(screen.getByLabelText('Role Order color card')).not.toHaveAttribute('style');
  });
});
