# ThemeGallery Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a local React/Vite theme workbench that reads `themes/*.md` and `palettes/*.md`, normalizes them into previewable themes, and shows Dashboard, Landing, Mobile, and Components previews.

**Architecture:** Keep data parsing and theme derivation separate from React UI. Markdown files become `ParsedThemeSource`, then `NormalizedTheme`; preview components consume CSS variables only, while the inspector reads the normalized object for details and warnings.

**Tech Stack:** React 19, Vite, TypeScript, Vitest, Testing Library, `gray-matter`, `react-markdown`, plain CSS variables.

---

## File Map

- Create `package.json`: npm scripts and dependencies.
- Create `index.html`: Vite entry HTML.
- Create `tsconfig.json`: TypeScript config for Vite and Vitest.
- Create `vite.config.ts`: React plugin and Vitest jsdom config.
- Create `src/main.tsx`: React root.
- Create `src/App.tsx`: workbench state composition.
- Create `src/styles.css`: app shell, preview scenes, responsive styles.
- Create `src/test/setup.ts`: Testing Library matcher setup.
- Create `src/types/theme.ts`: shared parsing and theme model types.
- Create `src/theme/baseFoundation.ts`: neutral foundation used by derived palette themes.
- Create `src/theme/colorMath.ts`: hex parsing, contrast, color mixing.
- Create `src/theme/derivePaletteTheme.ts`: palette frontmatter to `NormalizedTheme`.
- Create `src/theme/resolveReferences.ts`: `{colors.primary}` and nested token reference resolver.
- Create `src/theme/normalizeTheme.ts`: full theme normalization and warning generation.
- Create `src/theme/cssVars.ts`: `NormalizedTheme` to CSS variables.
- Create `src/data/parseTheme.ts`: `gray-matter` parsing from raw Markdown.
- Create `src/data/themeLoader.ts`: `import.meta.glob` loader plus testable module loader.
- Create `src/components/workbench/SearchAndFilters.tsx`: query and type filters.
- Create `src/components/workbench/ThemeLibrary.tsx`: theme list.
- Create `src/components/workbench/PreviewStage.tsx`: tabbed preview host.
- Create `src/components/workbench/ThemeInspector.tsx`: tokens, warnings, markdown body.
- Create `src/components/previews/DashboardPreview.tsx`: SaaS dashboard scene.
- Create `src/components/previews/LandingPreview.tsx`: landing page scene.
- Create `src/components/previews/MobilePreview.tsx`: mobile app scene.
- Create `src/components/previews/ComponentsPreview.tsx`: component token board.

## Task 0: Track Source Markdown Assets

**Files:**
- Add existing: `themes/*.md`
- Add existing: `themes/tailwind.css`
- Add existing: `palettes/*.md`

- [ ] **Step 1: Confirm source asset status**

Run:

```powershell
git status --short themes palettes
```

Expected in the current workspace:

```text
?? palettes/
?? themes/
```

- [ ] **Step 2: Stage source assets**

Run:

```powershell
git add themes palettes
git status --short themes palettes
```

Expected: files under `themes/` and `palettes/` show as staged additions.

- [ ] **Step 3: Commit source assets**

Run:

```powershell
git commit -m "chore: add theme source assets"
```

Expected: commit succeeds. Fresh worktrees and subagents now receive the Markdown fixtures needed by the app and tests.

## Task 1: Project Foundation

**Files:**
- Create: `package.json`
- Create: `index.html`
- Create: `tsconfig.json`
- Create: `vite.config.ts`
- Create: `src/test/setup.ts`
- Create: `src/main.tsx`
- Create: `src/App.tsx`
- Create: `src/App.test.tsx`
- Create: `src/styles.css`

- [ ] **Step 1: Create package manifest**

Create `package.json`:

```json
{
  "name": "theme-gallery",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite --host 127.0.0.1 --port 47822",
    "build": "npm run typecheck && vite build",
    "preview": "vite preview --host 127.0.0.1 --port 47823",
    "test": "vitest run",
    "test:watch": "vitest",
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {
    "gray-matter": "^4.0.3",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "react-markdown": "^10.0.0"
  },
  "devDependencies": {
    "@testing-library/jest-dom": "^6.6.3",
    "@testing-library/react": "^16.1.0",
    "@testing-library/user-event": "^14.5.2",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "@vitejs/plugin-react": "^5.0.0",
    "jsdom": "^25.0.1",
    "typescript": "^5.7.2",
    "vite": "^6.0.0",
    "vitest": "^2.1.8"
  }
}
```

- [ ] **Step 2: Install dependencies**

Run:

```powershell
npm install
```

Expected: `package-lock.json` is created and npm exits with code 0.

- [ ] **Step 3: Create Vite and TypeScript config**

Create `index.html`:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>ThemeGallery</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

Create `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "useDefineForClassFields": true,
    "lib": ["DOM", "DOM.Iterable", "ES2022"],
    "allowJs": false,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "types": ["vitest/globals"]
  },
  "include": ["src", "vite.config.ts"]
}
```

Create `vite.config.ts`:

```ts
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.ts',
  },
});
```

Create `src/test/setup.ts`:

```ts
import '@testing-library/jest-dom/vitest';
```

- [ ] **Step 4: Write the failing smoke test**

Create `src/App.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders the ThemeGallery workbench title', () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: 'ThemeGallery' })).toBeInTheDocument();
  });
});
```

Run:

```powershell
npm test -- src/App.test.tsx
```

Expected: FAIL because `src/App.tsx` does not exist.

- [ ] **Step 5: Create minimal app shell**

Create `src/App.tsx`:

```tsx
import './styles.css';

export default function App() {
  return (
    <main className="app-shell">
      <section className="empty-state" aria-labelledby="app-title">
        <p className="eyebrow">Local theme workbench</p>
        <h1 id="app-title">ThemeGallery</h1>
        <p>Loading Markdown themes from the local workspace.</p>
      </section>
    </main>
  );
}
```

Create `src/main.tsx`:

```tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
```

Create `src/styles.css`:

```css
:root {
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  color: #172026;
  background: #f5f7f8;
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  min-width: 320px;
  min-height: 100vh;
}

button,
input,
select {
  font: inherit;
}

.app-shell {
  min-height: 100vh;
}

.empty-state {
  display: grid;
  min-height: 100vh;
  place-content: center;
  padding: 32px;
  text-align: center;
}

.eyebrow {
  margin: 0 0 8px;
  color: #667085;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
```

- [ ] **Step 6: Verify foundation**

Run:

```powershell
npm test -- src/App.test.tsx
npm run typecheck
```

Expected: both commands exit with code 0.

- [ ] **Step 7: Commit foundation**

Run:

```powershell
git add package.json package-lock.json index.html tsconfig.json vite.config.ts src
git commit -m "chore: scaffold React theme gallery"
```

Expected: commit succeeds.

## Task 2: Theme Types and Neutral Foundation

**Files:**
- Create: `src/types/theme.ts`
- Create: `src/theme/baseFoundation.ts`
- Create: `src/theme/baseFoundation.test.ts`

- [ ] **Step 1: Write failing base foundation test**

Create `src/theme/baseFoundation.test.ts`:

```ts
import { baseFoundation } from './baseFoundation';

describe('baseFoundation', () => {
  it('contains the tokens required for derived palette themes', () => {
    expect(baseFoundation.typography['body-md'].fontFamily).toBe('Inter');
    expect(baseFoundation.rounded.md).toBe('0.75rem');
    expect(baseFoundation.spacing.unit).toBe('8px');
    expect(baseFoundation.components['button-primary'].backgroundColor).toBe('{colors.primary}');
    expect(baseFoundation.components['card-standard'].backgroundColor).toBe('{colors.surface-container}');
  });
});
```

Run:

```powershell
npm test -- src/theme/baseFoundation.test.ts
```

Expected: FAIL because `baseFoundation.ts` does not exist.

- [ ] **Step 2: Create shared theme types**

Create `src/types/theme.ts`:

```ts
export type ThemeKind = 'theme' | 'palette-derived';
export type SourceKind = 'theme' | 'palette';

export interface TypographyToken {
  fontFamily: string;
  fontSize: string;
  fontWeight: string;
  lineHeight: string;
  letterSpacing?: string;
}

export type ComponentToken = Record<string, string | number | boolean | ComponentToken>;

export interface PaletteColor {
  name: string;
  hex: string;
  role?: string;
}

export interface GradientToken {
  from: string;
  to: string;
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
  gradients: GradientToken[];
  typography: Record<string, TypographyToken>;
  rounded: Record<string, string>;
  spacing: Record<string, string>;
  components: Record<string, ComponentToken>;
  markdownBody: string;
  warnings: string[];
}
```

- [ ] **Step 3: Create base foundation**

Create `src/theme/baseFoundation.ts`:

```ts
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
    'surface-container': '#ffffff',
    'surface-container-high': '#f0f3f5',
    'surface-container-highest': '#e5eaee',
    outline: '#d0d7de',
    'outline-variant': '#e6ebef',
    primary: '#2563eb',
    'on-primary': '#ffffff',
    'primary-container': '#dbeafe',
    'on-primary-container': '#1e3a8a',
    secondary: '#0f766e',
    'on-secondary': '#ffffff',
    'secondary-container': '#ccfbf1',
    'on-secondary-container': '#134e4a',
    tertiary: '#a855f7',
    'on-tertiary': '#ffffff',
    error: '#dc2626',
    'on-error': '#ffffff',
  },
  gradients: [],
  typography,
  rounded,
  spacing,
  components,
};
```

- [ ] **Step 4: Verify foundation tokens**

Run:

```powershell
npm test -- src/theme/baseFoundation.test.ts
npm run typecheck
```

Expected: both commands exit with code 0.

- [ ] **Step 5: Commit types and foundation**

Run:

```powershell
git add src/types/theme.ts src/theme/baseFoundation.ts src/theme/baseFoundation.test.ts
git commit -m "feat: add theme model foundation"
```

Expected: commit succeeds.

## Task 3: Color Math and Palette-Derived Themes

**Files:**
- Create: `src/theme/colorMath.ts`
- Create: `src/theme/colorMath.test.ts`
- Create: `src/theme/derivePaletteTheme.ts`
- Create: `src/theme/derivePaletteTheme.test.ts`

- [ ] **Step 1: Write failing color math tests**

Create `src/theme/colorMath.test.ts`:

```ts
import { contrastRatio, mixHex, normalizeHex, readableTextColor } from './colorMath';

describe('colorMath', () => {
  it('normalizes short and long hex colors', () => {
    expect(normalizeHex('#abc')).toBe('#aabbcc');
    expect(normalizeHex('#AABBCC')).toBe('#aabbcc');
  });

  it('chooses readable text against light and dark backgrounds', () => {
    expect(readableTextColor('#ffffff')).toBe('#111827');
    expect(readableTextColor('#011c40')).toBe('#ffffff');
  });

  it('computes contrast ratio and mixes colors', () => {
    expect(contrastRatio('#ffffff', '#000000')).toBeCloseTo(21, 0);
    expect(mixHex('#000000', '#ffffff', 0.5)).toBe('#808080');
  });
});
```

Run:

```powershell
npm test -- src/theme/colorMath.test.ts
```

Expected: FAIL because `colorMath.ts` does not exist.

- [ ] **Step 2: Implement color math**

Create `src/theme/colorMath.ts`:

```ts
interface Rgb {
  r: number;
  g: number;
  b: number;
}

export function normalizeHex(input: string): string {
  const trimmed = input.trim();
  const match = trimmed.match(/^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/);
  if (!match) {
    throw new Error(`Invalid hex color: ${input}`);
  }
  const value = match[1].toLowerCase();
  if (value.length === 3) {
    return `#${value[0]}${value[0]}${value[1]}${value[1]}${value[2]}${value[2]}`;
  }
  return `#${value}`;
}

function hexToRgb(hex: string): Rgb {
  const normalized = normalizeHex(hex).slice(1);
  return {
    r: parseInt(normalized.slice(0, 2), 16),
    g: parseInt(normalized.slice(2, 4), 16),
    b: parseInt(normalized.slice(4, 6), 16),
  };
}

function channelToLinear(channel: number): number {
  const value = channel / 255;
  return value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
}

export function relativeLuminance(hex: string): number {
  const { r, g, b } = hexToRgb(hex);
  return 0.2126 * channelToLinear(r) + 0.7152 * channelToLinear(g) + 0.0722 * channelToLinear(b);
}

export function contrastRatio(a: string, b: string): number {
  const l1 = relativeLuminance(a);
  const l2 = relativeLuminance(b);
  const light = Math.max(l1, l2);
  const dark = Math.min(l1, l2);
  return (light + 0.05) / (dark + 0.05);
}

export function readableTextColor(background: string): '#111827' | '#ffffff' {
  return contrastRatio(background, '#111827') >= contrastRatio(background, '#ffffff') ? '#111827' : '#ffffff';
}

export function mixHex(a: string, b: string, amount: number): string {
  const start = hexToRgb(a);
  const end = hexToRgb(b);
  const ratio = Math.min(1, Math.max(0, amount));
  const mixed = {
    r: Math.round(start.r + (end.r - start.r) * ratio),
    g: Math.round(start.g + (end.g - start.g) * ratio),
    b: Math.round(start.b + (end.b - start.b) * ratio),
  };
  return `#${[mixed.r, mixed.g, mixed.b].map((part) => part.toString(16).padStart(2, '0')).join('')}`;
}
```

- [ ] **Step 3: Verify color math**

Run:

```powershell
npm test -- src/theme/colorMath.test.ts
```

Expected: PASS.

- [ ] **Step 4: Write failing palette derivation tests**

Create `src/theme/derivePaletteTheme.test.ts`:

```ts
import type { ParsedThemeSource } from '../types/theme';
import { derivePaletteTheme } from './derivePaletteTheme';

const softMauve: ParsedThemeSource = {
  sourceKind: 'palette',
  filePath: 'palettes/soft-mauve.md',
  id: 'soft-mauve',
  name: 'Soft Mauve',
  tags: ['soft', 'mauve'],
  mood: '柔和雅致',
  source: '小红书',
  colors: [
    { name: 'Alice Blue', hex: '#F0F8FF', role: 'background' },
    { name: 'Pearl Aqua', hex: '#88D8C0', role: 'secondary' },
    { name: 'Pale Slate', hex: '#B8A9C9', role: 'primary' },
    { name: 'Lilac Ash', hex: '#C9A0B0', role: 'accent' },
    { name: 'Mauve Shadow', hex: '#5C3D52', role: 'surface' },
  ],
  gradients: [{ from: '#F0F8FF', to: '#88D8C0' }],
  markdownBody: '## 感受\n柔和雅致',
  warnings: [],
};

describe('derivePaletteTheme', () => {
  it('maps palette roles into a full normalized theme', () => {
    const theme = derivePaletteTheme(softMauve);
    expect(theme.kind).toBe('palette-derived');
    expect(theme.colors.background).toBe('#f0f8ff');
    expect(theme.colors.primary).toBe('#b8a9c9');
    expect(theme.colors.tertiary).toBe('#c9a0b0');
    expect(theme.colors['on-primary']).toMatch(/^#/);
    expect(theme.typography['body-md'].fontFamily).toBe('Inter');
    expect(theme.components['button-primary']).toBeDefined();
  });

  it('warns when role colors are missing', () => {
    const theme = derivePaletteTheme({ ...softMauve, colors: [{ name: 'Only', hex: '#123456' }] });
    expect(theme.warnings.some((warning) => warning.includes('Missing palette role'))).toBe(true);
  });
});
```

Run:

```powershell
npm test -- src/theme/derivePaletteTheme.test.ts
```

Expected: FAIL because `derivePaletteTheme.ts` does not exist.

- [ ] **Step 5: Implement palette derivation**

Create `src/theme/derivePaletteTheme.ts`:

```ts
import type { NormalizedTheme, PaletteColor, ParsedThemeSource } from '../types/theme';
import { baseFoundation } from './baseFoundation';
import { mixHex, normalizeHex, readableTextColor } from './colorMath';

function asPaletteColors(colors: ParsedThemeSource['colors']): PaletteColor[] {
  return Array.isArray(colors) ? colors : [];
}

function findRole(colors: PaletteColor[], role: string): string | undefined {
  const color = colors.find((entry) => entry.role === role);
  return color ? normalizeHex(color.hex) : undefined;
}

function fallbackColor(colors: PaletteColor[], index: number, fallback: string): string {
  const color = colors[index];
  return color ? normalizeHex(color.hex) : fallback;
}

export function derivePaletteTheme(source: ParsedThemeSource): NormalizedTheme {
  const paletteColors = asPaletteColors(source.colors);
  const warnings = [...source.warnings];

  const background = findRole(paletteColors, 'background') ?? fallbackColor(paletteColors, 0, baseFoundation.colors.background);
  const surface = findRole(paletteColors, 'surface') ?? fallbackColor(paletteColors, paletteColors.length - 1, baseFoundation.colors.surface);
  const primary = findRole(paletteColors, 'primary') ?? fallbackColor(paletteColors, 1, baseFoundation.colors.primary);
  const secondary = findRole(paletteColors, 'secondary') ?? fallbackColor(paletteColors, 2, baseFoundation.colors.secondary);
  const accent = findRole(paletteColors, 'accent') ?? fallbackColor(paletteColors, 3, baseFoundation.colors.tertiary);

  for (const role of ['background', 'surface', 'primary', 'secondary', 'accent']) {
    if (!findRole(paletteColors, role)) {
      warnings.push(`Missing palette role "${role}"; derived from available colors.`);
    }
  }

  const colors = {
    ...baseFoundation.colors,
    background,
    'on-background': readableTextColor(background),
    surface,
    'on-surface': readableTextColor(surface),
    'on-surface-variant': mixHex(readableTextColor(surface), surface, 0.42),
    'surface-dim': mixHex(background, surface, 0.18),
    'surface-container': mixHex(surface, background, 0.12),
    'surface-container-high': mixHex(surface, readableTextColor(surface), 0.08),
    'surface-container-highest': mixHex(surface, readableTextColor(surface), 0.14),
    outline: mixHex(surface, readableTextColor(surface), 0.28),
    'outline-variant': mixHex(surface, readableTextColor(surface), 0.16),
    primary,
    'on-primary': readableTextColor(primary),
    'primary-container': mixHex(primary, background, 0.72),
    'on-primary-container': readableTextColor(mixHex(primary, background, 0.72)),
    secondary,
    'on-secondary': readableTextColor(secondary),
    'secondary-container': mixHex(secondary, background, 0.72),
    'on-secondary-container': readableTextColor(mixHex(secondary, background, 0.72)),
    tertiary: accent,
    'on-tertiary': readableTextColor(accent),
  };

  return {
    id: source.id,
    kind: 'palette-derived',
    filePath: source.filePath,
    name: source.name,
    tags: source.tags,
    source: source.source,
    mood: source.mood,
    colors,
    gradients: source.gradients,
    typography: baseFoundation.typography,
    rounded: baseFoundation.rounded,
    spacing: baseFoundation.spacing,
    components: baseFoundation.components,
    markdownBody: source.markdownBody,
    warnings,
  };
}
```

- [ ] **Step 6: Verify palette derivation**

Run:

```powershell
npm test -- src/theme/colorMath.test.ts src/theme/derivePaletteTheme.test.ts
npm run typecheck
```

Expected: both commands exit with code 0.

- [ ] **Step 7: Commit color and palette logic**

Run:

```powershell
git add src/theme/colorMath.ts src/theme/colorMath.test.ts src/theme/derivePaletteTheme.ts src/theme/derivePaletteTheme.test.ts
git commit -m "feat: derive themes from palettes"
```

Expected: commit succeeds.

## Task 4: Markdown Parsing, References, and Normalization

**Files:**
- Create: `src/data/parseTheme.ts`
- Create: `src/data/parseTheme.test.ts`
- Create: `src/theme/resolveReferences.ts`
- Create: `src/theme/resolveReferences.test.ts`
- Create: `src/theme/normalizeTheme.ts`
- Create: `src/theme/normalizeTheme.test.ts`

- [ ] **Step 1: Write failing Markdown parser tests**

Create `src/data/parseTheme.test.ts`:

```ts
import { parseMarkdownSource } from './parseTheme';

describe('parseMarkdownSource', () => {
  it('parses theme frontmatter and markdown body', () => {
    const parsed = parseMarkdownSource(
      'themes/demo.md',
      'theme',
      '---\nname: Demo\ncolors:\n  primary: "#123456"\ntags: [clean]\n---\n\n## Notes\nBody',
    );
    expect(parsed.name).toBe('Demo');
    expect(parsed.id).toBe('demo');
    expect(parsed.tags).toEqual(['clean']);
    expect(parsed.markdownBody).toContain('## Notes');
  });

  it('returns a warning instead of throwing when frontmatter cannot parse', () => {
    const parsed = parseMarkdownSource('themes/broken.md', 'theme', '---\nname: [\n---\nBody');
    expect(parsed.name).toBe('broken');
    expect(parsed.warnings[0]).toContain('Failed to parse frontmatter');
  });
});
```

Run:

```powershell
npm test -- src/data/parseTheme.test.ts
```

Expected: FAIL because `parseTheme.ts` does not exist.

- [ ] **Step 2: Implement Markdown parser**

Create `src/data/parseTheme.ts`:

```ts
import matter from 'gray-matter';
import type { ParsedThemeSource, SourceKind } from '../types/theme';

function idFromPath(filePath: string): string {
  const file = filePath.split(/[\\/]/).pop() ?? filePath;
  return file.replace(/\.(md|markdown)$/i, '');
}

function arrayFromUnknown(value: unknown): string[] {
  return Array.isArray(value) ? value.map(String) : [];
}

export function parseMarkdownSource(filePath: string, sourceKind: SourceKind, raw: string): ParsedThemeSource {
  const id = idFromPath(filePath);
  try {
    const parsed = matter(raw);
    const data = parsed.data as Record<string, unknown>;
    return {
      sourceKind,
      filePath,
      id,
      name: typeof data.name === 'string' ? data.name : id,
      tags: arrayFromUnknown(data.tags),
      source: typeof data.source === 'string' ? data.source : undefined,
      mood: typeof data.mood === 'string' ? data.mood : undefined,
      colors: (data.colors as ParsedThemeSource['colors']) ?? (sourceKind === 'palette' ? [] : {}),
      gradients: Array.isArray(data.gradients) ? (data.gradients as ParsedThemeSource['gradients']) : [],
      typography: data.typography as ParsedThemeSource['typography'],
      rounded: data.rounded as ParsedThemeSource['rounded'],
      spacing: data.spacing as ParsedThemeSource['spacing'],
      components: data.components as ParsedThemeSource['components'],
      markdownBody: parsed.content.trim(),
      warnings: [],
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return {
      sourceKind,
      filePath,
      id,
      name: id,
      tags: [],
      colors: sourceKind === 'palette' ? [] : {},
      gradients: [],
      markdownBody: raw,
      warnings: [`Failed to parse frontmatter: ${message}`],
    };
  }
}
```

- [ ] **Step 3: Verify parser**

Run:

```powershell
npm test -- src/data/parseTheme.test.ts
```

Expected: PASS.

- [ ] **Step 4: Write failing reference resolver tests**

Create `src/theme/resolveReferences.test.ts`:

```ts
import { resolveReferences } from './resolveReferences';

describe('resolveReferences', () => {
  it('resolves string token references recursively', () => {
    const result = resolveReferences(
      {
        button: {
          backgroundColor: '{colors.primary}',
          typography: '{typography.label-sm}',
        },
      },
      {
        colors: { primary: '#123456' },
        typography: { 'label-sm': { fontFamily: 'Inter', fontSize: '12px', fontWeight: '700', lineHeight: '16px' } },
        rounded: {},
        spacing: {},
      },
    );

    expect(result.value.button.backgroundColor).toBe('#123456');
    expect(result.value.button.typography).toEqual({
      fontFamily: 'Inter',
      fontSize: '12px',
      fontWeight: '700',
      lineHeight: '16px',
    });
    expect(result.warnings).toEqual([]);
  });

  it('keeps unresolved references visible and records warnings', () => {
    const result = resolveReferences('{colors.missing}', {
      colors: {},
      typography: {},
      rounded: {},
      spacing: {},
    });
    expect(result.value).toBe('{colors.missing}');
    expect(result.warnings[0]).toContain('Unable to resolve reference');
  });
});
```

Run:

```powershell
npm test -- src/theme/resolveReferences.test.ts
```

Expected: FAIL because `resolveReferences.ts` does not exist.

- [ ] **Step 5: Implement reference resolver**

Create `src/theme/resolveReferences.ts`:

```ts
type TokenBag = Record<string, unknown>;

interface ReferenceContext {
  colors: TokenBag;
  typography: TokenBag;
  rounded: TokenBag;
  spacing: TokenBag;
}

interface ResolveResult<T> {
  value: T;
  warnings: string[];
}

function lookup(path: string, context: ReferenceContext): unknown {
  const [group, ...segments] = path.split('.');
  let cursor: unknown = context[group as keyof ReferenceContext];
  for (const segment of segments) {
    if (!cursor || typeof cursor !== 'object' || !(segment in cursor)) {
      return undefined;
    }
    cursor = (cursor as Record<string, unknown>)[segment];
  }
  return cursor;
}

export function resolveReferences<T>(value: T, context: ReferenceContext): ResolveResult<T> {
  const warnings: string[] = [];

  function walk(input: unknown): unknown {
    if (typeof input === 'string') {
      const exact = input.match(/^\{([^}]+)\}$/);
      if (exact) {
        const resolved = lookup(exact[1], context);
        if (resolved === undefined) {
          warnings.push(`Unable to resolve reference "${input}".`);
          return input;
        }
        return resolved;
      }
      return input.replace(/\{([^}]+)\}/g, (match, path) => {
        const resolved = lookup(path, context);
        if (resolved === undefined || typeof resolved === 'object') {
          warnings.push(`Unable to resolve reference "${match}".`);
          return match;
        }
        return String(resolved);
      });
    }

    if (Array.isArray(input)) {
      return input.map(walk);
    }

    if (input && typeof input === 'object') {
      return Object.fromEntries(Object.entries(input).map(([key, entry]) => [key, walk(entry)]));
    }

    return input;
  }

  return {
    value: walk(value) as T,
    warnings,
  };
}
```

- [ ] **Step 6: Write failing normalization tests**

Create `src/theme/normalizeTheme.test.ts`:

```ts
import type { ParsedThemeSource } from '../types/theme';
import { normalizeTheme } from './normalizeTheme';

const parsedTheme: ParsedThemeSource = {
  sourceKind: 'theme',
  filePath: 'themes/linear.md',
  id: 'linear',
  name: 'Linear',
  tags: [],
  colors: {
    background: '#1a1a1a',
    'on-background': '#ffffff',
    surface: '#1a1a1a',
    'on-surface': '#ffffff',
    primary: '#5E6AD2',
    'on-primary': '#ffffff',
  },
  gradients: [],
  typography: {
    'label-sm': { fontFamily: 'Inter', fontSize: '12px', fontWeight: '600', lineHeight: '16px' },
  },
  components: {
    'button-primary': {
      backgroundColor: '{colors.primary}',
      typography: '{typography.label-sm}',
    },
  },
  markdownBody: '## Brand & Style',
  warnings: [],
};

describe('normalizeTheme', () => {
  it('normalizes full themes and resolves references', () => {
    const theme = normalizeTheme(parsedTheme);
    expect(theme.kind).toBe('theme');
    expect(theme.colors.primary).toBe('#5E6AD2');
    expect(theme.components['button-primary'].backgroundColor).toBe('#5E6AD2');
    expect(theme.components['button-primary'].typography).toEqual({
      fontFamily: 'Inter',
      fontSize: '12px',
      fontWeight: '600',
      lineHeight: '16px',
    });
  });

  it('delegates palette sources to palette derivation', () => {
    const theme = normalizeTheme({
      ...parsedTheme,
      sourceKind: 'palette',
      filePath: 'palettes/simple.md',
      id: 'simple',
      colors: [{ name: 'Blue', hex: '#123456', role: 'primary' }],
    });
    expect(theme.kind).toBe('palette-derived');
  });
});
```

Run:

```powershell
npm test -- src/theme/normalizeTheme.test.ts
```

Expected: FAIL because `normalizeTheme.ts` does not exist.

- [ ] **Step 7: Implement normalizer**

Create `src/theme/normalizeTheme.ts`:

```ts
import type { ComponentToken, NormalizedTheme, ParsedThemeSource } from '../types/theme';
import { baseFoundation } from './baseFoundation';
import { derivePaletteTheme } from './derivePaletteTheme';
import { resolveReferences } from './resolveReferences';

function objectColors(colors: ParsedThemeSource['colors']): Record<string, string> {
  return Array.isArray(colors) ? {} : colors;
}

export function normalizeTheme(source: ParsedThemeSource): NormalizedTheme {
  if (source.sourceKind === 'palette') {
    return derivePaletteTheme(source);
  }

  const warnings = [...source.warnings];
  const colors = {
    ...baseFoundation.colors,
    ...objectColors(source.colors),
  };
  const typography = {
    ...baseFoundation.typography,
    ...(source.typography ?? {}),
  };
  const rounded = {
    ...baseFoundation.rounded,
    ...(source.rounded ?? {}),
  };
  const spacing = {
    ...baseFoundation.spacing,
    ...(source.spacing ?? {}),
  };
  const unresolvedComponents: Record<string, ComponentToken> = {
    ...baseFoundation.components,
    ...(source.components ?? {}),
  };

  if (!source.typography) warnings.push('Missing typography; used Base UI Foundation typography.');
  if (!source.rounded) warnings.push('Missing rounded; used Base UI Foundation rounded tokens.');
  if (!source.spacing) warnings.push('Missing spacing; used Base UI Foundation spacing tokens.');
  if (!source.components) warnings.push('Missing components; used Base UI Foundation components.');

  const resolvedComponents = resolveReferences(unresolvedComponents, {
    colors,
    typography,
    rounded,
    spacing,
  });

  return {
    id: source.id,
    kind: 'theme',
    filePath: source.filePath,
    name: source.name,
    tags: source.tags,
    source: source.source,
    mood: source.mood,
    colors,
    gradients: source.gradients,
    typography,
    rounded,
    spacing,
    components: resolvedComponents.value,
    markdownBody: source.markdownBody,
    warnings: [...warnings, ...resolvedComponents.warnings],
  };
}
```

- [ ] **Step 8: Verify parser, resolver, and normalizer**

Run:

```powershell
npm test -- src/data/parseTheme.test.ts src/theme/resolveReferences.test.ts src/theme/normalizeTheme.test.ts
npm run typecheck
```

Expected: both commands exit with code 0.

- [ ] **Step 9: Commit parsing and normalization**

Run:

```powershell
git add src/data/parseTheme.ts src/data/parseTheme.test.ts src/theme/resolveReferences.ts src/theme/resolveReferences.test.ts src/theme/normalizeTheme.ts src/theme/normalizeTheme.test.ts
git commit -m "feat: parse and normalize theme markdown"
```

Expected: commit succeeds.

## Task 5: Theme Loader and CSS Variables

**Files:**
- Create: `src/data/themeLoader.ts`
- Create: `src/data/themeLoader.test.ts`
- Create: `src/theme/cssVars.ts`
- Create: `src/theme/cssVars.test.ts`

- [ ] **Step 1: Write failing loader tests**

Create `src/data/themeLoader.test.ts`:

```ts
import { loadThemesFromModules } from './themeLoader';

describe('loadThemesFromModules', () => {
  it('loads theme and palette markdown modules while ignoring css exports', () => {
    const themes = loadThemesFromModules(
      {
        '../../themes/linear.md': '---\nname: Linear\ncolors:\n  primary: "#5E6AD2"\n---\n## Notes',
        '../../themes/tailwind.css': ':root {}',
      },
      {
        '../../palettes/soft.md': '---\nname: Soft\ncolors:\n  - name: Blue\n    hex: "#123456"\n    role: primary\n---\n## Mood',
      },
    );

    expect(themes.map((theme) => theme.name)).toEqual(['Linear', 'Soft']);
    expect(themes[0].kind).toBe('theme');
    expect(themes[1].kind).toBe('palette-derived');
  });
});
```

Run:

```powershell
npm test -- src/data/themeLoader.test.ts
```

Expected: FAIL because `themeLoader.ts` does not exist.

- [ ] **Step 2: Implement loader**

Create `src/data/themeLoader.ts`:

```ts
import type { NormalizedTheme } from '../types/theme';
import { parseMarkdownSource } from './parseTheme';
import { normalizeTheme } from '../theme/normalizeTheme';

type RawModules = Record<string, string>;

function markdownEntries(modules: RawModules): Array<[string, string]> {
  return Object.entries(modules)
    .filter(([filePath]) => filePath.endsWith('.md') || filePath.endsWith('.markdown'))
    .sort(([a], [b]) => a.localeCompare(b));
}

export function loadThemesFromModules(themeModules: RawModules, paletteModules: RawModules): NormalizedTheme[] {
  const themeSources = markdownEntries(themeModules).map(([filePath, raw]) =>
    normalizeTheme(parseMarkdownSource(filePath, 'theme', raw)),
  );
  const paletteSources = markdownEntries(paletteModules).map(([filePath, raw]) =>
    normalizeTheme(parseMarkdownSource(filePath, 'palette', raw)),
  );
  return [...themeSources, ...paletteSources];
}

const themeModules = import.meta.glob('../../themes/*', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as RawModules;

const paletteModules = import.meta.glob('../../palettes/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as RawModules;

export const themes = loadThemesFromModules(themeModules, paletteModules);
```

- [ ] **Step 3: Write failing CSS variable tests**

Create `src/theme/cssVars.test.ts`:

```ts
import type { NormalizedTheme } from '../types/theme';
import { themeToCssVars } from './cssVars';

const theme: NormalizedTheme = {
  id: 'demo',
  kind: 'theme',
  filePath: 'themes/demo.md',
  name: 'Demo',
  tags: [],
  colors: { primary: '#123456', 'on-primary': '#ffffff', background: '#ffffff' },
  gradients: [],
  typography: {
    'body-md': { fontFamily: 'Inter', fontSize: '16px', fontWeight: '400', lineHeight: '24px' },
  },
  rounded: { md: '0.75rem' },
  spacing: { unit: '8px' },
  components: {},
  markdownBody: '',
  warnings: [],
};

describe('themeToCssVars', () => {
  it('converts theme tokens into CSS custom properties', () => {
    expect(themeToCssVars(theme)).toEqual(
      expect.objectContaining({
        '--tg-color-primary': '#123456',
        '--tg-text-body-md-size': '16px',
        '--tg-radius-md': '0.75rem',
        '--tg-spacing-unit': '8px',
      }),
    );
  });
});
```

Run:

```powershell
npm test -- src/theme/cssVars.test.ts
```

Expected: FAIL because `cssVars.ts` does not exist.

- [ ] **Step 4: Implement CSS variable adapter**

Create `src/theme/cssVars.ts`:

```ts
import type { CSSProperties } from 'react';
import type { NormalizedTheme } from '../types/theme';

export type ThemeCssVars = CSSProperties & Record<`--tg-${string}`, string>;

export function themeToCssVars(theme: NormalizedTheme): ThemeCssVars {
  const vars: Record<string, string> = {};

  for (const [name, value] of Object.entries(theme.colors)) {
    vars[`--tg-color-${name}`] = value;
  }

  for (const [name, token] of Object.entries(theme.typography)) {
    vars[`--tg-text-${name}-family`] = token.fontFamily;
    vars[`--tg-text-${name}-size`] = token.fontSize;
    vars[`--tg-text-${name}-weight`] = token.fontWeight;
    vars[`--tg-text-${name}-line`] = token.lineHeight;
    vars[`--tg-text-${name}-tracking`] = token.letterSpacing ?? '0';
  }

  for (const [name, value] of Object.entries(theme.rounded)) {
    vars[`--tg-radius-${name}`] = value;
  }

  for (const [name, value] of Object.entries(theme.spacing)) {
    vars[`--tg-spacing-${name}`] = value;
  }

  return vars as ThemeCssVars;
}
```

- [ ] **Step 5: Verify loader and CSS vars**

Run:

```powershell
npm test -- src/data/themeLoader.test.ts src/theme/cssVars.test.ts
npm run typecheck
```

Expected: both commands exit with code 0.

- [ ] **Step 6: Commit loader and CSS vars**

Run:

```powershell
git add src/data/themeLoader.ts src/data/themeLoader.test.ts src/theme/cssVars.ts src/theme/cssVars.test.ts
git commit -m "feat: load themes and generate css variables"
```

Expected: commit succeeds.

## Task 6: Workbench Shell

**Files:**
- Modify: `src/App.tsx`
- Modify: `src/App.test.tsx`
- Create: `src/components/workbench/SearchAndFilters.tsx`
- Create: `src/components/workbench/ThemeLibrary.tsx`
- Create: `src/components/workbench/PreviewStage.tsx`
- Create: `src/components/workbench/ThemeInspector.tsx`

- [ ] **Step 1: Write failing workbench interaction test**

Replace `src/App.test.tsx` with:

```tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('App', () => {
  it('renders library, stage, and inspector regions', () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: 'ThemeGallery' })).toBeInTheDocument();
    expect(screen.getByRole('region', { name: 'Theme library' })).toBeInTheDocument();
    expect(screen.getByRole('region', { name: 'Preview stage' })).toBeInTheDocument();
    expect(screen.getByRole('region', { name: 'Theme inspector' })).toBeInTheDocument();
  });

  it('filters themes by query', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.type(screen.getByLabelText('Search themes'), 'linear');
    expect(screen.getByRole('button', { name: /Linear/ })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /Apple/ })).not.toBeInTheDocument();
  });
});
```

Run:

```powershell
npm test -- src/App.test.tsx
```

Expected: FAIL because the workbench regions and filter do not exist.

- [ ] **Step 2: Create search and filter component**

Create `src/components/workbench/SearchAndFilters.tsx`:

```tsx
import type { ThemeKind } from '../../types/theme';

export type FilterKind = 'all' | ThemeKind;

interface SearchAndFiltersProps {
  query: string;
  filterKind: FilterKind;
  onQueryChange: (query: string) => void;
  onFilterKindChange: (kind: FilterKind) => void;
}

export function SearchAndFilters({
  query,
  filterKind,
  onQueryChange,
  onFilterKindChange,
}: SearchAndFiltersProps) {
  return (
    <div className="search-filters">
      <label className="field-label" htmlFor="theme-search">
        Search themes
      </label>
      <input
        id="theme-search"
        className="search-input"
        value={query}
        onChange={(event) => onQueryChange(event.target.value)}
        placeholder="Search name, tag, notes..."
      />
      <div className="segmented-control" aria-label="Theme type">
        {(['all', 'theme', 'palette-derived'] as const).map((kind) => (
          <button
            className={filterKind === kind ? 'segment is-active' : 'segment'}
            key={kind}
            type="button"
            onClick={() => onFilterKindChange(kind)}
          >
            {kind === 'all' ? 'All' : kind === 'theme' ? 'Themes' : 'Palettes'}
          </button>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Create theme library**

Create `src/components/workbench/ThemeLibrary.tsx`:

```tsx
import type { NormalizedTheme } from '../../types/theme';
import type { FilterKind } from './SearchAndFilters';
import { SearchAndFilters } from './SearchAndFilters';

interface ThemeLibraryProps {
  themes: NormalizedTheme[];
  selectedThemeId: string;
  query: string;
  filterKind: FilterKind;
  onQueryChange: (query: string) => void;
  onFilterKindChange: (kind: FilterKind) => void;
  onSelectTheme: (themeId: string) => void;
}

function matchesTheme(theme: NormalizedTheme, query: string): boolean {
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) return true;
  const haystack = [theme.name, theme.filePath, theme.mood, theme.source, theme.markdownBody, ...theme.tags]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();
  return haystack.includes(normalizedQuery);
}

export function filterThemes(themes: NormalizedTheme[], query: string, filterKind: FilterKind): NormalizedTheme[] {
  return themes.filter((theme) => {
    const kindMatches = filterKind === 'all' || theme.kind === filterKind;
    return kindMatches && matchesTheme(theme, query);
  });
}

export function ThemeLibrary(props: ThemeLibraryProps) {
  const filteredThemes = filterThemes(props.themes, props.query, props.filterKind);

  return (
    <aside className="library-panel" role="region" aria-label="Theme library">
      <div className="panel-heading">
        <h1>ThemeGallery</h1>
        <p>{props.themes.length} local sources</p>
      </div>
      <SearchAndFilters
        query={props.query}
        filterKind={props.filterKind}
        onQueryChange={props.onQueryChange}
        onFilterKindChange={props.onFilterKindChange}
      />
      <div className="theme-list">
        {filteredThemes.map((theme) => (
          <button
            key={theme.id}
            className={theme.id === props.selectedThemeId ? 'theme-card is-selected' : 'theme-card'}
            type="button"
            onClick={() => props.onSelectTheme(theme.id)}
          >
            <span className="theme-card__name">{theme.name}</span>
            <span className="theme-card__meta">{theme.kind === 'theme' ? 'Theme' : 'Palette'}</span>
            <span className="swatch-row" aria-hidden="true">
              {Object.entries(theme.colors)
                .filter(([key]) => ['background', 'surface', 'primary', 'secondary', 'tertiary'].includes(key))
                .slice(0, 5)
                .map(([key, color]) => (
                  <span className="swatch-dot" key={key} style={{ backgroundColor: color }} />
                ))}
            </span>
          </button>
        ))}
      </div>
    </aside>
  );
}
```

- [ ] **Step 4: Create preview stage placeholder and inspector**

Create `src/components/workbench/PreviewStage.tsx`:

```tsx
import type { NormalizedTheme } from '../../types/theme';
import { themeToCssVars } from '../../theme/cssVars';

interface PreviewStageProps {
  theme: NormalizedTheme;
}

export function PreviewStage({ theme }: PreviewStageProps) {
  return (
    <section className="stage-panel" aria-label="Preview stage" style={themeToCssVars(theme)}>
      <div className="stage-toolbar">
        <p className="stage-kicker">Current theme</p>
        <h2>{theme.name}</h2>
      </div>
      <div className="preview-placeholder">
        <p>Preview scenes are added in the next task.</p>
      </div>
    </section>
  );
}
```

Create `src/components/workbench/ThemeInspector.tsx`:

```tsx
import type { NormalizedTheme } from '../../types/theme';

interface ThemeInspectorProps {
  theme: NormalizedTheme;
}

export function ThemeInspector({ theme }: ThemeInspectorProps) {
  return (
    <aside className="inspector-panel" role="region" aria-label="Theme inspector">
      <div className="panel-heading">
        <h2>Inspector</h2>
        <p>{theme.filePath}</p>
      </div>
      <section className="inspector-section">
        <h3>Colors</h3>
        <div className="color-grid">
          {Object.entries(theme.colors).slice(0, 12).map(([name, value]) => (
            <div className="color-token" key={name}>
              <span className="color-chip" style={{ backgroundColor: value }} />
              <span>{name}</span>
              <code>{value}</code>
            </div>
          ))}
        </div>
      </section>
      {theme.warnings.length > 0 && (
        <section className="inspector-section warning-list">
          <h3>Warnings</h3>
          {theme.warnings.map((warning) => (
            <p key={warning}>{warning}</p>
          ))}
        </section>
      )}
    </aside>
  );
}
```

- [ ] **Step 5: Compose workbench in App**

Replace `src/App.tsx` with:

```tsx
import { useMemo, useState } from 'react';
import { themes } from './data/themeLoader';
import { ThemeInspector } from './components/workbench/ThemeInspector';
import { ThemeLibrary } from './components/workbench/ThemeLibrary';
import { PreviewStage } from './components/workbench/PreviewStage';
import type { FilterKind } from './components/workbench/SearchAndFilters';
import './styles.css';

export default function App() {
  const [selectedThemeId, setSelectedThemeId] = useState(themes[0]?.id ?? '');
  const [query, setQuery] = useState('');
  const [filterKind, setFilterKind] = useState<FilterKind>('all');

  const selectedTheme = useMemo(
    () => themes.find((theme) => theme.id === selectedThemeId) ?? themes[0],
    [selectedThemeId],
  );

  if (!selectedTheme) {
    return (
      <main className="empty-state">
        <h1>ThemeGallery</h1>
        <p>No Markdown themes found in themes/ or palettes/.</p>
      </main>
    );
  }

  return (
    <main className="workbench-shell">
      <ThemeLibrary
        themes={themes}
        selectedThemeId={selectedTheme.id}
        query={query}
        filterKind={filterKind}
        onQueryChange={setQuery}
        onFilterKindChange={setFilterKind}
        onSelectTheme={setSelectedThemeId}
      />
      <PreviewStage theme={selectedTheme} />
      <ThemeInspector theme={selectedTheme} />
    </main>
  );
}
```

- [ ] **Step 6: Add shell CSS**

Append to `src/styles.css`:

```css
.workbench-shell {
  display: grid;
  grid-template-columns: minmax(260px, 300px) minmax(420px, 1fr) minmax(280px, 340px);
  min-height: 100vh;
  background: #eef2f4;
}

.library-panel,
.inspector-panel,
.stage-panel {
  min-width: 0;
  border-right: 1px solid #d8e0e5;
  background: #ffffff;
}

.stage-panel {
  overflow: auto;
  padding: 24px;
  background: var(--tg-color-background, #f7f8fa);
  color: var(--tg-color-on-background, #172026);
}

.library-panel,
.inspector-panel {
  overflow: auto;
  padding: 18px;
}

.panel-heading h1,
.panel-heading h2,
.stage-toolbar h2 {
  margin: 0;
  font-size: 24px;
  line-height: 32px;
}

.panel-heading p,
.stage-kicker {
  margin: 4px 0 0;
  color: #667085;
  font-size: 13px;
}

.search-filters {
  display: grid;
  gap: 10px;
  margin: 18px 0;
}

.field-label {
  color: #475467;
  font-size: 12px;
  font-weight: 700;
}

.search-input {
  width: 100%;
  height: 40px;
  border: 1px solid #d0d7de;
  border-radius: 10px;
  padding: 0 12px;
}

.segmented-control {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 4px;
  padding: 4px;
  border-radius: 12px;
  background: #f1f4f6;
}

.segment,
.theme-card {
  border: 0;
  cursor: pointer;
}

.segment {
  min-height: 32px;
  border-radius: 8px;
  background: transparent;
  color: #667085;
  font-size: 12px;
  font-weight: 700;
}

.segment.is-active {
  background: #ffffff;
  color: #172026;
  box-shadow: 0 1px 2px rgb(16 24 40 / 0.12);
}

.theme-list {
  display: grid;
  gap: 10px;
}

.theme-card {
  display: grid;
  gap: 8px;
  width: 100%;
  border: 1px solid #d8e0e5;
  border-radius: 12px;
  padding: 12px;
  background: #ffffff;
  color: #172026;
  text-align: left;
}

.theme-card.is-selected {
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgb(37 99 235 / 0.14);
}

.theme-card__name {
  font-weight: 750;
}

.theme-card__meta {
  color: #667085;
  font-size: 12px;
}

.swatch-row {
  display: flex;
  gap: 4px;
}

.swatch-dot,
.color-chip {
  display: inline-block;
  width: 18px;
  height: 18px;
  border: 1px solid rgb(0 0 0 / 0.12);
  border-radius: 50%;
}

.preview-placeholder {
  display: grid;
  min-height: 420px;
  place-items: center;
  margin-top: 16px;
  border: 1px dashed var(--tg-color-outline, #d0d7de);
  border-radius: var(--tg-radius-lg, 1rem);
  background: var(--tg-color-surface, #ffffff);
}

.inspector-section {
  margin-top: 22px;
}

.inspector-section h3 {
  margin: 0 0 10px;
  font-size: 14px;
}

.color-grid {
  display: grid;
  gap: 10px;
}

.color-token {
  display: grid;
  grid-template-columns: 20px 1fr auto;
  gap: 8px;
  align-items: center;
  font-size: 12px;
}

.color-token code {
  color: #667085;
}

.warning-list {
  border-radius: 12px;
  padding: 12px;
  background: #fff7ed;
  color: #9a3412;
}

@media (max-width: 980px) {
  .workbench-shell {
    grid-template-columns: 1fr;
  }

  .library-panel,
  .inspector-panel,
  .stage-panel {
    border-right: 0;
    border-bottom: 1px solid #d8e0e5;
  }
}
```

- [ ] **Step 7: Verify workbench shell**

Run:

```powershell
npm test -- src/App.test.tsx
npm run typecheck
```

Expected: both commands exit with code 0.

- [ ] **Step 8: Commit workbench shell**

Run:

```powershell
git add src/App.tsx src/App.test.tsx src/styles.css src/components/workbench
git commit -m "feat: add theme workbench shell"
```

Expected: commit succeeds.

## Task 7: Preview Scenes and Tab Switching

**Files:**
- Modify: `src/components/workbench/PreviewStage.tsx`
- Create: `src/components/previews/DashboardPreview.tsx`
- Create: `src/components/previews/LandingPreview.tsx`
- Create: `src/components/previews/MobilePreview.tsx`
- Create: `src/components/previews/ComponentsPreview.tsx`
- Create: `src/components/workbench/PreviewStage.test.tsx`
- Modify: `src/styles.css`

- [ ] **Step 1: Write failing preview stage test**

Create `src/components/workbench/PreviewStage.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { NormalizedTheme } from '../../types/theme';
import { baseFoundation } from '../../theme/baseFoundation';
import { PreviewStage } from './PreviewStage';

const theme: NormalizedTheme = {
  id: 'demo',
  kind: 'theme',
  filePath: 'themes/demo.md',
  name: 'Demo',
  tags: [],
  ...baseFoundation,
  markdownBody: '',
  warnings: [],
};

describe('PreviewStage', () => {
  it('switches between preview tabs', async () => {
    const user = userEvent.setup();
    render(<PreviewStage theme={theme} />);

    expect(screen.getByRole('heading', { name: 'Revenue overview' })).toBeInTheDocument();
    await user.click(screen.getByRole('tab', { name: 'Landing' }));
    expect(screen.getByRole('heading', { name: 'Design faster with live themes' })).toBeInTheDocument();
    await user.click(screen.getByRole('tab', { name: 'Mobile' }));
    expect(screen.getByRole('heading', { name: 'Today' })).toBeInTheDocument();
    await user.click(screen.getByRole('tab', { name: 'Components' }));
    expect(screen.getByRole('heading', { name: 'Component board' })).toBeInTheDocument();
  });
});
```

Run:

```powershell
npm test -- src/components/workbench/PreviewStage.test.tsx
```

Expected: FAIL because preview tabs do not exist.

- [ ] **Step 2: Create Dashboard preview**

Create `src/components/previews/DashboardPreview.tsx`:

```tsx
export function DashboardPreview() {
  return (
    <div className="scene scene-dashboard">
      <aside className="scene-sidebar">
        <strong>Atlas</strong>
        <span>Overview</span>
        <span>Projects</span>
        <span>Reports</span>
      </aside>
      <section className="scene-main">
        <div className="scene-header">
          <div>
            <p>Workspace</p>
            <h2>Revenue overview</h2>
          </div>
          <button className="preview-button">Export</button>
        </div>
        <div className="metric-grid">
          {['MRR', 'Activation', 'Retention'].map((label, index) => (
            <article className="preview-card" key={label}>
              <span>{label}</span>
              <strong>{['$84.2k', '68%', '92%'][index]}</strong>
            </article>
          ))}
        </div>
        <div className="preview-card chart-card">
          <span className="chart-bar chart-bar-a" />
          <span className="chart-bar chart-bar-b" />
          <span className="chart-bar chart-bar-c" />
          <span className="chart-bar chart-bar-d" />
        </div>
        <div className="preview-table">
          {['Theme import', 'Palette review', 'Mobile QA'].map((task, index) => (
            <div className="preview-row" key={task}>
              <span>{task}</span>
              <span>{['Design', 'Research', 'Ready'][index]}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
```

- [ ] **Step 3: Create Landing preview**

Create `src/components/previews/LandingPreview.tsx`:

```tsx
export function LandingPreview() {
  return (
    <div className="scene scene-landing">
      <nav className="landing-nav">
        <strong>Northstar</strong>
        <span>Product</span>
        <span>Customers</span>
        <button className="preview-button">Start</button>
      </nav>
      <section className="landing-hero">
        <div>
          <h2>Design faster with live themes</h2>
          <p>Preview product surfaces before committing a visual direction.</p>
          <button className="preview-button">View demo</button>
        </div>
        <div className="product-panel">
          <div className="product-panel__bar" />
          <div className="product-panel__body">
            <span />
            <span />
            <span />
          </div>
        </div>
      </section>
    </div>
  );
}
```

- [ ] **Step 4: Create Mobile preview**

Create `src/components/previews/MobilePreview.tsx`:

```tsx
export function MobilePreview() {
  return (
    <div className="scene scene-mobile">
      <div className="phone-frame">
        <header className="phone-header">
          <div>
            <p>Tuesday</p>
            <h2>Today</h2>
          </div>
          <span className="avatar-dot" />
        </header>
        <article className="phone-card">
          <span>Focus session</span>
          <strong>42 min</strong>
          <button className="preview-button">Resume</button>
        </article>
        <article className="phone-list-item">
          <span>Palette review</span>
          <strong>3 notes</strong>
        </article>
        <nav className="phone-tabs">
          <span>Home</span>
          <span>Explore</span>
          <span>Profile</span>
        </nav>
      </div>
    </div>
  );
}
```

- [ ] **Step 5: Create Components preview**

Create `src/components/previews/ComponentsPreview.tsx`:

```tsx
export function ComponentsPreview() {
  return (
    <div className="scene scene-components">
      <h2>Component board</h2>
      <div className="component-grid">
        <section className="preview-card">
          <h3>Buttons</h3>
          <button className="preview-button">Primary</button>
          <button className="preview-button ghost">Ghost</button>
        </section>
        <section className="preview-card">
          <h3>Inputs</h3>
          <input className="preview-input" value="Theme search" readOnly />
        </section>
        <section className="preview-card">
          <h3>Badges</h3>
          <span className="preview-badge">Palette</span>
          <span className="preview-badge secondary">Ready</span>
        </section>
        <section className="preview-card">
          <h3>Modal</h3>
          <div className="mini-modal">
            <strong>Save theme?</strong>
            <p>Warnings remain visible before export.</p>
          </div>
        </section>
      </div>
    </div>
  );
}
```

- [ ] **Step 6: Wire preview tabs**

Replace `src/components/workbench/PreviewStage.tsx` with:

```tsx
import { useState } from 'react';
import type { NormalizedTheme } from '../../types/theme';
import { themeToCssVars } from '../../theme/cssVars';
import { ComponentsPreview } from '../previews/ComponentsPreview';
import { DashboardPreview } from '../previews/DashboardPreview';
import { LandingPreview } from '../previews/LandingPreview';
import { MobilePreview } from '../previews/MobilePreview';

const tabs = ['Dashboard', 'Landing', 'Mobile', 'Components'] as const;
type PreviewTab = (typeof tabs)[number];

interface PreviewStageProps {
  theme: NormalizedTheme;
}

export function PreviewStage({ theme }: PreviewStageProps) {
  const [activeTab, setActiveTab] = useState<PreviewTab>('Dashboard');

  return (
    <section className="stage-panel" aria-label="Preview stage" style={themeToCssVars(theme)}>
      <div className="stage-toolbar">
        <div>
          <p className="stage-kicker">Current theme</p>
          <h2>{theme.name}</h2>
        </div>
        <div className="tab-list" role="tablist" aria-label="Preview scenes">
          {tabs.map((tab) => (
            <button
              aria-selected={activeTab === tab}
              className={activeTab === tab ? 'preview-tab is-active' : 'preview-tab'}
              key={tab}
              onClick={() => setActiveTab(tab)}
              role="tab"
              type="button"
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
      <div className="stage-canvas">
        {activeTab === 'Dashboard' && <DashboardPreview />}
        {activeTab === 'Landing' && <LandingPreview />}
        {activeTab === 'Mobile' && <MobilePreview />}
        {activeTab === 'Components' && <ComponentsPreview />}
      </div>
    </section>
  );
}
```

- [ ] **Step 7: Add preview CSS**

Append scene styles to `src/styles.css`. Use these selectors exactly because tests and components rely on them:

```css
.stage-toolbar {
  display: flex;
  gap: 16px;
  align-items: flex-start;
  justify-content: space-between;
}

.tab-list {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  padding: 4px;
  border: 1px solid var(--tg-color-outline-variant, #e6ebef);
  border-radius: var(--tg-radius-lg, 1rem);
  background: var(--tg-color-surface-container, #ffffff);
}

.preview-tab {
  min-height: 34px;
  border: 0;
  border-radius: var(--tg-radius-md, 0.75rem);
  padding: 0 12px;
  background: transparent;
  color: var(--tg-color-on-surface-variant, #667085);
  cursor: pointer;
  font-size: 13px;
  font-weight: 700;
}

.preview-tab.is-active {
  background: var(--tg-color-primary, #2563eb);
  color: var(--tg-color-on-primary, #ffffff);
}

.stage-canvas {
  margin-top: 18px;
  border-radius: var(--tg-radius-xl, 1.25rem);
  background: var(--tg-color-surface, #ffffff);
  color: var(--tg-color-on-surface, #172026);
  overflow: hidden;
  box-shadow: 0 24px 80px rgb(15 23 42 / 0.12);
}

.scene {
  min-height: 560px;
  padding: 24px;
}

.scene-dashboard {
  display: grid;
  grid-template-columns: 180px 1fr;
  gap: 18px;
}

.scene-sidebar,
.preview-card,
.product-panel,
.phone-card,
.phone-list-item,
.mini-modal {
  border: 1px solid var(--tg-color-outline-variant, #e6ebef);
  border-radius: var(--tg-radius-lg, 1rem);
  background: var(--tg-color-surface-container, #ffffff);
}

.scene-sidebar {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 18px;
  color: var(--tg-color-on-surface-variant, #667085);
}

.scene-sidebar strong {
  color: var(--tg-color-on-surface, #172026);
}

.scene-main {
  display: grid;
  gap: 16px;
}

.scene-header,
.landing-nav,
.phone-header,
.preview-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.scene-header p,
.landing-hero p,
.phone-header p,
.preview-card span {
  margin: 0;
  color: var(--tg-color-on-surface-variant, #667085);
}

.scene-header h2,
.landing-hero h2,
.phone-header h2,
.scene-components h2 {
  margin: 0;
  font-family: var(--tg-text-headline-lg-family, Inter);
  font-size: var(--tg-text-headline-lg-size, 32px);
  font-weight: var(--tg-text-headline-lg-weight, 650);
  line-height: var(--tg-text-headline-lg-line, 40px);
  letter-spacing: var(--tg-text-headline-lg-tracking, 0);
}

.preview-button {
  min-height: 40px;
  border: 0;
  border-radius: var(--tg-radius-md, 0.75rem);
  padding: 0 16px;
  background: var(--tg-color-primary, #2563eb);
  color: var(--tg-color-on-primary, #ffffff);
  cursor: pointer;
  font-size: var(--tg-text-label-sm-size, 12px);
  font-weight: var(--tg-text-label-sm-weight, 700);
}

.preview-button.ghost {
  border: 1px solid var(--tg-color-outline, #d0d7de);
  background: transparent;
  color: var(--tg-color-on-surface, #172026);
}

.metric-grid,
.component-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
}

.preview-card {
  padding: 16px;
}

.preview-card strong {
  display: block;
  margin-top: 8px;
  font-size: 24px;
}

.chart-card {
  display: flex;
  align-items: end;
  gap: 10px;
  min-height: 160px;
}

.chart-bar {
  flex: 1;
  border-radius: var(--tg-radius-md, 0.75rem) var(--tg-radius-md, 0.75rem) 0 0;
  background: var(--tg-color-primary, #2563eb);
}

.chart-bar-a { height: 42%; }
.chart-bar-b { height: 72%; }
.chart-bar-c { height: 56%; }
.chart-bar-d { height: 86%; }

.preview-table {
  display: grid;
  border: 1px solid var(--tg-color-outline-variant, #e6ebef);
  border-radius: var(--tg-radius-lg, 1rem);
  overflow: hidden;
}

.preview-row {
  min-height: 48px;
  padding: 0 16px;
  border-bottom: 1px solid var(--tg-color-outline-variant, #e6ebef);
}

.preview-row:last-child {
  border-bottom: 0;
}

.scene-landing {
  display: grid;
  gap: 34px;
}

.landing-nav {
  min-height: 52px;
}

.landing-hero {
  display: grid;
  grid-template-columns: minmax(0, 0.9fr) minmax(280px, 1.1fr);
  gap: 28px;
  align-items: center;
}

.landing-hero h2 {
  max-width: 520px;
  font-size: var(--tg-text-display-lg-size, 64px);
  line-height: var(--tg-text-display-lg-line, 72px);
}

.product-panel {
  min-height: 300px;
  padding: 18px;
}

.product-panel__bar {
  height: 48px;
  border-radius: var(--tg-radius-md, 0.75rem);
  background: var(--tg-color-primary-container, #dbeafe);
}

.product-panel__body {
  display: grid;
  gap: 12px;
  margin-top: 18px;
}

.product-panel__body span {
  display: block;
  height: 54px;
  border-radius: var(--tg-radius-md, 0.75rem);
  background: var(--tg-color-surface-container-high, #f0f3f5);
}

.scene-mobile {
  display: grid;
  place-items: center;
}

.phone-frame {
  display: grid;
  gap: 14px;
  width: min(320px, 100%);
  min-height: 520px;
  border: 10px solid var(--tg-color-inverse-surface, #172026);
  border-radius: 36px;
  padding: 18px;
  background: var(--tg-color-background, #f7f8fa);
}

.avatar-dot {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: var(--tg-color-primary, #2563eb);
}

.phone-card,
.phone-list-item {
  padding: 16px;
}

.phone-tabs {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-self: end;
  color: var(--tg-color-on-surface-variant, #667085);
  font-size: 12px;
  font-weight: 700;
  text-align: center;
}

.scene-components {
  display: grid;
  gap: 18px;
}

.component-grid {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.preview-input {
  width: 100%;
  height: 40px;
  border: 1px solid var(--tg-color-outline, #d0d7de);
  border-radius: var(--tg-radius-md, 0.75rem);
  padding: 0 12px;
  background: var(--tg-color-surface-container, #ffffff);
  color: var(--tg-color-on-surface, #172026);
}

.preview-badge {
  display: inline-flex;
  align-items: center;
  min-height: 28px;
  border-radius: var(--tg-radius-full, 9999px);
  padding: 0 10px;
  background: var(--tg-color-primary-container, #dbeafe);
  color: var(--tg-color-on-primary-container, #1e3a8a);
  font-size: 12px;
  font-weight: 700;
}

.preview-badge.secondary {
  background: var(--tg-color-secondary-container, #ccfbf1);
  color: var(--tg-color-on-secondary-container, #134e4a);
}

.mini-modal {
  padding: 14px;
}

@media (max-width: 760px) {
  .stage-toolbar,
  .landing-hero,
  .scene-dashboard {
    grid-template-columns: 1fr;
  }

  .stage-toolbar {
    display: grid;
  }

  .metric-grid,
  .component-grid {
    grid-template-columns: 1fr;
  }

  .landing-hero h2 {
    font-size: 42px;
    line-height: 48px;
  }
}
```

- [ ] **Step 8: Verify preview scenes**

Run:

```powershell
npm test -- src/components/workbench/PreviewStage.test.tsx src/App.test.tsx
npm run typecheck
```

Expected: both commands exit with code 0.

- [ ] **Step 9: Commit preview scenes**

Run:

```powershell
git add src/components/previews src/components/workbench/PreviewStage.tsx src/components/workbench/PreviewStage.test.tsx src/styles.css
git commit -m "feat: add theme preview scenes"
```

Expected: commit succeeds.

## Task 8: Inspector Markdown and Token Details

**Files:**
- Modify: `src/components/workbench/ThemeInspector.tsx`
- Create: `src/components/workbench/ThemeInspector.test.tsx`
- Modify: `src/styles.css`

- [ ] **Step 1: Write failing inspector test**

Create `src/components/workbench/ThemeInspector.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react';
import type { NormalizedTheme } from '../../types/theme';
import { baseFoundation } from '../../theme/baseFoundation';
import { ThemeInspector } from './ThemeInspector';

const theme: NormalizedTheme = {
  id: 'soft-mauve',
  kind: 'palette-derived',
  filePath: 'palettes/soft-mauve.md',
  name: 'Soft Mauve',
  tags: ['soft', 'mauve'],
  mood: '柔和雅致',
  source: '小红书',
  ...baseFoundation,
  markdownBody: '## 感受\n柔和雅致，像清晨薄雾。',
  warnings: ['Missing palette role "surface"; derived from available colors.'],
};

describe('ThemeInspector', () => {
  it('shows metadata, warnings, typography, spacing, and markdown notes', () => {
    render(<ThemeInspector theme={theme} />);
    expect(screen.getByText('Soft Mauve')).toBeInTheDocument();
    expect(screen.getByText('小红书')).toBeInTheDocument();
    expect(screen.getByText(/Missing palette role/)).toBeInTheDocument();
    expect(screen.getByText('body-md')).toBeInTheDocument();
    expect(screen.getByText('container-padding')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '感受' })).toBeInTheDocument();
  });
});
```

Run:

```powershell
npm test -- src/components/workbench/ThemeInspector.test.tsx
```

Expected: FAIL because the current inspector does not render markdown notes or typography details.

- [ ] **Step 2: Replace inspector with full details**

Replace `src/components/workbench/ThemeInspector.tsx` with:

```tsx
import ReactMarkdown from 'react-markdown';
import type { NormalizedTheme } from '../../types/theme';

interface ThemeInspectorProps {
  theme: NormalizedTheme;
}

export function ThemeInspector({ theme }: ThemeInspectorProps) {
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

      {theme.warnings.length > 0 && (
        <section className="inspector-section warning-list">
          <h3>Warnings</h3>
          {theme.warnings.map((warning) => (
            <p key={warning}>{warning}</p>
          ))}
        </section>
      )}

      <section className="inspector-section">
        <h3>Colors</h3>
        <div className="color-grid">
          {Object.entries(theme.colors).map(([name, value]) => (
            <div className="color-token" key={name}>
              <span className="color-chip" style={{ backgroundColor: value }} />
              <span>{name}</span>
              <code>{value}</code>
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
              {token.fontFamily} · {token.fontSize} · {token.fontWeight}
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
```

- [ ] **Step 3: Add inspector CSS**

Append to `src/styles.css`:

```css
.metadata-list p {
  margin: 4px 0;
  color: #667085;
  font-size: 13px;
}

.gradient-list,
.token-list {
  display: grid;
  gap: 10px;
}

.gradient-token {
  display: grid;
  gap: 6px;
}

.gradient-token span {
  display: block;
  height: 28px;
  border: 1px solid rgb(0 0 0 / 0.12);
  border-radius: 9999px;
}

.gradient-token code {
  color: #667085;
  font-size: 12px;
}

.token-row {
  display: grid;
  gap: 2px;
  border-bottom: 1px solid #edf1f4;
  padding-bottom: 8px;
  font-size: 12px;
}

.token-row strong {
  color: #172026;
}

.token-row span {
  color: #667085;
}

.markdown-notes {
  border-top: 1px solid #d8e0e5;
  padding-top: 18px;
}

.markdown-notes h2,
.markdown-notes h3 {
  margin: 16px 0 8px;
  font-size: 15px;
}

.markdown-notes p,
.markdown-notes li {
  color: #475467;
  font-size: 13px;
  line-height: 1.6;
}
```

- [ ] **Step 4: Verify inspector**

Run:

```powershell
npm test -- src/components/workbench/ThemeInspector.test.tsx src/App.test.tsx
npm run typecheck
```

Expected: both commands exit with code 0.

- [ ] **Step 5: Commit inspector**

Run:

```powershell
git add src/components/workbench/ThemeInspector.tsx src/components/workbench/ThemeInspector.test.tsx src/styles.css
git commit -m "feat: show theme inspector details"
```

Expected: commit succeeds.

## Task 9: Real Data Verification and Browser QA

**Files:**
- Modify: `src/App.test.tsx`
- Modify: `src/styles.css`

- [ ] **Step 1: Add real data expectations to App test**

Append this test to `src/App.test.tsx`:

```tsx
it('loads existing local markdown sources', () => {
  render(<App />);
  expect(screen.getByRole('button', { name: /Linear/ })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /Soft Mauve/ })).toBeInTheDocument();
});
```

Run:

```powershell
npm test -- src/App.test.tsx
```

Expected: PASS when the existing `themes/linear.md` and `palettes/soft-mauve.md` files are present in the workspace.

- [ ] **Step 2: Run full automated verification**

Run:

```powershell
npm test
npm run typecheck
npm run build
```

Expected: all commands exit with code 0.

- [ ] **Step 3: Start local dev server on a rare port**

Run:

```powershell
npm run dev
```

Expected: Vite serves the app at `http://127.0.0.1:47822/`. If that port is occupied, run `npm run dev -- --port 47824` and use the printed URL.

- [ ] **Step 4: Verify core browser workflow**

Open the dev server URL and verify these observations:

```text
1. Library contains entries from themes/*.md and palettes/*.md.
2. Clicking Linear changes the stage to a dark, purple-accented theme.
3. Clicking Apple changes the stage to a light, blue-accented theme.
4. Clicking Atmospheric Glass preserves readable text and glass-like surfaces.
5. Clicking Soft Mauve shows a palette-derived theme with Inspector warnings only for derived fallback fields.
6. Dashboard, Landing, Mobile, and Components tabs all switch without console errors.
7. Searching "linear" hides Apple and shows Linear.
```

- [ ] **Step 5: Verify responsive behavior**

In browser devtools, check widths `1440`, `1024`, and `390`.

Expected:

```text
1440: three columns are visible.
1024: columns remain usable without text overlap.
390: panels stack vertically, no horizontal scrollbar appears, tabs wrap cleanly.
```

If a horizontal scrollbar appears at `390`, edit `src/styles.css` so fixed-width grids use `minmax(0, 1fr)`, then run:

```powershell
npm test
npm run build
```

Expected: both commands exit with code 0 after the CSS correction.

- [ ] **Step 6: Commit final QA adjustments**

Run:

```powershell
git add src/App.test.tsx src/styles.css
git commit -m "test: verify real theme gallery data"
```

Expected: commit succeeds. If Step 5 required no CSS changes, commit only `src/App.test.tsx`.

## Final Verification

Run:

```powershell
git status --short
npm test
npm run typecheck
npm run build
```

Expected:

```text
git status --short shows no uncommitted files after Task 0 has tracked themes/ and palettes/.
npm test exits with code 0.
npm run typecheck exits with code 0.
npm run build exits with code 0.
```

Then start:

```powershell
npm run dev
```

Open `http://127.0.0.1:47822/` and do one final manual pass through Linear, Apple, Atmospheric Glass, and Soft Mauve.
