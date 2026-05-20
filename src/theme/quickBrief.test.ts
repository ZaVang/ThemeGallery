import { baseFoundation } from './baseFoundation';
import type { NormalizedTheme } from '../types/theme';
import { createQuickBrief } from './quickBrief';

const theme: NormalizedTheme = {
  id: 'avocado',
  kind: 'palette-derived',
  filePath: 'assets/colors/avocado.md',
  name: 'Avocado Morning',
  tags: ['food/drink', 'fresh'],
  mood: '清新治愈',
  source: '小红书',
  ...baseFoundation,
  colors: {
    ...baseFoundation.colors,
    background: '#e6e6ba',
    surface: '#e5d699',
    primary: '#355410',
    secondary: '#b5c472',
    tertiary: '#7f3b07',
  },
  colorSwatches: [
    { name: 'Pale Pistachio', hex: '#e6e6ba', role: 'background' },
    { name: 'Honey Cream', hex: '#e5d699', role: 'surface' },
    { name: 'Avocado Leaf', hex: '#355410', role: 'primary' },
  ],
  markdownBody: '## 感受\n适合自然、食物、治愈系产品。',
  warnings: ['Palette-derived theme uses Base UI Foundation typography, spacing, radius, and component tokens.'],
  riskSummary: {
    status: 'review',
    failCount: 0,
    noteCount: 1,
    items: [{ severity: 'note', label: 'Surface layering', message: 'Surface colors are close.' }],
  },
};

describe('quickBrief', () => {
  it('creates a compact deterministic brief from a normalized theme', () => {
    expect(createQuickBrief(theme)).toContain('Avocado Morning');
    expect(createQuickBrief(theme)).toContain('Palette-derived direction');
    expect(createQuickBrief(theme)).toContain('background #e6e6ba');
    expect(createQuickBrief(theme)).toContain('primary #355410');
    expect(createQuickBrief(theme)).toContain('Risk notes: Surface colors are close.');
    expect(createQuickBrief(theme)).toContain('Markdown notes: 适合自然、食物、治愈系产品。');
  });

  it('keeps long markdown notes compact', () => {
    const brief = createQuickBrief({
      ...theme,
      markdownBody: `## Notes\n${'Use the collected direction sparingly. '.repeat(30)}`,
    });

    expect(brief.length).toBeLessThan(900);
    expect(brief).toContain('Markdown notes: Use the collected direction sparingly.');
  });
});
