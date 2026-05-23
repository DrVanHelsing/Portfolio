import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Terminal, Users, MessageSquare, Command, Sparkles } from 'lucide-react';
import './HelpModal.css';

const STARTER_QS = [
  "What is Tredir's current role?",
  "Tell me about the FinanceBuddy project",
  "What tech stack does Tredir know best?",
  "Any hackathon wins?",
  "How can I contact Tredir?",
  "What makes Tredir stand out as a developer?",
  "Describe the CallCentre AI project",
  "What's Tredir studying?",
];

const FS_TREE = `~/
├─ README.md         quick navigation guide
├─ resume.md         experience · education · achievements
├─ skills.txt        full tech stack
├─ projects/
│  ├─ financebuddy      studentlink      callcentre-ai
│  ├─ godseye           geology-sim      physics-lab
│  ├─ postgrad-portal   machine-learning
│  └─ hangman           tictactoe        anti-temu
└─ pages/
   └─ home · about · projects · skills · resume · contact`;

const CMD_GROUPS = [
  { label: 'Navigate', color: 'blue', items: [
    { cmd: 'ls [path]',   tip: 'List directory contents' },
    { cmd: 'ls -la',      tip: 'Detailed listing with type indicators' },
    { cmd: 'cd <dir>',    tip: 'Change directory  (cd ~ → home)' },
    { cmd: 'cd /about',   tip: 'Jump directly to the About page' },
    { cmd: 'pwd',         tip: 'Print current working directory' },
  ]},
  { label: 'Read Files', color: 'blue', items: [
    { cmd: 'cat resume.md',        tip: 'Read the full resume' },
    { cmd: 'cat skills.txt',       tip: 'Read the complete tech stack' },
    { cmd: 'cat projects/<slug>',  tip: 'Read a project file' },
    { cmd: 'cat README.md',        tip: 'Navigation quick-start' },
  ]},
  { label: 'Search & Info', color: 'blue', items: [
    { cmd: 'grep <pattern>',  tip: 'Search all portfolio content' },
    { cmd: 'env',             tip: 'Portfolio environment variables' },
    { cmd: 'whoami',          tip: 'Short bio about Tredir' },
    { cmd: 'man [cmd]',       tip: 'Show command manual pages' },
    { cmd: 'history',         tip: 'Command history' },
  ]},
  { label: 'AI & Pages', color: 'purple', items: [
    { cmd: 'ask <question>',  tip: 'One-shot AI answer' },
    { cmd: '/chat',           tip: 'Multi-turn AI session (exit to leave)' },
    { cmd: 'open <project>',  tip: 'Navigate to a project page' },
    { cmd: 'nav_to <page>',   tip: 'Navigate to any portfolio page' },
    { cmd: 'mode recruiter',  tip: 'Switch to AI Chat mode' },
  ]},
  { label: 'Utility', color: 'dim', items: [
    { cmd: 'help',   tip: 'List all available commands' },
    { cmd: 'clear',  tip: 'Clear the terminal output' },
    { cmd: 'sudo',   tip: '🤫' },
  ]},
];

function AIChatHelp() {
  return (
    <div className="hm-content">

      <div className="hm-hero hm-hero-purple">
        <div className="hm-hero-icon hm-icon-purple"><Users size={20} /></div>
        <div>
          <p className="hm-hero-title">AI Chat Mode</p>
          <p className="hm-hero-desc">
            An AI assistant that knows everything about Tredir — his current role,
            projects, tech stack, education, and achievements. Ask anything naturally.
          </p>
        </div>
      </div>

      <div className="hm-section">
        <div className="hm-section-hd"><Sparkles size={12} /><span>How to start</span></div>
        <ol className="hm-steps">
          <li>
            <span className="hm-num hm-num-purple">1</span>
            Tap any <strong>starter question pill</strong> for an instant answer
          </li>
          <li>
            <span className="hm-num hm-num-purple">2</span>
            Or type your own question and press <kbd className="hm-kbd">Enter</kbd>
          </li>
          <li>
            <span className="hm-num hm-num-purple">3</span>
            Ask follow-ups — the AI <strong>remembers context</strong> within the session
          </li>
          <li>
            <span className="hm-num hm-num-purple">4</span>
            Click <span className="hm-inline-chip hm-chip-blue">⌨ Dev Mode</span> in the header to explore the terminal
          </li>
        </ol>
      </div>

      <div className="hm-section">
        <div className="hm-section-hd"><MessageSquare size={12} /><span>Things to ask</span></div>
        <div className="hm-pill-wrap">
          {STARTER_QS.map((q, i) => <span key={i} className="hm-pill">{q}</span>)}
        </div>
      </div>

      <div className="hm-section">
        <div className="hm-section-hd"><Command size={12} /><span>Window controls</span></div>
        <div className="hm-ctrl-list">
          <div className="hm-ctrl-row"><span className="hm-dot hm-dot-red"/>Close the widget entirely</div>
          <div className="hm-ctrl-row"><span className="hm-dot hm-dot-yellow"/>Minimize — click the header bar to restore</div>
          <div className="hm-ctrl-row"><span className="hm-dot hm-dot-green"/>Fullscreen — expand to fill the screen</div>
          <div className="hm-ctrl-row">
            <span className="hm-inline-chip hm-chip-blue">⌨ Dev Mode</span>
            Switch to the developer terminal
          </div>
        </div>
      </div>

    </div>
  );
}

function DevTerminalHelp() {
  return (
    <div className="hm-content">

      <div className="hm-hero hm-hero-blue">
        <div className="hm-hero-icon hm-icon-blue"><Terminal size={20} /></div>
        <div>
          <p className="hm-hero-title">Dev Terminal Mode</p>
          <p className="hm-hero-desc">
            A real Unix-like terminal for exploring the portfolio. Navigate a virtual
            filesystem, grep the knowledge base, or drop into a multi-turn AI session.
          </p>
        </div>
      </div>

      <div className="hm-section">
        <div className="hm-section-hd"><span className="hm-mono-tag">~/</span><span>Virtual filesystem</span></div>
        <pre className="hm-tree">{FS_TREE}</pre>
      </div>

      <div className="hm-section">
        <div className="hm-section-hd"><Command size={12} /><span>Commands</span></div>
        <div className="hm-cmd-table">
          {CMD_GROUPS.map(g => (
            <div key={g.label} className="hm-cmd-group">
              <span className={`hm-cmd-group-lbl hm-grp-${g.color}`}>{g.label}</span>
              {g.items.map(({ cmd, tip }) => (
                <div key={cmd} className="hm-cmd-row">
                  <code className={`hm-cmd hm-cmd-${g.color === 'purple' ? 'purple' : 'blue'}`}>{cmd}</code>
                  <span className="hm-cmd-tip">{tip}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="hm-section">
        <div className="hm-section-hd"><span className="hm-mono-tag">⌨</span><span>Keyboard shortcuts</span></div>
        <div className="hm-kbd-list">
          {[
            { key: 'Tab',    desc: 'Autocomplete command or path' },
            { key: '↑ / ↓', desc: 'Navigate command history' },
            { key: 'Enter',  desc: 'Execute command' },
          ].map(({ key, desc }) => (
            <div key={key} className="hm-kbd-row">
              <kbd className="hm-kbd hm-kbd-wide">{key}</kbd>
              <span>{desc}</span>
            </div>
          ))}
        </div>
        <p className="hm-hint">
          Unrecognized input is automatically routed to the AI —{' '}
          no <code className="hm-ic">ask</code> prefix needed.
        </p>
      </div>

      <div className="hm-section">
        <div className="hm-section-hd"><Command size={12} /><span>Window controls</span></div>
        <div className="hm-ctrl-list">
          <div className="hm-ctrl-row"><span className="hm-dot hm-dot-red"/>Close the widget entirely</div>
          <div className="hm-ctrl-row"><span className="hm-dot hm-dot-yellow"/>Minimize — click the header bar to restore</div>
          <div className="hm-ctrl-row"><span className="hm-dot hm-dot-green"/>Fullscreen — expand to fill the screen</div>
          <div className="hm-ctrl-row">
            <span className="hm-inline-chip hm-chip-purple">✦ AI Chat</span>
            Switch to the AI chat interface
          </div>
        </div>
      </div>

    </div>
  );
}

export default function HelpModal({ isOpen, onClose, initialTab = 'recruiter' }) {
  const [activeTab, setActiveTab] = useState(initialTab);

  useEffect(() => { setActiveTab(initialTab); }, [initialTab]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="hm-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Widget help guide"
        >
          <motion.div
            className="hm-panel"
            initial={{ opacity: 0, scale: 0.95, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 18 }}
            transition={{ type: 'spring', stiffness: 350, damping: 30 }}
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="hm-header">
              <div className="hm-header-l">
                <span className="hm-q-badge">?</span>
                <span className="hm-panel-title">Widget Guide</span>
              </div>
              <button className="hm-close" onClick={onClose} aria-label="Close help">
                <X size={14} />
              </button>
            </div>

            {/* Tabs */}
            <div className="hm-tabs" role="tablist">
              <button
                role="tab"
                aria-selected={activeTab === 'recruiter'}
                className={`hm-tab${activeTab === 'recruiter' ? ' hm-tab-purple' : ''}`}
                onClick={() => setActiveTab('recruiter')}
              >
                <Users size={12} />AI Chat
              </button>
              <button
                role="tab"
                aria-selected={activeTab === 'dev'}
                className={`hm-tab${activeTab === 'dev' ? ' hm-tab-blue' : ''}`}
                onClick={() => setActiveTab('dev')}
              >
                <Terminal size={12} />Dev Terminal
              </button>
            </div>

            {/* Scrollable body */}
            <div className="hm-body">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.13 }}
                >
                  {activeTab === 'recruiter' ? <AIChatHelp /> : <DevTerminalHelp />}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
