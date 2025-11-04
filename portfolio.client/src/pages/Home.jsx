import { motion } from 'framer-motion';
import AnimatedBackground from '../components/AnimatedBackground';
import SEO from '../components/SEO';
import { Link } from 'react-router-dom';
import { MapPin, Monitor, Globe, Brain, GraduationCap } from 'lucide-react';
import useNoScroll from '../hooks/useNoScroll';
import './Home.css';

const Home = () => {
 useNoScroll();
 return (
 <div className="home-page">
 <AnimatedBackground variant="particles" />
 
 <div className="home-content">
 {/* Decorative Elements */}
 <div className="floating-orbs">
 <div className="orb orb-1"></div>
 <div className="orb orb-2"></div>
 <div className="orb orb-3"></div>
 </div>

 <motion.div 
 className="hero-section"
 initial={{ opacity:0, y:50 }}
 animate={{ opacity:1, y:0 }}
 transition={{ duration:0.8 }}
 >
 <motion.h1 
 className="hero-title"
 initial={{ opacity:0, x: -50 }}
 animate={{ opacity:1, x:0 }}
 transition={{ delay:0.2, duration:0.8 }}
 >
 Hi, I'm <span className="highlight">Tredir Sewpaul</span>
 </motion.h1>
 
 <motion.h2 
 className="hero-subtitle"
 initial={{ opacity:0, x: -50 }}
 animate={{ opacity:1, x:0 }}
 transition={{ delay:0.4, duration:0.8 }}
 >
 Computer Science Graduate | Software Engineering Enthusiast | Passionate about AI, Machine Learning, and Scalable Systems
 </motion.h2>
 
 <motion.p 
 className="hero-description"
 initial={{ opacity:0 }}
 animate={{ opacity:1 }}
 transition={{ delay:0.6, duration:0.8 }}
 >
 Passionate about software development, teamwork, and continuous learning. Specializing in multiplatform development with C# and .NET MAUI.
 <br />
 <span className="location"><MapPin size={16} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} /> Based in Cape Town, South Africa</span>
 </motion.p>

 <motion.div 
 className="hero-cta"
 initial={{ opacity:0, y:30 }}
 animate={{ opacity:1, y:0 }}
 transition={{ delay:0.8, duration:0.8 }}
 >
 <Link to="/projects" className="cta-button primary">
 <span>View My Work</span>
 <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
 <path d="M4 10h12m0 0l-4-4m4 4l-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
 </svg>
 </Link>
 <Link to="/contact" className="cta-button secondary">
 <span>Get In Touch</span>
 </Link>
 </motion.div>

 {/* Stats Section */}
 <motion.div 
 className="hero-stats"
 initial={{ opacity:0, y:20 }}
 animate={{ opacity:1, y:0 }}
 transition={{ delay:1, duration:0.8 }}
 >
 <div className="stat-item">
 <div className="stat-value">6+</div>
 <div className="stat-label">Years Experience</div>
 </div>
 <div className="stat-divider"></div>
 <div className="stat-item">
 <div className="stat-value">10+</div>
 <div className="stat-label">Technologies</div>
 </div>
 <div className="stat-divider"></div>
 <div className="stat-item">
 <div className="stat-value">2</div>
 <div className="stat-label">Merit Awards</div>
 </div>
 </motion.div>
 </motion.div>

 <motion.div 
 className="hero-highlights"
 initial={{ opacity:0 }}
 animate={{ opacity:1 }}
 transition={{ delay:1, duration:0.8 }}
 >
 <div className="highlight-card">
 <div className="card-glow"></div>
 <div className="highlight-icon"><Monitor size={32} /></div>
 <h3>Multiplatform Dev</h3>
 <p>C#, .NET MAUI</p>
 <div className="card-footer">
 <span className="tech-count">Samsung FIL</span>
 </div>
 </div>
 <div className="highlight-card">
 <div className="card-glow"></div>
 <div className="highlight-icon"><Globe size={32} /></div>
 <h3>Web Development</h3>
 <p>HTML, CSS, JavaScript, PHP</p>
 <div className="card-footer">
 <span className="tech-count">Full-stack</span>
 </div>
 </div>
 <div className="highlight-card">
 <div className="card-glow"></div>
 <div className="highlight-icon"><Brain size={32} /></div>
 <h3>Neural Networks</h3>
 <p>Machine Learning</p>
 <div className="card-footer">
 <span className="tech-count">Python</span>
 </div>
 </div>
 <div className="highlight-card">
 <div className="card-glow"></div>
 <div className="highlight-icon"><GraduationCap size={32} /></div>
 <h3>Education</h3>
 <p>BSc Computer Science</p>
 <div className="card-footer">
 <span className="tech-count">UWC 2024</span>
 </div>
 </div>
 </motion.div>

 {/* Tech Stack Marquee */}
 <motion.div 
 className="tech-marquee"
 initial={{ opacity:0 }}
 animate={{ opacity:1 }}
 transition={{ delay:1.2, duration:0.8 }}
 >
 <div className="marquee-content">
 <span>Python</span>
 <span>•</span>
 <span>Java</span>
 <span>•</span>
 <span>C#</span>
 <span>•</span>
 <span>.NET MAUI</span>
 <span>•</span>
 <span>HTML/CSS</span>
 <span>•</span>
 <span>JavaScript</span>
 <span>•</span>
 <span>PHP</span>
 <span>•</span>
 <span>SQL</span>
 <span>•</span>
 <span>MySQL</span>
 <span>•</span>
 <span>Matlab</span>
 <span>•</span>
 <span>Python</span>
 <span>•</span>
 <span>Java</span>
 <span>•</span>
 <span>C#</span>
 <span>•</span>
 <span>.NET MAUI</span>
 <span>•</span>
 </div>
 </motion.div>
 
 {/* Availability Badge - Bottom Right */}
 <motion.div 
 className="hero-label availability-badge"
 initial={{ opacity:0, scale:0.8 }}
 animate={{ opacity:1, scale:1 }}
 transition={{ delay:0.1, duration:0.6 }}
 >
 <span className="status-dot"></span>
 Available for opportunities
 </motion.div>
 </div>
 </div>
 );
};

export default Home;
