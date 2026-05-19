import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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
    expect(screen.getByRole('button', { name: 'Copy Markdown' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Download .md' })).toBeInTheDocument();
    expect(screen.getByText(/Save it into palettes/)).toBeInTheDocument();
  });
});
