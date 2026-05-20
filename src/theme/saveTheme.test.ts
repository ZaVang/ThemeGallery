import { saveThemeMarkdown } from './saveTheme';

describe('saveThemeMarkdown', () => {
  it('posts composed markdown to the local theme save endpoint', async () => {
    const fetcher = vi.fn().mockResolvedValue({
      ok: true,
      json: () =>
        Promise.resolve({
          fileName: 'luxcart-linear-mix.md',
          filePath: 'assets/designs/luxcart-linear-mix.md',
        }),
    });

    await expect(
      saveThemeMarkdown({ fileName: 'luxcart-linear-mix.md', markdown: '---\nname: Mix\ncolors: {}\n---\n' }, fetcher),
    ).resolves.toEqual({
      fileName: 'luxcart-linear-mix.md',
      filePath: 'assets/designs/luxcart-linear-mix.md',
    });

    expect(fetcher).toHaveBeenCalledWith('/api/themes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fileName: 'luxcart-linear-mix.md', markdown: '---\nname: Mix\ncolors: {}\n---\n' }),
    });
  });

  it('surfaces local theme save errors', async () => {
    const fetcher = vi.fn().mockResolvedValue({
      ok: false,
      json: () =>
        Promise.resolve({
          message: 'assets/designs/luxcart-linear-mix.md already exists. Pick another theme name before saving.',
        }),
    });

    await expect(saveThemeMarkdown({ fileName: 'luxcart-linear-mix.md', markdown: 'bad' }, fetcher)).rejects.toThrow(
      'assets/designs/luxcart-linear-mix.md already exists. Pick another theme name before saving.',
    );
  });
});
