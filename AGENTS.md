# AGENTS.md

This file guides future coding agents working in this repository.

## Project Context

ThemeGallery is a local React/Vite theme workbench. It reads Markdown design assets from:

- `assets/designs/*.md`: full design specs with frontmatter tokens and Markdown guidance.
- `assets/colors/*.md`: lightweight color palettes, usually collected references, that should be derived into complete preview themes at runtime.
- `assets/typography/`, `assets/materials/`, `assets/radius/`, `assets/lighting/`, `assets/layouts/`, `assets/text/`, `assets/borders/`, `assets/shapes/`, and `assets/combinations/`: inspiration atoms and multi-dimensional combinations for browsing and future composition.

The product goal is to let the user click a theme or palette and see realistic UI previews before choosing a visual direction.

Reference docs:

- Design spec: `docs/superpowers/specs/2026-05-19-theme-gallery-design.md`
- Implementation plan: `docs/superpowers/plans/2026-05-19-theme-gallery-implementation.md`

## Working Style

- Do not use subagent-driven development by default. It was too slow for this project.
- Prefer direct inline implementation with clear checkpoints and frequent verification.
- Use subagents only if the user explicitly asks for them again.
- Do not stop at proposals when the user asks for implementation; make the change, verify it, and report the result.
- Keep changes scoped. Avoid unrelated refactors and metadata churn.
- Do not revert user changes. If the worktree is dirty, inspect and work around unrelated changes.

## Git and Worktrees

- Main implementation branch prefix should be `codex/`.
- If isolation is needed, use `.worktrees/`; it is intentionally ignored.
- The current ignored local-only directories are `.superpowers/` and `.worktrees/`.
- Do not commit `node_modules/`, build output, or local companion/mockup artifacts.
- `assets/` is the project source asset root, not a scratch folder.

## Product Scope

First version is local-only:

- React + Vite + TypeScript.
- No backend service.
- No browser editing or saving Markdown.
- No production runtime folder scanning.
- No AI theme generation.
- No export pipeline for Tailwind/CSS/token packages.
- No side-by-side comparison board in v1.

Preview tabs for v1:

- `Dashboard`
- `Landing`
- `Mobile`
- `Components`

Workbench layout:

- Left: theme/palette library with search and type filters.
- Center: preview stage using CSS variables.
- Right: inspector for colors, typography, spacing, components, warnings, and Markdown notes.

## Theme Data Rules

- Read Markdown as raw text using Vite `import.meta.glob`.
- Parse frontmatter with `gray-matter`.
- Keep Markdown body for inspector display.
- Ignore `assets/designs/tailwind.css` as a theme input; treat it as an export artifact.
- Normalize all inputs into one `NormalizedTheme` model.
- Full design files mostly preserve provided tokens.
- Color palette files become `palette-derived` themes at runtime.
- Palette-derived themes use a neutral `Base UI Foundation` for typography, spacing, rounded tokens, and components.
- Palette roles map roughly as:
  - `background` -> `background`, `surface-dim`
  - `surface` -> `surface`, `surface-container`
  - `primary` -> `primary`
  - `secondary` -> `secondary`
  - `accent` -> `tertiary`
- Missing fields should create visible warnings, not crashes.
- Component references like `{colors.primary}` and `{typography.label-sm}` should be resolved at normalization time.

## UI and Styling Rules

- Use plain CSS and CSS variables first. Do not introduce a heavy UI framework.
- Preview components should consume CSS variables, not read theme objects directly.
- Inspector can read the normalized theme object.
- Keep `App.tsx` as composition and state glue, not a large implementation file.
- Keep preview scenes and workbench components in separate focused files.
- Use stable responsive layouts. At mobile widths, stack library, stage, and inspector vertically.
- Avoid text overlap and horizontal overflow.
- Do not make a marketing landing page as the app shell; build the actual workbench.

## Dependencies and Known Plan Correction

The original implementation plan used `vitest: ^2.1.8` with `defineConfig` from `vitest/config`. In practice this can install a nested Vite version under Vitest and create a TypeScript plugin type conflict with `@vitejs/plugin-react`.

Use one of these corrected approaches:

- Preferred: use `vitest: ^3.2.4` with `import { defineConfig } from 'vitest/config'`.
- Acceptable if dependency resolution still conflicts: export the config object directly, but document the reason and keep `npm run typecheck` passing.

Also add `node_modules/` to `.gitignore` when scaffolding the app.

## Verification

For implementation work, run the strongest available relevant checks:

```powershell
npm test
npm run typecheck
npm run build
```

For focused tasks, run the relevant test file first, then broaden verification before final handoff.

When launching the local app, avoid common ports like `3000`, `5173`, and `8080`. Prefer:

- Dev: `47822`
- Preview: `47823`
- Alternate: `47824`

Browser QA should cover:

- Linear: dark, purple-accented theme.
- Apple: light, blue-accented theme.
- Atmospheric Glass: alpha/glass-style surfaces.
- Soft Mauve: palette-derived theme.
- Dashboard, Landing, Mobile, and Components tabs.
- Search filtering.
- Desktop and narrow mobile widths.
