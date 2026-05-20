import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { baseFoundation } from '../../theme/baseFoundation';
import type { NormalizedTheme } from '../../types/theme';
import { ComparisonStage } from './ComparisonStage';
import type { PreviewTab } from './previewScenes';

function makeTheme(id: string, name: string, primary: string): NormalizedTheme {
  return {
    id,
    kind: 'theme',
    filePath: `themes/${id}.md`,
    name,
    tags: [],
    ...baseFoundation,
    colors: {
      ...baseFoundation.colors,
      primary,
    },
    colorSwatches: [
      { name: 'Background', hex: '#F7F8FA', role: 'background', token: 'background' },
      { name: 'Primary', hex: primary, role: 'primary', token: 'primary' },
    ],
    markdownBody: '',
    warnings: [],
  };
}

describe('ComparisonStage', () => {
  it('renders the same preview scene for each compared theme', async () => {
    const user = userEvent.setup();
    const onActiveTabChange = vi.fn();
    const onRemoveTheme = vi.fn();

    function Harness() {
      const [activeTab, setActiveTab] = useState<PreviewTab>('Dashboard');
      return (
        <ComparisonStage
          activeTab={activeTab}
          themes={[makeTheme('linear', 'Linear', '#7C3AED'), makeTheme('apple', 'Apple', '#2563EB')]}
          onActiveTabChange={(tab) => {
            onActiveTabChange(tab);
            setActiveTab(tab);
          }}
          onRemoveTheme={onRemoveTheme}
        />
      );
    }

    render(<Harness />);

    expect(screen.getByRole('heading', { name: 'Compare 2 directions' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Linear' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Apple' })).toBeInTheDocument();
    expect(screen.getAllByText('Revenue')).toHaveLength(2);

    await user.click(screen.getByRole('tab', { name: 'Color Card' }));

    expect(onActiveTabChange).toHaveBeenCalledWith('Color Card');
    expect(screen.getByLabelText('Linear color card')).toBeInTheDocument();
    expect(screen.getByLabelText('Apple color card')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Remove Linear from comparison' }));
    expect(onRemoveTheme).toHaveBeenCalledWith('themes/linear.md');
  });
});
