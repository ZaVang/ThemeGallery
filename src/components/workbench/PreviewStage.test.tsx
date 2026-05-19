import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { baseFoundation } from '../../theme/baseFoundation';
import type { NormalizedTheme } from '../../types/theme';
import { PreviewStage } from './PreviewStage';

const theme: NormalizedTheme = {
  id: 'demo',
  kind: 'theme',
  filePath: 'themes/demo.md',
  name: 'Demo Theme',
  tags: [],
  ...baseFoundation,
  markdownBody: '',
  warnings: [],
};

describe('PreviewStage', () => {
  it('switches between preview scenes', async () => {
    const user = userEvent.setup();
    render(<PreviewStage theme={theme} />);

    expect(screen.getByRole('heading', { name: 'Demo Theme' })).toBeInTheDocument();
    expect(screen.getByText('Revenue')).toBeInTheDocument();

    await user.click(screen.getByRole('tab', { name: 'Mobile' }));
    expect(screen.getByText('Focus score')).toBeInTheDocument();

    await user.click(screen.getByRole('tab', { name: 'Components' }));
    expect(screen.getByText('Buttons')).toBeInTheDocument();
  });
});

