---
name: Vercel
colors:
  surface: "#000000"
  surface-dim: "#000000"
  surface-bright: "#0a0a0a"
  surface-container-lowest: "#000000"
  surface-container-low: "#0a0a0a"
  surface-container: "#111111"
  surface-container-high: "#1a1a1a"
  surface-container-highest: "#222222"
  on-surface: "#ffffff"
  on-surface-variant: "#888888"
  inverse-surface: "#ffffff"
  inverse-on-surface: "#000000"
  outline: "#333333"
  outline-variant: "#2a2a2a"
  surface-tint: "#0070f3"
  primary: "#0070f3"
  on-primary: "#ffffff"
  primary-container: "#001a3a"
  on-primary-container: "#66b3ff"
  inverse-primary: "#0070f3"
  secondary: "#7928ca"
  on-secondary: "#ffffff"
  secondary-container: "#2a0a4a"
  on-secondary-container: "#d4b3ff"
  tertiary: "#ff4400"
  on-tertiary: "#ffffff"
  tertiary-container: "#4a1500"
  on-tertiary: "#ffcc99"
  error: "#ff4444"
  on-error: "#ffffff"
  error-container: "#4a0a0a"
  on-error-container: "#ffaaaa"
  background: "#000000"
  on-background: "#ffffff"
  surface-variant: "#111111"
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 80px
    fontWeight: "700"
    lineHeight: 88px
    letterSpacing: -0.04em
  headline-lg:
    fontFamily: Inter
    fontSize: 40px
    fontWeight: "600"
    lineHeight: 48px
    letterSpacing: -0.03em
  headline-md:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: "500"
    lineHeight: 36px
    letterSpacing: -0.02em
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
  container-padding: 40px
  card-gap: 24px
  section-margin: 64px
  max-content-width: 1280px
components:
  button-primary:
    backgroundColor: "#ffffff"
    textColor: "#000000"
    typography: "{typography.label-sm}"
    rounded: "{rounded.sm}"
    height: 40px
    padding: 0 20px
  button-primary-hover:
    backgroundColor: "#f0f0f0"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "#ffffff"
    typography: "{typography.label-sm}"
    rounded: "{rounded.sm}"
    border: 1px solid "{colors.outline}"
    height: 40px
    padding: 0 20px
  button-tertiary:
    backgroundColor: "transparent"
    textColor: "#888888"
    typography: "{typography.label-sm}"
    rounded: "{rounded.sm}"
    height: 40px
    padding: 0 16px
  button-tertiary-hover:
    textColor: "#ffffff"
  card-standard:
    backgroundColor: "{colors.surface-container}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.md}"
    padding: 32px
  card-elevated:
    backgroundColor: "{colors.surface-container-high}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.md}"
    padding: 32px
  input-field:
    backgroundColor: "{colors.surface-container}"
    textColor: "{colors.on-surface}"
    typography: "{typography.body-md}"
    rounded: "{rounded.sm}"
    padding: 14px 16px
    height: 44px
  hero-title:
    typography: "{typography.display-lg}"
    textColor: "#ffffff"
  hero-subtitle:
    typography: "{typography.body-lg}"
    textColor: "#888888"
  cta-pro:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.sm}"
    height: 32px
    padding: 0 12px
  cta-enterprise:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.on-secondary}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.sm}"
    height: 32px
    padding: 0 12px
---

## Brand & Style

Vercel represents the zeniths of **black-and-white minimalism** executed with absolute conviction. The interface is a study in elimination — every color removed except the singular blue accent (#0070f3) for premium tiers. The aesthetic communicates "we don't need to prove anything; our technology speaks for itself." This is the visual language of confidence without炫耀: pure, professional, almost austere.

## Colors

The palette is almost surgically removed of color — pure black backgrounds, white text, with blue reserved exclusively for "Pro" and "Enterprise" CTAs. This isn't limitation; it's strategy. The absence of color makes the blue Pro/Enterprise buttons scream "upgrade." The triangle gradient motifs (warm orange to cool cyan) appear only in hero graphics, symbolizing convergence — code coming together in the cloud.

## Typography

The display typography is **aggressively large** — 80px headlines that cannot be ignored. This is not subtlety; it's a statement. The size creates an immediate hierarchy where the value proposition dominates before any other content. Subheadings in muted gray maintain separation without competition. The approach is "first impression is everything."

## Layout & Spacing

Vercel's layout philosophy is **maximum impact through subtraction**. Navigation stays minimal, content areas are wide (max-width 1280px), and spacing between sections is generous. The triangles from the logo appear as decorative elements, reinforcing brand recognition without adding visual noise. The page feels like a well-composed poem: every line earns its space.

## Elevation & Depth

Depth is achieved through subtle surface layer variations rather than shadows. The pure black background creates a void where content floats. Cards use slightly elevated surface containers (#111111 to #222222) creating a three-layer depth system. No drop shadows — the darkness itself creates separation.

## Shapes

The **triangle is the singular geometric motif** — Vercel's logo reincarnated as decorative element throughout the interface. Triangles converging from edges toward center suggest "deployment" — bringing code together into the cloud. The shape language is precise, mathematical, and distinctly "developer."

## Components

The component system uses a three-tier CTA hierarchy: gray outline (lowest) → white outline (middle) → black fill (primary). This visual weight progression guides user decision-making without words. Cards are understated with minimal padding. Input fields fade into the background until focused. The philosophy: **components should be invisible infrastructure until interaction is needed**.

## Do's and Don'ts

- **Do** use aggressive typography scale for hero sections — size creates authority
- **Do** reserve accent colors for conversion CTAs only — scarcity creates desire
- **Do** use brand geometric motifs (triangles, hexagons) as decorative elements
- **Do** maintain pure black backgrounds for developer-focused tools
- **Don't** use multiple accent colors — one color, one purpose
- **Don't** add decorative elements that don't serve brand recognition
- **Don't** clutter with information density; let headlines breathe
