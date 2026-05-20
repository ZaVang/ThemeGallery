import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { within } from '@testing-library/react';
import { PaletteExtractor } from './PaletteExtractor';

describe('PaletteExtractor', () => {
  it('lets extracted colors be edited before exporting markdown', async () => {
    const user = userEvent.setup();
    render(
      <PaletteExtractor
        initialColors={[
          { id: '1', name: 'Color 1', hex: '#452815', role: 'background' },
          { id: '2', name: 'Color 2', hex: '#73411F', role: 'secondary' },
        ]}
      />,
    );

    await user.clear(screen.getByLabelText('Palette name'));
    await user.type(screen.getByLabelText('Palette name'), 'Coffee Foam');
    await user.clear(screen.getByLabelText('Name for color 1'));
    await user.type(screen.getByLabelText('Name for color 1'), 'Coffee');
    await user.clear(screen.getByLabelText('Hex for color 2'));
    await user.type(screen.getByLabelText('Hex for color 2'), '#B6885D');

    expect(screen.getByDisplayValue(/name: Coffee Foam/)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/name: Coffee/)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/hex: "#B6885D"/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Save to assets/colors/' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Copy Markdown' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Download .md' })).toBeInTheDocument();
    expect(screen.getByText(/Primary save target:/)).toBeInTheDocument();
  });

  it('lets roles be assigned from the mapping panel and previews the derived colors', async () => {
    const user = userEvent.setup();
    render(
      <PaletteExtractor
        initialColors={[
          { id: '1', name: 'Coffee', hex: '#452815', role: 'background' },
          { id: '2', name: 'Foam', hex: '#E8D2B8', role: 'accent' },
          { id: '3', name: 'Ink', hex: '#111827', role: 'text' },
        ]}
      />,
    );

    expect(screen.getByText('Live derived preview')).toBeInTheDocument();
    expect(within(screen.getByLabelText('Role for color 1')).getByRole('option', { name: 'danger' })).toBeInTheDocument();
    expect(within(screen.getByLabelText('Role for color 1')).getByRole('option', { name: 'text' })).toBeInTheDocument();

    await user.selectOptions(screen.getByLabelText('Assign surface role'), '2');

    expect(screen.getByDisplayValue(/role: surface/)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/role: text/)).toBeInTheDocument();
  });

  it('stores selected usage scenario tags in the generated markdown', async () => {
    const user = userEvent.setup();
    render(
      <PaletteExtractor initialColors={[{ id: '1', name: 'Coffee', hex: '#452815', role: 'background' }]} />,
    );

    await user.click(screen.getByRole('checkbox', { name: 'AI tool' }));
    await user.click(screen.getByRole('checkbox', { name: 'Food/drink' }));

    expect(screen.getByDisplayValue(/"ai tool"/)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/"food\/drink"/)).toBeInTheDocument();
  });

  it('saves adjusted markdown into the local palette library', async () => {
    const user = userEvent.setup();
    const savePalette = vi.fn().mockResolvedValue({
      fileName: 'coffee-foam.md',
      filePath: 'assets/colors/coffee-foam.md',
    });

    render(
      <PaletteExtractor
        initialColors={[{ id: '1', name: 'Coffee', hex: '#452815', role: 'background' }]}
        reloadAfterSave={false}
        savePalette={savePalette}
      />,
    );

    await user.clear(screen.getByLabelText('Palette name'));
    await user.type(screen.getByLabelText('Palette name'), 'Coffee Foam');
    await user.click(screen.getByRole('button', { name: 'Save to assets/colors/' }));

    expect(savePalette).toHaveBeenCalledWith({
      fileName: 'coffee-foam.md',
      markdown: expect.stringContaining('name: Coffee Foam'),
    });
    expect(await screen.findByText('Saved to assets/colors/coffee-foam.md. Reloading library...')).toBeInTheDocument();
  });

  it('shows recoverable save errors', async () => {
    const user = userEvent.setup();
    const savePalette = vi.fn().mockRejectedValue(new Error('assets/colors/coffee-foam.md already exists.'));

    render(
      <PaletteExtractor
        initialColors={[{ id: '1', name: 'Coffee', hex: '#452815', role: 'background' }]}
        reloadAfterSave={false}
        savePalette={savePalette}
      />,
    );

    await user.clear(screen.getByLabelText('Palette name'));
    await user.type(screen.getByLabelText('Palette name'), 'Coffee Foam');
    await user.click(screen.getByRole('button', { name: 'Save to assets/colors/' }));

    expect(await screen.findByText('assets/colors/coffee-foam.md already exists.')).toBeInTheDocument();
  });
});
