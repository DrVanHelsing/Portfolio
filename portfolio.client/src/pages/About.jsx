import { motion } from 'framer-motion';
import SEO from '../components/utility/SEO';
import { Zap, Users, BookOpen, Lightbulb, Award, GraduationCap, Trophy } from 'lucide-react';
import './About.css';

const About = () => {
 const containerVariants = {
 hidden: { opacity:0 },
 visible: {
 opacity:1,
 transition: { staggerChildren:0.2 },
 },
 };

 const itemVariants = {
 hidden: { opacity:0, y:20 },
 visible: { opacity:1, y:0 },
 };

 return (
 <div className="about-page">
 <SEO 
   title="About - Tredir Sewpaul"
   description="Learn about my journey as a full-stack developer, my passion for technology, and the values that drive my work."
   keywords="developer background, software engineer, technology passion, developer values"
   path="/about"
 />
 {/* Background is rendered visually and now explicitly used */}

 <motion.div
 className="about-container"
 initial="hidden"
 animate="visible"
 variants={containerVariants}
 >
 <motion.h1 className="page-title" variants={itemVariants}>
 About Me
 </motion.h1>

 <div className="about-content">
 <motion.div className="about-intro about-intro--with-memoji" variants={itemVariants}>
 <div className="intro-text">
 <h2>Hello! I'm Tredir Sewpaul</h2>
 <p>
 I am a Computer Science graduate from the University of the Western Cape, passionate about 
 software engineering, artificial intelligence, and scalable systems. My academic journey and 
 practical experiences have strengthened my technical, analytical, and collaborative skills. 
 I thrive in environments that merge creativity, technology, and teamwork — always seeking to 
 build solutions that make a difference.
 </p>
 <p>
 I completed a university-certified Continuing Education programme with the Samsung Future Innovation Lab (Mar–Dec 2025), covering multi-platform solutions, .NET/C#, AI-assisted development (GitHub Copilot, ChatGPT), cloud integration, Design Thinking, and SDG-aligned innovation through industry-moderated projects.
 Currently, I’m an AI Engineering Intern and Technical Lead, guiding architecture across supervised ML, LLM reasoning/summarisation, vector search, and Azure-based pipelines, while driving explainability, governance, and cross-team delivery.
 </p>
 </div> <img
 src="/memojis/memoji-party-time.png"
 alt="Tredir celebrating"
 className="memoji-intro"
 /> </motion.div>

         <motion.div className="education-section" variants={itemVariants}>
 <h2>Education</h2>
 <div className="education-card">
 <div className="education-header">
 <h3>Bachelor of Science in Computer Science</h3>
 <span className="year">2018 - 2024</span>
 </div>
 <p className="institution">University of the Western Cape</p>
 <p className="description">
 Majored in Computer Science with a Minor in Information Systems and an Election in Physics.
 Focused on theoretical and practical applications of computer science, software development,
 and system design.
 </p>
 <div className="education-highlights">
 <span className="highlight-badge">Merit Award - Mathematics (MAM152) 2021</span>
 <span className="highlight-badge">Merit Award - Astrophysics (PHY217) 2023</span>
 </div>
 </div>
 <div className="education-card">
 <div className="education-header">
 <h3>Continuing Education - Multi-Platform Solutions</h3>
 <span className="year">Mar - Dec 2025</span>
 </div>
 <p className="institution">Samsung Future Innovation Lab (University-certified)</p>
 <p className="description">
 University-certified programme covering multi-platform solutions, .NET/C#, AI-assisted development
 with GitHub Copilot and ChatGPT, cloud integration, Design Thinking, and SDG-aligned innovation
 through industry-moderated projects.
 </p>
 <div className="education-highlights">
 <span className="highlight-badge">Courses: CEM016, CES143, MPS</span>
 <span className="highlight-badge">AI-assisted delivery & cloud</span>
 <span className="highlight-badge">Design Thinking & SDG focus</span>
 <span className="highlight-badge" style={{ background: 'rgba(255, 204, 0, 0.12)', color: '#d4a017', borderColor: 'rgba(255, 204, 0, 0.3)', display:'inline-flex', alignItems:'center', gap:'4px' }}><Award size={12} />Distinction</span>
 <span className="highlight-badge" style={{ background: 'rgba(192, 192, 192, 0.12)', color: '#6b7280', borderColor: 'rgba(192, 192, 192, 0.3)', display:'inline-flex', alignItems:'center', gap:'4px' }}><Trophy size={12} />2nd Place in Course</span>
 </div>
 </div>
 </motion.div>

         <motion.div className="education-section" variants={itemVariants} style={{ marginTop: 0 }}>
 <h2><Award size={24} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 8 }} />Awards & Achievements</h2>
 <div className="awards-grid">
 <div className="education-card" style={{ borderLeftColor: '#FFD700' }}>
 <div className="education-header">
 <h3 style={{ fontSize: 'var(--font-size-lg)', display:'flex', alignItems:'center', gap:'8px' }}><Award size={18} style={{ color:'var(--apple-blue)', flexShrink:0 }} />Merit Award — Mathematics</h3>
 <span className="year">2021</span>
 </div>
 <p className="institution">MAM152 · University of the Western Cape</p>
 <p className="description" style={{ marginBottom: 0 }}>Awarded for outstanding academic performance in Mathematics.</p>
 </div>
 <div className="education-card" style={{ borderLeftColor: '#FFD700' }}>
 <div className="education-header">
 <h3 style={{ fontSize: 'var(--font-size-lg)', display:'flex', alignItems:'center', gap:'8px' }}><Award size={18} style={{ color:'var(--apple-blue)', flexShrink:0 }} />Merit Award — Astrophysics</h3>
 <span className="year">2023</span>
 </div>
 <p className="institution">PHY217 · University of the Western Cape</p>
 <p className="description" style={{ marginBottom: 0 }}>Awarded for outstanding academic performance in Astrophysics.</p>
 </div>
 <div className="education-card" style={{ borderLeftColor: '#AF52DE' }}>
 <div className="education-header">
 <h3 style={{ fontSize: 'var(--font-size-lg)', display:'flex', alignItems:'center', gap:'8px' }}><GraduationCap size={18} style={{ color:'var(--apple-purple)', flexShrink:0 }} />Distinction — Multiplatform Software Dev</h3>
 <span className="year">2025</span>
 </div>
 <p className="institution">Samsung Future Innovation Lab</p>
 <p className="description" style={{ marginBottom: 0 }}>Achieved a Distinction in the Multiplatform Software Development course and placed 2nd overall in the cohort.</p>
 </div>
 </div>
 </motion.div> <motion.div className="values-section" variants={itemVariants}>
 <h2>What Drives Me</h2>
 <div className="values-grid">
 <div className="value-card">
 <div className="value-icon"><Lightbulb size={32} /></div>
 <h3>Innovation</h3>
 <p>Constantly exploring new technologies and pushing the boundaries of what's possible</p>
 </div>
 <div className="value-card">
 <div className="value-icon"><Zap size={32} /></div>
 <h3>Quality</h3>
 <p>Writing clean, maintainable code that stands the test of time</p>
 </div>
 <div className="value-card">
 <div className="value-icon"><Users size={32} /></div>
 <h3>Collaboration</h3>
 <p>Building great products through teamwork and effective communication</p>
 </div>
 <div className="value-card">
 <div className="value-icon"><BookOpen size={32} /></div>
 <h3>Learning</h3>
 <p>Continuous growth and staying current with industry trends</p>
 </div>
 </div>
 </motion.div>

         <motion.div className="interests-section" variants={itemVariants}>
 <h2>Current Focus</h2>
 <div className="interests-list">
 <div className="interest-tag">Multiplatform Development</div>
 <div className="interest-tag">.NET MAUI</div>
 <div className="interest-tag">Machine Learning</div>
 <div className="interest-tag">Neural Networks</div>
 <div className="interest-tag">Database Design</div>
 <div className="interest-tag">Agile & Scrum</div>
 <div className="interest-tag">STEM Education</div>
 </div>
 </motion.div>

 <motion.div className="personal-traits-section" variants={itemVariants}>
 <h2>What Defines Me</h2>
 <div className="traits-grid">
 <div className="trait-item">
 <p>Curious and self-motivated learner with a passion for emerging technologies</p>
 </div>
 <div className="trait-item">
 <p>Strong interest in AI, Machine Learning, and innovative solutions</p>
 </div>
 <div className="trait-item">
 <p>Passionate about education, mentoring, and empowering others</p>
 </div>
 <div className="trait-item">
 <p>Thrive in team collaboration and innovative problem-solving environments</p>
 </div>
 <div className="trait-item">
 <p>Lifelong learner with a continuous growth mindset</p>
 </div>
 <div className="trait-item">
 <p>Driven to build solutions that merge creativity, technology, and teamwork</p>
 </div>
 </div>
 </motion.div>
 </div>
 </motion.div>
 </div>
 );
};

export default About;