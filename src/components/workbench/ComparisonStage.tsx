import { themeToCssVars } from '../../theme/cssVars';
import { analyzeThemeRisks } from '../../theme/themeRisks';
import type { NormalizedTheme, ThemeRiskSummary } from '../../types/theme';
import { PreviewScene, previewTabs, type PreviewTab } from './previewScenes';

interface ComparisonStageProps {
  activeTab: PreviewTab;
  themes: NormalizedTheme[];
  onActiveTabChange: (tab: PreviewTab) => void;
  onRemoveTheme: (themeFilePath: string) => void;
}

function kindLabel(theme: NormalizedTheme): string {
  return theme.kind === 'theme' ? 'Full theme' : 'Palette-derived';
}

function riskLabel(summary: ThemeRiskSummary): string {
  if (summary.failCount > 0) {
    return `${summary.failCount} hard risk${summary.failCount === 1 ? '' : 's'}`;
  }

  if (summary.noteCount > 0) {
    return `${summary.noteCount} note${summary.noteCount === 1 ? '' : 's'}`;
  }

  return 'Readable';
}

export function ComparisonStage({
  activeTab,
  themes,
  onActiveTabChange,
  onRemoveTheme,
}: ComparisonStageProps) {
  return (
    <section className="stage-panel comparison-stage" aria-label="Comparison stage">
      <div className="stage-toolbar">
        <div>
          <p className="stage-kicker">Compare</p>
          <h2>Compare {themes.length} directions</h2>
        </div>
        <div className="tab-list" role="tablist" aria-label="Comparison preview scenes">
          {previewTabs.map((tab) => (
            <button
              aria-selected={activeTab === tab}
              className={activeTab === tab ? 'preview-tab is-active' : 'preview-tab'}
              key={tab}
              onClick={() => onActiveTabChange(tab)}
              role="tab"
              type="button"
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="comparison-grid">
        {themes.map((theme) => {
          const riskSummary = theme.riskSummary ?? analyzeThemeRisks(theme);

          return (
            <article
              className="comparison-card"
              key={`${theme.kind}-${theme.id}-${theme.filePath}`}
              style={themeToCssVars(theme)}
            >
              <header className="comparison-card__header">
                <div>
                  <p>{kindLabel(theme)}</p>
                  <h3>{theme.name}</h3>
                  <span className={`risk-badge is-${riskSummary.status}`}>{riskLabel(riskSummary)}</span>
                </div>
                <button
                  aria-label={`Remove ${theme.name} from comparison`}
                  className="comparison-remove"
                  type="button"
                  onClick={() => onRemoveTheme(theme.filePath)}
                >
                  Remove
                </button>
              </header>
              <div className="stage-canvas comparison-canvas">
                <PreviewScene activeTab={activeTab} theme={theme} useThemeGradient={false} />
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
