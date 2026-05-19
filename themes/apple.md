---
name: Apple
colors:
  surface: "#ffffff"
  surface-dim: "#f5f5f7"
  surface-bright: "#ffffff"
  surface-container-lowest: "#ffffff"
  surface-container-low: "#fafafa"
  surface-container: "#ffffff"
  surface-container-high: "#f0f0f2"
  surface-container-highest: "#e8e8ea"
  on-surface: "#1d1d1f"
  on-surface-variant: "#6e6e73"
  inverse-surface: "#1d1d1f"
  inverse-on-surface: "#f5f5f7"
  outline: "#d2d2d7"
  outline-variant: "#e5e5ea"
  surface-tint: "#0071e3"
  primary: "#0071e3"
  on-primary: "#ffffff"
  primary-container: "#e5f3ff"
  on-primary-container: "#003660"
  inverse-primary: "#0071e3"
  secondary: "#86868b"
  on-secondary: "#ffffff"
  secondary-container: "#f5f5f7"
  on-secondary-secondary: "#1d1d1f"
  tertiary: "#bf5af2"
  on-tertiary: "#ffffff"
  tertiary-container: "#f5e5ff"
  on-tertiary: "#4a1a7a"
  error: "#ff3b30"
  on-error: "#ffffff"
  error-container: "#ffe5e0"
  on-error-container: "#8b1a10"
  background: "#ffffff"
  on-background: "#1d1d1f"
  surface-variant: "#f5f5f7"
typography:
  display-lg:
    fontFamily: SF Pro Display
    fontSize: 96px
    fontWeight: "700"
    lineHeight: 100px
    letterSpacing: -0.03em
  headline-lg:
    fontFamily: SF Pro Display
    fontSize: 48px
    fontWeight: "600"
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: SF Pro Display
    fontSize: 32px
    fontWeight: "500"
    lineHeight: 40px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: SF Pro Text
    fontSize: 21px
    fontWeight: "400"
    lineHeight: 32px
  body-md:
    fontFamily: SF Pro Text
    fontSize: 17px
    fontWeight: "400"
    lineHeight: 26px
  label-sm:
    fontFamily: SF Pro Text
    fontSize: 12px
    fontWeight: "500"
    lineHeight: 16px
    letterSpacing: 0.01em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  container-padding: 48px
  card-gap: 32px
  section-margin: 80px
  hero-height: 100vh
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.body-md}"
    fontWeight: "500"
    rounded: "{rounded.lg}"
    height: 52px
    padding: 0 28px
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.primary}"
    typography: "{typography.body-md}"
    fontWeight: "500"
    rounded: "{rounded.lg}"
    height: 52px
    padding: 0 28px
  button-ghost-hover:
    backgroundColor: "{colors.primary-container}"
  hero-section:
    padding: "{spacing.hero-height}" 0
    textAlign: center
  product-image-container:
    backgroundColor: "{colors.surface-dim}"
    padding: 80px 0
  card-standard:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: 0
    padding: 64px 48px
  card-elevated:
    backgroundColor: "{colors.surface-dim}"
    textColor: "{colors.on-surface}"
    rounded: 0
    padding: 64px 48px
  feature-block:
    padding: 120px 0
    textAlign: center
  input-field:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    typography: "{typography.body-md}"
    rounded: "{rounded.lg}"
    border: 1px solid "{colors.outline}"
    padding: 16px 20px
    height: 52px
---

## Brand & Style

Apple's product pages represent the apex of **"product as hero"** design philosophy. The interface doesn't exist — the product does. Every pixel serves one purpose: letting the hardware or software shine without interference. This is the visual language of confidence: Apple doesn't need flashy UI because the products are compelling enough. The design approach is **radical restraint elevated to art form**.

## Colors

Color usage is almost entirely negative — the product's own colors ARE the palette. Backgrounds alternate between pure white and subtle gray (#f5f5f7), creating rhythm without distraction. Blue (#0071e3) appears only for CTAs and essential links. The philosophy: **color should never compete with the product**.

## Typography

Typography scale is aggressive — display headlines reach 96px, creating instant visual hierarchy. SF Pro Display for headlines, SF Pro Text for body. Generous letter-spacing in headlines (-0.03em) creates premium breathing room. Line heights are expansive (1.5+) for comfortable reading. The approach: **make words feel important without shouting**.

## Layout & Spacing

Apple's spacing borders on luxurious — sections take full viewport height, text and product images alternate rhythmically, and generous padding creates breathing room. A single section can occupy an entire screen. The philosophy: **space is not empty, it's confident**. Each module gets the stage to itself.

## Elevation & Depth

Elevation is achieved through lighting in product photography, not UI shadows. Cards have zero border-radius — sharp corners reinforce the precision aesthetic. When surfaces do elevate, it's through subtle luminosity changes (white to gray) rather than drop shadows. The approach: **depth through photography, not interface design**.

## Shapes

Sharp geometry is the rule — border-radius rarely exceeds 8px for interactive elements, and many containers use 0px radius. This isn't cold; it's precise. Cards often have zero radius, creating a photographic print aesthetic. Buttons use larger radius (12-16px) to feel approachable without losing elegance.

## Components

Components are nearly invisible. Primary buttons use blue fill with generous padding. Secondary actions use ghost styling. Navigation is minimal — often just logo, minimal links, and cart/bag. The philosophy: **components should be infrastructure, not decoration**.

## Do's and Don'ts

- **Do** let the product be the visual hero — design serves, never competes
- **Do** use full-viewport sections to create rhythm and breathing room
- **Do** use aggressive typography scale for instant hierarchy
- **Do** keep background colors neutral — let product colors shine
- **Don't** add decorative elements that don't serve product presentation
- **Don't** use loud colors that compete with the product
- **Don't** underestimate the power of whitespace — space communicates confidence
