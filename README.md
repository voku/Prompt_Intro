# From Prompts to Methods

An interactive React + TypeScript + Vite presentation about making recurring LLM-assisted work reusable, reviewable, and evidence-based.

It is designed as a practical **Part 2** to [`voku/LLM`](https://github.com/voku/LLM): the earlier deck explains what LLMs are and what they can do; this deck starts where that one stops and asks how useful work becomes repeatable without turning every request into a giant prompt.

🔗 **Live Demo:** [https://voku.github.io/Prompt_Intro/](https://voku.github.io/Prompt_Intro/)

---

## The idea

A direct prompt is not bad. For a small one-off task it may be exactly the right tool.

The problem starts when the same kind of work comes back: a supplier comparison, a sign-off check, a projection, a handover, a review. The prompt then contains two different things mixed together:

- the **case**: this supplier, this date, this file, page 3, 4,200 euro;
- the **quality bar**: how facts are derived, what may not be changed, how results are checked, and when the work is actually done.

For recurring or consequential work, keep the quality bar as a reusable **method** and derive the case-specific work order from the material that arrives today:

```text
Pass 1   reusable method + today's material  →  work order for this case  →  STOP
                                                  (human reads/corrects it)
Pass 2   explicit go-ahead                   →  execute that work order
```

That extra construction pass is not a ritual for every tiny task. It is useful when reuse, reviewability, handoff, or risk justifies separating **construction** from **execution**.

Why it helps:

- **The quality bar survives.** Supplier, date and page number stay in the material rather than leaking into the reusable method.
- **Missing material surfaces before execution.** `UNKNOWN` means the material does not contain the answer. `BLOCKED` means required evidence, access, or authority cannot currently be obtained.
- **You review the work order before the output exists.** Correct half a page instead of unpicking four finished pages.
- **Check and done-when stay separate.** How reality is measured and which observed result is good enough are different contracts.

---

## What the deck teaches

14 slides, one story, English and German throughout. German is the default language for presentation use.

| # | Slide | The move it teaches |
|---|---|---|
| 1 | From prompts to methods | Continuation from basic LLM usage to repeatable work |
| 2 | Case-specific prompts expire | Separate changing case facts from the reusable quality bar |
| 3 | Two passes for reusable methods | Direct prompts remain valid; reusable methods separate construction from execution |
| 4 | What has to be in the work order | Goal · Material · Limits · Check · Done-when |
| 5 | One prompt for one tender — or one method for all | Same job as a case prompt and as a reusable method, plus the generated work order |
| 6 | How you measure it is not when it is good enough | Check ≠ done-when; unavailable verification becomes `BLOCKED` |
| 7 | A checklist in the prompt is not a checklist that was met | Criteria are requirements, never proof that they are satisfied |
| 8 | Attaching a file is not permission to change it | Every attachment has a role; context does not silently grant edit permission |
| 9 | Six evidence states | verified · inferred · assumed · unknown · blocked · contradicted |
| 10 | Where a figure came from is half the answer | Provenance per figure; never average disagreeing sources into a third invented number |
| 11 | Playground | Distinguish a direct prompt, reusable rules, and a real method |
| 12 | A floor is a floor, a quota produces fiction | Three attempts, not three mandatory findings |
| 13 | Confidence is not proof | Confidence, earlier reasoning, consensus and unexecuted checks are not verification |
| 14 | The reusable method is the deliverable | Build a small library only where repeated work earns it |

Every comparison slide shows the same job twice: the **prompt for this one case** on the left, the **method that constructs the work order** on the right. The left side is deliberately not a strawman. It can be a perfectly good one-off prompt.

---

## Where this comes from

The mechanics are an office-friendly translation of the operating-prompt work in two sibling repositories:

- [`voku/agent-recall-compiler`](https://github.com/voku/agent-recall-compiler) — distinguishes an **L2 recipe** (reusable construction method and quality bar) from an **L1 contract** (concrete executable instruction for the current task). Direct L1 contracts remain valid; L2 is an optional construction layer for reusable task-specific contracts.
- [`voku/agent-loop`](https://github.com/voku/agent-loop) — contributes the workflow ideas around bounded work, checkpoints, evidence, handoff, retries and explicit authority.

The deck keeps the important distinctions from those sources:

- verification is not done-when;
- acceptance criteria are requirements, not evidence of success;
- context is not edit permission;
- `UNKNOWN` and `BLOCKED` are different states;
- confidence and previous reasoning are not verification;
- numeric floors must not become finding quotas;
- using a method does not prove that the method was useful.

---

## The playground

Slide 11 asks a deliberately narrower question than a generic "prompt score": **is this direct case text, reusable rules, or a reusable construction method?**

It looks for six method traits:

1. **Construction pass first** — for a reusable method, build the case-specific work order and stop before execution.
2. **Derived from the material** — case facts come from current material rather than being baked into the reusable method.
3. **Check and done-when kept apart.**
4. **Missing or blocked stays visible** — `UNKNOWN` and `BLOCKED` are valid outcomes rather than invitations to invent prose.
5. **No quota, no softening** — a clean result is valid; requirements are not weakened to manufacture success.
6. **Material has a role** — read-only context and editable targets remain distinguishable.

It separately lists case-bound tokens such as dates, amounts, file names, page numbers, people and companies.

### Instruction layer vs. source material

The evaluator does **not** treat explicitly quoted or fenced source material as instructions. A pasted email can contain the words "Pass 1", a company name and a date without magically turning the surrounding prompt into a reusable method. Filler, action and invention checks use the instruction layer; sensitive-data warnings still inspect the full pasted text because sensitive data remains sensitive even when correctly quoted.

A dedicated adversarial preset demonstrates this boundary.

**Length is not scored.** The playground is a local heuristic with no backend and no model call. It is a teaching instrument, not proof that a method is actually useful.

---

## Presentation usage

For a Teams presentation to colleagues who already saw the earlier `voku/LLM` deck:

- **15 minutes:** slides 1–5, then 9, 13 and 14.
- **25–30 minutes:** slides 1–10, then 13 and 14.
- **45 minutes:** full deck including the playground and discussion.

The first sentence can be simple: *"Letztes Mal ging es darum, was LLMs können. Heute geht es nicht um ein neues Modell, sondern darum, wie aus einzelnen guten Chats wiederholbare Arbeit wird."*

---

## Run locally

**Prerequisites:** Node.js ≥ 18

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Validation

```bash
npm run typecheck
npm run build
```

Pull requests run both checks through `.github/workflows/ci.yml`. Pushes to `main` build and publish the static site through `.github/workflows/deploy.yml`.

---

## Project structure

| File / Directory | Purpose |
|---|---|
| `App.tsx` | App shell, German default, navigation, language toggle, overview grid, timer |
| `constants.ts` | All 14 slides, English and German |
| `promptPresets.ts` | Playground examples including an adversarial quoted-source case |
| `types.ts` | Shared TypeScript types |
| `iconUtils.ts` | Slide icon lookup with a fallback |
| `components/SlideLayout.tsx` | Slide renderer |
| `components/PromptComparison.tsx` | Case prompt vs. method, with the pass-1 work order panel |
| `components/InteractivePlayground.tsx` | Prompt-or-method check UI |
| `services/promptEvaluator.ts` | Instruction-layer evaluator, six method traits, case-bound tokens, filler and risk signals |
| `implementation-notes.md` | Decisions, trade-offs and validation log |
| `.github/workflows/ci.yml` | Pull-request typecheck + build |
| `.github/workflows/deploy.yml` | GitHub Pages deployment |

---

## Contributing

Pull requests and issues are welcome at:

👉 [https://github.com/voku/Prompt_Intro](https://github.com/voku/Prompt_Intro)
