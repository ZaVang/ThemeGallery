export type ThemeKind = 'theme' | 'palette-derived';
export type SourceKind = 'theme' | 'palette';

export interface TypographyToken {
  fontFamily: string;
  fontSize: string;
  fontWeight: string;
  lineHeight: string;
  letterSpacing?: string;
}

export type ComponentPrimitive = string | number | boolean | null;
export interface ComponentArray extends Array<ComponentValue> {}
export interface ComponentToken {
  [key: string]: ComponentValue;
}
export type ComponentValue = ComponentPrimitive | ComponentToken | ComponentArray;

export interface PaletteColor {
  name: string;
  hex: string;
  role?: string;
}

export interface ColorSwatch {
  name: string;
  hex: string;
  role?: string;
  token?: string;
}

export interface GradientToken {
  from: string;
  to: string;
}

export type TokenProvenance = 'authored' | 'derived' | 'fallback';

export type ThemeRiskSeverity = 'fail' | 'note';
export type ThemeRiskStatus = 'pass' | 'review' | 'fail';

export interface ThemeRiskItem {
  severity: ThemeRiskSeverity;
  label: string;
  message: string;
  ratio?: number;
}

export interface ThemeRiskSummary {
  status: ThemeRiskStatus;
  failCount: number;
  noteCount: number;
  items: ThemeRiskItem[];
}

export interface ParsedThemeSource {
  sourceKind: SourceKind;
  filePath: string;
  id: string;
  name: string;
  tags: string[];
  source?: string;
  mood?: string;
  colors: Record<string, string> | PaletteColor[];
  gradients: GradientToken[];
  typography?: Record<string, TypographyToken>;
  rounded?: Record<string, string>;
  spacing?: Record<string, string>;
  components?: Record<string, ComponentToken>;
  markdownBody: string;
  warnings: string[];
}

export interface NormalizedTheme {
  id: string;
  kind: ThemeKind;
  filePath: string;
  name: string;
  tags: string[];
  source?: string;
  mood?: string;
  colors: Record<string, string>;
  colorProvenance?: Record<string, TokenProvenance>;
  colorSwatches: ColorSwatch[];
  gradients: GradientToken[];
  typography: Record<string, TypographyToken>;
  rounded: Record<string, string>;
  spacing: Record<string, string>;
  components: Record<string, ComponentToken>;
  markdownBody: string;
  riskSummary?: ThemeRiskSummary;
  warnings: string[];
}
