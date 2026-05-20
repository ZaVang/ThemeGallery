import { constants } from 'node:fs';
import { access, mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';
import { colorAssetsDir, colorAssetPath } from '../data/assetPaths';

export interface LocalPaletteSaveInput {
  fileName: unknown;
  markdown: unknown;
}

export interface LocalPaletteSaveResult {
  fileName: string;
  filePath: string;
  absolutePath: string;
}

export class PaletteSaveError extends Error {
  constructor(
    public readonly statusCode: number,
    message: string,
  ) {
    super(message);
    this.name = 'PaletteSaveError';
  }
}

function assertString(value: unknown, message: string): asserts value is string {
  if (typeof value !== 'string' || !value.trim()) {
    throw new PaletteSaveError(400, message);
  }
}

function validateFileName(fileName: string): void {
  if (!/^[a-z0-9][a-z0-9-]*\.md$/.test(fileName)) {
    throw new PaletteSaveError(400, 'Palette file name must use lowercase letters, numbers, and hyphens.');
  }
}

function validatePaletteMarkdown(markdown: string): void {
  let parsed: matter.GrayMatterFile<string>;
  try {
    parsed = matter(markdown);
  } catch {
    throw new PaletteSaveError(400, 'Palette Markdown could not be parsed.');
  }

  const data = parsed.data as Record<string, unknown>;
  const colors = data.colors;
  if (typeof data.name !== 'string' || !data.name.trim() || !Array.isArray(colors) || colors.length === 0) {
    throw new PaletteSaveError(400, 'Palette Markdown must include a name and at least one color.');
  }

  for (const [index, color] of colors.entries()) {
    if (!color || typeof color !== 'object' || Array.isArray(color)) {
      throw new PaletteSaveError(400, `Color ${index + 1} must include name, hex, and role fields.`);
    }

    const entry = color as Record<string, unknown>;
    if (typeof entry.name !== 'string' || !entry.name.trim()) {
      throw new PaletteSaveError(400, `Color ${index + 1} must include a name.`);
    }

    if (typeof entry.hex !== 'string' || !/^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(entry.hex)) {
      throw new PaletteSaveError(400, `Color ${index + 1} must include a valid HEX value.`);
    }

    if (typeof entry.role !== 'string' || !entry.role.trim()) {
      throw new PaletteSaveError(400, `Color ${index + 1} must include a role.`);
    }
  }
}

function resolveColorAssetPath(rootDir: string, fileName: string): { colorsDir: string; targetPath: string } {
  const colorsDir = path.resolve(rootDir, colorAssetsDir);
  const targetPath = path.resolve(colorsDir, fileName);
  const relative = path.relative(colorsDir, targetPath);

  if (relative.startsWith('..') || path.isAbsolute(relative)) {
    throw new PaletteSaveError(400, 'Color asset file must be saved inside assets/colors/.');
  }

  return { colorsDir, targetPath };
}

async function assertFileDoesNotExist(filePath: string, displayPath: string): Promise<void> {
  try {
    await access(filePath, constants.F_OK);
    throw new PaletteSaveError(409, `${displayPath} already exists. Pick another color asset name before saving.`);
  } catch (error) {
    if (error instanceof PaletteSaveError) {
      throw error;
    }
    if (error && typeof error === 'object' && 'code' in error && error.code === 'ENOENT') {
      return;
    }
    throw error;
  }
}

export async function savePaletteMarkdownToLibrary(
  input: LocalPaletteSaveInput,
  rootDir = process.cwd(),
): Promise<LocalPaletteSaveResult> {
  assertString(input.fileName, 'Palette file name is required.');
  assertString(input.markdown, 'Palette Markdown is required.');

  const fileName = input.fileName.trim();
  const markdown = input.markdown.trimEnd();
  validateFileName(fileName);
  validatePaletteMarkdown(markdown);

  const filePath = colorAssetPath(fileName);
  const { colorsDir, targetPath } = resolveColorAssetPath(rootDir, fileName);
  await mkdir(colorsDir, { recursive: true });
  await assertFileDoesNotExist(targetPath, filePath);

  try {
    await writeFile(targetPath, `${markdown}\n`, { encoding: 'utf8', flag: 'wx' });
  } catch (error) {
    if (error && typeof error === 'object' && 'code' in error && error.code === 'EEXIST') {
      throw new PaletteSaveError(409, `${filePath} already exists. Pick another color asset name before saving.`);
    }
    throw error;
  }

  return {
    fileName,
    filePath,
    absolutePath: targetPath,
  };
}
