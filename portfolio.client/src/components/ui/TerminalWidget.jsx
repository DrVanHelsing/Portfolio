import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal } from 'lucide-react';
import './TerminalWidget.css';

const PROMPT = '~/portfolio $ ';
const OPENROUTER_KEY = import.meta.env.VITE_OPENROUTER_KEY ?? '';
const OPENROUTER_MODEL = 'openai/gpt-oss-120b:free';

const WELCOME_LINES = [
  { type: 'ctx',   text: 'portfolio@tredir-sewpaul:~' },
  { type: 'sym',   text: '◆  Terminal v2.0' },
  { type: 'dim',   text: "  Type 'help' or 'man' to list commands." },
  { type: 'blank' },
];

const PROJECT_SLUGS = {
  financebuddy: 'financebuddy',
  studentlink:  'studentlink',
  callcentre:   'callcentre-ai',
  godseye:      'godseye',
  hangman:      'hangman',
  tictactoe:    'tictactoe',
  postgrad:     'postgrad-portal',
  geology:      'geology-sim',
  physics:      'physics-lab',
  antitemu:     'anti-temu',
  ml:           'machine-learning',
};

const PAGE_CONTEXTS = {
  home: `Home page of Tredir Sewpaul's developer portfolio.
Tredir is a full-stack developer and designer based in South Africa, studying at the University of the Western Cape.
The home page features a VS Code-style IDE splash screen, animated particle backgrounds, and this floating terminal widget.
Key sections: About, Projects, Skills, Resume/Experience, Contact.
GitHub: https://github.com/DrVanHelsing`,

  about: `About page for Tredir Sewpaul.
Full-stack developer and designer based in Cape Town, South Africa.
Studying Computer Science at the University of the Western Cape.
Passionate about building immersive, high-performance web, desktop, and AI-powered applications.
Technical interests: 3D web graphics, AI/ML, academic tooling, and developer tooling.`,

  projects: `Projects overview listing all 11 portfolio projects.
Categories: web apps, desktop apps, Chrome extensions, AI/ML experiments, 3D simulations, and developer tools.
Projects: FinanceBuddy (hackathon 3rd place), Machine Learning Basics, StudentLink, CallCentre AI, GodsEye, Hangman, TicTacToe, PostGrad Portal, Geology Field Sim, Physics Lab, Anti-Temu.
Type 'ls projects' to list all slugs. Type 'open <slug>' to navigate. Type 'summarize projects <slug>' for an AI summary.`,

  skills: `Skills page showcasing Tredir Sewpaul's full technical stack.
Frontend: React, TypeScript, Vite, Three.js, Framer Motion, HTML/CSS.
Backend: .NET 8/9, ASP.NET Core, Node.js, Python, C#.
Databases: SQL Server, Firebase/Firestore, Azure Cosmos DB.
AI/ML: Azure OpenAI GPT-4, ML.NET, scikit-learn, OpenCV, Mediapipe, Azure Speech, Azure Language Service.
Cloud and DevOps: Azure, Firebase, Git, Docker, SignalR.
Design: Figma, GLSL shaders, WebGL.`,

  resume: `Resume and experience page for Tredir Sewpaul.
Education: Computer Science at the University of the Western Cape, South Africa.
Academic and project-based experience spanning full-stack development, AI/ML, 3D graphics, and academic tooling.
Download the full CV from this page.
GitHub: https://github.com/DrVanHelsing`,

  experience: `Experience page for Tredir Sewpaul (same content as Resume).
Covers academic background, project experience, and technical skills.
Education: Computer Science, University of the Western Cape.
Projects span AI/ML, full-stack web, desktop, and 3D simulations.`,

  contact: `Contact page for Tredir Sewpaul.
Use the contact form on this page to send a message directly.
Email: tredirsewpaul@gmail.com
GitHub: https://github.com/DrVanHelsing
LinkedIn: https://linkedin.com/in/tredir-sewpaul`,

  financebuddy: `FinanceBuddy — AI-powered financial companion built at a hackathon.
Won 3rd Place in the AI Category at SA Intervarsity Hack 2025.
Tech: .NET MAUI 9, ASP.NET Core 8, Azure OpenAI GPT-4, Azure Speech, Azure Translator, SQL Server, C#.
Features: AI Money Mentor for personalized financial advice, plant-based gamification with 6 growth stages, voice expense tracking with multi-language support.
Date: September 2025.
GitHub: https://github.com/DrVanHelsing/SAIntervarsityHack2025-MoneyMentor`,

  ml: `Machine Learning Basics — hands-on ML implementations built from scratch.
Tech: Python, NumPy, Jupyter Notebooks, scikit-learn, Matplotlib, Pandas.
Covers: Linear Regression with polynomial feature expansion, Logistic Regression using sigmoid and cross-entropy loss, Neural Networks with manual backpropagation for multi-class classification.
Educational project to build intuition for ML fundamentals without high-level abstractions.
Date: 2024.
GitHub: https://github.com/DrVanHelsing/MachineLearning`,

  studentlink: `StudentLink — AI-powered job marketplace connecting students and recruiters.
Tech: .NET 9, React, .NET MAUI, Azure OpenAI (GPT-4o-mini), Azure Speech, ML.NET, SQL Server, SignalR.
Features: AI CV analysis with real-time feedback, mock interviews with AI avatars and speech recognition, ML-driven semantic job matching, multi-role dashboards for Students, Recruiters, and Admins.
Date: April 2025 - Present (ongoing).
Showcase: https://student-link-showcase.vercel.app/`,

  callcentre: `Telkom AI Call Centre Management Solution — enterprise AI platform for South African call centres.
Tech: .NET 8/9, ASP.NET Core, React, Vite, .NET MAUI, SignalR, Azure Speech, Azure Language Service, SQL Server, Entity Framework Core.
Features: Multilingual AI voice and chat supporting 11 South African languages, real-time supervisor dashboard with live session takeover, advanced text analytics including sentiment analysis, named entity recognition, key phrase extraction, and escalation detection.
Date: August 2025 - Present (ongoing).
Demo: https://www.youtube.com/embed/ywyslOxT714`,

  godseye: `GodsEye — experimental gesture-controlled gaming mouse using computer vision.
Tech: Python, OpenCV, Mediapipe, NumPy, PyAutoGUI.
Features: 468 facial landmark detection in real-time, head pose estimation and eye tracking for cursor control, blink-to-click detection (experimental, currently unreliable — under active development).
Aims to replace a physical mouse using only a webcam and face gestures.
Date: April 2025 - Present (prototype, active development).
GitHub: https://github.com/DrVanHelsing/GodsEye`,

  hangman: `Hangman — classic word-guessing game built in C# .NET.
Tech: C#, .NET.
Features: Classic hangman gameplay with visual progression, difficulty levels (easy/medium/hard), scorekeeping with round-based tracking.
Date: April 2025.
GitHub: https://github.com/DrVanHelsing/Hangman`,

  tictactoe: `TicTacToe — C# .NET implementation with an unbeatable minimax AI.
Tech: C#, .NET.
Features: Minimax algorithm AI opponent that cannot be beaten, two-player local mode, clean win/draw detection.
Date: March 2025.
GitHub: https://github.com/DrVanHelsing/TicTacToe`,

  postgrad: `PostGrad Portal — comprehensive academic management system for postgraduate students.
Tech: React 19.2, Vite 7.3.1, Firebase, Cloud Firestore, EmailJS.
Features: 6 user roles, 20 document templates, 15 field types, 11 email notification functions, PDF annotations, digital signatures, DOCX export, 13 guided onboarding tours.
Date: February 2025 - Present (ongoing, academic paper in progress).
GitHub: https://github.com/DrVanHelsing/PostGrad-Portal`,

  geology: `Geology Field Simulator — real-time 3D geological field simulation running in the browser.
Tech: React 18.2, Three.js 0.162, Zustand 4.5, GLSL shaders, WebGL.
Features: 2km x 2km procedurally generated terrain with 148K vertices, 6 stratigraphic rock layers, 5 simulated field instruments, hydraulic erosion simulation, PBR Cook-Torrance shading. Unity v2.1 planned.
Co-authoring academic paper with UWC Earth Sciences.
Date: February 2025 - Present.
GitHub: https://github.com/DrVanHelsing/Geology-Sim
Demo: https://www.youtube.com/watch?v=1TdGAllOkNg`,

  physics: `Physics Lab — browser-based 3D physics simulation IDE using visual block programming.
Tech: Node.js 18+, React, Blockly visual editor, GlowScript 3.2, VPython.
Features: 23 custom Blockly blocks for physics concepts, 5 starter templates, 4 export formats, dual code/block editor, live 3D viewport, iframe sandboxed execution.
Date: February 2025 - Present.
GitHub: https://github.com/DrVanHelsing/physics-ide
Demo: https://www.youtube.com/watch?v=4M9JiaAnt50`,

  antitemu: `Anti-Temu — Chrome extension that eliminates Temu ads and sponsored content across the web.
Tech: JavaScript, Chrome Extension Manifest V3, chrome.storage.local.
Features: Zero network requests (fully local), smart ad detection across multiple ad formats, per-site toggle with persistent preferences, two themes (Default and Temu Killer mode).
Date: January 2025.
GitHub: https://github.com/DrVanHelsing/Anti-Temu
Demo: https://www.youtube.com/embed/_5ktMoHslwQ`,
};

const PAGE_ALIASES = {
  home: 'home', '/': 'home',
  about: 'about',
  projects: 'projects',
  skills: 'skills',
  resume: 'resume', cv: 'resume',
  experience: 'experience', exp: 'experience',
  contact: 'contact',
  financebuddy: 'financebuddy', finance: 'financebuddy', buddy: 'financebuddy',
  'machine-learning': 'ml', ml: 'ml', machinelearning: 'ml',
  studentlink: 'studentlink', student: 'studentlink',
  'callcentre-ai': 'callcentre', callcentre: 'callcentre', callcenter: 'callcentre', callcentreai: 'callcentre',
  godseye: 'godseye', gods: 'godseye',
  hangman: 'hangman',
  tictactoe: 'tictactoe', ttt: 'tictactoe',
  'postgrad-portal': 'postgrad', postgrad: 'postgrad', portal: 'postgrad',
  'geology-sim': 'geology', geology: 'geology', geo: 'geology',
  'physics-lab': 'physics', physics: 'physics',
  'anti-temu': 'antitemu', antitemu: 'antitemu', temu: 'antitemu',
};

function buildPrompt(pageKey, context) {
  return `You are describing a section of a developer portfolio to a visitor using a terminal widget. Write a concise, informative summary in plain text only — no markdown, no bullet dashes or asterisks, no headers. Put any URLs on their own line. 6-8 lines maximum. Be direct and informative. End with a short tip like "Type 'open geology' to visit this project."

Page: ${pageKey}

${context}`;
}

async function streamAISummary(pageKey, onChunk, onDone, onError) {
  const context = PAGE_CONTEXTS[pageKey];
  if (!context) { onError(`No context for: ${pageKey}`); return; }
  if (!OPENROUTER_KEY) { onError('AI key not configured.'); return; }

  try {
    const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': window.location.origin,
        'X-Title': 'Portfolio Terminal',
      },
      body: JSON.stringify({
        model: OPENROUTER_MODEL,
        stream: true,
        max_tokens: 500,
        messages: [{ role: 'user', content: buildPrompt(pageKey, context) }],
      }),
    });

    if (!res.ok) {
      const t = await res.text();
      onError(`API ${res.status}: ${t.slice(0, 120)}`);
      return;
    }

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let buf = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buf += decoder.decode(value, { stream: true });
      const lines = buf.split('\n');
      buf = lines.pop() ?? '';

      for (const line of lines) {
        const t = line.trim();
        if (!t) continue;
        if (t === 'data: [DONE]') { onDone(); return; }
        if (t.startsWith('data: ')) {
          try {
            const json = JSON.parse(t.slice(6));
            const content = json.choices?.[0]?.delta?.content;
            if (content) onChunk(content);
          } catch { /* ignore malformed SSE frames */ }
        }
      }
    }

    onDone();
  } catch (err) {
    onError(err.message ?? 'Network error');
  }
}

export default function TerminalWidget() {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded]   = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMinimized, setIsMinimized]  = useState(false);
  const [isAILoading, setIsAILoading]  = useState(false);
  const [inputValue, setInputValue]    = useState('');
  const [history, setHistory]          = useState(WELCOME_LINES);
  const [cmdHistory, setCmdHistory]    = useState([]);
  const [historyIdx, setHistoryIdx]    = useState(-1);
  const bodyRef  = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isExpanded && !isMinimized) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isExpanded, isMinimized]);

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [history]);

  function closeTerminal() {
    setIsExpanded(false);
    setIsFullscreen(false);
    setIsMinimized(false);
  }

  function addLines(lines) {
    setHistory(prev => [...prev, ...lines]);
  }

  async function handleSummarize(parts) {
    let pageKey;

    if (parts[1] === 'projects' && parts[2]) {
      pageKey = PAGE_ALIASES[parts[2]] ?? parts[2];
    } else if (parts[1] && parts[1] !== 'projects') {
      pageKey = PAGE_ALIASES[parts[1]] ?? parts[1];
    } else {
      addLines([
        { type: 'dim', text: 'Usage: summarize <page>' },
        { type: 'dim', text: '       summarize projects <slug>' },
        { type: 'dim', text: '  e.g. summarize about' },
        { type: 'dim', text: '  e.g. summarize projects geology' },
        { type: 'blank' },
      ]);
      return;
    }

    if (!PAGE_CONTEXTS[pageKey]) {
      addLines([
        { type: 'dim', text: `Unknown page: ${parts[1]}${parts[2] ? ' ' + parts[2] : ''}` },
        { type: 'dim', text: "  Type 'ls projects' to see available slugs." },
        { type: 'blank' },
      ]);
      return;
    }

    setIsAILoading(true);
    const streamId = `ai-${Date.now()}`;

    addLines([
      { type: 'ok', text: `→ AI summary: ${pageKey}` },
      { type: 'ai', text: '', id: streamId },
    ]);

    await streamAISummary(
      pageKey,
      (chunk) => {
        setHistory(prev => prev.map(l => l.id === streamId ? { ...l, text: l.text + chunk } : l));
      },
      () => {
        setHistory(prev => prev.map(l => l.id === streamId ? { ...l, id: undefined } : l));
        setHistory(prev => [...prev, { type: 'blank' }]);
        setIsAILoading(false);
      },
      (errMsg) => {
        setHistory(prev => prev.map(l =>
          l.id === streamId ? { ...l, text: `Error: ${errMsg}`, id: undefined } : l
        ));
        setHistory(prev => [...prev, { type: 'blank' }]);
        setIsAILoading(false);
      },
    );
  }

  async function processCommand(raw) {
    const cmd   = raw.trim().toLowerCase();
    const parts = cmd.split(/\s+/);

    addLines([{ type: 'cmd', text: PROMPT + raw }]);

    switch (parts[0]) {
      case 'help':
      case 'man':
        addLines([
          { type: 'ok',  text: 'Available commands:' },
          { type: 'dim', text: '' },
          { type: 'dim', text: '  Navigation' },
          { type: 'dim', text: '    nav_to <page>            → Navigate to a page' },
          { type: 'dim', text: '      pages: home  about  projects  skills  resume  contact' },
          { type: 'blank' },
          { type: 'dim', text: '  Projects' },
          { type: 'dim', text: '    ls                       → List all pages' },
          { type: 'dim', text: '    ls projects              → List all project slugs' },
          { type: 'dim', text: '    open <slug>              → Navigate to a project' },
          { type: 'blank' },
          { type: 'dim', text: '  AI' },
          { type: 'dim', text: '    summarize <page>         → AI summary of a page' },
          { type: 'dim', text: '    summarize projects <slug>→ AI summary of a project' },
          { type: 'blank' },
          { type: 'dim', text: '  Social' },
          { type: 'dim', text: '    github   linkedin   email' },
          { type: 'blank' },
          { type: 'dim', text: '  Other' },
          { type: 'dim', text: '    whoami   theme   clear   exit / quit' },
          { type: 'blank' },
        ]);
        break;

      case 'ls':
        if (parts[1] === 'projects') {
          addLines([
            { type: 'ok',  text: 'Projects — use with open or summarize projects:' },
            { type: 'dim', text: '  financebuddy   studentlink   callcentre' },
            { type: 'dim', text: '  godseye        hangman       tictactoe' },
            { type: 'dim', text: '  postgrad       geology       physics' },
            { type: 'dim', text: '  antitemu       ml' },
            { type: 'blank' },
          ]);
        } else {
          addLines([
            { type: 'ok',  text: 'Pages:' },
            { type: 'dim', text: '  /  about  projects  skills  resume  contact' },
            { type: 'blank' },
            { type: 'dim', text: "  Run 'ls projects' to list project slugs." },
            { type: 'dim', text: "  Run 'man' or 'help' for all commands." },
            { type: 'blank' },
          ]);
        }
        break;

      case 'nav_to': {
        const dest = parts[1];
        const navMap = {
          home: '/', '/': '/',
          about: '/about',
          projects: '/projects',
          skills: '/skills',
          resume: '/resume', experience: '/resume', exp: '/resume',
          contact: '/contact',
        };
        if (!dest) {
          addLines([
            { type: 'dim', text: 'Usage: nav_to <page>' },
            { type: 'dim', text: '  pages: home  about  projects  skills  resume  contact' },
            { type: 'blank' },
          ]);
        } else if (navMap[dest] !== undefined) {
          if (dest === 'contact') {
            navigate('/contact');
            closeTerminal();
          } else {
            navigate(navMap[dest]);
          }
          addLines([{ type: 'rdy', text: `→ nav_to ${dest}` }, { type: 'blank' }]);
        } else {
          addLines([
            { type: 'dim', text: `nav_to: unknown page: ${dest}` },
            { type: 'dim', text: '  pages: home  about  projects  skills  resume  contact' },
            { type: 'blank' },
          ]);
        }
        break;
      }

      case 'exit':
      case 'quit':
        closeTerminal();
        break;

      case 'whoami':
        addLines([
          { type: 'ok',  text: 'Tredir Sewpaul' },
          { type: 'dim', text: '  Full-stack developer & designer' },
          { type: 'dim', text: '  Based in South Africa' },
          { type: 'dim', text: '  github.com/DrVanHelsing' },
          { type: 'blank' },
        ]);
        break;

      case 'open': {
        const slug     = parts[1];
        const resolved = PROJECT_SLUGS[slug];
        if (!slug) {
          addLines([
            { type: 'dim', text: 'Usage: open <slug>  (e.g. open godseye)' },
            { type: 'dim', text: "  Run 'ls projects' to see available slugs." },
            { type: 'blank' },
          ]);
        } else if (resolved) {
          navigate(`/projects/${resolved}`);
          addLines([{ type: 'rdy', text: `→ Opening project: ${slug}` }, { type: 'blank' }]);
        } else {
          addLines([
            { type: 'dim', text: `Project '${slug}' not found.` },
            { type: 'dim', text: "  Run 'ls projects' to see available slugs." },
            { type: 'blank' },
          ]);
        }
        break;
      }

      case 'summarize':
        await handleSummarize(parts);
        break;

      case 'github':
        window.open('https://github.com/DrVanHelsing', '_blank', 'noopener');
        addLines([{ type: 'ok', text: '→ Opening GitHub…' }, { type: 'blank' }]);
        break;

      case 'linkedin':
        window.open('https://linkedin.com/in/tredir-sewpaul', '_blank', 'noopener');
        addLines([{ type: 'ok', text: '→ Opening LinkedIn…' }, { type: 'blank' }]);
        break;

      case 'email':
        window.location.href = 'mailto:tredirsewpaul@gmail.com';
        addLines([{ type: 'ok', text: '→ Opening email client…' }, { type: 'blank' }]);
        break;

      case 'theme': {
        const current = document.documentElement.getAttribute('data-theme');
        const next    = current === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
        addLines([{ type: 'ok', text: `→ Theme switched to ${next}` }, { type: 'blank' }]);
        break;
      }

      case 'sudo':
        addLines([{ type: 'dim', text: 'Nice try. You are not in the sudoers file.' }, { type: 'blank' }]);
        break;

      case 'rm':
        if (parts.includes('-rf') || parts[1] === '-rf') {
          addLines([
            { type: 'dim', text: '💀 Segmentation fault (core dumped)' },
            { type: 'dim', text: '   Just kidding. Portfolio still intact.' },
            { type: 'blank' },
          ]);
        } else {
          addLines([{ type: 'dim', text: 'rm: missing operand' }, { type: 'blank' }]);
        }
        break;

      case 'hello':
      case 'hi':
        addLines([{ type: 'sym', text: 'Hello, human. 👋' }, { type: 'blank' }]);
        break;

      case '':
        break;

      default:
        addLines([
          { type: 'dim', text: `command not found: ${parts[0]}` },
          { type: 'dim', text: "  Type 'help' to list commands." },
          { type: 'blank' },
        ]);
    }
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      if (isAILoading) return;
      const val = inputValue;
      if (val.trim().toLowerCase() === 'clear') {
        setHistory(WELCOME_LINES);
        setInputValue('');
        setCmdHistory(prev => [val, ...prev]);
        setHistoryIdx(-1);
        return;
      }
      processCommand(val);
      if (val.trim()) setCmdHistory(prev => [val, ...prev]);
      setInputValue('');
      setHistoryIdx(-1);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHistoryIdx(prev => {
        const next = Math.min(prev + 1, cmdHistory.length - 1);
        setInputValue(cmdHistory[next] ?? '');
        return next;
      });
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHistoryIdx(prev => {
        const next = Math.max(prev - 1, -1);
        setInputValue(next === -1 ? '' : (cmdHistory[next] ?? ''));
        return next;
      });
    }
  }

  const lineClass = {
    ctx:   'tw-line-ctx',
    cmd:   'tw-line-cmd',
    sym:   'tw-line-sym',
    ok:    'tw-line-ok',
    dim:   'tw-line-dim',
    rdy:   'tw-line-rdy',
    ai:    'tw-line-ai',
    blank: 'tw-line-blank',
  };

  const panelClasses = ['tw-panel', isFullscreen && 'tw-fullscreen', isMinimized && 'tw-minimized']
    .filter(Boolean).join(' ');

  return (
    <div className="tw-container">
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className={panelClasses}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            style={{ transformOrigin: 'bottom right' }}
          >
            <div
              className="tw-header"
              onClick={isMinimized ? () => setIsMinimized(false) : undefined}
              style={isMinimized ? { cursor: 'pointer' } : undefined}
            >
              <div className="tw-traffic-lights">
                <span
                  className="tw-dot tw-dot-red"
                  title="Close"
                  onClick={(e) => { e.stopPropagation(); closeTerminal(); }}
                />
                <span
                  className="tw-dot tw-dot-yellow"
                  title="Minimize"
                  onClick={(e) => { e.stopPropagation(); setIsMinimized(p => !p); setIsFullscreen(false); }}
                />
                <span
                  className="tw-dot tw-dot-green"
                  title="Fullscreen"
                  onClick={(e) => { e.stopPropagation(); setIsFullscreen(p => !p); setIsMinimized(false); }}
                />
              </div>
              <span className="tw-title">
                bash{isMinimized ? ' — click to restore' : ''}
              </span>
            </div>

            {!isMinimized && (
              <>
                <div className="tw-tabbar">
                  <span className="tw-tab tw-tab-active">bash</span>
                </div>

                <div className="tw-body" ref={bodyRef}>
                  {history.map((line, i) => (
                    <div key={i} className={lineClass[line.type] ?? 'tw-line-cmd'}>
                      {line.type === 'blank'
                        ? '\u00A0'
                        : line.type === 'ai'
                          ? (line.text === '' && line.id ? '▋' : line.text)
                          : line.text}
                    </div>
                  ))}
                </div>

                <div className="tw-input-row">
                  <span className="tw-prompt">{PROMPT}</span>
                  <input
                    ref={inputRef}
                    className="tw-input"
                    type="text"
                    value={inputValue}
                    onChange={e => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    disabled={isAILoading}
                    autoComplete="off"
                    spellCheck={false}
                    aria-label="Terminal input"
                    placeholder={isAILoading ? 'AI is thinking…' : ''}
                  />
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        className="tw-bubble"
        onClick={() => setIsExpanded(prev => !prev)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Toggle terminal"
        aria-expanded={isExpanded}
      >
        <Terminal size={20} />
      </motion.button>
    </div>
  );
}
