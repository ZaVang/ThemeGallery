# Future Sprints

## Sprint 0: ThemeGallery Workbench

Source plan: `docs/superpowers/plans/2026-05-19-theme-gallery-implementation.md`

Build the first local React/Vite workbench that reads `themes/*.md` and `palettes/*.md`, normalizes them into previewable themes, and renders realistic Dashboard, Landing, Mobile, and Components previews.

## Sprint 1: Save Palettes Into The Local Library

Goal: turn the Palette Extractor from a temporary helper into the main ingestion flow.

- Add a local save path that writes generated palette Markdown into `palettes/*.md`.
- Keep the current copy/download fallback, but make direct local save the primary path during development.
- Validate duplicate file names and invalid Markdown before writing.
- Refresh or update the in-app library after saving so the new palette can be previewed without manual steps when practical.
- Keep this local-only; no cloud sync, accounts, or hosted backend.

Acceptance:

- User can upload a Xiaohongshu color card, adjust names/HEX/roles, save it into `palettes/`, and see it as a palette-derived theme.
- Saved files follow the existing palette Markdown schema.
- Invalid or duplicate saves show a clear recoverable message.

## Sprint 2: Compare Themes And Palettes Side By Side

Goal: help choose a visual direction before vibe coding.

- Allow selecting 2-4 themes/palettes for comparison.
- Show the same preview scene across all selected items.
- Support at least Dashboard, Landing, Mobile, Components, and Color Card comparison.
- Keep controls compact so comparison remains readable on desktop.
- Mobile can stack comparison cards vertically instead of forcing columns.

Acceptance:

- User can compare multiple candidates using the same scene and quickly remove/add candidates.
- No text overlap or horizontal overflow at common desktop and mobile widths.

## Sprint 3: Readability And Risk Checks

Goal: identify palettes that look good as images but fail as UI themes.

- Compute contrast checks for core text/background and button pairs.
- Flag weak surface layering, low contrast accents, and too-similar semantic colors.
- Show risks in the Inspector and optionally in comparison cards.
- Distinguish hard failures from softer design notes.

Acceptance:

- Each normalized theme exposes a readable risk summary.
- The UI explains what needs attention without making automatically-derived palettes look broken.

## Sprint 4: Quick Brief Generator

Goal: turn a selected visual direction into a compact local reference before vibe coding.

- Generate a small deterministic quick brief from the selected theme or palette-derived theme.
- Do not depend on LLM calls or network services.
- Focus on visual direction, color roles, component cues, and risk notes.
- Keep the brief concise because full `design.md` files can already be copied into target projects directly.

Acceptance:

- User can select a palette/theme and see a compact quick brief in the workbench.
- The brief reflects palette-derived roles, theme-specific notes, and risk warnings without pretending to be a full design spec.

## Sprint 5: Color Role Mapping Panel

Goal: make palette-to-theme derivation more intentional.

- Upgrade role editing beyond simple select fields.
- Make background, surface, primary, secondary, accent/tertiary, text, and danger roles easy to assign.
- Show immediate effect on preview colors.
- Preserve the role mapping when saving palette Markdown.

Acceptance:

- User can correct automatic role guesses before saving.
- Derived previews update predictably from the edited role mapping.

## Sprint 6: Usage Scenario Tags

Goal: make a growing palette collection searchable by product intent.

- Add curated scenario tags such as SaaS, AI tool, ecommerce, food/drink, wellness, beauty, portfolio, editorial, luxury, retro, playful, minimal, dark, and glass.
- Let saved palettes store scenario tags in Markdown frontmatter.
- Add filters/search affordances for scenario tags.
- Keep this focused on retrieval, not ratings or collection management.

Acceptance:

- User can tag palettes by use case and filter the library before choosing a visual direction.
