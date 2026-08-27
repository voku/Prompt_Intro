# Implementation notes

## What this revision changed and why

The previous revision taught a five-field prompt template that a person fills in by hand: job, material, limits, form, done-when. That is an **L1 contract** — a filled-in instruction for one case. It is the older, weaker artifact, and building a deck around it teaches people to keep writing disposable prompts slightly better.

The power in `voku/agent-recall-compiler` is at **L2**: a reusable construction method that tells the agent how to build the project-specific L1 contract from current evidence, and to stop there. The deck now teaches that instead:

```text
Pass 1   method + today's material  →  the work order for this case  →  STOP
Pass 2   your go-ahead              →  execute the work order it built
```

The reusable part is the method and the quality bar. The specifics — supplier, date, file, page — are re-derived from whatever material arrives, so the method never goes stale.

## Decisions made because the spec was incomplete

- **Collapsed the two decks into one.** The previous revision kept the deck switch and re-themed both modes, which meant the presentation still told two stories. "No switch to another story" was read as: one deck, one thread. `GuideMode` is gone from types, app shell, components, presets and evaluator, and the title-slide deck picker with it. If the switch is wanted back, it is a small addition — the content no longer needs it.
- **Merged `taskFitEvaluator.ts` into `promptEvaluator.ts`.** The wrapper-over-base split mirrored an override pattern that had no reason to exist once both files were rewritten.
- **Renamed `codeVokuprompt` to `codeWorkOrder`.** The expandable panel now shows what pass 1 actually produces from the method plus three attached offers, which is the single most convincing thing in the deck.
- **The left column is not a strawman.** It is a good, complete, well-structured prompt for one tender — with a shelf life of one week. Making it bad would have proved nothing about L2.
- **English content uses English field names** (Goal / Material / Limits / Check / Done-when), German content uses German ones. The first draft leaked `Prüfung` and `Fertig-wenn` into the English slides.

## Mapping to the source repositories

Each principle in the deck traces to a specific mechanism, not to a general vibe:

| Slide | Source |
|---|---|
| Two passes; the L2 pass ends at the L1 prompt | `OperatingPromptRenderer` L2 construction contract: "The L2 pass ends after producing the project-specific L1 prompt. Do not implement the task during prompt construction." |
| Check ≠ done-when | "Keep Verification and Done When distinct: Verification names how reality is measured; Done When names the acceptable observed result." |
| A checklist in the prompt is not a met checklist | "Preserve task acceptance criteria as required outcomes, never as evidence that they are satisfied." |
| Attaching a file is not permission to change it | Design principle 4, "Context is not edit permission", plus the target-aware role semantics (`dependency` → `context_only_do_not_edit_from_selection_alone`) |
| Five evidence words | Design principle 5, `VERIFIED / INFERRED / ASSUMED / BLOCKED / CONTRADICTED`, and "a system that cannot represent uncertainty will eventually manufacture certainty" |
| Provenance per figure | `context-explain`: WHAT / WHY / HOW / AUTHORITY / USE / STATE, and the deliberate separation of HOW from AUTHORITY |
| A floor is a floor, a quota produces fiction | `adversarial-review` and `regression-hunt`: "Do not manufacture defects merely to satisfy the numeric floor; CLEAN remains valid" |
| Confidence is not proof | "Never treat prior model reasoning, model confidence, reviewer consensus, prompt construction, or an unexecuted command as verification" |
| Stop retrying without new evidence | `retry-stop` |
| Record whether a method helped | Design principle 9, "Selection is not usefulness", and the operating-prompt outcome events |

## The playground is a different instrument now

It no longer counts contract fields. It answers "is this a prompt or a method?" by looking for six traits — two passes, derived from the material, check/done-when kept apart, missing stays missing, no quota and no softening, material has a role — and separately lists everything that binds the text to one case: a date, an amount, a file name, a page number, a person, a company.

That second list is the honest half. A text can have all six traits and still expire, because someone left "the Solvent GmbH comparison of 14 Mar" inside the method. The preset "method with a leftover case" exists to demonstrate exactly that, and scores in the seventies rather than at 100.

## The evaluator found a real defect in the deck

On the first run, four of the twelve methods on the right-hand side scored 15–45 out of 100: the sign-off check, the attachment roles, the provenance rules and the second-pair-of-eyes review were written as **rule lists**, not as two-pass methods. By the deck's own definition they were not methods at all.

That was a content bug, not a detector bug, and the content was fixed: each of those four now derives its work order from the attached material, stops before the work, and keeps check and done-when apart. All twelve now score 93–100 with all six traits present, in both languages.

Two genuine detector gaps were fixed alongside it: bare `not` was missing from the negation list, so "not into the figure as an estimate" was reported as a request for a guess; and the German "nur zu lesen" did not match the read-only pattern that "nur lesen" did.

## Bug found in the previous revision

`iconUtils.resolveIcon` guarded with `typeof candidate === 'function'`. Lucide icons are `forwardRef` **objects**, so the guard rejected every icon and the app rendered `HelpCircle` on every slide. Fixed there, kept here.

## Intentionally unchanged behavior

- EN/DE toggle, keyboard and swipe navigation, overview grid, timer, responsive layout.
- 14 slides, the `PLAYGROUND` slide type, and the local-only check with no backend and no model call.
- The GitHub Pages deployment workflow and the `/Prompt_Intro/` base path.

## Validation log

```
$ npm run typecheck
> tsc --noEmit
(no output, exit code 0)

$ npm run build
vite v6.4.3 building for production...
✓ 1751 modules transformed.
✓ built in 4.15s
```

Browser run against the dev server: no page errors, icons render, the pass-1 work order panel opens, the playground returns a verdict.

Throwaway script over all twelve comparisons and all ten presets, in both languages:

```
methods (slides)              93–100   6/6 traits, 0 case-bound tokens
"the same as a method"           100   6/6 traits
"method with a leftover case"  69–77   5/6 traits, 2 case-bound tokens
"prompt for one case"          14–22   2/6 traits, 1–2 case-bound tokens
"rules, but no two passes"        30   2/6 traits
"long but empty"                   0   0/6 traits, 2–3 filler warnings
```
