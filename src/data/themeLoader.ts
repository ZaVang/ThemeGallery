import type { NormalizedTheme } from '../types/theme';
import { normalizeTheme } from '../theme/normalizeTheme';
import { parseThemeSource } from './parseTheme';

type ModuleMap = Record<string, string>;

const themeModules = import.meta.glob('../../themes/*.md', {
  eager: true,
  import: 'default',
  query: '?raw',
}) as ModuleMap;

const paletteModules = import.meta.glob('../../palettes/*.md', {
  eager: true,
  import: 'default',
  query: '?raw',
}) as ModuleMap;

function modulePathToSourcePath(modulePath: string): string {
  return modulePath.replaceAll('\\', '/').replace(/^(\.\.\/)+/, '');
}

function loadModules(modules: ModuleMap, sourceKind: 'theme' | 'palette'): NormalizedTheme[] {
  return Object.entries(modules).map(([modulePath, rawMarkdown]) =>
    normalizeTheme(parseThemeSource(rawMarkdown, modulePathToSourcePath(modulePath), sourceKind)),
  );
}

export function loadThemeLibrary(
  themes: ModuleMap = themeModules,
  palettes: ModuleMap = paletteModules,
): NormalizedTheme[] {
  return [...loadModules(themes, 'theme'), ...loadModules(palettes, 'palette')].sort((a, b) =>
    a.name.localeCompare(b.name),
  );
}

