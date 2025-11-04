import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import AnimatedBackground from '../../components/AnimatedBackground';
import TechIconChip from '../../components/TechIconChip';
import SEO from '../../components/SEO';
import { ArrowLeft, Grid3x3, Calendar, Users, Cpu, BookOpen } from 'lucide-react';
import './ProjectDetail.css';

const TicTacToe = () => {
  return (
    <div className="project-detail-page">
      <SEO title="Tic Tac Toe | Tredir Sewpaul" description="Classic Tic Tac Toe game with two-player and AI opponent modes" path="/projects/tictactoe" />
      <AnimatedBackground variant="particles" />
      
      <motion.div className="project-detail-container" initial={{opacity:0}} animate={{opacity:1}}>
        <Link to="/projects" className="back-link" style={{display:'inline-flex',alignItems:'center',gap:'8px',color:'var(--apple-blue)',marginBottom:'var(--spacing-xl)',textDecoration:'none'}}>
          <ArrowLeft size={20} />Back to Projects
        </Link>

        <div className="project-header">
          <span className="status-badge completed">Educational Project</span>
          <h1 className="project-title">Tic Tac Toe</h1>
          <p className="project-subtitle">Classic Tic Tac Toe (noughts and crosses) game built as a C# console application with local two-player and optional computer opponent modes</p>
          <div className="project-badges" style={{marginTop:'var(--spacing-sm)'}}>
            <span className="status-badge" style={{background:'var(--bg-accent-light)'}}>
              <Calendar size={16} style={{display:'inline',marginRight:4}} />
              Mar 2025
            </span>
          </div>
          
          <div style={{marginTop:'var(--spacing-lg)',display:'flex',gap:'var(--spacing-sm)',flexWrap:'wrap'}}>
            <TechIconChip technology="C#" />
            <TechIconChip technology=".NET" />
          </div>

          <div className="project-links">
            <a href="https://github.com/DrVanHelsing/TicTacToe" target="_blank" rel="noopener noreferrer" className="project-link-btn">
              <Grid3x3 size={20} />
              View on GitHub
            </a>
          </div>
        </div>

        <div className="project-content">
          <div className="content-section">
            <h2 className="section-title"><Grid3x3 size={24} />Overview</h2>
            <div className="section-content">
              <p>A straightforward implementation of the classic Tic Tac Toe game built as a C# console application. Designed as an educational project to demonstrate basic game logic, board representation, and win condition checking using C# language features. Features clean, readable code suitable for beginners learning C# programming concepts.</p>
            </div>
          </div>

          <div className="content-section">
            <h2 className="section-title">Game Modes</h2>
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(250px,1fr))',gap:'var(--spacing-md)'}}>
              <div style={{background:'var(--bg-accent-light)',padding:'var(--spacing-lg)',borderRadius:'var(--radius-md)'}}>
                <Users size={20} style={{color:'var(--apple-blue)',marginBottom:'var(--spacing-sm)'}} />
                <h3 style={{margin:'0 0 var(--spacing-xs) 0',fontSize:'var(--font-size-md)'}}>Two-Player Mode</h3>
                <p style={{margin:0,fontSize:'var(--font-size-sm)',color:'var(--apple-gray)'}}>Local human vs human gameplay with turn-based mechanics</p>
              </div>
              <div style={{background:'var(--bg-accent-light)',padding:'var(--spacing-lg)',borderRadius:'var(--radius-md)'}}>
                <Cpu size={20} style={{color:'var(--apple-purple)',marginBottom:'var(--spacing-sm)'}} />
                <h3 style={{margin:'0 0 var(--spacing-xs) 0',fontSize:'var(--font-size-md)'}}>AI Opponent</h3>
                <p style={{margin:0,fontSize:'var(--font-size-sm)',color:'var(--apple-gray)'}}>Optional human vs computer mode with minimax algorithm</p>
              </div>
            </div>
          </div>

          <div className="content-section">
            <h2 className="section-title"><BookOpen size={24} />Learning Objectives</h2>
            <div style={{display:'grid',gap:'var(--spacing-md)'}}>
              <div style={{background:'var(--bg-accent-light)',padding:'var(--spacing-lg)',borderRadius:'var(--radius-md)',borderLeft:'4px solid var(--apple-blue)'}}>
                <strong style={{color:'var(--apple-blue)'}}>2D Board Representation</strong>
                <p style={{margin:'var(--spacing-xs) 0 0 0',fontSize:'var(--font-size-sm)',color:'var(--apple-gray)'}}>Using arrays/lists to model game state and track player moves</p>
              </div>
              <div style={{background:'var(--bg-accent-light)',padding:'var(--spacing-lg)',borderRadius:'var(--radius-md)',borderLeft:'4px solid var(--apple-green)'}}>
                <strong style={{color:'var(--apple-green)'}}>Game Loop & State Management</strong>
                <p style={{margin:'var(--spacing-xs) 0 0 0',fontSize:'var(--font-size-sm)',color:'var(--apple-gray)'}}>Turn-based gameplay logic with player switching and state updates</p>
              </div>
              <div style={{background:'var(--bg-accent-light)',padding:'var(--spacing-lg)',borderRadius:'var(--radius-md)',borderLeft:'4px solid var(--apple-purple)'}}>
                <strong style={{color:'var(--apple-purple)'}}>Win Condition Detection</strong>
                <p style={{margin:'var(--spacing-xs) 0 0 0',fontSize:'var(--font-size-sm)',color:'var(--apple-gray)'}}>Checking rows, columns, and diagonals for three-in-a-row patterns</p>
              </div>
              <div style={{background:'var(--bg-accent-light)',padding:'var(--spacing-lg)',borderRadius:'var(--radius-md)',borderLeft:'4px solid var(--apple-orange)'}}>
                <strong style={{color:'var(--apple-orange)'}}>AI Implementation</strong>
                <p style={{margin:'var(--spacing-xs) 0 0 0',fontSize:'var(--font-size-sm)',color:'var(--apple-gray)'}}>Minimax algorithm for optimal computer player decision-making</p>
              </div>
            </div>
          </div>

          <div className="content-section">
            <h2 className="section-title">Win Patterns</h2>
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))',gap:'var(--spacing-md)'}}>
              {['Row','Column','Diagonal','Anti-Diagonal'].map((p,i)=> (
                <div key={i} style={{background:'var(--bg-accent-light)',padding:'var(--spacing-md)',borderRadius:'var(--radius-lg)'}}>
                  <div style={{fontWeight:'var(--font-weight-semibold)',marginBottom:8}}>{p}</div>
                  <div style={{display:'grid',gridTemplateColumns:'repeat(3,24px)',gap:6,justifyContent:'start'}}>
                    {[...Array(9)].map((_,j)=> {
                      const active = (p==='Row' && Math.floor(j/3)===0) ||
                                     (p==='Column' && (j%3)===1) ||
                                     (p==='Diagonal' && (j===0||j===4||j===8)) ||
                                     (p==='Anti-Diagonal' && (j===2||j===4||j===6));
                      return <div key={j} style={{width:24,height:24,borderRadius:4,background: active? 'var(--apple-blue)':'rgba(0,0,0,0.08)'}}/>;
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default TicTacToe;
