# Operational Prompting for Real IT Work

An interactive React + TypeScript + Vite presentation about **task-fit operational prompting** across IT engineering, architecture, data, operations, support, and IT service management.

The central lesson is deliberately not “write a bigger prompt.” A good prompt is the **smallest sufficient operational contract** for the task. Simple work may need one sentence. Risky, ambiguous, long-running, or handoff-heavy work needs more explicit context, boundaries, evidence, validation, and stopping conditions.

🔗 **Live Demo:** [https://voku.github.io/Prompt_Intro/](https://voku.github.io/Prompt_Intro/)

---

## Core thesis

- Prompt quality is **task fit**, not length.
- More words do not compensate for missing evidence, scope, validation, or a clear outcome.
- IT is more than code: the examples include engineering, architecture, infrastructure, data, identity, capacity, operations, documentation, governance, and technical decisions.
- ITSM is more than tickets: the examples include incident, request, problem, change, knowledge, configuration, capacity, availability, supplier, measurement, and continual-improvement work.
- LLMs may prepare analysis, decisions, handoffs, checklists, and write-back. Accountable people and approved systems still authorize and perform operational work.

---

## Target audience

- Developers, system engineers, architects, administrators, and platform teams
- Service desk, operations, IAM, infrastructure, and IT service management teams
- Engineering and service owners
- Technical and business stakeholders working with LLM-assisted delivery
- Anyone who should understand that good prompts are operational contracts, not magic sentences or token-heavy rituals

---

## Features

- 📊 **Two bilingual 14-slide decks**:
  - **IT Engineering & Delivery**
  - **IT Service Management**
- ⚖️ Side-by-side comparisons for **not task-fit vs. task-fit** prompts
- 🔢 Visible word counts to show that the better prompt may be shorter or longer
- 🧪 **Mode-aware local task-fit evaluator** with no backend and no model call
- 🚫 Filler and repetition warnings for phrases such as “be extremely thorough” or unlimited-scope requests
- 🌐 English and German content throughout
- ⌨️ Keyboard and swipe navigation
- 🗂️ Slide overview grid
- ⏱️ Session timer
- 📱 Responsive design
- 🚀 GitHub Pages deployment with the `/Prompt_Intro/` base path preserved

---

## Guide modes

### IT Engineering & Delivery

The engineering deck covers operational prompting across broader IT work, not only code generation:

- selecting the smallest sufficient prompt
- scope and decision boundaries
- evidence retrieval from files, systems, logs, diagrams, policies, and current state
- architecture and migration decisions
- capacity and repeatable calculations through tools
- structured and verifiable output
- validation that challenges assumptions
- write-back into repositories, tests, runbooks, service maps, architecture records, and operating procedures

### IT Service Management

The ITSM deck treats tickets as one operational record among many. It covers:

- service outcomes rather than document volume
- incident evidence and safe investigation support
- request and approval boundaries
- recurring-problem analysis
- change readiness and rollback evidence
- service maps, configuration data, expected state, and ownership
- capacity and availability analysis
- service-aware handoffs
- knowledge, known errors, monitoring, policy, and continual-improvement write-back

The model is not framed as a hidden operator with invisible access to AD, mailboxes, monitoring, production systems, or approval authority.

---

## Evaluator behavior

The playground evaluator checks for usable control signals such as goal, context, constraints, validation, output format, and stopping conditions. It also detects operational risks, possible sensitive data, hedge words, generic intensity language, unlimited scope, and repeated instructions.

**Prompt length is not scored directly.** A long prompt with few useful signals can score worse than a concise prompt with clear evidence, boundaries, and output requirements. The evaluator remains a local heuristic, not a model or a substitute for testing the real result.

---

## Presentation usage

- **15-minute version:** Slides 1, 2, 3, 4, 7, 11, 13, and 14
- **30-minute version:** Slides 1–10, then 13 and 14
- **45-minute version:** Full deck including the playground and discussion about durable write-back

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
| `App.tsx` | App shell, navigation, localized guide labels, language toggle, overview, and timer |
| `constants.ts` | Original slide content |
| `guideContent.ts` | Typed English/German task-fit and broader-IT content overrides |
| `promptPresets.ts` | Engineering and ITSM playground presets |
| `types.ts` | Shared TypeScript types |
| `components/SlideLayout.tsx` | Slide renderer |
| `components/PromptComparison.tsx` | Neutral task-fit comparison with word counts |
| `components/InteractivePlayground.tsx` | Local evaluator UI |
| `services/promptEvaluator.ts` | Existing contract and operational checks |
| `services/taskFitEvaluator.ts` | Task-fit wrapper with filler and repetition detection |
| `implementation-notes.md` | Decisions, trade-offs, stale docs, and validation logs |
| `.github/workflows/deploy.yml` | GitHub Pages workflow |

---

## Deploy to GitHub Pages

Every push to `main` triggers the GitHub Actions workflow, installs dependencies, builds the app, and publishes the result to GitHub Pages.

---

## References

The deck is informed by operational prompting and LLM engineering practices from:

- [Prompt Engineering Guide](https://www.promptingguide.ai/)
- [OpenAI — Best practices for prompt engineering](https://help.openai.com/en/articles/6654000-best-practices-for-prompt-engineering-with-the-openai-api)
- [Engineering Practices for LLM Application Development](https://martinfowler.com/articles/engineering-practices-llm.html)

---

## Contributing

Pull requests and issues are welcome at:

👉 [https://github.com/voku/Prompt_Intro](https://github.com/voku/Prompt_Intro)
