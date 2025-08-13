# AIxiom Strategy — GPT‑5 Edition (Vite + React + Tailwind)

Think different. Ship faster. Win with AI.

This repo contains a production‑ready Apple‑style storytelling site for **AIxiom Strategy** with:
- Live **ROI estimator**
- **Before/After Lab** interaction
- Clean **Request Quote** section
- Framer‑motion micro‑interactions + lucide icons

## 🚀 Quickstart (Local)

```bash
# 1) Install deps
npm install

# 2) Run dev server
npm run dev

# 3) Build for production
npm run build
npm run preview
```

## 🌐 Deploy to GitHub Pages (automatic)

A workflow is included to build and deploy on every push to `main`.

1. Create a new GitHub repo and push this project to it.
2. Go to **Settings → Pages** and set **Source: GitHub Actions**.
3. Ensure your default branch is `main` (or update the workflow if different).
4. Push. The site will be built and deployed to GitHub Pages.
   - The workflow sets `BASE_PATH` to `/${{ github.event.repository.name }}/` so Vite assets resolve correctly on Pages.

## 🛠️ Stack
- Vite + React 18
- Tailwind CSS + @tailwindcss/forms
- framer-motion
- lucide-react

## 🧩 Customize
- Edit copy and components in `src/App.jsx`.
- Tailwind config: `tailwind.config.js`
- Vite base path: handled via env `BASE_PATH` in the workflow.
- Hook the **Request Quote** button to your form backend (Airtable, HubSpot, Tally, Web3Forms, etc.).

## 📄 License
This project is provided as-is for your AIxiom Strategy website. Enjoy!
