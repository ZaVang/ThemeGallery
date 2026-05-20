import { mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { createPaletteMarkdown } from './paletteMarkdown';
import { PaletteSaveError, savePaletteMarkdownToLibrary } from './localPaletteSave';

describe('localPaletteSave', () => {
  let rootDir: string;

  beforeEach(async () => {
    rootDir = await mkdtemp(path.join(tmpdir(), 'themegallery-save-'));
  });

  afterEach(async () => {
    await rm(rootDir, { recursive: true, force: true });
  });

  function validMarkdown(): string {
    return createPaletteMarkdown({
      name: 'Coffee Foam',
      source: '小红书',
      mood: 'warm coffee palette',
      colors: [
        { id: '1', name: 'Coffee', hex: '#452815', role: 'background' },
        { id: '2', name: 'Peru', hex: '#73411F', role: 'primary' },
      ],
    });
  }

  it('writes generated palette markdown into assets/colors', async () => {
    const result = await savePaletteMarkdownToLibrary(
      { fileName: 'coffee-foam.md', markdown: validMarkdown() },
      rootDir,
    );

    await expect(readFile(path.join(rootDir, 'assets', 'colors', 'coffee-foam.md'), 'utf8')).resolves.toContain(
      'name: Coffee Foam',
    );
    expect(result).toEqual({
      fileName: 'coffee-foam.md',
      filePath: 'assets/colors/coffee-foam.md',
      absolutePath: path.join(rootDir, 'assets', 'colors', 'coffee-foam.md'),
    });
  });

  it('rejects duplicate palette file names', async () => {
    await mkdir(path.join(rootDir, 'assets', 'colors'), { recursive: true });
    await writeFile(path.join(rootDir, 'assets', 'colors', 'coffee-foam.md'), validMarkdown(), 'utf8');

    await expect(
      savePaletteMarkdownToLibrary({ fileName: 'coffee-foam.md', markdown: validMarkdown() }, rootDir),
    ).rejects.toMatchObject({
      statusCode: 409,
      message: 'assets/colors/coffee-foam.md already exists. Pick another color asset name before saving.',
    });
  });

  it('rejects invalid palette markdown', async () => {
    await expect(
      savePaletteMarkdownToLibrary({ fileName: 'broken.md', markdown: 'not frontmatter' }, rootDir),
    ).rejects.toBeInstanceOf(PaletteSaveError);
    await expect(
      savePaletteMarkdownToLibrary({ fileName: 'broken.md', markdown: 'not frontmatter' }, rootDir),
    ).rejects.toMatchObject({
      statusCode: 400,
      message: 'Palette Markdown must include a name and at least one color.',
    });
  });
});
