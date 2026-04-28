# Prompt Engineering Guide

An interactive, presentation-style web application for learning **Prompt Engineering** — covering the best practices and key techniques for 2025/2026. Built with React, TypeScript, and Vite. Deployable to GitHub Pages with a single push.

🔗 **Live Demo:** [https://voku.github.io/Prompt_Intro/](https://voku.github.io/Prompt_Intro/)

---

## Features

- 📊 **10-slide deck** covering fundamentals through advanced techniques (Zero-Shot → Few-Shot → CoT → Agentic)
- ⚖️ **Side-by-side comparisons** of standard vs. optimised prompts for every technique
- 🌐 **EN / DE language toggle** — switch between English and German at any time
- ⌨️ Keyboard navigation (←/→ arrow keys, Space) plus swipe navigation on touch devices
- 🗂️ **Slide overview grid** for quick navigation
- ⏱️ Session timer
- 📱 Responsive design (mobile-friendly)

---

## Topics Covered

| Slide | Topic |
|---|---|
| 1 | Introduction & goals |
| 2 | Understanding LLMs — limitations and hallucinations |
| 3 | **Structured Output** — JSON schema enforcement |
| 4 | **Code-Aided Reasoning (PoT)** — delegate maths to Python |
| 5 | The Prompt Hierarchy — Zero-Shot → Few-Shot → CoT → Agentic |
| 6 | **Chain of Thought (CoT)** — step-by-step decomposition |
| 7 | **Role & Context** — persona and constraint assignment |
| 8 | **Fact Grounding / RAG** — retrieval-based generation |
| 9 | Security & Responsible Use |
| 10 | Key Takeaways |

---

## Run Locally

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

## Build for Production

```bash
npm run build
```

The optimised output is written to the `dist/` directory and is ready to be served as a static site (e.g. via GitHub Pages).

---

## Deploy to GitHub Pages

Deployment is **fully automated**. Every push to the `main` branch triggers the [GitHub Actions workflow](.github/workflows/deploy.yml) which builds the app and publishes it to GitHub Pages.

To enable GitHub Pages in your fork:
1. Go to **Settings → Pages** in your repository.
2. Set the **Source** to *GitHub Actions*.
3. Push to `main` – the workflow will do the rest.

---

## Project Structure

| File / Directory | Purpose |
|---|---|
| `index.html` | Entry HTML with meta tags and importmap |
| `index.tsx` | React root mount |
| `App.tsx` | Main application shell (navigation, language toggle, layout) |
| `constants.ts` | All slide content (bilingual EN/DE) |
| `types.ts` | TypeScript types — `SlideData`, `Lang`, etc. |
| `components/SlideLayout.tsx` | Renders each slide type with language awareness |
| `components/PromptComparison.tsx` | Side-by-side prompt comparison component |
| `components/InteractivePlayground.tsx` | Live prompt sandbox with metrics |
| `vite.config.ts` | Vite build configuration (base path, aliases) |
| `.github/workflows/deploy.yml` | CI/CD workflow for GitHub Pages |

---

## References

The slide content is based on current best practices from:

- [Prompt Engineering Guide (promptingguide.ai)](https://www.promptingguide.ai/)
- [OpenAI — Best practices for prompt engineering](https://help.openai.com/en/articles/6654000-best-practices-for-prompt-engineering-with-the-openai-api)
- [Engineering Practices for LLM Application Development (martinfowler.com)](https://martinfowler.com/articles/engineering-practices-llm.html)
- [prompt-engineering — GitHub (Tanmay1112004)](https://github.com/Tanmay1112004/prompt-engineering)

---

## Key Files Detector – Helper Prompt

Use the following prompt with any LLM to quickly identify the most important files in *any* codebase:

```
You are a senior software architect. I will give you a list of files from a repository.
Your task is to identify the TOP 5–10 "key files" – the files that any new contributor
absolutely must read first to understand the project.

Rules:
1. Prefer entry points, configuration files, and core business logic.
2. Ignore generated files, lock files, and test fixtures.
3. For each file, provide: filename | one-sentence reason why it is key.

Repository file list:
<paste the output of `find . -type f | sort` here>
```

---

## Contributing

Pull requests and issues are welcome! Please open them at:
👉 [https://github.com/voku/Prompt_Intro](https://github.com/voku/Prompt_Intro)
