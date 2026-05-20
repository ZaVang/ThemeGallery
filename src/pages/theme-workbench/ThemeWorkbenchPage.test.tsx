import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeWorkbenchPage } from './ThemeWorkbenchPage';

describe('ThemeWorkbenchPage', () => {
  it('renders the local theme workbench sources', () => {
    render(<ThemeWorkbenchPage />);

    expect(screen.getByRole('heading', { name: 'Themes' })).toBeInTheDocument();
    expect(screen.queryByText('Palette Extractor')).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Select LuxCart' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Select Soft Mauve' })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Palettes' })).not.toBeInTheDocument();
  });

  it('filters page sources by search text', async () => {
    const user = userEvent.setup();
    render(<ThemeWorkbenchPage />);

    await user.type(screen.getByRole('searchbox', { name: /search/i }), 'lux');

    expect(screen.getByRole('button', { name: 'Select LuxCart' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Select Soft Mauve' })).not.toBeInTheDocument();
  });

  it('applies the selected full theme to the app appearance', async () => {
    const user = userEvent.setup();
    const onApplyAppearancePatch = vi.fn();
    render(<ThemeWorkbenchPage onApplyAppearancePatch={onApplyAppearancePatch} />);

    await user.click(screen.getByRole('button', { name: 'Apply LuxCart to app appearance' }));

    expect(onApplyAppearancePatch).toHaveBeenCalledWith(expect.objectContaining({
      tokens: expect.objectContaining({
        bg: '#fffbeb',
        accent: '#b8860b',
        fontDisplay: expect.stringContaining('Cormorant Garamond'),
      }),
    }));
  });
});
