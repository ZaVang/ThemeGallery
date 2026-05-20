import { PaletteExtractor } from '../../../components/workbench/PaletteExtractor';
import { SearchAndFilters } from '../../../components/workbench/SearchAndFilters';
import { ThemeLibrary } from '../../../components/workbench/ThemeLibrary';
import type { ScenarioTagFilter } from '../../../theme/scenarioTags';
import type { ThemeSourceFilter } from '../../../types/sourceLibrary';
import type { NormalizedTheme } from '../../../types/theme';

interface LibrarySidebarProps {
  comparisonThemeKeys: string[];
  filter: ThemeSourceFilter;
  query: string;
  resultCount: number;
  scenarioFilter: ScenarioTagFilter;
  selectedThemeId: string;
  themes: NormalizedTheme[];
  onFilterChange: (filter: ThemeSourceFilter) => void;
  onQueryChange: (query: string) => void;
  onScenarioFilterChange: (filter: ScenarioTagFilter) => void;
  onSelectTheme: (themeId: string) => void;
  onToggleCompare: (theme: NormalizedTheme) => void;
}

export function LibrarySidebar({
  comparisonThemeKeys,
  filter,
  query,
  resultCount,
  scenarioFilter,
  selectedThemeId,
  themes,
  onFilterChange,
  onQueryChange,
  onScenarioFilterChange,
  onSelectTheme,
  onToggleCompare,
}: LibrarySidebarProps) {
  return (
    <aside className="library-panel" aria-label="Theme source browser">
      <PaletteExtractor />
      <SearchAndFilters
        query={query}
        filter={filter}
        scenarioFilter={scenarioFilter}
        resultCount={resultCount}
        onQueryChange={onQueryChange}
        onFilterChange={onFilterChange}
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
