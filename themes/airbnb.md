---
name: Airbnb
colors:
  surface: "#ffffff"
  surface-dim: "#f7f7f7"
  surface-bright: "#ffffff"
  surface-container-lowest: "#ffffff"
  surface-container-low: "#fafafa"
  surface-container: "#ffffff"
  surface-container-high: "#f2f2f2"
  surface-container-highest: "#e8e8e8"
  on-surface: "#222222"
  on-surface-variant: "#717171"
  inverse-surface: "#222222"
  inverse-on-surface: "#ffffff"
  outline: "#b0b0b0"
  outline-variant: "#dcdcdc"
  surface-tint: "#FF5A5F"
  primary: "#FF5A5F"
  on-primary: "#ffffff"
  primary-container: "#ffebec"
  on-primary-container: "#8b0000"
  inverse-primary: "#FF5A5F"
  secondary: "#00a699"
  on-secondary: "#ffffff"
  secondary-container: "#e0f7f5"
  on-secondary-container: "#005550"
  tertiary: "#484848"
  on-tertiary: "#ffffff"
  tertiary-container: "#e8e8e8"
  on-tertiary: "#222222"
  error: "#c13515"
  on-error: "#ffffff"
  error-container: "#fff0ed"
  on-error-container: "#8b2500"
  background: "#ffffff"
  on-background: "#222222"
  surface-variant: "#f7f7f7"
typography:
  display-lg:
    fontFamily: Cereal
    fontSize: 56px
    fontWeight: "700"
    lineHeight: 64px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Cereal
    fontSize: 32px
    fontWeight: "600"
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Cereal
    fontSize: 22px
    fontWeight: "500"
    lineHeight: 28px
  body-lg:
    fontFamily: Cereal
    fontSize: 17px
    fontWeight: "400"
    lineHeight: 26px
  body-md:
    fontFamily: Cereal
    fontSize: 16px
    fontWeight: "400"
    lineHeight: 24px
  label-sm:
    fontFamily: Cereal
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
  listing-card-radius: 12px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.body-md}"
    fontWeight: "600"
    rounded: "{rounded.sm}"
    height: 48px
    padding: 0 24px
  button-primary-hover:
    backgroundColor: "#ff4247"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.on-surface}"
    typography: "{typography.body-md}"
    fontWeight: "500"
    rounded: "{rounded.full}"
    border: 1px solid "{colors.outline}"
    height: 48px
    padding: 0 24px
  button-search:
    backgroundColor: "{colors.primary}"
    textColor: "#ffffff"
    typography: "{typography.body-md}"
    fontWeight: "600"
    rounded: "{rounded.full}"
    height: 48px
    padding: 0 24px
  card-standard:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.lg}"
    padding: 0
    overflow: hidden
  listing-card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.lg}"
    padding: 0
    overflow: hidden
    shadowColor: "rgba(0, 0, 0, 0.06)"
    shadowBlur: 8px
  listing-card-hover:
    shadowColor: "rgba(0, 0, 0, 0.12)"
    shadowBlur: 16px
  image-container:
    borderRadius: "{rounded.lg}"
    aspectRatio: "4/3"
    overflow: hidden
  favorite-button:
    backgroundColor: "transparent"
    iconColor: "#ffffff"
    top: 12px
    right: 12px
  host-avatar:
    borderRadius: "{rounded.full}"
    border: 2px solid "#ffffff"
    size: 40px
  rating-badge:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    typography: "{typography.label-sm}"
    fontWeight: "500"
    padding: 4px 8px
    borderRadius: 4px
  superhost-badge:
    backgroundColor: "#ffffff"
    textColor: "{colors.on-surface}"
    typography: "{typography.label-sm}"
    fontWeight: "600"
    border: 1px solid "{colors.outline}"
    padding: 4px 8px
    borderRadius: 4px
  input-field:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    typography: "{typography.body-md}"
    rounded: "{rounded.full}"
    border: 1px solid "{colors.outline}"
    padding: 14px 20px
    height: 56px
  search-bar:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.full}"
    border: 1px solid "{colors.outline-variant}"
    padding: 8px 8px 8px 24px
    shadowColor: "rgba(0, 0, 0, 0.08)"
    shadowBlur: 12px
---

## Brand & Style

Airbnb's design is built on a foundation of **trust through warmth**. The platform solves the fundamental P2P trust problem — "why should I trust a stranger?" — through visual language that emphasizes humanity. Salmon pink (#FF5A5F) creates warmth and invitation. Rounded cards feel approachable. High-quality photography places real people in real homes. The philosophy: **design should make strangers feel like friends**.

## Colors

The salmon pink primary (#FF5A5F) is used sparingly but impactfully — CTAs, brand moments, heart icons. The rest of the palette stays neutral (white, grays) so photography can shine. Teal (#00a699) appears for secondary actions and eco-certifications. The philosophy: **color creates emotion; restraint maintains trust**.

## Typography

Airbnb's custom Cereal font family balances warmth with professionalism. Headlines are bold (700 weight) to create instant hierarchy. Body text is comfortable (400 weight, generous line-height) for long browsing sessions. The approach: **typography should feel like a handwritten welcome note, not a corporate memo**.

## Layout & Spacing

Listing cards use generous 12px border-radius — approachable without being childish. Cards include heart-shaped favorite buttons positioned top-right over images. Host avatars appear in listings with subtle white borders. Spacing between elements is deliberate, creating breathing room that reduces the "claustrophobia" of dense information.

## Elevation & Depth

Elevation comes primarily from subtle shadows on cards — enough to create lift, not enough to feel heavy. The search bar floats with soft shadow. Cards have micro-interaction hover states (increased shadow, slight scale). The approach: **depth through subtlety, not drama**.

## Shapes

Rounded corners (8-12px) dominate — cards, buttons, inputs all use substantial radius. The full-rounded button style (pill shape) for search CTAs is distinctive. Avatar images use perfect circles. The philosophy: **rounded shapes feel human; sharp edges feel corporate**.

## Components

The component system prioritizes human connection. Listing cards lead with photography, not text. Host avatars provide human faces early in the browsing flow. Rating badges and superhost badges create trust signals. The search bar uses pill shape with subtle shadow. The philosophy: **every component should answer: "can I trust this?"**.

## Do's and Don'ts

- **Do** lead with photography in card-based layouts — images build trust faster than text
- **Do** use rounded shapes (8-12px) to create warmth and approachability
- **Do** implement trust signals (ratings, verified badges, host avatars) prominently
- **Do** use salmon pink (#FF5A5F) sparingly for emotional impact
- **Don't** let interface compete with listing photography
- **Don't** use harsh colors or sharp geometry that feels corporate
- **Don't** hide host/hostess identity — human faces build trust
