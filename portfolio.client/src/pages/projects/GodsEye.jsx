import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import AnimatedBackground from '../../components/AnimatedBackground';
import AnimatedChart from '../../components/AnimatedChart';
import TechIconChip from '../../components/TechIconChip';
import ArchitectureDiagram from '../../components/ArchitectureDiagram';
import SEO from '../../components/SEO';
import { 
  ArrowLeft, Eye, AlertTriangle, Calendar, Zap, Target, Camera, 
  Crosshair, MousePointer2, Hand, Users, TrendingUp, Sparkles,
  Settings, Activity, Shield, Gauge
} from 'lucide-react';
import './ProjectDetail.css';

const GodsEye = () => {
  return (
    <div className="project-detail-page">
      <SEO title="GodsEye - Gesture Control | Tredir Sewpaul" description="Experimental gesture-controlled gaming mouse using facial gestures and eye tracking" path="/projects/godseye" />
      <AnimatedBackground variant="particles" />
      
      <motion.div className="project-detail-container" initial={{opacity:0}} animate={{opacity:1}}>
        <Link to="/projects" className="back-link" style={{display:'inline-flex',alignItems:'center',gap:'8px',color:'var(--apple-blue)',marginBottom:'var(--spacing-xl)',textDecoration:'none'}}>
          <ArrowLeft size={20} />Back to Projects
        </Link>

        <div className="project-header">
          <span className="status-badge prototype"><AlertTriangle size={16} />Experimental Prototype</span>
          <h1 className="project-title">GodsEye</h1>
          <p className="project-subtitle">Experimental gesture-controlled gaming mouse using facial gestures, head pose, eye gaze, and blink detection for hands-free computer control</p>
          <div className="project-badges" style={{marginTop:'var(--spacing-sm)'}}>
            <span className="status-badge" style={{background:'var(--bg-accent-light)'}}>
              <Calendar size={16} style={{display:'inline',marginRight:4}} />
              Apr 2025 - Present
            </span>
          </div>
          
          <div style={{marginTop:'var(--spacing-lg)',display:'flex',gap:'var(--spacing-sm)',flexWrap:'wrap'}}>
            <TechIconChip technology="Python" />
            <TechIconChip technology="OpenCV" />
            <TechIconChip technology="Mediapipe" />
            <TechIconChip technology="NumPy" />
            <TechIconChip technology="PyAutoGUI" />
          </div>

          <div className="project-links">
            <a href="https://github.com/DrVanHelsing/GodsEye" target="_blank" rel="noopener noreferrer" className="project-link-btn">
              <Eye size={20} />
              View on GitHub
            </a>
          </div>
        </div>

        <div className="project-content">
          <div className="content-section">
            <h2 className="section-title"><Eye size={24} />Overview</h2>
            <div className="section-content">
              <p>GodsEye is an experimental project aimed at providing gesture-driven input for mouse control and gaming actions using facial gestures, head pose estimation, and eye tracking. The goal is to create a low-latency, reliable alternative input method suitable for gaming and accessibility scenarios.</p>
              <p><strong>Note:</strong> This is a work-in-progress prototype. Blink-to-click functionality is currently unreliable and under active development.</p>
            </div>
          </div>

          <div className="content-section">
            <h2 className="section-title"><Activity size={24} />Computer Vision Pipeline</h2>
            <div className="architecture-section">
            <ArchitectureDiagram
              columns={[
                {
                  title: 'Input & Detection',
                  items: [
                    {
                      title: 'Webcam Input',
                      subtitle: 'Real-time video stream',
                      icon: <Camera className="w-6 h-6" style={{color: 'var(--apple-blue)'}} />
                    },
                    {
                      title: 'Face Detection',
                      subtitle: 'Mediapipe Face Mesh',
                      icon: <Eye className="w-6 h-6" style={{color: 'var(--apple-indigo)'}} />
                    }
                  ]
                },
                {
                  title: 'Feature Extraction',
                  items: [
                    {
                      title: 'Landmark Extraction',
                      subtitle: '468 facial landmarks',
                      icon: <Target className="w-6 h-6" style={{color: 'var(--apple-blue)'}} />
                    },
                    {
                      title: 'Eye Aspect Ratio',
                      subtitle: 'EAR calculation for blinks',
                      icon: <Eye className="w-6 h-6" style={{color: 'var(--apple-purple)'}} />
                    },
                    {
                      title: 'Head Pose',
                      subtitle: 'Rotation & position tracking',
                      icon: <Crosshair className="w-6 h-6" style={{color: 'var(--apple-green)'}} />
                    }
                  ]
                },
                {
                  title: 'Output & Control',
                  items: [
                    {
                      title: 'Gesture Recognition',
                      subtitle: 'Blink & gaze detection',
                      icon: <Hand className="w-6 h-6" style={{color: 'var(--apple-blue)'}} />
                    },
                    {
                      title: 'Cursor Movement',
                      subtitle: 'Smoothed position tracking',
                      icon: <MousePointer2 className="w-6 h-6" style={{color: 'var(--apple-indigo)'}} />
                    },
                    {
                      title: 'Click Events',
                      subtitle: 'Short & long blinks',
                      icon: <Zap className="w-6 h-6" style={{color: 'var(--apple-orange)'}} />
                    }
                  ]
                }
              ]}
              features={[
                {
                  title: 'Hands-Free Control',
                  subtitle: 'Gesture-driven mouse control using facial movements',
                  icon: <Hand className="w-6 h-6" style={{color: 'var(--apple-blue)'}} />
                },
                {
                  title: 'Real-time Processing',
                  subtitle: 'Low-latency computer vision with Mediapipe',
                  icon: <Zap className="w-6 h-6" style={{color: 'var(--apple-indigo)'}} />
                },
                {
                  title: 'Accessibility Focus',
                  subtitle: 'Alternative input method for gaming and productivity',
                  icon: <Target className="w-6 h-6" style={{color: 'var(--apple-purple)'}} />
                }
              ]}
            />
            </div>
          </div>

          <div className="content-section">
            <h2 className="section-title"><Gauge size={24} />Performance Metrics</h2>
            <div className="chart-grid-section" style={{display:'grid',gridTemplateColumns:'repeat(auto-fit, minmax(400px,1fr))',gap:'var(--spacing-lg)',maxWidth:'1200px',margin:'0 auto'}}>
              <AnimatedChart
                title="Detection Accuracy"
                data={[
                  {label:'Face Detection',value:98},
                  {label:'Landmark Tracking',value:92},
                  {label:'Eye Tracking',value:85},
                  {label:'Blink Detection',value:65}
                ]}
                type="bar"
                showValues
                height={240}
              />
              <AnimatedChart
                title="Processing Latency (ms)"
                data={[
                  {label:'Face Detection',value:8},
                  {label:'Feature Extraction',value:5},
                  {label:'Gesture Processing',value:3},
                  {label:'Mouse Control',value:2}
                ]}
                type="bar"
                showValues
                height={240}
                colorMap={{
                  'Face Detection':'var(--apple-blue)',
                  'Feature Extraction':'var(--apple-green)',
                  'Gesture Processing':'var(--apple-orange)',
                  'Mouse Control':'var(--apple-purple)'
                }}
              />
            </div>
          </div>

          <div className="content-section">
            <h2 className="section-title"><Target size={24} />Feature Status</h2>
            <div style={{background:'var(--bg-accent-light)',padding:'var(--spacing-xl)',borderRadius:'var(--radius-lg)',overflowX:'auto'}}>
              <table style={{width:'100%',borderCollapse:'collapse'}}>
                <thead>
                  <tr style={{borderBottom:'2px solid var(--apple-gray-light)'}}>
                    <th style={{padding:'var(--spacing-md)',textAlign:'left',color:'var(--apple-blue)'}}>Feature</th>
                    <th style={{padding:'var(--spacing-md)',textAlign:'center',color:'var(--apple-blue)'}}>Planned</th>
                    <th style={{padding:'var(--spacing-md)',textAlign:'center',color:'var(--apple-blue)'}}>Implemented</th>
                    <th style={{padding:'var(--spacing-md)',textAlign:'left',color:'var(--apple-blue)'}}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{borderBottom:'1px solid var(--apple-gray-light)'}}>
                    <td style={{padding:'var(--spacing-md)'}}>Face Landmark Detection</td>
                    <td style={{padding:'var(--spacing-md)',textAlign:'center'}}>✓</td>
                    <td style={{padding:'var(--spacing-md)',textAlign:'center'}}>✓</td>
                    <td style={{padding:'var(--spacing-md)',color:'var(--apple-green)'}}>Working</td>
                  </tr>
                  <tr style={{borderBottom:'1px solid var(--apple-gray-light)'}}>
                    <td style={{padding:'var(--spacing-md)'}}>Head Pose Estimation</td>
                    <td style={{padding:'var(--spacing-md)',textAlign:'center'}}>✓</td>
                    <td style={{padding:'var(--spacing-md)',textAlign:'center'}}>✓</td>
                    <td style={{padding:'var(--spacing-md)',color:'var(--apple-orange)'}}>Utilities Present</td>
                  </tr>
                  <tr style={{borderBottom:'1px solid var(--apple-gray-light)'}}>
                    <td style={{padding:'var(--spacing-md)'}}>Gaze Cursor Control</td>
                    <td style={{padding:'var(--spacing-md)',textAlign:'center'}}>✓</td>
                    <td style={{padding:'var(--spacing-md)',textAlign:'center'}}>~</td>
                    <td style={{padding:'var(--spacing-md)',color:'var(--apple-orange)'}}>Prototype</td>
                  </tr>
                  <tr style={{borderBottom:'1px solid var(--apple-gray-light)'}}>
                    <td style={{padding:'var(--spacing-md)'}}>Cursor Smoothing</td>
                    <td style={{padding:'var(--spacing-md)',textAlign:'center'}}>✓</td>
                    <td style={{padding:'var(--spacing-md)',textAlign:'center'}}>✓</td>
                    <td style={{padding:'var(--spacing-md)',color:'var(--apple-green)'}}>Working</td>
                  </tr>
                  <tr style={{borderBottom:'1px solid var(--apple-gray-light)'}}>
                    <td style={{padding:'var(--spacing-md)'}}>Blink-to-Click (Short Blink)</td>
                    <td style={{padding:'var(--spacing-md)',textAlign:'center'}}>✓</td>
                    <td style={{padding:'var(--spacing-md)',textAlign:'center'}}>~</td>
                    <td style={{padding:'var(--spacing-md)',color:'var(--apple-red)'}}>Unreliable</td>
                  </tr>
                  <tr style={{borderBottom:'1px solid var(--apple-gray-light)'}}>
                    <td style={{padding:'var(--spacing-md)'}}>Blink-to-Click (Long Blink)</td>
                    <td style={{padding:'var(--spacing-md)',textAlign:'center'}}>✓</td>
                    <td style={{padding:'var(--spacing-md)',textAlign:'center'}}>~</td>
                    <td style={{padding:'var(--spacing-md)',color:'var(--apple-red)'}}>Unreliable</td>
                  </tr>
                  <tr style={{borderBottom:'1px solid var(--apple-gray-light)'}}>
                    <td style={{padding:'var(--spacing-md)'}}>Hand Gesture Detection</td>
                    <td style={{padding:'var(--spacing-md)',textAlign:'center'}}>✓</td>
                    <td style={{padding:'var(--spacing-md)',textAlign:'center'}}>✗</td>
                    <td style={{padding:'var(--spacing-md)',color:'var(--apple-gray)'}}>Planned</td>
                  </tr>
                  <tr style={{borderBottom:'1px solid var(--apple-gray-light)'}}>
                    <td style={{padding:'var(--spacing-md)'}}>Gesture Mapping UI</td>
                    <td style={{padding:'var(--spacing-md)',textAlign:'center'}}>✓</td>
                    <td style={{padding:'var(--spacing-md)',textAlign:'center'}}>✗</td>
                    <td style={{padding:'var(--spacing-md)',color:'var(--apple-gray)'}}>Planned</td>
                  </tr>
                  <tr>
                    <td style={{padding:'var(--spacing-md)'}}>Per-Game Profiles</td>
                    <td style={{padding:'var(--spacing-md)',textAlign:'center'}}>✓</td>
                    <td style={{padding:'var(--spacing-md)',textAlign:'center'}}>✗</td>
                    <td style={{padding:'var(--spacing-md)',color:'var(--apple-gray)'}}>Planned</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="content-section">
            <h2 className="section-title"><Settings size={24} />Configuration Options</h2>
            <div style={{background:'var(--bg-accent-light)',padding:'var(--spacing-xl)',borderRadius:'var(--radius-lg)',overflowX:'auto'}}>
              <table style={{width:'100%',borderCollapse:'collapse'}}>
                <thead>
                  <tr style={{borderBottom:'2px solid var(--apple-gray-light)'}}>
                    <th style={{padding:'var(--spacing-md)',textAlign:'left',color:'var(--apple-blue)'}}>Parameter</th>
                    <th style={{padding:'var(--spacing-md)',textAlign:'left',color:'var(--apple-blue)'}}>Default</th>
                    <th style={{padding:'var(--spacing-md)',textAlign:'left',color:'var(--apple-blue)'}}>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{borderBottom:'1px solid var(--apple-gray-light)'}}>
                    <td style={{padding:'var(--spacing-md)',fontFamily:'monospace'}}>smoothing</td>
                    <td style={{padding:'var(--spacing-md)',fontFamily:'monospace'}}>0.75</td>
                    <td style={{padding:'var(--spacing-md)'}}>Cursor smoothing factor (0-1)</td>
                  </tr>
                  <tr style={{borderBottom:'1px solid var(--apple-gray-light)'}}>
                    <td style={{padding:'var(--spacing-md)',fontFamily:'monospace'}}>sensitivity</td>
                    <td style={{padding:'var(--spacing-md)',fontFamily:'monospace'}}>1.0</td>
                    <td style={{padding:'var(--spacing-md)'}}>Cursor movement sensitivity multiplier</td>
                  </tr>
                  <tr style={{borderBottom:'1px solid var(--apple-gray-light)'}}>
                    <td style={{padding:'var(--spacing-md)',fontFamily:'monospace'}}>blink_short_ms</td>
                    <td style={{padding:'var(--spacing-md)',fontFamily:'monospace'}}>80</td>
                    <td style={{padding:'var(--spacing-md)'}}>Short blink duration for left click (ms)</td>
                  </tr>
                  <tr style={{borderBottom:'1px solid var(--apple-gray-light)'}}>
                    <td style={{padding:'var(--spacing-md)',fontFamily:'monospace'}}>blink_long_ms</td>
                    <td style={{padding:'var(--spacing-md)',fontFamily:'monospace'}}>250</td>
                    <td style={{padding:'var(--spacing-md)'}}>Long blink duration for right click (ms)</td>
                  </tr>
                  <tr style={{borderBottom:'1px solid var(--apple-gray-light)'}}>
                    <td style={{padding:'var(--spacing-md)',fontFamily:'monospace'}}>gaze_mode</td>
                    <td style={{padding:'var(--spacing-md)',fontFamily:'monospace'}}>relative</td>
                    <td style={{padding:'var(--spacing-md)'}}>Cursor control mode (relative/absolute)</td>
                  </tr>
                  <tr>
                    <td style={{padding:'var(--spacing-md)',fontFamily:'monospace'}}>head_pose_scale</td>
                    <td style={{padding:'var(--spacing-md)',fontFamily:'monospace'}}>1.0</td>
                    <td style={{padding:'var(--spacing-md)'}}>Head pose movement scale factor</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="content-section">
            <h2 className="section-title"><Shield size={24} />Known Issues & Mitigations</h2>
            <div style={{display:'grid',gap:'var(--spacing-md)'}}>
              <div style={{background:'var(--bg-accent-light)',padding:'var(--spacing-lg)',borderRadius:'var(--radius-md)',borderLeft:'4px solid var(--apple-red)'}}>
                <div style={{display:'flex',alignItems:'center',gap:'var(--spacing-sm)',marginBottom:'var(--spacing-sm)'}}>
                  <AlertTriangle size={20} style={{color:'var(--apple-red)'}} />
                  <strong style={{color:'var(--apple-red)'}}>Blink-to-Click Not Working</strong>
                </div>
                <ul style={{margin:0,paddingLeft:'var(--spacing-lg)',color:'var(--apple-gray)'}}>
                  <li>False positives from rapid eye movements → increase blink duration threshold</li>
                  <li>Missed blinks → lower threshold, check camera frame rate</li>
                  <li>Poor lighting/camera quality → improve lighting, use higher resolution webcam</li>
                  <li>Face landmark jitter → add temporal filtering (median/Kalman)</li>
                </ul>
              </div>
              <div style={{background:'var(--bg-accent-light)',padding:'var(--spacing-lg)',borderRadius:'var(--radius-md)',borderLeft:'4px solid var(--apple-orange)'}}>
                <div style={{display:'flex',alignItems:'center',gap:'var(--spacing-sm)',marginBottom:'var(--spacing-sm)'}}>
                  <AlertTriangle size={20} style={{color:'var(--apple-orange)'}} />
                  <strong style={{color:'var(--apple-orange)'}}>Cursor Drift or Jitter</strong>
                </div>
                <ul style={{margin:0,paddingLeft:'var(--spacing-lg)',color:'var(--apple-gray)'}}>
                  <li>Increase smoothing parameter</li>
                  <li>Reduce sensitivity</li>
                  <li>Re-calibrate baseline measurements</li>
                </ul>
              </div>
              <div style={{background:'var(--bg-accent-light)',padding:'var(--spacing-lg)',borderRadius:'var(--radius-md)',borderLeft:'4px solid var(--apple-blue)'}}>
                <div style={{display:'flex',alignItems:'center',gap:'var(--spacing-sm)',marginBottom:'var(--spacing-sm)'}}>
                  <Activity size={20} style={{color:'var(--apple-blue)'}} />
                  <strong style={{color:'var(--apple-blue)'}}>High CPU Usage</strong>
                </div>
                <ul style={{margin:0,paddingLeft:'var(--spacing-lg)',color:'var(--apple-gray)'}}>
                  <li>Switch to lighter detection model</li>
                  <li>Use Mediapipe with GPU acceleration</li>
                  <li>Reduce camera resolution or frame rate</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="content-section">
            <h2 className="section-title"><TrendingUp size={24} />Development Roadmap</h2>
            <div style={{display:'grid',gap:'var(--spacing-lg)'}}>
              <div style={{background:'linear-gradient(135deg, rgba(10,132,255,0.08), rgba(10,132,255,0.02))',padding:'var(--spacing-lg)',borderRadius:'var(--radius-lg)',borderLeft:'4px solid var(--apple-blue)'}}>
                <div style={{display:'flex',alignItems:'center',gap:'var(--spacing-sm)',marginBottom:'var(--spacing-sm)'}}>
                  <div style={{background:'var(--apple-blue)',color:'white',borderRadius:'50%',width:32,height:32,display:'flex',alignItems:'center',justifyContent:'center',fontWeight:'bold'}}>1</div>
                  <strong style={{fontSize:'var(--font-size-lg)',color:'var(--apple-blue)'}}>Stabilize Blink-to-Click Detection</strong>
                </div>
                <ul style={{margin:0,paddingLeft:'48px',color:'var(--apple-gray)'}}>
                  <li>Add frame-based blink debounce logic</li>
                  <li>Use eye-aspect-ratio (EAR) with multiple feature cues</li>
                  <li>Add calibration step for baseline eye openness measurement</li>
                </ul>
              </div>
              <div style={{background:'linear-gradient(135deg, rgba(52,199,89,0.08), rgba(52,199,89,0.02))',padding:'var(--spacing-lg)',borderRadius:'var(--radius-lg)',borderLeft:'4px solid var(--apple-green)'}}>
                <div style={{display:'flex',alignItems:'center',gap:'var(--spacing-sm)',marginBottom:'var(--spacing-sm)'}}>
                  <div style={{background:'var(--apple-green)',color:'white',borderRadius:'50%',width:32,height:32,display:'flex',alignItems:'center',justifyContent:'center',fontWeight:'bold'}}>2</div>
                  <strong style={{fontSize:'var(--font-size-lg)',color:'var(--apple-green)'}}>Improve Gaze/Cursor Mapping</strong>
                </div>
                <ul style={{margin:0,paddingLeft:'48px',color:'var(--apple-gray)'}}>
                  <li>Add relative and absolute cursor control modes</li>
                  <li>Per-axis sensitivity and deadzone configuration</li>
                  <li>Advanced smoothing filters (exponential, biquad, Kalman)</li>
                </ul>
              </div>
              <div style={{background:'linear-gradient(135deg, rgba(255,159,10,0.08), rgba(255,159,10,0.02))',padding:'var(--spacing-lg)',borderRadius:'var(--radius-lg)',borderLeft:'4px solid var(--apple-orange)'}}>
                <div style={{display:'flex',alignItems:'center',gap:'var(--spacing-sm)',marginBottom:'var(--spacing-sm)'}}>
                  <div style={{background:'var(--apple-orange)',color:'white',borderRadius:'50%',width:32,height:32,display:'flex',alignItems:'center',justifyContent:'center',fontWeight:'bold'}}>3</div>
                  <strong style={{fontSize:'var(--font-size-lg)',color:'var(--apple-orange)'}}>Add Gesture Mapping UI</strong>
                </div>
                <ul style={{margin:0,paddingLeft:'48px',color:'var(--apple-gray)'}}>
                  <li>Simple GUI for binding gestures to mouse/keyboard actions</li>
                  <li>Visual gesture recorder and tester</li>
                </ul>
              </div>
              <div style={{background:'linear-gradient(135deg, rgba(191,90,242,0.08), rgba(191,90,242,0.02))',padding:'var(--spacing-lg)',borderRadius:'var(--radius-lg)',borderLeft:'4px solid var(--apple-purple)'}}>
                <div style={{display:'flex',alignItems:'center',gap:'var(--spacing-sm)',marginBottom:'var(--spacing-sm)'}}>
                  <div style={{background:'var(--apple-purple)',color:'white',borderRadius:'50%',width:32,height:32,display:'flex',alignItems:'center',justifyContent:'center',fontWeight:'bold'}}>4</div>
                  <strong style={{fontSize:'var(--font-size-lg)',color:'var(--apple-purple)'}}>Per-Game Profiles & Presets</strong>
                </div>
                <ul style={{margin:0,paddingLeft:'48px',color:'var(--apple-gray)'}}>
                  <li>Save and load gesture configurations per game</li>
                  <li>Share community presets for popular games</li>
                </ul>
              </div>
              <div style={{background:'linear-gradient(135deg, rgba(255,55,95,0.08), rgba(255,55,95,0.02))',padding:'var(--spacing-lg)',borderRadius:'var(--radius-lg)',borderLeft:'4px solid var(--apple-red)'}}>
                <div style={{display:'flex',alignItems:'center',gap:'var(--spacing-sm)',marginBottom:'var(--spacing-sm)'}}>
                  <div style={{background:'var(--apple-red)',color:'white',borderRadius:'50%',width:32,height:32,display:'flex',alignItems:'center',justifyContent:'center',fontWeight:'bold'}}>5</div>
                  <strong style={{fontSize:'var(--font-size-lg)',color:'var(--apple-red)'}}>Optimize Performance & Latency</strong>
                </div>
                <ul style={{margin:0,paddingLeft:'48px',color:'var(--apple-gray)'}}>
                  <li>Reduce end-to-end latency below 20ms</li>
                  <li>Optimize for real-time gaming scenarios</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="content-section">
            <h2 className="section-title"><Sparkles size={24} />Key Technologies</h2>
            <div style={{background:'var(--bg-accent-light)',padding:'var(--spacing-xl)',borderRadius:'var(--radius-lg)'}}>
              <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(250px,1fr))',gap:'var(--spacing-lg)'}}>
                <div>
                  <Camera size={24} style={{color:'var(--apple-blue)',marginBottom:'var(--spacing-sm)'}} />
                  <h3 style={{margin:'var(--spacing-xs) 0',color:'var(--apple-blue)'}}>Computer Vision</h3>
                  <div style={{display:'flex',flexWrap:'wrap',gap:'var(--spacing-xs)',marginTop:'var(--spacing-sm)'}}>
                    <TechIconChip technology="OpenCV" />
                    <TechIconChip technology="Mediapipe" />
                  </div>
                </div>
                <div>
                  <Eye size={24} style={{color:'var(--apple-green)',marginBottom:'var(--spacing-sm)'}} />
                  <h3 style={{margin:'var(--spacing-xs) 0',color:'var(--apple-green)'}}>Detection & Tracking</h3>
                  <p style={{fontSize:'var(--font-size-sm)',color:'var(--apple-gray)',margin:0}}>Face mesh, landmark extraction, EAR calculation, head pose estimation</p>
                </div>
                <div>
                  <MousePointer2 size={24} style={{color:'var(--apple-orange)',marginBottom:'var(--spacing-sm)'}} />
                  <h3 style={{margin:'var(--spacing-xs) 0',color:'var(--apple-orange)'}}>Input Control</h3>
                  <div style={{display:'flex',flexWrap:'wrap',gap:'var(--spacing-xs)',marginTop:'var(--spacing-sm)'}}>
                    <TechIconChip technology="PyAutoGUI" />
                  </div>
                </div>
                <div>
                  <Zap size={24} style={{color:'var(--apple-purple)',marginBottom:'var(--spacing-sm)'}} />
                  <h3 style={{margin:'var(--spacing-xs) 0',color:'var(--apple-purple)'}}>Processing</h3>
                  <div style={{display:'flex',flexWrap:'wrap',gap:'var(--spacing-xs)',marginTop:'var(--spacing-sm)'}}>
                    <TechIconChip technology="NumPy" />
                    <TechIconChip technology="Python" />
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

export default GodsEye;
