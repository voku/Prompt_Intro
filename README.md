# From Plausible Answers to Reliable Work

Interactive React + TypeScript presentation about **why LLMs behave the way they do** and how that should change the way we use them for real IT Support/Admin work.

🔗 **Live:** https://voku.github.io/Prompt_Intro/

## Story

The deck no longer starts with prompt architecture. It starts with the mental model behind the tool:

1. **Von plausiblen Antworten zu belastbarer Arbeit**
2. **50 Meter? Laufen klingt super. Falsche Aufgabe.** — explicit clue vs. implicit goal
3. **Da war nichts. Beide Modelle fanden trotzdem etwas.** — visual hallucination / invented observation
4. **Buchstaben, Wörter, Tokens: nicht dasselbe** — tokenisation vs. exact character work
5. **Plausible Fortsetzung ist keine Wahrheitsdatenbank** — contextual fit vs. truth
6. **Darum bauen wir einen Auftrag – keinen Zauberspruch** — `L2 + current context/evidence → L1`
7. **Freitag, 16:47 Uhr. 742 Benutzer. Ein verdächtiges Mapping.** — concrete CSV import case
8. **Benutzer sagt: „VPN geht wieder.“ Ticket zu?** — user report vs. acceptance evidence
9. **Kontext ist keine Erlaubnis** — analysis context vs. edit authority
10. **Unsicherheit braucht einen Namen** — evidence states
11. **Bestell keine drei Fehler** — adversarial review without finding quotas
12. **Auto-Agent ohne Selbstfreigabe** — autonomous continuation inside existing authority
13. **Kleine L2-Toolbox statt Mega-Prompt** — clickable current L2 source prompts
14. **Bessere Arbeit, nicht hübschere Prompts** — decision rule

The point of the first four examples is not “LLMs are stupid”. It is the opposite: they are extremely good at contextual pattern completion, but that is not the same thing as inheriting every human assumption, observing ground truth, operating on characters one-to-one, or querying a truth database.

That makes the later practices feel like engineering rather than prompt superstition:

```text
current context + evidence
          ↓
     L2 construction method
          ↓
     concrete L1 contract
          ↓
        execution
          ↓
 observed verification / Done When
```

## The four mental-model examples

### Car wash

The prompt asks whether to walk or drive 50 metres to a car wash. A model can focus on the explicit distance and produce the locally plausible answer “walk”, while the implicit task requires the car to arrive too.

Teaching point: make the actual goal and relevant constraints observable when they matter.

### Noisy image

A deliberately noisy image contains no hidden message. Different models still produced confident interpretations such as “I love you” or an imagined prompt-injection story about claiming the image shows a rose.

Teaching point: confident model output is not observation. Ground truth wins.

### Letter counting / tokens

Humans see the characters in `strawberry` directly. Language models first operate on model-specific tokenisation, and tokens do not necessarily correspond one-to-one to characters or words.

Teaching point: exact string work, counting and arithmetic should use deterministic tools when correctness matters.

### Plausible continuation

Generation selects contextually fitting continuations token by token. A fabricated statement can therefore be linguistically excellent.

Teaching point: plausibility and truth are different axes; important claims need evidence, retrieval or tools.

## L1 / L2

The concrete L1 shape follows the current `voku/agent-recall-compiler` contract:

```text
Goal
Context
Constraints
Verification
Done When
```

The dedicated L1-definition slide was removed. Those five parts now appear directly inside the `L2 + context → L1` visual and again in the generated CSV-import L1 contract.

## Clickable L2 toolbox

Slide 13 contains only **actual Level-2 recipes** from the current [`voku/agent-recall-compiler`](https://github.com/voku/agent-recall-compiler) operating-prompt catalog:

- `discovery-first`
- `reproduce-before-fix`
- `adversarial-review`
- `deletion-first`
- `plan-as-draft`
- `production-ready-handoff`

Clicking a card opens the current source prompt verbatim and exposes a copy button. The presentation explains the purpose in German/English, while the catalog prompt intentionally stays in its original source language so the slide does not quietly become another translation layer.

`continue-until-done` and `evidence-report` are deliberately **not** in the L2 toolbox because they are current Level-1 prompts. They remain relevant concepts elsewhere in the deck.

## Practical examples

The deck uses IT work rather than generic office examples:

- CSV/user import with a suspicious mapping and dry-run validation
- VPN support-ticket closure
- incident analysis across ticket, logs, config and deployment dependencies
- change-plan adversarial review
- bounded autonomous agent execution

## Removed on purpose

There is no prompt generator, regex evaluator, prompt score or pseudo-objective quality meter. Prompt quality is not responsibly reducible to keyword matches, and the deck should explain techniques rather than pretend to certify them.

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
| `constants.ts` | 14 bilingual slides and practical prompt examples |
| `l2Prompts.ts` | current clickable L2 source prompts from `agent-recall-compiler` |
| `components/VisualPanel.tsx` | LLM mental-model diagrams, IT visuals and interactive L2 toolbox |
| `components/PromptComparison.tsx` | direct-case prompt vs. reusable method |
| `components/SlideLayout.tsx` | visual-first slide renderer |
| `PRESENTATION-NOTES-DE.md` | German speaker notes |
