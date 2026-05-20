import { useMemo, useState } from 'react';
import { ComparisonStage } from '../../components/workbench/ComparisonStage';
import { PreviewStage } from '../../components/workbench/PreviewStage';
import type { PreviewTab } from '../../components/workbench/previewScenes';
import { PageHeader } from '../../components/common/PageHeader';
import { loadThemeLibrary } from '../../data/themeLoader';
import type { ScenarioTagFilter } from '../../theme/scenarioTags';
import { ThemeInspector } from '../../components/workbench/ThemeInspector';
import type { ThemeSourceFilter } from '../../types/sourceLibrary';
import { LibrarySidebar } from './components/LibrarySidebar';
import { filterThemeSources } from './themeWorkbenchFilters';

export function ThemeWorkbenchPage() {
  const themes = useMemo(() => loadThemeLibrary(), []);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<ThemeSourceFilter>('all');
  const [scenarioFilter, setScenarioFilter] = useState<ScenarioTagFilter>('all');
  const [activeTab, setActiveTab] = useState<PreviewTab>('Dashboard');
  const [comparisonThemeKeys, setComparisonThemeKeys] = useState<string[]>([]);
  const [selectedThemeId, setSelectedThemeId] = useState(() => themes[0]?.id ?? '');

  const filteredThemes = filterThemeSources(themes, filter, scenarioFilter, query);
  const selectedTheme = themes.find((theme) => theme.id === selectedThemeId) ?? filteredThemes[0] ?? themes[0];
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
      <PageHeader
        eyebrow="Local theme workbench"
        title="ThemeGallery"
        summary="Reads local Markdown themes and palettes, then renders product previews from normalized tokens."
      />

      {selectedTheme ? (
        <div className="workbench-grid">
          <LibrarySidebar
            comparisonThemeKeys={comparisonThemeKeys}
            filter={filter}
            query={query}
            resultCount={filteredThemes.length}
            scenarioFilter={scenarioFilter}
            selectedThemeId={selectedTheme.id}
            themes={filteredThemes}
            onFilterChange={setFilter}
            onQueryChange={setQuery}
            onScenarioFilterChange={setScenarioFilter}
            onSelectTheme={setSelectedThemeId}
            onToggleCompare={(theme) => toggleComparedTheme(theme.filePath)}
          />
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
