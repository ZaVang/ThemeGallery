import { useMemo, useState } from 'react';
import { loadThemeLibrary } from './data/themeLoader';
import { PreviewStage } from './components/workbench/PreviewStage';
import { ComparisonStage } from './components/workbench/ComparisonStage';
import { PaletteExtractor } from './components/workbench/PaletteExtractor';
import { SearchAndFilters, type ThemeFilter } from './components/workbench/SearchAndFilters';
import { ThemeInspector } from './components/workbench/ThemeInspector';
import { ThemeLibrary } from './components/workbench/ThemeLibrary';
import type { PreviewTab } from './components/workbench/previewScenes';
import type { ScenarioTagFilter } from './theme/scenarioTags';
import './styles.css';

function matchesQuery(themeName: string, filePath: string, tags: string[], query: string): boolean {
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) {
    return true;
  }

  return [themeName, filePath, ...tags].some((value) => value.toLowerCase().includes(normalizedQuery));
}

export default function App() {
  const themes = useMemo(() => loadThemeLibrary(), []);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<ThemeFilter>('all');
  const [scenarioFilter, setScenarioFilter] = useState<ScenarioTagFilter>('all');
  const [activeTab, setActiveTab] = useState<PreviewTab>('Dashboard');
  const [comparisonThemeKeys, setComparisonThemeKeys] = useState<string[]>([]);
  const [selectedThemeId, setSelectedThemeId] = useState(() => themes[0]?.id ?? '');

  const filteredThemes = themes.filter((theme) => {
    const matchesType = filter === 'all' || theme.kind === filter;
    const matchesScenario = scenarioFilter === 'all' || theme.tags.includes(scenarioFilter);
    return matchesType && matchesScenario && matchesQuery(theme.name, theme.filePath, theme.tags, query);
  });

  const selectedTheme =
    themes.find((theme) => theme.id === selectedThemeId) ?? filteredThemes[0] ?? themes[0];
  const comparedThemes = comparisonThemeKeys
    .map((themeKey) => themes.find((theme) => theme.filePath === themeKey))
    .filter((theme): theme is NonNullable<typeof theme> => Boolean(theme));

  function toggleComparedTheme(themeFilePath: string) {
    setComparisonThemeKeys((current) => {
      if (current.includes(themeFilePath)) {
        return current.filter((key) => key !== themeFilePath);
      }

      if (current.length >= 4) {
        return current;
      }

      return [...current, themeFilePath];
    });
  }

  return (
    <main className="app-shell">
      <header className="app-header">
        <div>
          <p className="eyebrow">Local theme workbench</p>
          <h1>ThemeGallery</h1>
        </div>
        <p className="app-header__summary">
          Reads local Markdown themes and palettes, then renders product previews from normalized tokens.
        </p>
      </header>

      {selectedTheme ? (
        <div className="workbench-grid">
          <aside className="library-panel" aria-label="Theme source browser">
            <PaletteExtractor />
            <SearchAndFilters
              query={query}
              filter={filter}
              scenarioFilter={scenarioFilter}
              resultCount={filteredThemes.length}
              onQueryChange={setQuery}
              onFilterChange={setFilter}
              onScenarioFilterChange={setScenarioFilter}
            />
            <ThemeLibrary
              comparisonThemeKeys={comparisonThemeKeys}
              themes={filteredThemes}
              selectedThemeId={selectedTheme.id}
              onToggleCompare={(theme) => toggleComparedTheme(theme.filePath)}
              onSelectTheme={setSelectedThemeId}
            />
          </aside>
          {comparedThemes.length >= 2 ? (
            <ComparisonStage
              activeTab={activeTab}
              themes={comparedThemes}
              onActiveTabChange={setActiveTab}
              onRemoveTheme={toggleComparedTheme}
            />
          ) : (
            <PreviewStage activeTab={activeTab} theme={selectedTheme} onActiveTabChange={setActiveTab} />
          )}
          <ThemeInspector theme={selectedTheme} />
        </div>
      ) : (
        <section className="empty-state">
          <h2>No Markdown sources found</h2>
          <p>Add files under themes/ or palettes/ to preview them here.</p>
        </section>
      )}
    </main>
  );
}
