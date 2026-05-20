import type { ThemeKind } from '../../types/theme';
import { scenarioTagLabel, scenarioTags, type ScenarioTagFilter } from '../../theme/scenarioTags';

export type ThemeFilter = 'all' | ThemeKind;

interface SearchAndFiltersProps {
  query: string;
  filter: ThemeFilter;
  scenarioFilter: ScenarioTagFilter;
  resultCount: number;
  onQueryChange: (query: string) => void;
  onFilterChange: (filter: ThemeFilter) => void;
  onScenarioFilterChange: (filter: ScenarioTagFilter) => void;
}

const filters: Array<{ value: ThemeFilter; label: string }> = [
  { value: 'all', label: 'All' },
  { value: 'theme', label: 'Themes' },
  { value: 'palette-derived', label: 'Palettes' },
];

export function SearchAndFilters({
  query,
  filter,
  scenarioFilter,
  resultCount,
  onQueryChange,
  onFilterChange,
  onScenarioFilterChange,
}: SearchAndFiltersProps) {
  return (
    <div className="library-controls">
      <label className="search-field">
        <span>Search</span>
        <input
          aria-label="Search themes"
          type="search"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Linear, mauve, glass..."
        />
      </label>
      <div className="filter-row" aria-label="Theme type filter">
        {filters.map((item) => (
          <button
            className={filter === item.value ? 'filter-pill is-active' : 'filter-pill'}
            key={item.value}
            type="button"
            onClick={() => onFilterChange(item.value)}
          >
            {item.label}
          </button>
        ))}
      </div>
      <label className="search-field">
        <span>Scenario</span>
        <select
          aria-label="Scenario tag filter"
          value={scenarioFilter}
          onChange={(event) => onScenarioFilterChange(event.target.value as ScenarioTagFilter)}
        >
          <option value="all">All scenarios</option>
          {scenarioTags.map((tag) => (
            <option key={tag} value={tag}>
              {scenarioTagLabel(tag)}
            </option>
          ))}
        </select>
      </label>
      <p className="result-count">{resultCount} sources</p>
    </div>
  );
}
