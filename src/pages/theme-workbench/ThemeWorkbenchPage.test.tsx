import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeWorkbenchPage } from './ThemeWorkbenchPage';

describe('ThemeWorkbenchPage', () => {
  it('renders the local theme workbench sources', () => {
    render(<ThemeWorkbenchPage />);

    expect(screen.getByRole('heading', { name: 'ThemeGallery' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Select Linear' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Select Soft Mauve' })).toBeInTheDocument();
  });

  it('filters page sources by search text', async () => {
    const user = userEvent.setup();
    render(<ThemeWorkbenchPage />);

    await user.type(screen.getByRole('searchbox', { name: /search/i }), 'linear');

    expect(screen.getByRole('button', { name: 'Select Linear' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Select Apple' })).not.toBeInTheDocument();
  });
});
