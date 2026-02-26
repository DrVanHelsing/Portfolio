import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import AnimatedChart from '../../components/sections/AnimatedChart';
import TechIconChip from '../../components/ui/TechIconChip';
import ArchitectureDiagram from '../../components/sections/ArchitectureDiagram';
import SEO from '../../components/utility/SEO';
import {
  ArrowLeft, Sparkles, Code2, CheckCircle2, Calendar, Shield, Eye, EyeOff,
  MousePointer2, Undo2, Palette, Settings, Monitor, Zap, BarChart3,
  Chrome, FileCode, Database, Globe, Target, Crosshair, Lock
} from 'lucide-react';
import './ProjectDetail.css';

const AntiTemu = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const featureDistributionData = [
    { label: 'Element Hiding', value: 35 },
    { label: 'Ad Detection', value: 25 },
    { label: 'Persistence', value: 20 },
    { label: 'Theme System', value: 10 },
    { label: 'Undo Support', value: 10 }
  ];

  const componentData = [
    { label: 'Service Worker', value: 25 },
    { label: 'Auto-Hide', value: 30 },
    { label: 'Element Picker', value: 30 },
    { label: 'Popup UI', value: 15 }
  ];

  const permissionsData = [
    { label: 'storage', value: 33 },
    { label: 'activeTab', value: 33 },
    { label: 'scripting', value: 34 }
  ];

  return (
    <div className="project-detail-page">
      <SEO
        title="Anti-Temu Chrome Extension - Hide Distracting Items | Tredir Sewpaul"
        description="Privacy-preserving Chrome extension to permanently hide ads, pop-ups, and distracting elements with smart ad detection and per-site persistence"
        keywords="Chrome extension, Manifest V3, ad blocker, privacy, MutationObserver, content scripts"
        path="/projects/anti-temu"
      />

      <motion.div className="project-detail-container" initial="hidden" animate="visible" variants={containerVariants}>
        <Link to="/projects" className="back-link" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--apple-blue)', marginBottom: 'var(--spacing-xl)', textDecoration: 'none' }}>
          <ArrowLeft size={20} />
          Back to Projects
        </Link>

        <motion.div className="project-header" variants={itemVariants}>
          <div className="project-badge" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <span className="status-badge" style={{ background: 'var(--bg-accent-light)', border: '1px solid var(--apple-green)', color: 'var(--apple-green)' }}>
              <CheckCircle2 size={16} style={{ display: 'inline', marginRight: '4px' }} />
              Completed
            </span>
            <span className="status-badge" style={{ background: 'var(--bg-accent-light)' }}>
              <Calendar size={16} style={{ display: 'inline', marginRight: 4 }} />
              Jan 2025
            </span>
          </div>
          <h1 className="project-title">Hide Distracting Items</h1>
          <p className="project-subtitle">
            A privacy-preserving Chrome extension that lets you permanently hide annoying ads, pop-ups, and distracting elements on any website &mdash; no servers, no tracking, 100% local
          </p>

          <div className="project-badges">
            <TechIconChip name="JavaScript" />
            <TechIconChip name="Chrome Extension" />
            <TechIconChip name="Manifest V3" />
            <TechIconChip name="CSS" />
            <TechIconChip name="HTML" />
          </div>

          <div className="project-links">
            <a href="https://github.com/DrVanHelsing/AntiTemu" target="_blank" rel="noopener noreferrer" className="project-link-btn">
              <Code2 size={20} />
              View on GitHub
            </a>
          </div>
        </motion.div>

        <div className="project-content">
          {/* Impact Metrics */}
          <motion.div className="content-section" variants={itemVariants}>
            <h2 className="section-title"><BarChart3 size={24} />At a Glance</h2>
            <div className="metrics-grid" style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-lg)', marginBottom: 'var(--spacing-xl)', justifyContent: 'center' }}>
              <div className="metric-card" style={{ background: 'var(--bg-accent-light)', padding: 'var(--spacing-lg)', borderRadius: 'var(--radius-lg)', textAlign: 'center', border: '2px solid var(--apple-blue)', flex: '1 1 200px', minWidth: '180px', maxWidth: '240px' }}>
                <Shield size={32} style={{ color: 'var(--apple-blue)', margin: '0 auto var(--spacing-sm)' }} />
                <div style={{ fontSize: 'var(--font-size-3xl)', fontWeight: 'var(--font-weight-bold)', color: 'var(--apple-blue)' }}>0</div>
                <div style={{ color: 'var(--apple-gray)', fontSize: 'var(--font-size-sm)' }}>Network Requests</div>
              </div>
              <div className="metric-card" style={{ background: 'var(--bg-accent-light)', padding: 'var(--spacing-lg)', borderRadius: 'var(--radius-lg)', textAlign: 'center', flex: '1 1 200px', minWidth: '180px', maxWidth: '240px' }}>
                <Palette size={32} style={{ color: 'var(--apple-blue)', margin: '0 auto var(--spacing-sm)' }} />
                <div style={{ fontSize: 'var(--font-size-3xl)', fontWeight: 'var(--font-weight-bold)', color: 'var(--apple-blue)' }}>2</div>
                <div style={{ color: 'var(--apple-gray)', fontSize: 'var(--font-size-sm)' }}>Themes</div>
              </div>
              <div className="metric-card" style={{ background: 'var(--bg-accent-light)', padding: 'var(--spacing-lg)', borderRadius: 'var(--radius-lg)', textAlign: 'center', flex: '1 1 200px', minWidth: '180px', maxWidth: '240px' }}>
                <Lock size={32} style={{ color: 'var(--apple-blue)', margin: '0 auto var(--spacing-sm)' }} />
                <div style={{ fontSize: 'var(--font-size-3xl)', fontWeight: 'var(--font-weight-bold)', color: 'var(--apple-blue)' }}>3</div>
                <div style={{ color: 'var(--apple-gray)', fontSize: 'var(--font-size-sm)' }}>Permissions Only</div>
              </div>
              <div className="metric-card" style={{ background: 'var(--bg-accent-light)', padding: 'var(--spacing-lg)', borderRadius: 'var(--radius-lg)', textAlign: 'center', flex: '1 1 200px', minWidth: '180px', maxWidth: '240px' }}>
                <Chrome size={32} style={{ color: 'var(--apple-blue)', margin: '0 auto var(--spacing-sm)' }} />
                <div style={{ fontSize: 'var(--font-size-3xl)', fontWeight: 'var(--font-weight-bold)', color: 'var(--apple-blue)' }}>V3</div>
                <div style={{ color: 'var(--apple-gray)', fontSize: 'var(--font-size-sm)' }}>Manifest Version</div>
              </div>
            </div>
          </motion.div>

          {/* Overview */}
          <motion.div className="content-section" variants={itemVariants}>
            <h2 className="section-title"><Sparkles size={24} />Overview</h2>
            <div className="section-content">
              <p>
                Inspired by Apple Safari&rsquo;s &ldquo;Hide Distracting Items&rdquo; feature, this Chrome extension lets you permanently hide
                annoying ads, pop-ups, and distracting elements on any website with a single click. It uses smart ad container detection
                to identify and remove entire ad wrappers, not just individual elements.
              </p>
              <p style={{ marginTop: 'var(--spacing-md)' }}>
                All data is stored locally via chrome.storage.local &mdash; the extension makes zero network requests, includes no analytics or telemetry, 
                and requires only three minimal permissions: storage, activeTab, and scripting. Hidden elements persist across page reloads 
                and future visits via a per-site rule system.
              </p>
            </div>
          </motion.div>

          {/* Architecture Diagram */}
          <motion.div className="content-section" variants={itemVariants}>
            <h2 className="section-title"><Settings size={24} />Extension Architecture</h2>
            <ArchitectureDiagram
              columns={[
                {
                  title: 'Content Scripts',
                  items: [
                    { icon: <EyeOff size={24} />, title: 'Auto-Hide', subtitle: 'CSS injection at document_start' },
                    { icon: <MousePointer2 size={24} />, title: 'Element Picker', subtitle: 'Dual highlight + click to hide' },
                    { icon: <Eye size={24} />, title: 'MutationObserver', subtitle: 'Watches dynamic elements' }
                  ]
                },
                {
                  title: 'Background',
                  items: [
                    { icon: <FileCode size={24} />, title: 'Service Worker', subtitle: 'Message routing & storage' },
                    { icon: <Database size={24} />, title: 'chrome.storage', subtitle: 'Per-site rule persistence' },
                    { icon: <Undo2 size={24} />, title: 'Undo Stack', subtitle: 'Restore last hidden elements' }
                  ]
                },
                {
                  title: 'Popup UI',
                  items: [
                    { icon: <Monitor size={24} />, title: 'Control Panel', subtitle: 'Activate/deactivate hiding' },
                    { icon: <Palette size={24} />, title: 'Theme Switcher', subtitle: 'Default or Tactical Sniper' },
                    { icon: <Target size={24} />, title: 'Stats Display', subtitle: 'Hidden element counts & management' }
                  ]
                }
              ]}
              features={[
                { icon: <Crosshair size={28} />, title: 'Smart Ad Detection', subtitle: 'Walks DOM tree to find outermost ad wrapper using class/ID heuristics and size scoring' },
                { icon: <Shield size={28} />, title: 'Zero Network Requests', subtitle: 'All data stored locally — no servers, no tracking, no analytics, no telemetry' },
                { icon: <Palette size={28} />, title: 'Dual Theme System', subtitle: 'Clean Apple-inspired default and tactical "Temu Killer" sniper theme with military styling' },
                { icon: <Eye size={28} />, title: 'Dual Highlighting', subtitle: 'Blue outline for hovered element, red dashed outline for container to be removed' }
              ]}
            />
          </motion.div>

          {/* Charts */}
          <motion.div className="content-section" variants={itemVariants}>
            <h2 className="section-title"><BarChart3 size={24} />Feature Distribution</h2>
            <div className="charts-grid">
              <div className="chart-card">
                <h3><Shield size={20} />Feature Breakdown</h3>
                <AnimatedChart
                  data={featureDistributionData}
                  height={220}
                  type="donut"
                  colorMap={{
                    'Element Hiding': '#007AFF',
                    'Ad Detection': '#FF3B30',
                    'Persistence': '#34C759',
                    'Theme System': '#AF52DE',
                    'Undo Support': '#FF9500'
                  }}
                  showLabels={true}
                  showValues={true}
                />
              </div>
              <div className="chart-card">
                <h3><FileCode size={20} />Component Distribution</h3>
                <AnimatedChart
                  data={componentData}
                  height={220}
                  type="pie"
                  colorMap={{
                    'Service Worker': '#007AFF',
                    'Auto-Hide': '#34C759',
                    'Element Picker': '#FF9500',
                    'Popup UI': '#AF52DE'
                  }}
                  showLabels={true}
                  showValues={true}
                />
              </div>
              <div className="chart-card chart-card-full">
                <h3><Lock size={20} />Minimal Permissions</h3>
                <AnimatedChart
                  data={permissionsData}
                  height={240}
                  type="bar"
                  colorMap={{
                    'storage': '#34C759',
                    'activeTab': '#007AFF',
                    'scripting': '#FF9500'
                  }}
                  gradient={['#34C759', '#007AFF']}
                  showLabels={true}
                  showValues={true}
                />
              </div>
            </div>
          </motion.div>

          {/* Key Features */}
          <motion.div className="content-section" variants={itemVariants}>
            <h2 className="section-title"><Zap size={24} />Key Features</h2>
            <div className="feature-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--spacing-lg)' }}>
              {[
                { icon: <MousePointer2 size={20} />, title: 'One-Click Hiding', desc: 'Hover to highlight, click to hide any element. Blue outline for hovered element, red dashed outline for container.' },
                { icon: <Target size={20} />, title: 'Smart Ad Detection', desc: 'Automatically detects and removes entire ad containers by walking the DOM tree with heuristic scoring.' },
                { icon: <Database size={20} />, title: 'Per-Site Persistence', desc: 'Hidden elements stay hidden on future visits. Rules stored per-domain and per-path in chrome.storage.local.' },
                { icon: <Palette size={20} />, title: 'Two Themes', desc: 'Clean Apple-inspired default theme and tactical "Temu Killer" sniper theme with military-inspired dark styling.' },
                { icon: <Undo2 size={20} />, title: 'Undo Support', desc: 'Easily restore accidentally hidden elements. Undo last hidden or restore all elements on current site.' },
                { icon: <Shield size={20} />, title: 'Privacy First', desc: 'All data stored locally, zero network requests, minimal permissions, no analytics or telemetry whatsoever.' }
              ].map((item, i) => (
                <div key={i} className="info-card" style={{ padding: 'var(--spacing-lg)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)', marginBottom: 'var(--spacing-sm)' }}>
                    <span style={{ color: 'var(--apple-blue)' }}>{item.icon}</span>
                    <h3 style={{ fontSize: 'var(--font-size-md)', fontWeight: 600, margin: 0, color: 'var(--text-1)' }}>{item.title}</h3>
                  </div>
                  <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-2)', lineHeight: 1.5, margin: 0 }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Message API */}
          <motion.div className="content-section" variants={itemVariants}>
            <h2 className="section-title"><Code2 size={24} />Message API</h2>
            <div style={{ background: 'var(--bg-secondary)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: 'var(--bg-accent-light)', borderBottom: '2px solid var(--border-color)' }}>
                    <th style={{ padding: 'var(--spacing-md)', textAlign: 'left', fontWeight: 600 }}>Action</th>
                    <th style={{ padding: 'var(--spacing-md)', textAlign: 'left', fontWeight: 600 }}>Returns</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['getHiddenSelectors', 'CSS selectors for domain/path'],
                    ['hideElement', '{ success: boolean }'],
                    ['unhideElement', '{ success: boolean }'],
                    ['clearDomain', '{ success: boolean }'],
                    ['getStats', 'Domain count, total selectors, undo state'],
                    ['undoLast', '{ success: boolean }']
                  ].map(([action, returns], i) => (
                    <tr key={i} style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <td style={{ padding: 'var(--spacing-md)', fontWeight: 500, fontFamily: 'var(--font-mono)' }}>{action}</td>
                      <td style={{ padding: 'var(--spacing-md)', color: 'var(--apple-gray)', fontSize: '0.875rem' }}>{returns}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

        </div>
      </motion.div>
    </div>
  );
};

export default AntiTemu;
