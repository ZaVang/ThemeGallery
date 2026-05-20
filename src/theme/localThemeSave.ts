import { constants } from 'node:fs';
import { access, mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';
import { designAssetsDir, designAssetPath } from '../data/assetPaths';

export interface LocalThemeSaveInput {
  fileName: unknown;
  markdown: unknown;
}

export interface LocalThemeSaveResult {
  fileName: string;
  filePath: string;
  absolutePath: string;
}

export class ThemeSaveError extends Error {
  constructor(
    public readonly statusCode: number,
    message: string,
  ) {
    super(message);
    this.name = 'ThemeSaveError';
  }
}

function assertString(value: unknown, message: string): asserts value is string {
  if (typeof value !== 'string' || !value.trim()) {
    throw new ThemeSaveError(400, message);
  }
}

function validateFileName(fileName: string): void {
  if (!/^[a-z0-9][a-z0-9-]*\.md$/.test(fileName)) {
    throw new ThemeSaveError(400, 'Theme file name must use lowercase letters, numbers, and hyphens.');
  }
}

function validateThemeMarkdown(markdown: string): void {
  let parsed: matter.GrayMatterFile<string>;
  try {
    parsed = matter(markdown);
  } catch {
    throw new ThemeSaveError(400, 'Theme Markdown could not be parsed.');
  }

  const data = parsed.data as Record<string, unknown>;
  const colors = data.colors;
  if (
    typeof data.name !== 'string' ||
    !data.name.trim() ||
    !colors ||
    typeof colors !== 'object' ||
    Array.isArray(colors)
  ) {
    throw new ThemeSaveError(400, 'Theme Markdown must include a name and colors object.');
  }
}

function resolveDesignAssetPath(rootDir: string, fileName: string): { designsDir: string; targetPath: string } {
  const designsDir = path.resolve(rootDir, designAssetsDir);
  const targetPath = path.resolve(designsDir, fileName);
  const relative = path.relative(designsDir, targetPath);

  if (relative.startsWith('..') || path.isAbsolute(relative)) {
    throw new ThemeSaveError(400, 'Theme file must be saved inside assets/designs/.');
  }

  return { designsDir, targetPath };
}

async function assertFileDoesNotExist(filePath: string, displayPath: string): Promise<void> {
  try {
    await access(filePath, constants.F_OK);
    throw new ThemeSaveError(409, `${displayPath} already exists. Pick another theme name before saving.`);
  } catch (error) {
    if (error instanceof ThemeSaveError) {
      throw error;
    }
    if (error && typeof error === 'object' && 'code' in error && error.code === 'ENOENT') {
      return;
    }
    throw error;
  }
}

export async function saveThemeMarkdownToLibrary(
  input: LocalThemeSaveInput,
  rootDir = process.cwd(),
): Promise<LocalThemeSaveResult> {
  assertString(input.fileName, 'Theme file name is required.');
  assertString(input.markdown, 'Theme Markdown is required.');

  const fileName = input.fileName.trim();
  const markdown = input.markdown.trimEnd();
  validateFileName(fileName);
  validateThemeMarkdown(markdown);

  const filePath = designAssetPath(fileName);
  const { designsDir, targetPath } = resolveDesignAssetPath(rootDir, fileName);
  await mkdir(designsDir, { recursive: true });
  await assertFileDoesNotExist(targetPath, filePath);

  try {
    await writeFile(targetPath, `${markdown}\n`, { encoding: 'utf8', flag: 'wx' });
  } catch (error) {
    if (error && typeof error === 'object' && 'code' in error && error.code === 'EEXIST') {
      throw new ThemeSaveError(409, `${filePath} already exists. Pick another theme name before saving.`);
    }
    throw error;
  }

  return {
    fileName,
    filePath,
    absolutePath: targetPath,
  };
}
