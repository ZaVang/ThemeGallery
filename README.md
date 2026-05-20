# ThemeGallery

ThemeGallery is a local visual asset gallery and preview workbench for design-system Markdown files.

It collects complete design specs from `assets/designs/`, color palettes from `assets/colors/`, and smaller inspiration atoms from the other `assets/*` folders. Designs and colors are turned into previewable UI themes. The goal is to make visual direction choices by seeing realistic product surfaces, not by reading token files in isolation.

## Project Status

The first local workbench is implemented. It loads Markdown sources from `assets/designs/` and `assets/colors/`, normalizes them into previewable themes, and renders Dashboard, Landing, Mobile, and Components previews.

## Repository Structure

```text
assets/designs/             Full design Markdown specs
assets/colors/              Lightweight color palette Markdown specs
assets/typography/          Typography inspiration atoms
assets/materials/           Material inspiration atoms
assets/radius/              Radius inspiration atoms
assets/lighting/            Lighting inspiration atoms
assets/layouts/             Layout inspiration atoms
assets/text/                Text and microcopy inspiration atoms
assets/borders/             Border inspiration atoms
assets/shapes/              Shape inspiration atoms
assets/combinations/        Multi-dimensional inspiration combinations
docs/superpowers/specs/     Product and technical design specs
docs/superpowers/plans/     Implementation plans
src/                        React workbench, parser, normalizer, and previews
AGENTS.md                   Instructions for future coding agents
```

## Intended App

The first app version is a local React + Vite workbench with:

- A left-side library of themes and palettes.
- A center preview stage with `Dashboard`, `Landing`, `Mobile`, and `Components` tabs.
- A right-side inspector for colors, typography, spacing, component tokens, warnings, and Markdown notes.

Palette files are not expected to contain full design-system tokens. They should be derived into complete themes at runtime using a neutral base foundation.

## Theme Files

Full designs live in `assets/designs/*.md` and should use frontmatter for structured tokens:

```md
---
name: Linear
colors:
  background: "#1a1a1a"
  primary: "#5E6AD2"
typography:
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: "400"
    lineHeight: 24px
---

## Brand & Style
Design notes go here.
```

## Color Files

Color palettes live in `assets/colors/*.md` and can stay lightweight:

```md
---
name: Soft Mauve
tags: [soft, mauve, pastel]
mood: 柔和雅致
colors:
  - name: Alice Blue
    hex: "#F0F8FF"
    role: background
  - name: Pale Slate
    hex: "#B8A9C9"
    role: primary
---

## 感受
Palette notes go here.
```

## Development Notes

See `AGENTS.md` before implementing. It records the current project conventions, known dependency caveats, local ports, and verification expectations.

Install and run:

```powershell
npm install
npm run dev
```

Verify:

```powershell
npm test
npm run typecheck
npm run build
```

Preferred local ports:

- Dev server: `47822`
- Preview server: `47823`
- Alternate: `47824`

## License

MIT. See `LICENSE`.
