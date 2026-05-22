# Implementation notes

## Decisions made because the spec was incomplete

- Chose **Option B** for the playground and implemented a local prompt-quality evaluator instead of a fake model response, because it keeps the feature honest and requires no backend service.
- Kept the deck as **14 slides** so the narrative stays focused while still covering all required examples, the playground, and the final control loop.
- Reframed chain-of-thought material into **named passes, assumptions, validation, and concise reasoning summaries** instead of exposing hidden reasoning.

## Stale documentation found

- `README.md` described the deck as **10 slides** while the actual slide data already contained more slides.
- The old README and metadata positioned the project as a general prompt-engineering deck, which no longer matched the stronger operational-prompting content in the repository.
- The previous playground service simulated a model response, latency, and token counts even though no real model call was happening.

## Content trade-offs

- Reduced generic prompt-engineering coverage and centered the deck on developer workflows: bug fixing, legacy migration, SQL debugging, PR review, structured output, tests, and repo state updates.
- Kept bilingual EN/DE support directly in slide data rather than splitting translations into separate files to preserve the existing repository pattern.
- Kept the optional expanded `vokuprompt` comparison panel because it helps show a stronger operational version without increasing the default visual density of every slide.

## Technical trade-offs

- Added a dedicated `PLAYGROUND` slide type instead of overloading `CONTENT`, which keeps rendering logic explicit and avoids brittle per-slide conditionals.
- Added a lightweight local evaluator service instead of introducing backend calls or new heavy dependencies.
- Tightened TypeScript settings conservatively (`strict`, `noUnusedLocals`, `noUnusedParameters`, `noFallthroughCasesInSwitch`) and removed `any` usage in icon lookup paths.

## Intentionally unchanged behavior

- Kept the GitHub Pages deployment workflow and the `/Prompt_Intro/` base path unchanged.
- Kept EN/DE language support, keyboard navigation, swipe navigation, slide overview, timer, and responsive layout.
- Kept the app as a static React + TypeScript + Vite presentation without adding a backend or larger framework.

## Validation log

### Baseline before changes

```text
$ npm install
added 69 packages, and audited 70 packages in 3s

9 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities

$ npm run build
> prompt-engineering-guide@0.0.0 build
> vite build

vite v6.4.2 building for production...
transforming...
✓ 1746 modules transformed.
rendering chunks...
computing gzip size...
dist/assets/favicon-C5OxlRER.svg      0.69 kB │ gzip:   0.28 kB
dist/index.html                       2.37 kB │ gzip:   0.91 kB
dist/assets/index-DYCVjhde.js     1,146.04 kB │ gzip: 244.96 kB

(!) Some chunks are larger than 500 kB after minification. Consider:
- Using dynamic import() to code-split the application
- Use build.rollupOptions.output.manualChunks to improve chunking: https://rollupjs.org/configuration-options/#output-manualchunks
- Adjust chunk size limit for this warning via build.chunkSizeWarningLimit.
✓ built in 3.02s

$ npx tsc --noEmit
```

### Final validation after changes

_To be filled after the final validation run._

```text
$ npm run typecheck
> prompt-engineering-guide@0.0.0 typecheck
> tsc --noEmit

$ npm run build
> prompt-engineering-guide@0.0.0 build
> vite build

vite v6.4.2 building for production...
transforming...
✓ 1748 modules transformed.
rendering chunks...
computing gzip size...
dist/assets/favicon-C5OxlRER.svg      0.69 kB │ gzip:   0.28 kB
dist/index.html                       2.42 kB │ gzip:   0.88 kB
dist/assets/index-BNaGSnUn.js     1,150.27 kB │ gzip: 244.65 kB

(!) Some chunks are larger than 500 kB after minification. Consider:
- Using dynamic import() to code-split the application
- Use build.rollupOptions.output.manualChunks to improve chunking: https://rollupjs.org/configuration-options/#output-manualchunks
- Adjust chunk size limit for this warning via build.chunkSizeWarningLimit.
✓ built in 3.14s
```
