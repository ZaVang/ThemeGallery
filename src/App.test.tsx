import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('App', () => {
  it('renders the product shell and default themes page', () => {
    render(<App />);
    expect(screen.getByText('ThemeGallery')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Themes' })).toBeInTheDocument();
  });

  it('loads existing local markdown sources', () => {
    render(<App />);
    expect(screen.getByRole('button', { name: 'Select LuxCart' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Select Soft Mauve' })).not.toBeInTheDocument();
  });

  it('filters the library by search text', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.type(screen.getByRole('searchbox', { name: /search/i }), 'lux');

    expect(screen.getByRole('button', { name: 'Select LuxCart' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Select Soft Mauve' })).not.toBeInTheDocument();
  });

  it('filters the library by usage scenario tag', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.selectOptions(screen.getByLabelText('Scenario tag filter'), 'luxury');

    expect(screen.getByRole('button', { name: 'Select LuxCart' })).toBeInTheDocument();
  });

  it('applies a selected theme direction to the app shell', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: 'Apply LuxCart to app appearance' }));

    expect(screen.getByTestId('app-root')).toHaveStyle({ '--app-accent': '#b8860b' });
  });
});
