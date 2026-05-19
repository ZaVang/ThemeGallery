---
name: Linear
colors:
  surface: "#1a1a1a"
  surface-dim: "#141414"
  surface-bright: "#252525"
  surface-container-lowest: "#0f0f0f"
  surface-container-low: "#1a1a1a"
  surface-container: "#222222"
  surface-container-high: "#2a2a2a"
  surface-container-highest: "#333333"
  on-surface: "#ffffff"
  on-surface-variant: "#9ca3af"
  inverse-surface: "#ffffff"
  inverse-on-surface: "#1a1a1a"
  outline: "#6b7280"
  outline-variant: "#3f3f3f"
  surface-tint: "#5E6AD2"
  primary: "#5E6AD2"
  on-primary: "#ffffff"
  primary-container: "#373e6e"
  on-primary-container: "#c7cbff"
  inverse-primary: "#5E6AD2"
  secondary: "#8B8BFF"
  on-secondary: "#1a1a1a"
  secondary-container: "#4a4a7a"
  on-secondary-container: "#d1d1ff"
  tertiary: "#10B981"
  on-tertiary: "#ffffff"
  tertiary-container: "#064e3b"
  on-tertiary-container: "#a7f3d0"
  error: "#EF4444"
  on-error: "#ffffff"
  error-container: "#7f1d1d"
  on-error-container: "#fecaca"
  background: "#1a1a1a"
  on-background: "#ffffff"
  surface-variant: "#2a2a2a"
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 72px
    fontWeight: "600"
    lineHeight: 80px
    letterSpacing: -0.04em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: "500"
    lineHeight: 40px
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
    fontWeight: "600"
    lineHeight: 16px
    letterSpacing: 0.05em
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
  sidebar-width: 240px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.lg}"
    height: 36px
    padding: 0 16px
  button-ghost:
    backgroundColor: transparent
    textColor: "{colors.on-surface}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.lg}"
    height: 36px
    padding: 0 12px
  button-ghost-hover:
    backgroundColor: "rgba(255, 255, 255, 0.08)"
  card-standard:
    backgroundColor: "{colors.surface-container}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.md}"
    padding: 16px
  card-elevated:
    backgroundColor: "{colors.surface-container-high}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.md}"
    padding: 16px
  input-field:
    backgroundColor: "{colors.surface-container}"
    textColor: "{colors.on-surface}"
    typography: "{typography.body-md}"
    rounded: "{rounded.md}"
    padding: 12px 16px
    height: 40px
  sidebar:
    backgroundColor: "{colors.surface-dim}"
    textColor: "{colors.on-surface}"
    width: "{spacing.sidebar-width}"
    padding: 16px
  list-item-interactive:
    backgroundColor: transparent
    textColor: "{colors.on-surface}"
    rounded: "{rounded.sm}"
    padding: 10px 12px
  list-item-interactive-hover:
    backgroundColor: "rgba(255, 255, 255, 0.06)"
  badge-bug:
    backgroundColor: "{colors.error}"
    textColor: "{colors.on-error}"
  badge-design:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
  badge-ai:
    backgroundColor: "{colors.tertiary}"
    textColor: "{colors.on-tertiary}"
  badge-performance:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.on-secondary}"
---

## Brand & Style

Linear embodies a philosophy of **radical minimalism and speed-first design**. As an AI-first product development system for teams and agents, Linear's visual language communicates professional competence through extreme restraint. The interface feels like a precision instrument — every pixel serves a purpose, every interaction delivers instant feedback. The emotional signature is one of **focused calm**: no visual noise, no cognitive friction, just pure productivity flow. The dark theme default reflects the product's identity as a tool built by developers, for developers — a professional's companion for high-velocity teams.

## Colors

The color strategy is deliberately conservative on surfaces with strategic deployment of purple as the singular accent. The near-black background (#1a1a1a) reduces eye strain during extended use while the Linear Purple (#5E6AD2) commands attention precisely where interaction is needed. Functional colors (error red, success green) follow traffic-light conventions but are muted to avoid visual aggression in a tool users stare at for hours. The overall effect is a **quiet confidence** — Linear doesn't need to shout.

## Typography

Typography in Linear prioritizes legibility and hierarchy over personality. Inter provides clean, neutral letterforms that disappear when reading and emerge clearly for navigation. The weight distribution (medium for headings, regular for body) creates natural scanning patterns. Generous line-height in body text supports long reading sessions without fatigue. The approach is **systematic efficiency**: typography as infrastructure, not ornamentation.

## Layout & Spacing

The asymmetric split-layout (narrow sidebar + expansive content area) reflects Linear's information architecture philosophy. The sidebar contains only essential navigation modules (Issues, Projects, Initiatives, Pulse), reducing cognitive load. The content area maximizes breathing room, letting issue lists and detail panels command attention. Spacing follows an 8px base grid with generous padding that creates **clear zone boundaries** without aggressive dividers.

## Elevation & Depth

Elevation in Linear is achieved through subtle luminosity differences rather than heavy shadows. Surface layers progress from surface-dim (#141414) at the base to surface-container-highest (#333333) for elevated cards. This creates a sense of **floating depth** without the visual weight of prominent shadows. The technique keeps the interface feeling light and fast while maintaining clear visual hierarchy.

## Shapes

Border radius is consistently applied at 8px (md) for interactive elements and cards, creating a softened but professional aesthetic. The shape language suggests **precision craftsmanship** — corners rounded enough to feel modern, sharp enough to feel serious. No playful or excessive rounding; geometry is purposeful.

## Components

Linear's component system is defined by restraint. Primary buttons use the signature purple for one-step actions only. Ghost buttons handle secondary actions with subtle hover states. Cards use elevated surface containers with minimal padding. Input fields disappear into the background until focused. The overall principle: **components should feel like they belong to a single, cohesive system**.

## Do's and Don'ts

- **Do** use Linear's dark theme for developer-focused tools where extended screen time is expected
- **Do** deploy a single strong accent color against neutral backgrounds for clarity
- **Do** prioritize information density that respects whitespace — lists breathe but don't waste space
- **Don't** add decorative elements that don't serve navigation or comprehension
- **Don't** use multiple accent colors that compete for attention
- **Don't** sacrifice keyboard navigation support for mouse-only interactions
