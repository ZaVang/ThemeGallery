---
name: Stripe
colors:
  surface: "#ffffff"
  surface-dim: "#f7f7f7"
  surface-bright: "#ffffff"
  surface-container-lowest: "#ffffff"
  surface-container-low: "#fafafa"
  surface-container: "#ffffff"
  surface-container-high: "#f5f5f5"
  surface-container-highest: "#eeeeee"
  on-surface: "#1a1a1a"
  on-surface-variant: "#6b7280"
  inverse-surface: "#1a1a1a"
  inverse-on-surface: "#ffffff"
  outline: "#e5e5e5"
  outline-variant: "#d1d5db"
  surface-tint: "#635BFF"
  primary: "#635BFF"
  on-primary: "#ffffff"
  primary-container: "#e8e5ff"
  on-primary-container: "#1a1a1a"
  inverse-primary: "#ffffff"
  secondary: "#00D4FF"
  on-secondary: "#1a1a1a"
  secondary-container: "#e0f7ff"
  on-secondary-container: "#1a1a1a"
  tertiary: "#10B981"
  on-tertiary: "#ffffff"
  tertiary-container: "#d1fae5"
  on-tertiary: "#1a1a1a"
  error: "#DC2626"
  on-error: "#ffffff"
  error-container: "#fee2e2"
  on-error-container: "#991b1b"
  background: "#ffffff"
  on-background: "#1a1a1a"
  surface-variant: "#f8f8f8"
typography:
  display-lg:
    fontFamily: Cereal
    fontSize: 56px
    fontWeight: "300"
    lineHeight: 64px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Cereal
    fontSize: 32px
    fontWeight: "300"
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Cereal
    fontSize: 24px
    fontWeight: "400"
    lineHeight: 32px
  body-lg:
    fontFamily: Cereal
    fontSize: 18px
    fontWeight: "400"
    lineHeight: 28px
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
  container-padding: 32px
  card-gap: 20px
  section-margin: 48px
  sidebar-width: 256px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.sm}"
    height: 44px
    padding: 0 24px
  button-primary-hover:
    backgroundColor: "#7a73ff"
  button-ghost:
    backgroundColor: transparent
    textColor: "{colors.primary}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.sm}"
    border: 1px solid "{colors.outline}"
    height: 44px
    padding: 0 24px
  card-standard:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.md}"
    padding: 24px
    shadowColor: "rgba(99, 91, 255, 0.08)"
    shadowSpread: 0
    shadowBlur: 16px
  card-elevated:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.md}"
    padding: 24px
    shadowColor: "rgba(99, 91, 255, 0.12)"
    shadowSpread: 0
    shadowBlur: 24px
  input-field:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    typography: "{typography.body-md}"
    rounded: "{rounded.sm}"
    border: 1px solid "{colors.outline}"
    padding: 14px 16px
    height: 44px
  input-field-focus:
    borderColor: "{colors.primary}"
    shadowColor: "rgba(99, 91, 255, 0.15)"
    shadowBlur: 8px
  sidebar:
    backgroundColor: "{colors.surface-dim}"
    textColor: "{colors.on-surface}"
    width: "{spacing.sidebar-width}"
    padding: 20px
  list-item-interactive:
    backgroundColor: transparent
    textColor: "{colors.on-surface}"
    rounded: "{rounded.sm}"
    padding: 12px 16px
  list-item-interactive-hover:
    backgroundColor: "{colors.surface-container-low}"
  status-succeeded:
    backgroundColor: "{colors.tertiary-container}"
    textColor: "{colors.on-tertiary}"
  status-failed:
    backgroundColor: "{colors.error-container}"
    textColor: "{colors.error}"
  status-pending:
    backgroundColor: "#fef3c7"
    textColor: "#92400e"
---

## Brand & Style

Stripe Dashboard represents the apex of **financial-grade trust design**. The interface communicates security, precision, and elegance through a "refined luxury" philosophy — pure white backgrounds, Signature Purple accents, and the kind of restraint that says "everything is under control." The visual language answers one question above all others: "Is my money safe here?" Every design decision reinforces the answer: yes.

## Colors

The Signature Purple (#635BFF) appears strategically — on primary CTAs, important data highlights, and brand moments. The pure white background (#FFFFFF) is not sterile but confident — it says "our data is transparent, our system is clean." Blue-tinted shadows (rather than gray) create brand cohesion while giving cards a floating, secure quality. Status colors are deliberately muted — users see these frequently, and high-saturation reds/greens would create anxiety rather than clarity.

## Typography

The ultra-light 300-weight headlines (Cereal font) are a deliberate choice that communicates **lightweight confidence**. Stripe doesn't need bold type to assert presence; the refinement speaks for itself. Body text returns to comfortable 400-500 weights for readability. The effect is "effortless competence" — the dashboard handles complexity so you don't have to strain.

## Layout & Spacing

Generous whitespace is Stripe's signature visual feature. Information density is carefully balanced — enough to feel comprehensive, never crowded. The sidebar navigation uses consistent 256px width, and content areas breathe with 32px padding. The overall feeling is **composed clarity** — every element has room to exist without competition.

## Elevation & Depth

Stripe's shadow system is its most distinctive elevation technique. Cards use multi-layered shadows with a subtle blue-purple tint rather than neutral grays. This creates a floating quality that reinforces the brand while maintaining clear hierarchy. The shadows are never harsh — they're translucent whispers that suggest security, not weight.

## Shapes

Border radius stays conservative (4-8px) across all components, reflecting the financial sector's need for **professional restraint**. Rounded enough to feel modern and approachable, sharp enough to convey seriousness. No playful extremes; geometry serves trust.

## Components

The component system emphasizes clarity and confidence. Primary buttons use full Signature Purple fill. Secondary actions use outlined ghost buttons. Cards float with brand-tinted shadows. Input fields have subtle borders that glow purple on focus. The FocusView pattern hides distractions during critical tasks — a "flow state" mode that strips the interface to essentials.

## Do's and Don'ts

- **Do** use ultra-light typography weights for headlines to convey refinement and confidence
- **Do** implement blue/purple-tinted shadows to maintain brand consistency in elevation
- **Do** use skeleton loading states for data-heavy interfaces — users see progress, not waiting
- **Do** implement FocusView/task-focused modes for complex operations
- **Don't** use high-saturation status colors — muted tones reduce anxiety in frequent-use interfaces
- **Don't** sacrifice whitespace for information density; trust requires breathing room
