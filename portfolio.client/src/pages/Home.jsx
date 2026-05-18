import { motion } from 'framer-motion';
import SEO from '../components/utility/SEO';
import TechIconChip from '../components/ui/TechIconChip';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import useNoScroll from '../hooks/useNoScroll';
import { useCountUp } from '../hooks/useCountUp';
import './Home.css';

const FEATURED_PROJECTS = [
  {
    title: 'StudentLink',
    category: 'Full-Stack',
    description: 'AI-powered career readiness platform',
    techs: ['.NET 9', 'React', 'Azure OpenAI'],
    link: '/projects/studentlink',
  },
  {
    title: 'CallCentre AI',
    category: 'Enterprise',
    description: 'Real-time AI customer engagement',
    techs: ['.NET 8', 'SignalR', 'React + Vite'],
    link: '/projects/callcentre-ai',
  },
  {
    title: 'Geology Sim',
    category: '3D Simulation',
    description: 'Browser-based geology field simulator',
    techs: ['Three.js', 'React', 'WebGL'],
    link: '/projects/geology-sim',
  },
  {
    title: 'Physics Lab IDE',
    category: 'Education',
    description: 'Block-based physics simulation IDE',
    techs: ['React', 'Blockly', 'VPython'],
    link: '/projects/physics-lab',
  },
];

const Home = () => {
  useNoScroll();

  const stat1 = useCountUp({ target: 6, duration: 1.5, suffix: '+' });
  const stat2 = useCountUp({ target: 10, duration: 1.5, suffix: '+' });
  const stat3 = useCountUp({ target: 5, duration: 1.5, suffix: '+' });

  return (
    <div className="home-page">

      <div className="home-content">
        <motion.div
          className="hero-section"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="hero-title-row">
            <motion.h1
              className="hero-title"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Hi, I'm <span className="highlight">Tredir Sewpaul</span>
            </motion.h1>
            <motion.img
              src="/memojis/memoji-star-struck.png"
              alt="Star struck memoji"
              className="memoji-name-accent"
              initial={{ opacity: 0, scale: 0.5, rotate: -15 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ delay: 0.4, duration: 0.5, type: 'spring', stiffness: 180 }}
            />
          </div>

          <motion.h2
            className="hero-subtitle"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            I am a Computer Science Graduate, that is passionate about software development, teamwork, and continuous learning. Specializing in machine learning, and multiplatform development with C# and .NET MAUI.
          </motion.h2>

          <motion.div
            className="hero-cta"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <Link to="/projects" className="cta-button primary">
              <span>View My Work</span>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M4 10h12m0 0l-4-4m4 4l-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </Link>
            <Link to="/contact" className="cta-button secondary">
              <span>Get In Touch</span>
            </Link>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            className="hero-stats"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <div className="stat-item" ref={stat1.ref}>
              <div className="stat-value">{stat1.count}{stat1.suffix}</div>
              <div className="stat-label">Years Experience</div>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item" ref={stat2.ref}>
              <div className="stat-value">{stat2.count}{stat2.suffix}</div>
              <div className="stat-label">Technologies</div>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item" ref={stat3.ref}>
              <div className="stat-value">{stat3.count}{stat3.suffix}</div>
              <div className="stat-label">Awards & Wins</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Featured Projects */}
        <motion.div
          className="hero-highlights"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          {FEATURED_PROJECTS.map((proj) => (
            <Link key={proj.title} to={proj.link} className="highlight-card featured-project-card">
              <div className="card-glow"></div>
              <div className="project-card-category">{proj.category}</div>
              <h3>{proj.title}</h3>
              <p>{proj.description}</p>
              <div className="featured-project-techs">
                {proj.techs.map((t) => (
                  <TechIconChip key={t} name={t} />
                ))}
              </div>
              <div className="card-footer">
                <span className="tech-count">View Details <ArrowRight size={11} style={{ display: 'inline', verticalAlign: 'middle' }} /></span>
              </div>
            </Link>
          ))}
          <Link to="/projects" className="highlight-card featured-view-all-card">
            <div className="card-glow"></div>
            <div className="view-all-inner">
              <span className="view-all-label">View All Projects</span>
              <ArrowRight size={22} />
            </div>
          </Link>
        </motion.div>

        {/* Tech Stack Marquee */}
        <motion.div
          className="tech-marquee"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <div className="marquee-content" aria-hidden="false">
            <span>Python</span><span>•</span>
            <span>Java</span><span>•</span>
            <span>C#</span><span>•</span>
            <span>.NET MAUI</span><span>•</span>
            <span>HTML/CSS</span><span>•</span>
            <span>JavaScript</span><span>•</span>
            <span>PHP</span><span>•</span>
            <span>SQL</span><span>•</span>
            <span>MySQL</span><span>•</span>
            <span>Matlab</span><span>•</span>
            <span>React</span><span>•</span>
            <span>Azure</span><span>•</span>
            <span>Firebase</span><span>•</span>
            <span>Python</span><span>•</span>
            <span>Python</span><span>•</span>
            <span>Java</span><span>•</span>
            <span>C#</span><span>•</span>
            <span>.NET MAUI</span><span>•</span>
            <span>HTML/CSS</span><span>•</span>
            <span>JavaScript</span><span>•</span>
            <span>PHP</span><span>•</span>
            <span>SQL</span><span>•</span>
            <span>MySQL</span><span>•</span>
            <span>Matlab</span><span>•</span>
            <span>React</span><span>•</span>
            <span>Azure</span><span>•</span>
            <span>Firebase</span><span>•</span>
            <span>Python</span><span>•</span>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default Home;
