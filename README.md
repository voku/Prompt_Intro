# Operational Prompting for Real Software Work

An interactive React + TypeScript + Vite presentation about **operational prompting** for developers, IT teams, and technical stakeholders. The deck focuses on how to control LLMs and coding agents with context, constraints, retrieval, tools, validation, and explicit stopping conditions.

🔗 **Live Demo:** [https://voku.github.io/Prompt_Intro/](https://voku.github.io/Prompt_Intro/)

---

## Target audience

- Developers
- IT teams and engineering leads
- Technical stakeholders working with LLM-assisted delivery
- Anyone who should understand that good prompts are operational contracts, not magic sentences

---

## Features

- 📊 **14-slide deck** focused on operational prompting for real software work
- ⚖️ Side-by-side **weak vs. operational prompt comparisons**
- 🧪 **Local prompt-quality evaluator** in the playground (no backend, no real model call)
- 🌐 **EN / DE language toggle**
- ⌨️ Keyboard navigation plus swipe navigation on touch devices
- 🗂️ Slide overview grid for quick navigation
- ⏱️ Session timer
- 📱 Responsive design
- 🚀 GitHub Pages deployment with the `/Prompt_Intro/` base path preserved

---

## Topics covered

| Slide | Topic |
|---|---|
| 1 | Operational Prompting for Real Software Work |
| 2 | Useful, Fast, and Still Unreliable Without Control |
| 3 | Weak Prompts Are Vague Tickets *(bug fix example)* |
| 4 | The Contract Shape: Goal, Context, Constraints, Done-When |
| 5 | Coding Agents Need Scope Boundaries *(legacy migration example)* |
| 6 | Facts Require Retrieval *(SQL debugging example)* |
| 7 | Arithmetic and Repeatable Logic Require Tools or Code |
| 8 | Output Must Be Structured and Validated |
| 9 | Named Passes, Assumptions, and Reasoning Summaries |
| 10 | Tests Must Be Witnesses, Not Accomplices |
| 11 | Playground: Score the Prompt Before You Run It |
| 12 | Successful Patterns Must Be Written Back |
| 13 | LLM Control Loop |
| 14 | Final Thesis |

---

## Presentation usage

- **15-minute version:** Slides 1, 2, 3, 4, 6, 8, 10, 13, 14
- **30-minute version:** Slides 1–10, then 13 and 14
- **45-minute version:** Full deck including the playground and discussion on state updates / repo conventions

---

## Run locally

**Prerequisites:** Node.js ≥ 18

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Open [http://localhost:3000](http://localhost:3000)

---

## Validation scripts

```bash
npm run typecheck
npm run build
```

The production build writes static output to `dist/` and keeps the public GitHub Pages base path at `/Prompt_Intro/`.

---

## Deploy to GitHub Pages

Deployment is automated. Every push to `main` triggers the [GitHub Actions workflow](.github/workflows/deploy.yml), which installs dependencies, builds the app, and publishes the result to GitHub Pages.

To enable GitHub Pages in your fork:

1. Go to **Settings → Pages** in your repository.
2. Set the **Source** to **GitHub Actions**.
3. Push to `main`.

---

## Project structure

| File / Directory | Purpose |
|---|---|
| `index.html` | Entry HTML and social metadata |
| `index.tsx` | React root mount |
| `App.tsx` | App shell, navigation, language toggle, overview, timer |
| `constants.ts` | Entire slide deck content in EN / DE |
| `types.ts` | Shared TypeScript types for slides and language state |
| `components/SlideLayout.tsx` | Renders slide types, including the playground slide |
| `components/PromptComparison.tsx` | Weak vs. operational prompt comparisons |
| `components/InteractivePlayground.tsx` | Local prompt-quality evaluator UI |
| `services/promptEvaluator.ts` | Local prompt scoring rules and warnings |
| `vite.config.ts` | Vite config with the `/Prompt_Intro/` base path |
| `.github/workflows/deploy.yml` | GitHub Pages workflow |
| `implementation-notes.md` | Decisions, trade-offs, stale docs, and validation logs for maintainers |

---

## References

The deck is informed by current operational prompting and LLM engineering practices from:

- [Prompt Engineering Guide (promptingguide.ai)](https://www.promptingguide.ai/)
- [OpenAI — Best practices for prompt engineering](https://help.openai.com/en/articles/6654000-best-practices-for-prompt-engineering-with-the-openai-api)
- [Engineering Practices for LLM Application Development (martinfowler.com)](https://martinfowler.com/articles/engineering-practices-llm.html)

---

## Contributing

Pull requests and issues are welcome at:
👉 [https://github.com/voku/Prompt_Intro](https://github.com/voku/Prompt_Intro)
