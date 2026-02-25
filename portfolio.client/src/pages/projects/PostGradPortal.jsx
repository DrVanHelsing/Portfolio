import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import AnimatedBackground from '../../components/sections/AnimatedBackground';
import AnimatedChart from '../../components/sections/AnimatedChart';
import TechIconChip from '../../components/ui/TechIconChip';
import ArchitectureDiagram from '../../components/sections/ArchitectureDiagram';
import SEO from '../../components/utility/SEO';
import {
  ArrowLeft, Sparkles, Code2, Lock, Calendar, Users, FileText,
  CheckCircle2, Shield, Database, Globe, Monitor, Settings,
  Bell, Eye, Layers, BookOpen, UserCheck, ClipboardList,
  Palette, Mail, PenTool, Server, Brain, BarChart3, Zap
} from 'lucide-react';
import './ProjectDetail.css';

const PostGradPortal = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const requestStatusData = [
    { label: 'Draft', value: 15 },
    { label: 'Under Review', value: 30 },
    { label: 'Approved', value: 40 },
    { label: 'Referred Back', value: 10 },
    { label: 'Pending Board', value: 5 }
  ];

  const roleDistributionData = [
    { label: 'Students', value: 45 },
    { label: 'Supervisors', value: 20 },
    { label: 'Coordinators', value: 10 },
    { label: 'Admins', value: 5 },
    { label: 'External', value: 15 },
    { label: 'Examiners', value: 5 }
  ];

  const formTemplatesData = [
    { label: 'Progress Reports', value: 6 },
    { label: 'Ethics Forms', value: 4 },
    { label: 'Registration', value: 3 },
    { label: 'Examination', value: 4 },
    { label: 'Other', value: 3 }
  ];

  const workflowStagesData = [
    { label: 'Draft', value: 20 },
    { label: 'Supervisor', value: 35 },
    { label: 'Coordinator', value: 25 },
    { label: 'Faculty Board', value: 15 },
    { label: 'Senate', value: 5 }
  ];

  return (
    <div className="project-detail-page">
      <SEO
        title="UWC PostGrad Portal - Role-Based Request Management | Tredir Sewpaul"
        description="A role-based postgraduate request management system for UWC with 6 user roles, 20 dynamic form templates, PDF annotations, and guided tour system"
        keywords="UWC, postgraduate portal, React 19, Firebase, role-based access, form builder, PDF annotations"
        path="/projects/postgrad-portal"
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
          <h1 className="project-title">UWC PostGrad Portal</h1>
          <p className="project-subtitle">
            A comprehensive role-based postgraduate request management system for the University of the Western Cape with 6 user roles, dynamic forms, and full workflow lifecycle
          </p>

          <div className="project-badges">
            <TechIconChip name="React" />
            <TechIconChip name="Vite" />
            <TechIconChip name="Firebase" />
            <TechIconChip name="Cloud Firestore" />
            <TechIconChip name="EmailJS" />
            <TechIconChip name="CSS" />
          </div>

          <div className="project-links">
            <a href="https://github.com/DrVanHelsing/PostGrad-Portal" target="_blank" rel="noopener noreferrer" className="project-link-btn">
              <Code2 size={20} />
              View on GitHub
            </a>
          </div>
        </motion.div>

        <div className="project-content">
          {/* Impact Metrics */}
          <motion.div className="content-section" variants={itemVariants}>
            <h2 className="section-title"><BarChart3 size={24} />Impact Metrics</h2>
            <div className="metrics-grid" style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-lg)', marginBottom: 'var(--spacing-xl)', justifyContent: 'center' }}>
              <div className="metric-card" style={{ background: 'var(--bg-accent-light)', padding: 'var(--spacing-lg)', borderRadius: 'var(--radius-lg)', textAlign: 'center', border: '2px solid var(--apple-blue)', flex: '1 1 200px', minWidth: '180px', maxWidth: '240px' }}>
                <Users size={32} style={{ color: 'var(--apple-blue)', margin: '0 auto var(--spacing-sm)' }} />
                <div style={{ fontSize: 'var(--font-size-3xl)', fontWeight: 'var(--font-weight-bold)', color: 'var(--apple-blue)' }}>6</div>
                <div style={{ color: 'var(--apple-gray)', fontSize: 'var(--font-size-sm)' }}>User Roles</div>
              </div>
              <div className="metric-card" style={{ background: 'var(--bg-accent-light)', padding: 'var(--spacing-lg)', borderRadius: 'var(--radius-lg)', textAlign: 'center', flex: '1 1 200px', minWidth: '180px', maxWidth: '240px' }}>
                <FileText size={32} style={{ color: 'var(--apple-blue)', margin: '0 auto var(--spacing-sm)' }} />
                <div style={{ fontSize: 'var(--font-size-3xl)', fontWeight: 'var(--font-weight-bold)', color: 'var(--apple-blue)' }}>20</div>
                <div style={{ color: 'var(--apple-gray)', fontSize: 'var(--font-size-sm)' }}>Form Templates</div>
              </div>
              <div className="metric-card" style={{ background: 'var(--bg-accent-light)', padding: 'var(--spacing-lg)', borderRadius: 'var(--radius-lg)', textAlign: 'center', flex: '1 1 200px', minWidth: '180px', maxWidth: '240px' }}>
                <Layers size={32} style={{ color: 'var(--apple-blue)', margin: '0 auto var(--spacing-sm)' }} />
                <div style={{ fontSize: 'var(--font-size-3xl)', fontWeight: 'var(--font-weight-bold)', color: 'var(--apple-blue)' }}>15</div>
                <div style={{ color: 'var(--apple-gray)', fontSize: 'var(--font-size-sm)' }}>Field Types</div>
              </div>
              <div className="metric-card" style={{ background: 'var(--bg-accent-light)', padding: 'var(--spacing-lg)', borderRadius: 'var(--radius-lg)', textAlign: 'center', flex: '1 1 200px', minWidth: '180px', maxWidth: '240px' }}>
                <Mail size={32} style={{ color: 'var(--apple-blue)', margin: '0 auto var(--spacing-sm)' }} />
                <div style={{ fontSize: 'var(--font-size-3xl)', fontWeight: 'var(--font-weight-bold)', color: 'var(--apple-blue)' }}>11</div>
                <div style={{ color: 'var(--apple-gray)', fontSize: 'var(--font-size-sm)' }}>Email Functions</div>
              </div>
            </div>
          </motion.div>

          {/* Overview */}
          <motion.div className="content-section" variants={itemVariants}>
            <h2 className="section-title"><Sparkles size={24} />Overview</h2>
            <div className="section-content">
              <p>
                The UWC PostGrad Portal is a comprehensive request management system built for the University of the Western Cape&rsquo;s 
                postgraduate programme. It supports six distinct user roles &mdash; Student, Supervisor, Coordinator, Admin, External, and Examiner &mdash; 
                each with tailored capabilities throughout a full HD request lifecycle.
              </p>
              <p style={{ marginTop: 'var(--spacing-md)' }}>
                The system features 20 prebuilt dynamic form templates with 15 field types, a visual form builder for administrators, 
                PDF annotation with batch workflows, digital signatures, DOCX export, real-time notifications, and a guided tour system 
                with 13 interactive walkthroughs.
              </p>
            </div>
          </motion.div>

          {/* Architecture Diagram */}
          <motion.div className="content-section" variants={itemVariants}>
            <h2 className="section-title"><Settings size={24} />System Architecture</h2>
            <ArchitectureDiagram
              columns={[
                {
                  title: 'Frontend',
                  items: [
                    { icon: <Monitor size={24} />, title: 'React 19', subtitle: 'SPA with React Router' },
                    { icon: <Palette size={24} />, title: 'Dark/Light Mode', subtitle: '100+ CSS overrides' },
                    { icon: <BookOpen size={24} />, title: 'Guided Tours', subtitle: '13 interactive walkthroughs' }
                  ]
                },
                {
                  title: 'Services',
                  items: [
                    { icon: <Database size={24} />, title: 'Cloud Firestore', subtitle: 'Real-time NoSQL database' },
                    { icon: <Shield size={24} />, title: 'Firebase Auth', subtitle: 'Email/password + roles' },
                    { icon: <Mail size={24} />, title: 'EmailJS', subtitle: '11 email notification flows' }
                  ]
                },
                {
                  title: 'Core Features',
                  items: [
                    { icon: <FileText size={24} />, title: 'Form Builder', subtitle: '20 templates, 15 field types' },
                    { icon: <PenTool size={24} />, title: 'PDF Annotations', subtitle: 'Highlights, replies, batch send' },
                    { icon: <UserCheck size={24} />, title: 'Digital Signatures', subtitle: 'Draw or type signatures' }
                  ]
                }
              ]}
              features={[
                { icon: <ClipboardList size={28} />, title: 'HD Request Workflow', subtitle: 'Draft → Supervisor → Coordinator → Faculty → Senate → Approved' },
                { icon: <Bell size={28} />, title: 'Real-Time Notifications', subtitle: 'Firestore-backed bell icon with unread count and link navigation' },
                { icon: <Eye size={28} />, title: 'Audit Logging', subtitle: 'Searchable activity log with date filtering and CSV export' },
                { icon: <Zap size={28} />, title: 'Access Code System', subtitle: 'Secure 6-character codes with expiry for supervisor access' }
              ]}
            />
          </motion.div>

          {/* Charts */}
          <motion.div className="content-section" variants={itemVariants}>
            <h2 className="section-title"><BarChart3 size={24} />Analytics</h2>
            <div className="charts-grid">
              <div className="chart-card">
                <h3><ClipboardList size={20} />Request Status Distribution</h3>
                <AnimatedChart
                  data={requestStatusData}
                  height={220}
                  type="donut"
                  colorMap={{
                    'Draft': '#8E8E93',
                    'Under Review': '#007AFF',
                    'Approved': '#34C759',
                    'Referred Back': '#FF9500',
                    'Pending Board': '#AF52DE'
                  }}
                  showLabels={true}
                  showValues={true}
                />
              </div>
              <div className="chart-card">
                <h3><Users size={20} />Role Distribution</h3>
                <AnimatedChart
                  data={roleDistributionData}
                  height={220}
                  type="pie"
                  colorMap={{
                    'Students': '#007AFF',
                    'Supervisors': '#34C759',
                    'Coordinators': '#FF9500',
                    'Admins': '#AF52DE',
                    'External': '#FF3B30',
                    'Examiners': '#5AC8FA'
                  }}
                  showLabels={true}
                  showValues={true}
                />
              </div>
              <div className="chart-card">
                <h3><FileText size={20} />Form Templates by Category</h3>
                <AnimatedChart
                  data={formTemplatesData}
                  height={220}
                  type="bar"
                  colorMap={{
                    'Progress Reports': '#007AFF',
                    'Ethics Forms': '#34C759',
                    'Registration': '#FF9500',
                    'Examination': '#AF52DE',
                    'Other': '#5AC8FA'
                  }}
                  gradient={['#007AFF', '#5856D6']}
                  showLabels={true}
                  showValues={true}
                />
              </div>
              <div className="chart-card chart-card-full">
                <h3><Layers size={20} />Workflow Pipeline</h3>
                <AnimatedChart
                  data={workflowStagesData}
                  height={240}
                  type="bar"
                  colorMap={{
                    'Draft': '#8E8E93',
                    'Supervisor': '#007AFF',
                    'Coordinator': '#FF9500',
                    'Faculty Board': '#AF52DE',
                    'Senate': '#34C759'
                  }}
                  gradient={['#007AFF', '#5856D6']}
                  showLabels={true}
                  showValues={true}
                />
              </div>
            </div>
          </motion.div>

          {/* Six User Roles */}
          <motion.div className="content-section" variants={itemVariants}>
            <h2 className="section-title"><Users size={24} />Six User Roles</h2>
            <div className="feature-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--spacing-lg)' }}>
              {[
                { icon: <BookOpen size={24} />, role: 'Student', desc: 'Create/submit HD requests, track submissions, manage milestones, view academic progress' },
                { icon: <Eye size={24} />, role: 'Supervisor', desc: 'Review requests, approve/refer back, sign digitally, nudge students, annotate documents' },
                { icon: <ClipboardList size={24} />, role: 'Coordinator', desc: 'Manage all requests, forward to boards, record outcomes, export agendas' },
                { icon: <Shield size={24} />, role: 'Admin', desc: 'System overview, analytics, role management, audit logs, dataset exports, form builder' },
                { icon: <Globe size={24} />, role: 'External', desc: 'View assigned requests, submit forms, participate in external review workflows' },
                { icon: <UserCheck size={24} />, role: 'Examiner', desc: 'Review assigned requests, complete examiner-specific form sections' }
              ].map((item, i) => (
                <div key={i} className="info-card" style={{ display: 'flex', gap: 'var(--spacing-md)', alignItems: 'flex-start', padding: 'var(--spacing-lg)' }}>
                  <div style={{ color: 'var(--apple-blue)', flexShrink: 0 }}>{item.icon}</div>
                  <div>
                    <h3 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 600, marginBottom: '4px', color: 'var(--text-1)' }}>{item.role}</h3>
                    <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-2)', lineHeight: 1.5, margin: 0 }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Key Features */}
          <motion.div className="content-section" variants={itemVariants}>
            <h2 className="section-title"><Zap size={24} />Key Features</h2>
            <div className="feature-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--spacing-lg)' }}>
              {[
                { icon: <FileText size={20} />, title: 'Dynamic Form System', desc: '20 prebuilt templates (HDR-001 to HDR-020) with 15 field types, conditional visibility, auto-population, and locked sections' },
                { icon: <Settings size={20} />, title: 'Admin Form Builder', desc: 'Full-screen visual template editor with drag-and-drop sections, field CRUD, auto-save, and seed all templates' },
                { icon: <PenTool size={20} />, title: 'PDF Annotation System', desc: 'Full-screen PDF viewer with text selection, highlight annotations, colour picker, reply threads, and batch workflow' },
                { icon: <FileText size={20} />, title: 'DOCX Export', desc: 'Client-side Word document generation with UWC branding, structured sections, and signature placeholders' },
                { icon: <Palette size={20} />, title: 'Header/Footer Editor', desc: 'Visual customisation with 6 element types, per-element styling, and "Apply to All Templates" propagation' },
                { icon: <Bell size={20} />, title: 'Notification System', desc: 'Real-time Firestore notifications with bell icon + 11 EmailJS email functions for cross-user workflow actions' },
                { icon: <BookOpen size={20} />, title: 'Guided Tour System', desc: 'Overlay-based walkthrough engine with SVG mask highlighting, 13 tours including 4 role-specific full system tours' },
                { icon: <Shield size={20} />, title: 'Dark/Light Mode', desc: 'Complete theming system with 100+ element-level CSS overrides and persistent preference via Settings' }
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

          {/* Tech Stack */}
          <motion.div className="content-section" variants={itemVariants}>
            <h2 className="section-title"><Code2 size={24} />Tech Stack</h2>
            <div style={{ background: 'var(--bg-secondary)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: 'var(--bg-accent-light)', borderBottom: '2px solid var(--border-color)' }}>
                    <th style={{ padding: 'var(--spacing-md)', textAlign: 'left', fontWeight: 600 }}>Layer</th>
                    <th style={{ padding: 'var(--spacing-md)', textAlign: 'left', fontWeight: 600 }}>Technology</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Framework', 'React 19.2.0 (JSX)'],
                    ['Build Tool', 'Vite 7.3.1'],
                    ['Routing', 'react-router-dom 6.30.3'],
                    ['Backend', 'Firebase (Spark plan, serverless)'],
                    ['Auth', 'Firebase Authentication (email/password)'],
                    ['Database', 'Cloud Firestore (NoSQL, real-time)'],
                    ['Email', 'EmailJS (@emailjs/browser)'],
                    ['PDF Viewer', 'react-pdf 10 + pdfjs-dist 5.4'],
                    ['Icons', 'react-icons/hi2 (Heroicons v2)'],
                    ['Styling', 'Standard CSS with custom properties']
                  ].map(([layer, tech], i) => (
                    <tr key={i} style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <td style={{ padding: 'var(--spacing-md)', fontWeight: 500 }}>{layer}</td>
                      <td style={{ padding: 'var(--spacing-md)', color: 'var(--apple-gray)', fontSize: '0.875rem' }}>{tech}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Workflow */}
          <motion.div className="content-section" variants={itemVariants}>
            <h2 className="section-title"><ClipboardList size={24} />HD Request Workflow</h2>
            <div className="section-content">
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-md)', justifyContent: 'center', alignItems: 'center' }}>
                {['Draft', 'Supervisor Review', 'Co-Supervisor Sign', 'Coordinator', 'Faculty Board', 'Senate Board', 'Approved'].map((stage, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)' }}>
                    <span style={{
                      background: 'var(--accent-bg)',
                      border: '1px solid var(--accent-border)',
                      padding: '8px 16px',
                      borderRadius: 'var(--radius-lg)',
                      fontSize: 'var(--font-size-sm)',
                      fontWeight: 600,
                      color: 'var(--apple-blue)'
                    }}>
                      {stage}
                    </span>
                    {i < 6 && <span style={{ color: 'var(--apple-blue)', fontWeight: 600 }}>→</span>}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </motion.div>
    </div>
  );
};

export default PostGradPortal;
