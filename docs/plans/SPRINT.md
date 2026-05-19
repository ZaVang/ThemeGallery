# Sprint 0: ThemeGallery Workbench

Source plan: `docs/superpowers/plans/2026-05-19-theme-gallery-implementation.md`

## Checklist

- [x] Confirm source Markdown assets are tracked and available.
- [x] Scaffold React, Vite, TypeScript, Vitest, and Testing Library.
- [x] Add shared theme types and neutral base foundation.
- [x] Add color utilities and palette-derived theme generation.
- [x] Add Markdown parsing, reference resolution, normalization, CSS variable mapping, and Vite data loading.
- [x] Add workbench library, search/filter controls, preview stage, preview scenes, and inspector.
- [x] Verify real data loading from `themes/*.md` and `palettes/*.md`.
- [x] Run acceptance commands.
- [x] Complete browser QA on the local dev server.
- [x] Update `docs/plans/HISTORY.md` and `docs/plans/pitfalls.md`.

## Acceptance Commands

```powershell
npm test
npm run typecheck
npm run build
```

## Browser QA

- Open the dev server on `http://127.0.0.1:47822/` or the alternate printed by Vite.
- Confirm Linear, Apple, Atmospheric Glass, and Soft Mauve render distinct readable previews.
- Confirm Dashboard, Landing, Mobile, and Components tabs switch without console errors.
- Confirm searching `linear` hides unrelated themes and keeps Linear visible.
- Confirm widths around `1440`, `1024`, and `390` remain usable without horizontal overflow.

## Result

SPRINT COMPLETE

