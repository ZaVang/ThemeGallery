---
name: Craft
colors:
  surface: "#FAF9F6"
  surface-dim: "#F5F4F0"
  surface-bright: "#FFFFFF"
  surface-container-lowest: "#FAF9F6"
  surface-container-low: "#F7F6F3"
  surface-container: "#FAF9F6"
  surface-container-high: "#EEEDEA"
  surface-container-highest: "#E5E4E0"
  on-surface: "#1A1A1A"
  on-surface-variant: "#6B6B6B"
  inverse-surface: "#1A1A1A"
  inverse-on-surface: "#FAF9F6"
  outline: "#D4D3CF"
  outline-variant: "#E5E4E0"
  surface-tint: "#7CB4A0"
  primary: "#7CB4A0"
  on-primary: "#ffffff"
  primary-container: "#E8F5ED"
  on-primary-container: "#1A4A35"
  inverse-primary: "#7CB4A0"
  secondary: "#E8A87C"
  on-secondary: "#ffffff"
  secondary-container: "#FFF4EC"
  on-secondary: "#5A3820"
  tertiary: "#C4A3D9"
  on-tertiary: "#ffffff"
  tertiary-container: "#F5EEF9"
  on-tertiary: "#3D2455"
  quaternary: "#A3C4D9"
  on-quaternary: "#ffffff"
  quaternary-container: "#EEF5F9"
  on-quaternary: "#1A3545"
  error: "#D9596A"
  on-error: "#ffffff"
  error-container: "#FDEEF1"
  on-error-container: "#6B1A25"
  background: "#FAF9F6"
  on-background: "#1A1A1A"
  surface-variant: "#F5F4F0"
typography:
  display-lg:
    fontFamily: Georgia
    fontSize: 48px
    fontWeight: "400"
    lineHeight: 56px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Georgia
    fontSize: 28px
    fontWeight: "400"
    lineHeight: 36px
  headline-md:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: "500"
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 17px
    fontWeight: "400"
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 15px
    fontWeight: "400"
    lineHeight: 24px
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: "500"
    lineHeight: 16px
    letterSpacing: 0.02em
rounded:
  sm: 0.375rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.25rem
  full: 9999px
spacing:
  unit: 8px
  container-padding: 32px
  card-gap: 20px
  section-margin: 48px
  doc-card-padding: 20px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.body-md}"
    fontWeight: "500"
    rounded: "{rounded.md}"
    height: 44px
    padding: 0 24px
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.on-surface}"
    typography: "{typography.body-md}"
    fontWeight: "500"
    rounded: "{rounded.md}"
    border: 1px solid "{colors.outline}"
    height: 44px
    padding: 0 24px
  button-ghost-hover:
    backgroundColor: "{colors.surface-dim}"
  card-document:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.lg}"
    padding: "{spacing.doc-card-padding}"
    border: 1px solid "{colors.outline-variant}"
    shadowColor: "rgba(0, 0, 0, 0.04)"
    shadowBlur: 8px
  card-document-hover:
    borderColor: "{colors.primary}"
    shadowColor: "rgba(124, 180, 160, 0.15)"
    shadowBlur: 12px
  doc-cover-mint:
    backgroundColor: "#E8F5ED"
  doc-cover-pink:
    backgroundColor: "#FFF0F5"
  doc-cover-yellow:
    backgroundColor: "#FFF8E7"
  doc-cover-purple:
    backgroundColor: "#F5EEF9"
  doc-cover-blue:
    backgroundColor: "#EEF5F9"
  doc-tag:
    backgroundColor: "{colors.surface-container-high}"
    textColor: "{colors.on-surface-variant}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.full}"
    padding: 4px 10px
  sidebar:
    backgroundColor: "{colors.surface-dim}"
    textColor: "{colors.on-surface}"
    width: 260px
    padding: 16px
  space-badge:
    backgroundColor: "{colors.primary-container}"
    textColor: "{colors.on-primary-container}"
    typography: "{typography.label-sm}"
    fontWeight: "600"
    rounded: "{rounded.sm}"
    padding: 4px 8px
  block-editor:
    backgroundColor: "#FFFFFF"
    textColor: "{colors.on-surface}"
    padding: 4px 0
  serif-heading:
    fontFamily: Georgia
    fontWeight: "400"
  website-hero:
    backgroundColor: "{colors.surface}"
    padding: 100px 0
  website-hero-title:
    fontFamily: Georgia
    fontSize: 56px
    fontWeight: "400"
    lineHeight: 64px
    textColor: "{colors.on-surface}"
---

## Brand & Style

Craft embodies **"digital stationery"** — the philosophy that productivity tools should feel like beautiful physical objects. The palette draws from art supplies, not tech: soft mint greens, warm pinks, cream whites. Georgia serif headings evoke letterpress and editorial design. Paper textures and gentle shadows create tactile warmth. The philosophy: **tools for creators should feel crafted, not manufactured**.

## Colors

The palette is deliberately **"stationery store"** rather than "tech startup." Mint green (#7CB4A0) provides a calm, natural primary. Soft pastels (pink, yellow, purple, blue) serve document cover colors. Cream white (#FAF9F6) replaces pure white for warmth. Deep charcoal (#1A1A1A) provides contrast without coldness. The philosophy: **color should feel organic, not synthetic**.

## Typography

Typography is the soul of Craft's design. Georgia serif headings create editorial, literary warmth — documents feel like pages from a beautiful notebook. Inter body text ensures readability for long-form writing. The contrast between serif headings and sans-serif body mirrors the physical notebook experience: decorated headers, clean writing surfaces.

## Layout & Spacing

Spacing is generous and deliberate. Document cards include cover colors, titles, tags, timestamps, and preview text — rich information without claustrophobia. Cards breathe with substantial padding. The sidebar maintains comfortable width for navigation. The approach: **space creates the feeling of quality, crowding feels cheap**.

## Elevation & Depth

Depth is achieved through soft, warm shadows — not the cool grays of typical UI, but shadows with slight warmth. Cards float gently with subtle elevation. Paper textures and subtle gradients add tactile dimension. The approach: **shadows should feel like morning light on a desk, not fluorescent office ceilings**.

## Shapes

Border radius is generous (8-20px) — Craft prioritizes softness and approachability. Document cards use 16px radius. Buttons use 8-12px radius. The overall feeling is "hand-crafted" rather than "precision-engineered." The philosophy: **rounded corners feel human, imperfect, real**.

## Components

The component system emphasizes personalization. Document cards display customizable cover colors, showing users their space is unique. Tags appear in soft pill shapes. The sidebar uses warm background tones. The philosophy: **components should feel customizable, owned, personal**.

## Do's and Don'ts

- **Do** use serif typography (Georgia) for headings to create editorial warmth
- **Do** implement pastel document cover colors for personalization
- **Do** use warm-tinted shadows rather than cool gray for softness
- **Do** create generous padding that feels "premium stationery" not "utility tool"
- **Don't** use tech-blue or aggressive accent colors — keep it organic
- **Don't** sacrifice readability for decoration
- **Don't** add unnecessary complexity — the tool should feel simple, not feature-sparse
