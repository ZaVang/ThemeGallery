import { scenarioTagLabel, scenarioTags, type ScenarioTagFilter } from '../../theme/scenarioTags';

interface SearchAndFiltersProps {
  query: string;
  scenarioFilter: ScenarioTagFilter;
  resultCount: number;
  onQueryChange: (query: string) => void;
  onScenarioFilterChange: (filter: ScenarioTagFilter) => void;
}

export function SearchAndFilters({
  query,
  scenarioFilter,
  resultCount,
  onQueryChange,
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
