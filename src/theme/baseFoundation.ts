import type { ComponentToken, NormalizedTheme, TypographyToken } from '../types/theme';

const typography: Record<string, TypographyToken> = {
  'display-lg': {
    fontFamily: 'Inter',
    fontSize: '64px',
    fontWeight: '700',
    lineHeight: '72px',
    letterSpacing: '0',
  },
  'headline-lg': {
    fontFamily: 'Inter',
    fontSize: '32px',
    fontWeight: '650',
    lineHeight: '40px',
    letterSpacing: '0',
  },
  'headline-md': {
    fontFamily: 'Inter',
    fontSize: '24px',
    fontWeight: '650',
    lineHeight: '32px',
    letterSpacing: '0',
  },
  'body-lg': {
    fontFamily: 'Inter',
    fontSize: '18px',
    fontWeight: '400',
    lineHeight: '28px',
    letterSpacing: '0',
  },
  'body-md': {
    fontFamily: 'Inter',
    fontSize: '16px',
    fontWeight: '400',
    lineHeight: '24px',
    letterSpacing: '0',
  },
  'label-sm': {
    fontFamily: 'Inter',
    fontSize: '12px',
    fontWeight: '700',
    lineHeight: '16px',
    letterSpacing: '0.04em',
  },
};

const rounded = {
  sm: '0.375rem',
  DEFAULT: '0.625rem',
  md: '0.75rem',
  lg: '1rem',
  xl: '1.25rem',
  full: '9999px',
};

const spacing = {
  unit: '8px',
  'container-padding': '24px',
  'card-gap': '16px',
  'section-margin': '40px',
  'sidebar-width': '248px',
};

const components: Record<string, ComponentToken> = {
  'button-primary': {
    backgroundColor: '{colors.primary}',
    textColor: '{colors.on-primary}',
    typography: '{typography.label-sm}',
    rounded: '{rounded.md}',
    height: '40px',
    padding: '0 16px',
  },
  'button-ghost': {
    backgroundColor: 'transparent',
    textColor: '{colors.on-surface}',
    typography: '{typography.label-sm}',
    rounded: '{rounded.md}',
    height: '40px',
    padding: '0 14px',
  },
  'card-standard': {
    backgroundColor: '{colors.surface-container}',
    textColor: '{colors.on-surface}',
    rounded: '{rounded.md}',
    padding: '16px',
  },
  'input-field': {
    backgroundColor: '{colors.surface-container}',
    textColor: '{colors.on-surface}',
    typography: '{typography.body-md}',
    rounded: '{rounded.md}',
    padding: '10px 12px',
    height: '40px',
  },
  badge: {
    backgroundColor: '{colors.secondary-container}',
    textColor: '{colors.on-secondary-container}',
    typography: '{typography.label-sm}',
    rounded: '{rounded.full}',
    padding: '4px 10px',
  },
};

export const baseFoundation: Pick<
  NormalizedTheme,
  'colors' | 'gradients' | 'typography' | 'rounded' | 'spacing' | 'components'
> = {
  colors: {
    background: '#f7f8fa',
    'on-background': '#172026',
    surface: '#ffffff',
    'on-surface': '#172026',
    'on-surface-variant': '#667085',
    'surface-dim': '#f0f3f5',
    'surface-bright': '#ffffff',
    'surface-container-lowest': '#ffffff',
    'surface-container-low': '#f7f8fa',
    'surface-container': '#ffffff',
    'surface-container-high': '#f0f3f5',
    'surface-container-highest': '#e5eaee',
    'surface-variant': '#e5eaee',
    outline: '#d0d7de',
    'outline-variant': '#e6ebef',
    'surface-tint': '#2563eb',
    primary: '#2563eb',
    'on-primary': '#ffffff',
    'primary-container': '#dbeafe',
    'on-primary-container': '#1e3a8a',
    'inverse-primary': '#2563eb',
    secondary: '#0f766e',
    'on-secondary': '#ffffff',
    'secondary-container': '#ccfbf1',
    'on-secondary-container': '#134e4a',
    tertiary: '#a855f7',
    'on-tertiary': '#ffffff',
    'tertiary-container': '#f3e8ff',
    'on-tertiary-container': '#581c87',
    error: '#dc2626',
    'on-error': '#ffffff',
    'error-container': '#fee2e2',
    'on-error-container': '#7f1d1d',
    'inverse-surface': '#172026',
    'inverse-on-surface': '#ffffff',
  },
  gradients: [],
  typography,
  rounded,
  spacing,
  components,
};

