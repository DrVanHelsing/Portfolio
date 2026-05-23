import { useState, useCallback } from 'react';
import {
  VIRTUAL_FS, ROUTE_MAP, PROJECT_ALIASES, PAGE_CONTEXTS,
  resolvePath, getKnowledgeBase, WELCOME_LINES,
} from '../data/portfolioKnowledge.js';
import { streamDevAnswer, streamSummarize } from '../services/aiService.js';

// ── Prompt builder ─────────────────────────────────────────────────────────────

export function buildPrompt(cwd, inChat) {
  if (inChat) return '(You) > ';
  const display = cwd.length > 28 ? `…${cwd.slice(-26)}` : cwd;
  return `${display} $ `;
}

// ── Tab completion ─────────────────────────────────────────────────────────────

export function getCompletions(partial, cwd) {
  const parts = partial.split(/\s+/);

  if (parts.length === 1) {
    const prefix = parts[0].toLowerCase();
    return Object.keys(COMMANDS)
      .filter(k => k.startsWith(prefix))
      .sort()
      .map(k => k);
  }

  // Complete filesystem argument
  const argPartial = parts[parts.length - 1];
  const slashIdx   = argPartial.lastIndexOf('/');
  const dirPart    = slashIdx >= 0 ? argPartial.slice(0, slashIdx) : '';
  const leafPart   = slashIdx >= 0 ? argPartial.slice(slashIdx + 1) : argPartial;

  const resolvedDir = dirPart
    ? resolvePath(cwd, dirPart)
    : cwd;

  const node = VIRTUAL_FS[resolvedDir];
  if (!node || node.type !== 'dir') return [];

  const prefix = dirPart ? dirPart + '/' : '';

  const completedArgs = node.children
    .filter(c => c.startsWith(leafPart))
    .map(c => {
      const childPath = `${resolvedDir}/${c}`;
      const isDir     = VIRTUAL_FS[childPath]?.type === 'dir';
      return prefix + c + (isDir ? '/' : '');
    });

  return completedArgs.map(arg => [...parts.slice(0, -1), arg].join(' '));
}

// ── Individual command handlers ───────────────────────────────────────────────
// Each handler receives a context object and calls addLines() directly.

function cmdLs({ args, cwd, addLines }) {
  const longFormat = args.includes('-la') || args.includes('-l') || args.includes('-a');
  const pathArg    = args.find(a => !a.startsWith('-'));
  const targetPath = pathArg ? resolvePath(cwd, pathArg) : cwd;
  const node       = VIRTUAL_FS[targetPath];

  if (!node) {
    addLines([{ type: 'dim', text: `ls: ${pathArg ?? '.'}: no such file or directory` }, { type: 'blank' }]);
    return;
  }
  if (node.type === 'file') {
    addLines([{ type: 'dim', text: pathArg ?? targetPath.split('/').pop() }, { type: 'blank' }]);
    return;
  }

  const entries = node.children.map(name => {
    const childPath = targetPath === '~' ? `~/${name}` : `${targetPath}/${name}`;
    const childNode = VIRTUAL_FS[childPath];
    const isDir     = childNode?.type === 'dir';
    return { name, isDir };
  });

  if (longFormat) {
    addLines([{ type: 'dim', text: `total ${entries.length}` }]);
    entries.forEach(({ name, isDir }) => {
      const perms = isDir ? 'drwxr-xr-x' : '-rw-r--r--';
      const type  = isDir ? '\x1b[34m' : '';
      addLines([{ type: 'dim', text: `${perms}  tredir  staff  ${isDir ? name + '/' : name}` }]);
    });
  } else {
    const cols = [];
    const dirs  = entries.filter(e => e.isDir).map(e => e.name + '/');
    const files = entries.filter(e => !e.isDir).map(e => e.name);
    if (dirs.length)  cols.push({ type: 'rdy',  text: dirs.join('   ') });
    if (files.length) cols.push({ type: 'dim',  text: files.join('   ') });
    addLines([...cols]);
  }
  addLines([{ type: 'blank' }]);
}

function cmdCat({ args, cwd, addLines }) {
  if (!args[0]) {
    addLines([
      { type: 'dim', text: 'Usage: cat <file>' },
      { type: 'dim', text: '  e.g. cat projects/geology-sim' },
      { type: 'dim', text: '  e.g. cat resume.md' },
      { type: 'blank' },
    ]);
    return;
  }

  const targetPath = resolvePath(cwd, args[0]);
  const node       = VIRTUAL_FS[targetPath];

  if (!node) {
    addLines([{ type: 'dim', text: `cat: ${args[0]}: no such file or directory` }, { type: 'blank' }]);
    return;
  }
  if (node.type === 'dir') {
    addLines([{ type: 'dim', text: `cat: ${args[0]}: is a directory — try 'ls ${args[0]}'` }, { type: 'blank' }]);
    return;
  }

  const content = node.content();
  const lines   = content.split('\n');
  addLines(lines.map(l => ({ type: 'ai', text: l })));
  addLines([{ type: 'blank' }]);
}

function cmdCd({ args, cwd, setCwd, navigate, addLines }) {
  const target = args[0];
  if (!target) {
    setCwd('~');
    addLines([{ type: 'blank' }]);
    return;
  }

  // Check if it's a navigation alias: cd /about, cd /projects, etc.
  const pageCandidate = target.replace(/^\//, '');
  if (ROUTE_MAP[pageCandidate] && !target.startsWith('~') && !target.includes('..')) {
    navigate(ROUTE_MAP[pageCandidate]);
    addLines([{ type: 'rdy', text: `→ navigated to ${ROUTE_MAP[pageCandidate]}` }, { type: 'blank' }]);
    return;
  }

  // Also handle direct project slugs: cd financebuddy → navigate
  const projectAlias = PROJECT_ALIASES[pageCandidate];
  if (projectAlias && ROUTE_MAP[projectAlias]) {
    navigate(ROUTE_MAP[projectAlias]);
    addLines([{ type: 'rdy', text: `→ navigated to ${ROUTE_MAP[projectAlias]}` }, { type: 'blank' }]);
    return;
  }

  const resolved = resolvePath(cwd, target);
  const node     = VIRTUAL_FS[resolved];

  if (!node) {
    addLines([{ type: 'dim', text: `cd: no such file or directory: ${target}` }, { type: 'blank' }]);
    return;
  }
  if (node.type !== 'dir') {
    addLines([{ type: 'dim', text: `cd: not a directory: ${target}` }, { type: 'blank' }]);
    return;
  }

  setCwd(resolved);
  addLines([{ type: 'blank' }]);
}

function cmdPwd({ cwd, addLines }) {
  addLines([{ type: 'ai', text: cwd }, { type: 'blank' }]);
}

function cmdGrep({ args, addLines }) {
  const pattern = args[0];
  if (!pattern) {
    addLines([
      { type: 'dim', text: 'Usage: grep <pattern>' },
      { type: 'dim', text: '  e.g. grep python' },
      { type: 'blank' },
    ]);
    return;
  }

  const kb      = getKnowledgeBase();
  const lines   = kb.split('\n');
  const lower   = pattern.toLowerCase();
  const matches = lines.filter(l => l.toLowerCase().includes(lower));

  if (!matches.length) {
    addLines([
      { type: 'dim', text: `grep: no matches for '${pattern}'` },
      { type: 'blank' },
    ]);
    return;
  }

  addLines([{ type: 'ok', text: `grep results for '${pattern}':` }]);
  addLines(matches.slice(0, 30).map(l => ({ type: 'ai', text: l })));
  if (matches.length > 30) {
    addLines([{ type: 'dim', text: `  … ${matches.length - 30} more matches` }]);
  }
  addLines([{ type: 'blank' }]);
}

function cmdEcho({ args, addLines }) {
  addLines([{ type: 'ai', text: args.join(' ') }, { type: 'blank' }]);
}

function cmdEnv({ addLines }) {
  addLines([
    { type: 'ai',  text: 'NAME=Tredir Sewpaul' },
    { type: 'ai',  text: 'ROLE=AI Engineering Intern' },
    { type: 'ai',  text: 'LOCATION=Cape Town, South Africa' },
    { type: 'ai',  text: 'GITHUB=github.com/DrVanHelsing' },
    { type: 'ai',  text: 'LINKEDIN=linkedin.com/in/tredir-sewpaul' },
    { type: 'ai',  text: 'SHELL=/bin/portfolio-bash' },
    { type: 'ai',  text: 'TERM=xterm-256color' },
    { type: 'ai',  text: 'MODE=dev' },
    { type: 'blank' },
  ]);
}

function cmdMan({ args, addLines }) {
  if (!args[0]) {
    addLines([
      { type: 'ok',  text: 'Available commands:' },
      { type: 'blank' },
      { type: 'dim', text: '  Filesystem' },
      { type: 'dim', text: '    ls [-la] [path]           List directory contents' },
      { type: 'dim', text: '    cat <file>                Read a file' },
      { type: 'dim', text: '    cd <path>                 Change directory or navigate' },
      { type: 'dim', text: '    pwd                       Print working directory' },
      { type: 'dim', text: '    grep <pattern>            Search portfolio content' },
      { type: 'dim', text: '    echo <text>               Echo text' },
      { type: 'blank' },
      { type: 'dim', text: '  Environment' },
      { type: 'dim', text: '    env                       Show environment variables' },
      { type: 'dim', text: '    history                   Show command history' },
      { type: 'blank' },
      { type: 'dim', text: '  Navigation' },
      { type: 'dim', text: '    nav_to <page>             Navigate to a page' },
      { type: 'dim', text: '    open <slug>               Open a project page' },
      { type: 'blank' },
      { type: 'dim', text: '  AI' },
      { type: 'dim', text: '    ask <question>            Ask the portfolio AI' },
      { type: 'dim', text: '    /chat                     Start persistent AI chat session' },
      { type: 'dim', text: '    summarize <page>          AI summary of a page' },
      { type: 'dim', text: '    summarize projects <slug> AI summary of a project' },
      { type: 'blank' },
      { type: 'dim', text: '  Mode' },
      { type: 'dim', text: '    mode recruiter            Switch to Recruiter chat mode' },
      { type: 'dim', text: '    mode dev                  Switch back to Dev mode' },
      { type: 'blank' },
      { type: 'dim', text: '  Social' },
      { type: 'dim', text: '    github   linkedin   email' },
      { type: 'blank' },
      { type: 'dim', text: '  Other' },
      { type: 'dim', text: '    whoami   theme   man [cmd]   clear   exit / quit' },
      { type: 'blank' },
      { type: 'dim', text: '  Tip: unrecognized input is sent to the AI automatically.' },
      { type: 'blank' },
    ]);
    return;
  }

  const cmd = COMMANDS[args[0].toLowerCase()];
  if (!cmd?.man) {
    addLines([
      { type: 'dim', text: `No manual entry for ${args[0]}` },
      { type: 'blank' },
    ]);
    return;
  }
  const manLines = cmd.man.split('\n').map(l => ({ type: 'ai', text: l }));
  addLines([...manLines, { type: 'blank' }]);
}

async function cmdAsk({ args, currentPage, chatMessages, addLines, setIsAILoading, onStreamChunk, onStreamDone, onStreamError }) {
  const question = args.join(' ').trim();
  if (!question) {
    addLines([
      { type: 'dim', text: 'Usage: ask <question>' },
      { type: 'dim', text: '  e.g. ask what projects involve AI?' },
      { type: 'blank' },
    ]);
    return;
  }

  setIsAILoading(true);
  const streamId = `ai-${Date.now()}`;
  addLines([{ type: 'dim', text: '(AI)' }, { type: 'ai', text: '', id: streamId }]);

  await streamDevAnswer({
    question,
    currentPage,
    chatMessages: chatMessages ?? [],
    onChunk:  (c) => onStreamChunk(streamId, c),
    onDone:   ()  => { onStreamDone(streamId);     setIsAILoading(false); },
    onError:  (m) => { onStreamError(streamId, m); setIsAILoading(false); },
  });
}

async function cmdSummarize({ args, currentPage, addLines, setIsAILoading, onStreamChunk, onStreamDone, onStreamError }) {
  let pageKey;

  if (args[0] === 'projects' && args[1]) {
    pageKey = PROJECT_ALIASES[args[1]] ?? args[1];
  } else if (args[0] && args[0] !== 'projects') {
    const raw = args[0];
    pageKey = PROJECT_ALIASES[raw] ?? raw;
  } else {
    addLines([
      { type: 'dim', text: 'Usage: summarize <page>' },
      { type: 'dim', text: '       summarize projects <slug>' },
      { type: 'dim', text: '  e.g. summarize about' },
      { type: 'dim', text: '  e.g. summarize projects geology-sim' },
      { type: 'blank' },
    ]);
    return;
  }

  const context = PAGE_CONTEXTS[pageKey];
  if (!context) {
    addLines([
      { type: 'dim', text: `Unknown page or project: ${args.join(' ')}` },
      { type: 'dim', text: "  Type 'ls projects/' to see available slugs." },
      { type: 'blank' },
    ]);
    return;
  }

  const isProject = args[0] === 'projects' || !!PROJECT_ALIASES[args[0]];
  const tipCmd    = isProject ? `open ${pageKey}` : `nav_to ${pageKey}`;

  setIsAILoading(true);
  const streamId = `ai-${Date.now()}`;
  addLines([
    { type: 'ok', text: `→ AI summary: ${pageKey}` },
    { type: 'ai', text: '', id: streamId },
  ]);

  await streamSummarize({
    pageKey,
    tipCmd,
    context,
    onChunk:  (c) => onStreamChunk(streamId, c),
    onDone:   ()  => { onStreamDone(streamId);  setIsAILoading(false); },
    onError:  (m) => { onStreamError(streamId, m); setIsAILoading(false); },
  });
}

function cmdOpen({ args, navigate, addLines }) {
  const slug     = args[0];
  const resolved = slug ? (PROJECT_ALIASES[slug] ?? null) : null;

  if (!slug) {
    addLines([
      { type: 'dim', text: 'Usage: open <slug>  (e.g. open godseye)' },
      { type: 'dim', text: "  Run 'ls projects/' to see available slugs." },
      { type: 'blank' },
    ]);
    return;
  }
  if (resolved && ROUTE_MAP[resolved]) {
    navigate(ROUTE_MAP[resolved]);
    addLines([{ type: 'rdy', text: `→ Opening project: ${slug}` }, { type: 'blank' }]);
  } else {
    addLines([
      { type: 'dim', text: `Project '${slug}' not found.` },
      { type: 'dim', text: "  Run 'ls projects/' to see available slugs." },
      { type: 'blank' },
    ]);
  }
}

function cmdNavTo({ args, navigate, addLines }) {
  const dest = args[0];
  if (!dest) {
    addLines([
      { type: 'dim', text: 'Usage: nav_to <page>' },
      { type: 'dim', text: '  pages: home  about  projects  skills  resume  contact' },
      { type: 'blank' },
    ]);
    return;
  }
  const route = ROUTE_MAP[dest];
  if (route !== undefined) {
    navigate(route);
    addLines([{ type: 'rdy', text: `→ nav_to ${dest}` }, { type: 'blank' }]);
  } else {
    addLines([
      { type: 'dim', text: `nav_to: unknown page: ${dest}` },
      { type: 'dim', text: '  pages: home  about  projects  skills  resume  contact' },
      { type: 'blank' },
    ]);
  }
}

function cmdMode({ args, setMode, addLines }) {
  if (args[0] === 'recruiter') {
    setMode('recruiter');
    addLines([{ type: 'rdy', text: '→ Switched to Recruiter mode. Type mode dev to return.' }, { type: 'blank' }]);
  } else if (args[0] === 'dev') {
    setMode('dev');
    addLines([{ type: 'ok', text: '→ Switched to Dev mode.' }, { type: 'blank' }]);
  } else {
    addLines([
      { type: 'dim', text: 'Usage: mode recruiter | mode dev' },
      { type: 'blank' },
    ]);
  }
}

function cmdHistory({ cmdHistory, addLines }) {
  if (!cmdHistory.length) {
    addLines([{ type: 'dim', text: 'No commands in history.' }, { type: 'blank' }]);
    return;
  }
  addLines([{ type: 'ok', text: 'Command history:' }]);
  [...cmdHistory].reverse().forEach((cmd, i) => {
    addLines([{ type: 'dim', text: `  ${i + 1}  ${cmd}` }]);
  });
  addLines([{ type: 'blank' }]);
}

function cmdWhoami({ addLines }) {
  addLines([
    { type: 'ok',  text: 'Tredir Sewpaul' },
    { type: 'dim', text: '  AI Engineering Intern | Full-stack Developer & Designer' },
    { type: 'dim', text: '  Cape Town, South Africa' },
    { type: 'dim', text: '  github.com/DrVanHelsing' },
    { type: 'blank' },
  ]);
}

function cmdTheme({ addLines }) {
  const current = document.documentElement.getAttribute('data-theme');
  const next    = current === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  addLines([{ type: 'ok', text: `→ Theme switched to ${next}` }, { type: 'blank' }]);
}

// ── Command registry ──────────────────────────────────────────────────────────

const COMMANDS = {
  ls: {
    description: 'List directory contents',
    usage: 'ls [-la] [path]',
    man: `NAME\n  ls — list directory contents\n\nSYNOPSIS\n  ls [-la] [path]\n\nDESCRIPTION\n  Lists files and directories in the virtual portfolio filesystem.\n  Directories are shown in blue (with trailing /), files in grey.\n  -la  long format with permissions and type indicators.\n\nEXAMPLES\n  ls                    list current directory\n  ls projects/          list all projects\n  ls -la                long format listing`,
    handler: cmdLs,
  },
  cat: {
    description: 'Read a virtual file',
    usage: 'cat <file>',
    man: `NAME\n  cat — concatenate and display file contents\n\nSYNOPSIS\n  cat <file>\n\nDESCRIPTION\n  Reads and displays the contents of a virtual portfolio file.\n  Paths are relative to your current directory.\n\nEXAMPLES\n  cat projects/geology-sim\n  cat resume.md\n  cat skills.txt\n  cat pages/about`,
    handler: cmdCat,
  },
  cd: {
    description: 'Change directory (or navigate to a site page)',
    usage: 'cd [path]',
    man: `NAME\n  cd — change current virtual directory\n\nSYNOPSIS\n  cd [path]\n\nDESCRIPTION\n  Changes the current virtual directory.\n  If path is a page name like /about or /projects, navigates the site instead.\n  cd with no arguments returns to home (~).\n\nEXAMPLES\n  cd projects/          enter projects directory\n  cd ..                 go up one level\n  cd /about             navigate to About page\n  cd /projects          navigate to Projects page\n  cd geology-sim        navigate to Geology Sim project`,
    handler: cmdCd,
  },
  pwd: {
    description: 'Print working directory',
    usage: 'pwd',
    man: `NAME\n  pwd — print name of current working directory\n\nSYNOPSIS\n  pwd`,
    handler: cmdPwd,
  },
  grep: {
    description: 'Search portfolio content',
    usage: 'grep <pattern>',
    man: `NAME\n  grep — search portfolio knowledge base\n\nSYNOPSIS\n  grep <pattern>\n\nDESCRIPTION\n  Case-insensitive search across all portfolio content including\n  skills, projects, experience, and education.\n\nEXAMPLES\n  grep python\n  grep azure\n  grep hackathon`,
    handler: cmdGrep,
  },
  echo: {
    description: 'Echo text to terminal',
    usage: 'echo <text>',
    man: `NAME\n  echo — display a line of text\n\nSYNOPSIS\n  echo [text...]`,
    handler: cmdEcho,
  },
  env: {
    description: 'Show environment variables',
    usage: 'env',
    man: `NAME\n  env — print environment variables\n\nSYNOPSIS\n  env\n\nDESCRIPTION\n  Displays portfolio environment variables including identity,\n  location, and contact information.`,
    handler: cmdEnv,
  },
  history: {
    description: 'Show command history',
    usage: 'history',
    man: `NAME\n  history — show command history\n\nSYNOPSIS\n  history\n\nDESCRIPTION\n  Displays previously entered commands in this session.\n  Use ↑/↓ arrows to cycle through history.`,
    handler: cmdHistory,
  },
  man: {
    description: 'Show manual page for a command',
    usage: 'man [command]',
    man: `NAME\n  man — format and display manual pages\n\nSYNOPSIS\n  man [command]\n\nDESCRIPTION\n  With no arguments, lists all available commands.\n  With a command name, shows its full manual page.\n\nEXAMPLES\n  man\n  man ls\n  man grep`,
    handler: cmdMan,
  },
  ask: {
    description: 'Ask the portfolio AI a question',
    usage: 'ask <question>',
    man: `NAME\n  ask — query the portfolio AI\n\nSYNOPSIS\n  ask <question>\n\nDESCRIPTION\n  Sends a question to the portfolio AI which has full knowledge\n  of Tredir's background, projects, and skills.\n  You can also just type naturally — unrecognized input is sent to the AI.\n\nEXAMPLES\n  ask what tech does Tredir use for AI?\n  ask tell me about the hackathon wins`,
    handler: cmdAsk,
  },
  open: {
    description: 'Navigate to a project page',
    usage: 'open <slug>',
    man: `NAME\n  open — open a project page\n\nSYNOPSIS\n  open <slug>\n\nDESCRIPTION\n  Navigates to a project detail page.\n  Use 'ls projects/' to see available slugs.\n\nEXAMPLES\n  open geology-sim\n  open financebuddy\n  open ml`,
    handler: cmdOpen,
  },
  nav_to: {
    description: 'Navigate to a site page',
    usage: 'nav_to <page>',
    man: `NAME\n  nav_to — navigate to a portfolio page\n\nSYNOPSIS\n  nav_to <page>\n\nDESCRIPTION\n  Navigates to a site page. Tip: 'cd /page' also works.\n\nPAGES\n  home  about  projects  skills  resume  contact`,
    handler: cmdNavTo,
  },
  summarize: {
    description: 'AI summary of a page or project',
    usage: 'summarize <page>  |  summarize projects <slug>',
    man: `NAME\n  summarize — get an AI-generated summary\n\nSYNOPSIS\n  summarize <page>\n  summarize projects <slug>\n\nDESCRIPTION\n  Streams an AI-generated summary of a portfolio page or project.\n\nEXAMPLES\n  summarize about\n  summarize skills\n  summarize projects geology-sim\n  summarize projects financebuddy`,
    handler: cmdSummarize,
  },
  mode: {
    description: 'Switch between Dev and Recruiter mode',
    usage: 'mode recruiter | mode dev',
    man: `NAME\n  mode — switch terminal mode\n\nSYNOPSIS\n  mode recruiter\n  mode dev\n\nDESCRIPTION\n  recruiter  Switches to a friendly AI chatbot mode for recruiters.\n  dev        Returns to the developer terminal (this mode).`,
    handler: cmdMode,
  },
  github: {
    description: 'Open GitHub profile',
    usage: 'github',
    handler: ({ addLines }) => {
      window.open('https://github.com/DrVanHelsing', '_blank', 'noopener');
      addLines([{ type: 'ok', text: '→ Opening GitHub…' }, { type: 'blank' }]);
    },
  },
  linkedin: {
    description: 'Open LinkedIn profile',
    usage: 'linkedin',
    handler: ({ addLines }) => {
      window.open('https://linkedin.com/in/tredir-sewpaul', '_blank', 'noopener');
      addLines([{ type: 'ok', text: '→ Opening LinkedIn…' }, { type: 'blank' }]);
    },
  },
  email: {
    description: 'Open email client',
    usage: 'email',
    handler: ({ addLines }) => {
      window.location.href = 'mailto:tredirs@gmail.com';
      addLines([{ type: 'ok', text: '→ Opening email client…' }, { type: 'blank' }]);
    },
  },
  whoami: {
    description: 'Display current user info',
    usage: 'whoami',
    handler: cmdWhoami,
  },
  theme: {
    description: 'Toggle dark/light theme',
    usage: 'theme',
    handler: cmdTheme,
  },
  sudo: {
    handler: ({ addLines }) => {
      addLines([{ type: 'dim', text: 'Nice try. You are not in the sudoers file.' }, { type: 'blank' }]);
    },
  },
  rm: {
    handler: ({ args, addLines }) => {
      if (args.includes('-rf') || args[0] === '-rf') {
        addLines([
          { type: 'dim', text: '💀 Segmentation fault (core dumped)' },
          { type: 'dim', text: '   Just kidding. Portfolio still intact.' },
          { type: 'blank' },
        ]);
      } else {
        addLines([{ type: 'dim', text: 'rm: missing operand or permission denied' }, { type: 'blank' }]);
      }
    },
  },
  hello: {
    handler: ({ addLines }) => {
      addLines([{ type: 'sym', text: 'Hello, human. 👋' }, { type: 'blank' }]);
    },
  },
  hi: {
    handler: ({ addLines }) => {
      addLines([{ type: 'sym', text: 'Hi there! 👋' }, { type: 'blank' }]);
    },
  },
  help: {
    description: 'Show available commands (alias for man)',
    handler: ({ addLines }) => cmdMan({ args: [], addLines }),
  },
};

export { COMMANDS };

// ── Hook ──────────────────────────────────────────────────────────────────────

export function useTerminalCommands({ navigate, setMode, setIsAILoading, setHistory, currentPage }) {
  const [cwd, setCwd]           = useState('~');
  const [cmdHistory, setCmdHistory] = useState([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const [inChatSession, setInChatSession] = useState(false);
  const [chatMessages, setChatMessages]   = useState([]);

  const addLines = useCallback((lines) => {
    setHistory(prev => [...prev, ...lines]);
  }, [setHistory]);

  // Streaming callbacks injected at dispatch time
  const onStreamChunk = useCallback((id, chunk) => {
    setHistory(prev => prev.map(l => l.id === id ? { ...l, text: l.text + chunk } : l));
  }, [setHistory]);

  const onStreamDone = useCallback((id) => {
    setHistory(prev => [
      ...prev.map(l => l.id === id ? { ...l, id: undefined } : l),
      { type: 'blank' },
    ]);
  }, [setHistory]);

  const onStreamError = useCallback((id, msg) => {
    setHistory(prev => [
      ...prev.map(l => l.id === id ? { ...l, text: `Error: ${msg}`, id: undefined } : l),
      { type: 'blank' },
    ]);
  }, [setHistory]);

  const resetHistory = useCallback(() => {
    setHistory(WELCOME_LINES);
  }, [setHistory]);

  const dispatch = useCallback(async (raw) => {
    const trimmed = raw.trim();
    const parts   = trimmed.split(/\s+/);
    const verb    = parts[0]?.toLowerCase() ?? '';
    const args    = parts.slice(1);

    addLines([{ type: 'cmd', text: `${buildPrompt(cwd, inChatSession)}${raw}` }]);
    if (!trimmed) return;

    // clear is special — no command object
    if (verb === 'clear') {
      resetHistory();
      setCmdHistory(prev => [raw, ...prev]);
      setHistoryIdx(-1);
      return;
    }

    // exit chat session
    if (inChatSession && (verb === 'exit' || verb === 'quit')) {
      setInChatSession(false);
      setChatMessages([]);
      addLines([{ type: 'dim', text: '← Exited AI chat session.' }, { type: 'blank' }]);
      setCmdHistory(prev => [raw, ...prev]);
      setHistoryIdx(-1);
      return;
    }

    // in chat session — send everything to AI
    if (inChatSession) {
      const streamId = `ai-${Date.now()}`;
      setIsAILoading(true);
      addLines([{ type: 'dim', text: '(AI)' }, { type: 'ai', text: '', id: streamId }]);

      const updatedMessages = [...chatMessages, { role: 'user', content: trimmed }];

      await streamDevAnswer({
        question: trimmed,
        currentPage,
        chatMessages: chatMessages,
        onChunk:  (c) => onStreamChunk(streamId, c),
        onDone:   () => {
          onStreamDone(streamId);
          setChatMessages(updatedMessages);
          setIsAILoading(false);
        },
        onError:  (m) => { onStreamError(streamId, m); setIsAILoading(false); },
      });

      setCmdHistory(prev => [raw, ...prev]);
      setHistoryIdx(-1);
      return;
    }

    // /chat — enter persistent chat session
    if (verb === '/chat' || trimmed === '/chat') {
      setInChatSession(true);
      setChatMessages([]);
      addLines([
        { type: 'rdy', text: '→ Entering AI chat session. Full portfolio context loaded.' },
        { type: 'dim', text: "  Type 'exit' to return to the terminal." },
        { type: 'blank' },
      ]);
      setCmdHistory(prev => [raw, ...prev]);
      setHistoryIdx(-1);
      return;
    }

    const cmd = COMMANDS[verb];
    const ctx = {
      args, cwd, setCwd, navigate, setMode, addLines,
      setIsAILoading, currentPage, cmdHistory,
      chatMessages, setChatMessages,
      onStreamChunk, onStreamDone, onStreamError,
    };

    if (cmd) {
      await cmd.handler(ctx);
    } else {
      // Unrecognized input → AI (Claude CLI pattern)
      const streamId = `ai-${Date.now()}`;
      setIsAILoading(true);
      addLines([{ type: 'ai', text: '', id: streamId }]);

      await streamDevAnswer({
        question: trimmed,
        currentPage,
        chatMessages: [],
        onChunk:  (c) => onStreamChunk(streamId, c),
        onDone:   () => { onStreamDone(streamId); setIsAILoading(false); },
        onError:  (m) => { onStreamError(streamId, m); setIsAILoading(false); },
      });
    }

    setCmdHistory(prev => [raw, ...prev]);
    setHistoryIdx(-1);
  }, [
    cwd, setCwd, navigate, setMode, setIsAILoading, currentPage,
    addLines, inChatSession, chatMessages, cmdHistory,
    onStreamChunk, onStreamDone, onStreamError, resetHistory,
  ]);

  return {
    cwd,
    inChatSession,
    cmdHistory,
    historyIdx,
    setHistoryIdx,
    setCmdHistory,
    dispatch,
    addLines,
  };
}
