# Implementation notes

## Current teaching contract

The deck is no longer a presentation about making one-off prompts more elaborate. Its core distinction follows the current `voku/agent-recall-compiler` contract:

- **L2 recipe**: reusable construction method and quality bar;
- **L1 contract**: concrete executable instructions for the current case.

The L2 pass constructs L1 from current evidence and stops before execution. A direct L1-style prompt remains valid for simple one-off work.

The concrete L1 target shape is exactly:

```text
Goal
Context
Constraints
Verification
Done When
```

`Verification` is the measurement procedure. `Done When` is the acceptable observed result. Missing required evidence remains `UNKNOWN` or `BLOCKED`; prompt prose, model confidence, reviewer agreement or an unexecuted command are not verification.

## Why the examples changed

The previous version used generic office examples such as tenders, supplier comparisons and letters. Those examples made the German copy sound translated and hid the connection to the actual engineering principles.

The current deck uses recognizable IT Support/Admin cases:

- CSV/user import with ticket, target system and runbook;
- AD group membership change;
- VPN/support-ticket acceptance checks;
- incident analysis across ticket, logs, configuration and deployment dependencies;
- incident communication from monitoring, ticket, chat and prior communication;
- change-plan adversarial review;
- bounded automatic agent continuation.

The direct-prompt side of comparison slides is deliberately allowed to be good. The point is not that a direct prompt is primitive. The point is that case-specific details expire while reusable construction rules can survive the next case.

## Main demo: CSV import

Slide 5 is the central L2/L1 demonstration.

The left side contains a concrete prompt for one case: a named CSV, ticket ID, target system, row count and runbook location.

The right side contains the reusable L2 construction method. It requires the model to derive exact case anchors from the current ticket/files and construct an L1 contract with Goal, Context, Constraints, Verification and Done When. It then stops before importing anything.

The expandable panel shows the generated L1 contract for the current import. This is the useful human review boundary: inspect the concrete contract before execution rather than discovering a misunderstood requirement after a write operation.

## Source-principle mapping

| Deck concept | Current source principle |
|---|---|
| L2 builds L1 and stops | `OperatingPromptRenderer`: L2 recipes synthesize project-specific L1 prompts and do not implement during construction |
| Five-part L1 shape | Goal · Context · Constraints · Verification · Done When |
| Verification != Done When | measurement procedure and acceptable observed result remain separate |
| Ticket criteria != evidence | acceptance criteria are required outcomes, never proof that they are already satisfied |
| Context != edit permission | selected context may be needed for understanding or verification without being an edit target |
| Evidence state | VERIFIED / INFERRED / ASSUMED / BLOCKED / CONTRADICTED; missing evidence remains UNKNOWN or BLOCKED |
| Source explanation | WHAT / WHY / HOW / AUTHORITY / USE / STATE |
| Adversarial review | serious falsification attempts, no mandatory finding quota, CLEAN is valid |
| Auto continuation | bounded slices + validation + internal continuation checks inside existing authority |
| Human/owner boundaries | self-confirmation never satisfies owner, security, accepted-risk, destructive or irreversible decisions |
| Completion claims | reconcile prose against current artifacts, validation, review findings and blockers |
| Recipe usefulness | selection or application is not evidence that the recipe helped |

## Playground

The playground is intentionally a teaching heuristic, not a prompt-quality metric.

Its six signals are:

1. construct a concrete L1 contract before execution;
2. derive case facts from current evidence/context;
3. keep Verification and Done When separate;
4. preserve missing evidence as UNKNOWN/BLOCKED;
5. allow CLEAN and forbid manufactured findings or weakened criteria;
6. give context an explicit role and authority boundary.

Case-bound detection now includes ticket IDs in addition to dates, filenames, document locations, amounts and company names. A reusable method containing `SD-18427` or `users_2026-08-28.csv` is correctly treated as carrying stale case data.

Explicit source containers are masked before method scoring. Triple-quoted/fenced source material or labelled ticket text can contain `L1`, `Done When`, ticket IDs and filenames without those tokens being mistaken for the surrounding instruction.

## Copy decisions

German copy is written independently rather than translated sentence-for-sentence from English. Technical terms stay English where they are part of the source contract (`L1`, `L2`, `Goal`, `Context`, `Verification`, `Done When`, `VERIFIED`, `BLOCKED`, etc.) and receive a German explanation in the surrounding text.

The presentation deliberately avoids generic prompt filler such as:

- "sehr sorgfältig";
- "denke Schritt für Schritt";
- "berücksichtige alles";
- "bestmögliches Ergebnis".

The playground keeps one deliberately bad example using this language so the contrast remains visible.

## Visual direction

The shell uses a dark pixel/arcade presentation style inspired by the reaction-GIF character of the earlier `voku/LLM` deck:

- retro HUD with hearts, XP/progress, timer and slide count;
- pixel font for chrome/labels;
- cyan/fuchsia/violet accents;
- `MISSION // BRIEFING`, `BOSS FIGHT // VERGLEICH` and `TRAINING // LIVE` labels;
- content remains readable in a normal sans/monospace font instead of turning every paragraph into pixel typography.

The visual joke stays in the frame; the technical text stays readable over Teams screen sharing. Humanity has suffered enough decorative monospace paragraphs.

## Validation

GitHub Pages deployment from `main` now runs both checks before publication:

```bash
npm run typecheck
npm run build
```

The deployment job runs only after that build job succeeds. Pull requests also run typecheck + build through `.github/workflows/ci.yml`.

## Intentionally retained

- German is the default language, with English available through the toggle.
- Keyboard navigation, swipe navigation, fullscreen, overview grid and timer remain.
- The deck remains 14 slides.
- The playground is local-only and performs no backend/model call.
- The GitHub Pages base path remains `/Prompt_Intro/`.
