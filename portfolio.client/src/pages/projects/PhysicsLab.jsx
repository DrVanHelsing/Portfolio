import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import AnimatedBackground from '../../components/sections/AnimatedBackground';
import AnimatedChart from '../../components/sections/AnimatedChart';
import TechIconChip from '../../components/ui/TechIconChip';
import ArchitectureDiagram from '../../components/sections/ArchitectureDiagram';
import SEO from '../../components/utility/SEO';
import {
  ArrowLeft, Sparkles, Code2, Lock, Calendar, Play, Pause, Monitor,
  Cpu, Blocks, FileCode2, Eye, Settings, Zap, BarChart3,
  BookOpen, Download, Palette, RotateCcw, Box, Atom, Globe
} from 'lucide-react';
import './ProjectDetail.css';

const PhysicsLab = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const blockTypesData = [
    { label: 'Scene/Object', value: 9 },
    { label: 'Motion/Control', value: 7 },
    { label: 'Utility/Expr', value: 7 }
  ];

  const templateCoverageData = [
    { label: 'Code Templates', value: 3 },
    { label: 'Block Templates', value: 2 }
  ];

  const exportFormatsData = [
    { label: '.py Export', value: 30 },
    { label: 'Blocks .xml', value: 25 },
    { label: 'Blocks PDF', value: 20 },
    { label: 'Code PDF', value: 25 }
  ];

  return (
    <div className="project-detail-page">
      <SEO
        title="Physics Lab IDE - Dual-Editor VPython Environment | Tredir Sewpaul"
        description="Dual-editor VPython IDE with Blockly visual blocks, code editor, and live 3D viewport for physics simulation"
        keywords="physics IDE, VPython, Blockly, GlowScript, 3D simulation, visual programming"
        path="/projects/physics-lab"
      />
      <AnimatedBackground variant="orbs" />

      <motion.div className="project-detail-container" initial="hidden" animate="visible" variants={containerVariants}>
        <Link to="/projects" className="back-link" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--apple-blue)', marginBottom: 'var(--spacing-xl)', textDecoration: 'none' }}>
          <ArrowLeft size={20} />
          Back to Projects
        </Link>

        <motion.div className="project-header" variants={itemVariants}>
          <div className="project-badge" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <span className="status-badge ongoing">
              <Lock size={16} />
              Ongoing Development
            </span>
            <span className="status-badge" style={{ background: 'var(--bg-accent-light)' }}>
              <Calendar size={16} style={{ display: 'inline', marginRight: 4 }} />
              2025 - Present
            </span>
          </div>
          <h1 className="project-title">Physics Lab IDE</h1>
          <p className="project-subtitle">
            A dual-editor VPython environment with Blockly-based visual blocks, code editing, and live 3D viewport &mdash; designed for teaching and experimentation
          </p>

          <div className="project-badges">
            <TechIconChip name="Node.js" />
            <TechIconChip name="React" />
            <TechIconChip name="Blockly" />
            <TechIconChip name="GlowScript" />
            <TechIconChip name="VPython" />
            <TechIconChip name="JavaScript" />
          </div>

          <div className="project-links">
            <a href="https://github.com/DrVanHelsing/PhysicsLab" target="_blank" rel="noopener noreferrer" className="project-link-btn">
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
                <Blocks size={32} style={{ color: 'var(--apple-blue)', margin: '0 auto var(--spacing-sm)' }} />
                <div style={{ fontSize: 'var(--font-size-3xl)', fontWeight: 'var(--font-weight-bold)', color: 'var(--apple-blue)' }}>23</div>
                <div style={{ color: 'var(--apple-gray)', fontSize: 'var(--font-size-sm)' }}>Custom Blocks</div>
              </div>
              <div className="metric-card" style={{ background: 'var(--bg-accent-light)', padding: 'var(--spacing-lg)', borderRadius: 'var(--radius-lg)', textAlign: 'center', flex: '1 1 200px', minWidth: '180px', maxWidth: '240px' }}>
                <BookOpen size={32} style={{ color: 'var(--apple-blue)', margin: '0 auto var(--spacing-sm)' }} />
                <div style={{ fontSize: 'var(--font-size-3xl)', fontWeight: 'var(--font-weight-bold)', color: 'var(--apple-blue)' }}>5</div>
                <div style={{ color: 'var(--apple-gray)', fontSize: 'var(--font-size-sm)' }}>Templates</div>
              </div>
              <div className="metric-card" style={{ background: 'var(--bg-accent-light)', padding: 'var(--spacing-lg)', borderRadius: 'var(--radius-lg)', textAlign: 'center', flex: '1 1 200px', minWidth: '180px', maxWidth: '240px' }}>
                <Download size={32} style={{ color: 'var(--apple-blue)', margin: '0 auto var(--spacing-sm)' }} />
                <div style={{ fontSize: 'var(--font-size-3xl)', fontWeight: 'var(--font-weight-bold)', color: 'var(--apple-blue)' }}>4</div>
                <div style={{ color: 'var(--apple-gray)', fontSize: 'var(--font-size-sm)' }}>Export Formats</div>
              </div>
              <div className="metric-card" style={{ background: 'var(--bg-accent-light)', padding: 'var(--spacing-lg)', borderRadius: 'var(--radius-lg)', textAlign: 'center', flex: '1 1 200px', minWidth: '180px', maxWidth: '240px' }}>
                <Monitor size={32} style={{ color: 'var(--apple-blue)', margin: '0 auto var(--spacing-sm)' }} />
                <div style={{ fontSize: 'var(--font-size-3xl)', fontWeight: 'var(--font-weight-bold)', color: 'var(--apple-blue)' }}>3D</div>
                <div style={{ color: 'var(--apple-gray)', fontSize: 'var(--font-size-sm)' }}>Live Viewport</div>
              </div>
            </div>
          </motion.div>

          {/* Overview */}
          <motion.div className="content-section" variants={itemVariants}>
            <h2 className="section-title"><Sparkles size={24} />Overview</h2>
            <div className="section-content">
              <p>
                Physics Lab IDE is a dual-editor VPython environment that bridges visual programming and code-based simulation. 
                Beginners can build 3D physics simulations using Blockly-based drag-and-drop blocks, while advanced users can 
                inspect and edit VPython code directly &mdash; both synced to a live 3D viewport powered by GlowScript 3.2.
              </p>
              <p style={{ marginTop: 'var(--spacing-md)' }}>
                Each simulation run executes inside a fresh iframe, preventing state contamination between runs. The compile pipeline 
                normalizes input code, prefixes with GlowScript headers, and invokes the RScompiler for deterministic execution.
              </p>
            </div>
          </motion.div>

          {/* Architecture Diagram */}
          <motion.div className="content-section" variants={itemVariants}>
            <h2 className="section-title"><Settings size={24} />System Architecture</h2>
            <ArchitectureDiagram
              columns={[
                {
                  title: 'Visual Editor',
                  items: [
                    { icon: <Blocks size={24} />, title: 'Blockly Workspace', subtitle: '23 custom physics blocks' },
                    { icon: <BookOpen size={24} />, title: 'Block Templates', subtitle: 'Projectile & orbital sims' },
                    { icon: <FileCode2 size={24} />, title: 'Code Generator', subtitle: 'Blocks → VPython translation' }
                  ]
                },
                {
                  title: 'Runtime Engine',
                  items: [
                    { icon: <Cpu size={24} />, title: 'Iframe Sandbox', subtitle: 'Isolated execution per run' },
                    { icon: <Globe size={24} />, title: 'GlowScript 3.2', subtitle: 'VPython compiler + renderer' },
                    { icon: <Zap size={24} />, title: 'RScompiler', subtitle: 'Python → JS compilation' }
                  ]
                },
                {
                  title: 'IDE Features',
                  items: [
                    { icon: <Play size={24} />, title: 'Run/Stop Controls', subtitle: 'Deterministic start/reset' },
                    { icon: <Download size={24} />, title: 'Export System', subtitle: '.py, .xml, and PDF formats' },
                    { icon: <Palette size={24} />, title: 'Theme Support', subtitle: 'Dark/light viewport text' }
                  ]
                }
              ]}
              features={[
                { icon: <Box size={28} />, title: '3D Live Viewport', subtitle: 'Real-time GlowScript rendering with theme-adaptive text and lighting' },
                { icon: <Blocks size={28} />, title: '23 Custom Blocks', subtitle: 'Scene, object, motion, utility and expression blocks for physics modeling' },
                { icon: <RotateCcw size={28} />, title: 'Deterministic Reset', subtitle: 'Fresh iframe per run — no state contamination between simulations' },
                { icon: <Atom size={28} />, title: 'Physics Templates', subtitle: 'Projectile motion with drag, spring oscillators, and orbital mechanics' }
              ]}
            />
          </motion.div>

          {/* Charts */}
          <motion.div className="content-section" variants={itemVariants}>
            <h2 className="section-title"><BarChart3 size={24} />Block & Template Distribution</h2>
            <div className="charts-grid">
              <div className="chart-card">
                <h3><Blocks size={20} />Custom Block Categories</h3>
                <AnimatedChart
                  data={blockTypesData}
                  height={220}
                  type="donut"
                  colorMap={{
                    'Scene/Object': '#007AFF',
                    'Motion/Control': '#34C759',
                    'Utility/Expr': '#FF9500'
                  }}
                  showLabels={true}
                  showValues={true}
                />
              </div>
              <div className="chart-card">
                <h3><BookOpen size={20} />Template Types</h3>
                <AnimatedChart
                  data={templateCoverageData}
                  height={220}
                  type="pie"
                  colorMap={{
                    'Code Templates': '#007AFF',
                    'Block Templates': '#AF52DE'
                  }}
                  showLabels={true}
                  showValues={true}
                />
              </div>
              <div className="chart-card chart-card-full">
                <h3><Download size={20} />Export Formats</h3>
                <AnimatedChart
                  data={exportFormatsData}
                  height={240}
                  type="bar"
                  colorMap={{
                    '.py Export': '#007AFF',
                    'Blocks .xml': '#34C759',
                    'Blocks PDF': '#FF9500',
                    'Code PDF': '#AF52DE'
                  }}
                  gradient={['#007AFF', '#5856D6']}
                  showLabels={true}
                  showValues={true}
                />
              </div>
            </div>
          </motion.div>

          {/* Project Modes */}
          <motion.div className="content-section" variants={itemVariants}>
            <h2 className="section-title"><Settings size={24} />Project Types &amp; Modes</h2>
            <div className="feature-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--spacing-lg)' }}>
              {[
                { icon: <Blocks size={20} />, title: 'Blank Project', desc: 'Default mode: Blocks. Toggle to Code View Only (read-only generated code). Full creative freedom.' },
                { icon: <FileCode2 size={20} />, title: 'Code Template', desc: 'Opens in code mode. Block view is available but locked (greyed out). Pre-built code simulations.' },
                { icon: <Box size={20} />, title: 'Block Template', desc: 'Opens in blocks mode. Code view is shown but locked. Drag-and-drop simulation construction.' }
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

          {/* Custom Blocks */}
          <motion.div className="content-section" variants={itemVariants}>
            <h2 className="section-title"><Blocks size={24} />Custom Block Reference</h2>
            <div className="section-content">
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--spacing-lg)' }}>
                <div className="info-card" style={{ padding: 'var(--spacing-lg)' }}>
                  <h3 style={{ fontSize: 'var(--font-size-md)', fontWeight: 600, color: 'var(--apple-blue)', marginBottom: 'var(--spacing-sm)' }}>Scene / Object</h3>
                  <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-2)', lineHeight: 1.8, margin: 0 }}>
                    scene_setup, scene_range, local_light, sphere, box, cylinder, arrow, helix, label
                  </p>
                </div>
                <div className="info-card" style={{ padding: 'var(--spacing-lg)' }}>
                  <h3 style={{ fontSize: 'var(--font-size-md)', fontWeight: 600, color: 'var(--apple-green)', marginBottom: 'var(--spacing-sm)' }}>Motion / Control</h3>
                  <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-2)', lineHeight: 1.8, margin: 0 }}>
                    set_velocity, update_position, apply_force, set_gravity, time_step, rate, forever_loop
                  </p>
                </div>
                <div className="info-card" style={{ padding: 'var(--spacing-lg)' }}>
                  <h3 style={{ fontSize: 'var(--font-size-md)', fontWeight: 600, color: 'var(--apple-orange)', marginBottom: 'var(--spacing-sm)' }}>Utility / Expression</h3>
                  <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-2)', lineHeight: 1.8, margin: 0 }}>
                    comment, set_scalar, set_vector_expr, set_attr_expr, add_attr_expr, python_raw, python_raw_expr
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Tech Stack */}
          <motion.div className="content-section" variants={itemVariants}>
            <h2 className="section-title"><Code2 size={24} />Tech Stack</h2>
            <div style={{ background: 'var(--bg-secondary)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: 'var(--bg-accent-light)', borderBottom: '2px solid var(--border-color)' }}>
                    <th style={{ padding: 'var(--spacing-md)', textAlign: 'left', fontWeight: 600 }}>Technology</th>
                    <th style={{ padding: 'var(--spacing-md)', textAlign: 'left', fontWeight: 600 }}>Purpose</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Node.js 18+', 'Runtime environment'],
                    ['React', 'UI framework'],
                    ['Blockly', 'Visual block editor'],
                    ['GlowScript 3.2', 'VPython compiler & 3D renderer'],
                    ['VPython', 'Physics simulation language'],
                    ['JavaScript', 'Core application logic']
                  ].map(([tech, purpose], i) => (
                    <tr key={i} style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <td style={{ padding: 'var(--spacing-md)', fontWeight: 500 }}>{tech}</td>
                      <td style={{ padding: 'var(--spacing-md)', color: 'var(--apple-gray)', fontSize: '0.875rem' }}>{purpose}</td>
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

export default PhysicsLab;
