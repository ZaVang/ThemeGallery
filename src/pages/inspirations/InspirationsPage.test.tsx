import { render, screen } from '@testing-library/react';
import { within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { InspirationsPage } from './InspirationsPage';

describe('InspirationsPage', () => {
  it('defaults to combination references instead of mixing every atomic source', () => {
    render(<InspirationsPage onApplyAppearancePatch={vi.fn()} />);

    expect(screen.getByRole('heading', { name: 'Inspirations' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Combinations' })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByRole('button', { name: 'Material' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Luna Blue Metal' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Luna Ocean Color' })).not.toBeInTheDocument();

    const lunaCard = screen.getByLabelText('Luna Blue Metal reference');
    expect(within(lunaCard).getByText('material')).toBeInTheDocument();
    expect(within(lunaCard).getByText('lighting')).toBeInTheDocument();
  });

  it('shows one-dimension atoms in dimension tabs and applies only that atomic patch', async () => {
    const user = userEvent.setup();
    const onApplyAppearancePatch = vi.fn();
    render(<InspirationsPage onApplyAppearancePatch={onApplyAppearancePatch} />);

    await user.click(screen.getByRole('button', { name: 'Color' }));

    expect(screen.getByRole('heading', { name: 'Luna Ocean Color' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Luna Blue Metal' })).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Apply Luna Ocean Color to app appearance' }));

    expect(onApplyAppearancePatch).toHaveBeenCalledWith(expect.objectContaining({
      tokens: expect.objectContaining({ accent: '#54ACBF' }),
    }));
    expect(onApplyAppearancePatch).toHaveBeenCalledWith(expect.not.objectContaining({ material: 'glass' }));
  });
});
