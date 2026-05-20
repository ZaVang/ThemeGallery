import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { NormalizedTheme } from '../../types/theme';
import { ComposerPage } from './ComposerPage';

function makeTheme(id: string, name: string, markdownBody: string): NormalizedTheme {
  return {
    id,
    kind: 'theme',
    filePath: `assets/designs/${id}.md`,
    name,
    tags: [],
    colors: {
      background: '#FFFFFF',
      surface: '#FFFFFF',
      primary: '#111111',
      secondary: '#777777',
      tertiary: '#FF6600',
    },
    colorSwatches: [],
    gradients: [],
    typography: {},
    rounded: {},
    spacing: {},
    components: {},
    markdownBody,
    warnings: [],
  };
}

describe('ComposerPage', () => {
  it('combines selected atomic inspiration dimensions into a style mix', async () => {
    const user = userEvent.setup();
    const onApplyAppearancePatch = vi.fn();
    render(<ComposerPage onApplyAppearancePatch={onApplyAppearancePatch} />);

    expect(screen.getByRole('heading', { name: 'Composer' })).toBeInTheDocument();
    expect(screen.getByRole('group', { name: 'Color atoms' })).toBeInTheDocument();
    expect(screen.getByRole('group', { name: 'Typography atoms' })).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Use Luna Ocean Color' }));
    await user.click(screen.getByRole('button', { name: 'Use Editorial Serif Type' }));
    await user.click(screen.getByRole('button', { name: 'Apply style mix to app appearance' }));

    expect(onApplyAppearancePatch).toHaveBeenCalledWith(expect.objectContaining({
      tokens: expect.objectContaining({
        accent: '#54ACBF',
        fontDisplay: expect.stringContaining('Georgia'),
      }),
    }));
  });

  it('deselects an inspiration atom when the selected atom is clicked again', async () => {
    const user = userEvent.setup();
    const onApplyAppearancePatch = vi.fn();
    render(<ComposerPage onApplyAppearancePatch={onApplyAppearancePatch} />);

    const lunaColor = screen.getByRole('button', { name: 'Use Luna Ocean Color' });
    await user.click(lunaColor);
    expect(lunaColor).toHaveAttribute('aria-pressed', 'true');

    await user.click(lunaColor);

    expect(lunaColor).toHaveAttribute('aria-pressed', 'false');
    expect(screen.getByRole('button', { name: 'Apply style mix to app appearance' })).toBeDisabled();
  });

  it('builds a design.md draft from selected theme sections', async () => {
    const user = userEvent.setup();
    const onApplyAppearancePatch = vi.fn();
    const luxCart = makeTheme(
      'luxcart',
      'LuxCart',
      [
        '## Overview',
        'Luxury shopping system.',
        '',
        '## Colors',
        '- **Primary** (#1C1917): Charcoal',
        '',
        '## Typography',
        '- **Display**: Cormorant Garamond 48px',
      ].join('\n'),
    );
    const linear = makeTheme(
      'linear',
      'Linear',
      [
        '## Overview',
        'Operational SaaS system.',
        '',
        '## Colors',
        '- **Primary** (#5E6AD2): Purple',
        '',
        '## Components',
        '### Buttons',
        '- Compact, direct, keyboard-first.',
      ].join('\n'),
    );

    render(<ComposerPage themes={[luxCart, linear]} onApplyAppearancePatch={onApplyAppearancePatch} />);

    await user.selectOptions(screen.getByLabelText('Colors source'), 'linear');
    await user.selectOptions(screen.getByLabelText('Typography source'), 'luxcart');
    await user.selectOptions(screen.getByLabelText('Components source'), 'linear');

    const draft = screen.getByLabelText('Composed design.md') as HTMLTextAreaElement;
    expect(draft.value).toContain('# Composed Design Direction');
    expect(draft.value).not.toContain('_Source:');
    expect(draft.value).not.toContain('Source Map');
    expect(draft.value).not.toContain('No spacing section found');
    expect(draft.value).toContain('- **Primary** (#5E6AD2): Purple');
    expect(draft.value).toContain('- **Display**: Cormorant Garamond 48px');
    expect(draft.value).toContain('### Buttons');
    expect(screen.getByText('Missing sections')).toBeInTheDocument();
    expect(screen.getByText('Spacing from LuxCart')).toBeInTheDocument();
  });

  it('copies and downloads the composed design.md draft', async () => {
    const user = userEvent.setup();
    const onApplyAppearancePatch = vi.fn();
    const writeText = vi.fn().mockResolvedValue(undefined);
    const createObjectURL = vi.fn().mockReturnValue('blob:composed-design');
    const revokeObjectURL = vi.fn();
    const click = vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => {});
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText },
    });
    vi.stubGlobal('URL', {
      ...URL,
      createObjectURL,
      revokeObjectURL,
    });
    render(<ComposerPage themes={[makeTheme('apple', 'Apple', '## Overview\nClean consumer product UI.')]} onApplyAppearancePatch={onApplyAppearancePatch} />);

    await user.click(screen.getByRole('button', { name: 'Copy design.md' }));
    await user.click(screen.getByRole('button', { name: 'Download design.md' }));

    expect(writeText).toHaveBeenCalledWith(expect.stringContaining('# Composed Design Direction'));
    expect(createObjectURL).toHaveBeenCalledWith(expect.any(Blob));
    expect(click).toHaveBeenCalled();
    expect(revokeObjectURL).toHaveBeenCalledWith('blob:composed-design');
    expect(screen.getByText('Downloaded composed-design-direction.md.')).toBeInTheDocument();

    click.mockRestore();
    vi.unstubAllGlobals();
  });

  it('saves the composed direction as a full theme asset', async () => {
    const user = userEvent.setup();
    const onApplyAppearancePatch = vi.fn();
    const saveTheme = vi.fn().mockResolvedValue({
      fileName: 'luxcart-linear-mix.md',
      filePath: 'assets/designs/luxcart-linear-mix.md',
    });
    const luxCart = makeTheme(
      'luxcart',
      'LuxCart',
      [
        '## Overview',
        'Luxury shopping system.',
        '',
        '## Colors',
        '- **Primary** (#1C1917): Charcoal',
        '',
        '## Typography',
        '- **Display**: Cormorant Garamond 48px',
      ].join('\n'),
    );

    render(<ComposerPage themes={[luxCart]} onApplyAppearancePatch={onApplyAppearancePatch} saveTheme={saveTheme} />);

    await user.clear(screen.getByLabelText('Theme name'));
    await user.type(screen.getByLabelText('Theme name'), 'LuxCart Linear Mix');
    await user.click(screen.getByRole('button', { name: 'Save as theme' }));

    expect(saveTheme).toHaveBeenCalledWith(expect.objectContaining({
      fileName: 'luxcart-linear-mix.md',
      markdown: expect.stringContaining('name: "LuxCart Linear Mix"'),
    }));
    expect(saveTheme.mock.calls[0][0].markdown).toContain('colors:');
    expect(saveTheme.mock.calls[0][0].markdown).toContain('typography:');
    expect(await screen.findByText('Saved to assets/designs/luxcart-linear-mix.md. Reloading library...')).toBeInTheDocument();
  });
});
