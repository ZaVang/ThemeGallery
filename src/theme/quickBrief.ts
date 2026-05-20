import type { NormalizedTheme, ThemeRiskSummary } from '../types/theme';
import { displayColorTokens } from './colorDisplay';
import { analyzeThemeRisks } from './themeRisks';

function compact(value: string): string {
  return value.replace(/\s+/g, ' ').trim();
}

function truncate(value: string, maxLength: number): string {
  if (value.length <= maxLength) {
    return value;
  }

  return `${value.slice(0, maxLength).trimEnd()}...`;
}

function markdownNotes(markdownBody: string): string {
  const notes = markdownBody
    .split('\n')
    .map((line) => line.replace(/^#{1,6}\s+/, '').replace(/^[-*]\s+/, '').trim())
    .filter(Boolean)
    .filter((line) => !/^感受$|^notes?$/i.test(line));

  return truncate(compact(notes.join(' ')), 300);
}

function riskNotes(summary: ThemeRiskSummary): string {
  if (summary.items.length === 0) {
    return 'Core readability checks look usable.';
  }

  return summary.items.map((item) => item.message).join(' ');
}

function colorLine(theme: NormalizedTheme): string {
  const tokens = displayColorTokens
    .map((token) => {
      const value = theme.colors[token];
      return value ? `${token === 'tertiary' ? 'accent' : token} ${value}` : undefined;
    })
    .filter(Boolean);

  return tokens.join(', ');
}

export function createQuickBrief(theme: NormalizedTheme): string {
  const summary = theme.riskSummary ?? analyzeThemeRisks(theme);
  const direction = theme.kind === 'palette-derived' ? 'Palette-derived direction' : 'Full theme direction';
  const metadata = [theme.source, theme.mood, theme.tags.length > 0 ? theme.tags.join(', ') : undefined]
    .filter(Boolean)
    .join(' | ');
  const rounded = theme.rounded.md ?? theme.rounded.DEFAULT ?? 'medium';
  const notes = markdownNotes(theme.markdownBody);

  return [
    `${theme.name}`,
    `${direction}${metadata ? ` | ${metadata}` : ''}`,
    `Colors: ${colorLine(theme)}`,
    `Component cues: use primary for main actions, surface/background for layout layers, accent for highlights, rounded ${rounded}.`,
    `Risk notes: ${riskNotes(summary)}`,
    notes ? `Markdown notes: ${notes}` : undefined,
  ]
    .filter(Boolean)
    .join('\n');
}
