import type { NormalizedTheme } from '../../types/theme';
import { countActionableWarnings } from '../../theme/warningClassification';
import { displayColorTokens } from '../../theme/colorDisplay';

interface ThemeLibraryProps {
  comparisonThemeKeys?: string[];
  themes: NormalizedTheme[];
  selectedThemeId?: string;
  onToggleCompare?: (theme: NormalizedTheme) => void;
  onSelectTheme: (themeId: string) => void;
}

function kindLabel(theme: NormalizedTheme): string {
  return theme.kind === 'theme' ? 'Full theme' : 'Palette-derived';
}

export function ThemeLibrary({
  comparisonThemeKeys = [],
  themes,
  selectedThemeId,
  onToggleCompare,
  onSelectTheme,
}: ThemeLibraryProps) {
  const comparisonKeySet = new Set(comparisonThemeKeys);

  return (
    <section className="library-list" aria-label="Theme library">
      {themes.length === 0 ? (
        <div className="empty-library">
          <strong>No matching themes</strong>
          <span>Try a different search or filter.</span>
        </div>
      ) : (
        themes.map((theme) => {
          const isCompared = comparisonKeySet.has(theme.filePath);
          const isCompareFull = comparisonThemeKeys.length >= 4 && !isCompared;

          return (
            <article
              className={theme.id === selectedThemeId ? 'theme-row is-selected' : 'theme-row'}
              key={`${theme.kind}-${theme.id}-${theme.filePath}`}
            >
              <button
                aria-label={`Select ${theme.name}`}
                aria-pressed={theme.id === selectedThemeId}
                className="theme-row__select"
                type="button"
                onClick={() => onSelectTheme(theme.id)}
              >
                <span className="theme-row__top">
                  <strong>{theme.name}</strong>
                  <span>{kindLabel(theme)}</span>
                </span>
                <span className="theme-row__meta">{theme.filePath}</span>
                <span className="swatch-strip" aria-hidden="true">
                  {displayColorTokens.map((token) => (
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
              {onToggleCompare && (
                <button
                  aria-label={isCompared ? `Remove ${theme.name} from compare` : `Add ${theme.name} to compare`}
                  aria-pressed={isCompared}
                  className={isCompared ? 'compare-toggle is-active' : 'compare-toggle'}
                  disabled={isCompareFull}
                  type="button"
                  onClick={() => onToggleCompare(theme)}
                >
                  {isCompared ? 'Added' : 'Compare'}
                </button>
              )}
            </article>
          );
        })
      )}
    </section>
  );
}
