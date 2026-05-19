# Pitfalls

- Existing Markdown frontmatter can contain duplicate YAML keys. Treat duplicate keys inside the same mapping as warnings and keep the last value, but do not treat repeated keys in separate list items as duplicates.
- Some token strings are invalid YAML unless wrapped, for example `padding: "{spacing.hero-height}" 0`. The parser should wrap mixed quoted scalars before passing them to YAML parsing.
- `gray-matter` expects `Buffer` at browser runtime. Keep the `buffer` polyfill in `src/data/parseTheme.ts` unless the parser is replaced with a browser-native frontmatter parser.
- Playwright can create `test-results/` and `playwright-report/`; keep these ignored.

