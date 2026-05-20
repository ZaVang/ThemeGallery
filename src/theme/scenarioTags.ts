export const scenarioTags = [
  'saas',
  'ai tool',
  'ecommerce',
  'food/drink',
  'wellness',
  'beauty',
  'portfolio',
  'editorial',
  'luxury',
  'retro',
  'playful',
  'minimal',
  'dark',
  'glass',
] as const;

export type ScenarioTag = (typeof scenarioTags)[number];
export type ScenarioTagFilter = 'all' | ScenarioTag;

const labels: Record<ScenarioTag, string> = {
  saas: 'SaaS',
  'ai tool': 'AI tool',
  ecommerce: 'Ecommerce',
  'food/drink': 'Food/drink',
  wellness: 'Wellness',
  beauty: 'Beauty',
  portfolio: 'Portfolio',
  editorial: 'Editorial',
  luxury: 'Luxury',
  retro: 'Retro',
  playful: 'Playful',
  minimal: 'Minimal',
  dark: 'Dark',
  glass: 'Glass',
};

export function scenarioTagLabel(tag: string): string {
  return labels[tag as ScenarioTag] ?? tag;
}
