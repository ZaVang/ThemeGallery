import { useMemo, useState } from 'react';
import { loadThemeLibrary } from './data/themeLoader';
import { PreviewStage } from './components/workbench/PreviewStage';
import { SearchAndFilters, type ThemeFilter } from './components/workbench/SearchAndFilters';
import { ThemeInspector } from './components/workbench/ThemeInspector';
import { ThemeLibrary } from './components/workbench/ThemeLibrary';
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
  const [selectedThemeId, setSelectedThemeId] = useState(() => themes[0]?.id ?? '');

  const filteredThemes = themes.filter((theme) => {
    const matchesType = filter === 'all' || theme.kind === filter;
    return matchesType && matchesQuery(theme.name, theme.filePath, theme.tags, query);
  });

  const selectedTheme =
    themes.find((theme) => theme.id === selectedThemeId) ?? filteredThemes[0] ?? themes[0];

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
            <SearchAndFilters
              query={query}
              filter={filter}
              resultCount={filteredThemes.length}
              onQueryChange={setQuery}
              onFilterChange={setFilter}
            />
            <ThemeLibrary
              themes={filteredThemes}
              selectedThemeId={selectedTheme.id}
              onSelectTheme={setSelectedThemeId}
            />
          </aside>
          <PreviewStage theme={selectedTheme} />
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

