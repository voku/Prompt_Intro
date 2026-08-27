# Methods Instead of Prompts

An interactive React + TypeScript + Vite presentation about office work, built on one idea: **stop writing a new prompt for every case. Write the method once, and let it build the work order for this case out of the material you attach.**

🔗 **Live Demo:** [https://voku.github.io/Prompt_Intro/](https://voku.github.io/Prompt_Intro/)

---

## The idea

A prompt is a filled-in instruction. It contains this supplier, this date, this file, page 3, 4,200 euro. It works once. Next week you rewrite 80 % of it and lose the 20 % that was actually your quality bar.

A method is the instruction that writes the instruction. You hand over the method plus today's material, and its **first** job is not to do the work:

```text
Pass 1   method + today's material  →  the work order for this case  →  STOP
                                        (you read half a page and correct it)
Pass 2   your go-ahead              →  it executes the work order it built
```

Why that is worth the extra pass:

- **The method survives.** It names no supplier, no date, no page number, so it still works when the names change. The specifics get re-derived from whatever arrives today.
- **Missing material surfaces before the work.** Everything the attachments do not contain shows up in the work order as UNKNOWN — not buried inside a finished document you have to unpick.
- **You review a work order, not an output.** Half a page instead of four.
- **Check and done-when stay separate.** How the result gets measured is one contract; which measured result is enough to stop is another. Merging them is how "looks fine" becomes "done".

---

## What the deck teaches

14 slides, one story, English and German throughout.

| # | Slide | The move it teaches |
|---|---|---|
| 2 | Yesterday's prompt is already waste | Everything specific in a prompt expires; the method never got written down |
| 3 | Two passes, and the first one is the whole trick | Build the work order, stop, let a human read it |
| 4 | What has to be in the work order | Goal · Material · Limits · Check · Done-when — filled in *by* the method, not by you |
| 5 | One prompt for one tender — or one method for all | The same job as a case prompt and as a method, plus the work order pass 1 produces |
| 6 | How you measure it is not when it is good enough | Check ≠ done-when |
| 7 | A checklist in the prompt is not a checklist that was met | Criteria are the requirement, never evidence that it is satisfied |
| 8 | Attaching a file is not permission to change it | Every attachment gets a role; roles are never upgraded |
| 9 | Five words that make an answer checkable | backed · derived · assumed · unknown · contradiction |
| 10 | Where a figure came from is half the answer | Provenance per figure; never average two sources that disagree |
| 11 | Playground | Is that a prompt or a method? |
| 12 | A floor is a floor, a quota produces fiction | Three *attempts*, not three findings — "no objections" is a valid result |
| 13 | Confidence is not proof | Not certainty, not earlier reasoning, not a step that was described but never done |
| 14 | The method is the deliverable | Build a small library; record whether each method actually helped |

Every comparison slide shows the same job twice: the **prompt for this one case** on the left, the **method that builds the work order** on the right. The left one is not a strawman — it is a good prompt with a shelf life of one week. Slide 5 expands to show what pass 1 actually produces from the method plus three attached offers.

---

## Where this comes from

The mechanics are the office translation of the operating-prompt work in two sibling repositories:

- [`voku/agent-recall-compiler`](https://github.com/voku/agent-recall-compiler) — the L1/L2 distinction this whole deck rests on. An **L2 recipe** is a reusable construction method and quality bar; an **L1 contract** is the concrete executable instruction (*Goal / Context / Constraints / Verification / Done When*) that the L2 pass builds from current evidence. Also: verification kept separate from the stopping condition, acceptance criteria as required outcomes rather than proof of satisfaction, context that is not edit permission, evidence states instead of confident prose, numeric floors that must not be weakened to manufacture success, and "a system that cannot represent uncertainty will eventually manufacture certainty".
- [`voku/agent-loop`](https://github.com/voku/agent-loop) — the workflow around it: bounded slices with a checkpoint after each, handoffs written for a worker with no access to the current chat, persisted evidence beating conversational memory.

Individual slides map to individual recipes: `adversarial-review` (slide 12), `discovery-first` (slide 9), `missingness-audit` and the L2 construction contract (slides 3–5), `evidence-report` (slide 13), `retry-stop` (slide 13). The engineering vocabulary is left behind; the mechanics are not.

---

## The playground

The check on slide 11 answers one question: **is this a prompt or a method?** It looks for six traits and reports what it finds:

1. **Two passes** — build the work order first, then stop
2. **Derived from the material** — the specifics come out of what is attached today
3. **Check and done-when kept apart**
4. **Missing stays missing** — UNKNOWN / "not regulated" / "not checkable" allowed as results
5. **No quota, no softening** — a clean result is valid; the bar is never lowered
6. **Material has a role** — what may be edited, what is read-only

It separately lists everything that **binds the text to one case** — a date, an amount, a file name, a page number, a person, a company — because that is exactly what will expire. It also flags filler in English and German, repeated instruction lines, requests for the model to *act* rather than prepare, requests for a guess (correctly ignoring the negated form, so "nicht schätzen" is treated as the good instruction it is), and data that probably should not be pasted into an unapproved tool.

**Length is not scored.** The check runs locally with no backend and no model call, and it remains a heuristic — not a substitute for looking at the actual result.

---

## Presentation usage

- **15 minutes:** slides 1–5, then 14
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
| `App.tsx` | App shell, navigation, language toggle, overview grid, timer |
| `constants.ts` | All 14 slides, English and German |
| `promptPresets.ts` | Playground examples, from one-off prompt to full method |
| `types.ts` | Shared TypeScript types |
| `iconUtils.ts` | Slide icon lookup with a fallback |
| `components/SlideLayout.tsx` | Slide renderer |
| `components/PromptComparison.tsx` | Case prompt vs. method, with the pass-1 work order panel |
| `components/InteractivePlayground.tsx` | Prompt-or-method check UI |
| `services/promptEvaluator.ts` | The six method traits, case-bound tokens, filler and risk signals |
| `implementation-notes.md` | Decisions, trade-offs and validation log |
| `.github/workflows/deploy.yml` | GitHub Pages workflow |

---

## Deploy to GitHub Pages

Every push to `main` triggers the GitHub Actions workflow, installs dependencies, builds the app, and publishes the result to GitHub Pages.

---

## Contributing

Pull requests and issues are welcome at:

👉 [https://github.com/voku/Prompt_Intro](https://github.com/voku/Prompt_Intro)
