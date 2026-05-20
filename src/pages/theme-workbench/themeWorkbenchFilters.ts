import type { ScenarioTagFilter } from '../../theme/scenarioTags';
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
  scenarioFilter: ScenarioTagFilter,
  query: string,
): NormalizedTheme[] {
  return themes.filter((theme) => {
    const matchesScenario = scenarioFilter === 'all' || theme.tags.includes(scenarioFilter);

    return matchesScenario && matchesThemeQuery(theme, query);
  });
}
