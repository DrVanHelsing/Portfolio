import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import AnimatedBackground from '../../components/sections/AnimatedBackground';
import TechIconChip from '../../components/ui/TechIconChip';
import ArchitectureDiagram from '../../components/sections/ArchitectureDiagram';
import SEO from '../../components/utility/SEO';
import { 
  ArrowLeft, Users, Lock, Briefcase, Calendar, BarChart3, TrendingUp, Zap, Target,
  Brain, FileText, Search, Shield, Cloud, Smartphone, Monitor, Server,
  Database, GitBranch, Layers, Sparkles, MessageSquare, Upload, FileCode,
  Cpu, ListChecks, Lightbulb, Activity, ArrowRight, ExternalLink, Play,
  User, Building2, GraduationCap, Mic, Video, CheckCircle2, Image
} from 'lucide-react';
import './ProjectDetail.css';
import '../../components/sections/ArchitectureDiagram.css';

// Screenshot data for galleries
const STUDENT_WEB_SCREENSHOTS = [
  {
    title: "Mission Control Dashboard",
    description: "Launchpad summarizing interview readiness, tasks, and recruiter responses.",
    media: "/studentlink/Student/1-Student Dashboard.png",
    type: "image"
  },
  {
    title: "CV Upload & Parsing",
    description: "Drag-and-drop CV upload with instant parsing status and tips.",
    media: "/studentlink/Student/2-CV Upload.png",
    type: "image"
  },
  {
    title: "AI CV Analysis",
    description: "Video walkthrough of GPT-powered feedback across structure, skills, and impact.",
    media: "/studentlink/Student/3-CV Analysis & Feedback.mp4",
    type: "video"
  },
  {
    title: "Smart Job Recommendations",
    description: "AI heatmap explains why each role matches the student's profile.",
    media: "/studentlink/Student/4-Job Reccommendations Page with AI Analysis.mp4",
    type: "video"
  },
  {
    title: "Profile Spotlight Generator",
    description: "One-click elevator pitch creation for recruiter-ready intros.",
    media: "/studentlink/Student/5-AI Generate Profile Summary.png",
    type: "image"
  },
  {
    title: "Mock Interview Setup",
    description: "Select avatar, tone, and role-specific scenario packs before starting the session.",
    media: "/studentlink/Student/6-Mock Interview Creation.png",
    type: "image"
  },
  {
    title: "Live Mock Interview",
    description: "Speech-to-text, avatar, and timer view during practice.",
    media: "/studentlink/Student/7-Mock Interview Session.png",
    type: "image"
  },
  {
    title: "Post-Session Analytics",
    description: "Strengths, improvement areas, and sentiment timeline after every interview.",
    media: "/studentlink/Student/8-Mock Interview Analysis and Feedback.png",
    type: "image"
  }
];

const RECRUITER_SCREENSHOTS = [
  {
    title: "Recruiter Dashboard",
    description: "Snapshot of campaigns, new applicants, and interview pipeline health.",
    media: "/studentlink/Recruiter/1-Recruiter Dashboard.png",
    type: "image"
  },
  {
    title: "Job Management",
    description: "Create, feature, or pause roles with AI-suggested requirements.",
    media: "/studentlink/Recruiter/2-Recruiter Jobs.png",
    type: "image"
  },
  {
    title: "Application Review",
    description: "Tabular view with Spotlight summaries, interview scores, and quick actions.",
    media: "/studentlink/Recruiter/3-Job Applications.png",
    type: "image"
  },
  {
    title: "Mock Interview Template",
    description: "Define competency packs and evaluation rubrics shared with StudentLink.",
    media: "/studentlink/Recruiter/4-Mock Interview Template Creation.png",
    type: "image"
  }
];

const ADMIN_SCREENSHOTS = [
  {
    title: "Admin Control Center",
    description: "High-level metrics, seats, and tenant configuration for StudentLink.",
    media: "/studentlink/Admin/1-Admin Dashboard.png",
    type: "image"
  },
  {
    title: "Job Catalog Governance",
    description: "Approve, feature, or retire jobs surfaced to students.",
    media: "/studentlink/Admin/2-Admin Jobs.png",
    type: "image"
  }
];

// Feature groups from the showcase
const FEATURE_GROUPS = [
  {
    title: "AI Interview Studio",
    subtitle: "Mock interviews, avatars, analytics",
    icon: <Mic size={24} style={{color:'var(--apple-blue)'}} />,
    color: "blue",
    bullets: [
      "Speech + avatar pipeline sourced via MockInterviewApi",
      "Adaptive question packs tuned per industry focus",
      "Post-session analytics pipe data into StatsPanel + recruiter dashboards",
      "Support for manual override when bandwidth is low"
    ]
  },
  {
    title: "Career Intelligence",
    subtitle: "Profiles, Spotlight, recommendations",
    icon: <Brain size={24} style={{color:'var(--apple-purple)'}} />,
    color: "purple",
    bullets: [
      "AI Spotlight synthesizes value prop for every student",
      "Semantic job matching merges embeddings and ML.NET signals",
      "Progress tracker highlights interview readiness and recruiter conversations",
      "CV Studio enforces scoring parity across React and MAUI"
    ]
  },
  {
    title: "Recruiter Operations",
    subtitle: "Job lifecycle, pipeline, insights",
    icon: <Briefcase size={24} style={{color:'var(--apple-green)'}} />,
    color: "green",
    bullets: [
      "Role creation + featuring with automated expiry",
      "Pipeline board with statuses from invite to hire",
      "Feedback capture flows back into student dashboards",
      "Workbooks powered by Application Insights for SLAs"
    ]
  }
];

// Personas
const PERSONAS = [
  {
    title: "Nandi (Student)",
    subtitle: "Final-year computer science student",
    icon: <GraduationCap size={24} style={{color:'var(--apple-blue)'}} />,
    color: "blue",
    bullets: [
      "Wants realistic practice without leaving campus",
      "Needs clear action items after each mock interview",
      "Looks for recruiters who understand visa sponsorship",
      "Prefers mobile MAUI app for notifications"
    ]
  },
  {
    title: "Sipho (Recruiter)",
    subtitle: "Talent partner for a pan-African bank",
    icon: <Building2 size={24} style={{color:'var(--apple-green)'}} />,
    color: "green",
    bullets: [
      "Runs multiple graduate campaigns concurrently",
      "Needs lightning-fast signal on cultural fit",
      "Shares feedback packs with hiring managers",
      "Measures success on time-to-offer and diversity mix"
    ]
  },
  {
    title: "Amina (Career Center)",
    subtitle: "University employability lead",
    icon: <Users size={24} style={{color:'var(--apple-purple)'}} />,
    color: "purple",
    bullets: [
      "Requires aggregated student usage reports",
      "Manages scenario packs for different faculties",
      "Triages support tickets and funnels to StudentLink",
      "Advocates for new funding based on outcome data"
    ]
  }
];

const StudentLink = () => {
  const [studentTab, setStudentTab] = useState('web');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="project-detail-page">
      <SEO 
        title="StudentLink - AI Career Platform | Tredir Sewpaul" 
        description="Comprehensive AI-powered career readiness platform with CV analysis, mock interviews, and job recommendations" 
        path="/projects/studentlink" 
      />
      <AnimatedBackground variant="particles" />
      
      <motion.div 
        className="project-detail-container" 
        initial="hidden" 
        animate="visible" 
        variants={containerVariants}
      >
        <Link to="/projects" className="back-link" style={{display:'inline-flex',alignItems:'center',gap:'8px',color:'var(--apple-blue)',marginBottom:'var(--spacing-xl)',textDecoration:'none'}}>
          <ArrowLeft size={20} />Back to Projects
        </Link>

        <motion.div className="project-header" variants={itemVariants}>
          <span className="status-badge ongoing"><Lock size={16} />Ongoing Development</span>
          <h1 className="project-title">StudentLink</h1>
          <p className="project-subtitle">
            AI-powered career readiness platform connecting students with opportunities through intelligent CV analysis, 
            mock interviews with AI avatars, and personalized job recommendations
          </p>
          <div className="project-badges" style={{marginTop:'var(--spacing-sm)'}}>
            <span className="status-badge" style={{background:'var(--bg-accent-light)'}}>
              <Calendar size={16} style={{display:'inline',marginRight:4}} />
              Apr 2025 - Present
            </span>
          </div>
          
          <div style={{marginTop:'var(--spacing-lg)',display:'flex',gap:'var(--spacing-sm)',flexWrap:'wrap',justifyContent:'center'}}>
            <TechIconChip technology=".NET 9" />
            <TechIconChip technology="React" />
            <TechIconChip technology=".NET MAUI" />
            <TechIconChip technology="Azure OpenAI" />
            <TechIconChip technology="Azure Speech" />
            <TechIconChip technology="ML.NET" />
            <TechIconChip technology="SQL Server" />
            <TechIconChip technology="SignalR" />
          </div>

          <div className="project-links" style={{marginTop:'var(--spacing-lg)'}}>
            <a 
              href="https://student-link-showcase.vercel.app/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="project-link-btn"
            >
              <ExternalLink size={20} />
              View Showcase Website
            </a>
          </div>
        </motion.div>

        <div className="project-content">
          {/* Overview */}
          <motion.div className="content-section" variants={itemVariants}>
            <h2 className="section-title"><Briefcase size={24} />Overview</h2>
            <div className="section-content">
              <p>
                StudentLink is a comprehensive multi-platform career readiness solution consisting of three interconnected 
                applications: ASP.NET Core Web API (.NET 9), React web frontend, and .NET MAUI mobile app. The platform 
                provides AI-powered CV analysis using Azure OpenAI GPT-4o-mini, realistic mock interviews with AI avatars 
                and speech recognition, personalized job recommendations with ML-driven matching, and streamlined application 
                workflows for students, recruiters, and career centers.
              </p>
            </div>
          </motion.div>

          {/* Feature Catalog */}
          <motion.div className="content-section" variants={itemVariants}>
            <h2 className="section-title"><Layers size={24} />Feature Catalog</h2>
            <p style={{color:'var(--apple-gray)',marginBottom:'var(--spacing-lg)'}}>
              Every capability in the StudentLink platform, grouped into interview, intelligence, and recruiter pillars.
            </p>
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))',gap:'var(--spacing-lg)'}}>
              {FEATURE_GROUPS.map((feature) => (
                <div 
                  key={feature.title}
                  style={{
                    background:`linear-gradient(135deg, rgba(var(--apple-${feature.color}-rgb, 10,132,255),0.08), rgba(var(--apple-${feature.color}-rgb, 10,132,255),0.02))`,
                    padding:'var(--spacing-xl)',
                    borderRadius:'var(--radius-lg)',
                    borderLeft:`4px solid var(--apple-${feature.color})`
                  }}
                >
                  <div style={{display:'flex',alignItems:'center',gap:'var(--spacing-sm)',marginBottom:'var(--spacing-sm)'}}>
                    {feature.icon}
                    <h3 style={{margin:0,color:`var(--apple-${feature.color})`}}>{feature.title}</h3>
                  </div>
                  <p style={{fontSize:'var(--font-size-sm)',color:'var(--apple-light-gray)',marginBottom:'var(--spacing-md)'}}>{feature.subtitle}</p>
                  <ul style={{margin:0,paddingLeft:'var(--spacing-lg)',fontSize:'var(--font-size-sm)',color:'var(--apple-light-gray)'}}>
                    {feature.bullets.map((bullet, idx) => (
                      <li key={idx} style={{marginBottom:'var(--spacing-xs)'}}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Student Journey Gallery */}
          <motion.div className="content-section" variants={itemVariants}>
            <h2 className="section-title"><GraduationCap size={24} />Student Journey Gallery</h2>
            <div style={{
              background:'linear-gradient(135deg, rgba(10,132,255,0.06), rgba(10,132,255,0.02))',
              padding:'var(--spacing-xl)',
              borderRadius:'var(--radius-xl)',
              border:'1px solid rgba(10,132,255,0.1)'
            }}>
              <p style={{fontSize:'var(--font-size-lg)',fontWeight:'600',color:'var(--apple-dark-gray)',marginBottom:'var(--spacing-lg)'}}>
                Navigate from onboarding through AI-powered mock interviews to job offers.
              </p>
              
              {/* Tabs */}
              <div style={{display:'flex',gap:'var(--spacing-sm)',marginBottom:'var(--spacing-xl)',borderBottom:'1px solid var(--apple-gray-light)',paddingBottom:'var(--spacing-sm)'}}>
                <button
                  onClick={() => setStudentTab('web')}
                  style={{
                    padding:'var(--spacing-sm) var(--spacing-lg)',
                    borderRadius:'var(--radius-md)',
                    border:'none',
                    cursor:'pointer',
                    fontWeight:'600',
                    fontSize:'var(--font-size-sm)',
                    background: studentTab === 'web' ? 'var(--apple-blue)' : 'transparent',
                    color: studentTab === 'web' ? 'white' : 'var(--apple-blue)'
                  }}
                >
                  <Monitor size={16} style={{display:'inline',marginRight:'6px',verticalAlign:'middle'}} />
                  Web
                </button>
                <button
                  onClick={() => setStudentTab('mobile')}
                  style={{
                    padding:'var(--spacing-sm) var(--spacing-lg)',
                    borderRadius:'var(--radius-md)',
                    border:'none',
                    cursor:'pointer',
                    fontWeight:'600',
                    fontSize:'var(--font-size-sm)',
                    background: studentTab === 'mobile' ? 'var(--apple-blue)' : 'transparent',
                    color: studentTab === 'mobile' ? 'white' : 'var(--apple-blue)'
                  }}
                >
                  <Smartphone size={16} style={{display:'inline',marginRight:'6px',verticalAlign:'middle'}} />
                  Mobile (MAUI)
                </button>
              </div>

              {/* Gallery Content */}
              <div style={{display:'grid',gap:'var(--spacing-xl)'}}>
                {studentTab === 'web' ? (
                  STUDENT_WEB_SCREENSHOTS.map((item, idx) => (
                    <figure 
                      key={idx}
                      style={{
                        background:'white',
                        borderRadius:'var(--radius-lg)',
                        padding:'var(--spacing-lg)',
                        margin:0,
                        boxShadow:'var(--shadow-md)',
                        border:'1px solid var(--apple-gray-light)'
                      }}
                    >
                      {item.type === 'video' ? (
                        <video
                          src={item.media}
                          controls
                          playsInline
                          muted
                          style={{
                            width:'100%',
                            aspectRatio:'16/9',
                            borderRadius:'var(--radius-md)',
                            border:'1px solid var(--apple-gray-light)',
                            objectFit:'cover',
                            background:'#000'
                          }}
                        />
                      ) : (
                        <img
                          src={item.media}
                          alt={item.title}
                          style={{
                            width:'100%',
                            aspectRatio:'16/9',
                            borderRadius:'var(--radius-md)',
                            border:'1px solid var(--apple-gray-light)',
                            objectFit:'cover'
                          }}
                        />
                      )}
                      <figcaption style={{marginTop:'var(--spacing-md)'}}>
                        <p style={{margin:0,fontWeight:'600',color:'var(--apple-black)'}}>{item.title}</p>
                        <p style={{margin:'var(--spacing-xs) 0 0 0',fontSize:'var(--font-size-sm)',color:'var(--apple-dark-gray)'}}>{item.description}</p>
                      </figcaption>
                    </figure>
                  ))
                ) : (
                  <div style={{
                    aspectRatio:'16/9',
                    display:'flex',
                    alignItems:'center',
                    justifyContent:'center',
                    background:'var(--bg-glass-light)',
                    borderRadius:'var(--radius-lg)',
                    border:'2px dashed var(--apple-gray-light)'
                  }}>
                    <div style={{textAlign:'center',color:'var(--apple-gray-dark)'}}>
                      <Smartphone size={48} style={{marginBottom:'var(--spacing-md)',opacity:0.5}} />
                      <p style={{margin:0,fontSize:'var(--font-size-lg)',fontWeight:'600'}}>Mobile Screens Coming Soon</p>
                      <p style={{margin:'var(--spacing-xs) 0 0 0',fontSize:'var(--font-size-sm)'}}>MAUI mobile UI screenshots will appear here.</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Recruiter Journey Gallery */}
          <motion.div className="content-section" variants={itemVariants}>
            <h2 className="section-title"><Building2 size={24} />Recruiter Journey Gallery</h2>
            <div style={{
              background:'linear-gradient(135deg, rgba(52,199,89,0.06), rgba(52,199,89,0.02))',
              padding:'var(--spacing-xl)',
              borderRadius:'var(--radius-xl)',
              border:'1px solid rgba(52,199,89,0.1)'
            }}>
              <p style={{fontSize:'var(--font-size-lg)',fontWeight:'600',color:'var(--apple-dark-gray)',marginBottom:'var(--spacing-lg)'}}>
                Use Spotlight profiles, manage applications, and configure mock interview templates.
              </p>
              
              <div style={{display:'grid',gap:'var(--spacing-xl)'}}>
                {RECRUITER_SCREENSHOTS.map((item, idx) => (
                  <figure 
                    key={idx}
                    style={{
                      background:'white',
                      borderRadius:'var(--radius-lg)',
                      padding:'var(--spacing-lg)',
                      margin:0,
                      boxShadow:'var(--shadow-md)',
                      border:'1px solid var(--apple-gray-light)'
                    }}
                  >
                    <img
                      src={item.media}
                      alt={item.title}
                      style={{
                        width:'100%',
                        aspectRatio:'16/9',
                        borderRadius:'var(--radius-md)',
                        border:'1px solid var(--apple-gray-light)',
                        objectFit:'cover'
                      }}
                    />
                    <figcaption style={{marginTop:'var(--spacing-md)'}}>
                      <p style={{margin:0,fontWeight:'600',color:'var(--apple-black)'}}>{item.title}</p>
                      <p style={{margin:'var(--spacing-xs) 0 0 0',fontSize:'var(--font-size-sm)',color:'var(--apple-dark-gray)'}}>{item.description}</p>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Admin Journey Gallery */}
          <motion.div className="content-section" variants={itemVariants}>
            <h2 className="section-title"><Shield size={24} />Admin / Career Center Gallery</h2>
            <div style={{
              background:'linear-gradient(135deg, rgba(255,159,10,0.06), rgba(255,159,10,0.02))',
              padding:'var(--spacing-xl)',
              borderRadius:'var(--radius-xl)',
              border:'1px solid rgba(255,159,10,0.1)'
            }}>
              <p style={{fontSize:'var(--font-size-lg)',fontWeight:'600',color:'var(--apple-dark-gray)',marginBottom:'var(--spacing-lg)'}}>
                Monitor platform health and curate jobs across faculties.
              </p>
              
              <div style={{display:'grid',gap:'var(--spacing-xl)'}}>
                {ADMIN_SCREENSHOTS.map((item, idx) => (
                  <figure 
                    key={idx}
                    style={{
                      background:'white',
                      borderRadius:'var(--radius-lg)',
                      padding:'var(--spacing-lg)',
                      margin:0,
                      boxShadow:'var(--shadow-md)',
                      border:'1px solid var(--apple-gray-light)'
                    }}
                  >
                    <img
                      src={item.media}
                      alt={item.title}
                      style={{
                        width:'100%',
                        aspectRatio:'16/9',
                        borderRadius:'var(--radius-md)',
                        border:'1px solid var(--apple-gray-light)',
                        objectFit:'cover'
                      }}
                    />
                    <figcaption style={{marginTop:'var(--spacing-md)'}}>
                      <p style={{margin:0,fontWeight:'600',color:'var(--apple-black)'}}>{item.title}</p>
                      <p style={{margin:'var(--spacing-xs) 0 0 0',fontSize:'var(--font-size-sm)',color:'var(--apple-dark-gray)'}}>{item.description}</p>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </motion.div>

          {/* System Architecture */}
          <motion.div className="content-section" variants={itemVariants}>
            <h2 className="section-title"><GitBranch size={24} />System Architecture</h2>
            <div className="architecture-section">
              <ArchitectureDiagram
                columns={[
                  {
                    title: 'Client Applications',
                    items: [
                      {
                        title: 'React Frontend',
                        subtitle: 'Student, Recruiter & Admin portals',
                        icon: <Monitor className="w-6 h-6" style={{color: 'var(--apple-blue)'}} />
                      },
                      {
                        title: '.NET MAUI App',
                        subtitle: 'iOS, Android, Windows',
                        icon: <Smartphone className="w-6 h-6" style={{color: 'var(--apple-green)'}} />
                      }
                    ]
                  },
                  {
                    title: 'Backend (.NET 9)',
                    items: [
                      {
                        title: 'CV Controller',
                        subtitle: 'AI-powered CV analysis',
                        icon: <FileText className="w-6 h-6" style={{color: 'var(--apple-blue)'}} />
                      },
                      {
                        title: 'Mock Interview API',
                        subtitle: 'Speech + Avatar pipeline',
                        icon: <Mic className="w-6 h-6" style={{color: 'var(--apple-purple)'}} />
                      },
                      {
                        title: 'Recommendations',
                        subtitle: 'ML-driven job matching',
                        icon: <Target className="w-6 h-6" style={{color: 'var(--apple-indigo)'}} />
                      },
                      {
                        title: 'Auth Controller',
                        subtitle: 'JWT authentication & RBAC',
                        icon: <Shield className="w-6 h-6" style={{color: 'var(--apple-orange)'}} />
                      }
                    ]
                  },
                  {
                    title: 'Azure Services',
                    items: [
                      {
                        title: 'Azure OpenAI',
                        subtitle: 'GPT-4o-mini & embeddings',
                        icon: <Brain className="w-6 h-6" style={{color: 'var(--apple-blue)'}} />
                      },
                      {
                        title: 'Azure Speech',
                        subtitle: 'STT/TTS for interviews',
                        icon: <Mic className="w-6 h-6" style={{color: 'var(--apple-green)'}} />
                      },
                      {
                        title: 'SQL Database',
                        subtitle: 'User data & job listings',
                        icon: <Database className="w-6 h-6" style={{color: 'var(--apple-indigo)'}} />
                      },
                      {
                        title: 'Application Insights',
                        subtitle: 'Analytics & SLA workbooks',
                        icon: <BarChart3 className="w-6 h-6" style={{color: 'var(--apple-purple)'}} />
                      }
                    ]
                  }
                ]}
                features={[
                  {
                    title: 'AI Interview Studio',
                    subtitle: 'Realistic mock interviews with avatars and speech recognition',
                    icon: <Video className="w-6 h-6" style={{color: 'var(--apple-blue)'}} />
                  },
                  {
                    title: 'Career Intelligence',
                    subtitle: 'AI Spotlight profiles and semantic job matching',
                    icon: <Brain className="w-6 h-6" style={{color: 'var(--apple-indigo)'}} />
                  },
                  {
                    title: 'Role-Based Access Control',
                    subtitle: 'Secure JWT auth for students, recruiters, and admins',
                    icon: <Shield className="w-6 h-6" style={{color: 'var(--apple-purple)'}} />
                  }
                ]}
              />
            </div>
          </motion.div>

          {/* Application Structure */}
          <motion.div className="content-section" variants={itemVariants}>
            <h2 className="section-title"><Layers size={24} />Application Structure</h2>
            <div style={{background:'var(--bg-accent-light)',padding:'var(--spacing-xl)',borderRadius:'var(--radius-lg)',overflowX:'auto'}}>
              <table style={{width:'100%',borderCollapse:'collapse'}}>
                <thead>
                  <tr style={{borderBottom:'2px solid var(--apple-gray-light)'}}>
                    <th style={{padding:'var(--spacing-md)',textAlign:'left',color:'var(--apple-blue)'}}>Application</th>
                    <th style={{padding:'var(--spacing-md)',textAlign:'left',color:'var(--apple-blue)'}}>Technology</th>
                    <th style={{padding:'var(--spacing-md)',textAlign:'left',color:'var(--apple-blue)'}}>Purpose</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{borderBottom:'1px solid var(--apple-gray-light)'}}>
                    <td style={{padding:'var(--spacing-md)',fontWeight:'bold'}}>StudentLinkApi</td>
                    <td style={{padding:'var(--spacing-md)'}}>
                      <div style={{display:'flex',gap:'var(--spacing-xs)',flexWrap:'wrap'}}>
                        <TechIconChip technology=".NET 9" />
                        <TechIconChip technology="ML.NET" />
                      </div>
                    </td>
                    <td style={{padding:'var(--spacing-md)'}}>Backend API with business logic, ML recommendations, and Azure integrations</td>
                  </tr>
                  <tr style={{borderBottom:'1px solid var(--apple-gray-light)'}}>
                    <td style={{padding:'var(--spacing-md)',fontWeight:'bold'}}>StudentLinkFrontend</td>
                    <td style={{padding:'var(--spacing-md)'}}>
                      <div style={{display:'flex',gap:'var(--spacing-xs)',flexWrap:'wrap'}}>
                        <TechIconChip technology="React" />
                        <TechIconChip technology="Vite" />
                      </div>
                    </td>
                    <td style={{padding:'var(--spacing-md)'}}>Web application with Interview Studio, CV Studio, and job matching UI</td>
                  </tr>
                  <tr>
                    <td style={{padding:'var(--spacing-md)',fontWeight:'bold'}}>StudentLinkApp</td>
                    <td style={{padding:'var(--spacing-md)'}}>
                      <div style={{display:'flex',gap:'var(--spacing-xs)',flexWrap:'wrap'}}>
                        <TechIconChip technology=".NET MAUI" />
                      </div>
                    </td>
                    <td style={{padding:'var(--spacing-md)'}}>Cross-platform mobile app with push notifications and offline support</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Azure Infrastructure */}
          <motion.div className="content-section" variants={itemVariants}>
            <h2 className="section-title"><Cloud size={24} />Azure Infrastructure</h2>
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(250px,1fr))',gap:'var(--spacing-md)'}}>
              <div style={{background:'var(--bg-accent-light)',padding:'var(--spacing-lg)',borderRadius:'var(--radius-md)',borderLeft:'4px solid var(--apple-blue)'}}>
                <div style={{display:'flex',alignItems:'center',gap:'var(--spacing-sm)',marginBottom:'var(--spacing-sm)'}}>
                  <Brain size={20} style={{color:'var(--apple-blue)'}} />
                  <strong style={{color:'var(--apple-blue)'}}>Azure OpenAI</strong>
                </div>
                <p style={{margin:'0 0 var(--spacing-sm) 0',fontSize:'var(--font-size-sm)',color:'var(--apple-gray-dark)'}}>GPT-4o-mini for CV feedback and text-embedding-ada-002 for semantic matching</p>
                <TechIconChip technology="Azure OpenAI" />
              </div>
              <div style={{background:'var(--bg-accent-light)',padding:'var(--spacing-lg)',borderRadius:'var(--radius-md)',borderLeft:'4px solid var(--apple-green)'}}>
                <div style={{display:'flex',alignItems:'center',gap:'var(--spacing-sm)',marginBottom:'var(--spacing-sm)'}}>
                  <Mic size={20} style={{color:'var(--apple-green)'}} />
                  <strong style={{color:'var(--apple-green)'}}>Azure Speech</strong>
                </div>
                <p style={{margin:'0 0 var(--spacing-sm) 0',fontSize:'var(--font-size-sm)',color:'var(--apple-gray-dark)'}}>Speech-to-text and text-to-speech for AI mock interviews with avatars</p>
                <TechIconChip technology="Azure Speech" />
              </div>
              <div style={{background:'var(--bg-accent-light)',padding:'var(--spacing-lg)',borderRadius:'var(--radius-md)',borderLeft:'4px solid var(--apple-purple)'}}>
                <div style={{display:'flex',alignItems:'center',gap:'var(--spacing-sm)',marginBottom:'var(--spacing-sm)'}}>
                  <Database size={20} style={{color:'var(--apple-purple)'}} />
                  <strong style={{color:'var(--apple-purple)'}}>SQL Database</strong>
                </div>
                <p style={{margin:'0 0 var(--spacing-sm) 0',fontSize:'var(--font-size-sm)',color:'var(--apple-gray-dark)'}}>Azure SQL with EF Core for users, CVs, jobs, interviews, and applications</p>
                <TechIconChip technology="SQL Server" />
              </div>
              <div style={{background:'var(--bg-accent-light)',padding:'var(--spacing-lg)',borderRadius:'var(--radius-md)',borderLeft:'4px solid var(--apple-orange)'}}>
                <div style={{display:'flex',alignItems:'center',gap:'var(--spacing-sm)',marginBottom:'var(--spacing-sm)'}}>
                  <BarChart3 size={20} style={{color:'var(--apple-orange)'}} />
                  <strong style={{color:'var(--apple-orange)'}}>Application Insights</strong>
                </div>
                <p style={{margin:'0 0 var(--spacing-sm) 0',fontSize:'var(--font-size-sm)',color:'var(--apple-gray-dark)'}}>Workbooks powered analytics for SLAs and recruiter dashboards</p>
                <TechIconChip technology="Azure" />
              </div>
            </div>
          </motion.div>

          {/* Technical Stack */}
          <motion.div className="content-section" variants={itemVariants}>
            <h2 className="section-title"><Sparkles size={24} />Technical Stack Summary</h2>
            <div style={{background:'var(--bg-accent-light)',padding:'var(--spacing-xl)',borderRadius:'var(--radius-lg)'}}>
              <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(250px,1fr))',gap:'var(--spacing-lg)'}}>
                <div>
                  <Server size={24} style={{color:'var(--apple-blue)',marginBottom:'var(--spacing-sm)'}} />
                  <h3 style={{margin:'var(--spacing-xs) 0',color:'var(--apple-blue)'}}>Backend</h3>
                  <div style={{display:'flex',flexWrap:'wrap',gap:'var(--spacing-xs)',marginTop:'var(--spacing-sm)'}}>
                    <TechIconChip technology=".NET 9" />
                    <TechIconChip technology="Entity Framework Core" />
                    <TechIconChip technology="ML.NET" />
                    <TechIconChip technology="SignalR" />
                  </div>
                </div>
                <div>
                  <Monitor size={24} style={{color:'var(--apple-green)',marginBottom:'var(--spacing-sm)'}} />
                  <h3 style={{margin:'var(--spacing-xs) 0',color:'var(--apple-green)'}}>Frontend</h3>
                  <div style={{display:'flex',flexWrap:'wrap',gap:'var(--spacing-xs)',marginTop:'var(--spacing-sm)'}}>
                    <TechIconChip technology="React" />
                    <TechIconChip technology="Vite" />
                    <TechIconChip technology="Tailwind CSS" />
                  </div>
                </div>
                <div>
                  <Smartphone size={24} style={{color:'var(--apple-purple)',marginBottom:'var(--spacing-sm)'}} />
                  <h3 style={{margin:'var(--spacing-xs) 0',color:'var(--apple-purple)'}}>Mobile</h3>
                  <div style={{display:'flex',flexWrap:'wrap',gap:'var(--spacing-xs)',marginTop:'var(--spacing-sm)'}}>
                    <TechIconChip technology=".NET MAUI" />
                  </div>
                </div>
                <div>
                  <Cloud size={24} style={{color:'var(--apple-orange)',marginBottom:'var(--spacing-sm)'}} />
                  <h3 style={{margin:'var(--spacing-xs) 0',color:'var(--apple-orange)'}}>AI & Cloud</h3>
                  <div style={{display:'flex',flexWrap:'wrap',gap:'var(--spacing-xs)',marginTop:'var(--spacing-sm)'}}>
                    <TechIconChip technology="Azure OpenAI" />
                    <TechIconChip technology="Azure Speech" />
                    <TechIconChip technology="Azure" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default StudentLink;
