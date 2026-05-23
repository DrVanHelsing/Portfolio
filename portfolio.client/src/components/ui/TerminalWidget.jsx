import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Users } from 'lucide-react';
import { derivePageKey } from '../../data/portfolioKnowledge.js';
import DevTerminal from './DevTerminal.jsx';
import RecruiterChat from './RecruiterChat.jsx';
import './TerminalWidget.css';

export default function TerminalWidget() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isExpanded,   setIsExpanded]   = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMinimized,  setIsMinimized]  = useState(false);
  const [mode,         setMode]         = useState('dev'); // 'dev' | 'recruiter'

  const currentPage = derivePageKey(location.pathname);

  function closeTerminal() {
    setIsExpanded(false);
    setIsFullscreen(false);
    setIsMinimized(false);
  }

  const panelClasses = [
    'tw-panel',
    isFullscreen && 'tw-fullscreen',
    isMinimized  && 'tw-minimized',
  ].filter(Boolean).join(' ');

  return (
    <div className="tw-container">
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className={panelClasses}
            data-mode={mode}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            style={{ transformOrigin: 'bottom right' }}
          >
            {/* ── macOS header ── */}
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
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsMinimized(p => !p);
                    setIsFullscreen(false);
                  }}
                />
                <span
                  className="tw-dot tw-dot-green"
                  title="Fullscreen"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsFullscreen(p => !p);
                    setIsMinimized(false);
                  }}
                />
              </div>

              <span className="tw-title">
                {mode === 'dev' ? 'bash' : 'Portfolio AI'}
                {isMinimized ? ' — click to restore' : ''}
                <span className={`tw-mode-badge tw-mode-badge-${mode}`}>
                  {mode === 'dev' ? 'DEV' : 'AI'}
                </span>
              </span>

              {/* Mode toggle button */}
              {!isMinimized && (
                <button
                  className="tw-mode-toggle"
                  title={mode === 'dev' ? 'Switch to Recruiter mode' : 'Switch to Dev mode'}
                  onClick={(e) => {
                    e.stopPropagation();
                    setMode(m => m === 'dev' ? 'recruiter' : 'dev');
                  }}
                  aria-label="Toggle terminal mode"
                >
                  {mode === 'dev'
                    ? <Users size={13} />
                    : <Terminal size={13} />}
                </button>
              )}
            </div>

            {/* ── Content area ── */}
            {!isMinimized && (
              <AnimatePresence mode="wait">
                <motion.div
                  key={mode}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.12 }}
                  style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', minHeight: 0 }}
                >
                  {mode === 'dev'
                    ? <DevTerminal
                        navigate={navigate}
                        setMode={setMode}
                        currentPage={currentPage}
                      />
                    : <RecruiterChat
                        currentPage={currentPage}
                      />}
                </motion.div>
              </AnimatePresence>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Bubble button ── */}
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
