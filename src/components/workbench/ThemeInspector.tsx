import ReactMarkdown from 'react-markdown';
import { createQuickBrief } from '../../theme/quickBrief';
import { analyzeThemeRisks } from '../../theme/themeRisks';
import { splitThemeWarnings } from '../../theme/warningClassification';
import type { NormalizedTheme, ThemeRiskSummary } from '../../types/theme';

interface ThemeInspectorProps {
  theme: NormalizedTheme;
}

function riskStatusText(summary: ThemeRiskSummary): string {
  if (summary.status === 'fail') {
    return `${summary.failCount} hard ${summary.failCount === 1 ? 'risk' : 'risks'} and ${summary.noteCount} design ${summary.noteCount === 1 ? 'note' : 'notes'}.`;
  }

  if (summary.status === 'review') {
    return `${summary.noteCount} design ${summary.noteCount === 1 ? 'note' : 'notes'} to review.`;
  }

  return 'Core readability checks look usable.';
}

export function ThemeInspector({ theme }: ThemeInspectorProps) {
  const warningGroups = splitThemeWarnings(theme.warnings);
  const riskSummary = theme.riskSummary ?? analyzeThemeRisks(theme);
  const quickBrief = createQuickBrief({ ...theme, riskSummary });

  return (
    <aside className="inspector-panel" role="region" aria-label="Theme inspector">
      <div className="panel-heading">
        <h2>{theme.name}</h2>
        <p>{theme.filePath}</p>
      </div>

      <section className="inspector-section metadata-list">
        <h3>Source</h3>
        <p>{theme.kind === 'theme' ? 'Full theme' : 'Palette-derived theme'}</p>
        {theme.source && <p>{theme.source}</p>}
        {theme.mood && <p>{theme.mood}</p>}
        {theme.tags.length > 0 && <p>{theme.tags.join(', ')}</p>}
      </section>

      {warningGroups.warnings.length > 0 && (
        <section className="inspector-section warning-list">
          <h3>Warnings</h3>
          {warningGroups.warnings.map((warning) => (
            <p key={warning}>{warning}</p>
          ))}
        </section>
      )}

      {warningGroups.notes.length > 0 && (
        <section className="inspector-section note-list">
          <h3>Notes</h3>
          {warningGroups.notes.map((note) => (
            <p key={note}>{note}</p>
          ))}
        </section>
      )}

      <section className={`inspector-section risk-list is-${riskSummary.status}`}>
        <h3>Readability Risks</h3>
        <p>{riskStatusText(riskSummary)}</p>
        {riskSummary.items.map((item) => (
          <div className="risk-item" key={`${item.severity}-${item.label}-${item.message}`}>
            <strong>{item.severity === 'fail' ? 'Needs fix' : 'Design note'}</strong>
            <span>{item.message}</span>
          </div>
        ))}
      </section>

      <section className="inspector-section quick-brief">
        <h3>Quick Brief</h3>
        <pre>{quickBrief}</pre>
      </section>

      <section className="inspector-section">
        <h3>Colors</h3>
        <div className="color-grid">
          {Object.entries(theme.colors).map(([name, value]) => (
            <div className="color-token" key={name}>
              <span className="color-chip" style={{ backgroundColor: value }} />
              <span>{name}</span>
              <code>{value}</code>
              {theme.colorProvenance?.[name] && (
                <span className={`token-provenance is-${theme.colorProvenance[name]}`}>{theme.colorProvenance[name]}</span>
              )}
            </div>
          ))}
        </div>
      </section>

      {theme.gradients.length > 0 && (
        <section className="inspector-section">
          <h3>Gradients</h3>
          <div className="gradient-list">
            {theme.gradients.map((gradient) => (
              <div className="gradient-token" key={`${gradient.from}-${gradient.to}`}>
                <span style={{ background: `linear-gradient(90deg, ${gradient.from}, ${gradient.to})` }} />
                <code>
                  {gradient.from} to {gradient.to}
                </code>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="inspector-section token-list">
        <h3>Typography</h3>
        {Object.entries(theme.typography).map(([name, token]) => (
          <div className="token-row" key={name}>
            <strong>{name}</strong>
            <span>
              {token.fontFamily} / {token.fontSize} / {token.fontWeight}
            </span>
          </div>
        ))}
      </section>

      <section className="inspector-section token-list">
        <h3>Spacing</h3>
        {Object.entries(theme.spacing).map(([name, value]) => (
          <div className="token-row" key={name}>
            <strong>{name}</strong>
            <span>{value}</span>
          </div>
        ))}
      </section>

      <section className="inspector-section token-list">
        <h3>Rounded</h3>
        {Object.entries(theme.rounded).map(([name, value]) => (
          <div className="token-row" key={name}>
            <strong>{name}</strong>
            <span>{value}</span>
          </div>
        ))}
      </section>

      {theme.markdownBody && (
        <section className="inspector-section markdown-notes">
          <ReactMarkdown>{theme.markdownBody}</ReactMarkdown>
        </section>
      )}
    </aside>
  );
}
