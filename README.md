# From Prompts to Reliable Methods

Interactive React + TypeScript presentation about current prompt techniques for real IT Support/Admin work.

🔗 **Live:** https://voku.github.io/Prompt_Intro/

## What changed

The deck deliberately does **not** contain a prompt generator, prompt score, regex evaluator or pseudo-objective quality meter. Those mechanisms were removed. Prompt quality is not something this presentation can responsibly reduce to keyword matches.

The presentation is now visual-first and uses 12 slides:

1. **Von Prompts zu belastbaren Methoden**
2. **Der Fall veraltet. Die Methode nicht.** — case data vs. reusable rules
3. **L2 ist ein Prompt-Compiler** — `L2 + current context → L1`
4. **L1: fünf Dinge, kein Ritual** — Goal / Context / Constraints / Verification / Done When
5. **Freitag, 16:47 Uhr. 742 Benutzer. Ein kaputtes Mapping.** — CSV import case
6. **„VPN geht“ ist kein Nachweis** — acceptance criteria vs. evidence
7. **Kontext ist keine Erlaubnis** — analysis context vs. edit authority
8. **Unsicherheit braucht einen Namen** — evidence states
9. **Bestell keine drei Fehler** — adversarial review without finding quotas
10. **Auto-Agent ohne Selbstfreigabe** — automatic continuation inside authority
11. **Kleine Toolbox statt Mega-Prompt** — real recipe shapes from `agent-recall-compiler`
12. **Bessere Arbeit, nicht hübschere Prompts** — decision rule

## Core model

```text
L2 recipe + current context/evidence
              ↓
       concrete L1 contract
              ↓
           execution
              ↓
     observed verification
```

The concrete L1 shape follows `voku/agent-recall-compiler`:

```text
Goal
Context
Constraints
Verification
Done When
```

`Verification` says how reality is measured. `Done When` says which observed result is sufficient.

## Practical examples

The deck uses IT work rather than generic office examples:

- CSV/user import
- VPN support-ticket closure
- incident investigation across ticket, logs, config and deployment dependencies
- change-plan adversarial review
- bounded autonomous agent execution

## Current recipe toolbox

Slide 11 points at useful recipe shapes from [`voku/agent-recall-compiler`](https://github.com/voku/agent-recall-compiler):

- `discovery-first`
- `reproduce-before-fix`
- `adversarial-review`
- `evidence-report`
- `continue-until-done`
- `production-ready-handoff`

The point is not to combine them all. Choose the smallest method that materially changes how the task should be approached.

## Source principles

The deck preserves these current ideas from `agent-recall-compiler` / `agent-loop`:

- L2 constructs L1 and stops before execution.
- Direct prompts remain valid for simple one-off work.
- Context is not edit permission.
- Acceptance criteria are not evidence.
- Verification and Done When are separate.
- Missing evidence remains `UNKNOWN` or `BLOCKED`.
- Confidence and unexecuted checks are not verification.
- Adversarial review investigates hypotheses; `CLEAN` is valid.
- Automatic continuation never grants new owner/security/risk authority.

## Run locally

```bash
npm install
npm run typecheck
npm run dev
```

Production:

```bash
npm run typecheck
npm run build
```

`main` is published to GitHub Pages only after typecheck + build succeed.

## Relevant files

| File | Purpose |
|---|---|
| `constants.ts` | 12 bilingual slides and practical prompt examples |
| `components/VisualPanel.tsx` | diagrams and visual concept panels |
| `components/PromptComparison.tsx` | direct-case prompt vs. reusable L2 method |
| `components/SlideLayout.tsx` | visual-first slide renderer |
| `PRESENTATION-NOTES-DE.md` | German speaker notes |
