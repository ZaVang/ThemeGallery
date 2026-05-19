---
name: Raycast
colors:
  surface: "#000000"
  surface-dim: "#0a0a0a"
  surface-bright: "#141414"
  surface-container-lowest: "#000000"
  surface-container-low: "#0f0f0f"
  surface-container: "#1a1a1a"
  surface-container-high: "#252525"
  surface-container-highest: "#303030"
  on-surface: "#ffffff"
  on-surface-variant: "#a1a1aa"
  inverse-surface: "#ffffff"
  inverse-on-surface: "#000000"
  outline: "#3f3f46"
  outline-variant: "#27272a"
  surface-tint: "#8b5cf6"
  primary: "#8b5cf6"
  on-primary: "#ffffff"
  primary-container: "#4c1d95"
  on-primary-container: "#e9d5ff"
  inverse-primary: "#8b5cf6"
  secondary: "#a78bfa"
  on-secondary: "#000000"
  secondary-container: "#2e1065"
  on-secondary-container: "#d8b4fe"
  tertiary: "#6366f1"
  on-tertiary: "#ffffff"
  tertiary-container: "#1e1b4b"
  on-tertiary: "#c7d2fe"
  error: "#f87171"
  on-error: "#000000"
  error-container: "#7f1d1d"
  on-error-container: "#fecaca"
  background: "#000000"
  on-background: "#ffffff"
  surface-variant: "#1a1a1a"
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: "600"
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: "500"
    lineHeight: 36px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: "500"
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: "400"
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: "400"
    lineHeight: 20px
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: "500"
    lineHeight: 14px
    letterSpacing: 0.03em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  container-padding: 24px
  card-gap: 16px
  section-margin: 40px
  popup-width: 680px
  popup-max-height: 500px
components:
  popup:
    backgroundColor: "{colors.surface-container-highest}"
    textColor: "{colors.on-surface}"
    width: "{spacing.popup-width}"
    maxHeight: "{spacing.popup-max-height}"
    rounded: "{rounded.xl}"
    padding: 0
    backdropBlur: 40px
    shadowColor: "rgba(0, 0, 0, 0.5)"
    shadowBlur: 40px
    shadowY: 20px
  search-input:
    backgroundColor: "transparent"
    textColor: "#ffffff"
    typography: "{typography.headline-md}"
    padding: 16px 20px
    borderBottom: 1px solid "{colors.outline-variant}"
  result-list:
    backgroundColor: "transparent"
    padding: 8px
  result-item:
    backgroundColor: "transparent"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.md}"
    padding: 10px 12px
    height: 48px
  result-item-active:
    backgroundColor: "{colors.surface-container-high}"
    textColor: "#ffffff"
  result-item-hover:
    backgroundColor: "{colors.surface-container}"
  result-icon:
    backgroundColor: "{colors.surface-container-low}"
    borderRadius: "{rounded.sm}"
    size: 32px
    marginRight: 12px
  shortcut-key:
    backgroundColor: "{colors.surface-container}"
    textColor: "{colors.on-surface-variant}"
    typography: "{typography.label-sm}"
    rounded: 4px
    padding: 4px 8px
    border: 1px solid "{colors.outline}"
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.body-md}"
    fontWeight: "500"
    rounded: "{rounded.lg}"
    height: 40px
    padding: 0 20px
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.on-surface}"
    typography: "{typography.body-md}"
    fontWeight: "500"
    rounded: "{rounded.lg}"
    height: 40px
    padding: 0 16px
  website-hero:
    backgroundColor: "{colors.surface}"
    padding: 80px 0
  website-hero-title:
    typography: "{typography.display-lg}"
    textColor: "#ffffff"
    marginBottom: 16px
  website-hero-subtitle:
    typography: "{typography.body-lg}"
    textColor: "{colors.on-surface-variant}"
---

## Brand & Style

Raycast is a meditation on **centralized focus**. The entire product philosophy centers on one interaction: a floating popup that eliminates the need to context-switch between applications. The visual language reflects this singular focus — the popup floats in center-screen attention, surrounded by nothing but darkness. Purple (#8b5cf6) gradients create energy without aggression. The philosophy: **the best interface is one that gets out of your way**.

## Colors

The palette is pure black (not near-black) with purple as the singular accent. The exact black (#000000) creates maximum contrast for the purple highlights. The gradient from #6366f1 (indigo) to #8b5cf6 (violet) appears on key interactive moments. Text is pure white; secondary text uses muted gray. The philosophy: **color is reserved for things that matter**.

## Typography

Typography is compact and efficient — smaller than typical web typography (14px body, 11px labels). This matches the tool's efficiency philosophy. Icon + text combinations are the norm. Shortcut keys are displayed inline, normalizing keyboard-first interaction. The approach: **every character earns its space**.

## Layout & Spacing

The popup layout follows strict **center-focus principles**: search input at top, results flow downward, everything visible without scrolling when possible. Results are grouped by type (apps, files, clipboard, snippets) but displayed in a single unified list. The website follows a different rhythm — large hero text followed by increasingly dense information as you scroll.

## Elevation & Depth

Depth is achieved through frosted glass (backdrop-filter: blur) against the pure black background. The popup uses 40px blur creating an otherworldly floating quality. Shadows are soft and diffuse. The approach: **objects float in space, and space is dark**.

## Shapes

Border radius is generous (8-12px) — the popup itself uses 16px radius, creating an approachable, modern feel. Results use 8px radius. Shortcut key badges use minimal 4px radius. The philosophy: **rounded corners feel faster, sharper corners feel slower**.

## Components

The component system is optimized for the popup context. Search input dominates visually. Results show icon + title + subtitle in compact rows. Shortcut badges appear inline. Hover states use subtle background shifts. The philosophy: **components must work at speed, with or without a mouse**.

## Do's and Don'ts

- **Do** use frosted glass effects against dark backgrounds for floating, ethereal depth
- **Do** implement center-focus popup patterns for quick-action tools
- **Do** display keyboard shortcuts inline to normalize keyboard-first interaction
- **Do** use purple gradients sparingly for brand accent moments
- **Don't** use multiple accent colors — purple is the singular accent
- **Don't** create scroll-heavy popups — everything should be visible
- **Don't** sacrifice speed feedback for animation flourishes
