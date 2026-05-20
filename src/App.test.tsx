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
    expect(screen.getByRole('button', { name: 'Select Linear' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Select Soft Mauve' })).toBeInTheDocument();
  });

  it('filters the library by search text', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.type(screen.getByRole('searchbox', { name: /search/i }), 'linear');

    expect(screen.getByRole('button', { name: 'Select Linear' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Select Apple' })).not.toBeInTheDocument();
  });

  it('filters the library by usage scenario tag', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.selectOptions(screen.getByLabelText('Scenario tag filter'), 'minimal');

    expect(screen.getByRole('button', { name: 'Select Luna Ocean' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Select Linear' })).not.toBeInTheDocument();
  });

  it('compares two selected visual directions and can remove one', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: /Add Linear to compare/ }));
    await user.click(screen.getByRole('button', { name: /Add Soft Mauve to compare/ }));

    expect(screen.getByRole('heading', { name: 'Compare 2 directions' })).toBeInTheDocument();

    await user.click(screen.getByRole('tab', { name: 'Color Card' }));

    expect(screen.getByLabelText('Linear color card')).toBeInTheDocument();
    expect(screen.getByLabelText('Soft Mauve color card')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Remove Linear from comparison' }));

    expect(screen.queryByRole('heading', { name: 'Compare 2 directions' })).not.toBeInTheDocument();
  });
});
