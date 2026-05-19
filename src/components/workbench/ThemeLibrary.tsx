import type { NormalizedTheme } from '../../types/theme';
import { countActionableWarnings } from '../../theme/warningClassification';

interface ThemeLibraryProps {
  themes: NormalizedTheme[];
  selectedThemeId?: string;
  onSelectTheme: (themeId: string) => void;
}

function kindLabel(theme: NormalizedTheme): string {
  return theme.kind === 'theme' ? 'Full theme' : 'Palette-derived';
}

export function ThemeLibrary({ themes, selectedThemeId, onSelectTheme }: ThemeLibraryProps) {
  return (
    <section className="library-list" aria-label="Theme library">
      {themes.length === 0 ? (
        <div className="empty-library">
          <strong>No matching themes</strong>
          <span>Try a different search or filter.</span>
        </div>
      ) : (
        themes.map((theme) => (
          <button
            aria-pressed={theme.id === selectedThemeId}
            className={theme.id === selectedThemeId ? 'theme-row is-selected' : 'theme-row'}
            key={`${theme.kind}-${theme.id}-${theme.filePath}`}
            type="button"
            onClick={() => onSelectTheme(theme.id)}
          >
            <span className="theme-row__top">
              <strong>{theme.name}</strong>
              <span>{kindLabel(theme)}</span>
            </span>
            <span className="theme-row__meta">{theme.filePath}</span>
            <span className="swatch-strip" aria-hidden="true">
              {['background', 'surface', 'primary', 'secondary', 'tertiary'].map((token) => (
                <span key={token} style={{ backgroundColor: theme.colors[token] }} />
              ))}
            </span>
            <span className="theme-row__tags">
              {theme.tags.slice(0, 3).map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
              {countActionableWarnings(theme.warnings) > 0 && (
                <span>{countActionableWarnings(theme.warnings)} needs review</span>
              )}
            </span>
          </button>
        ))
      )}
    </section>
  );
}
