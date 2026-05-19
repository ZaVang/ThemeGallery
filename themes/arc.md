---
name: Arc
colors:
  surface: "#1a1a1e"
  surface-dim: "#0f0f11"
  surface-bright: "#252529"
  surface-container-lowest: "#0a0a0c"
  surface-container-low: "#141417"
  surface-container: "#1c1c21"
  surface-container-high: "#252529"
  surface-container-highest: "#2e2e34"
  on-surface: "#ffffff"
  on-surface-variant: "#a1a1aa"
  inverse-surface: "#ffffff"
  inverse-on-surface: "#1a1a1e"
  outline: "#3f3f46"
  outline-variant: "#27272a"
  surface-tint: "#6366f1"
  primary: "#8b5cf6"
  on-primary: "#ffffff"
  primary-container: "#4c1d95"
  on-primary-container: "#e9d5ff"
  inverse-primary: "#8b5cf6"
  secondary: "#06b6d4"
  on-secondary: "#ffffff"
  secondary-container: "#164e63"
  on-secondary-container: "#a5f3fc"
  tertiary: "#f472b6"
  on-tertiary: "#ffffff"
  tertiary-container: "#831843"
  on-tertiary: "#fce7f3"
  error: "#ef4444"
  on-error: "#ffffff"
  error-container: "#7f1d1d"
  on-error-container: "#fecaca"
  background: "#1a1a1e"
  on-background: "#ffffff"
  surface-variant: "#27272a"
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 64px
    fontWeight: "600"
    lineHeight: 72px
    letterSpacing: -0.03em
  headline-lg:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: "500"
    lineHeight: 36px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: "500"
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: "400"
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 15px
    fontWeight: "400"
    lineHeight: 22px
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
  container-padding: 16px
  card-gap: 12px
  section-margin: 32px
  sidebar-width: 280px
  tab-height: 36px
components:
  sidebar:
    backgroundColor: "{colors.surface-dim}"
    textColor: "{colors.on-surface}"
    width: "{spacing.sidebar-width}"
    padding: 12px
  tab-item:
    backgroundColor: transparent
    textColor: "{colors.on-surface-variant}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.sm}"
    height: "{spacing.tab-height}"
    padding: 0 12px
  tab-item-active:
    backgroundColor: "{colors.surface-container}"
    textColor: "{colors.on-surface}"
  tab-item-hover:
    backgroundColor: "{colors.surface-container-low}"
  content-area:
    backgroundColor: "{colors.surface}"
    padding: 0
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.sm}"
    height: 32px
    padding: 0 14px
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.on-surface}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.sm}"
    height: 32px
    padding: 0 12px
  command-bar:
    backgroundColor: "{colors.surface-container-highest}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.lg}"
    padding: 12px 16px
    backdropBlur: 20px
  space-badge:
    backgroundColor: "{colors.primary-container}"
    textColor: "{colors.on-primary-container}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.full}"
    height: 24px
    padding: 0 10px
  list-item-interactive:
    backgroundColor: transparent
    textColor: "{colors.on-surface}"
    rounded: "{rounded.sm}"
    padding: 8px 12px
    height: 36px
  list-item-interactive-hover:
    backgroundColor: "{colors.surface-container-low}"
  favorite-item:
    backgroundColor: transparent
    textColor: "{colors.on-surface}"
    iconColor: "{colors.primary}"
---

## Brand & Style

Arc Browser reimagines the fundamental relationship between user and browser through a radical vertical sidebar paradigm. The product philosophy centers on **"spaces for different sides of you"** — recognizing that users don't just browse, they inhabit contexts. The visual language is calm, ordered, and deeply intentional, transforming the chaotic tab-soup of traditional browsers into a serene workspace where context boundaries reduce cognitive load.

## Colors

The palette embraces deep, sophisticated darks with low-saturation highlights. Unlike pure blacks, Arc's surfaces (#1a1a1e) have subtle purple undertones that feel more refined than cold. Each Space can be assigned a custom accent color, but the default system uses muted purples and teals that maintain the calm atmosphere. The approach: **depth through sophistication, not brightness**.

## Typography

Arc uses lowercase letters for tab titles — a deliberate departure from Chrome's ALL CAPS that communicates "this is different, this is yours." The typeface remains clean system fonts (SF Pro/Inter), but the lowercase treatment creates a friendlier, more personal feel. Information hierarchy follows: Space name > Tab title > URL (in muted gray).

## Layout & Spacing

The **vertical sidebar is the defining spatial choice** — content takes 80% width while navigation occupies the left 20%. This is not a chrome modification; it's a philosophy statement. The sidebar provides permanent context while maximizing content area. Tab spacing is generous, and automatic tab collapsing keeps the sidebar clean. The layout says: "your content is the hero; navigation supports, never competes."

## Elevation & Depth

Arc uses subtle surface luminosity differences for depth. The sidebar is darkest (surface-dim), tabs use surface-container layers, and the content area is brightest. Floating elements like command bar and little arc windows use frosted glass effects with backdrop blur, creating layered depth without heavy shadows.

## Shapes

Border radius is consistently applied at 4-8px, creating softened but professional geometry. The corner treatment suggests modern computing without playful excess. Spaces use rounded badges, and the command bar uses generous radius for a floating, accessible feel.

## Components

The component system revolves around the sidebar architecture. Tab items use clear active/hover states. The command bar (⌘K) floats centrally with glassmorphism. Space badges allow visual categorization. The overall philosophy: **components serve organization, organization creates calm**.

## Do's and Don'ts

- **Do** use vertical sidebar layouts for content-rich productivity tools
- **Do** implement customizable accent colors for user personalization
- **Do** use lowercase tab labels to create a friendlier, differentiated feel
- **Do** implement auto-maintenance features (auto-archive) to reduce user anxiety
- **Don't** mix uppercase and lowercase within the same interface — be consistent
- **Don't** create excessive tab density — let users feel in control of their space
- **Don't** sacrifice sidebar clarity for feature density
