# ThemeGallery

ThemeGallery is a local theme gallery and preview workbench for design-system Markdown files.

It collects complete theme specs from `themes/` and lightweight color palettes from `palettes/`, then turns them into previewable UI themes. The goal is to make visual direction choices by seeing realistic product surfaces, not by reading token files in isolation.

## Project Status

The first local workbench is implemented. It loads Markdown sources from `themes/` and `palettes/`, normalizes them into previewable themes, and renders Dashboard, Landing, Mobile, and Components previews.

## Repository Structure

```text
themes/                     Full theme Markdown specs
palettes/                   Lightweight palette Markdown specs
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

Full themes live in `themes/*.md` and should use frontmatter for structured tokens:

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

## Palette Files

Palettes live in `palettes/*.md` and can stay lightweight:

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
