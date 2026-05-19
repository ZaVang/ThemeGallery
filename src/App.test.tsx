import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('App', () => {
  it('renders the ThemeGallery workbench title', () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: 'ThemeGallery' })).toBeInTheDocument();
  });

  it('loads existing local markdown sources', () => {
    render(<App />);
    expect(screen.getByRole('button', { name: /Linear/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Soft Mauve/ })).toBeInTheDocument();
  });

  it('filters the library by search text', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.type(screen.getByRole('searchbox', { name: /search/i }), 'linear');

    expect(screen.getByRole('button', { name: /Linear/ })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /Apple/ })).not.toBeInTheDocument();
  });
});

