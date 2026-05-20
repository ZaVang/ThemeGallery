import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { baseFoundation } from '../../theme/baseFoundation';
import type { NormalizedTheme } from '../../types/theme';
import { PreviewStage } from './PreviewStage';

const theme: NormalizedTheme = {
  id: 'demo',
  kind: 'theme',
  filePath: 'assets/designs/demo.md',
  name: 'Demo Theme',
  tags: [],
  ...baseFoundation,
  colorSwatches: [
    { name: 'Background', hex: '#f7f8fa', role: 'background', token: 'background' },
    { name: 'Primary', hex: '#2563eb', role: 'primary', token: 'primary' },
  ],
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

    await user.click(screen.getByRole('tab', { name: 'Color Card' }));
    expect(screen.getByText('Background')).toBeInTheDocument();
    expect(screen.getByText('HEX: #F7F8FA')).toBeInTheDocument();
  });
});
