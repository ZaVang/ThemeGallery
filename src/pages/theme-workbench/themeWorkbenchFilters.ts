import type { ScenarioTagFilter } from '../../theme/scenarioTags';
import type { ThemeSourceFilter } from '../../types/sourceLibrary';
import type { NormalizedTheme } from '../../types/theme';

function matchesThemeQuery(theme: NormalizedTheme, query: string): boolean {
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) {
    return true;
  }

  return [theme.name, theme.filePath, ...theme.tags].some((value) => value.toLowerCase().includes(normalizedQuery));
}

export function filterThemeSources(
  themes: NormalizedTheme[],
  filter: ThemeSourceFilter,
  scenarioFilter: ScenarioTagFilter,
  query: string,
): NormalizedTheme[] {
  return themes.filter((theme) => {
    const matchesType = filter === 'all' || theme.kind === filter;
    const matchesScenario = scenarioFilter === 'all' || theme.tags.includes(scenarioFilter);

    return matchesType && matchesScenario && matchesThemeQuery(theme, query);
  });
}
