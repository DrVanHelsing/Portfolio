# Changelog

All notable changes to this project are documented here.

---

## [Unreleased]

## [3.0.1] — 2026-05-23

### Terminal Widget UX — Mode Guidance & Fullscreen Polish

#### UX Improvements
- **Default mode: Recruiter** — widget now opens in AI Chat mode by default to welcome non-technical visitors first
- **Mode label under collapsed bubble** — purple "AI Chat" or blue "Terminal" pill label visible beneath the floating button so users know what they'll open before clicking
- **Mode-aware bubble icon** — collapsed button shows `Users` icon in recruiter mode, `Terminal` icon in dev mode, reinforcing the current mode visually
- **Purple pulse on recruiter bubble** — separate `@keyframes tw-pulse-recruiter` gives the recruiter-mode bubble a purple glow matching the chat theme
- **Mode toggle button now shows text** — header toggle changed from icon-only to icon + label ("AI Chat" / "Dev Mode") so the action is always readable without hovering
- **Label hides when panel is expanded** — the bubble label auto-hides when the panel is open to reduce visual clutter

#### Testing
- Playwright test suite extended to cover both recruiter and dev fullscreen flows
- Viewport pinned to 1440×900 via `context({ viewport })` for reproducible screenshots
- Recruiter fullscreen: verifies panel class, chat body/input visible at full viewport
- Dev fullscreen: verifies terminal body/input visible, mode toggle accessible in fullscreen header
- Added `waitForRCIdle` helper for recruiter AI streaming detection (distinct from dev terminal wait)

---

## [3.0.0] — 2026-05-23

### Terminal Widget v3 — Complete Overhaul

#### New Features
- **Virtual filesystem** — `ls`, `ls -la`, `cat`, `cd`, `pwd` navigate a simulated portfolio directory tree (`~/projects/`, `~/pages/`, `~/resume.md`, `~/skills.txt`, `~/README.md`)
- **Realistic Unix commands** — `grep <pattern>` searches all portfolio content, `echo`, `env` (shows role/location/shell), `history`, `man` / `man <cmd>` with proper SYNOPSIS/DESCRIPTION/EXAMPLES pages
- **Tab completion** — single match autocompletes, multiple matches display inline like real bash
- **Dynamic prompt** — reflects current virtual directory (`~/projects $`)
- **AI fallthrough** — unrecognized input is silently routed to the AI (Claude CLI pattern; no "command not found")
- **`ask <question>`** — explicit AI command for one-shot questions
- **`/chat` session** — persistent multi-turn AI chat within dev mode; prompt changes to `[AI] >`, `exit` returns to terminal
- **Recruiter Mode** (`mode recruiter` or header icon button) — full ChatGPT-style bubble chat UI with:
  - Purple accent color scheme
  - 5 clickable starter question pills (disappear after first message)
  - Typing indicator (3-dot bounce animation)
  - AI avatar left-aligned bubbles, user right-aligned bubbles
  - Persistent conversation history within session
- **Mode badge** — DEV / AI badge in terminal header, color-coded
- **Mode toggle button** — icon button in header to switch modes without typing
- **45-second AI request abort** — AbortController prevents indefinite hangs on slow free-tier model

#### Architecture Changes
- Monolithic `TerminalWidget.jsx` (654 lines) refactored into modular architecture:
  - `TerminalWidget.jsx` — orchestrator only (~100 lines); owns mode, chrome state, navigate, location
  - `DevTerminal.jsx` — CLI rendering, connects command hook
  - `RecruiterChat.jsx` + `RecruiterChat.css` — recruiter chat bubble UI
  - `src/hooks/useTerminalCommands.js` — command registry pattern replacing switch statement; dispatch loop; tab completion; virtual FS navigation
  - `src/services/aiService.js` — unified SSE streaming service; `buildSystemPrompt(mode, page)`; `streamChat()`; `streamDevAnswer()`; `streamSummarize()`
  - `src/data/portfolioKnowledge.js` — single source of truth for all content; derives from `resumeTimelineData.js`; exports `VIRTUAL_FS`, `PAGE_CONTEXTS`, `ROUTE_MAP`, `PROJECT_ALIASES`, `WELCOME_LINES`, `getKnowledgeBase()`

#### Content & AI
- **Zero hardcoded portfolio strings** — all content derived from `resumeTimelineData.js` at module load
- **Context-stuffing RAG** — full knowledge base (~4 KB) memoized and injected as system prompt on every AI request; no backend or vector DB required
- **Page-aware AI** — system prompt includes the current page the user is viewing (via `useLocation`)
- **Mode-aware system prompts** — dev mode uses concise plain-text terminal persona; recruiter mode uses professional conversational persona

#### Bug Fixes
- Fixed `cd projects/` failing due to trailing slash not being stripped in path resolution
- `nav_to` and `open` commands preserved for backward compatibility
- `cd /about`, `cd /projects` etc. trigger React Router navigation

---

## [2.0.0] — 2026-05-20

### Terminal Widget v2
- Floating terminal bubble with macOS traffic-light chrome
- Basic commands: `help`, `ls`, `nav_to`, `open`, `summarize` (AI streaming), `github`, `linkedin`, `email`, `whoami`, `theme`, `clear`, `exit`
- AI summaries via OpenRouter (`openai/gpt-oss-120b:free`) with SSE streaming
- Command history with ↑/↓ arrow navigation
- Fullscreen and minimize states

---

## [1.0.0] — 2026-04-01

### Initial Release
- React 19 + Vite SPA portfolio
- Pages: Home, About, Projects (11 projects), Skills, Resume/Experience, Contact
- VS Code-style IDE splash screen
- Animated particle background
- Responsive navigation with dark/light theme toggle
- Contact form via Formspree
- Lazy-loaded page transitions with Framer Motion
- Vercel deployment
