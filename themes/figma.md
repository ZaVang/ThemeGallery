---
name: Figma
colors:
  surface: "#ffffff"
  surface-dim: "#f5f5f5"
  surface-bright: "#ffffff"
  surface-container-lowest: "#ffffff"
  surface-container-low: "#fafafa"
  surface-container: "#ffffff"
  surface-container-high: "#f0f0f0"
  surface-container-highest: "#e8e8e8"
  on-surface: "#1a1a1a"
  on-surface-variant: "#6b6b6b"
  inverse-surface: "#1a1a1a"
  inverse-on-surface: "#ffffff"
  outline: "#e0e0e0"
  outline-variant: "#c8c8c8"
  surface-tint: "#F24E1E"
  primary: "#F24E1E"
  on-primary: "#ffffff"
  primary-container: "#ffebe5"
  on-primary-container: "#8b2500"
  inverse-primary: "#F24E1E"
  secondary: "#A259FF"
  on-secondary: "#ffffff"
  secondary-container: "#f3e5ff"
  on-secondary-container: "#5b1899"
  tertiary: "#FF7262"
  on-tertiary: "#ffffff"
  tertiary-container: "#ffe5e0"
  on-tertiary: "#8b3a2a"
  quaternary: "#1ABCFE"
  on-quaternary: "#ffffff"
  quaternary-container: "#e0f5ff"
  on-quaternary: "#005577"
  error: "#ff3b30"
  on-error: "#ffffff"
  error-container: "#ffe5e0"
  on-error-container: "#8b1a10"
  background: "#ffffff"
  on-background: "#1a1a1a"
  surface-variant: "#f8f8f8"
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 72px
    fontWeight: "700"
    lineHeight: 80px
    letterSpacing: -0.03em
  headline-lg:
    fontFamily: Inter
    fontSize: 36px
    fontWeight: "600"
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: "500"
    lineHeight: 32px
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
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  container-padding: 40px
  card-gap: 24px
  section-margin: 64px
  hero-padding: 80px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.sm}"
    height: 44px
    padding: 0 24px
  button-primary-hover:
    backgroundColor: "#ff5740"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.on-surface}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.sm}"
    border: 1px solid "{colors.outline}"
    height: 44px
    padding: 0 24px
  button-ghost-hover:
    backgroundColor: "{colors.surface-dim}"
  card-standard:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.lg}"
    padding: 32px
    border: 1px solid "{colors.outline-variant}"
  card-elevated:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.lg}"
    padding: 32px
    shadowColor: "rgba(0, 0, 0, 0.08)"
    shadowBlur: 16px
  hero-card:
    backgroundColor: "{colors.surface-container}"
    rounded: "{rounded.xl}"
    padding: 48px
  input-field:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    typography: "{typography.body-md}"
    rounded: "{rounded.sm}"
    border: 1px solid "{colors.outline}"
    padding: 14px 16px
    height: 48px
  color-block-orange:
    backgroundColor: "{colors.primary}"
    rounded: "{rounded.md}"
  color-block-purple:
    backgroundColor: "{colors.secondary}"
    rounded: "{rounded.md}"
  color-block-coral:
    backgroundColor: "{colors.tertiary}"
    rounded: "{rounded.md}"
  color-block-cyan:
    backgroundColor: "{colors.quaternary}"
    rounded: "{rounded.md}"
  feature-tag:
    backgroundColor: "{colors.surface-dim}"
    textColor: "{colors.on-surface-variant}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.full}"
    padding: 6px 14px
---

## Brand & Style

Figma's design philosophy can be distilled to a single principle: **make the tool invisible**. As a professional design tool, the interface should never compete with the work being created. The visual language is deliberately restrained — white backgrounds, geometric color blocks, functional typography — creating a neutral canvas that lets creative work shine. This is **instrumental design**: the best interface is one users forget exists.

## Colors

The Figma color system uses white as the dominant canvas with four signature brand colors deployed strategically:
- **Red #F24E1E** — Core brand, primary CTAs
- **Purple #A259FF** — Secondary accent, variety
- **Coral #FF7262** — Warm accent, energy
- **Cyan #1ABCFE** — Cool accent, technology

These colors appear in geometric background blocks (low saturation, not competing with content), logo, and interactive accents. The restraint is intentional: colors celebrate the brand, not overwhelm the work.

## Typography

Typography is purely functional — Inter or similar system fonts with clear hierarchy. Headlines use 600-700 weight, body uses 400 weight, labels use 500 weight. No decorative typefaces; the tool must disappear. Line heights are generous (1.5-1.6) for body text readability during extended use.

## Layout & Spacing

Whitespace is used lavishly. Sections breathe with 64-80px vertical spacing. Cards have 32px internal padding. The grid is clean and aligned. The approach: **space is not wasted, it's invested** — breathing room reduces cognitive load and elevates content.

## Elevation & Depth

Elevation comes primarily from surface layer variations and subtle shadows on cards. No dramatic drop shadows; depth is achieved through luminosity differences and thin borders. Geometric blocks in the background use subtle gradients (pastel cyan, lavender, cream) to add life without distraction.

## Shapes

Border radius follows a consistent system (4px small, 8px medium, 16px large). Cards and buttons use medium radius; large containers use generous radius. The geometry is modern but not playful — precision serves professionalism.

## Components

The component system prioritizes clarity over decoration. Primary CTAs use full brand red fill. Secondary actions use ghost buttons. Cards use subtle borders rather than heavy shadows. Input fields have clear focus states. The brand's four-color system appears in geometric decorative blocks that add visual interest without competing with content.

## Do's and Don'ts

- **Do** use white/light backgrounds when the content itself is the star
- **Do** deploy brand colors strategically in decorative geometric blocks
- **Do** use generous whitespace to elevate content
- **Do** maintain tool-like restraint — the interface should serve, not perform
- **Don't** use decorative typefaces in professional tools
- **Don't** let UI compete with user-generated content
- **Don't** sacrifice readability for visual interest
