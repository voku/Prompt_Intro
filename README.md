# Prompting at Work

An interactive React + TypeScript + Vite presentation about **prompting for everyday office work** — mails, meeting minutes, long documents, figures, lists, plans and handovers.

The point is not "write a bigger prompt". A good prompt is a **short, honest work instruction**: say what should exist at the end, hand over the material, name the red line, describe the form, and allow "I don't know". Some tasks need one sentence. A figure that ends up in a budget meeting needs a visible calculation and a source.

🔗 **Live Demo:** [https://voku.github.io/Prompt_Intro/](https://voku.github.io/Prompt_Intro/)

---

## Core thesis

- The model is fast and fluent, has never seen your files, does not really calculate, and almost never says "no idea".
- Quality is fit, not length. A one-liner can score full marks; a 200-word wish list can be worthless.
- The examples are the ones people actually recognise: the Friday-afternoon customer mail, the 43-page PDF that arrived at 17:55, the list three people maintained, the handover before your holiday.
- The "bad" side of every comparison is what people really type, not a strawman.
- The model prepares work. Sending, booking, approving and signing stay with a human who has a name.

---

## Target audience

- Anyone who works with mails, documents, minutes, lists, figures and deadlines
- Assistants, project and office coordination, purchasing, finance, HR administration, team leads
- People who have to hand work over to somebody who was in none of the meetings
- Anyone who should understand that a good prompt is a work instruction, not a magic sentence

Explicitly **not** a developer or IT-service-management deck. There is no code, no ticket workflow, and no toolchain in the examples.

---

## Features

- 📊 **Two bilingual 14-slide decks**:
  - **Everyday Office Work** — mails, minutes, long documents, tone, tables, cutting, second-pair-of-eyes
  - **Numbers, Plans & Handovers** — offers, data cleaning, projections, plan review, series work, handovers, status reports, gap checks
- ⚖️ Side-by-side comparisons: *what people actually type* vs. *what makes it usable*
- 🔢 Visible word counts, because the better version is sometimes the shorter one
- 🧪 **Mode-aware local prompt check** with no backend and no model call
- 🚫 Filler detection in English **and** German ("sei besonders gründlich", "vergiss nichts Wichtiges")
- 🛡️ Warnings for data that needs protection, for asking the model to act instead of prepare, and for asking it to guess
- 🌐 English and German content throughout
- ⌨️ Keyboard and swipe navigation, slide overview grid, session timer, responsive layout
- 🚀 GitHub Pages deployment with the `/Prompt_Intro/` base path preserved

---

## The two decks

### Everyday Office Work (`desk`)

The five lines that rescue almost any prompt — **job, material, limits, form, done-when** — taught through the situations they belong to:

- the customer mail written at 16:40 on a Friday, where the model invents a reason for the delay
- minutes that answer "who does what by when" instead of producing a summary
- four questions with a quote each, instead of a summary of 43 pages
- a table with a visible calculation, because the model writes numbers rather than calculating them
- tone as a list of what may and may not be said
- a table you can paste into Excel, with "leave the cell empty" as the anti-invention rule
- a review that has to quote the sentence it criticises and is allowed to find nothing
- cutting, where "make it better" reliably makes it longer

### Numbers, Plans & Handovers (`decisions`)

The sixth line — **evidence** — and the three labels **backed / assumed / unknown**:

- comparing three offers against your criteria instead of asking which is "best"
- cleaning a list by explicit rules, with a count of what was changed
- a projection with named assumptions, three scenarios, and the figure that is still missing
- a plan treated as a draft floor, with permission to answer "the plan holds"
- 60 responses in blocks of 10, with a count and a stop after each block
- a handover written for somebody who was in none of the meetings and cannot read the chat
- a status report where nothing is green without the rule that made it green
- a gap check that looks for the missing owner, not for style

Both decks end on the same boundary: the model prepares, a human decides.

---

## Where the method comes from

The prompt shape used throughout is the office translation of the operating-prompt work in two sibling repositories:

- [`voku/agent-recall-compiler`](https://github.com/voku/agent-recall-compiler) — the *Goal / Context / Constraints / Verification / Done When* contract, the separation of verification from the stopping condition, evidence states instead of confident prose, the first-draft falsification lens, and recipes such as `plan-as-draft`, `continue-until-done`, `evidence-report`, `missingness-audit`, `retry-stop` and `production-ready-handoff`.
- [`voku/agent-loop`](https://github.com/voku/agent-loop) — the workflow skills around it: bounded slices with a checkpoint after each one, handoffs written for a worker with no access to the current chat, and the rule that persisted evidence beats conversational memory.

The engineering vocabulary is deliberately left behind; the mechanics are not.

---

## The prompt check

The playground checks a prompt for six lines — **job, material, limits, form, stopping point, evidence** — and looks for the instruction rather than a keyword ritual: `max. 120 Wörter` counts as a form instruction even when nobody wrote "format" above it.

It also flags:

- filler and process theatre in both languages ("think step by step", "sei besonders gründlich")
- repeated instruction lines
- hedge words
- data that probably should not be pasted into an unapproved tool
- prompts that ask the model to **act** (send, book, approve, sign) rather than prepare
- prompts that ask for a guess — while correctly ignoring the negated form, so "nicht schätzen" is treated as the good instruction it is
- in the numbers deck: figures without a visible calculation or a source

**Length is not scored.** Pasted material inside quotes is treated as data, not as instruction, so the customer's own wording does not trigger warnings. It stays a local heuristic, not a model and not a substitute for looking at the actual result.

---

## Presentation usage

- **15 minutes:** slides 1, 2, 3, 4, 7 and 14
- **30 minutes:** slides 1–10, then 13 and 14
- **45 minutes:** the full deck including the playground

---

## Run locally

**Prerequisites:** Node.js ≥ 18

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Validation scripts

```bash
npm run typecheck
npm run build
```

The production build writes static output to `dist/` and keeps the public GitHub Pages base path at `/Prompt_Intro/`.

---

## Project structure

| File / Directory | Purpose |
|---|---|
| `App.tsx` | App shell, navigation, deck switch, language toggle, overview, timer |
| `constants.ts` | All slide content for both decks, EN and DE |
| `promptPresets.ts` | Playground examples per deck and language |
| `types.ts` | Shared TypeScript types |
| `iconUtils.ts` | Slide icon lookup with a fallback |
| `components/SlideLayout.tsx` | Slide renderer |
| `components/PromptComparison.tsx` | Side-by-side comparison with word counts |
| `components/InteractivePlayground.tsx` | Local prompt-check UI |
| `services/promptEvaluator.ts` | The six line checks, risk and data signals |
| `services/taskFitEvaluator.ts` | Filler and repetition detection on top |
| `implementation-notes.md` | Decisions, trade-offs and validation log |
| `.github/workflows/deploy.yml` | GitHub Pages workflow |

---

## Deploy to GitHub Pages

Every push to `main` triggers the GitHub Actions workflow, installs dependencies, builds the app, and publishes the result to GitHub Pages.

---

## Contributing

Pull requests and issues are welcome at:

👉 [https://github.com/voku/Prompt_Intro](https://github.com/voku/Prompt_Intro)
