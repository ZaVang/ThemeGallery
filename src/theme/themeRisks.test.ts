import { analyzeThemeRisks } from './themeRisks';
import { normalizeTheme } from './normalizeTheme';
import type { ParsedThemeSource } from '../types/theme';

describe('themeRisks', () => {
  it('flags hard contrast failures for core text and button pairs', () => {
    const summary = analyzeThemeRisks({
      colors: {
        background: '#FFFFFF',
        'on-background': '#B8B8B8',
        surface: '#FFFFFF',
        'on-surface': '#111827',
        primary: '#FFFFFF',
        'on-primary': '#F7F7F7',
        secondary: '#222222',
        'on-secondary': '#FFFFFF',
        tertiary: '#444444',
        'on-tertiary': '#FFFFFF',
        error: '#B42318',
        'on-error': '#FFFFFF',
      },
    });

    expect(summary.status).toBe('fail');
    expect(summary.failCount).toBeGreaterThanOrEqual(2);
    expect(summary.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ label: 'Page text', severity: 'fail' }),
        expect.objectContaining({ label: 'Primary button text', severity: 'fail' }),
      ]),
    );
  });

  it('adds softer notes for weak layering and similar semantic colors', () => {
    const summary = analyzeThemeRisks({
      colors: {
        background: '#F8F8F8',
        'on-background': '#111827',
        surface: '#F9F9F9',
        'on-surface': '#111827',
        'surface-container': '#FAFAFA',
        'surface-container-high': '#FBFBFB',
        primary: '#526273',
        'on-primary': '#FFFFFF',
        secondary: '#536373',
        'on-secondary': '#FFFFFF',
        tertiary: '#526273',
        'on-tertiary': '#FFFFFF',
        error: '#B42318',
        'on-error': '#FFFFFF',
      },
    });

    expect(summary.status).toBe('review');
    expect(summary.noteCount).toBeGreaterThanOrEqual(2);
    expect(summary.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ label: 'Surface layering', severity: 'note' }),
        expect.objectContaining({ label: 'Similar semantic colors', severity: 'note' }),
      ]),
    );
  });

  it('attaches risk summaries to normalized themes', () => {
    const source: ParsedThemeSource = {
      sourceKind: 'theme',
      filePath: 'themes/low-contrast.md',
      id: 'low-contrast',
      name: 'Low Contrast',
      tags: [],
      colors: {
        background: '#FFFFFF',
        'on-background': '#CCCCCC',
        surface: '#FFFFFF',
        'on-surface': '#111827',
        primary: '#FFFFFF',
        'on-primary': '#FAFAFA',
      },
      gradients: [],
      markdownBody: '',
      warnings: [],
    };

    expect(normalizeTheme(source).riskSummary).toEqual(
      expect.objectContaining({
        status: 'fail',
        failCount: expect.any(Number),
      }),
    );
  });
});
