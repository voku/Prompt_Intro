# Implementation notes

## What changed and why

The previous content had drifted into abstract IT and ITSM vocabulary — engineering delivery, service maps, change readiness, capacity headroom. The examples were also strawmen: the "bad" prompt was almost always an inflated filler monster nobody actually writes, which makes the comparison feel staged and lets every viewer off the hook. The decks are now about **office work**, and the weak side of each comparison is what people really type ("Fasse das Meeting zusammen.", "Reicht unser Budget bis Jahresende?").

The one deliberately inflated prompt is kept as a playground preset ("Long but empty" / "Lang, aber leer"), because the thesis "length is not quality" needs a counter-example somewhere. It is no longer the shape of every slide.

## Decisions made because the spec was incomplete

- **Kept two decks instead of collapsing to one.** The deck switch is an existing feature, so both modes were re-themed to office work rather than removed: `desk` (everyday desk work) and `decisions` (numbers, plans, handovers). The internal `GuideMode` keys were renamed accordingly.
- **Collapsed `guideContent.ts` into `constants.ts`.** The override layer existed only because content had been patched on top of older content. Since all content was rewritten, a single source is simpler and there is nothing left to override.
- **Split the six lines across the two decks.** The everyday deck teaches five (job, material, limits, form, done-when); the numbers deck adds the sixth (evidence) with the *backed / assumed / unknown* labels, because that is where it earns its cost.
- **Kept the optional expanded panel** on the customer-mail slide as the one place where the fully spelled-out five-line shape is visible, without making every slide that dense.
- **German is not a translation afterthought.** The filler detector previously matched English phrases only, so the German "long but empty" preset produced no warnings at all. German patterns were added for intensity words, unlimited scope and process theatre.

## Method sources

The prompt shape is the office translation of `voku/agent-recall-compiler` and `voku/agent-loop`:

- *Goal / Context / Constraints / Verification / Done When* becomes *Auftrag / Material / Grenzen / Form / Fertig-wenn*, with verification kept separate from the stopping condition.
- Evidence states (`VERIFIED` / `UNKNOWN` / `BLOCKED`) become *belegt / angenommen / unbekannt*.
- `adversarial-review` (first-draft lens, no manufactured findings) becomes the "have it attack the draft" slide, including the explicit permission to return "no objections".
- `plan-as-draft` becomes the "plan somebody made real quick" slide, including the permission to answer "the plan holds".
- `continue-until-done` becomes 60 responses in blocks of 10 with a count and a stop after each block.
- `production-ready-handoff` / `todo-card-handoff` becomes the holiday handover for a colleague who was in no meeting and cannot read the chat.
- `evidence-report` becomes the status report where nothing is green without the rule that made it green.
- `missingness-audit` becomes the gap check that hunts the missing owner rather than style.
- `retry-stop` becomes "same wrong result twice means material is missing, not wording".
- `deletion-first` becomes the cutting slide.

Engineering vocabulary was dropped; the mechanics were not.

## Evaluator changes

- The six checks now look for the **instruction**, not for a keyword ritual: `max. 120 Wörter`, `Form:`, `pro Vorgang:` and `Tabelle mit Spalten` all count, in both languages.
- Risk signals replaced the ITSM-specific lists: asking the model to **act** (send, book, approve, sign) rather than prepare, and asking it to **guess**.
- Negation is handled in both directions, before and after the match, so `nicht schätzen`, `do not invent` and `Erfinde keine Kritik` are no longer reported as requests for a guess. This was the single biggest false-positive source while rebuilding the examples.
- Sensitive-data detection was moved from credentials to what actually appears in an office prompt: salary, payroll, sick notes, applications, dates of birth, IBAN, personnel numbers — with the credential patterns kept.
- Pasted material is masked before risk detection, so the customer's own wording in a quoted mail does not produce warnings.
- Scoring was recalibrated so a deliberately small prompt is not punished: `passed × 14`, plus 10 when the job has both a goal and a limit, plus 8 when the result is checkable. A three-line prompt lands at "usable draft", not at "weak".
- In the numbers deck, figures without a visible calculation or a source produce a warning of their own.
- Risk warnings are now bilingual objects instead of English-only strings.

## Bug found and fixed on the way

`iconUtils.resolveIcon` guarded with `typeof candidate === 'function'`. Lucide icons are `forwardRef` **objects**, so the guard rejected every icon and the app rendered `HelpCircle` on every single slide. The guard now also accepts React element types.

## Intentionally unchanged behavior

- The deck switch, EN/DE toggle, keyboard and swipe navigation, overview grid, timer and responsive layout.
- 14 slides per deck, the `PLAYGROUND` slide type, and the local-only evaluator with no backend and no model call.
- The GitHub Pages deployment workflow and the `/Prompt_Intro/` base path.

## Validation log

```
$ npm run typecheck
> tsc --noEmit
(no output, exit code 0)

$ npm run build
vite v6.4.3 building for production...
✓ 1751 modules transformed.
dist/assets/favicon-C5OxlRER.svg      0.69 kB │ gzip:   0.28 kB
dist/index.html                       2.38 kB │ gzip:   0.95 kB
dist/assets/index-CzWUuj0-.js     1,177.99 kB │ gzip: 258.27 kB
✓ built in 3.19s
```

Both decks were additionally run through the evaluator with a throwaway script: every "what makes it usable" version scores higher than the "what people actually type" version it sits next to, in both languages, and no false risk warning survives on the good side.
