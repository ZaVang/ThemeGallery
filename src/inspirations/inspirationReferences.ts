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
  sourceType: 'palette' | 'visual-reference' | 'style-breakdown';
  summary: string;
  dimensions: InspirationDimension[];
  cues: string[];
  colors: string[];
  appearancePatch?: AppAppearancePatch;
}

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

export const inspirationReferences: InspirationReference[] = [
  {
    id: 'luna-ocean-color',
    kind: 'atom',
    name: 'Luna Ocean Color',
    sourceType: 'palette',
    summary: 'A cool monochrome blue ramp for calm, technical, low-glare interfaces.',
    dimensions: ['color'],
    cues: ['aqua highlight', 'deep navy base', 'single-hue contrast ladder'],
    colors: ['#A7EBF2', '#54ACBF', '#26658C', '#023859', '#011C40'],
    appearancePatch: {
      tokens: {
        bg: '#071f33',
        bgElevated: '#0C2E48',
        surface: '#104460',
        surfaceMuted: '#082740',
        text: '#E7FAFF',
        textMuted: '#A7EBF2',
        border: 'rgb(167 235 242 / 0.26)',
        borderStrong: '#A7EBF2',
        accent: '#54ACBF',
        accentText: '#011C40',
      },
    },
  },
  {
    id: 'hermes-orange-color',
    kind: 'atom',
    name: 'Hermes Orange Color',
    sourceType: 'palette',
    summary: 'Luxury orange, black, beige, and coffee gray with high-contrast editorial energy.',
    dimensions: ['color'],
    cues: ['orange focal accent', 'black base', 'warm beige support'],
    colors: ['#FF8A00', '#CAB49F', '#503E2A', '#080304'],
    appearancePatch: {
      tokens: {
        bg: '#080304',
        bgElevated: '#15100E',
        surface: '#201611',
        surfaceMuted: '#2B211A',
        text: '#FFF7EC',
        textMuted: '#CAB49F',
        border: 'rgb(255 138 0 / 0.26)',
        borderStrong: '#FF8A00',
        accent: '#FF8A00',
        accentText: '#080304',
      },
    },
  },
  {
    id: 'glass-panel-material',
    kind: 'atom',
    name: 'Glass Panel Material',
    sourceType: 'visual-reference',
    summary: 'Translucent panels with softened borders for ambient gradient contexts.',
    dimensions: ['material'],
    cues: ['translucent surfaces', 'blurred backdrop', 'soft panel depth'],
    colors: ['#EEF3FF', '#FFFFFF', '#6D79F7'],
    appearancePatch: {
      material: 'glass',
      tokens: {
        bgElevated: 'rgb(255 255 255 / 0.72)',
        surface: 'rgb(255 255 255 / 0.58)',
        surfaceMuted: 'rgb(246 240 255 / 0.56)',
        border: 'rgb(87 117 220 / 0.24)',
      },
    },
  },
  {
    id: 'soft-capsule-radius',
    kind: 'atom',
    name: 'Soft Capsule Radius',
    sourceType: 'visual-reference',
    summary: 'Large friendly radius system for pill controls, image cards, and soft blocks.',
    dimensions: ['radius'],
    cues: ['pill controls', 'rounded cards', 'soft block silhouettes'],
    colors: ['#F5F7FA', '#DCE6EE', '#8EA6B8'],
    appearancePatch: {
      tokens: {
        radiusSm: '10px',
        radiusMd: '18px',
        radiusLg: '28px',
        radiusXl: '44px',
      },
    },
  },
  {
    id: 'ambient-glow-lighting',
    kind: 'atom',
    name: 'Ambient Glow Lighting',
    sourceType: 'visual-reference',
    summary: 'Soft lifted depth with atmospheric shadows, suitable for glass and gradient layouts.',
    dimensions: ['lighting'],
    cues: ['soft glow', 'large shadow blur', 'low contrast depth'],
    colors: ['#B7A5FF', '#B8E9F5', '#FFFFFF'],
    appearancePatch: {
      tokens: {
        shadowSm: '0 8px 22px rgb(49 81 111 / 0.12)',
        shadowMd: '0 28px 90px rgb(49 81 111 / 0.18)',
      },
    },
  },
  {
    id: 'editorial-serif-type',
    kind: 'atom',
    name: 'Editorial Serif Type',
    sourceType: 'style-breakdown',
    summary: 'Serif display type for poster-like hierarchy and high-taste editorial cues.',
    dimensions: ['typography'],
    cues: ['serif display', 'calm headline weight', 'editorial contrast'],
    colors: ['#F8F5EF', '#141226', '#7D78FF'],
    appearancePatch: {
      tokens: {
        fontDisplay: 'Georgia, "Times New Roman", serif',
      },
    },
  },
  {
    id: 'compact-tool-layout',
    kind: 'atom',
    name: 'Compact Tool Layout',
    sourceType: 'style-breakdown',
    summary: 'Dense but organized spacing for repeated work and fast scanning.',
    dimensions: ['layout'],
    cues: ['compact panels', 'tight controls', 'scannable workbench rhythm'],
    colors: ['#F8FAFC', '#D8E0E5', '#172026'],
    appearancePatch: {
      tokens: {
        spacePanel: '12px',
        spaceControl: '8px',
      },
    },
  },
  {
    id: 'quiet-label-text',
    kind: 'atom',
    name: 'Quiet Label Text',
    sourceType: 'style-breakdown',
    summary: 'Short, literal labels with restrained supporting copy for tool interfaces.',
    dimensions: ['text'],
    cues: ['literal labels', 'short descriptions', 'low ornamentation'],
    colors: ['#FFFFFF', '#697586', '#172026'],
  },
  {
    id: 'hairline-border-system',
    kind: 'atom',
    name: 'Hairline Border System',
    sourceType: 'style-breakdown',
    summary: 'Subtle dividers and light outlines for dense panels without heavy chrome.',
    dimensions: ['border'],
    cues: ['thin outlines', 'low contrast separators', 'quiet card framing'],
    colors: ['#FFFFFF', '#E1E7EC', '#CCD5DD'],
    appearancePatch: {
      tokens: {
        border: '#d8e0e5',
        borderStrong: '#98A6B3',
      },
    },
  },
  {
    id: 'luna-blue-metal',
    kind: 'combination',
    name: 'Luna Blue Metal',
    sourceType: 'visual-reference',
    summary: 'Cool monochrome palette with pill forms, soft depth, and metallic low-glare lighting.',
    dimensions: ['color', 'material', 'lighting', 'shape'],
    cues: ['blue monochrome ramp', 'pill swatches', 'soft bevel shadow', 'dim specular highlight'],
    colors: ['#A7EBF2', '#54ACBF', '#26658C', '#023859', '#011C40'],
    appearancePatch: {
      material: 'glass',
      tokens: {
        bg: '#071f33',
        bgElevated: 'rgb(12 46 72 / 0.78)',
        surface: 'rgb(16 68 96 / 0.66)',
        surfaceMuted: 'rgb(8 39 64 / 0.54)',
        text: '#E7FAFF',
        textMuted: '#A7EBF2',
        border: 'rgb(167 235 242 / 0.28)',
        borderStrong: '#A7EBF2',
        accent: '#54ACBF',
        accentText: '#011C40',
        radiusMd: '18px',
        radiusLg: '28px',
        radiusXl: '40px',
        shadowMd: '0 28px 80px rgb(1 28 64 / 0.42)',
      },
    },
  },
  {
    id: 'ambient-gradient-glass',
    kind: 'combination',
    name: 'Ambient Gradient Glass',
    sourceType: 'visual-reference',
    summary: 'Atmospheric blue-pink gradient, translucent panel edges, large quiet editorial composition.',
    dimensions: ['color', 'material', 'lighting', 'layout', 'border'],
    cues: ['ambient gradient', 'glass border', 'low density layout', 'soft glow field'],
    colors: ['#3B6FF6', '#8D86F7', '#F2A8C6', '#F8CFA8'],
    appearancePatch: {
      material: 'glass',
      tokens: {
        bg: '#EEF3FF',
        bgElevated: 'rgb(255 255 255 / 0.72)',
        surface: 'rgb(255 255 255 / 0.58)',
        surfaceMuted: 'rgb(246 240 255 / 0.56)',
        text: '#111B42',
        textMuted: '#657098',
        border: 'rgb(87 117 220 / 0.24)',
        accent: '#6D79F7',
        radiusMd: '16px',
        radiusLg: '24px',
        radiusXl: '34px',
      },
    },
  },
  {
    id: 'hermes-orange-cards',
    kind: 'combination',
    name: 'Hermes Orange Cards',
    sourceType: 'palette',
    summary: 'High-contrast orange, black, warm beige, and coffee gray with large rounded blocks.',
    dimensions: ['color', 'shape', 'text', 'radius'],
    cues: ['luxury orange accent', 'bold label typography', 'oversized rounded cards', 'warm neutral support'],
    colors: ['#FF8A00', '#CAB49F', '#503E2A', '#080304'],
    appearancePatch: {
      material: 'solid',
      tokens: {
        bg: '#080304',
        bgElevated: '#15100E',
        surface: '#201611',
        surfaceMuted: '#2B211A',
        text: '#FFF7EC',
        textMuted: '#CAB49F',
        border: 'rgb(255 138 0 / 0.26)',
        borderStrong: '#FF8A00',
        accent: '#FF8A00',
        accentText: '#080304',
        radiusMd: '18px',
        radiusLg: '28px',
        radiusXl: '44px',
      },
    },
  },
  {
    id: 'editorial-serif-poster',
    kind: 'combination',
    name: 'Editorial Serif Poster',
    sourceType: 'style-breakdown',
    summary: 'Poster-like hierarchy with serif display type, sparse supporting text, and calm contrast.',
    dimensions: ['typography', 'layout', 'text'],
    cues: ['serif display', 'wide spacing', 'short declarative copy', 'large quiet headline'],
    colors: ['#F8F5EF', '#141226', '#7D78FF'],
    appearancePatch: {
      material: 'solid',
      tokens: {
        bg: '#F8F5EF',
        surface: '#FFFFFF',
        surfaceMuted: '#F0ECE3',
        text: '#141226',
        textMuted: '#625F72',
        border: '#DDD5C8',
        accent: '#7D78FF',
        fontDisplay: 'Georgia, "Times New Roman", serif',
        radiusMd: '8px',
        radiusLg: '10px',
      },
    },
  },
  {
    id: 'mesh-gradient-breakdown',
    kind: 'combination',
    name: 'Mesh Gradient Breakdown',
    sourceType: 'style-breakdown',
    summary: 'Multi-dimensional guide for soft future-facing interfaces, gradients, icons, and glass panels.',
    dimensions: ['color', 'material', 'layout', 'lighting', 'border'],
    cues: ['mesh gradient', 'glassmorphism', 'feature tiles', 'low contrast atmosphere', 'soft icon grid'],
    colors: ['#FFE1B5', '#FFB4CA', '#B7A5FF', '#B8E9F5'],
    appearancePatch: {
      material: 'glass',
      tokens: {
        bg: '#F8F4FF',
        surface: 'rgb(255 255 255 / 0.66)',
        surfaceMuted: 'rgb(248 244 255 / 0.56)',
        text: '#0E1645',
        textMuted: '#706C8B',
        border: 'rgb(127 113 215 / 0.2)',
        accent: '#8F7BFF',
        radiusMd: '14px',
        radiusLg: '20px',
        radiusXl: '28px',
      },
    },
  },
];

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
