import { useState, useCallback } from 'react';
import {
  VIRTUAL_FS, ROUTE_MAP, PROJECT_ALIASES, PAGE_CONTEXTS,
  PROJECT_FS_SLUGS, PROJECTS_LIST,
  resolvePath, getKnowledgeBase, WELCOME_LINES,
} from '../data/portfolioKnowledge.js';
import {
  streamDevAnswer, streamSummarize,
  detectMisuse, MAX_INPUT_LENGTH, MAX_SESSION_MESSAGES,
} from '../services/aiService.js';

const MISUSE_REPLY =
  "I'm only able to discuss Tredir's portfolio, background, and skills. What would you like to know?";

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
  const longFormat = args.includes('-l') || args.includes('-la');
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
      addLines([{
        type: isDir ? 'rdy' : 'dim',
        text: `${perms}  tredir  staff  ${isDir ? name + '/' : name}`,
      }]);
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

function cmdTree({ addLines }) {
  const root = VIRTUAL_FS['~'];
  const lines = [{ type: 'rdy', text: '~/' }];

  const children = root.children;
  children.forEach((name, i) => {
    const isLast    = i === children.length - 1;
    const branch    = isLast ? '└─ ' : '├─ ';
    const childPath = `~/${name}`;
    const childNode = VIRTUAL_FS[childPath];
    const isDir     = childNode?.type === 'dir';

    lines.push({
      type: isDir ? 'rdy' : 'dim',
      text: `${branch}${name}${isDir ? '/' : ''}`,
    });

    if (isDir) {
      const indent = isLast ? '   ' : '│  ';
      childNode.children.forEach((subName, j) => {
        const isSubLast = j === childNode.children.length - 1;
        const subBranch = isSubLast ? '└─ ' : '├─ ';
        lines.push({ type: 'dim', text: `${indent}${subBranch}${subName}` });
      });
    }
  });

  lines.push({ type: 'blank' });
  addLines(lines);
}

function cmdCat({ args, cwd, addLines }) {
  if (!args[0]) {
    addLines([
      { type: 'dim', text: 'Usage: cat <file>' },
      { type: 'dim', text: '  e.g. cat resume.md' },
      { type: 'dim', text: '  e.g. cat geology     (project alias)' },
      { type: 'blank' },
    ]);
    return;
  }

  // First try a direct path resolution
  let targetPath = resolvePath(cwd, args[0]);
  let node       = VIRTUAL_FS[targetPath];

  // Fallback: project alias (cat geology → ~/projects/geology-sim)
  if (!node) {
    const canonical = PROJECT_ALIASES[args[0]];
    if (canonical) {
      targetPath = `~/projects/${canonical}`;
      node       = VIRTUAL_FS[targetPath];
    }
  }

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

  // Navigation alias: cd /about, cd /projects, etc.
  const pageCandidate = target.replace(/^\//, '').replace(/\/+$/, '');
  if (ROUTE_MAP[pageCandidate] && !target.startsWith('~') && !target.includes('..')) {
    navigate(ROUTE_MAP[pageCandidate]);
    addLines([{ type: 'rdy', text: `→ navigated to ${ROUTE_MAP[pageCandidate]}` }, { type: 'blank' }]);
    return;
  }

  // Direct project alias: cd financebuddy → navigate
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

function cmdProjects({ addLines }) {
  addLines([{ type: 'ok', text: `Projects (${PROJECTS_LIST.length}):` }, { type: 'blank' }]);
  const slugWidth = Math.max(...PROJECTS_LIST.map(p => p.slug.length)) + 2;
  PROJECTS_LIST.forEach(p => {
    addLines([
      { type: 'rdy', text: `  ${p.slug.padEnd(slugWidth)}${p.title}` },
      { type: 'dim', text: `  ${' '.repeat(slugWidth)}${p.description}` },
    ]);
  });
  addLines([
    { type: 'blank' },
    { type: 'dim', text: "  cat <slug>   read details   |   cd <slug>   open project page" },
    { type: 'blank' },
  ]);
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
      { type: 'dim', text: '  Navigate' },
      { type: 'dim', text: '    ls [-l] [path]          List directory contents' },
      { type: 'dim', text: '    tree                    Full virtual-FS tree' },
      { type: 'dim', text: '    cd <path|/page>         Change directory, or jump to a page' },
      { type: 'dim', text: '    pwd                     Print working directory' },
      { type: 'blank' },
      { type: 'dim', text: '  Read' },
      { type: 'dim', text: '    cat <file|alias>        Read a file (e.g. cat geology)' },
      { type: 'dim', text: '    projects                List all projects with descriptions' },
      { type: 'dim', text: '    grep <pattern>          Search portfolio content' },
      { type: 'blank' },
      { type: 'dim', text: '  AI' },
      { type: 'dim', text: '    /chat                   Multi-turn AI conversation' },
      { type: 'dim', text: '    summarize <page|proj>   AI summary of a page or project' },
      { type: 'dim', text: '    (just type a question — input is sent to AI automatically)' },
      { type: 'blank' },
      { type: 'dim', text: '  Info' },
      { type: 'dim', text: '    whoami / about          Short bio' },
      { type: 'dim', text: '    env                     Environment variables' },
      { type: 'dim', text: '    history                 Command history' },
      { type: 'dim', text: '    help / man [cmd]        Manual page' },
      { type: 'blank' },
      { type: 'dim', text: '  Mode & Social' },
      { type: 'dim', text: '    mode ai | mode dev      Switch terminal mode' },
      { type: 'dim', text: '    github  linkedin  email' },
      { type: 'blank' },
      { type: 'dim', text: '  Other' },
      { type: 'dim', text: '    clear                   Clear the screen' },
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

async function cmdSummarize({ args, addLines, setIsAILoading, onStreamChunk, onStreamDone, onStreamError }) {
  if (!args[0]) {
    addLines([
      { type: 'dim', text: 'Usage: summarize <page-or-project>' },
      { type: 'dim', text: '  e.g. summarize about' },
      { type: 'dim', text: '  e.g. summarize geology' },
      { type: 'blank' },
    ]);
    return;
  }

  const raw     = args[0];
  const pageKey = PROJECT_ALIASES[raw] ?? raw;
  const context = PAGE_CONTEXTS[pageKey];

  if (!context) {
    addLines([
      { type: 'dim', text: `Unknown page or project: ${raw}` },
      { type: 'dim', text: "  Try 'projects' to see all slugs, or 'tree' for available pages." },
      { type: 'blank' },
    ]);
    return;
  }

  const isProject = PROJECT_FS_SLUGS.includes(pageKey);
  const tipCmd    = isProject ? `cd ${pageKey}` : `cd /${pageKey}`;

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

function cmdMode({ args, setMode, addLines }) {
  const arg = args[0]?.toLowerCase();
  if (arg === 'ai' || arg === 'recruiter' || arg === 'chat') {
    setMode('recruiter');
    addLines([{ type: 'rdy', text: '→ Switched to AI Chat mode. Type `mode dev` to return.' }, { type: 'blank' }]);
  } else if (arg === 'dev' || arg === 'terminal') {
    setMode('dev');
    addLines([{ type: 'ok', text: '→ Switched to Dev Mode.' }, { type: 'blank' }]);
  } else {
    addLines([
      { type: 'dim', text: 'Usage: mode ai | mode dev' },
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

// ── Command registry ──────────────────────────────────────────────────────────

const COMMANDS = {
  ls: {
    description: 'List directory contents',
    usage: 'ls [-l] [path]',
    man: `NAME\n  ls — list directory contents\n\nSYNOPSIS\n  ls [-l] [path]\n\nDESCRIPTION\n  Lists files and directories in the virtual portfolio filesystem.\n  Directories are highlighted (with trailing /), files in grey.\n  -l  long format with permissions.\n\nEXAMPLES\n  ls                    list current directory\n  ls projects/          list all projects\n  ls -l                 long format listing`,
    handler: cmdLs,
  },
  tree: {
    description: 'Print the full virtual-FS tree',
    usage: 'tree',
    man: `NAME\n  tree — display the virtual filesystem as a tree\n\nSYNOPSIS\n  tree\n\nDESCRIPTION\n  Prints the entire portfolio filesystem layout at a glance.\n  Useful as a first command to get oriented.`,
    handler: cmdTree,
  },
  cat: {
    description: 'Read a virtual file (accepts project aliases)',
    usage: 'cat <file>',
    man: `NAME\n  cat — concatenate and display file contents\n\nSYNOPSIS\n  cat <file>\n\nDESCRIPTION\n  Reads and displays the contents of a virtual portfolio file.\n  Accepts project aliases — 'cat geology' resolves to 'cat projects/geology-sim'.\n\nEXAMPLES\n  cat resume.md\n  cat skills.txt\n  cat README.md\n  cat geology              (alias)\n  cat projects/financebuddy`,
    handler: cmdCat,
  },
  cd: {
    description: 'Change directory or navigate to a site page',
    usage: 'cd [path|/page|slug]',
    man: `NAME\n  cd — change current virtual directory, or navigate the site\n\nSYNOPSIS\n  cd [path]\n  cd /<page>\n  cd <project-slug>\n\nDESCRIPTION\n  Changes the current virtual directory, OR navigates the site if the\n  argument is a known page or project alias.\n  With no arguments, returns to home (~).\n\nEXAMPLES\n  cd projects/          enter the projects directory\n  cd ..                 go up one level\n  cd /about             navigate to the About page\n  cd geology            navigate to the Geology Sim project`,
    handler: cmdCd,
  },
  pwd: {
    description: 'Print working directory',
    usage: 'pwd',
    man: `NAME\n  pwd — print name of current working directory\n\nSYNOPSIS\n  pwd`,
    handler: cmdPwd,
  },
  projects: {
    description: 'List all projects with one-line descriptions',
    usage: 'projects',
    man: `NAME\n  projects — list all portfolio projects with descriptions\n\nSYNOPSIS\n  projects\n\nDESCRIPTION\n  Lists every project with its slug, title, and one-line description.\n  Use 'cat <slug>' for details, or 'cd <slug>' to open the project page.`,
    handler: cmdProjects,
  },
  grep: {
    description: 'Search portfolio content',
    usage: 'grep <pattern>',
    man: `NAME\n  grep — search portfolio knowledge base\n\nSYNOPSIS\n  grep <pattern>\n\nDESCRIPTION\n  Case-insensitive search across all portfolio content including\n  skills, projects, experience, and education.\n\nEXAMPLES\n  grep python\n  grep azure\n  grep hackathon`,
    handler: cmdGrep,
  },
  env: {
    description: 'Show environment variables',
    usage: 'env',
    man: `NAME\n  env — print environment variables\n\nSYNOPSIS\n  env`,
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
    man: `NAME\n  man — format and display manual pages\n\nSYNOPSIS\n  man [command]\n\nDESCRIPTION\n  With no arguments, lists all available commands.\n  With a command name, shows its full manual page.\n  'help' is an alias.\n\nEXAMPLES\n  man\n  man ls\n  man grep`,
    handler: cmdMan,
  },
  help: {
    description: 'List all available commands',
    usage: 'help',
    man: `NAME\n  help — list all available commands (alias for man)`,
    handler: cmdMan,
  },
  summarize: {
    description: 'AI summary of a page or project',
    usage: 'summarize <page-or-project>',
    man: `NAME\n  summarize — get an AI-generated summary\n\nSYNOPSIS\n  summarize <page-or-project>\n\nDESCRIPTION\n  Streams an AI-generated summary of a portfolio page or project.\n  Project aliases are accepted.\n\nEXAMPLES\n  summarize about\n  summarize skills\n  summarize geology\n  summarize financebuddy`,
    handler: cmdSummarize,
  },
  mode: {
    description: 'Switch between Dev and AI Chat mode',
    usage: 'mode ai | mode dev',
    man: `NAME\n  mode — switch terminal mode\n\nSYNOPSIS\n  mode ai\n  mode dev\n\nDESCRIPTION\n  ai   Switches to the AI Chat interface.\n  dev  Returns to the developer terminal (this mode).`,
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
    description: 'Display short bio',
    usage: 'whoami',
    handler: cmdWhoami,
  },
  about: {
    description: 'Display short bio (alias for whoami)',
    usage: 'about',
    handler: cmdWhoami,
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
      if (chatMessages.length >= MAX_SESSION_MESSAGES) {
        addLines([
          { type: 'dim', text: 'Session limit reached. Type exit then reopen /chat to start fresh.' },
          { type: 'blank' },
        ]);
        setCmdHistory(prev => [raw, ...prev]);
        setHistoryIdx(-1);
        return;
      }

      if (detectMisuse(trimmed)) {
        addLines([{ type: 'dim', text: MISUSE_REPLY }, { type: 'blank' }]);
        setCmdHistory(prev => [raw, ...prev]);
        setHistoryIdx(-1);
        return;
      }

      const streamId = `ai-${Date.now()}`;
      setIsAILoading(true);
      addLines([{ type: 'dim', text: '(AI)' }, { type: 'ai', text: '', id: streamId }]);

      const updatedMessages = [...chatMessages, { role: 'user', content: trimmed.slice(0, MAX_INPUT_LENGTH) }];

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
      if (detectMisuse(trimmed)) {
        addLines([{ type: 'dim', text: MISUSE_REPLY }, { type: 'blank' }]);
      } else {
        const streamId = `ai-${Date.now()}`;
        setIsAILoading(true);
        addLines([{ type: 'ai', text: '', id: streamId }]);

        await streamDevAnswer({
          question: trimmed.slice(0, MAX_INPUT_LENGTH),
          currentPage,
          chatMessages: [],
          onChunk:  (c) => onStreamChunk(streamId, c),
          onDone:   () => { onStreamDone(streamId); setIsAILoading(false); },
          onError:  (m) => { onStreamError(streamId, m); setIsAILoading(false); },
        });
      }
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
