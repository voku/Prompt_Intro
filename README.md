# From Plausible Answers to Reliable Work

Interactive React + TypeScript presentation about **why LLMs behave the way they do** and how that should change the way we use them for real IT Support/Admin work.

🔗 **Live:** https://voku.github.io/Prompt_Intro/

## Story

The deck starts by reconnecting to the previous [`voku/LLM`](https://github.com/voku/LLM) talk instead of assuming everybody still remembers it.

1. **Vor langer Zeit, in einer LLM-Präsentation weit, weit entfernt …** — visual recall of the previous talk
2. **Dann bekam der Chatbot plötzlich Hände** — from answer generation to tool-using / agentic work
3. **Von plausiblen Antworten zu belastbarer Arbeit** — today's actual question
4. **50 Meter? Laufen klingt super. Falsche Aufgabe.** — explicit clue vs. implicit goal
5. **Da war nichts. Beide Modelle fanden trotzdem etwas.** — hallucinated observation
6. **Buchstaben, Wörter, Tokens: nicht dasselbe** — tokenisation vs. exact character work
7. **Plausible Fortsetzung ist keine Wahrheitsdatenbank** — contextual fit vs. truth
8. **Darum bauen wir einen Auftrag – keinen Zauberspruch** — `L2 + current context/evidence → L1`
9. **Freitag, 16:47 Uhr. 742 Benutzer. Ein verdächtiges Mapping.** — CSV import
10. **Benutzer sagt: „VPN geht wieder.“ Ticket zu?** — user report vs. acceptance evidence
11. **Kontext ist keine Erlaubnis** — analysis context vs. edit authority
12. **Unsicherheit braucht einen Namen** — evidence states
13. **Bestell keine drei Fehler** — adversarial review without finding quotas
14. **Auto-Agent ohne Selbstfreigabe** — autonomous continuation inside current authority
15. **Kleine L2-Toolbox statt Mega-Prompt** — clickable German IT examples adapted from Recall recipes
16. **Bessere Arbeit, nicht hübschere Prompts** — decision rule

## Bridge from the previous talk

The first two slides deliberately reuse reaction GIFs from the old `voku/LLM` presentation. They are loaded from that repository and serve as a visual callback, not as random decoration.

The transition is:

```text
THEN
What is an LLM and what can it do?
        ↓
NOW
Models use tools and execute multi-step work
        ↓
BUT
Plausibility is still not ground truth
        ↓
TODAY'S QUESTION
How do we give an LLM work so the result is controllable and verifiable?
```

## Mental-model examples

The car-wash, noisy-image, token and next-token slides are not there to argue that LLMs are stupid. They explain four useful failure modes: implicit goals can be missed, model output is not observation, tokens are not characters, and plausible continuation is not the same thing as truth.

That makes the later practices feel like engineering rather than prompt superstition.

## L1 / L2

The concrete L1 shape follows the current `voku/agent-recall-compiler` contract:

```text
Goal
Context
Constraints
Verification
Done When
```

L2 holds the reusable construction method; current ticket/file/system details belong in the generated L1 contract.

## Clickable L2 toolbox

Slide 15 uses German, presentation-specific IT examples adapted from current Recall recipe shapes:

- CSV import → `discovery-first`
- VPN reproduction → `reproduce-before-fix`
- production change review → `adversarial-review`
- incident missingness → `missingness-audit`
- incident plan review → `plan-as-draft`
- shift handoff → `production-ready-handoff`

Clicking a card opens a copyable concrete L2 example. The recipe name remains visible as provenance, but the prompt itself is intentionally adapted to the Support/Admin cases used in this talk.

## Removed on purpose

There is no prompt generator, regex evaluator, prompt score or pseudo-objective quality meter. Prompt quality is not responsibly reducible to keyword matches.

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
| `introSlides.ts` | two-slide bridge from the previous LLM talk |
| `constants.ts` | 14-slide main deck |
| `components/LegacyBridge.tsx` | reused old GIFs + then/now transition |
| `l2Prompts.ts` | German IT-specific L2 examples adapted from Recall recipes |
| `components/L2ToolboxPanel.tsx` | clickable L2 toolbox |
| `components/VisualPanel.tsx` | LLM mental-model and IT diagrams |
| `components/PromptComparison.tsx` | direct-case prompt vs. reusable method |
| `components/SlideLayout.tsx` | visual-first slide renderer |
| `PRESENTATION-NOTES-DE.md` | German speaker notes |
