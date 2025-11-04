import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import AnimatedBackground from '../../components/AnimatedBackground';
import TechIconChip from '../../components/TechIconChip';
import SEO from '../../components/SEO';
import { ArrowLeft, GamepadIcon, Calendar, Target, Trophy, Settings } from 'lucide-react';
import './ProjectDetail.css';

const Hangman = () => {
  return (
    <div className="project-detail-page">
      <SEO title="Hangman Game | Tredir Sewpaul" description="Classic Hangman word-guessing game with difficulty levels and scorekeeping" path="/projects/hangman" />
      <AnimatedBackground variant="particles" />
      
      <motion.div className="project-detail-container" initial={{opacity:0}} animate={{opacity:1}}>
        <Link to="/projects" className="back-link" style={{display:'inline-flex',alignItems:'center',gap:'8px',color:'var(--apple-blue)',marginBottom:'var(--spacing-xl)',textDecoration:'none'}}>
          <ArrowLeft size={20} />Back to Projects
        </Link>

        <div className="project-header">
          <span className="status-badge completed">Educational Project</span>
          <h1 className="project-title">Hangman</h1>
          <p className="project-subtitle">Classic Hangman word-guessing game with customizable word lists, difficulty selection, and clean command-line interface</p>
          <div className="project-badges" style={{marginTop:'var(--spacing-sm)'}}>
            <span className="status-badge" style={{background:'var(--bg-accent-light)'}}>
              <Calendar size={16} style={{display:'inline',marginRight:4}} />
              Apr 2025
            </span>
          </div>
          
          <div style={{marginTop:'var(--spacing-lg)',display:'flex',gap:'var(--spacing-sm)',flexWrap:'wrap'}}>
            <TechIconChip technology="Python" />
          </div>

          <div className="project-links">
            <a href="https://github.com/DrVanHelsing/Hangman" target="_blank" rel="noopener noreferrer" className="project-link-btn">
              <GamepadIcon size={20} />
              View on GitHub
            </a>
          </div>
        </div>

        <div className="project-content">
          <div className="content-section">
            <h2 className="section-title"><GamepadIcon size={24} />Overview</h2>
            <div className="section-content">
              <p>A clean implementation of the classic Hangman word-guessing game. Players guess letters to reveal a hidden word before running out of attempts. Features include customizable word lists, difficulty levels, and round-based gameplay with scorekeeping.</p>
            </div>
          </div>

          <div className="content-section">
            <h2 className="section-title"><Target size={24} />Features</h2>
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(250px,1fr))',gap:'var(--spacing-md)'}}>
              <div style={{background:'var(--bg-accent-light)',padding:'var(--spacing-lg)',borderRadius:'var(--radius-md)'}}>
                <GamepadIcon size={20} style={{color:'var(--apple-blue)',marginBottom:'var(--spacing-sm)'}} />
                <h3 style={{margin:'0 0 var(--spacing-xs) 0',fontSize:'var(--font-size-md)'}}>Classic Gameplay</h3>
                <p style={{margin:0,fontSize:'var(--font-size-sm)',color:'var(--apple-gray)'}}>Traditional Hangman mechanics with letter guessing and visual feedback</p>
              </div>
              <div style={{background:'var(--bg-accent-light)',padding:'var(--spacing-lg)',borderRadius:'var(--radius-md)'}}>
                <Settings size={20} style={{color:'var(--apple-green)',marginBottom:'var(--spacing-sm)'}} />
                <h3 style={{margin:'0 0 var(--spacing-xs) 0',fontSize:'var(--font-size-md)'}}>Difficulty Levels</h3>
                <p style={{margin:0,fontSize:'var(--font-size-sm)',color:'var(--apple-gray)'}}>Easy, medium, and hard modes based on word length</p>
              </div>
              <div style={{background:'var(--bg-accent-light)',padding:'var(--spacing-lg)',borderRadius:'var(--radius-md)'}}>
                <Trophy size={20} style={{color:'var(--apple-orange)',marginBottom:'var(--spacing-sm)'}} />
                <h3 style={{margin:'0 0 var(--spacing-xs) 0',fontSize:'var(--font-size-md)'}}>Scorekeeping</h3>
                <p style={{margin:0,fontSize:'var(--font-size-sm)',color:'var(--apple-gray)'}}>Track wins, losses, and statistics across multiple rounds</p>
              </div>
            </div>
          </div>

          <div className="content-section">
            <h2 className="section-title">Gameplay Flow</h2>
            <div style={{background:'linear-gradient(135deg, rgba(88,86,214,0.08), rgba(191,90,242,0.08))',padding:'var(--spacing-xl)',borderRadius:'var(--radius-lg)',fontFamily:'monospace',fontSize:'var(--font-size-sm)',lineHeight:'2'}}>
              <div>Select Difficulty → Pick Word → Initialize Attempts → Guess Letters → Update Board → Check Win/Loss</div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Hangman;
