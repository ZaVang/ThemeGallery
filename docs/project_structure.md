# Project Structure

```text
.
├── docs/
│   ├── plans/                         Sprint contract, history, and pitfalls
│   └── superpowers/                   Original design spec and implementation plan
├── palettes/                          Lightweight palette Markdown sources
├── themes/                            Full theme Markdown sources
├── src/
│   ├── components/
│   │   ├── previews/                  Dashboard, Landing, Mobile, Components scenes
│   │   └── workbench/                 Library, filters, preview host, inspector
│   ├── data/                          Markdown parsing and Vite source loading
│   ├── test/                          Vitest setup
│   ├── theme/                         Token foundation, normalization, color math, CSS vars
│   ├── types/                         Shared theme model types
│   ├── App.tsx                        Workbench state and composition
│   ├── main.tsx                       React entry
│   └── styles.css                     Application and preview styling
├── index.html                         Vite HTML entry
├── package.json                       Scripts and dependencies
├── tsconfig.json                      TypeScript config
└── vite.config.ts                     Vite and Vitest config
```

