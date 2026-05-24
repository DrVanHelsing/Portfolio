# Tredir Sewpaul — Portfolio

A personal portfolio site built with React 19 and Vite, showcasing projects, skills, and experience. Deployed to Vercel with a CI/CD pipeline and aggressive asset caching.

**Live site:** [iamtredir.com](https://iamtredir.com)

---

## Tech Stack

| Layer      | Technology                                     |
| ---------- | ---------------------------------------------- |
| Framework  | React 19 + Vite 7                              |
| Routing    | React Router DOM 7                             |
| Animation  | Framer Motion 12                               |
| Icons      | Lucide React                                   |
| Forms      | Formspree                                      |
| AI         | OpenRouter (`openai/gpt-oss-120b:free`) + SSE  |
| SEO        | React Helmet Async                             |
| Analytics  | Vercel Analytics                               |
| Deployment | Vercel (SPA rewrites, immutable asset caching) |

---

## Features

### Terminal Widget v3
A floating terminal widget in the bottom-right corner with two modes:

**AI Chat (Recruiter Mode)** — default mode
- ChatGPT-style chat bubble UI with purple accent theme
- Portfolio-aware AI using context-stuffing RAG (no backend, no vector DB)
- 5 clickable starter questions for quick onboarding
- Typing indicator and streaming responses with markdown stripped to plain text
- Animated loading sweep bar while AI is processing

**Dev Terminal Mode**
- Unix-like CLI with virtual filesystem (`ls`, `cat`, `cd`, `pwd`, `grep`, `man`, `env`, `history`, `whoami`)
- Virtual filesystem: `~/projects/`, `~/pages/`, `~/resume.md`, `~/skills.txt`, `~/README.md`
- Tab completion for commands and paths
- `grep <pattern>` — searches full portfolio knowledge base
- Unrecognized input falls through to AI (Claude CLI pattern)
- `/chat` — persistent multi-turn AI session with history
- Dynamic prompt reflecting current virtual directory

Both modes support minimize (yellow traffic light) and close (red). When the AI is processing a response, a white-tipped comet animates around the panel border.

### Other Features
- **VS Code-style IDE splash screen** — dismissable on first load
- **Animated particle background** — GPU-friendly, `contain: strict`
- **IDE-themed UI** — GitHub-inspired dark theme via CSS custom properties (dark-only)
- **Interactive timeline** — career and education timeline (`TimelineModern`)
- **Animated charts & architecture diagrams** — custom components
- **Lazy-loaded pages** — every page and project detail code-split via `React.lazy`
- **Accessibility** — skip-link, keyboard-navigable nav, ARIA labels throughout
- **Responsive** — mobile-first layout, tested down to 320 px

---

## Pages

| Route           | Page                                     |
| --------------- | ---------------------------------------- |
| `/`             | Home — hero, intro, CTA                 |
| `/about`        | About — education, awards, values       |
| `/projects`     | Projects — filterable project gallery   |
| `/skills`       | Skills — tech chips grouped by category |
| `/resume`       | Resume — career timeline, CV download   |
| `/contact`      | Contact — Formspree-backed contact form |

**Project detail pages:** `/projects/financebuddy` · `/projects/studentlink` · `/projects/callcentre-ai` · `/projects/godseye` · `/projects/machine-learning` · `/projects/geology-sim` · `/projects/physics-lab` · `/projects/postgrad-portal` · `/projects/hangman` · `/projects/tictactoe` · `/projects/anti-temu`

---

## Getting Started

**Prerequisites:** Node ≥ 20.19.0

```bash
# Install dependencies
cd portfolio.client
npm install

# Set up environment variables
cp .env.example .env.local
# Add your OpenRouter API key to .env.local:
# VITE_OPENROUTER_KEY=sk-or-...

# Start dev server (http://localhost:5173)
npm run dev

# Production build
npm run build

# Preview production build locally
npm run preview
```

---

## Project Structure

```
portfolio.client/src/
├── App.jsx                     # Root — routing, AnimatePresence, lazy loading
├── components/
│   ├── layout/                 # Navigation, Footer, SkipLink
│   ├── sections/               # AnimatedBackground, AnimatedChart, TimelineModern,
│   │                           #   MermaidDiagram, ArchitectureDiagram
│   ├── ui/                     # TerminalWidget, DevTerminal, RecruiterChat,
│   │                           #   ScrollToTop, ThemeToggle, TechIconChip
│   └── utility/                # LoadingScreen, SEO
├── data/
│   ├── resumeTimelineData.js   # Single source of truth for all portfolio content
│   └── portfolioKnowledge.js   # Virtual FS, knowledge base, page contexts (derived)
├── hooks/
│   ├── useTerminalCommands.js  # Command registry, dispatch loop, tab completion
│   └── useNoScroll.js
├── services/
│   └── aiService.js            # SSE streaming, system prompt builder, cleanMarkdown
└── pages/
    ├── Home / About / Projects / Skills / Resume / Contact
    └── projects/               # 11 individual project detail pages
```

---

## AI Configuration

The terminal widget uses OpenRouter for AI responses. The AI is powered by context-stuffing RAG — the full portfolio knowledge base (~4 KB) is injected as the system prompt on every request. No backend, vector database, or extra infrastructure required.

Set `VITE_OPENROUTER_KEY` in `.env.local`:
```
VITE_OPENROUTER_KEY=sk-or-v1-...
```

Get a free key at [openrouter.ai](https://openrouter.ai). The free `openai/gpt-oss-120b:free` model is used by default.

---

## Deployment

Deployed on **Vercel**. `portfolio.client/vercel.json` configures:

- **Build command:** `npm run build`
- **Output directory:** `dist`
- **SPA rewrites:** all routes → `index.html`
- **Asset caching:** `Cache-Control: public, max-age=31536000, immutable` on `/assets/**`

---

## License

MIT — feel free to use as a template. Attribution appreciated but not required.
