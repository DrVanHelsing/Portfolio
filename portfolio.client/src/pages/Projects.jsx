import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import AnimatedBackground from '../components/AnimatedBackground';
import SEO from '../components/SEO';
import { Sparkles } from 'lucide-react';
import './Projects.css';

const Projects = () => {
  const projects = [
    {
      title: "FinanceBuddy",
      date: "Sep 2025",
      description: "AI-powered financial wellness app with plant gamification and personalized advice. Built with .NET MAUI 9.0, ASP.NET Core, and Azure OpenAI. SA Intervarsity Hackathon 2025 · AI Category · 3rd Place.",
      technologies: [".NET MAUI", "Azure OpenAI", "C#", "Entity Framework"],
      category: "Full-Stack",
      impact: "Hackathon · AI Category · 3rd Place",
      color: "blue",
      link: "/projects/financebuddy",
      github: "https://github.com/DrVanHelsing/SAIntervarsityHack2025-MoneyMentor"
    },
    {
      title: "StudentLink",
      date: "Apr 2025 - Present",
      description: "Comprehensive career readiness platform with AI CV analysis, ML-powered job recommendations, and cross-platform support. Features React web app, .NET MAUI mobile app, and ASP.NET Core API.",
      technologies: [".NET 9", "React", "Azure OpenAI", ".NET MAUI", "ML.NET"],
      category: "Full-Stack",
      impact: "Complete multi-platform career solution",
      color: "purple",
      link: "/projects/studentlink"
    },
    {
      title: "CallCentre AI",
      date: "Aug 2025 - Present",
      description: "AI-assisted customer engagement platform with real-time supervision, SignalR communication, text analytics, and cross-platform mobile support for agents.",
      technologies: [".NET 8", "React + Vite", "SignalR", "Azure Cognitive Services"],
      category: "Enterprise",
      impact: "Real-time AI-powered customer engagement",
      color: "indigo",
      link: "/projects/callcentre-ai"
    },
    {
      title: "Neural Networks Lab",
      date: "2024",
      description: "Comprehensive ML research repository with neural network implementations from scratch, image classification (MNIST, CIFAR-10), text classification, and unsupervised learning algorithms.",
      technologies: ["Python", "NumPy", "TensorFlow", "PyTorch", "Scikit-learn"],
      category: "Machine Learning",
      impact: "Deep understanding of ML fundamentals",
      color: "blue",
      link: "/projects/machine-learning",
      github: "https://github.com/DrVanHelsing/MachineLearning"
    },
    {
      title: "GodsEye",
      date: "Apr 2025 - Present",
      description: "Experimental gesture-controlled gaming mouse using facial gestures, head pose, and eye gaze. Low-latency input system for gaming and accessibility with OpenCV and Mediapipe.",
      technologies: ["Python", "OpenCV", "Mediapipe", "Computer Vision"],
      category: "Experimental",
      impact: "Innovative hands-free control system",
      color: "purple",
      link: "/projects/godseye",
      github: "https://github.com/DrVanHelsing/GodsEye"
    },
    {
      title: "Hangman",
      date: "Apr 2025",
      description: "Classic Hangman word-guessing game with customizable word lists, difficulty levels, and scorekeeping. Clean implementation for educational purposes.",
      technologies: ["C#", "CLI"],
      category: "Educational",
      impact: "Learning programming fundamentals",
      color: "indigo",
      link: "/projects/hangman",
      github: "https://github.com/DrVanHelsing/Hangman"
    },
    {
      title: "Tic‑Tac‑Toe",
      date: "Mar 2025",
      description: "Classic Tic Tac Toe game with two-player and AI opponent modes. Demonstrates game logic, board representation, and win condition algorithms.",
      technologies: ["C#", "Game Logic", "CLI"],
      category: "Educational",
      impact: "Programming fundamentals demonstration",
      color: "blue",
      link: "/projects/tictactoe",
      github: "https://github.com/DrVanHelsing/TicTacToe"
    }
  ];
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="projects-page">
      <SEO 
        title="Projects - Tredir Sewpaul"
        description="View my portfolio of web development, mobile applications, and cloud architecture projects. Showcasing innovative solutions and technical expertise."
        keywords="portfolio projects, web development projects, mobile apps, cloud architecture, react projects"
        path="/projects"
      />
      <AnimatedBackground variant="particles" />
      
 <motion.div 
        className="projects-container"
   initial="hidden"
   animate="visible"
      variants={containerVariants}
  >
        <motion.h1 className="page-title" variants={cardVariants}>
          Projects & Portfolio
        </motion.h1>
        
        <motion.p className="page-subtitle" variants={cardVariants}>
     A showcase of my recent work and technical achievements
        </motion.p>

        <div className="projects-grid">
      {projects.map((project, index) => {
        const CardWrapper = project.link ? Link : 'div';
        const wrapperProps = project.link 
          ? { to: project.link }
          : {};
        
        return (
          <CardWrapper
            {...wrapperProps}
            key={index}
            className={`project-card project-${project.color}`}
          >
            <motion.div
              style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
              variants={cardVariants}
              whileHover={{ y: -10, scale: 1.02, transition: { duration: 0.3 } }}
            >
              <div className="project-number">0{index + 1}</div>
              <div className="project-category">{project.category}</div>
              {project.date && (
                <div className="project-date-chip">{project.date}</div>
              )}
              <h3 className="project-title">{project.title}</h3>
       <p className="project-description">{project.description}</p>
              
         <div className="project-tech">
   {project.technologies.map((tech, idx) => (
           <span key={idx} className="tech-tag">{tech}</span>
        ))}
   </div>
   
 
 <div className="project-impact">
          <span className="impact-icon"><Sparkles size={18} /></span>
          <span className="impact-text">{project.impact}</span>
 </div> 
 {project.link && (
   <div className="project-link">
     <span>View Details</span>
     <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
       <path d="M4 10h12m0 0l-4-4m4 4l-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
     </svg>
   </div>
 )}
 {!project.link && project.github && (
   <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-link" onClick={(e) => e.stopPropagation()}>
     <span>View on GitHub</span>
     <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
       <path d="M4 10h12m0 0l-4-4m4 4l-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
     </svg>
   </a>
 )}
 {!project.link && !project.github && (project.report || project.demo) && (
   <div className="project-links-group">
     {project.report && (
       <a href={project.report} target="_blank" rel="noopener noreferrer" className="project-link secondary" onClick={(e) => e.stopPropagation()}>
         <span>View Report</span>
         <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
           <path d="M4 10h12m0 0l-4-4m4 4l-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
         </svg>
       </a>
     )}
     {project.demo && (
       <a href={project.demo} target="_blank" rel="noopener noreferrer" className="project-link secondary" onClick={(e) => e.stopPropagation()}>
         <span>Watch Demo</span>
         <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
           <path d="M4 10h12m0 0l-4-4m4 4l-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
         </svg>
       </a>
     )}
   </div>
 )}
            </motion.div>
          </CardWrapper>
        );
      })}
        </div>
      </motion.div>
    </div>
  );
};

export default Projects;
