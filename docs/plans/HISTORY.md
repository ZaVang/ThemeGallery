# Sprint History

## 2026-05-19: Sprint 0 ThemeGallery Workbench

- Built the local React/Vite workbench for Markdown theme and palette sources.
- Added parsing, YAML tolerance, palette-derived normalization, token reference resolution, CSS variable mapping, and real data loading through `import.meta.glob`.
- Added library search/type filters, Dashboard/Landing/Mobile/Components previews, and an inspector with token details, warnings, gradients, and Markdown notes.
- Verified with `npm test`, `npm run typecheck`, `npm run build`, and Playwright browser QA at `http://127.0.0.1:47822/`.

## 2026-05-20: Sprint 1 Save Palettes Into The Local Library

- Added a Vite dev-server-only `POST /api/palettes` path that validates generated palette Markdown and writes it into `assets/colors/*.md`.
- Made Palette Extractor's primary action save directly into the local library, with copy/download preserved as fallback actions.
- Added duplicate filename and invalid Markdown handling with recoverable UI messages.
- Verified save, reload, palette-derived preview visibility, duplicate handling, and desktop/mobile overflow with Playwright QA at `http://127.0.0.1:47822/`.

## 2026-05-20: Sprint 2 Compare Themes And Palettes Side By Side

- Added 2-4 item comparison selection from the theme library without replacing the normal single-theme selection flow.
- Added a comparison stage that renders the same Dashboard, Landing, Mobile, Components, or Color Card scene for every compared theme.
- Kept comparison cards compact with scene-specific responsive CSS so desktop columns and narrow mobile stacks remain readable.
- Verified Linear plus Soft Mauve comparison, all preview tabs, remove behavior, and desktop/mobile overflow with Playwright QA at `http://127.0.0.1:47822/`.

## 2026-05-20: Sprint 3 Readability And Risk Checks

- Added normalized theme risk summaries for text/background contrast, button contrast, weak surface layering, subtle accent colors, and too-similar semantic colors.
- Added Inspector risk sections that separate hard readability failures from softer design notes.
- Added risk badges to comparison cards so weak palettes remain usable but visible during side-by-side selection.
- Verified Soft Mauve risk display, comparison risk badges, and desktop/mobile overflow with Playwright QA at `http://127.0.0.1:47822/`.

## 2026-05-20: Sprint 4 Quick Brief Generator

- Added deterministic quick brief generation for selected full themes and palette-derived themes.
- Summarized visual direction, source/mood/tags, color roles, component cues, risk notes, and Markdown notes without LLM or network dependencies.
- Added the Quick Brief panel to the Inspector with wrapping monospace text for compact project reference use.
- Verified with focused Quick Brief and Inspector tests.

## 2026-05-20: Sprint 5 Color Role Mapping Panel

- Added a centralized role mapping panel to Palette Extractor for background, surface, primary, secondary, accent, text, and danger assignments.
- Added a small live derived preview so role changes show their UI effect before saving Markdown.
- Extended palette derivation so text and danger roles feed readable text and error tokens.
- Verified with focused Palette Extractor and palette derivation tests.

## 2026-05-20: Sprint 6 Usage Scenario Tags

- Added curated scenario tags for product contexts such as SaaS, AI tool, ecommerce, food/drink, wellness, minimal, dark, and glass.
- Let Palette Extractor save selected usage tags into palette Markdown frontmatter.
- Added a scenario filter to the library controls so growing palette collections can be narrowed by product intent.
- Verified with focused palette Markdown, Palette Extractor, and App filtering tests.
