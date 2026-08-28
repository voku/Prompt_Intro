# From Prompts to Reliable Methods

An interactive React + TypeScript presentation about current prompt techniques for recurring or consequential IT work.

It is designed as **Part 2** to [`voku/LLM`](https://github.com/voku/LLM): the earlier deck explains what LLMs are and what they can do. This deck starts with the next problem: how to turn useful individual chats into repeatable, reviewable work without turning every tiny request into a giant prompt.

🔗 **Live presentation:** https://voku.github.io/Prompt_Intro/

## Core idea

A direct prompt is still the right tool for many one-off tasks.

When work repeats, carries risk, needs handoff, or must be verified, separate the reusable construction method from the current case:

```text
L2 recipe + current evidence/context
              ↓
     concrete L1 contract
              ↓
            review
              ↓
          execution
              ↓
verification against Done When
```

An **L2 recipe** is the reusable construction method and quality bar. It does not hard-code today's ticket ID, filename, target system or command.

The generated **L1 contract** is concrete and case-specific. It has exactly five parts:

```text
Goal
Context
Constraints
Verification
Done When
```

`Verification` says how reality is measured. `Done When` says which observed result is sufficient to stop. Missing evidence stays `UNKNOWN` or `BLOCKED`; it is not replaced with plausible prose.

## What the deck teaches

The German version is the presentation default. The examples are intentionally based on ordinary IT Support/Admin work rather than generic office exercises.

| # | Slide | Practical example / principle |
|---|---|---|
| 1 | From prompts to reliable methods | Part 2: from useful chats to repeatable IT work |
| 2 | Today's prompt is tomorrow's copy-paste | Separate changing case data from reusable quality rules |
| 3 | L2 builds L1 | L2 construction method vs. concrete executable L1 contract |
| 4 | A concrete L1 contract has five parts | Goal · Context · Constraints · Verification · Done When |
| 5 | Direct import prompt vs. reusable method | CSV/user import with ticket, runbook, dry-run and row accounting |
| 6 | Verification is not Done When | AD group change with before/after membership evidence |
| 7 | Acceptance criteria are not evidence | VPN/support-ticket sign-off with actual probes |
| 8 | Context is not edit permission | Incident investigation across ticket, logs, config and deployment script |
| 9 | Evidence beats confidence | VERIFIED · INFERRED · ASSUMED · UNKNOWN · BLOCKED · CONTRADICTED |
| 10 | Every source needs provenance and a role | Incident communication from monitoring, ticket, chat and prior mail |
| 11 | Playground | Direct prompt vs. reusable rules vs. L2-style method |
| 12 | Adversarial review | Falsification attempts instead of mandatory finding quotas |
| 13 | Automatic continuation is not self-approval | Bounded slices, continuation checks, authority boundaries and evidence reconciliation |
| 14 | Build a small method library | Use the right recipe only where the task earns it |

## Source principles

The deck is derived from the current operating-prompt semantics in [`voku/agent-recall-compiler`](https://github.com/voku/agent-recall-compiler) and the governed execution ideas around [`voku/agent-loop`](https://github.com/voku/agent-loop).

Important distinctions preserved in the presentation:

- L2 constructs L1; it does not implement during construction.
- Direct L1 prompts remain valid when a reusable construction layer is unnecessary.
- Acceptance criteria are required outcomes, not evidence that those outcomes were met.
- Context does not grant edit permission.
- `Verification` and `Done When` remain separate.
- Required missing evidence stays `UNKNOWN` or `BLOCKED`.
- Model confidence, earlier reasoning, reviewer agreement and unexecuted commands are not verification.
- Adversarial review investigates hypotheses; `CLEAN` is a valid result after serious probes.
- Automatic continuation applies only inside existing authority. Human/owner/security/risk/destructive decisions cannot be self-approved.
- Selection or use of a recipe is not evidence that it was helpful.

For source provenance, the deck also uses the Recall explanation dimensions:

```text
WHAT
WHY
HOW
AUTHORITY
USE
STATE
```

## Playground

Slide 11 contains a local heuristic. It does **not** call an LLM and its score is deliberately not presented as a quality certificate.

It checks for six teaching signals:

1. construct the concrete task contract before execution;
2. derive case facts from current evidence/context;
3. keep Verification and Done When separate;
4. keep missing evidence visible;
5. do not manufacture findings or certainty;
6. preserve context roles and authority boundaries.

It separately detects case-bound values such as ticket IDs, dates, filenames, document locations and company names. Explicitly quoted/fenced source material is excluded from instruction-layer method scoring, so a ticket containing words such as `Done When` does not magically become an L2 method.

## Presentation notes

German speaker notes are in [`PRESENTATION-NOTES-DE.md`](PRESENTATION-NOTES-DE.md).

Recommended live-demo sequence on slide 11:

1. `Direkter Prompt: ein Import`
2. `Derselbe Fall als L2-Methode`
3. `Methode mit altem Fall im Gepäck`
4. `Zitiertes Ticket ist keine Anweisung`

## Run locally

Prerequisite: Node.js 20 is used in CI.

```bash
npm install
npm run typecheck
npm run dev
```

Production validation:

```bash
npm run typecheck
npm run build
```

Both TypeScript validation and the production build run before GitHub Pages deployment from `main`.

## Project structure

| File | Purpose |
|---|---|
| `constants.ts` | 14 bilingual slides and all comparison examples |
| `promptPresets.ts` | IT-focused playground examples |
| `services/promptEvaluator.ts` | Instruction-layer L2 teaching heuristic |
| `components/PromptComparison.tsx` | Direct case prompt vs. reusable L2 method and generated L1 contract |
| `components/InteractivePlayground.tsx` | Interactive teaching/demo UI |
| `components/SlideLayout.tsx` | Retro/pixel presentation renderer |
| `PRESENTATION-NOTES-DE.md` | German speaker notes |
| `.github/workflows/deploy.yml` | Typecheck, build and GitHub Pages deployment |
