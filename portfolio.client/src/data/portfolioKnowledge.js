import { resumeTimelineData } from './resumeTimelineData.js';

// ── Internal helpers ──────────────────────────────────────────────────────────

function projectById(id) {
  return resumeTimelineData.projects.find(p => p.id === id);
}

// Maps FS slug (used in VIRTUAL_FS and URL paths) → resumeTimelineData project id
const FS_SLUG_TO_DATA_ID = {
  'financebuddy':    'financebuddy',
  'studentlink':     'studentlink',
  'callcentre-ai':   'callcentre-ai',
  'godseye':         'godseye',
  'hangman':         'hangman',
  'tictactoe':       'tictactoe',
  'postgrad-portal': 'postgrad-portal',
  'geology-sim':     'geology-sim',
  'physics-lab':     'physics-lab',
  'anti-temu':       'anti-temu',
  'machine-learning':'neural-networks',
};

// Ordered list of project FS slugs (used for ls output)
const PROJECT_FS_SLUGS = [
  'financebuddy', 'studentlink', 'callcentre-ai', 'godseye',
  'hangman', 'tictactoe', 'postgrad-portal', 'geology-sim',
  'physics-lab', 'anti-temu', 'machine-learning',
];

// ── Content formatters ────────────────────────────────────────────────────────

export function getProjectContent(fsSlug) {
  const dataId = FS_SLUG_TO_DATA_ID[fsSlug];
  const p = dataId ? projectById(dataId) : null;
  if (!p) return `No data found for project: ${fsSlug}`;

  const lines = [
    `${p.title}`,
    `${'─'.repeat(p.title.length)}`,
    p.description,
    '',
    `Period:  ${p.period}`,
    `Status:  ${p.status}`,
    `Tech:    ${p.technologies.join(', ')}`,
    '',
    'Highlights:',
    ...p.highlights.map(h => `  • ${h}`),
  ];
  if (p.github) lines.push('', `GitHub:  ${p.github}`);
  if (p.link)   lines.push(`Route:   ${p.link}`);
  return lines.join('\n');
}

export function getSkillsContent() {
  const s = resumeTimelineData.skills;
  return [
    'Technical Skills',
    '────────────────',
    `Programming:  ${s.programming.join(', ')}`,
    `Frameworks:   ${s.frameworks.join(', ')}`,
    `Cloud:        ${s.cloud.join(', ')}`,
    `Databases:    ${s.databases.join(', ')}`,
    `Tools:        ${s.tools.join(', ')}`,
    `Soft Skills:  ${s.soft.join(', ')}`,
  ].join('\n');
}

export function getResumeContent() {
  const d = resumeTimelineData;
  const sections = [];

  sections.push('TREDIR SEWPAUL — RESUME');
  sections.push('══════════════════════════════════════════');
  sections.push('Email:    tredirs@gmail.com');
  sections.push('GitHub:   github.com/DrVanHelsing');
  sections.push('LinkedIn: linkedin.com/in/tredir-sewpaul');
  sections.push('');

  sections.push('EXPERIENCE');
  sections.push('──────────');
  d.experience.forEach(e => {
    sections.push(`${e.period}  |  ${e.title}`);
    sections.push(`  ${e.company}`);
    e.highlights.forEach(h => sections.push(`  • ${h}`));
    sections.push('');
  });

  sections.push('EDUCATION');
  sections.push('─────────');
  d.education.forEach(e => {
    sections.push(`${e.period}  |  ${e.title}`);
    sections.push(`  ${e.institution}`);
    sections.push('');
  });

  sections.push('ACHIEVEMENTS');
  sections.push('────────────');
  d.achievements.forEach(a => {
    sections.push(`${a.period}  |  ${a.title}`);
    sections.push(`  ${a.description}`);
    sections.push('');
  });

  return sections.join('\n');
}

export function getReadmeContent() {
  return [
    'portfolio@tredir-sewpaul:~',
    '══════════════════════════',
    '',
    'Tredir Sewpaul — Full-stack Developer & AI Engineer',
    'Based in Cape Town, South Africa',
    '',
    'QUICK NAVIGATION',
    '  cat resume.md           full resume',
    '  cat skills.txt          tech stack',
    '  ls projects/            all projects',
    '  cat projects/<slug>     project detail',
    '  cd /about               navigate to about page',
    '  cd /projects            navigate to projects page',
    '  man                     all available commands',
    '  mode recruiter          switch to recruiter chat mode',
    '',
    'GitHub:   github.com/DrVanHelsing',
    'LinkedIn: linkedin.com/in/tredir-sewpaul',
  ].join('\n');
}

export function getPageContent(page) {
  return PAGE_CONTEXTS[page] ?? `No context found for: ${page}`;
}

// ── PAGE_CONTEXTS (derived from resumeTimelineData) ───────────────────────────

function buildSkillsContext() {
  const s = resumeTimelineData.skills;
  return [
    `Frontend: ${[...s.frameworks.filter(f => ['React', 'Three.js'].includes(f)), 'TypeScript', 'Vite', 'HTML/CSS'].join(', ')}`,
    `Backend:  ${[...s.frameworks.filter(f => ['ASP.NET Core', '.NET 9', 'ML.NET'].includes(f)), 'Node.js', 'Python', 'C#'].join(', ')}`,
    `Cloud:    ${s.cloud.join(', ')}`,
    `Databases:${s.databases.join(', ')}`,
    `AI/ML:    ${[...s.frameworks.filter(f => ['TensorFlow', 'PyTorch', 'ML.NET'].includes(f)), 'Azure OpenAI', 'OpenCV', 'Mediapipe'].join(', ')}`,
    `Tools:    ${s.tools.join(', ')}`,
  ].join('\n');
}

function buildExperienceContext() {
  return resumeTimelineData.experience
    .map(e => `${e.title} at ${e.company} (${e.period})\n  ${e.description}`)
    .join('\n\n');
}

export const PAGE_CONTEXTS = {
  home: `Home page of Tredir Sewpaul's developer portfolio.
Tredir is a full-stack developer, AI engineer, and designer based in South Africa.
Currently: AI Engineering Intern at UWC Department of Pharmacy.
The home page features a VS Code-style IDE splash screen, animated particle backgrounds, and this floating terminal widget.
Key sections: About, Projects, Skills, Resume/Experience, Contact.
GitHub: github.com/DrVanHelsing`,

  about: `About page for Tredir Sewpaul.
Full-stack developer and AI engineer based in Cape Town, South Africa.
BSc Computer Science from the University of the Western Cape.
Currently: AI Engineering Intern, Department of Pharmacy, UWC.
Passionate about full-stack web development, AI/ML, 3D graphics, and academic tooling.
Technical interests: LLMs, vector search, 3D web graphics, AI-powered apps, developer tooling.`,

  projects: `Projects overview — 11 portfolio projects across web, desktop, AI/ML, 3D, and browser extensions.
${PROJECT_FS_SLUGS.map(slug => {
  const dataId = FS_SLUG_TO_DATA_ID[slug];
  const p = dataId ? projectById(dataId) : null;
  return p ? `  ${slug}: ${p.title} — ${p.description}` : '';
}).filter(Boolean).join('\n')}
Type 'ls projects/' to list all slugs. Type 'cat projects/<slug>' for details. Type 'open <slug>' to navigate.`,

  skills: `Skills page showcasing Tredir Sewpaul's full technical stack.\n${buildSkillsContext()}`,

  resume: `Resume and experience page for Tredir Sewpaul.\n${buildExperienceContext()}
Education: BSc Computer Science, University of the Western Cape (2018-2024).
Download the full CV from this page.
GitHub: github.com/DrVanHelsing`,

  experience: `Experience page for Tredir Sewpaul (same content as Resume).
${buildExperienceContext()}`,

  contact: `Contact page for Tredir Sewpaul.
Use the contact form on this page to send a message directly.
Email: tredirs@gmail.com
GitHub: github.com/DrVanHelsing
LinkedIn: linkedin.com/in/tredir-sewpaul`,

  ...Object.fromEntries(
    PROJECT_FS_SLUGS.map(slug => {
      const dataId = FS_SLUG_TO_DATA_ID[slug];
      const p = dataId ? projectById(dataId) : null;
      if (!p) return [slug, ''];
      return [slug, [
        `${p.title} — ${p.description}`,
        `Tech: ${p.technologies.join(', ')}`,
        `Period: ${p.period}  Status: ${p.status}`,
        ...p.highlights,
        p.github ? `GitHub: ${p.github}` : '',
      ].filter(Boolean).join('\n')];
    })
  ),
};

// ── ROUTE_MAP ─────────────────────────────────────────────────────────────────

export const ROUTE_MAP = {
  home: '/', '/': '/',
  about: '/about',
  projects: '/projects',
  skills: '/skills',
  resume: '/resume',
  experience: '/resume', exp: '/resume', cv: '/resume',
  contact: '/contact',
  financebuddy: '/projects/financebuddy',
  studentlink: '/projects/studentlink',
  callcentre: '/projects/callcentre-ai', 'callcentre-ai': '/projects/callcentre-ai',
  godseye: '/projects/godseye',
  hangman: '/projects/hangman',
  tictactoe: '/projects/tictactoe',
  postgrad: '/projects/postgrad-portal', 'postgrad-portal': '/projects/postgrad-portal',
  geology: '/projects/geology-sim', 'geology-sim': '/projects/geology-sim',
  physics: '/projects/physics-lab', 'physics-lab': '/projects/physics-lab',
  antitemu: '/projects/anti-temu', 'anti-temu': '/projects/anti-temu',
  ml: '/projects/machine-learning', 'machine-learning': '/projects/machine-learning',
};

// ── PROJECT_ALIASES (user input → canonical FS slug for navigation/open) ──────

export const PROJECT_ALIASES = {
  financebuddy: 'financebuddy', finance: 'financebuddy', buddy: 'financebuddy',
  'machine-learning': 'machine-learning', ml: 'machine-learning', machinelearning: 'machine-learning',
  studentlink: 'studentlink', student: 'studentlink',
  'callcentre-ai': 'callcentre-ai', callcentre: 'callcentre-ai', callcenter: 'callcentre-ai', callcentreai: 'callcentre-ai',
  godseye: 'godseye', gods: 'godseye',
  hangman: 'hangman',
  tictactoe: 'tictactoe', ttt: 'tictactoe',
  'postgrad-portal': 'postgrad-portal', postgrad: 'postgrad-portal', portal: 'postgrad-portal',
  'geology-sim': 'geology-sim', geology: 'geology-sim', geo: 'geology-sim',
  'physics-lab': 'physics-lab', physics: 'physics-lab',
  'anti-temu': 'anti-temu', antitemu: 'anti-temu', temu: 'anti-temu',
};

// ── VIRTUAL_FS ────────────────────────────────────────────────────────────────

export const VIRTUAL_FS = {
  '~': {
    type: 'dir',
    children: ['projects', 'pages', 'skills.txt', 'resume.md', 'README.md'],
  },
  '~/projects': {
    type: 'dir',
    children: PROJECT_FS_SLUGS,
  },
  '~/pages': {
    type: 'dir',
    children: ['home', 'about', 'projects', 'skills', 'resume', 'contact'],
  },
  '~/skills.txt':  { type: 'file', content: getSkillsContent },
  '~/resume.md':   { type: 'file', content: getResumeContent },
  '~/README.md':   { type: 'file', content: getReadmeContent },
  '~/pages/home':    { type: 'file', content: () => getPageContent('home') },
  '~/pages/about':   { type: 'file', content: () => getPageContent('about') },
  '~/pages/projects':{ type: 'file', content: () => getPageContent('projects') },
  '~/pages/skills':  { type: 'file', content: () => getPageContent('skills') },
  '~/pages/resume':  { type: 'file', content: () => getPageContent('resume') },
  '~/pages/contact': { type: 'file', content: () => getPageContent('contact') },
  ...Object.fromEntries(
    PROJECT_FS_SLUGS.map(slug => [
      `~/projects/${slug}`,
      { type: 'file', content: () => getProjectContent(slug) },
    ])
  ),
};

// ── Path utilities ────────────────────────────────────────────────────────────

export function resolvePath(cwd, input) {
  if (!input || input === '~') return '~';
  // Normalise: strip trailing slash (ls projects/ → projects)
  const norm = input.replace(/\/+$/, '') || '~';
  if (norm === '~') return '~';
  if (norm.startsWith('~/')) return norm;
  if (norm === '..') {
    const parts = cwd.split('/');
    if (parts.length <= 1) return '~';
    parts.pop();
    return parts.join('/') || '~';
  }
  // Strip leading slash: treat /projects same as projects (relative to home)
  const stripped = norm.startsWith('/') ? norm.slice(1) : norm;
  if (cwd === '~') return `~/${stripped}`;
  return `${cwd}/${stripped}`;
}

export function derivePageKey(pathname) {
  if (!pathname || pathname === '/') return 'home';
  const projectMatch = pathname.match(/^\/projects\/(.+)$/);
  if (projectMatch) {
    const slug = projectMatch[1];
    return PROJECT_ALIASES[slug] ?? slug;
  }
  return pathname.slice(1) || 'home';
}

// ── Knowledge base (memoized — built once at module load) ─────────────────────

function buildKnowledgeBaseInternal() {
  const d = resumeTimelineData;
  const parts = [];

  parts.push('PORTFOLIO OWNER: Tredir Sewpaul');
  parts.push('ROLE: AI Engineering Intern | Full-stack Developer & Designer');
  parts.push('LOCATION: Cape Town, South Africa');
  parts.push('EMAIL: tredirs@gmail.com');
  parts.push('GITHUB: github.com/DrVanHelsing');
  parts.push('LINKEDIN: linkedin.com/in/tredir-sewpaul');
  parts.push('PORTFOLIO: iamtredir.com');
  parts.push('');

  parts.push('=== CURRENT EXPERIENCE ===');
  d.experience
    .filter(e => e.status === 'current')
    .forEach(e => {
      parts.push(`${e.title} @ ${e.company} (${e.period})`);
      parts.push(e.description);
      e.highlights.forEach(h => parts.push(`  - ${h}`));
      parts.push(`  Tech: ${e.technologies.join(', ')}`);
      parts.push('');
    });

  parts.push('=== ALL EXPERIENCE ===');
  d.experience.forEach(e => {
    parts.push(`${e.period} | ${e.title} @ ${e.company}`);
    parts.push(`  ${e.description}`);
  });
  parts.push('');

  parts.push('=== EDUCATION ===');
  d.education.forEach(e => {
    parts.push(`${e.period} | ${e.title} | ${e.institution}`);
    e.details.forEach(det => parts.push(`  - ${det}`));
  });
  parts.push('');

  parts.push('=== PROJECTS ===');
  d.projects.forEach(p => {
    parts.push(`${p.title} (${p.period}) [${p.status}]`);
    parts.push(`  ${p.description}`);
    parts.push(`  Tech: ${p.technologies.join(', ')}`);
    p.highlights.forEach(h => parts.push(`  - ${h}`));
    if (p.github) parts.push(`  GitHub: ${p.github}`);
  });
  parts.push('');

  parts.push('=== ACHIEVEMENTS ===');
  d.achievements.forEach(a => {
    parts.push(`${a.period} | ${a.title}`);
    parts.push(`  ${a.description}`);
  });
  parts.push('');

  parts.push('=== SKILLS ===');
  const s = d.skills;
  parts.push(`Programming: ${s.programming.join(', ')}`);
  parts.push(`Frameworks:  ${s.frameworks.join(', ')}`);
  parts.push(`Cloud:       ${s.cloud.join(', ')}`);
  parts.push(`Databases:   ${s.databases.join(', ')}`);
  parts.push(`Tools:       ${s.tools.join(', ')}`);

  return parts.join('\n');
}

const _KNOWLEDGE_BASE = buildKnowledgeBaseInternal();

export function getKnowledgeBase() {
  return _KNOWLEDGE_BASE;
}

// ── Welcome lines ─────────────────────────────────────────────────────────────

export const WELCOME_LINES = [
  { type: 'ctx',   text: 'portfolio@tredir-sewpaul:~' },
  { type: 'sym',   text: '◆  Terminal v3.0  —  Dev Mode' },
  { type: 'dim',   text: "  Type 'man' for all commands." },
  { type: 'dim',   text: "  Type 'mode recruiter' for AI chat mode." },
  { type: 'blank' },
];
