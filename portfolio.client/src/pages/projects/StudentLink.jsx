import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import AnimatedBackground from '../../components/AnimatedBackground';
import AnimatedChart from '../../components/AnimatedChart';
import TechIconChip from '../../components/TechIconChip';
import ArchitectureDiagram from '../../components/ArchitectureDiagram';
import SEO from '../../components/SEO';
import { 
  ArrowLeft, Users, Lock, Briefcase, Calendar, BarChart3, TrendingUp, Zap, Target,
  Brain, FileText, Search, Shield, Cloud, Smartphone, Monitor, Server,
  Database, GitBranch, Layers, Sparkles, MessageSquare, Upload, FileCode,
  Cpu, ListChecks, Lightbulb, Activity, ArrowRight
} from 'lucide-react';
import './ProjectDetail.css';
import '../../components/ArchitectureDiagram.css';

const StudentLink = () => {
  return (
    <div className="project-detail-page">
      <SEO title="StudentLink - AI Career Platform | Tredir Sewpaul" description="Comprehensive AI-powered career readiness platform with CV analysis and job recommendations" path="/projects/studentlink" />
      <AnimatedBackground variant="particles" />
      
      <motion.div className="project-detail-container" initial={{opacity:0}} animate={{opacity:1}}>
        <Link to="/projects" className="back-link" style={{display:'inline-flex',alignItems:'center',gap:'8px',color:'var(--apple-blue)',marginBottom:'var(--spacing-xl)',textDecoration:'none'}}>
          <ArrowLeft size={20} />Back to Projects
        </Link>

        <div className="project-header">
          <span className="status-badge ongoing"><Lock size={16} />Ongoing Development</span>
          <h1 className="project-title">StudentLink</h1>
          <p className="project-subtitle">AI-powered career readiness platform connecting students with opportunities through intelligent CV analysis and personalized job recommendations</p>
          <div className="project-badges" style={{marginTop:'var(--spacing-sm)'}}>
            <span className="status-badge" style={{background:'var(--bg-accent-light)'}}>
              <Calendar size={16} style={{display:'inline',marginRight:4}} />
              Apr 2025 - Present
            </span>
          </div>
          
          <div style={{marginTop:'var(--spacing-lg)',display:'flex',gap:'var(--spacing-sm)',flexWrap:'wrap'}}>
            <TechIconChip technology=".NET 9" />
            <TechIconChip technology="React" />
            <TechIconChip technology=".NET MAUI" />
            <TechIconChip technology="Azure OpenAI" />
            <TechIconChip technology="Azure Document Intelligence" />
            <TechIconChip technology="SQL Server" />
            <TechIconChip technology="Entity Framework Core" />
            <TechIconChip technology="JWT" />
          </div>
        </div>

        <div className="project-content">
          <div className="content-section">
            <h2 className="section-title"><Briefcase size={24} />Overview</h2>
            <div className="section-content">
              <p>StudentLink is a comprehensive multi-platform career readiness solution consisting of three interconnected applications: ASP.NET Core Web API (.NET 9), React web frontend, and .NET MAUI mobile app. The platform provides AI-powered CV analysis using Azure OpenAI GPT-4o-mini, personalized job recommendations with ML-driven matching, and streamlined application workflows for students, recruiters, and administrators.</p>
            </div>
          </div>

          <div className="content-section">
            <h2 className="section-title"><GitBranch size={24} />System Architecture</h2>
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
                      title: 'Jobs Controller',
                      subtitle: 'Job posting & management',
                      icon: <Briefcase className="w-6 h-6" style={{color: 'var(--apple-indigo)'}} />
                    },
                    {
                      title: 'Recommendations',
                      subtitle: 'ML-driven job matching',
                      icon: <Target className="w-6 h-6" style={{color: 'var(--apple-purple)'}} />
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
                      subtitle: 'GPT-4o-mini for CV feedback',
                      icon: <Brain className="w-6 h-6" style={{color: 'var(--apple-blue)'}} />
                    },
                    {
                      title: 'Document Intelligence',
                      subtitle: 'PDF text extraction',
                      icon: <FileText className="w-6 h-6" style={{color: 'var(--apple-green)'}} />
                    },
                    {
                      title: 'SQL Database',
                      subtitle: 'User data & job listings',
                      icon: <Database className="w-6 h-6" style={{color: 'var(--apple-indigo)'}} />
                    },
                    {
                      title: 'Blob Storage',
                      subtitle: 'CV file storage',
                      icon: <Cloud className="w-6 h-6" style={{color: 'var(--apple-purple)'}} />
                    }
                  ]
                }
              ]}
              features={[
                {
                  title: 'AI-Powered CV Analysis',
                  subtitle: 'GPT-4o-mini provides instant feedback with +28% avg improvement',
                  icon: <Brain className="w-6 h-6" style={{color: 'var(--apple-blue)'}} />
                },
                {
                  title: 'Smart Job Matching',
                  subtitle: 'ML recommendation engine with 40+ features and semantic search',
                  icon: <Target className="w-6 h-6" style={{color: 'var(--apple-indigo)'}} />
                },
                {
                  title: 'Role-Based Access Control',
                  subtitle: 'Secure JWT authentication for students, recruiters, and admins',
                  icon: <Shield className="w-6 h-6" style={{color: 'var(--apple-purple)'}} />
                }
              ]}
            />
          </div>

          <div className="content-section">
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
                        <TechIconChip technology="Entity Framework Core" />
                      </div>
                    </td>
                    <td style={{padding:'var(--spacing-md)'}}>Backend API with business logic, database access, and Azure integrations</td>
                  </tr>
                  <tr style={{borderBottom:'1px solid var(--apple-gray-light)'}}>
                    <td style={{padding:'var(--spacing-md)',fontWeight:'bold'}}>StudentLinkFrontend</td>
                    <td style={{padding:'var(--spacing-md)'}}>
                      <div style={{display:'flex',gap:'var(--spacing-xs)',flexWrap:'wrap'}}>
                        <TechIconChip technology="React" />
                        <TechIconChip technology="Vite" />
                      </div>
                    </td>
                    <td style={{padding:'var(--spacing-md)'}}>Web application for students, recruiters, and admins with responsive UI</td>
                  </tr>
                  <tr>
                    <td style={{padding:'var(--spacing-md)',fontWeight:'bold'}}>StudentLinkApp</td>
                    <td style={{padding:'var(--spacing-md)'}}>
                      <div style={{display:'flex',gap:'var(--spacing-xs)',flexWrap:'wrap'}}>
                        <TechIconChip technology=".NET MAUI" />
                      </div>
                    </td>
                    <td style={{padding:'var(--spacing-md)'}}>Cross-platform mobile app for iOS, Android, and Windows with MVVM architecture</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="content-section">
            <h2 className="section-title"><BarChart3 size={24} />Platform Metrics</h2>
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit, minmax(400px,1fr))',gap:'var(--spacing-lg)',maxWidth:'1200px',margin:'0 auto'}}>
              <AnimatedChart
                title="CV Quality Score Distribution"
                data={[
                  {label:'0-20%',value:8},
                  {label:'21-40%',value:15},
                  {label:'41-60%',value:28},
                  {label:'61-80%',value:32},
                  {label:'81-100%',value:17}
                ]}
                type="bar"
                showValues
                height={240}
              />
              <AnimatedChart
                title="Job Match Score Ranges"
                data={[
                  {label:'Excellent (>0.8)',value:23},
                  {label:'Good (0.6-0.8)',value:34},
                  {label:'Fair (0.4-0.6)',value:28},
                  {label:'Poor (<0.4)',value:15}
                ]}
                type="donut"
                height={240}
              />
              <AnimatedChart
                title="User Engagement Over Time"
                data={[
                  {label:'Week 1',value:120},
                  {label:'Week 2',value:245},
                  {label:'Week 3',value:380},
                  {label:'Week 4',value:520},
                  {label:'Week 5',value:680},
                  {label:'Week 6',value:850}
                ]}
                type="line"
                height={240}
              />
              <AnimatedChart
                title="Application Status Distribution"
                data={[
                  {label:'Pending',value:42},
                  {label:'Reviewed',value:28},
                  {label:'Interviewed',value:18},
                  {label:'Accepted',value:12}
                ]}
                type="pie"
                height={240}
              />
            </div>
          </div>

          <div className="content-section">
            <h2 className="section-title"><Brain size={24} />AI-Powered CV Analysis</h2>
            <div style={{background:'linear-gradient(135deg, rgba(191,90,242,0.08), rgba(191,90,242,0.02))',padding:'var(--spacing-xl)',borderRadius:'var(--radius-lg)',borderLeft:'4px solid var(--apple-purple)'}}>
              <div style={{marginBottom:'var(--spacing-lg)'}}>
                <h3 style={{margin:'0 0 var(--spacing-md) 0',color:'var(--apple-purple)'}}>Analysis Pipeline</h3>
                <div style={{background:'var(--bg-glass-light)',border:'1px solid rgba(191,90,242,0.2)',borderRadius:'var(--radius-lg)',padding:'var(--spacing-lg)',overflowX:'auto'}}>
                  <div className="architecture-grid" style={{minWidth:'800px'}}>
                    <div className="architecture-column" style={{minWidth:'200px'}}>
                      <h3 className="architecture-column-title" style={{color:'var(--apple-purple)',fontSize:'var(--font-size-md)'}}>Input</h3>
                      <div className="architecture-items">
                        <div className="architecture-card">
                          <div className="architecture-card-content">
                            <div className="architecture-card-icon">
                              <Upload size={20} />
                            </div>
                            <div className="architecture-card-text">
                              <div className="architecture-card-title">Upload CV</div>
                              <div className="architecture-card-subtitle">PDF/DOCX upload</div>
                            </div>
                          </div>
                        </div>
                        <div className="architecture-card">
                          <div className="architecture-card-content">
                            <div className="architecture-card-icon">
                              <FileCode size={20} />
                            </div>
                            <div className="architecture-card-text">
                              <div className="architecture-card-title">Extract Text</div>
                              <div className="architecture-card-subtitle">Parse document content</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="architecture-arrow">
                      <ArrowRight className="arrow-icon" />
                    </div>
                    
                    <div className="architecture-column" style={{minWidth:'200px'}}>
                      <h3 className="architecture-column-title" style={{color:'var(--apple-purple)',fontSize:'var(--font-size-md)'}}>AI Processing</h3>
                      <div className="architecture-items">
                        <div className="architecture-card">
                          <div className="architecture-card-content">
                            <div className="architecture-card-icon">
                              <Cpu size={20} />
                            </div>
                            <div className="architecture-card-text">
                              <div className="architecture-card-title">Azure OpenAI</div>
                              <div className="architecture-card-subtitle">GPT-4o-mini analysis</div>
                            </div>
                          </div>
                        </div>
                        <div className="architecture-card">
                          <div className="architecture-card-content">
                            <div className="architecture-card-icon">
                              <ListChecks size={20} />
                            </div>
                            <div className="architecture-card-text">
                              <div className="architecture-card-title">Section Scores</div>
                              <div className="architecture-card-subtitle">Rate all CV sections</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="architecture-arrow">
                      <ArrowRight className="arrow-icon" />
                    </div>
                    
                    <div className="architecture-column" style={{minWidth:'200px'}}>
                      <h3 className="architecture-column-title" style={{color:'var(--apple-purple)',fontSize:'var(--font-size-md)'}}>Output</h3>
                      <div className="architecture-items">
                        <div className="architecture-card">
                          <div className="architecture-card-content">
                            <div className="architecture-card-icon">
                              <Lightbulb size={20} />
                            </div>
                            <div className="architecture-card-text">
                              <div className="architecture-card-title">Improvement Actions</div>
                              <div className="architecture-card-subtitle">Prioritized suggestions</div>
                            </div>
                          </div>
                        </div>
                        <div className="architecture-card">
                          <div className="architecture-card-content">
                            <div className="architecture-card-icon">
                              <Activity size={20} />
                            </div>
                            <div className="architecture-card-text">
                              <div className="architecture-card-title">Progress Tracking</div>
                              <div className="architecture-card-subtitle">Monitor improvements</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(250px,1fr))',gap:'var(--spacing-md)'}}>
                <div className="info-card">
                  <FileText size={24} style={{color:'var(--apple-purple)',marginBottom:'var(--spacing-sm)'}} />
                  <h4 style={{margin:'0 0 var(--spacing-xs) 0'}}>Section Analysis</h4>
                  <p style={{margin:0,fontSize:'var(--font-size-sm)',color:'var(--apple-gray)'}}>Contact info, summary, experience, education, skills - each scored 0-1</p>
                </div>
                <div className="info-card">
                  <Target size={24} style={{color:'var(--apple-blue)',marginBottom:'var(--spacing-sm)'}} />
                  <h4 style={{margin:'0 0 var(--spacing-xs) 0'}}>Action Items</h4>
                  <p style={{margin:0,fontSize:'var(--font-size-sm)',color:'var(--apple-gray)'}}>Prioritized improvements with before/after examples</p>
                </div>
                <div className="info-card">
                  <TrendingUp size={24} style={{color:'var(--apple-green)',marginBottom:'var(--spacing-sm)'}} />
                  <h4 style={{margin:'0 0 var(--spacing-xs) 0'}}>Progress Tracking</h4>
                  <p style={{margin:0,fontSize:'var(--font-size-sm)',color:'var(--apple-gray)'}}>Visual metrics showing improvement over time (+28% avg gain)</p>
                </div>
              </div>
            </div>
          </div>

          <div className="content-section">
            <h2 className="section-title"><Search size={24} />ML Recommendation Engine</h2>
            <div style={{background:'linear-gradient(135deg, rgba(52,199,89,0.08), rgba(52,199,89,0.02))',padding:'var(--spacing-xl)',borderRadius:'var(--radius-lg)',borderLeft:'4px solid var(--apple-green)'}}>
              <div style={{marginBottom:'var(--spacing-lg)'}}>
                <h3 style={{margin:'0 0 var(--spacing-sm) 0',color:'var(--apple-green)'}}>Feature Engineering (40+ Features)</h3>
                <div style={{background:'var(--bg-accent-light)',padding:'var(--spacing-xl)',borderRadius:'var(--radius-md)',overflowX:'auto'}}>
                  <table style={{width:'100%',borderCollapse:'collapse'}}>
                    <thead>
                      <tr style={{borderBottom:'2px solid var(--apple-gray-light)'}}>
                        <th style={{padding:'var(--spacing-sm)',textAlign:'left',color:'var(--apple-green)'}}>Category</th>
                        <th style={{padding:'var(--spacing-sm)',textAlign:'left',color:'var(--apple-green)'}}>Features</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr style={{borderBottom:'1px solid var(--apple-gray-light)'}}>
                        <td style={{padding:'var(--spacing-sm)',fontWeight:'bold'}}>Skills Match</td>
                        <td style={{padding:'var(--spacing-sm)'}}>Exact matches, Jaccard similarity, semantic similarity (embeddings)</td>
                      </tr>
                      <tr style={{borderBottom:'1px solid var(--apple-gray-light)'}}>
                        <td style={{padding:'var(--spacing-sm)',fontWeight:'bold'}}>Experience</td>
                        <td style={{padding:'var(--spacing-sm)'}}>Years gap, embedding similarity, seniority alignment</td>
                      </tr>
                      <tr style={{borderBottom:'1px solid var(--apple-gray-light)'}}>
                        <td style={{padding:'var(--spacing-sm)',fontWeight:'bold'}}>Education</td>
                        <td style={{padding:'var(--spacing-sm)'}}>Degree level match, field relevance</td>
                      </tr>
                      <tr style={{borderBottom:'1px solid var(--apple-gray-light)'}}>
                        <td style={{padding:'var(--spacing-sm)',fontWeight:'bold'}}>Location</td>
                        <td style={{padding:'var(--spacing-sm)'}}>Geographic match score, remote policy compatibility</td>
                      </tr>
                      <tr style={{borderBottom:'1px solid var(--apple-gray-light)'}}>
                        <td style={{padding:'var(--spacing-sm)',fontWeight:'bold'}}>Salary</td>
                        <td style={{padding:'var(--spacing-sm)'}}>Range compatibility, expectation alignment</td>
                      </tr>
                      <tr style={{borderBottom:'1px solid var(--apple-gray-light)'}}>
                        <td style={{padding:'var(--spacing-sm)',fontWeight:'bold'}}>Student Quality</td>
                        <td style={{padding:'var(--spacing-sm)'}}>CV score, profile completeness, skills count</td>
                      </tr>
                      <tr style={{borderBottom:'1px solid var(--apple-gray-light)'}}>
                        <td style={{padding:'var(--spacing-sm)',fontWeight:'bold'}}>Job Quality</td>
                        <td style={{padding:'var(--spacing-sm)'}}>Recency score, popularity metrics, application count</td>
                      </tr>
                      <tr>
                        <td style={{padding:'var(--spacing-sm)',fontWeight:'bold'}}>Interactions</td>
                        <td style={{padding:'var(--spacing-sm)'}}>Historical applications, interview rate, dismissals</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div style={{marginBottom:'var(--spacing-lg)'}}>
                <h3 style={{margin:'0 0 var(--spacing-sm) 0',color:'var(--apple-green)'}}>Scoring Formula</h3>
                <div className="code-block">
                  <div>score = 0.50 × skills_similarity</div>
                  <div style={{paddingLeft:'48px'}}>+ 0.15 × experience_similarity</div>
                  <div style={{paddingLeft:'48px'}}>+ 0.12 × recency_score</div>
                  <div style={{paddingLeft:'48px'}}>+ 0.12 × popularity_score</div>
                  <div style={{paddingLeft:'48px'}}>+ 0.04 × education_match</div>
                  <div style={{paddingLeft:'48px'}}>+ 0.04 × location_match</div>
                  <div style={{paddingLeft:'48px'}}>+ 0.02 × salary_compatibility</div>
                  <div style={{paddingLeft:'48px'}}>+ 0.01 × cv_quality_score</div>
                  <div style={{marginTop:'var(--spacing-sm)',color:'var(--apple-green)'}}>
                    <strong>Boosts:</strong> Fresh jobs (+5%), Popular (+5%), Exact skill match (+10-15%)
                  </div>
                  <div style={{color:'var(--apple-red)'}}>
                    <strong>Penalties:</strong> Under-qualified (-25%)
                  </div>
                </div>
              </div>
              <div>
                <h3 style={{margin:'0 0 var(--spacing-sm) 0',color:'var(--apple-green)'}}>MMR Diversification</h3>
                <p style={{margin:0,fontSize:'var(--font-size-sm)',color:'var(--apple-gray)'}}>Maximal Marginal Relevance reduces near-duplicate recommendations by penalizing jobs similar to already-selected ones using embedding similarity.</p>
              </div>
            </div>
          </div>

          <div className="content-section">
            <h2 className="section-title"><Shield size={24} />Role-Based Access Control</h2>
            <div style={{background:'var(--bg-accent-light)',padding:'var(--spacing-xl)',borderRadius:'var(--radius-lg)',overflowX:'auto'}}>
              <table style={{width:'100%',borderCollapse:'collapse'}}>
                <thead>
                  <tr style={{borderBottom:'2px solid var(--apple-gray-light)'}}>
                    <th style={{padding:'var(--spacing-md)',textAlign:'left',color:'var(--apple-blue)'}}>Role</th>
                    <th style={{padding:'var(--spacing-md)',textAlign:'left',color:'var(--apple-blue)'}}>Permissions</th>
                    <th style={{padding:'var(--spacing-md)',textAlign:'left',color:'var(--apple-blue)'}}>Test Account</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{borderBottom:'1px solid var(--apple-gray-light)'}}>
                    <td style={{padding:'var(--spacing-md)',fontWeight:'bold',color:'var(--apple-blue)'}}>Student</td>
                    <td style={{padding:'var(--spacing-md)'}}>Upload CV, view feedback, browse jobs, apply, get recommendations, track applications</td>
                    <td style={{padding:'var(--spacing-md)',fontFamily:'monospace',fontSize:'var(--font-size-xs)'}}>student@test.com / Student123!</td>
                  </tr>
                  <tr style={{borderBottom:'1px solid var(--apple-gray-light)'}}>
                    <td style={{padding:'var(--spacing-md)',fontWeight:'bold',color:'var(--apple-purple)'}}>Recruiter</td>
                    <td style={{padding:'var(--spacing-md)'}}>Create/manage jobs, view applicants, access student CVs, update application status, platform analytics</td>
                    <td style={{padding:'var(--spacing-md)',fontFamily:'monospace',fontSize:'var(--font-size-xs)'}}>recruiter@test.com / Recruiter123!</td>
                  </tr>
                  <tr>
                    <td style={{padding:'var(--spacing-md)',fontWeight:'bold',color:'var(--apple-red)'}}>Admin</td>
                    <td style={{padding:'var(--spacing-md)'}}>All permissions plus user management, activate/deactivate users, role changes, system stats, import jobs</td>
                    <td style={{padding:'var(--spacing-md)',fontFamily:'monospace',fontSize:'var(--font-size-xs)'}}>admin@test.com / Admin123!</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="content-section">
            <h2 className="section-title"><Cloud size={24} />Azure Infrastructure</h2>
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(250px,1fr))',gap:'var(--spacing-md)'}}>
              <div style={{background:'var(--bg-accent-light)',padding:'var(--spacing-lg)',borderRadius:'var(--radius-md)',borderLeft:'4px solid var(--apple-blue)'}}>
                <div style={{display:'flex',alignItems:'center',gap:'var(--spacing-sm)',marginBottom:'var(--spacing-sm)'}}>
                  <Brain size={20} style={{color:'var(--apple-blue)'}} />
                  <strong style={{color:'var(--apple-blue)'}}>Azure OpenAI</strong>
                </div>
                <p style={{margin:'0 0 var(--spacing-sm) 0',fontSize:'var(--font-size-sm)',color:'var(--apple-gray)'}}>GPT-4o-mini for CV analysis feedback and text-embedding-ada-002 for semantic job matching</p>
                <TechIconChip technology="Azure OpenAI" />
              </div>
              <div style={{background:'var(--bg-accent-light)',padding:'var(--spacing-lg)',borderRadius:'var(--radius-md)',borderLeft:'4px solid var(--apple-green)'}}>
                <div style={{display:'flex',alignItems:'center',gap:'var(--spacing-sm)',marginBottom:'var(--spacing-sm)'}}>
                  <FileText size={20} style={{color:'var(--apple-green)'}} />
                  <strong style={{color:'var(--apple-green)'}}>Document Intelligence</strong>
                </div>
                <p style={{margin:'0 0 var(--spacing-sm) 0',fontSize:'var(--font-size-sm)',color:'var(--apple-gray)'}}>Optional OCR for PDF CV text extraction (falls back to plain text extraction)</p>
                <TechIconChip technology="Azure Document Intelligence" />
              </div>
              <div style={{background:'var(--bg-accent-light)',padding:'var(--spacing-lg)',borderRadius:'var(--radius-md)',borderLeft:'4px solid var(--apple-purple)'}}>
                <div style={{display:'flex',alignItems:'center',gap:'var(--spacing-sm)',marginBottom:'var(--spacing-sm)'}}>
                  <Database size={20} style={{color:'var(--apple-purple)'}} />
                  <strong style={{color:'var(--apple-purple)'}}>SQL Database</strong>
                </div>
                <p style={{margin:'0 0 var(--spacing-sm) 0',fontSize:'var(--font-size-sm)',color:'var(--apple-gray)'}}>Azure SQL or LocalDB for development, stores users, CVs, jobs, applications with EF Core migrations</p>
                <TechIconChip technology="SQL Server" />
              </div>
              <div style={{background:'var(--bg-accent-light)',padding:'var(--spacing-lg)',borderRadius:'var(--radius-md)',borderLeft:'4px solid var(--apple-orange)'}}>
                <div style={{display:'flex',alignItems:'center',gap:'var(--spacing-sm)',marginBottom:'var(--spacing-sm)'}}>
                  <Server size={20} style={{color:'var(--apple-orange)'}} />
                  <strong style={{color:'var(--apple-orange)'}}>Blob Storage</strong>
                </div>
                <p style={{margin:'0 0 var(--spacing-sm) 0',fontSize:'var(--font-size-sm)',color:'var(--apple-gray)'}}>Production CV file storage (local filesystem in development)</p>
                <TechIconChip technology="Azure" />
              </div>
              <div style={{background:'var(--bg-accent-light)',padding:'var(--spacing-lg)',borderRadius:'var(--radius-md)',borderLeft:'4px solid var(--apple-indigo)'}}>
                <div style={{display:'flex',alignItems:'center',gap:'var(--spacing-sm)',marginBottom:'var(--spacing-sm)'}}>
                  <Server size={20} style={{color:'var(--apple-indigo)'}} />
                  <strong style={{color:'var(--apple-indigo)'}}>App Service</strong>
                </div>
                <p style={{margin:'0 0 var(--spacing-sm) 0',fontSize:'var(--font-size-sm)',color:'var(--apple-gray)'}}>Hosts ASP.NET Core API with auto-scaling and deployment slots</p>
                <TechIconChip technology="Azure" />
              </div>
              <div style={{background:'var(--bg-accent-light)',padding:'var(--spacing-lg)',borderRadius:'var(--radius-md)',borderLeft:'4px solid var(--apple-teal)'}}>
                <div style={{display:'flex',alignItems:'center',gap:'var(--spacing-sm)',marginBottom:'var(--spacing-sm)'}}>
                  <Shield size={20} style={{color:'var(--apple-teal)'}} />
                  <strong style={{color:'var(--apple-teal)'}}>Key Vault</strong>
                </div>
                <p style={{margin:'0 0 var(--spacing-sm) 0',fontSize:'var(--font-size-sm)',color:'var(--apple-gray)'}}>Secure secret management for JWT keys and API credentials</p>
                <TechIconChip technology="Azure" />
              </div>
            </div>
          </div>

          <div className="content-section">
            <h2 className="section-title"><Smartphone size={24} />Cross-Platform Support</h2>
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))',gap:'var(--spacing-md)'}}>
              <div style={{background:'var(--bg-accent-light)',padding:'var(--spacing-lg)',borderRadius:'var(--radius-md)',textAlign:'center'}}>
                <Monitor size={32} style={{color:'var(--apple-blue)',margin:'0 auto var(--spacing-sm)'}} />
                <div style={{fontWeight:'bold',marginBottom:'var(--spacing-xs)'}}>Web Dashboard</div>
                <p style={{margin:0,fontSize:'var(--font-size-sm)',color:'var(--apple-gray)'}}>React 18 with Tailwind CSS</p>
                <p style={{margin:0,fontSize:'var(--font-size-sm)',color:'var(--apple-gray)'}}>Responsive design</p>
              </div>
              <div style={{background:'var(--bg-accent-light)',padding:'var(--spacing-lg)',borderRadius:'var(--radius-md)',textAlign:'center'}}>
                <Smartphone size={32} style={{color:'var(--apple-green)',margin:'0 auto var(--spacing-sm)'}} />
                <div style={{fontWeight:'bold',marginBottom:'var(--spacing-xs)'}}>Mobile App (iOS)</div>
                <p style={{margin:0,fontSize:'var(--font-size-sm)',color:'var(--apple-gray)'}}>.NET MAUI</p>
                <p style={{margin:0,fontSize:'var(--font-size-sm)',color:'var(--apple-gray)'}}>Native performance</p>
              </div>
              <div style={{background:'var(--bg-accent-light)',padding:'var(--spacing-lg)',borderRadius:'var(--radius-md)',textAlign:'center'}}>
                <Smartphone size={32} style={{color:'var(--apple-orange)',margin:'0 auto var(--spacing-sm)'}} />
                <div style={{fontWeight:'bold',marginBottom:'var(--spacing-xs)'}}>Mobile App (Android)</div>
                <p style={{margin:0,fontSize:'var(--font-size-sm)',color:'var(--apple-gray)'}}>.NET MAUI</p>
                <p style={{margin:0,fontSize:'var(--font-size-sm)',color:'var(--apple-gray)'}}>Single codebase</p>
              </div>
              <div style={{background:'var(--bg-accent-light)',padding:'var(--spacing-lg)',borderRadius:'var(--radius-md)',textAlign:'center'}}>
                <Monitor size={32} style={{color:'var(--apple-purple)',margin:'0 auto var(--spacing-sm)'}} />
                <div style={{fontWeight:'bold',marginBottom:'var(--spacing-xs)'}}>Desktop (Windows)</div>
                <p style={{margin:0,fontSize:'var(--font-size-sm)',color:'var(--apple-gray)'}}>.NET MAUI</p>
                <p style={{margin:0,fontSize:'var(--font-size-sm)',color:'var(--apple-gray)'}}>WinUI 3</p>
              </div>
            </div>
          </div>

          <div className="content-section">
            <h2 className="section-title"><Sparkles size={24} />Technical Stack Summary</h2>
            <div style={{background:'var(--bg-accent-light)',padding:'var(--spacing-xl)',borderRadius:'var(--radius-lg)'}}>
              <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(250px,1fr))',gap:'var(--spacing-lg)'}}>
                <div>
                  <Server size={24} style={{color:'var(--apple-blue)',marginBottom:'var(--spacing-sm)'}} />
                  <h3 style={{margin:'var(--spacing-xs) 0',color:'var(--apple-blue)'}}>Backend</h3>
                  <div style={{display:'flex',flexWrap:'wrap',gap:'var(--spacing-xs)',marginTop:'var(--spacing-sm)'}}>
                    <TechIconChip technology=".NET 9" />
                    <TechIconChip technology="Entity Framework Core" />
                    <TechIconChip technology="JWT" />
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
                    <TechIconChip technology="Azure Document Intelligence" />
                    <TechIconChip technology="Azure" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default StudentLink;
