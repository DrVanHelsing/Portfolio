import { Cpu, Cloud, Code2, Database, Layers, Box, Braces, Globe, Bot, MessageSquare, GitBranch, Shield, Server, Zap, Brain, Eye, Book, FileJson, Package, Terminal, Activity, Lock, Smartphone, Monitor, FileCode, BarChart3 } from 'lucide-react';
import './TechIconChip.css';

const TECH_MAP = {
  // .NET Stack
  '.NET 8': { icon: Box, color: '#512BD4' },
  '.NET 9': { icon: Box, color: '#512BD4' },
  '.NET MAUI': { icon: Smartphone, color: '#512BD4' },
  '.NET MAUI 9': { icon: Smartphone, color: '#512BD4' },
  'ASP.NET Core': { icon: Server, color: '#512BD4' },
  'ASP.NET Core 8': { icon: Server, color: '#512BD4' },
  'C#': { icon: Code2, color: '#178600' },
  'Entity Framework': { icon: Database, color: '#178600' },
  'Entity Framework Core': { icon: Database, color: '#178600' },
  'EF Core': { icon: Database, color: '#178600' },
  'SignalR': { icon: GitBranch, color: '#0a84ff' },
  'ML.NET': { icon: Brain, color: '#512BD4' },
  
  // Databases
  'SQL Server': { icon: Database, color: '#CC2927' },
  'Azure SQL': { icon: Database, color: '#0078D4' },
  'Azure SQL Database': { icon: Database, color: '#0078D4' },
  
  // Azure Services
  'Azure': { icon: Cloud, color: '#0078D4' },
  'Azure OpenAI': { icon: Brain, color: '#0078D4' },
  'Azure OpenAI GPT-4': { icon: Brain, color: '#0078D4' },
  'Azure Cognitive Services': { icon: Bot, color: '#0078D4' },
  'Azure Speech': { icon: MessageSquare, color: '#0078D4' },
  'Azure Speech Services': { icon: MessageSquare, color: '#0078D4' },
  'Azure Translator': { icon: Globe, color: '#0078D4' },
  'Azure Language': { icon: MessageSquare, color: '#0078D4' },
  'Azure Language Service': { icon: MessageSquare, color: '#0078D4' },
  'Azure Document Intelligence': { icon: FileCode, color: '#0078D4' },
  'Azure Blob Storage': { icon: Database, color: '#0078D4' },
  'Azure Storage': { icon: Database, color: '#0078D4' },
  'Azure App Service': { icon: Cloud, color: '#0078D4' },
  'Azure Static Web Apps': { icon: Cloud, color: '#0078D4' },
  'Azure Key Vault': { icon: Shield, color: '#0078D4' },
  'Azure SignalR Service': { icon: GitBranch, color: '#0078D4' },
  'Application Insights': { icon: Activity, color: '#0078D4' },
  
  // Frontend
  'React': { icon: Braces, color: '#61DAFB' },
  'React 18': { icon: Braces, color: '#61DAFB' },
  'Vite': { icon: Zap, color: '#646CFF' },
  'Tailwind CSS': { icon: Braces, color: '#38BDF8' },
  'JavaScript': { icon: FileJson, color: '#F7DF1E' },
  'TypeScript': { icon: FileCode, color: '#3178C6' },
  'Node.js': { icon: Server, color: '#339933' },
  'Node.js 18': { icon: Server, color: '#339933' },
  'Node.js 20': { icon: Server, color: '#339933' },
  
  // Python Stack
  'Python': { icon: Cpu, color: '#3776AB' },
  'Python 3.8+': { icon: Cpu, color: '#3776AB' },
  'PyTorch': { icon: Zap, color: '#EE4C2C' },
  'TensorFlow': { icon: Layers, color: '#FF6F00' },
  'NumPy': { icon: Layers, color: '#4D77CF' },
  'Scikit-learn': { icon: BarChart3, color: '#F7931E' },
  'scikit-learn': { icon: BarChart3, color: '#F7931E' },
  'Pandas': { icon: FileJson, color: '#150458' },
  'OpenCV': { icon: Eye, color: '#5C3EE8' },
  'Mediapipe': { icon: Activity, color: '#00C4CC' },
  'PyAutoGUI': { icon: Monitor, color: '#3776AB' },
  'Jupyter': { icon: Book, color: '#F37626' },
  
  // Authentication & Security
  'JWT': { icon: Lock, color: '#000000' },
  'OAuth': { icon: Shield, color: '#000000' },
  
  // Other
  'Computer Vision': { icon: Eye, color: '#5C3EE8' },
  'Machine Learning': { icon: Brain, color: '#FF6F00' },
  'TensorBoard': { icon: BarChart3, color: '#FF6F00' },
  'XGBoost': { icon: Layers, color: '#FF6600' },
  'LightGBM': { icon: Layers, color: '#02A8EF' }
};

export default function TechIconChip({ name, technology, label }) {
  const displayName = (technology || name || label || '').trim();
  const meta = TECH_MAP[displayName] || { icon: Code2, color: 'var(--apple-blue)' };
  const Icon = meta.icon;
  return (
    <span className="tech-chip" style={{ borderColor: meta.color, color: meta.color }}>
      <Icon size={14} />
      <span>{displayName}</span>
    </span>
  );
}
