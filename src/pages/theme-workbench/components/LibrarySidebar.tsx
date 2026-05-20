import { SearchAndFilters } from '../../../components/workbench/SearchAndFilters';
import { ThemeLibrary } from '../../../components/workbench/ThemeLibrary';
import type { ScenarioTagFilter } from '../../../theme/scenarioTags';
import type { NormalizedTheme } from '../../../types/theme';

interface LibrarySidebarProps {
  comparisonThemeKeys: string[];
  query: string;
  resultCount: number;
  scenarioFilter: ScenarioTagFilter;
  selectedThemeId: string;
  themes: NormalizedTheme[];
  onQueryChange: (query: string) => void;
  onScenarioFilterChange: (filter: ScenarioTagFilter) => void;
  onSelectTheme: (themeId: string) => void;
  onToggleCompare: (theme: NormalizedTheme) => void;
}

export function LibrarySidebar({
  comparisonThemeKeys,
  query,
  resultCount,
  scenarioFilter,
  selectedThemeId,
  themes,
  onQueryChange,
  onScenarioFilterChange,
  onSelectTheme,
  onToggleCompare,
}: LibrarySidebarProps) {
  return (
    <aside className="library-panel" aria-label="Theme source browser">
      <SearchAndFilters
        query={query}
        scenarioFilter={scenarioFilter}
        resultCount={resultCount}
        onQueryChange={onQueryChange}
        onScenarioFilterChange={onScenarioFilterChange}
      />
      <ThemeLibrary
        comparisonThemeKeys={comparisonThemeKeys}
        themes={themes}
        selectedThemeId={selectedThemeId}
        onToggleCompare={onToggleCompare}
        onSelectTheme={onSelectTheme}
      />
    </aside>
  );
}
