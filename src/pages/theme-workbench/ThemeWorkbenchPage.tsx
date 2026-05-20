import { useMemo, useState } from 'react';
import { ComparisonStage } from '../../components/workbench/ComparisonStage';
import { PreviewStage } from '../../components/workbench/PreviewStage';
import type { PreviewTab } from '../../components/workbench/previewScenes';
import { PageHeader } from '../../components/common/PageHeader';
import { loadThemeLibrary } from '../../data/themeLoader';
import type { ScenarioTagFilter } from '../../theme/scenarioTags';
import { ThemeInspector } from '../../components/workbench/ThemeInspector';
import type { AppAppearancePatch } from '../../app/appearance/appAppearancePatch';
import { themeToAppAppearancePatch } from '../../theme/themeAppearancePatch';
import { LibrarySidebar } from './components/LibrarySidebar';
import { filterThemeSources } from './themeWorkbenchFilters';

interface ThemeWorkbenchPageProps {
  onApplyAppearancePatch?: (patch: AppAppearancePatch) => void;
}

export function ThemeWorkbenchPage({ onApplyAppearancePatch }: ThemeWorkbenchPageProps) {
  const themes = useMemo(() => loadThemeLibrary().filter((theme) => theme.kind === 'theme'), []);
  const [query, setQuery] = useState('');
  const [scenarioFilter, setScenarioFilter] = useState<ScenarioTagFilter>('all');
  const [activeTab, setActiveTab] = useState<PreviewTab>('Dashboard');
  const [comparisonThemeKeys, setComparisonThemeKeys] = useState<string[]>([]);
  const [selectedThemeId, setSelectedThemeId] = useState(() => themes[0]?.id ?? '');

  const filteredThemes = filterThemeSources(themes, scenarioFilter, query);
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
    <main className="app-page">
      <PageHeader
        eyebrow="Complete design systems"
        title="Themes"
        summary="Reads complete Markdown design themes, renders product previews, and applies chosen directions to the whole app."
      />

      {selectedTheme ? (
        <>
          <section className="theme-apply-bar">
            <div>
              <span>Selected full theme</span>
              <strong>{selectedTheme.name}</strong>
            </div>
            <button
              className="primary-action"
              type="button"
              onClick={() => onApplyAppearancePatch?.(themeToAppAppearancePatch(selectedTheme))}
            >
              Apply {selectedTheme.name} to app appearance
            </button>
          </section>
          <div className="workbench-grid">
            <LibrarySidebar
              comparisonThemeKeys={comparisonThemeKeys}
              query={query}
              resultCount={filteredThemes.length}
              scenarioFilter={scenarioFilter}
              selectedThemeId={selectedTheme.id}
              themes={filteredThemes}
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
        </>
      ) : (
        <section className="empty-state">
          <h2>No Markdown sources found</h2>
          <p>Add files under assets/designs/ to preview them here.</p>
        </section>
      )}
    </main>
  );
}
