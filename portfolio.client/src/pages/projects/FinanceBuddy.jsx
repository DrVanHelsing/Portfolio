import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import AnimatedBackground from '../../components/AnimatedBackground';
import AnimatedChart from '../../components/AnimatedChart';
import TechIconChip from '../../components/TechIconChip';
import ArchitectureDiagram from '../../components/ArchitectureDiagram';
import SEO from '../../components/SEO';
import { 
  ArrowLeft, Sparkles, Code2, Smartphone, Trophy,
  CheckCircle2, Target, Users, Zap, TrendingUp, Award,
  DollarSign, Leaf, MessageCircle, BarChart3, Calendar,
  PieChart, Activity, Star, Gift, Sprout, TreeDeciduous,
  Flower2, Circle, Server, Database, Brain, Globe, Cloud, Monitor
} from 'lucide-react';
import './ProjectDetail.css';

const FinanceBuddy = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  // Mock data for charts
  const expenseCategoriesData = [
    { label: 'Food', value: 35 },
    { label: 'Transport', value: 20 },
    { label: 'Entertainment', value: 15 },
    { label: 'Bills', value: 25 },
    { label: 'Other', value: 5 }
  ];

  const spendingTrendData = [
    { label: 'Week 1', value: 450 },
    { label: 'Week 2', value: 520 },
    { label: 'Week 3', value: 380 },
    { label: 'Week 4', value: 410 }
  ];

  const savingsProgressData = [
    { label: 'Saved', value: 65 },
    { label: 'Remaining', value: 35 }
  ];

  const financialWellnessData = [
    { label: 'Budgeting', value: 85 },
    { label: 'Saving', value: 72 },
    { label: 'Learning', value: 90 },
    { label: 'Consistency', value: 78 }
  ];

  return (
    <div className="project-detail-page">
      <SEO 
        title="FinanceBuddy - AI-Powered Financial Wellness | Tredir Sewpaul"
        description="AI-powered financial wellness app with gamification and personalized advice built with .NET MAUI and Azure OpenAI"
        keywords="financial app, .NET MAUI, Azure OpenAI, gamification, hackathon project"
        path="/projects/financebuddy"
      />
      <AnimatedBackground variant="particles" />
      
      <motion.div
        className="project-detail-container"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <Link to="/projects" className="back-link" style={{display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--apple-blue)', marginBottom: 'var(--spacing-xl)', textDecoration: 'none'}}>
          <ArrowLeft size={20} />
          Back to Projects
        </Link>

        <motion.div className="project-header" variants={itemVariants}>
          <div className="project-badge" style={{display:'flex',gap:'8px',flexWrap:'wrap'}}>
            <span className="status-badge" style={{background:'var(--bg-accent-light)',border:'1px solid var(--apple-blue)',color:'var(--apple-blue)'}}>
              <Trophy size={16} style={{display: 'inline', marginRight: '4px'}} />
              Hackathon 2025 · 3rd Place
            </span>
            <span className="status-badge" style={{background:'var(--bg-accent-light)'}}>
              <Calendar size={16} style={{display:'inline',marginRight:4}} />
              Sep 2025
            </span>
          </div>
          <h1 className="project-title">FinanceBuddy</h1>
          <p className="project-subtitle">
            Your AI companion for financial wellness with gamified plant growth that represents your money-smart journey
          </p>
          
          <div className="project-badges">
            <TechIconChip name=".NET MAUI 9" />
            <TechIconChip name="ASP.NET Core 8" />
            <TechIconChip name="Azure OpenAI GPT-4" />
            <TechIconChip name="Azure Speech" />
            <TechIconChip name="Azure Translator" />
            <TechIconChip name="Entity Framework Core" />
            <TechIconChip name="SQL Server" />
            <TechIconChip name="C#" />
          </div>

          <div className="project-links">
            <a 
              href="https://github.com/DrVanHelsing/SAIntervarsityHack2025-MoneyMentor"
              target="_blank"
              rel="noopener noreferrer"
              className="project-link-btn"
            >
              <Code2 size={20} />
              View on GitHub
            </a>
          </div>
        </motion.div>

        <div className="project-content">
          <motion.div className="content-section" variants={itemVariants}>
            <h2 className="section-title">
              <BarChart3 size={24} />
              Impact Metrics
            </h2>
            <div className="metrics-grid" style={{display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-lg)', marginBottom: 'var(--spacing-xl)', justifyContent: 'center'}}>
              <div className="metric-card" style={{background: 'var(--bg-accent-light)', padding: 'var(--spacing-lg)', borderRadius: 'var(--radius-lg)', textAlign: 'center', border: '2px solid var(--apple-blue)', flex: '1 1 200px', minWidth: '180px', maxWidth: '240px'}}>
                <Award size={32} style={{color: 'var(--apple-blue)', margin: '0 auto var(--spacing-sm)'}} />
                <div style={{fontSize: 'var(--font-size-3xl)', fontWeight: 'var(--font-weight-bold)', color: 'var(--apple-blue)'}}>3rd</div>
                <div style={{color: 'var(--apple-gray)', fontSize: 'var(--font-size-sm)'}}>SA Intervarsity (AI)</div>
              </div>
              <div className="metric-card" style={{background: 'var(--bg-accent-light)', padding: 'var(--spacing-lg)', borderRadius: 'var(--radius-lg)', textAlign: 'center', flex: '1 1 200px', minWidth: '180px', maxWidth: '240px'}}>
                <Smartphone size={32} style={{color: 'var(--apple-blue)', margin: '0 auto var(--spacing-sm)'}} />
                <div style={{fontSize: 'var(--font-size-3xl)', fontWeight: 'var(--font-weight-bold)', color: 'var(--apple-blue)'}}>4+</div>
                <div style={{color: 'var(--apple-gray)', fontSize: 'var(--font-size-sm)'}}>Platforms</div>
              </div>
              <div className="metric-card" style={{background: 'var(--bg-accent-light)', padding: 'var(--spacing-lg)', borderRadius: 'var(--radius-lg)', textAlign: 'center', flex: '1 1 200px', minWidth: '180px', maxWidth: '240px'}}>
                <Leaf size={32} style={{color: 'var(--apple-blue)', margin: '0 auto var(--spacing-sm)'}} />
                <div style={{fontSize: 'var(--font-size-3xl)', fontWeight: 'var(--font-weight-bold)', color: 'var(--apple-blue)'}}>6</div>
                <div style={{color: 'var(--apple-gray)', fontSize: 'var(--font-size-sm)'}}>Growth Stages</div>
              </div>
              <div className="metric-card" style={{background: 'var(--bg-accent-light)', padding: 'var(--spacing-lg)', borderRadius: 'var(--radius-lg)', textAlign: 'center', flex: '1 1 200px', minWidth: '180px', maxWidth: '240px'}}>
                <MessageCircle size={32} style={{color: 'var(--apple-blue)', margin: '0 auto var(--spacing-sm)'}} />
                <div style={{fontSize: 'var(--font-size-3xl)', fontWeight: 'var(--font-weight-bold)', color: 'var(--apple-blue)'}}>AI</div>
                <div style={{color: 'var(--apple-gray)', fontSize: 'var(--font-size-sm)'}}>GPT-4 Powered</div>
              </div>
            </div>
          </motion.div>

          <motion.div className="content-section" variants={itemVariants}>
            <h2 className="section-title">
              <Sparkles size={24} />
              Overview
            </h2>
            <div className="section-content">
              <p>
                FinanceBuddy transforms financial wellness into an engaging journey where your progress is represented by a growing plant. 
                Combining Azure OpenAI's GPT-4 intelligence with gamification psychology, it makes building healthy financial habits 
                natural and rewarding.
              </p>
            </div>
          </motion.div>

          <motion.div className="content-section" variants={itemVariants}>
            <h2 className="section-title">
              <TrendingUp size={24} />
              Plant Growth Journey
            </h2>
            <div style={{background: 'var(--bg-accent-light)', padding: 'var(--spacing-xl)', borderRadius: 'var(--radius-lg)', marginBottom: 'var(--spacing-lg)', overflowX: 'auto'}}>
              <div style={{display: 'flex', gap: 'var(--spacing-lg)', textAlign: 'center', minWidth: 'fit-content'}}>
                <div style={{flex: '1 1 140px', minWidth: '120px'}}>
                  <Circle size={48} style={{color:'var(--apple-gray)',margin:'0 auto var(--spacing-sm)'}} />
                  <div style={{fontWeight: 'var(--font-weight-semibold)', color: 'var(--apple-blue)'}}>Seed</div>
                  <div style={{fontSize: 'var(--font-size-sm)', color: 'var(--apple-gray)'}}>0-99 pts</div>
                </div>
                <div style={{flex: '1 1 140px', minWidth: '120px'}}>
                  <Sprout size={48} style={{color:'#34C759',margin:'0 auto var(--spacing-sm)'}} />
                  <div style={{fontWeight: 'var(--font-weight-semibold)', color: 'var(--apple-blue)'}}>Sprout</div>
                  <div style={{fontSize: 'var(--font-size-sm)', color: 'var(--apple-gray)'}}>100-299 pts</div>
                </div>
                <div style={{flex: '1 1 140px', minWidth: '120px'}}>
                  <Leaf size={48} style={{color:'#34C759',margin:'0 auto var(--spacing-sm)'}} />
                  <div style={{fontWeight: 'var(--font-weight-semibold)', color: 'var(--apple-blue)'}}>Seedling</div>
                  <div style={{fontSize: 'var(--font-size-sm)', color: 'var(--apple-gray)'}}>300-599 pts</div>
                </div>
                <div style={{flex: '1 1 140px', minWidth: '120px'}}>
                  <Sprout size={48} style={{color:'#30D158',margin:'0 auto var(--spacing-sm)'}} />
                  <div style={{fontWeight: 'var(--font-weight-semibold)', color: 'var(--apple-blue)'}}>Young Plant</div>
                  <div style={{fontSize: 'var(--font-size-sm)', color: 'var(--apple-gray)'}}>600-999 pts</div>
                </div>
                <div style={{flex: '1 1 140px', minWidth: '120px'}}>
                  <TreeDeciduous size={48} style={{color:'#30D158',margin:'0 auto var(--spacing-sm)'}} />
                  <div style={{fontWeight: 'var(--font-weight-semibold)', color: 'var(--apple-blue)'}}>Mature</div>
                  <div style={{fontSize: 'var(--font-size-sm)', color: 'var(--apple-gray)'}}>1000-1499 pts</div>
                </div>
                <div style={{flex: '1 1 140px', minWidth: '120px'}}>
                  <Flower2 size={48} style={{color:'#BF5AF2',margin:'0 auto var(--spacing-sm)'}} />
                  <div style={{fontWeight: 'var(--font-weight-semibold)', color: 'var(--apple-blue)'}}>Blooming</div>
                  <div style={{fontSize: 'var(--font-size-sm)', color: 'var(--apple-gray)'}}>1500+ pts</div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div className="content-section" variants={itemVariants}>
            <h2 className="section-title">
              <Code2 size={24} />
              System Architecture
            </h2>
            <ArchitectureDiagram
              columns={[
                {
                  title: 'Client Application',
                  items: [
                    {
                      title: '.NET MAUI App',
                      subtitle: 'iOS, Android, Windows, macOS',
                      icon: <Smartphone className="w-6 h-6" style={{color: 'var(--apple-blue)'}} />
                    },
                    {
                      title: 'Plant Status View',
                      subtitle: 'Gamification UI',
                      icon: <Leaf className="w-6 h-6" style={{color: 'var(--apple-green)'}} />
                    },
                    {
                      title: 'Voice Input',
                      subtitle: 'Azure Speech integration',
                      icon: <MessageCircle className="w-6 h-6" style={{color: 'var(--apple-purple)'}} />
                    }
                  ]
                },
                {
                  title: 'Backend (.NET 8)',
                  items: [
                    {
                      title: 'CV Controller',
                      subtitle: 'AI-powered financial advice',
                      icon: <Brain className="w-6 h-6" style={{color: 'var(--apple-blue)'}} />
                    },
                    {
                      title: 'Chat Controller',
                      subtitle: 'Conversational interface',
                      icon: <MessageCircle className="w-6 h-6" style={{color: 'var(--apple-indigo)'}} />
                    },
                    {
                      title: 'Expense Controller',
                      subtitle: 'Transaction management',
                      icon: <DollarSign className="w-6 h-6" style={{color: 'var(--apple-green)'}} />
                    },
                    {
                      title: 'SQL Database',
                      subtitle: 'Entity Framework Core',
                      icon: <Database className="w-6 h-6" style={{color: 'var(--apple-purple)'}} />
                    }
                  ]
                },
                {
                  title: 'Azure Services',
                  items: [
                    {
                      title: 'Azure OpenAI',
                      subtitle: 'GPT-4 financial guidance',
                      icon: <Brain className="w-6 h-6" style={{color: 'var(--apple-blue)'}} />
                    },
                    {
                      title: 'Speech Services',
                      subtitle: 'Voice input processing',
                      icon: <MessageCircle className="w-6 h-6" style={{color: 'var(--apple-green)'}} />
                    },
                    {
                      title: 'Translator',
                      subtitle: 'Multi-language support',
                      icon: <Globe className="w-6 h-6" style={{color: 'var(--apple-indigo)'}} />
                    },
                    {
                      title: 'SQL Database',
                      subtitle: 'Cloud data storage',
                      icon: <Cloud className="w-6 h-6" style={{color: 'var(--apple-purple)'}} />
                    }
                  ]
                }
              ]}
              features={[
                {
                  title: 'AI-Powered Financial Guidance',
                  subtitle: 'GPT-4 provides personalized money management advice',
                  icon: <Brain className="w-6 h-6" style={{color: 'var(--apple-blue)'}} />
                },
                {
                  title: 'Plant-Based Gamification',
                  subtitle: '6 growth stages reward good financial habits',
                  icon: <Leaf className="w-6 h-6" style={{color: 'var(--apple-green)'}} />
                },
                {
                  title: 'Voice & Multi-Language',
                  subtitle: 'Azure Speech Services with translation support',
                  icon: <Globe className="w-6 h-6" style={{color: 'var(--apple-purple)'}} />
                }
              ]}
            />
          </motion.div>

          <motion.div className="content-section" variants={itemVariants}>
            <h2 className="section-title">
              <BarChart3 size={24} />
              Smart Analytics & Insights
            </h2>
            <p className="section-content" style={{marginBottom:'var(--spacing-lg)'}}>
              FinanceBuddy provides comprehensive visual analytics to help you understand your spending patterns, track progress toward goals, and improve your overall financial wellness.
            </p>
            <div style={{display:'flex',gap:'var(--spacing-xl)',maxWidth:'1400px',margin:'0 auto',overflowX:'auto'}}>
              <div style={{background:'var(--bg-secondary)',borderRadius:'var(--radius-lg)',padding:'var(--spacing-xl)',flex:'1 1 350px',minWidth:'320px'}}>
                <h3 style={{fontSize:'var(--font-size-md)',fontWeight:600,marginBottom:'var(--spacing-md)',display:'flex',alignItems:'center',gap:'var(--spacing-sm)'}}>
                  <PieChart size={20} />
                  Expense Categories
                </h3>
                <AnimatedChart 
                  data={expenseCategoriesData} 
                  height={240}
                  type="donut"
                  gradient={['#007AFF', '#5856D6', '#AF52DE', '#FF9500', '#FF3B30']}
                  colorMap={{
                    'Food': '#007AFF',
                    'Transport': '#5856D6',
                    'Entertainment': '#AF52DE',
                    'Bills': '#FF9500',
                    'Other': '#FF3B30'
                  }}
                  showLabels={true}
                  showValues={true}
                />
              </div>

              <div style={{background:'var(--bg-secondary)',borderRadius:'var(--radius-lg)',padding:'var(--spacing-xl)',flex:'1 1 350px',minWidth:'320px'}}>
                <h3 style={{fontSize:'var(--font-size-md)',fontWeight:600,marginBottom:'var(--spacing-md)',display:'flex',alignItems:'center',gap:'var(--spacing-sm)'}}>
                  <TrendingUp size={20} />
                  Monthly Spending Trend
                </h3>
                <AnimatedChart 
                  data={spendingTrendData} 
                  height={240}
                  type="line"
                  gradient={['var(--apple-blue)', 'var(--apple-indigo)']}
                  showLabels={true}
                />
              </div>

              <div style={{background:'var(--bg-secondary)',borderRadius:'var(--radius-lg)',padding:'var(--spacing-xl)',flex:'1 1 350px',minWidth:'320px'}}>
                <h3 style={{fontSize:'var(--font-size-md)',fontWeight:600,marginBottom:'var(--spacing-md)',display:'flex',alignItems:'center',gap:'var(--spacing-sm)'}}>
                  <DollarSign size={20} />
                  Savings Progress
                </h3>
                <AnimatedChart 
                  data={savingsProgressData} 
                  height={240}
                  type="pie"
                  gradient={['#34C759', '#E5E5EA']}
                  colorMap={{
                    'Saved': '#34C759',
                    'Remaining': '#E5E5EA'
                  }}
                  showLabels={true}
                  showValues={true}
                />
              </div>

              <div style={{background:'var(--bg-secondary)',borderRadius:'var(--radius-lg)',padding:'var(--spacing-xl)'}}>
                <h3 style={{fontSize:'var(--font-size-md)',fontWeight:600,marginBottom:'var(--spacing-md)',display:'flex',alignItems:'center',gap:'var(--spacing-sm)'}}>
                  <Activity size={20} />
                  Financial Wellness Score
                </h3>
                <AnimatedChart 
                  data={financialWellnessData} 
                  height={240}
                  type="bar"
                  gradient={['var(--apple-green)', '#30D158']}
                  showLabels={true}
                  showValues={true}
                />
              </div>
            </div>
          </motion.div>

          <motion.div className="content-section" variants={itemVariants}>
            <h2 className="section-title">
              <Star size={24} />
              Comprehensive Point System
            </h2>
            <p className="section-content" style={{marginBottom:'var(--spacing-lg)'}}>
              Earn points for diverse financial wellness activities. Every positive action helps your plant grow from a tiny seed to a blooming tree!
            </p>
            <div style={{background:'var(--bg-secondary)',borderRadius:'var(--radius-lg)',overflow:'hidden'}}>
              <table style={{width:'100%',borderCollapse:'collapse'}}>
                <thead>
                  <tr style={{background:'var(--bg-accent-light)',borderBottom:'2px solid var(--border-color)'}}>
                    <th style={{padding:'var(--spacing-md)',textAlign:'left',fontWeight:600}}>Activity</th>
                    <th style={{padding:'var(--spacing-md)',textAlign:'left',fontWeight:600}}>Points</th>
                    <th style={{padding:'var(--spacing-md)',textAlign:'left',fontWeight:600}}>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{borderBottom:'1px solid var(--border-color)'}}>
                    <td style={{padding:'var(--spacing-md)',fontWeight:500}}>Daily Expense Logging</td>
                    <td style={{padding:'var(--spacing-md)',color:'var(--apple-green)',fontWeight:600}}>+10</td>
                    <td style={{padding:'var(--spacing-md)',fontSize:'0.875rem'}}>Track your daily expenses consistently</td>
                  </tr>
                  <tr style={{borderBottom:'1px solid var(--border-color)'}}>
                    <td style={{padding:'var(--spacing-md)',fontWeight:500}}>Logging Streak Bonus</td>
                    <td style={{padding:'var(--spacing-md)',color:'var(--apple-green)',fontWeight:600}}>+5 to +25</td>
                    <td style={{padding:'var(--spacing-md)',fontSize:'0.875rem'}}>Consecutive days of logging (7-day, 14-day, 30-day milestones)</td>
                  </tr>
                  <tr style={{borderBottom:'1px solid var(--border-color)'}}>
                    <td style={{padding:'var(--spacing-md)',fontWeight:500}}>Setting Savings Goals</td>
                    <td style={{padding:'var(--spacing-md)',color:'var(--apple-green)',fontWeight:600}}>+15</td>
                    <td style={{padding:'var(--spacing-md)',fontSize:'0.875rem'}}>Create and commit to financial goals</td>
                  </tr>
                  <tr style={{borderBottom:'1px solid var(--border-color)'}}>
                    <td style={{padding:'var(--spacing-md)',fontWeight:500}}>Achieving Goals</td>
                    <td style={{padding:'var(--spacing-md)',color:'var(--apple-green)',fontWeight:600}}>+50 to +100</td>
                    <td style={{padding:'var(--spacing-md)',fontSize:'0.875rem'}}>Reach your savings milestones</td>
                  </tr>
                  <tr style={{borderBottom:'1px solid var(--border-color)'}}>
                    <td style={{padding:'var(--spacing-md)',fontWeight:500}}>AI Mentor Interactions</td>
                    <td style={{padding:'var(--spacing-md)',color:'var(--apple-green)',fontWeight:600}}>+5</td>
                    <td style={{padding:'var(--spacing-md)',fontSize:'0.875rem'}}>Ask questions and learn from your AI Money Mentor</td>
                  </tr>
                  <tr style={{borderBottom:'1px solid var(--border-color)'}}>
                    <td style={{padding:'var(--spacing-md)',fontWeight:500}}>Weekly Financial Review</td>
                    <td style={{padding:'var(--spacing-md)',color:'var(--apple-green)',fontWeight:600}}>+20</td>
                    <td style={{padding:'var(--spacing-md)',fontSize:'0.875rem'}}>Review your spending patterns and insights</td>
                  </tr>
                  <tr style={{borderBottom:'1px solid var(--border-color)'}}>
                    <td style={{padding:'var(--spacing-md)',fontWeight:500}}>Budget Creation</td>
                    <td style={{padding:'var(--spacing-md)',color:'var(--apple-green)',fontWeight:600}}>+25</td>
                    <td style={{padding:'var(--spacing-md)',fontSize:'0.875rem'}}>Set up your first budget plan</td>
                  </tr>
                  <tr>
                    <td style={{padding:'var(--spacing-md)',fontWeight:500}}>Budget Compliance</td>
                    <td style={{padding:'var(--spacing-md)',color:'var(--apple-green)',fontWeight:600}}>+30</td>
                    <td style={{padding:'var(--spacing-md)',fontSize:'0.875rem'}}>Stay within budget for the month</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </motion.div>

          <motion.div className="content-section" variants={itemVariants}>
            <h2 className="section-title">
              <Smartphone size={24} />
              Cross-Platform Support
            </h2>
            <p className="section-content" style={{marginBottom:'var(--spacing-lg)'}}>
              Built with .NET MAUI 9, FinanceBuddy runs natively on all major platforms with a single codebase, providing a consistent and high-performance experience everywhere.
            </p>
            <div style={{display:'flex',gap:'var(--spacing-lg)',maxWidth:'1400px',margin:'0 auto',overflowX:'auto'}}>
              <div style={{background:'var(--bg-accent-light)',padding:'var(--spacing-xl)',borderRadius:'var(--radius-lg)',textAlign:'center',flex:'1 1 200px',minWidth:'180px'}}>
                <div style={{marginBottom:'var(--spacing-md)',color:'var(--apple-blue)'}}>
                  <Smartphone size={48} strokeWidth={1.5} />
                </div>
                <h3 style={{fontWeight:600,marginBottom:'var(--spacing-sm)',fontSize:'var(--font-size-lg)'}}>Android</h3>
                <p style={{fontSize:'var(--font-size-sm)',color:'var(--apple-gray)'}}>API level 21+ (Android 5.0+)</p>
              </div>
              <div style={{background:'var(--bg-accent-light)',padding:'var(--spacing-xl)',borderRadius:'var(--radius-lg)',textAlign:'center',flex:'1 1 200px',minWidth:'180px'}}>
                <div style={{marginBottom:'var(--spacing-md)',color:'var(--apple-blue)'}}>
                  <Smartphone size={48} strokeWidth={1.5} />
                </div>
                <h3 style={{fontWeight:600,marginBottom:'var(--spacing-sm)',fontSize:'var(--font-size-lg)'}}>iOS</h3>
                <p style={{fontSize:'var(--font-size-sm)',color:'var(--apple-gray)'}}>Version 15.0+</p>
              </div>
              <div style={{background:'var(--bg-accent-light)',padding:'var(--spacing-xl)',borderRadius:'var(--radius-lg)',textAlign:'center',flex:'1 1 200px',minWidth:'180px'}}>
                <div style={{marginBottom:'var(--spacing-md)',color:'var(--apple-blue)'}}>
                  <Monitor size={48} strokeWidth={1.5} />
                </div>
                <h3 style={{fontWeight:600,marginBottom:'var(--spacing-sm)',fontSize:'var(--font-size-lg)'}}>Windows</h3>
                <p style={{fontSize:'var(--font-size-sm)',color:'var(--apple-gray)'}}>Windows 10 version 1903+</p>
              </div>
              <div style={{background:'var(--bg-accent-light)',padding:'var(--spacing-xl)',borderRadius:'var(--radius-lg)',textAlign:'center',flex:'1 1 200px',minWidth:'180px'}}>
                <div style={{marginBottom:'var(--spacing-md)',color:'var(--apple-blue)'}}>
                  <Monitor size={48} strokeWidth={1.5} />
                </div>
                <h3 style={{fontWeight:600,marginBottom:'var(--spacing-sm)',fontSize:'var(--font-size-lg)'}}>macOS</h3>
                <p style={{fontSize:'var(--font-size-sm)',color:'var(--apple-gray)'}}>macOS 12.0+ (Mac Catalyst)</p>
              </div>
            </div>
          </motion.div>

          <motion.div className="content-section" variants={itemVariants}>
            <h2 className="section-title">
              <Gift size={24} />
              Azure Infrastructure
            </h2>
            <p className="section-content" style={{marginBottom:'var(--spacing-lg)'}}>
              FinanceBuddy leverages Microsoft Azure's powerful cloud services for AI capabilities, speech recognition, translation, and data storage.
            </p>
            <div className="features-grid">
              <div className="feature-card">
                <h3 className="feature-title">Azure OpenAI (GPT-4)</h3>
                <p className="feature-description">Personalized financial advice through natural language understanding and generation</p>
                <div style={{marginTop:'var(--spacing-sm)'}}>
                  <TechIconChip name="Azure OpenAI GPT-4" />
                </div>
              </div>
              <div className="feature-card">
                <h3 className="feature-title">Azure Speech Services</h3>
                <p className="feature-description">Voice-to-text expense entry for hands-free interaction and accessibility</p>
                <div style={{marginTop:'var(--spacing-sm)'}}>
                  <TechIconChip name="Azure Speech Services" />
                </div>
              </div>
              <div className="feature-card">
                <h3 className="feature-title">Azure Translator</h3>
                <p className="feature-description">Multi-language support for global accessibility and localization</p>
                <div style={{marginTop:'var(--spacing-sm)'}}>
                  <TechIconChip name="Azure Translator" />
                </div>
              </div>
              <div className="feature-card">
                <h3 className="feature-title">Azure SQL Database</h3>
                <p className="feature-description">Secure, scalable cloud database for user data and financial records</p>
                <div style={{marginTop:'var(--spacing-sm)'}}>
                  <TechIconChip name="Azure SQL Database" />
                  <TechIconChip name="Entity Framework Core" />
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div className="content-section" variants={itemVariants}>
            <h2 className="section-title">
              <Target size={24} />
              Key Features
            </h2>
            <div className="features-grid">
              <div className="feature-card">
                <h3 className="feature-title">🤖 AI Money Mentor</h3>
                <p className="feature-description">
                  Powered by Azure OpenAI GPT-4, provides personalized financial advice through natural language chat with voice input support and multi-language capabilities via Azure Translator.
                </p>
              </div>
              <div className="feature-card">
                <h3 className="feature-title"><Sprout size={20} style={{display:'inline',marginRight:'8px',verticalAlign:'middle',color:'var(--apple-blue)'}} />Plant Gamification</h3>
                <p className="feature-description">
                  Your financial journey represented by a plant growing through 6 stages from Seed to Blooming Tree, earning points for positive financial behaviors and achievements.
                </p>
              </div>
              <div className="feature-card">
                <h3 className="feature-title"><DollarSign size={20} style={{display:'inline',marginRight:'8px',verticalAlign:'middle',color:'var(--apple-blue)'}} />Smart Expense Tracking</h3>
                <p className="feature-description">
                  Voice-to-text expense entry, automatic categorization with visual analytics, real-time gamification feedback, and cross-platform sync between devices.
                </p>
              </div>
              <div className="feature-card">
                <h3 className="feature-title"><Target size={20} style={{display:'inline',marginRight:'8px',verticalAlign:'middle',color:'var(--apple-blue)'}} />Comprehensive Points System</h3>
                <p className="feature-description">
                  Earn points for daily logging, streak bonuses, savings goals, AI mentor interactions, weekly reviews, and budget compliance.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div className="content-section" variants={itemVariants}>
            <h2 className="section-title">
              <Code2 size={24} />
              Technology Stack
            </h2>
            <div className="tech-stack-list">
              <div className="tech-item">
                <Smartphone size={20} />
                <span>.NET MAUI 9.0 (Cross-platform)</span>
              </div>
              <div className="tech-item">
                <CheckCircle2 size={20} />
                <span>ASP.NET Core 8.0 Web API</span>
              </div>
              <div className="tech-item">
                <Zap size={20} />
                <span>Azure OpenAI (GPT-4)</span>
              </div>
              <div className="tech-item">
                <CheckCircle2 size={20} />
                <span>Azure Speech Services</span>
              </div>
              <div className="tech-item">
                <CheckCircle2 size={20} />
                <span>Azure Translator</span>
              </div>
              <div className="tech-item">
                <CheckCircle2 size={20} />
                <span>Entity Framework Core</span>
              </div>
              <div className="tech-item">
                <CheckCircle2 size={20} />
                <span>SQL Server</span>
              </div>
              <div className="tech-item">
                <CheckCircle2 size={20} />
                <span>Microsoft Azure Infrastructure</span>
              </div>
            </div>
          </motion.div>

          <motion.div className="content-section" variants={itemVariants}>
            <h2 className="section-title">
              <Trophy size={24} />
              Key Achievements
            </h2>
            <ul className="highlights-list">
              <li>3rd Place (AI Category) at SA Intervarsity Hackathon 2025</li>
              <li>Complete cross-platform application supporting Android, iOS, Windows, and macOS</li>
              <li>Seamless Azure OpenAI integration for personalized financial guidance</li>
              <li>Innovative plant-based gamification system with 6 growth stages</li>
              <li>Production-ready architecture with cloud deployment capabilities</li>
              <li>Comprehensive accessibility features including voice input support</li>
              <li>Real-time synchronization across multiple devices</li>
              <li>Extensive documentation and setup guides</li>
            </ul>
          </motion.div>

          <motion.div className="content-section" variants={itemVariants}>
            <h2 className="section-title">
              <Users size={24} />
              Team & Context
            </h2>
            <div className="section-content">
              <p>
                <strong>Competition:</strong> SA Intervarsity Hack 2025 - MoneyMentor Challenge<br />
                <strong>University:</strong> University of the Western Cape<br />
                <strong>Team:</strong> Tredir Sewpaul (Team Lead) & Mzameli Mashiyi (Co-Lead)<br />
                <strong>Goal:</strong> Create innovative AI-powered financial wellness solution
              </p>
              <p>
                <strong>Key Innovations:</strong>
              </p>
              <ul className="highlights-list">
                <li>Holistic financial wellness beyond simple expense tracking</li>
                <li>AI-powered personalized guidance using Azure OpenAI</li>
                <li>Engaging gamification representing real financial progress</li>
                <li>True cross-platform solution with .NET MAUI</li>
                <li>Accessibility-first design with voice input and inclusive principles</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default FinanceBuddy;
