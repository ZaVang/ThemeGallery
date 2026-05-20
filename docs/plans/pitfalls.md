# Pitfalls

- Existing Markdown frontmatter can contain duplicate YAML keys. Treat duplicate keys inside the same mapping as warnings and keep the last value, but do not treat repeated keys in separate list items as duplicates.
- Some token strings are invalid YAML unless wrapped, for example `padding: "{spacing.hero-height}" 0`. The parser should wrap mixed quoted scalars before passing them to YAML parsing.
- `gray-matter` expects `Buffer` at browser runtime. Keep the `buffer` polyfill in `src/data/parseTheme.ts` unless the parser is replaced with a browser-native frontmatter parser.
- Playwright can create `test-results/` and `playwright-report/`; keep these ignored.
- Sprint materialization should accept the heading level used by `docs/plans/FUTURE.md`. The current roadmap uses `## Sprint N: ...`; older scripts may only match `### Sprint N: ...`.
- Browser code cannot write local Markdown files by itself. Keep direct palette saving behind local Vite dev middleware, validate the target path stays inside `assets/colors/`, and treat duplicate-save `409` console errors as expected during negative-path QA.
- Full preview scenes are wider than comparison cards by default. Comparison mode needs scoped CSS overrides for Dashboard, Landing, Mobile, Components, and Color Card scenes to avoid horizontal overflow.
- Risk checks should distinguish hard WCAG-style contrast failures from softer design notes. Palette-derived themes should stay previewable even when risks are present, otherwise collected color cards feel broken instead of reviewable.
