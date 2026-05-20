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
  colorSwatches: [
    { name: 'Alice Blue', hex: '#f0f8ff', role: 'background' },
    { name: 'Pale Slate', hex: '#b8a9c9', role: 'primary' },
  ],
  markdownBody: '## 感受\n柔和雅致，像清晨薄雾。',
  warnings: ['Palette-derived theme uses Base UI Foundation typography, spacing, radius, and component tokens.'],
  riskSummary: {
    status: 'fail',
    failCount: 1,
    noteCount: 1,
    items: [
      {
        severity: 'fail',
        label: 'Page text',
        message: 'Page text contrast is 2.40:1; raise it to at least 4.50:1.',
        ratio: 2.4,
      },
      {
        severity: 'note',
        label: 'Surface layering',
        message: 'Background and surface are very close; cards may not separate clearly.',
      },
    ],
  },
};

describe('ThemeInspector', () => {
  it('shows metadata, warnings, typography, spacing, and markdown notes', () => {
    render(<ThemeInspector theme={theme} />);

    expect(screen.getByText('Soft Mauve')).toBeInTheDocument();
    expect(screen.getByText('小红书')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Notes' })).toBeInTheDocument();
    expect(screen.getByText(/Base UI Foundation/)).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Readability Risks' })).toBeInTheDocument();
    expect(screen.getByText('Needs fix')).toBeInTheDocument();
    expect(screen.getAllByText(/Page text contrast/)).toHaveLength(2);
    expect(screen.getByText('Design note')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Quick Brief' })).toBeInTheDocument();
    expect(screen.getByText(/Palette-derived direction/)).toBeInTheDocument();
    expect(screen.getByText('body-md')).toBeInTheDocument();
    expect(screen.getByText('container-padding')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '感受' })).toBeInTheDocument();
  });
});
