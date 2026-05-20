import { mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { ThemeSaveError, saveThemeMarkdownToLibrary } from './localThemeSave';

describe('localThemeSave', () => {
  let rootDir: string;

  beforeEach(async () => {
    rootDir = await mkdtemp(path.join(tmpdir(), 'themegallery-theme-save-'));
  });

  afterEach(async () => {
    await rm(rootDir, { recursive: true, force: true });
  });

  function validMarkdown(): string {
    return [
      '---',
      'name: LuxCart Linear Mix',
      'colors:',
      '  background: "#fffbeb"',
      '  surface: "#ffffff"',
      '  primary: "#1c1917"',
      '---',
      '',
      '# LuxCart Linear Mix',
    ].join('\n');
  }

  it('writes composed theme markdown into assets/designs', async () => {
    const result = await saveThemeMarkdownToLibrary(
      { fileName: 'luxcart-linear-mix.md', markdown: validMarkdown() },
      rootDir,
    );

    await expect(readFile(path.join(rootDir, 'assets', 'designs', 'luxcart-linear-mix.md'), 'utf8')).resolves.toContain(
      'name: LuxCart Linear Mix',
    );
    expect(result).toEqual({
      fileName: 'luxcart-linear-mix.md',
      filePath: 'assets/designs/luxcart-linear-mix.md',
      absolutePath: path.join(rootDir, 'assets', 'designs', 'luxcart-linear-mix.md'),
    });
  });

  it('rejects duplicate theme file names', async () => {
    await mkdir(path.join(rootDir, 'assets', 'designs'), { recursive: true });
    await writeFile(path.join(rootDir, 'assets', 'designs', 'luxcart-linear-mix.md'), validMarkdown(), 'utf8');

    await expect(
      saveThemeMarkdownToLibrary({ fileName: 'luxcart-linear-mix.md', markdown: validMarkdown() }, rootDir),
    ).rejects.toMatchObject({
      statusCode: 409,
      message: 'assets/designs/luxcart-linear-mix.md already exists. Pick another theme name before saving.',
    });
  });

  it('rejects invalid theme markdown', async () => {
    await expect(
      saveThemeMarkdownToLibrary({ fileName: 'broken.md', markdown: 'not frontmatter' }, rootDir),
    ).rejects.toBeInstanceOf(ThemeSaveError);
    await expect(
      saveThemeMarkdownToLibrary({ fileName: 'broken.md', markdown: 'not frontmatter' }, rootDir),
    ).rejects.toMatchObject({
      statusCode: 400,
      message: 'Theme Markdown must include a name and colors object.',
    });
  });
});
