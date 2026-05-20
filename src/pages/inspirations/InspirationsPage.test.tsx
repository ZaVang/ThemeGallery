import { render, screen } from '@testing-library/react';
import { within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { InspirationsPage } from './InspirationsPage';

describe('InspirationsPage', () => {
  it('renders references across design dimensions', () => {
    render(<InspirationsPage onApplyAppearancePatch={vi.fn()} />);

    expect(screen.getByRole('heading', { name: 'Inspirations' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Material' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Luna Blue Metal' })).toBeInTheDocument();

    const lunaCard = screen.getByLabelText('Luna Blue Metal reference');
    expect(within(lunaCard).getByText('material')).toBeInTheDocument();
    expect(within(lunaCard).getByText('lighting')).toBeInTheDocument();
  });

  it('filters references by dimension and applies an app appearance patch', async () => {
    const user = userEvent.setup();
    const onApplyAppearancePatch = vi.fn();
    render(<InspirationsPage onApplyAppearancePatch={onApplyAppearancePatch} />);

    await user.click(screen.getByRole('button', { name: 'Typography' }));

    expect(screen.getByRole('heading', { name: 'Editorial Serif Poster' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Luna Blue Metal' })).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Apply Editorial Serif Poster to app appearance' }));

    expect(onApplyAppearancePatch).toHaveBeenCalledWith(expect.objectContaining({
      tokens: expect.objectContaining({ fontDisplay: expect.stringContaining('Georgia') }),
    }));
  });
});
