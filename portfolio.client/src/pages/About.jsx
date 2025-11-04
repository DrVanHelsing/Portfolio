import { motion } from 'framer-motion';
import AnimatedBackground from '../components/AnimatedBackground';
import SEO from '../components/SEO';
import { Lightbulb, Zap, Users, BookOpen } from 'lucide-react';
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
 <AnimatedBackground variant="particles" />

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
 <motion.div className="about-intro" variants={itemVariants}>
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
 Currently, I'm working at the Samsung Future Innovation Lab at UWC, focusing on 
 multiplatform software development with C# and .NET MAUI, while gaining exposure to 
 Agile, Scrum, and project management methodologies.
 </p>
 </div>
 </motion.div>

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
 <div className="interest-tag">Web Development</div>
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