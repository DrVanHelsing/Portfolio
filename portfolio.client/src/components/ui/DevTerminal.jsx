import { useState, useRef, useEffect } from 'react';
import { WELCOME_LINES } from '../../data/portfolioKnowledge.js';
import { useTerminalCommands, buildPrompt, getCompletions } from '../../hooks/useTerminalCommands.js';

const LINE_CLASS = {
  ctx:   'tw-line-ctx',
  cmd:   'tw-line-cmd',
  sym:   'tw-line-sym',
  ok:    'tw-line-ok',
  dim:   'tw-line-dim',
  rdy:   'tw-line-rdy',
  ai:    'tw-line-ai',
  blank: 'tw-line-blank',
};

export default function DevTerminal({ navigate, setMode, currentPage }) {
  const [history, setHistory]       = useState(WELCOME_LINES);
  const [inputValue, setInputValue] = useState('');
  const [isAILoading, setIsAILoading] = useState(false);

  const bodyRef  = useRef(null);
  const inputRef = useRef(null);

  const {
    cwd,
    inChatSession,
    cmdHistory,
    historyIdx,
    setHistoryIdx,
    dispatch,
  } = useTerminalCommands({
    navigate,
    setMode,
    setIsAILoading,
    setHistory,
    currentPage,
  });

  // Auto-scroll on new output
  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [history]);

  // Focus input when mounted
  useEffect(() => {
    setTimeout(() => inputRef.current?.focus(), 50);
  }, []);

  async function handleKeyDown(e) {
    if (e.key === 'Enter') {
      if (isAILoading) return;
      const val = inputValue;
      await dispatch(val);
      setInputValue('');
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const completions = getCompletions(inputValue, cwd);
      if (completions.length === 1) {
        setInputValue(completions[0]);
      } else if (completions.length > 1) {
        setHistory(prev => [
          ...prev,
          { type: 'cmd', text: `${buildPrompt(cwd, inChatSession)}${inputValue}` },
          { type: 'dim', text: completions.join('   ') },
          { type: 'blank' },
        ]);
      }
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

  const prompt = buildPrompt(cwd, inChatSession);

  return (
    <>
      <div className="tw-tabbar">
        <span className="tw-tab tw-tab-active">
          {inChatSession ? 'ai-chat' : 'bash'}
        </span>
      </div>

      <div className="tw-body" ref={bodyRef}>
        {history.map((line, i) => (
          <div key={i} className={LINE_CLASS[line.type] ?? 'tw-line-cmd'}>
            {line.type === 'blank'
              ? ' '
              : line.type === 'ai'
                ? (line.text === '' && line.id ? '▋' : line.text)
                : line.text}
          </div>
        ))}
      </div>

      <div className="tw-input-row">
        <span className="tw-prompt" style={inChatSession ? { color: '#a371f7' } : undefined}>
          {prompt}
        </span>
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
  );
}
