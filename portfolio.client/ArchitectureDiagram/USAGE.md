ArchitectureDiagram component
=============================

This small component reproduces the 3-column architecture card layout used in the Business Plan page.

Purpose
-------
- Provide a reusable, Tailwind-friendly component for system architecture diagrams inside React apps.
- Keep visuals consistent with the site's look (cards, subtle gradients, icons).

Props
-----
- `columns: DiagramColumn[]` - array of columns. Each column has a `title` and `items`.
  - `DiagramColumn`: { id?: string; title: string; items: DiagramItem[] }
  - `DiagramItem`: { id?: string; title: string; subtitle?: string; icon?: ReactNode }
- `className?: string` - optional outer container class.

Example usage (in a React page)
--------------------------------
```tsx
import ArchitectureDiagram from '@/components/ArchitectureDiagram';
import { Smartphone, BarChart3, Server, Database, Wifi, Brain, Languages, Headphones } from 'lucide-react';

const columns = [
  {
    title: 'Client Applications',
    items: [
      { title: 'MAUI Mobile App', subtitle: 'Agent Interface', icon: <Smartphone className="w-6 h-6 text-aurora"/> },
      { title: 'Supervisor Dashboard', subtitle: 'Real-time Monitoring', icon: <BarChart3 className="w-6 h-6 text-primary"/> }
    ]
  },
  {
    title: 'Backend Services',
    items: [
      { title: 'ASP.NET Core API', subtitle: 'Orchestration Engine', icon: <Server className="w-6 h-6"/> },
      { title: 'SQL Database', subtitle: '', icon: <Database className="w-6 h-6"/> },
      { title: 'SignalR Hubs', subtitle: '', icon: <Wifi className="w-6 h-6"/> }
    ]
  },
  {
    title: 'Azure Cognitive Services',
    items: [
      { title: 'OpenAI GPT-4', subtitle: 'AI Responses', icon: <Brain className="w-6 h-6 text-blue-400"/> },
      { title: 'Translator', subtitle: '11 Languages', icon: <Languages className="w-6 h-6 text-green-400"/> },
      { title: 'Speech Services', subtitle: 'Voice Processing', icon: <Headphones className="w-6 h-6 text-purple-400"/> }
    ]
  }
];

export default function Example() {
  return <ArchitectureDiagram columns={columns} />;
}
```

Reusing in another React project
--------------------------------
1. Copy `src/components/ArchitectureDiagram` directory into your project (or extract the component code).
2. Ensure your project provides the small Card components used above. If you don't have the same `Card` component,
   replace `Card`/`CardContent` with a simple `div` wrapper and Tailwind classes (examples are in the component file).
3. Add the Lucide icons (or your preferred icon pack) and Tailwind config to keep the same look.

Exporting as an image
---------------------
If you want the diagram to be an image (SVG/PNG) for docs or cross-platform sharing:
- Recreate it in draw.io / Figma or use mermaid to create a textual version and export an SVG.
- Save the exported SVG under `public/assets/architecture.svg` and reference it in JSX with `<img src="/assets/architecture.svg" />`.

Notes
-----
- The component intentionally uses existing site styles (Tailwind utility classes and `glass` cards); adjust classes
  to match your project's design tokens.
