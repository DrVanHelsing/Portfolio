# Tredir Sewpaul — Portfolio

A personal portfolio site built with React 19 and Vite, showcasing projects, skills, and experience. Deployed to Vercel with a CI/CD pipeline and aggressive asset caching.

**Live site:** iamtredir.com

---

## Tech Stack

| Layer      | Technology                                     |
| ---------- | ---------------------------------------------- |
| Framework  | React 19 + Vite 7                              |
| Routing    | React Router DOM 7                             |
| Animation  | Framer Motion 12, GSAP 3                       |
| Diagrams   | Mermaid 11                                     |
| Icons      | Lucide React                                   |
| Forms      | Formspree                                      |
| SEO        | React Helmet Async                             |
| Analytics  | Vercel Analytics                               |
| Deployment | Vercel (SPA rewrites, immutable asset caching) |

---

## Features

- **Animated orbs background** — single centralised instance, `contain: strict`, viewport-units sizing to prevent overflow on any page
- **Animated charts & architecture diagrams** — custom `AnimatedChart` and `ArchitectureDiagram` components with Mermaid integration
- **IDE-themed UI** — GitHub-inspired dark/light theme via CSS custom properties (`--accent`, `--text-*`, `--glass-*`)
- **Theme toggle** — dark / light mode persisted via `data-theme` attribute
- **Timeline** — interactive career/education timeline (`TimelineModern`)
- **Lazy-loaded pages** — every page and project detail is code-split via `React.lazy` + `Suspense`
- **Manual Rollup chunks** — `react-vendor`, `animation-vendor`, `icons-vendor` for optimised cache hits
- **Accessibility** — skip-link, keyboard-navigable nav, ARIA labels throughout
- **Responsive** — mobile-first layout, tested down to 320 px

---

## Pages

| Route           | Page                                     |
| --------------- | ---------------------------------------- |
| `/`           | Home — hero, intro, CTA                 |
| `/about`      | About — education, awards, values       |
| `/projects`   | Projects — filterable project gallery   |
| `/skills`     | Skills — tech chips grouped by category |
| `/experience` | Experience — career timeline            |
| `/contact`    | Contact — Formspree-backed contact form |

### Project detail pages

`/projects/finance-buddy` · `/projects/student-link` · `/projects/gods-eye` · `/projects/call-centre-ai` · `/projects/machine-learning` · `/projects/geology-field-sim` · `/projects/physics-lab` · `/projects/postgrad-portal` · `/projects/hangman` · `/projects/tic-tac-toe` · `/projects/anti-temu`

---

## Getting Started

**Prerequisites:** Node ≥ 20.19.0

```bash
# Install dependencies
npm install --legacy-peer-deps

# Start dev server (http://localhost:5173)
npm run dev

# Production build
npm run build

# Preview production build locally
npm run preview

# Lint
npm run lint
```

---

## Project Structure

```
src/
├── App.jsx               # Root — routing, AnimatePresence, lazy loading
├── components/
│   ├── layout/           # Navigation, Footer, SkipLink
│   ├── sections/         # AnimatedBackground, AnimatedChart, MermaidDiagram,
│   │                     #   ArchitectureDiagram, TimelineModern
│   ├── ui/               # ScrollToTop, ThemeToggle, TechIconChip
│   └── utility/          # LoadingScreen, SEO
├── data/
│   └── resumeTimelineData.js
├── hooks/
│   └── useNoScroll.js
└── pages/
    ├── Home / About / Projects / Skills / Contact / Resume
    └── projects/         # 11 individual project detail pages
```

---

## Deployment

The project is deployed on **Vercel**. The `vercel.json` in `portfolio.client/` configures:

- **Build command:** `npm run build`
- **Output directory:** `dist`
- **SPA rewrites:** all routes → `index.html`
- **Asset caching:** `Cache-Control: public, max-age=31536000, immutable` on `/assets/**`

To deploy manually:

```bash
vercel --prod --cwd "path/to/portfolio.client"
```

---

## License

MIT — feel free to use as a template. Attribution appreciated but not required.
