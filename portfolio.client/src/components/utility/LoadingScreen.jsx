import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, GitBranch, Check } from 'lucide-react';
import AnimatedBackground from '../sections/AnimatedBackground';
import './LoadingScreen.css';

// Syntax-highlight one greeting line
const GreetingCode = ({ text }) => {
  const firstQ = text.indexOf('"');
  const lastQ  = text.lastIndexOf('"') + 1;
  if (firstQ === -1) return <span className="ide-txt">{text}</span>;
  return (
    <>
      <span className="ide-fn">{text.slice(0, firstQ)}</span>
      <span className="ide-str">{text.slice(firstQ, lastQ)}</span>
      <span className="ide-punc">{text.slice(lastQ)}</span>
    </>
  );
};

const LoadingScreen = ({ onEnter }) => {
  const [isVisible, setIsVisible]             = useState(true);
  const [currentGreeting, setCurrentGreeting] = useState(0);
  const [cursorOn, setCursorOn]               = useState(true);

  const greetings = [
    { text: 'console.log("Hello World!");',        lang: 'JavaScript', ext: 'js'   },
    { text: 'print("Hello World!")',               lang: 'Python',     ext: 'py'   },
    { text: 'Console.WriteLine("Hello World!");',  lang: 'C#',         ext: 'cs'   },
    { text: 'System.out.println("Hello World!");', lang: 'Java',       ext: 'java' },
    { text: 'fmt.Println("Hello World!")',         lang: 'Go',         ext: 'go'   },
    { text: 'cout << "Hello World!";',             lang: 'C++',        ext: 'cpp'  },
    { text: 'echo "Hello World!";',                lang: 'PHP',        ext: 'php'  },
    { text: 'println!("Hello World!");',           lang: 'Rust',       ext: 'rs'   },
  ];

  useEffect(() => {
    const id = setInterval(() => {
      setCurrentGreeting(p => (p + 1) % greetings.length);
    }, 3200);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setCursorOn(v => !v), 530);
    return () => clearInterval(id);
  }, []);

  const handleEnter = () => {
    setIsVisible(false);
    setTimeout(() => { if (onEnter) onEnter(); }, 800);
  };

  const g        = greetings[currentGreeting];
  const filename = `portfolio.${g.ext}`;

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

              {/* Gutter + code */}
              <div className="ide-editor">
                <div className="ide-gutter">
                  {[1,2,3,4,5,6,7,8,9,10,11,12,13].map(n => (
                    <div key={n} className={`ide-linenum${n === 10 ? ' ide-linenum-active' : ''}`}>{n}</div>
                  ))}
                </div>

                <div className="ide-code">
                  {/* 1 */}
                  <div className="ide-line">
                    <span className="ide-cmt">// portfolio · tredir sewpaul</span>
                  </div>
                  {/* 2 */}
                  <div className="ide-line ide-line-blank" />
                  {/* 3 */}
                  <div className="ide-line">
                    <span className="ide-kw">const </span>
                    <span className="ide-var">developer</span>
                    <span className="ide-punc"> = {'{'}</span>
                  </div>
                  {/* 4 */}
                  <div className="ide-line ide-line-ind">
                    <span className="ide-prop">name</span>
                    <span className="ide-punc">: </span>
                    <span className="ide-str">"Tredir Sewpaul"</span>
                    <span className="ide-punc">,</span>
                  </div>
                  {/* 5 */}
                  <div className="ide-line ide-line-ind">
                    <span className="ide-prop">role</span>
                    <span className="ide-punc">: </span>
                    <span className="ide-str">"CS Graduate &amp; AI Engineer"</span>
                    <span className="ide-punc">,</span>
                  </div>
                  {/* 6 */}
                  <div className="ide-line ide-line-ind">
                    <span className="ide-prop">passion</span>
                    <span className="ide-punc">: [</span>
                    <span className="ide-str">"ML"</span>
                    <span className="ide-punc">, </span>
                    <span className="ide-str">"Multiplatform"</span>
                    <span className="ide-punc">, </span>
                    <span className="ide-str">"Web"</span>
                    <span className="ide-punc">],</span>
                  </div>
                  {/* 7 */}
                  <div className="ide-line">
                    <span className="ide-punc">{'};'}</span>
                  </div>
                  {/* 8 */}
                  <div className="ide-line ide-line-blank" />
                  {/* 9 */}
                  <div className="ide-line">
                    <span className="ide-kw">function </span>
                    <span className="ide-fn">greet</span>
                    <span className="ide-punc">() {'{'}</span>
                  </div>
                  {/* 10 — cycling greeting */}
                  <div className="ide-line ide-line-ind ide-line-active">
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={currentGreeting}
                        className="ide-greeting-span"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        <GreetingCode text={g.text} />
                      </motion.span>
                    </AnimatePresence>
                  </div>
                  {/* 11 */}
                  <div className="ide-line">
                    <span className="ide-punc">{'}'}</span>
                  </div>
                  {/* 12 */}
                  <div className="ide-line ide-line-blank" />
                  {/* 13 */}
                  <div className="ide-line">
                    <span className="ide-fn">greet</span>
                    <span className="ide-punc">();</span>
                    <span className={`ide-cursor${cursorOn ? '' : ' ide-cursor-off'}`}>▌</span>
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
