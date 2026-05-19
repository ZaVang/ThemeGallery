---
name: Notion
colors:
  surface: "#ffffff"
  surface-dim: "#f7f6f3"
  surface-bright: "#ffffff"
  surface-container-lowest: "#ffffff"
  surface-container-low: "#faf9f8"
  surface-container: "#ffffff"
  surface-container-high: "#f3f2ef"
  surface-container-highest: "#eceae5"
  on-surface: "#37352f"
  on-surface-variant: "#787774"
  inverse-surface: "#37352f"
  inverse-on-surface: "#f7f6f3"
  outline: "#e3e2e0"
  outline-variant: "#d3d2cf"
  surface-tint: "#2eaadc"
  primary: "#2eaadc"
  on-primary: "#ffffff"
  primary-container: "#e5f7fc"
  on-primary-container: "#006680"
  inverse-primary: "#2eaadc"
  secondary: "#eb5757"
  on-secondary: "#ffffff"
  secondary-container: "#fde8e8"
  on-secondary-secondary: "#8b1a1a"
  tertiary: "#f4a523"
  on-tertiary: "#ffffff"
  tertiary-container: "#fef4e0"
  on-tertiary: "#7a5200"
  quaternary: "#8b5cf6"
  on-quaternary: "#ffffff"
  quaternary-container: "#f3effe"
  on-quaternary: "#4a1a8b"
  background-dark: "#191919"
  on-background-dark: "#ffffff"
  surface-dark: "#252525"
  on-surface-dark: "#ffffff"
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 64px
    fontWeight: "700"
    lineHeight: 72px
    letterSpacing: -0.03em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: "600"
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 22px
    fontWeight: "500"
    lineHeight: 30px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: "400"
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: "400"
    lineHeight: 24px
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: "500"
    lineHeight: 16px
    letterSpacing: 0.02em
rounded:
  sm: 0.2rem
  DEFAULT: 0.375rem
  md: 0.5rem
  lg: 0.75rem
  xl: 1rem
  full: 9999px
spacing:
  unit: 8px
  container-padding: 32px
  card-gap: 16px
  section-margin: 48px
  hero-dark-padding: 120px
components:
  hero-dark:
    backgroundColor: "{colors.background-dark}"
    padding: "{spacing.hero-dark-padding}" 0
    textColor: "#ffffff"
  hero-light:
    backgroundColor: "{colors.surface}"
    padding: 80px 0
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.body-md}"
    fontWeight: "500"
    rounded: "{rounded.sm}"
    height: 40px
    padding: 0 20px
  button-ghost-dark:
    backgroundColor: "transparent"
    textColor: "#ffffff"
    typography: "{typography.body-md}"
    fontWeight: "500"
    rounded: "{rounded.sm}"
    border: 1px solid "rgba(255, 255, 255, 0.3)"
    height: 40px
    padding: 0 20px
  button-ghost-light:
    backgroundColor: "transparent"
    textColor: "{colors.on-surface}"
    typography: "{typography.body-md}"
    fontWeight: "500"
    rounded: "{rounded.sm}"
    border: 1px solid "{colors.outline}"
    height: 40px
    padding: 0 20px
  card-dark:
    backgroundColor: "{colors.surface-dark}"
    textColor: "#ffffff"
    rounded: "{rounded.md}"
    padding: 24px
  card-light:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.md}"
    padding: 24px
    border: 1px solid "{colors.outline-variant}"
  block-editor:
    backgroundColor: "#ffffff"
    textColor: "{colors.on-surface}"
    padding: 4px 0
  inline-task:
    backgroundColor: "transparent"
    rounded: 2px
    padding: 2px 4px
  feature-tab:
    backgroundColor: "transparent"
    textColor: "{colors.on-surface-variant}"
    typography: "{typography.body-md}"
    fontWeight: "500"
    rounded: "{rounded.sm}"
    padding: 12px 20px
  feature-tab-active:
    backgroundColor: "{colors.primary-container}"
    textColor: "{colors.on-primary-container}"
  icon-orange:
    color: "{colors.secondary}"
  icon-purple:
    color: "{colors.quaternary}"
  icon-teal:
    color: "{colors.primary}"
  icon-yellow:
    color: "{colors.tertiary}"
---

## Brand & Style

Notion occupies a unique position: it's simultaneously a **brand-first AI workspace** and a **content-first productivity tool**. The design must flip between modes — deep navy hero sections create emotional brand moments, while pure white workspace areas maximize content readability. This dual-mode design philosophy answers both "who is Notion?" and "what can I build here?"

## Colors

The palette uses a striking contrast rhythm: dark navy backgrounds (#191919) for brand hero sections create drama and AI-tech atmosphere, while pure white content areas maximize legibility for note-taking. Notion blue (#2eaadc) anchors brand moments. Functional colors (orange, purple, teal, yellow) appear as scattered accents that brighten the dark backgrounds without overwhelming.

## Typography

Typography is clean and systematic — Inter with clear hierarchy. The dark hero sections use large display type (64px) to create impact. Content areas return to comfortable reading sizes (16-18px body). The approach: **typography creates mood when needed, disappears when working**.

## Layout & Spacing

The layout rhythm alternates dramatically: dark hero sections with generous padding create brand immersion, then transition to bright content areas for practical utility. Tab-based feature cards organize complex capabilities without overwhelming. Pricing uses interactive checkbox patterns that let users "calculate" their plan. The approach: **emotional brand moments punctuated by functional clarity**.

## Elevation & Depth

Depth is minimal — Notion relies on color contrast (dark vs light sections) rather than shadows for elevation. Cards use subtle borders in light mode. The workspace itself has zero elevation — everything is flush, creating a canvas-like flatness that emphasizes content over chrome.

## Shapes

Border radius is modest (3-8px) — Notion values precision over playfulness. The workspace interface uses almost zero radius. Marketing pages allow slightly more rounding (8-12px) for approachability. The philosophy: **shape serves function; workspace is tool, not toy**.

## Components

The component system reflects the dual-mode nature. Hero sections use dark cards with bright accent icons. Feature tabs organize capabilities in expandable groups. The workspace components (blocks, pages, databases) prioritize content density over decoration. The philosophy: **components serve the mode, and the mode serves the moment**.

## Do's and Don'ts

- **Do** use dark hero sections to create brand emotional moments before transitioning to light utility
- **Do** implement interactive pricing elements (checkboxes) to increase engagement
- **Do** use tab-based feature cards for complex capability organization
- **Do** scatter functional accent colors on dark backgrounds for visual energy
- **Don't** mix dark and light sections within the same context — flip modes, don't blend
- **Don't** add heavy shadows — contrast creates hierarchy, not elevation
- **Don't** sacrifice content readability for decorative elements
