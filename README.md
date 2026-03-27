<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Remondis Prompt Mastery

An interactive, presentation-style web application for teaching **Prompt Engineering** to REMONDIS employees. Built with React, TypeScript, and Vite – deployable to GitHub Pages.

🔗 **Live Demo:** [https://voku.github.io/Prompt_Intro/](https://voku.github.io/Prompt_Intro/)

---

## Features

- 📊 **Slide deck** covering the fundamentals of Prompt Engineering
- ⚖️ **Side-by-side comparisons** of standard vs. optimised prompts
- ⌨️ Keyboard navigation (←/→ arrow keys, Space)
- 🗂️ **Slide overview grid** for quick navigation
- ⏱️ Session timer
- 📱 Responsive design (mobile-friendly)

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
| `App.tsx` | Main application shell (navigation, layout) |
| `constants.ts` | All slide content and data |
| `types.ts` | TypeScript types for slides |
| `components/SlideLayout.tsx` | Renders each slide type |
| `components/PromptComparison.tsx` | Side-by-side prompt comparison component |
| `vite.config.ts` | Vite build configuration (base path, aliases) |
| `.github/workflows/deploy.yml` | CI/CD workflow for GitHub Pages |

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

