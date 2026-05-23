import { useState, useRef, useEffect } from 'react';
import { SendHorizontal } from 'lucide-react';
import { buildSystemPrompt, streamChat, cleanMarkdown } from '../../services/aiService.js';
import './RecruiterChat.css';

const STARTER_QUESTIONS = [
  "What is Tredir's current role?",
  'Tell me about the FinanceBuddy project',
  'What tech stack does Tredir know best?',
  'Any hackathon wins?',
  'How can I contact Tredir?',
];

const WELCOME_MESSAGE = {
  role: 'assistant',
  content: "Hi! I'm Tredir's portfolio AI. Ask me anything about his background, projects, or skills — I'm here to help.",
};

export default function RecruiterChat({ currentPage }) {
  const [messages, setMessages]     = useState([WELCOME_MESSAGE]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading]   = useState(false);
  const bodyRef  = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    setTimeout(() => inputRef.current?.focus(), 80);
  }, []);

  const hasUserMessages = messages.some(m => m.role === 'user');

  async function sendMessage(text) {
    const question = text.trim();
    if (!question || isLoading) return;

    const userMsg = { role: 'user', content: question };
    const streamId = `rc-${Date.now()}`;
    const aiMsg = { role: 'assistant', content: '', id: streamId };

    setMessages(prev => [...prev, userMsg, aiMsg]);
    setInputValue('');
    setIsLoading(true);

    const history = messages.filter(m => m.role !== 'assistant' || !m.id);
    const messagesForApi = [...history, userMsg].map(m => ({
      role: m.role,
      content: m.content,
    }));

    const systemPrompt = buildSystemPrompt('recruiter', currentPage);

    await streamChat({
      messages: messagesForApi,
      systemPrompt,
      maxTokens: 600,
      onChunk: (chunk) => {
        setMessages(prev =>
          prev.map(m => m.id === streamId ? { ...m, content: m.content + chunk } : m)
        );
      },
      onDone: () => {
        setMessages(prev =>
          prev.map(m => m.id === streamId ? { ...m, id: undefined } : m)
        );
        setIsLoading(false);
      },
      onError: (errMsg) => {
        setMessages(prev =>
          prev.map(m =>
            m.id === streamId
              ? { ...m, content: `Sorry, I ran into an error: ${errMsg}`, id: undefined }
              : m
          )
        );
        setIsLoading(false);
      },
    });
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(inputValue);
    }
  }

  return (
    <>
      <div className="rc-body" ref={bodyRef}>
        {messages.map((msg, i) => (
          <div
            key={i}
            className={[
              'rc-bubble',
              msg.role === 'user' ? 'rc-bubble-user' : 'rc-bubble-ai',
              msg.role === 'assistant' && msg.id ? 'rc-streaming' : '',
            ].filter(Boolean).join(' ')}
          >
            {msg.content === '' && msg.id
              ? <span className="rc-typing"><span /><span /><span /></span>
              : cleanMarkdown(msg.content)}
          </div>
        ))}

        {!hasUserMessages && (
          <div className="rc-starters">
            {STARTER_QUESTIONS.map((q, i) => (
              <button
                key={i}
                className="rc-starter-btn"
                onClick={() => sendMessage(q)}
                disabled={isLoading}
              >
                {q}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className={`rc-input-row${isLoading ? ' rc-input-row-loading' : ''}`}>
        {isLoading && <div className="rc-loading-bar" aria-hidden="true" />}
        <input
          ref={inputRef}
          className="rc-input"
          type="text"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
          autoComplete="off"
          spellCheck={false}
          placeholder={isLoading ? 'Thinking…' : 'Ask me anything about Tredir…'}
          aria-label="Recruiter chat input"
        />
        <button
          className="rc-send-btn"
          onClick={() => sendMessage(inputValue)}
          disabled={isLoading || !inputValue.trim()}
          aria-label="Send message"
        >
          <SendHorizontal size={16} />
        </button>
      </div>
    </>
  );
}
