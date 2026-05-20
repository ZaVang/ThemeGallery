import { savePaletteMarkdown } from './savePalette';

describe('savePaletteMarkdown', () => {
  it('posts generated markdown to the local palette save endpoint', async () => {
    const fetcher = vi.fn().mockResolvedValue({
      ok: true,
      json: () =>
        Promise.resolve({
          fileName: 'coffee-foam.md',
          filePath: 'palettes/coffee-foam.md',
        }),
    });

    await expect(
      savePaletteMarkdown({ fileName: 'coffee-foam.md', markdown: '---\nname: Coffee Foam\n---\n' }, fetcher),
    ).resolves.toEqual({
      fileName: 'coffee-foam.md',
      filePath: 'palettes/coffee-foam.md',
    });

    expect(fetcher).toHaveBeenCalledWith('/api/palettes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fileName: 'coffee-foam.md', markdown: '---\nname: Coffee Foam\n---\n' }),
    });
  });

  it('surfaces duplicate or invalid save messages from the local endpoint', async () => {
    const fetcher = vi.fn().mockResolvedValue({
      ok: false,
      json: () =>
        Promise.resolve({
          message: 'palettes/coffee-foam.md already exists. Pick another palette name before saving.',
        }),
    });

    await expect(savePaletteMarkdown({ fileName: 'coffee-foam.md', markdown: 'bad' }, fetcher)).rejects.toThrow(
      'palettes/coffee-foam.md already exists. Pick another palette name before saving.',
    );
  });
});
