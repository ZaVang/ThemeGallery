import { Buffer } from 'buffer';
import matter from 'gray-matter';
import type { AppAppearanceMaterial, AppAppearanceTokens } from '../app/appearance/appAppearance';
import type { AppAppearancePatch } from '../app/appearance/appAppearancePatch';

export type InspirationDimension =
  | 'color'
  | 'material'
  | 'shape'
  | 'lighting'
  | 'typography'
  | 'layout'
  | 'text'
  | 'radius'
  | 'border';

export interface InspirationReference {
  id: string;
  kind: 'atom' | 'combination';
  name: string;
  sourcePath: string;
  sourceType: 'palette' | 'visual-reference' | 'style-breakdown';
  summary: string;
  dimensions: InspirationDimension[];
  cues: string[];
  colors: string[];
  appearancePatch?: AppAppearancePatch;
}

type AssetModules = Record<string, string>;
type Frontmatter = Record<string, unknown>;

if (!globalThis.Buffer) {
  globalThis.Buffer = Buffer;
}

const colorAssetModules = import.meta.glob('../../assets/colors/*.md', {
  eager: true,
  import: 'default',
  query: '?raw',
}) as AssetModules;

const typographyAssetModules = import.meta.glob('../../assets/typography/*.md', {
  eager: true,
  import: 'default',
  query: '?raw',
}) as AssetModules;

const materialAssetModules = import.meta.glob('../../assets/materials/*.md', {
  eager: true,
  import: 'default',
  query: '?raw',
}) as AssetModules;

const radiusAssetModules = import.meta.glob('../../assets/radius/*.md', {
  eager: true,
  import: 'default',
  query: '?raw',
}) as AssetModules;

const lightingAssetModules = import.meta.glob('../../assets/lighting/*.md', {
  eager: true,
  import: 'default',
  query: '?raw',
}) as AssetModules;

const layoutAssetModules = import.meta.glob('../../assets/layouts/*.md', {
  eager: true,
  import: 'default',
  query: '?raw',
}) as AssetModules;

const textAssetModules = import.meta.glob('../../assets/text/*.md', {
  eager: true,
  import: 'default',
  query: '?raw',
}) as AssetModules;

const borderAssetModules = import.meta.glob('../../assets/borders/*.md', {
  eager: true,
  import: 'default',
  query: '?raw',
}) as AssetModules;

const shapeAssetModules = import.meta.glob('../../assets/shapes/*.md', {
  eager: true,
  import: 'default',
  query: '?raw',
}) as AssetModules;

const combinationAssetModules = import.meta.glob('../../assets/combinations/*.md', {
  eager: true,
  import: 'default',
  query: '?raw',
}) as AssetModules;

const modulesByDimension: Array<{ modules: AssetModules; fallbackDimension: InspirationDimension }> = [
  { modules: colorAssetModules, fallbackDimension: 'color' },
  { modules: typographyAssetModules, fallbackDimension: 'typography' },
  { modules: materialAssetModules, fallbackDimension: 'material' },
  { modules: radiusAssetModules, fallbackDimension: 'radius' },
  { modules: lightingAssetModules, fallbackDimension: 'lighting' },
  { modules: layoutAssetModules, fallbackDimension: 'layout' },
  { modules: textAssetModules, fallbackDimension: 'text' },
  { modules: borderAssetModules, fallbackDimension: 'border' },
  { modules: shapeAssetModules, fallbackDimension: 'shape' },
  { modules: combinationAssetModules, fallbackDimension: 'color' },
];

export const inspirationDimensionLabels: Record<InspirationDimension, string> = {
  color: 'Color',
  material: 'Material',
  shape: 'Shape',
  lighting: 'Lighting',
  typography: 'Typography',
  layout: 'Layout',
  text: 'Text',
  radius: 'Radius',
  border: 'Border',
};

export const inspirationDimensions: InspirationDimension[] = [
  'color',
  'material',
  'shape',
  'lighting',
  'typography',
  'layout',
  'text',
  'radius',
  'border',
];

const appAppearanceTokenKeys = new Set<keyof AppAppearanceTokens>([
  'bg',
  'bgElevated',
  'surface',
  'surfaceMuted',
  'text',
  'textMuted',
  'border',
  'borderStrong',
  'accent',
  'accentText',
  'danger',
  'radiusSm',
  'radiusMd',
  'radiusLg',
  'radiusXl',
  'shadowSm',
  'shadowMd',
  'fontBody',
  'fontDisplay',
  'spacePanel',
  'spaceControl',
]);

function modulePathToSourcePath(modulePath: string): string {
  return modulePath.replaceAll('\\', '/').replace(/^(\.\.\/)+/, '');
}

function slugify(value: string): string {
  const slug = value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

  return slug || 'inspiration';
}

function stringArray(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.map(String).map((item) => item.trim()).filter(Boolean);
}

function dimensions(value: unknown, fallback: InspirationDimension): InspirationDimension[] {
  const parsed = stringArray(value).filter((item): item is InspirationDimension =>
    inspirationDimensions.includes(item as InspirationDimension),
  );

  return parsed.length > 0 ? parsed : [fallback];
}

function sourceType(value: unknown, sourcePath: string): InspirationReference['sourceType'] {
  if (value === 'palette' || value === 'visual-reference' || value === 'style-breakdown') {
    return value;
  }

  return sourcePath.startsWith('assets/colors/') ? 'palette' : 'style-breakdown';
}

function kind(value: unknown, sourcePath: string): InspirationReference['kind'] {
  if (value === 'atom' || value === 'combination') {
    return value;
  }

  return sourcePath.startsWith('assets/combinations/') ? 'combination' : 'atom';
}

function colorValues(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.flatMap((entry) => {
    if (typeof entry === 'string') {
      return [entry];
    }

    if (entry && typeof entry === 'object' && !Array.isArray(entry)) {
      const hex = (entry as Record<string, unknown>).hex;

      return typeof hex === 'string' ? [hex] : [];
    }

    return [];
  });
}

function markdownSummary(markdownBody: string): string {
  const text = markdownBody
    .replace(/^#+\s+/gm, '')
    .replace(/[*_`>#-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  return text.length > 140 ? `${text.slice(0, 137).trim()}...` : text;
}

function normalizeMaterial(value: unknown): AppAppearanceMaterial | undefined {
  return value === 'solid' || value === 'glass' ? value : undefined;
}

function appearancePatch(data: Frontmatter): AppAppearancePatch | undefined {
  const rawTokens = data.tokens && typeof data.tokens === 'object' && !Array.isArray(data.tokens)
    ? (data.tokens as Record<string, unknown>)
    : {};
  const tokens = Object.fromEntries(
    Object.entries(rawTokens)
      .filter(([key]) => appAppearanceTokenKeys.has(key as keyof AppAppearanceTokens))
      .map(([key, value]) => [key, String(value)]),
  ) as Partial<AppAppearanceTokens>;
  const material = normalizeMaterial(data.material) ?? normalizeMaterial(rawTokens.material);

  if (Object.keys(tokens).length === 0 && !material) {
    return undefined;
  }

  return {
    ...(material ? { material } : {}),
    ...(Object.keys(tokens).length > 0 ? { tokens } : {}),
  };
}

function displayName(name: string, sourcePath: string): string {
  if (!sourcePath.startsWith('assets/colors/')) {
    return name;
  }

  return name.endsWith(' Color') ? name : `${name} Color`;
}

function parseInspirationReference(
  rawMarkdown: string,
  sourcePath: string,
  fallbackDimension: InspirationDimension,
): InspirationReference {
  const parsed = matter(rawMarkdown);
  const data = parsed.data as Frontmatter;
  const name = displayName(String(data.name ?? sourcePath.split('/').pop()?.replace(/\.md$/, '') ?? 'Inspiration'), sourcePath);
  const referenceKind = kind(data.kind, sourcePath);
  const referenceDimensions = dimensions(data.dimensions, fallbackDimension);
  const id = String(data.id ?? (referenceKind === 'atom' ? slugify(`${name}`) : slugify(name)));
  const summary = String(data.summary ?? data.mood ?? markdownSummary(parsed.content) ?? name);

  return {
    id,
    kind: referenceKind,
    name,
    sourcePath,
    sourceType: sourceType(data.sourceType, sourcePath),
    summary,
    dimensions: referenceDimensions,
    cues: stringArray(data.cues),
    colors: colorValues(data.colors),
    appearancePatch: appearancePatch(data),
  };
}

export const inspirationReferences: InspirationReference[] = modulesByDimension
  .flatMap(({ modules, fallbackDimension }) =>
    Object.entries(modules).map(([modulePath, rawMarkdown]) =>
      parseInspirationReference(rawMarkdown, modulePathToSourcePath(modulePath), fallbackDimension),
    ),
  )
  .sort((a, b) => a.name.localeCompare(b.name));

export function getInspirationAtoms(dimension?: InspirationDimension): InspirationReference[] {
  return inspirationReferences.filter((reference) => {
    if (reference.kind !== 'atom') {
      return false;
    }

    return !dimension || reference.dimensions[0] === dimension;
  });
}

export function getInspirationCombinations(): InspirationReference[] {
  return inspirationReferences.filter((reference) => reference.kind === 'combination');
}
