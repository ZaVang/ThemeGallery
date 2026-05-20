import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { within } from '@testing-library/react';
import { AppShell } from './AppShell';

describe('AppShell', () => {
  it('renders the primary product pages and defaults to Themes', () => {
    render(<AppShell />);

    const nav = screen.getByRole('navigation', { name: 'Primary pages' });

    expect(nav).toBeInTheDocument();
    expect(within(nav).getByRole('button', { name: 'Themes' })).toHaveAttribute('aria-current', 'page');
    expect(within(nav).getByRole('button', { name: 'Import' })).toBeInTheDocument();
    expect(within(nav).getByRole('button', { name: 'Inspirations' })).toBeInTheDocument();
    expect(within(nav).getByRole('button', { name: 'Composer' })).toBeInTheDocument();
    expect(within(nav).getByRole('button', { name: 'Settings' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Themes' })).toBeInTheDocument();
  });

  it('switches pages without leaving the app shell', async () => {
    const user = userEvent.setup();
    render(<AppShell />);

    const nav = screen.getByRole('navigation', { name: 'Primary pages' });

    await user.click(within(nav).getByRole('button', { name: 'Inspirations' }));

    expect(within(nav).getByRole('button', { name: 'Inspirations' })).toHaveAttribute('aria-current', 'page');
    expect(screen.getByRole('heading', { name: 'Inspirations' })).toBeInTheDocument();
  });

  it('opens image import as a dedicated page', async () => {
    const user = userEvent.setup();
    render(<AppShell />);

    const nav = screen.getByRole('navigation', { name: 'Primary pages' });
    await user.click(within(nav).getByRole('button', { name: 'Import' }));

    expect(within(nav).getByRole('button', { name: 'Import' })).toHaveAttribute('aria-current', 'page');
    expect(screen.getByRole('heading', { name: 'Import' })).toBeInTheDocument();
    expect(screen.getByText('Palette Extractor')).toBeInTheDocument();
  });

  it('applies a selected app appearance preset through --app variables', async () => {
    const user = userEvent.setup();
    render(<AppShell />);

    await user.click(screen.getByRole('button', { name: 'Settings' }));
    await user.click(screen.getByRole('button', { name: 'Quiet Dark' }));

    const appRoot = screen.getByTestId('app-root');
    expect(appRoot).toHaveStyle({ '--app-bg': '#101316' });
    expect(appRoot).toHaveAttribute('data-app-material', 'solid');
  });

  it('applies an inspiration reference as a safe app appearance patch', async () => {
    const user = userEvent.setup();
    render(<AppShell />);

    const nav = screen.getByRole('navigation', { name: 'Primary pages' });
    await user.click(within(nav).getByRole('button', { name: 'Inspirations' }));
    await user.click(screen.getByRole('button', { name: 'Apply Luna Blue Metal to app appearance' }));

    const appRoot = screen.getByTestId('app-root');
    expect(appRoot).toHaveStyle({ '--app-accent': '#54ACBF' });
    expect(appRoot).toHaveAttribute('data-app-material', 'glass');
  });

  it('applies a composed style mix to the app appearance', async () => {
    const user = userEvent.setup();
    render(<AppShell />);

    const nav = screen.getByRole('navigation', { name: 'Primary pages' });
    await user.click(within(nav).getByRole('button', { name: 'Composer' }));
    await user.click(screen.getByRole('button', { name: 'Use Luna Ocean Color' }));
    await user.click(screen.getByRole('button', { name: 'Use Editorial Serif Type' }));
    await user.click(screen.getByRole('button', { name: 'Apply style mix to app appearance' }));

    const appRoot = screen.getByTestId('app-root');
    expect(appRoot).toHaveStyle({ '--app-accent': '#54ACBF' });
    expect(appRoot.getAttribute('style')).toContain('Georgia');
  });

  it('applies a selected full theme to the whole app shell', async () => {
    const user = userEvent.setup();
    render(<AppShell />);

    await user.click(screen.getByRole('button', { name: 'Apply LuxCart to app appearance' }));

    const appRoot = screen.getByTestId('app-root');
    expect(appRoot).toHaveStyle({ '--app-bg': '#fffbeb' });
    expect(appRoot).toHaveStyle({ '--app-accent': '#b8860b' });
    expect(appRoot.getAttribute('style')).toContain('Cormorant Garamond');
  });
});
