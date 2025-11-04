import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import AnimatedBackground from '../../components/AnimatedBackground';
import SEO from '../../components/SEO';
import AnimatedChart from '../../components/AnimatedChart';
import TechIconChip from '../../components/TechIconChip';
import ArchitectureDiagram from '../../components/ArchitectureDiagram';
import { ArrowLeft, Phone, Lock, Zap, Calendar, BarChart3, MessageCircle, Eye, Users, Bell, FileText, Headphones, Smartphone, Settings, TrendingUp, Hash, MapPin, Languages, BookOpen, AlertTriangle, Server, Database, GitBranch, Brain, Globe, Activity } from 'lucide-react';
import './ProjectDetail.css';

const CallCentreAI = () => {
  // Mock data for charts
  const sentimentData = [
    { label: 'Positive', value: 65 },
    { label: 'Neutral', value: 25 },
    { label: 'Negative', value: 10 }
  ];

  const callMetricsData = [
    { label: 'Mon', value: 85 },
    { label: 'Tue', value: 92 },
    { label: 'Wed', value: 78 },
    { label: 'Thu', value: 95 },
    { label: 'Fri', value: 88 },
    { label: 'Sat', value: 70 },
    { label: 'Sun', value: 65 }
  ];

  const sessionTypesData = [
    { label: 'Voice', value: 45 },
    { label: 'Chat', value: 35 },
    { label: 'Video', value: 20 }
  ];

  return (
    <div className="project-detail-page">
      <SEO title="Telkom AI Call Centre | Tredir Sewpaul" description="AI-assisted customer engagement platform with real-time supervision and cross-platform support" path="/projects/callcentre-ai" />
      <AnimatedBackground variant="particles" />
      
      <motion.div className="project-detail-container" initial={{opacity:0}} animate={{opacity:1}}>
        <Link to="/projects" className="back-link" style={{display:'inline-flex',alignItems:'center',gap:'8px',color:'var(--apple-blue)',marginBottom:'var(--spacing-xl)',textDecoration:'none'}}>
          <ArrowLeft size={20} />Back to Projects
        </Link>

        <div className="project-header">
          <span className="status-badge ongoing"><Lock size={16} />Ongoing Development</span>
          <h1 className="project-title">Telkom AI Call Centre Management Solution</h1>
          <p className="project-subtitle">Comprehensive, multi-project solution for AI-assisted customer engagement with real-time supervision and cross-platform mobile client</p>
          <div className="project-badges" style={{marginTop:'var(--spacing-sm)'}}>
            <span className="status-badge" style={{background:'var(--bg-accent-light)'}}>
              <Calendar size={16} style={{display:'inline',marginRight:4}} />
              Aug 2025 - Present
            </span>
          </div>
          
          <div className="project-badges">
            <TechIconChip name=".NET 8" />
            <TechIconChip name=".NET 9" />
            <TechIconChip name="ASP.NET Core" />
            <TechIconChip name="React" />
            <TechIconChip name="Vite" />
            <TechIconChip name=".NET MAUI" />
            <TechIconChip name="SignalR" />
            <TechIconChip name="Azure Speech" />
            <TechIconChip name="Azure Language Service" />
            <TechIconChip name="Entity Framework Core" />
            <TechIconChip name="SQL Server" />
          </div>
        </div>

        <div className="project-content">
          {/* Overview */}
          <div className="content-section">
            <h2 className="section-title"><Phone size={24} />Overview</h2>
            <div className="section-content">
              <p>Telkom AI Call Centre Management Solution demonstrates how to combine modern .NET server-side APIs, real-time SignalR communication, a React-based supervisor dashboard, and a cross-platform MAUI client to build an AI-assisted contact centre platform.</p>
              <p style={{marginTop:'var(--spacing-md)'}}>The solution focuses on real-time monitoring and supervision of active sessions, orchestration of chat/voice sessions, integration with speech and cognitive services for transcription, translation, and AI-assisted responses, and comprehensive analytics for supervisors and analysts.</p>
            </div>
          </div>

          {/* Project Structure */}
          <div className="content-section">
            <h2 className="section-title">Project Structure</h2>
            <div style={{background:'var(--bg-secondary)',borderRadius:'var(--radius-lg)',overflow:'hidden'}}>
              <table style={{width:'100%',borderCollapse:'collapse'}}>
                <thead>
                  <tr style={{background:'var(--bg-accent-light)',borderBottom:'2px solid var(--border-color)'}}>
                    <th style={{padding:'var(--spacing-md)',textAlign:'left',fontWeight:600}}>Project</th>
                    <th style={{padding:'var(--spacing-md)',textAlign:'left',fontWeight:600}}>Type</th>
                    <th style={{padding:'var(--spacing-md)',textAlign:'left',fontWeight:600}}>Target(s)</th>
                    <th style={{padding:'var(--spacing-md)',textAlign:'left',fontWeight:600}}>Purpose</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{borderBottom:'1px solid var(--border-color)'}}>
                    <td style={{padding:'var(--spacing-md)',fontWeight:500}}>TelkomAI.Shared</td>
                    <td style={{padding:'var(--spacing-md)',color:'var(--apple-gray)'}}>Class Library</td>
                    <td style={{padding:'var(--spacing-md)',fontSize:'0.875rem',color:'var(--apple-gray)'}}>net8.0; net9.0</td>
                    <td style={{padding:'var(--spacing-md)',fontSize:'0.875rem'}}>Shared DTOs, models and helpers</td>
                  </tr>
                  <tr style={{borderBottom:'1px solid var(--border-color)'}}>
                    <td style={{padding:'var(--spacing-md)',fontWeight:500}}>TelkomAI.ApiOrchestrator</td>
                    <td style={{padding:'var(--spacing-md)',color:'var(--apple-gray)'}}>ASP.NET Core API</td>
                    <td style={{padding:'var(--spacing-md)',fontSize:'0.875rem',color:'var(--apple-gray)'}}>net8.0</td>
                    <td style={{padding:'var(--spacing-md)',fontSize:'0.875rem'}}>Chat orchestration, SignalR hubs, analytics</td>
                  </tr>
                  <tr style={{borderBottom:'1px solid var(--border-color)'}}>
                    <td style={{padding:'var(--spacing-md)',fontWeight:500}}>TelkomAI.ReactDashboard</td>
                    <td style={{padding:'var(--spacing-md)',color:'var(--apple-gray)'}}>React + ASP.NET Host</td>
                    <td style={{padding:'var(--spacing-md)',fontSize:'0.875rem',color:'var(--apple-gray)'}}>net9.0 + Node 20</td>
                    <td style={{padding:'var(--spacing-md)',fontSize:'0.875rem'}}>Supervisor dashboard with Vite frontend</td>
                  </tr>
                  <tr>
                    <td style={{padding:'var(--spacing-md)',fontWeight:500}}>TelkomSupportApp</td>
                    <td style={{padding:'var(--spacing-md)',color:'var(--apple-gray)'}}>.NET MAUI</td>
                    <td style={{padding:'var(--spacing-md)',fontSize:'0.875rem',color:'var(--apple-gray)'}}>Android, iOS, Windows, Mac</td>
                    <td style={{padding:'var(--spacing-md)',fontSize:'0.875rem'}}>Cross-platform mobile client for agents</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Architecture Diagram */}
          <div className="content-section">
            <h2 className="section-title">System Architecture</h2>
            <div className="architecture-section">
            <ArchitectureDiagram
              columns={[
                {
                  title: 'Client Applications',
                  items: [
                    {
                      title: 'MAUI Mobile App',
                      subtitle: 'Agent Interface',
                      icon: <Smartphone className="w-6 h-6" style={{color: 'var(--apple-blue)'}} />
                    },
                    {
                      title: 'Supervisor Dashboard',
                      subtitle: 'Real-time Monitoring',
                      icon: <Eye className="w-6 h-6" style={{color: 'var(--apple-indigo)'}} />
                    }
                  ]
                },
                {
                  title: 'Backend Services',
                  items: [
                    {
                      title: 'ASP.NET Core API',
                      subtitle: 'Orchestration Engine',
                      icon: <Server className="w-6 h-6" style={{color: 'var(--apple-blue)'}} />
                    },
                    {
                      title: 'SQL Database',
                      subtitle: 'Entity Framework Core',
                      icon: <Database className="w-6 h-6" style={{color: 'var(--apple-green)'}} />
                    },
                    {
                      title: 'SignalR Hubs',
                      subtitle: '/chathub, /supervisorhub',
                      icon: <GitBranch className="w-6 h-6" style={{color: 'var(--apple-purple)'}} />
                    }
                  ]
                },
                {
                  title: 'Azure Cognitive Services',
                  items: [
                    {
                      title: 'OpenAI GPT-4',
                      subtitle: 'AI Responses',
                      icon: <Brain className="w-6 h-6" style={{color: 'var(--apple-blue)'}} />
                    },
                    {
                      title: 'Translator',
                      subtitle: '11 Languages',
                      icon: <Globe className="w-6 h-6" style={{color: 'var(--apple-green)'}} />
                    },
                    {
                      title: 'Speech Services',
                      subtitle: 'Voice Processing',
                      icon: <MessageCircle className="w-6 h-6" style={{color: 'var(--apple-purple)'}} />
                    }
                  ]
                }
              ]}
              features={[
                {
                  title: 'Multilingual AI Voice & Chat',
                  subtitle: '11 South African languages supported',
                  icon: <Globe className="w-6 h-6" style={{color: 'var(--apple-blue)'}} />
                },
                {
                  title: 'Real-time Supervisor Dashboard',
                  subtitle: 'Live monitoring and takeover',
                  icon: <Eye className="w-6 h-6" style={{color: 'var(--apple-indigo)'}} />
                },
                {
                  title: 'Analytics & SLA Monitoring',
                  subtitle: 'Performance insights and reporting',
                  icon: <BarChart3 className="w-6 h-6" style={{color: 'var(--apple-purple)'}} />
                }
              ]}
            />
            </div>
          </div>

          {/* Live Analytics */}
          <div className="content-section">
            <h2 className="section-title"><BarChart3 size={24} />Live Analytics & Metrics</h2>
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit, minmax(280px,1fr))',gap:'var(--spacing-lg)',marginBottom:'var(--spacing-xl)'}}>
              <div style={{background:'var(--bg-secondary)',borderRadius:'var(--radius-lg)',padding:'var(--spacing-lg)'}}>
                <div style={{display:'flex',alignItems:'center',gap:'var(--spacing-sm)',marginBottom:'var(--spacing-md)'}}>
                  <MessageCircle size={24} style={{color:'var(--apple-blue)'}} />
                  <h3 style={{fontSize:'var(--font-size-lg)',fontWeight:600}}>Active Sessions</h3>
                </div>
                <div style={{fontSize:'var(--font-size-3xl)',fontWeight:'var(--font-weight-bold)',color:'var(--apple-blue)',marginBottom:'var(--spacing-sm)'}}>120</div>
                <div style={{fontSize:'var(--font-size-sm)',color:'var(--apple-gray)'}}>Real-time monitoring via SignalR</div>
              </div>

              <div style={{background:'var(--bg-secondary)',borderRadius:'var(--radius-lg)',padding:'var(--spacing-lg)'}}>
                <div style={{display:'flex',alignItems:'center',gap:'var(--spacing-sm)',marginBottom:'var(--spacing-md)'}}>
                  <TrendingUp size={24} style={{color:'var(--apple-green)'}} />
                  <h3 style={{fontSize:'var(--font-size-lg)',fontWeight:600}}>Avg Call Quality</h3>
                </div>
                <div style={{fontSize:'var(--font-size-3xl)',fontWeight:'var(--font-weight-bold)',color:'var(--apple-green)',marginBottom:'var(--spacing-sm)'}}>4.2/5</div>
                <div style={{fontSize:'var(--font-size-sm)',color:'var(--apple-gray)'}}>Based on sentiment analysis</div>
              </div>

              <div style={{background:'var(--bg-secondary)',borderRadius:'var(--radius-lg)',padding:'var(--spacing-lg)'}}>
                <div style={{display:'flex',alignItems:'center',gap:'var(--spacing-sm)',marginBottom:'var(--spacing-md)'}}>
                  <Zap size={24} style={{color:'var(--apple-indigo)'}} />
                  <h3 style={{fontSize:'var(--font-size-lg)',fontWeight:600}}>System Uptime</h3>
                </div>
                <div style={{fontSize:'var(--font-size-3xl)',fontWeight:'var(--font-weight-bold)',color:'var(--apple-indigo)',marginBottom:'var(--spacing-sm)'}}>98.9%</div>
                <div style={{fontSize:'var(--font-size-sm)',color:'var(--apple-gray)'}}>SignalR real-time reliability</div>
              </div>
            </div>

            {/* Charts - 2x2 Grid for better sizing */}
            <div className="chart-grid-section" style={{display:'grid',gridTemplateColumns:'repeat(auto-fit, minmax(400px,1fr))',gap:'var(--spacing-xl)',maxWidth:'1200px',margin:'0 auto'}}>
              <div style={{background:'var(--bg-secondary)',borderRadius:'var(--radius-lg)',padding:'var(--spacing-xl)'}}>
                <h3 style={{fontSize:'var(--font-size-md)',fontWeight:600,marginBottom:'var(--spacing-md)'}}>Weekly Call Volume</h3>
                <AnimatedChart 
                  data={callMetricsData} 
                  height={220}
                  type="bar"
                  gradient={['var(--apple-blue)', 'var(--apple-indigo)']}
                  showLabels={true}
                />
              </div>

              <div style={{background:'var(--bg-secondary)',borderRadius:'var(--radius-lg)',padding:'var(--spacing-xl)'}}>
                <h3 style={{fontSize:'var(--font-size-md)',fontWeight:600,marginBottom:'var(--spacing-md)'}}>Sentiment Distribution</h3>
                <AnimatedChart 
                  data={sentimentData} 
                  height={220}
                  type="donut"
                  gradient={['#34C759', '#FFD60A', '#FF453A']}
                  colorMap={{
                    'Positive': '#34C759',
                    'Neutral': '#FFD60A',
                    'Negative': '#FF453A'
                  }}
                  showLabels={true}
                  showValues={true}
                />
              </div>

              <div style={{background:'var(--bg-secondary)',borderRadius:'var(--radius-lg)',padding:'var(--spacing-xl)'}}>
                <h3 style={{fontSize:'var(--font-size-md)',fontWeight:600,marginBottom:'var(--spacing-md)'}}>Session Types</h3>
                <AnimatedChart 
                  data={sessionTypesData} 
                  height={220}
                  type="pie"
                  gradient={['var(--apple-blue)', 'var(--apple-purple)', 'var(--apple-indigo)']}
                  colorMap={{
                    'Voice': 'var(--apple-blue)',
                    'Chat': 'var(--apple-purple)',
                    'Video': 'var(--apple-indigo)'
                  }}
                  showLabels={true}
                  showValues={true}
                />
              </div>
            </div>
          </div>

          {/* Text Analytics */}
          <div className="content-section">
            <h2 className="section-title"><FileText size={24} />AI-Powered Text Analytics</h2>
            <p className="section-content" style={{marginBottom:'var(--spacing-lg)'}}>
              The solution provides comprehensive text analytics capabilities via Azure Text Analytics, exposing insights for supervisors and analysts through the dashboard.
            </p>
            <div className="features-grid">
              <div className="feature-card">
                <TrendingUp size={32} style={{color:'var(--apple-blue)',marginBottom:'var(--spacing-sm)'}} />
                <h3 className="feature-title">Sentiment Analysis</h3>
                <p className="feature-description">Overall session sentiment and per-utterance sentiment scoring with live trends and alerts on negative calls</p>
              </div>
              <div className="feature-card">
                <Hash size={32} style={{color:'var(--apple-blue)',marginBottom:'var(--spacing-sm)'}} />
                <h3 className="feature-title">Key Phrase Extraction</h3>
                <p className="feature-description">Identify important terms/topics in calls/chats for topic classification and clustering</p>
              </div>
              <div className="feature-card">
                <Users size={32} style={{color:'var(--apple-blue)',marginBottom:'var(--spacing-sm)'}} />
                <h3 className="feature-title">Named Entity Recognition</h3>
                <p className="feature-description">Identify people, organizations, locations, and numbers from conversations</p>
              </div>
              <div className="feature-card">
                <Languages size={32} style={{color:'var(--apple-blue)',marginBottom:'var(--spacing-sm)'}} />
                <h3 className="feature-title">Language Detection</h3>
                <p className="feature-description">Automatic language detection and translation helpers when transcripts cross locales</p>
              </div>
              <div className="feature-card">
                <BookOpen size={32} style={{color:'var(--apple-blue)',marginBottom:'var(--spacing-sm)'}} />
                <h3 className="feature-title">Conversation Summarization</h3>
                <p className="feature-description">Auto-generated notes and summaries for supervisor review or CRM integration</p>
              </div>
              <div className="feature-card">
                <AlertTriangle size={32} style={{color:'var(--apple-blue)',marginBottom:'var(--spacing-sm)'}} />
                <h3 className="feature-title">Escalation Detection</h3>
                <p className="feature-description">Detection of contact-sensitive or escalation terms with customizable rules</p>
              </div>
            </div>
          </div>

          {/* Dashboard Features */}
          <div className="content-section">
            <h2 className="section-title"><Eye size={24} />Supervisor Dashboard Features</h2>
            <p className="section-content" style={{marginBottom:'var(--spacing-lg)'}}>
              The React-based supervisor dashboard provides comprehensive real-time monitoring and management capabilities for supervisors, analysts, and administrators.
            </p>
            <div className="features-grid">
              <div className="feature-card">
                <Users size={32} style={{color:'var(--apple-blue)',marginBottom:'var(--spacing-sm)'}} />
                <h3 className="feature-title">Live Sessions</h3>
                <p className="feature-description">Real-time list of active sessions with filters by agent, queue, priority, and sentiment</p>
              </div>
              <div className="feature-card">
                <Eye size={32} style={{color:'var(--apple-blue)',marginBottom:'var(--spacing-sm)'}} />
                <h3 className="feature-title">Session Detail View</h3>
                <p className="feature-description">Full transcript, realtime events, participant metadata, and connected devices</p>
              </div>
              <div className="feature-card">
                <Headphones size={32} style={{color:'var(--apple-blue)',marginBottom:'var(--spacing-sm)'}} />
                <h3 className="feature-title">Takeover & Intervention</h3>
                <p className="feature-description">Supervisors can join or take over sessions (chat or voice) and send messages/actions</p>
              </div>
              <div className="feature-card">
                <FileText size={32} style={{color:'var(--apple-blue)',marginBottom:'var(--spacing-sm)'}} />
                <h3 className="feature-title">Transcript Viewer</h3>
                <p className="feature-description">Searchable transcripts with highlights for sentiment, entities, key phrases, and timestamps</p>
              </div>
              <div className="feature-card">
                <BarChart3 size={32} style={{color:'var(--apple-blue)',marginBottom:'var(--spacing-sm)'}} />
                <h3 className="feature-title">Call Metrics & KPIs</h3>
                <p className="feature-description">AHT, CSAT proxies, sentiment distribution, dropped call rates with date range controls</p>
              </div>
              <div className="feature-card">
                <Bell size={32} style={{color:'var(--apple-blue)',marginBottom:'var(--spacing-sm)'}} />
                <h3 className="feature-title">Alerts & Notifications</h3>
                <p className="feature-description">Configure thresholds (sentiment, keywords, SLA) to surface problematic sessions</p>
              </div>
              <div className="feature-card">
                <Settings size={32} style={{color:'var(--apple-blue)',marginBottom:'var(--spacing-sm)'}} />
                <h3 className="feature-title">Settings & Overrides</h3>
                <p className="feature-description">Per-browser local overrides, JSON import/export of dashboard settings</p>
              </div>
              <div className="feature-card">
                <FileText size={32} style={{color:'var(--apple-blue)',marginBottom:'var(--spacing-sm)'}} />
                <h3 className="feature-title">Export & Reporting</h3>
                <p className="feature-description">Export transcripts, metrics, and session data to JSON/CSV for downstream analysis</p>
              </div>
            </div>
          </div>

          {/* Mobile App Features */}
          <div className="content-section">
            <h2 className="section-title"><Smartphone size={24} />Mobile Agent App (.NET MAUI)</h2>
            <p className="section-content" style={{marginBottom:'var(--spacing-lg)'}}>
              The cross-platform mobile app (TelkomSupportApp) is designed for agents and mobile-first users with comprehensive call handling and offline capabilities.
            </p>
            <div className="features-grid">
              <div className="feature-card">
                <h3 className="feature-title">Agent Login & Presence</h3>
                <p className="feature-description">Sign in, set availability (available, wrap-up, away) with presence syncing to dashboard</p>
              </div>
              <div className="feature-card">
                <h3 className="feature-title">Call Handling</h3>
                <p className="feature-description">Accept/reject calls, mute/unmute, hold, transfer, and hang-up controls for voice sessions</p>
              </div>
              <div className="feature-card">
                <h3 className="feature-title">Chat Messaging</h3>
                <p className="feature-description">Real-time chat with customers, typing indicators, and message receipts</p>
              </div>
              <div className="feature-card">
                <h3 className="feature-title">AI-Suggested Responses</h3>
                <p className="feature-description">AI-assisted quick replies and canned response insertion based on conversation context</p>
              </div>
              <div className="feature-card">
                <h3 className="feature-title">Live Transcript View</h3>
                <p className="feature-description">See live transcription during calls (when enabled) with timestamps</p>
              </div>
              <div className="feature-card">
                <h3 className="feature-title">Offline Mode & Resilience</h3>
                <p className="feature-description">Queued messages and local caching for transient connectivity issues</p>
              </div>
              <div className="feature-card">
                <h3 className="feature-title">Post-call Actions</h3>
                <p className="feature-description">Add tags, notes, escalate or create tickets from a completed session</p>
              </div>
              <div className="feature-card">
                <h3 className="feature-title">Multi-Language Support</h3>
                <p className="feature-description">Support for configured languages and local formats</p>
              </div>
            </div>
          </div>

          {/* SignalR Hubs & Endpoints */}
          <div className="content-section">
            <h2 className="section-title">SignalR Hubs & REST Endpoints</h2>
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit, minmax(300px,1fr))',gap:'var(--spacing-md)'}}>
              <div style={{background:'var(--bg-accent-light)',padding:'var(--spacing-lg)',borderRadius:'var(--radius-lg)',borderLeft:'4px solid var(--apple-blue)'}}>
                <code style={{fontSize:'var(--font-size-md)',fontWeight:600,color:'var(--apple-blue)'}}>/chathub</code>
                <p style={{fontSize:'var(--font-size-sm)',color:'var(--apple-gray)',marginTop:'var(--spacing-sm)'}}>Primary chat/events hub for agents and clients. Used for user/agent chat sessions and relayed events.</p>
              </div>
              <div style={{background:'var(--bg-accent-light)',padding:'var(--spacing-lg)',borderRadius:'var(--radius-lg)',borderLeft:'4px solid var(--apple-indigo)'}}>
                <code style={{fontSize:'var(--font-size-md)',fontWeight:600,color:'var(--apple-indigo)'}}>/supervisorhub</code>
                <p style={{fontSize:'var(--font-size-sm)',color:'var(--apple-gray)',marginTop:'var(--spacing-sm)'}}>Real-time session monitoring hub for supervisors. Provides live updates and control capabilities.</p>
              </div>
              <div style={{background:'var(--bg-accent-light)',padding:'var(--spacing-lg)',borderRadius:'var(--radius-lg)',borderLeft:'4px solid var(--apple-purple)'}}>
                <code style={{fontSize:'var(--font-size-md)',fontWeight:600,color:'var(--apple-purple)'}}>/api/*</code>
                <p style={{fontSize:'var(--font-size-sm)',color:'var(--apple-gray)',marginTop:'var(--spacing-sm)'}}>REST API endpoints for session management, analytics, health checks, and configuration.</p>
              </div>
            </div>
          </div>

          {/* Azure Infrastructure */}
          <div className="content-section">
            <h2 className="section-title">Azure Infrastructure</h2>
            <div className="section-content" style={{marginBottom:'var(--spacing-lg)'}}>
              <p>The solution integrates with multiple Azure services for AI capabilities, real-time communication, and scalability.</p>
            </div>
            <div className="features-grid">
              <div className="feature-card">
                <h3 className="feature-title">Azure Speech Services</h3>
                <p className="feature-description">Real-time speech-to-text transcription for voice calls with multi-language support</p>
                <div style={{marginTop:'var(--spacing-sm)'}}>
                  <TechIconChip name="Azure Speech" />
                </div>
              </div>
              <div className="feature-card">
                <h3 className="feature-title">Azure Language Services</h3>
                <p className="feature-description">Text analytics including sentiment analysis, key phrase extraction, and entity recognition</p>
                <div style={{marginTop:'var(--spacing-sm)'}}>
                  <TechIconChip name="Azure Language Service" />
                </div>
              </div>
              <div className="feature-card">
                <h3 className="feature-title">Azure SignalR Service</h3>
                <p className="feature-description">Optional scale-out for WebSocket connections enabling multiple API instances</p>
                <div style={{marginTop:'var(--spacing-sm)'}}>
                  <TechIconChip name="Azure SignalR Service" />
                </div>
              </div>
              <div className="feature-card">
                <h3 className="feature-title">SQL Server Database</h3>
                <p className="feature-description">Entity Framework Core with SQL Server for session data, analytics, and user management</p>
                <div style={{marginTop:'var(--spacing-sm)'}}>
                  <TechIconChip name="SQL Server" />
                  <TechIconChip name="Entity Framework Core" />
                </div>
              </div>
            </div>
          </div>

          {/* Technical Stack Summary */}
          <div className="content-section">
            <h2 className="section-title">Complete Technical Stack</h2>
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit, minmax(250px,1fr))',gap:'var(--spacing-lg)'}}>
              <div style={{background:'var(--bg-secondary)',padding:'var(--spacing-lg)',borderRadius:'var(--radius-lg)'}}>
                <h3 style={{fontSize:'var(--font-size-md)',fontWeight:600,marginBottom:'var(--spacing-md)',color:'var(--apple-blue)'}}>Backend</h3>
                <ul style={{listStyle:'none',padding:0,margin:0,display:'flex',flexDirection:'column',gap:'var(--spacing-sm)'}}>
                  <li>✓ ASP.NET Core 8 Web API</li>
                  <li>✓ SignalR Real-Time Communication</li>
                  <li>✓ Entity Framework Core</li>
                  <li>✓ SQL Server Database</li>
                  <li>✓ Azure Cognitive Services SDK</li>
                </ul>
              </div>
              <div style={{background:'var(--bg-secondary)',padding:'var(--spacing-lg)',borderRadius:'var(--radius-lg)'}}>
                <h3 style={{fontSize:'var(--font-size-md)',fontWeight:600,marginBottom:'var(--spacing-md)',color:'var(--apple-indigo)'}}>Frontend</h3>
                <ul style={{listStyle:'none',padding:0,margin:0,display:'flex',flexDirection:'column',gap:'var(--spacing-sm)'}}>
                  <li>✓ React 18 with Vite</li>
                  <li>✓ ASP.NET Core 9 Host</li>
                  <li>✓ SignalR Client</li>
                  <li>✓ Axios HTTP Client</li>
                  <li>✓ Responsive Design</li>
                </ul>
              </div>
              <div style={{background:'var(--bg-secondary)',padding:'var(--spacing-lg)',borderRadius:'var(--radius-lg)'}}>
                <h3 style={{fontSize:'var(--font-size-md)',fontWeight:600,marginBottom:'var(--spacing-md)',color:'var(--apple-purple)'}}>Mobile</h3>
                <ul style={{listStyle:'none',padding:0,margin:0,display:'flex',flexDirection:'column',gap:'var(--spacing-sm)'}}>
                  <li>✓ .NET MAUI 9</li>
                  <li>✓ Android / iOS / Windows / Mac</li>
                  <li>✓ MVVM Architecture</li>
                  <li>✓ Offline-First Design</li>
                  <li>✓ Platform Services</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CallCentreAI;
