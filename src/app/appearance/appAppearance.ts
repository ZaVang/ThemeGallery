export type AppAppearanceMaterial = 'solid' | 'glass';

export interface AppAppearanceTokens {
  bg: string;
  bgElevated: string;
  surface: string;
  surfaceMuted: string;
  text: string;
  textMuted: string;
  border: string;
  borderStrong: string;
  accent: string;
  accentText: string;
  danger: string;
  radiusSm: string;
  radiusMd: string;
  radiusLg: string;
  radiusXl: string;
  shadowSm: string;
  shadowMd: string;
  fontBody: string;
  fontDisplay: string;
  spacePanel: string;
  spaceControl: string;
}

export interface AppAppearancePreset {
  id: string;
  name: string;
  description: string;
  material: AppAppearanceMaterial;
  tokens: AppAppearanceTokens;
}

export const appAppearancePresets: AppAppearancePreset[] = [
  {
    id: 'quiet-light',
    name: 'Quiet Light',
    description: 'Neutral, utilitarian canvas for collecting and comparing design sources.',
    material: 'solid',
    tokens: {
      bg: '#f3f5f7',
      bgElevated: '#ffffff',
      surface: '#ffffff',
      surfaceMuted: '#f8fafc',
      text: '#172026',
      textMuted: '#697586',
      border: '#d8e0e5',
      borderStrong: '#172026',
      accent: '#2563eb',
      accentText: '#ffffff',
      danger: '#b42318',
      radiusSm: '6px',
      radiusMd: '8px',
      radiusLg: '12px',
      radiusXl: '18px',
      shadowSm: '0 1px 2px rgb(15 23 42 / 0.08)',
      shadowMd: '0 18px 50px rgb(15 23 42 / 0.12)',
      fontBody: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      fontDisplay: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      spacePanel: '16px',
      spaceControl: '12px',
    },
  },
  {
    id: 'quiet-dark',
    name: 'Quiet Dark',
    description: 'Low-glare dark interface for evening collection and review work.',
    material: 'solid',
    tokens: {
      bg: '#101316',
      bgElevated: '#161a1f',
      surface: '#1b2026',
      surfaceMuted: '#14181d',
      text: '#f3f6f8',
      textMuted: '#9aa6b2',
      border: '#303841',
      borderStrong: '#d6dee6',
      accent: '#8ab4ff',
      accentText: '#08111f',
      danger: '#ff9b8f',
      radiusSm: '6px',
      radiusMd: '8px',
      radiusLg: '12px',
      radiusXl: '18px',
      shadowSm: '0 1px 2px rgb(0 0 0 / 0.28)',
      shadowMd: '0 22px 56px rgb(0 0 0 / 0.34)',
      fontBody: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      fontDisplay: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      spacePanel: '16px',
      spaceControl: '12px',
    },
  },
  {
    id: 'glass-lab',
    name: 'Glass Lab',
    description: 'Soft translucent shell for evaluating glass, gradient, and ambient references.',
    material: 'glass',
    tokens: {
      bg: '#eef5ff',
      bgElevated: 'rgb(255 255 255 / 0.72)',
      surface: 'rgb(255 255 255 / 0.62)',
      surfaceMuted: 'rgb(247 250 255 / 0.54)',
      text: '#122033',
      textMuted: '#5f7086',
      border: 'rgb(122 145 170 / 0.32)',
      borderStrong: '#31516f',
      accent: '#6d5dfc',
      accentText: '#ffffff',
      danger: '#b42318',
      radiusSm: '10px',
      radiusMd: '14px',
      radiusLg: '18px',
      radiusXl: '26px',
      shadowSm: '0 8px 22px rgb(49 81 111 / 0.12)',
      shadowMd: '0 28px 90px rgb(49 81 111 / 0.18)',
      fontBody: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      fontDisplay: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      spacePanel: '18px',
      spaceControl: '12px',
    },
  },
];

export const defaultAppAppearancePreset = appAppearancePresets[0];
