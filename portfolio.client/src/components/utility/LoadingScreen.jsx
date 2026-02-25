import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, GitBranch, Check } from 'lucide-react';
import AnimatedBackground from '../sections/AnimatedBackground';
import './LoadingScreen.css';

// Render an array of {c, v} token objects as spans
const Tokens = ({ tokens }) => (
  <>{tokens.map((t, i) => <span key={i} className={t.c}>{t.v}</span>)}</>
);

// Render a single code line from data — null = blank line
const CodeLine = ({ line, cursor = false, cursorVisible = true }) => {
  if (!line) return <div className="ide-line ide-line-blank" />;
  return (
    <div className={`ide-line${line.ind ? ' ide-line-ind' : ''}`}>
      <Tokens tokens={line.tokens} />
      {cursor && (
        <span className={`ide-cursor${cursorVisible ? '' : ' ide-cursor-off'}`}>▌</span>
      )}
    </div>
  );
};

// Per-language code blocks: 9 pre-lines, greeting tokens (line 10), 3 post-lines
const greetings = [
  // ── JavaScript ──────────────────────────────────────────────────────────────
  {
    lang: 'JavaScript', ext: 'js', termCmd: 'node portfolio.js',
    pre: [
      { tokens: [{ c: 'ide-cmt', v: '// portfolio · tredir sewpaul' }] },
      null,
      { tokens: [{ c: 'ide-kw', v: 'const ' }, { c: 'ide-var', v: 'developer' }, { c: 'ide-punc', v: ' = {' }] },
      { ind: true, tokens: [{ c: 'ide-prop', v: 'name' }, { c: 'ide-punc', v: ': ' }, { c: 'ide-str', v: '"Tredir Sewpaul"' }, { c: 'ide-punc', v: ',' }] },
      { ind: true, tokens: [{ c: 'ide-prop', v: 'role' }, { c: 'ide-punc', v: ': ' }, { c: 'ide-str', v: '"CS Graduate & AI Engineer"' }, { c: 'ide-punc', v: ',' }] },
      { ind: true, tokens: [{ c: 'ide-prop', v: 'passion' }, { c: 'ide-punc', v: ': [' }, { c: 'ide-str', v: '"ML"' }, { c: 'ide-punc', v: ', ' }, { c: 'ide-str', v: '"Web"' }, { c: 'ide-punc', v: '],' }] },
      { tokens: [{ c: 'ide-punc', v: '};' }] },
      null,
      { tokens: [{ c: 'ide-kw', v: 'function ' }, { c: 'ide-fn', v: 'greet' }, { c: 'ide-punc', v: '() {' }] },
    ],
    greeting: [{ c: 'ide-fn', v: 'console' }, { c: 'ide-punc', v: '.' }, { c: 'ide-fn', v: 'log' }, { c: 'ide-punc', v: '(' }, { c: 'ide-str', v: '"Hello World!"' }, { c: 'ide-punc', v: ');' }],
    post: [
      { tokens: [{ c: 'ide-punc', v: '}' }] },
      null,
      { tokens: [{ c: 'ide-fn', v: 'greet' }, { c: 'ide-punc', v: '();' }] },
    ],
  },
  // ── Python ──────────────────────────────────────────────────────────────────
  {
    lang: 'Python', ext: 'py', termCmd: 'python3 portfolio.py',
    pre: [
      { tokens: [{ c: 'ide-cmt', v: '# portfolio · tredir sewpaul' }] },
      null,
      { tokens: [{ c: 'ide-var', v: 'developer' }, { c: 'ide-punc', v: ' = {' }] },
      { ind: true, tokens: [{ c: 'ide-str', v: '"name"' }, { c: 'ide-punc', v: ': ' }, { c: 'ide-str', v: '"Tredir Sewpaul"' }, { c: 'ide-punc', v: ',' }] },
      { ind: true, tokens: [{ c: 'ide-str', v: '"role"' }, { c: 'ide-punc', v: ': ' }, { c: 'ide-str', v: '"CS Graduate & AI Engineer"' }, { c: 'ide-punc', v: ',' }] },
      { ind: true, tokens: [{ c: 'ide-str', v: '"passion"' }, { c: 'ide-punc', v: ': [' }, { c: 'ide-str', v: '"ML"' }, { c: 'ide-punc', v: ', ' }, { c: 'ide-str', v: '"Web"' }, { c: 'ide-punc', v: '],' }] },
      { tokens: [{ c: 'ide-punc', v: '}' }] },
      null,
      { tokens: [{ c: 'ide-kw', v: 'def ' }, { c: 'ide-fn', v: 'greet' }, { c: 'ide-punc', v: '():' }] },
    ],
    greeting: [{ c: 'ide-fn', v: 'print' }, { c: 'ide-punc', v: '(' }, { c: 'ide-str', v: '"Hello World!"' }, { c: 'ide-punc', v: ')' }],
    post: [
      null,
      null,
      { tokens: [{ c: 'ide-fn', v: 'greet' }, { c: 'ide-punc', v: '()' }] },
    ],
  },
  // ── C# ──────────────────────────────────────────────────────────────────────
  {
    lang: 'C#', ext: 'cs', termCmd: 'dotnet run',
    pre: [
      { tokens: [{ c: 'ide-cmt', v: '// portfolio · tredir sewpaul' }] },
      null,
      { tokens: [{ c: 'ide-kw', v: 'var ' }, { c: 'ide-var', v: 'developer' }, { c: 'ide-punc', v: ' = new {' }] },
      { ind: true, tokens: [{ c: 'ide-prop', v: 'Name' }, { c: 'ide-punc', v: ' = ' }, { c: 'ide-str', v: '"Tredir Sewpaul"' }, { c: 'ide-punc', v: ',' }] },
      { ind: true, tokens: [{ c: 'ide-prop', v: 'Role' }, { c: 'ide-punc', v: ' = ' }, { c: 'ide-str', v: '"CS Graduate & AI Engineer"' }, { c: 'ide-punc', v: ',' }] },
      { ind: true, tokens: [{ c: 'ide-prop', v: 'Passion' }, { c: 'ide-punc', v: ' = new[] {' }, { c: 'ide-str', v: '"ML"' }, { c: 'ide-punc', v: ', ' }, { c: 'ide-str', v: '"Web"' }, { c: 'ide-punc', v: '},' }] },
      { tokens: [{ c: 'ide-punc', v: '};' }] },
      null,
      { tokens: [{ c: 'ide-kw', v: 'void ' }, { c: 'ide-fn', v: 'Greet' }, { c: 'ide-punc', v: '() {' }] },
    ],
    greeting: [{ c: 'ide-prop', v: 'Console' }, { c: 'ide-punc', v: '.' }, { c: 'ide-fn', v: 'WriteLine' }, { c: 'ide-punc', v: '(' }, { c: 'ide-str', v: '"Hello World!"' }, { c: 'ide-punc', v: ');' }],
    post: [
      { tokens: [{ c: 'ide-punc', v: '}' }] },
      null,
      { tokens: [{ c: 'ide-fn', v: 'Greet' }, { c: 'ide-punc', v: '();' }] },
    ],
  },
  // ── Java ────────────────────────────────────────────────────────────────────
  {
    lang: 'Java', ext: 'java', termCmd: 'java Portfolio',
    pre: [
      { tokens: [{ c: 'ide-cmt', v: '// portfolio · tredir sewpaul' }] },
      null,
      { tokens: [{ c: 'ide-kw', v: 'var ' }, { c: 'ide-var', v: 'dev' }, { c: 'ide-punc', v: ' = Map.of(' }] },
      { ind: true, tokens: [{ c: 'ide-str', v: '"name"' }, { c: 'ide-punc', v: ', ' }, { c: 'ide-str', v: '"Tredir Sewpaul"' }, { c: 'ide-punc', v: ',' }] },
      { ind: true, tokens: [{ c: 'ide-str', v: '"role"' }, { c: 'ide-punc', v: ', ' }, { c: 'ide-str', v: '"CS Graduate & AI Engineer"' }, { c: 'ide-punc', v: ',' }] },
      { ind: true, tokens: [{ c: 'ide-str', v: '"passion"' }, { c: 'ide-punc', v: ', List.of(' }, { c: 'ide-str', v: '"ML"' }, { c: 'ide-punc', v: ', ' }, { c: 'ide-str', v: '"Web"' }, { c: 'ide-punc', v: ')' }] },
      { tokens: [{ c: 'ide-punc', v: ');' }] },
      null,
      { tokens: [{ c: 'ide-kw', v: 'void ' }, { c: 'ide-fn', v: 'greet' }, { c: 'ide-punc', v: '() {' }] },
    ],
    greeting: [{ c: 'ide-prop', v: 'System' }, { c: 'ide-punc', v: '.out.' }, { c: 'ide-fn', v: 'println' }, { c: 'ide-punc', v: '(' }, { c: 'ide-str', v: '"Hello World!"' }, { c: 'ide-punc', v: ');' }],
    post: [
      { tokens: [{ c: 'ide-punc', v: '}' }] },
      null,
      { tokens: [{ c: 'ide-fn', v: 'greet' }, { c: 'ide-punc', v: '();' }] },
    ],
  },
  // ── Go ──────────────────────────────────────────────────────────────────────
  {
    lang: 'Go', ext: 'go', termCmd: 'go run portfolio.go',
    pre: [
      { tokens: [{ c: 'ide-cmt', v: '// portfolio · tredir sewpaul' }] },
      null,
      { tokens: [{ c: 'ide-var', v: 'developer' }, { c: 'ide-punc', v: ' := map[' }, { c: 'ide-kw', v: 'string' }, { c: 'ide-punc', v: ']' }, { c: 'ide-kw', v: 'any' }, { c: 'ide-punc', v: '{' }] },
      { ind: true, tokens: [{ c: 'ide-str', v: '"name"' }, { c: 'ide-punc', v: ': ' }, { c: 'ide-str', v: '"Tredir Sewpaul"' }, { c: 'ide-punc', v: ',' }] },
      { ind: true, tokens: [{ c: 'ide-str', v: '"role"' }, { c: 'ide-punc', v: ': ' }, { c: 'ide-str', v: '"CS Graduate & AI Engineer"' }, { c: 'ide-punc', v: ',' }] },
      { ind: true, tokens: [{ c: 'ide-str', v: '"passion"' }, { c: 'ide-punc', v: ': []' }, { c: 'ide-kw', v: 'string' }, { c: 'ide-punc', v: '{' }, { c: 'ide-str', v: '"ML"' }, { c: 'ide-punc', v: ', ' }, { c: 'ide-str', v: '"Web"' }, { c: 'ide-punc', v: '},' }] },
      { tokens: [{ c: 'ide-punc', v: '}' }] },
      null,
      { tokens: [{ c: 'ide-kw', v: 'func ' }, { c: 'ide-fn', v: 'greet' }, { c: 'ide-punc', v: '() {' }] },
    ],
    greeting: [{ c: 'ide-prop', v: 'fmt' }, { c: 'ide-punc', v: '.' }, { c: 'ide-fn', v: 'Println' }, { c: 'ide-punc', v: '(' }, { c: 'ide-str', v: '"Hello World!"' }, { c: 'ide-punc', v: ')' }],
    post: [
      { tokens: [{ c: 'ide-punc', v: '}' }] },
      null,
      { tokens: [{ c: 'ide-fn', v: 'greet' }, { c: 'ide-punc', v: '()' }] },
    ],
  },
  // ── C++ ─────────────────────────────────────────────────────────────────────
  {
    lang: 'C++', ext: 'cpp', termCmd: './portfolio',
    pre: [
      { tokens: [{ c: 'ide-cmt', v: '// portfolio · tredir sewpaul' }] },
      null,
      { tokens: [{ c: 'ide-kw', v: 'struct ' }, { c: 'ide-var', v: 'Developer' }, { c: 'ide-punc', v: ' {' }] },
      { ind: true, tokens: [{ c: 'ide-kw', v: 'string ' }, { c: 'ide-var', v: 'name' }, { c: 'ide-punc', v: ' = ' }, { c: 'ide-str', v: '"Tredir Sewpaul"' }, { c: 'ide-punc', v: ';' }] },
      { ind: true, tokens: [{ c: 'ide-kw', v: 'string ' }, { c: 'ide-var', v: 'role' }, { c: 'ide-punc', v: ' = ' }, { c: 'ide-str', v: '"CS Graduate & AI Engineer"' }, { c: 'ide-punc', v: ';' }] },
      { ind: true, tokens: [{ c: 'ide-kw', v: 'vector' }, { c: 'ide-punc', v: '<string> ' }, { c: 'ide-var', v: 'passion' }, { c: 'ide-punc', v: ' = {' }, { c: 'ide-str', v: '"ML"' }, { c: 'ide-punc', v: ', ' }, { c: 'ide-str', v: '"Web"' }, { c: 'ide-punc', v: '};' }] },
      { tokens: [{ c: 'ide-punc', v: '};' }] },
      null,
      { tokens: [{ c: 'ide-kw', v: 'void ' }, { c: 'ide-fn', v: 'greet' }, { c: 'ide-punc', v: '() {' }] },
    ],
    greeting: [{ c: 'ide-var', v: 'cout' }, { c: 'ide-punc', v: ' << ' }, { c: 'ide-str', v: '"Hello World!"' }, { c: 'ide-punc', v: ';' }],
    post: [
      { tokens: [{ c: 'ide-punc', v: '}' }] },
      null,
      { tokens: [{ c: 'ide-fn', v: 'greet' }, { c: 'ide-punc', v: '();' }] },
    ],
  },
  // ── PHP ─────────────────────────────────────────────────────────────────────
  {
    lang: 'PHP', ext: 'php', termCmd: 'php portfolio.php',
    pre: [
      { tokens: [{ c: 'ide-cmt', v: '// portfolio · tredir sewpaul' }] },
      null,
      { tokens: [{ c: 'ide-var', v: '$developer' }, { c: 'ide-punc', v: ' = [' }] },
      { ind: true, tokens: [{ c: 'ide-str', v: '"name"' }, { c: 'ide-punc', v: ' => ' }, { c: 'ide-str', v: '"Tredir Sewpaul"' }, { c: 'ide-punc', v: ',' }] },
      { ind: true, tokens: [{ c: 'ide-str', v: '"role"' }, { c: 'ide-punc', v: ' => ' }, { c: 'ide-str', v: '"CS Graduate & AI Engineer"' }, { c: 'ide-punc', v: ',' }] },
      { ind: true, tokens: [{ c: 'ide-str', v: '"passion"' }, { c: 'ide-punc', v: ' => [' }, { c: 'ide-str', v: '"ML"' }, { c: 'ide-punc', v: ', ' }, { c: 'ide-str', v: '"Web"' }, { c: 'ide-punc', v: '],' }] },
      { tokens: [{ c: 'ide-punc', v: '];' }] },
      null,
      { tokens: [{ c: 'ide-kw', v: 'function ' }, { c: 'ide-fn', v: 'greet' }, { c: 'ide-punc', v: '() {' }] },
    ],
    greeting: [{ c: 'ide-kw', v: 'echo ' }, { c: 'ide-str', v: '"Hello World!"' }, { c: 'ide-punc', v: ';' }],
    post: [
      { tokens: [{ c: 'ide-punc', v: '}' }] },
      null,
      { tokens: [{ c: 'ide-fn', v: 'greet' }, { c: 'ide-punc', v: '();' }] },
    ],
  },
  // ── Rust ────────────────────────────────────────────────────────────────────
  {
    lang: 'Rust', ext: 'rs', termCmd: 'cargo run',
    pre: [
      { tokens: [{ c: 'ide-cmt', v: '// portfolio · tredir sewpaul' }] },
      null,
      { tokens: [{ c: 'ide-kw', v: 'struct ' }, { c: 'ide-var', v: 'Developer' }, { c: 'ide-punc', v: ' {' }] },
      { ind: true, tokens: [{ c: 'ide-prop', v: 'name' }, { c: 'ide-punc', v: ': ' }, { c: 'ide-kw', v: "&'static str" }, { c: 'ide-punc', v: ',' }] },
      { ind: true, tokens: [{ c: 'ide-prop', v: 'role' }, { c: 'ide-punc', v: ': ' }, { c: 'ide-kw', v: "&'static str" }, { c: 'ide-punc', v: ',' }] },
      { ind: true, tokens: [{ c: 'ide-prop', v: 'passion' }, { c: 'ide-punc', v: ': ' }, { c: 'ide-kw', v: 'Vec' }, { c: 'ide-punc', v: '<' }, { c: 'ide-kw', v: "&'static str" }, { c: 'ide-punc', v: '>,' }] },
      { tokens: [{ c: 'ide-punc', v: '}' }] },
      null,
      { tokens: [{ c: 'ide-kw', v: 'fn ' }, { c: 'ide-fn', v: 'greet' }, { c: 'ide-punc', v: '() {' }] },
    ],
    greeting: [{ c: 'ide-fn', v: 'println!' }, { c: 'ide-punc', v: '(' }, { c: 'ide-str', v: '"Hello World!"' }, { c: 'ide-punc', v: ');' }],
    post: [
      { tokens: [{ c: 'ide-punc', v: '}' }] },
      null,
      { tokens: [{ c: 'ide-fn', v: 'greet' }, { c: 'ide-punc', v: '();' }] },
    ],
  },
];

const TERM_LINE_COUNT = 13;

const LoadingScreen = ({ onEnter }) => {
  const [isVisible, setIsVisible]             = useState(true);
  const [currentGreeting, setCurrentGreeting] = useState(0);
  const [cursorOn, setCursorOn]               = useState(true);
  const [termVisible, setTermVisible]         = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCurrentGreeting(p => (p + 1) % greetings.length);
    }, 5000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setCursorOn(v => !v), 530);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    setTermVisible(0);
    let count = 0;
    const id = setInterval(() => {
      count++;
      setTermVisible(count);
      if (count >= TERM_LINE_COUNT + 1) clearInterval(id);
    }, 65);
    return () => clearInterval(id);
  }, [currentGreeting]);

  const handleEnter = () => {
    setIsVisible(false);
    setTimeout(() => { if (onEnter) onEnter(); }, 800);
  };

  const g        = greetings[currentGreeting];
  const filename = `portfolio.${g.ext}`;
  const termLines = [
    { t: 'ctx', v: 'tredir@portfolio  ~/portfolio  (glassomorphism)' },
    { t: 'cmd', v: g.termCmd },
    { t: 'blank' },
    { t: 'out', v: '  Hello, World!' },
    { t: 'blank' },
    { t: 'dim', v: '  Loading profile...' },
    { t: 'ok',  v: '  ✓  Tredir Sewpaul  ·  CS Graduate & AI Engineer' },
    { t: 'ok',  v: '  ✓  Samsung Future Innovation Lab Graduate' },
    { t: 'ok',  v: '  ✓  Projects shipped: 11' },
    { t: 'ok',  v: '  ✓  Stack: React · Python · C# · TypeScript · Azure' },
    { t: 'ok',  v: '  ✓  Cloud: Azure (AI · Functions · Cosmos DB)' },
    { t: 'ok',  v: '  ✓  Status: Open to opportunities' },
    { t: 'blank' },
    { t: 'ctx', v: 'tredir@portfolio  ~/portfolio  (glassomorphism)' },
  ];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="welcome-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.75, ease: [0.43, 0.13, 0.23, 0.96] }}
        >
          <AnimatedBackground variant="orbs" />

          <motion.div
            className="ide-window"
            initial={{ opacity: 0, y: 28, scale: 0.97 }}
            animate={{ opacity: 1, y: 0,  scale: 1    }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
          >
            {/* ── Title bar ────────────────────────────── */}
            <div className="ide-titlebar">
              <div className="ide-dots">
                <span className="ide-dot ide-dot-red"    onClick={handleEnter} title="Close" />
                <span className="ide-dot ide-dot-yellow" title="Minimise" />
                <span className="ide-dot ide-dot-green"  onClick={handleEnter} title="Enter Portfolio" />
              </div>
              <AnimatePresence mode="wait">
                <motion.span
                  key={filename}
                  className="ide-title"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {filename}
                </motion.span>
              </AnimatePresence>
              <div className="ide-titlebar-spacer" />
            </div>

            {/* ── Tab bar ──────────────────────────────── */}
            <div className="ide-tabbar">
              <AnimatePresence mode="wait">
                <motion.div
                  key={filename}
                  className="ide-tab ide-tab-active"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="ide-tab-modified" />
                  {filename}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* ── Editor body ──────────────────────────── */}
            <div className="ide-body">

              {/* Activity bar */}
              <div className="ide-activitybar">
                <div className="ide-activity-icon ide-activity-active" title="Explorer">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <path d="M3 7a2 2 0 012-2h5l2 2h7a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V7z"/>
                  </svg>
                </div>
                <div className="ide-activity-icon" title="Search">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <circle cx="11" cy="11" r="7"/><path d="M21 21l-4.35-4.35"/>
                  </svg>
                </div>
                <div className="ide-activity-icon" title="Source Control">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <circle cx="6" cy="6" r="2"/><circle cx="18" cy="6" r="2"/><circle cx="6" cy="18" r="2"/>
                    <path d="M6 8v8M18 8v2a4 4 0 01-4 4H6"/>
                  </svg>
                </div>
                <div className="ide-activity-icon" title="Extensions">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <path d="M20.24 12.24a6 6 0 00-8.49-8.49L5 10.5V19h8.5l6.74-6.76zM16 8l-2-2M2 22l1-4"/>
                  </svg>
                </div>
              </div>

              {/* Content split: code editor left · terminal right */}
              <div className="ide-content-split">

                {/* Left: code editor */}
                <div className="ide-editor-wrap">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentGreeting}
                      className="ide-editor"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.18 }}
                    >
                      <div className="ide-gutter">
                        {[1,2,3,4,5,6,7,8,9,10,11,12,13].map(n => (
                          <div key={n} className={`ide-linenum${n === 10 ? ' ide-linenum-active' : ''}`}>{n}</div>
                        ))}
                      </div>
                      <div className="ide-code">
                        {g.pre.map((line, i) => (
                          <CodeLine key={i} line={line} />
                        ))}
                        <div className="ide-line ide-line-ind ide-line-active">
                          <Tokens tokens={g.greeting} />
                        </div>
                        {g.post.map((line, i) => (
                          <CodeLine
                            key={i}
                            line={line}
                            cursor={i === g.post.length - 1}
                            cursorVisible={cursorOn}
                          />
                        ))}
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Right: terminal panel */}
                <div className="ide-terminal-panel">
                  <div className="ide-term-header">
                    <div className="ide-term-tabs">
                      <span className="ide-term-tab ide-term-tab-active">TERMINAL</span>
                      <span className="ide-term-tab">OUTPUT</span>
                    </div>
                    <div className="ide-term-actions">
                      <span className="ide-term-action" title="New Terminal">+</span>
                      <span className="ide-term-action" title="Split Terminal">⌗</span>
                      <span className="ide-term-action" title="Kill Terminal">×</span>
                    </div>
                  </div>
                  <div className="ide-term-body">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentGreeting}
                        className="ide-term-lines"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.15 }}
                      >
                        {termLines.slice(0, termVisible).map((line, i) =>
                          line.t === 'blank'
                            ? <div key={i} className="ide-term-blank" />
                            : <div key={i} className={`ide-term-line ide-term-${line.t}`}>
                                {line.t === 'cmd'
                                  ? <><span className="ide-term-sym">$</span>{' '}{line.v}</>
                                  : line.v
                                }
                              </div>
                        )}
                        {termVisible > TERM_LINE_COUNT && (
                          <div className="ide-term-line ide-term-prompt">
                            <span className="ide-term-sym">$</span>
                            <span className={`ide-cursor${cursorOn ? '' : ' ide-cursor-off'}`}>&nbsp;█</span>
                          </div>
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>

              </div>
            </div>

            {/* ── Run button ───────────────────────────── */}
            <motion.div
              className="ide-run-row"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85, duration: 0.5 }}
            >
              <motion.button
                className="ide-run-btn"
                onClick={handleEnter}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
              >
                <Play size={14} fill="currentColor" />
                Run Portfolio
              </motion.button>
            </motion.div>

            {/* ── Status bar ───────────────────────────── */}
            <div className="ide-statusbar">
              <div className="ide-status-left">
                <span className="ide-status-item">
                  <GitBranch size={13} />
                  &nbsp;glassomorphism
                </span>
                <span className="ide-status-item">
                  <Check size={13} />
                  &nbsp;0
                </span>
              </div>
              <div className="ide-status-right">
                <span className="ide-status-item">Ln 13, Col 8</span>
                <span className="ide-status-item">UTF-8</span>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={g.lang}
                    className="ide-status-item ide-status-lang"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.2 }}
                  >
                    {g.lang}
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
