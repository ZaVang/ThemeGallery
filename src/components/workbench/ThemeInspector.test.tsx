import { render, screen } from '@testing-library/react';
import { baseFoundation } from '../../theme/baseFoundation';
import type { NormalizedTheme } from '../../types/theme';
import { ThemeInspector } from './ThemeInspector';

const theme: NormalizedTheme = {
  id: 'soft-mauve',
  kind: 'palette-derived',
  filePath: 'palettes/soft-mauve.md',
  name: 'Soft Mauve',
  tags: ['soft', 'mauve'],
  mood: '柔和雅致',
  source: '小红书',
  ...baseFoundation,
  markdownBody: '## 感受\n柔和雅致，像清晨薄雾。',
  warnings: ['Palette-derived theme uses Base UI Foundation typography, spacing, radius, and component tokens.'],
};

describe('ThemeInspector', () => {
  it('shows metadata, warnings, typography, spacing, and markdown notes', () => {
    render(<ThemeInspector theme={theme} />);

    expect(screen.getByText('Soft Mauve')).toBeInTheDocument();
    expect(screen.getByText('小红书')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Notes' })).toBeInTheDocument();
    expect(screen.getByText(/Base UI Foundation/)).toBeInTheDocument();
    expect(screen.getByText('body-md')).toBeInTheDocument();
    expect(screen.getByText('container-padding')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '感受' })).toBeInTheDocument();
  });
});
