import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import AnimatedBackground from '../../components/sections/AnimatedBackground';
import TechIconChip from '../../components/ui/TechIconChip';
import SEO from '../../components/utility/SEO';
import { 
  ArrowLeft, Brain, Code2, CheckCircle2, BookOpen, TrendingUp, BarChart3, 
  Zap, Target, Calendar, GitBranch, Layers, Activity, Sparkles, FolderTree
} from 'lucide-react';
import './ProjectDetail.css';
import '../../components/sections/ArchitectureDiagram.css';

const MachineLearning = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="project-detail-page">
      <SEO 
        title="Machine Learning Basics | Tredir Sewpaul"
        description="Foundational machine learning assignments: Linear Regression, Logistic Regression, and Neural Networks implemented from scratch with experiments and visualizations."
        keywords="machine learning, linear regression, logistic regression, neural networks, Python, supervised learning"
        path="/projects/machine-learning"
      />
      <AnimatedBackground variant="orbs" />
      
      <motion.div className="project-detail-container" initial="hidden" animate="visible" variants={containerVariants}>
        <Link to="/projects" className="back-link" style={{display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--apple-blue)', marginBottom: 'var(--spacing-xl)', textDecoration: 'none'}}>
          <ArrowLeft size={20} />
          Back to Projects
        </Link>

        <motion.div className="project-header" variants={itemVariants}>
          <div className="project-badge">
            <BookOpen size={16} style={{display: 'inline', marginRight: '4px'}} />
            Educational & Hands-On
          </div>
          <h1 className="project-title">Machine Learning Basics</h1>
          <p className="project-subtitle">
            Three foundational supervised learning assignments implemented from scratch in Jupyter notebooks: Linear Regression, Logistic Regression, and Neural Networks with backpropagation
          </p>
          <div className="project-badges" style={{marginTop:'var(--spacing-sm)'}}>
            <span className="status-badge" style={{background:'var(--bg-accent-light)'}}>
              <Calendar size={16} style={{display:'inline',marginRight:4}} />
              2024
            </span>
          </div>
          
          <div style={{marginTop:'var(--spacing-lg)',display:'flex',gap:'var(--spacing-sm)',flexWrap:'wrap'}}>
            <TechIconChip technology="Python" />
            <TechIconChip technology="NumPy" />
            <TechIconChip technology="Jupyter" />
            <TechIconChip technology="scikit-learn" />
            <TechIconChip technology="Matplotlib" />
            <TechIconChip technology="Pandas" />
          </div>

          <div className="project-links">
            <a href="https://github.com/DrVanHelsing/MachineLearning" target="_blank" rel="noopener noreferrer" className="project-link-btn">
              <Code2 size={20} />
              View on GitHub
            </a>
          </div>
        </motion.div>

        <div className="project-content">
          <motion.div className="content-section" variants={itemVariants}>
            <h2 className="section-title"><Brain size={24} />Overview</h2>
            <div className="section-content">
              <p>
                Three hands-on Jupyter notebook assignments demonstrating foundational supervised learning algorithms. 
                Each notebook combines theory notes, executable code cells, and experiments with hyperparameters (learning rate, 
                polynomial degree, hidden units) to illustrate core machine learning concepts including gradient descent, 
                regularization, and neural network backpropagation.
              </p>
            </div>
          </motion.div>

          <motion.div className="content-section" variants={itemVariants}>
            <h2 className="section-title"><FolderTree size={24} />Assignment Structure</h2>
            <div style={{background:'var(--bg-accent-light)',padding:'var(--spacing-xl)',borderRadius:'var(--radius-lg)',overflowX:'auto'}}>
              <table style={{width:'100%',borderCollapse:'collapse'}}>
                <thead>
                  <tr style={{borderBottom:'2px solid var(--apple-gray-light)'}}>
                    <th style={{padding:'var(--spacing-md)',textAlign:'left',color:'var(--apple-blue)'}}>Assignment</th>
                    <th style={{padding:'var(--spacing-md)',textAlign:'left',color:'var(--apple-blue)'}}>Notebook Path</th>
                    <th style={{padding:'var(--spacing-md)',textAlign:'left',color:'var(--apple-blue)'}}>Focus</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{borderBottom:'1px solid var(--apple-gray-light)'}}>
                    <td style={{padding:'var(--spacing-md)',fontWeight:'600'}}>Linear Regression</td>
                    <td style={{padding:'var(--spacing-md)',fontFamily:'monospace',fontSize:'var(--font-size-sm)'}}>Linear Regression/CSC312 - Assignment 1 - Linear Regression.ipynb</td>
                    <td style={{padding:'var(--spacing-md)'}}>Hypothesis functions, MSE cost, gradient descent, polynomial features</td>
                  </tr>
                  <tr style={{borderBottom:'1px solid var(--apple-gray-light)'}}>
                    <td style={{padding:'var(--spacing-md)',fontWeight:'600'}}>Logistic Regression</td>
                    <td style={{padding:'var(--spacing-md)',fontFamily:'monospace',fontSize:'var(--font-size-sm)'}}>Logistic Regression/CSC312 - Assignment 2 - Logistic Regression.ipynb</td>
                    <td style={{padding:'var(--spacing-md)'}}>Sigmoid activation, cross-entropy, decision boundaries, regularization</td>
                  </tr>
                  <tr>
                    <td style={{padding:'var(--spacing-md)',fontWeight:'600'}}>Neural Networks</td>
                    <td style={{padding:'var(--spacing-md)',fontFamily:'monospace',fontSize:'var(--font-size-sm)'}}>Neural Networks/CSC312 - Assignment 3 - Neural Networks.ipynb</td>
                    <td style={{padding:'var(--spacing-md)'}}>Feedforward propagation, backpropagation, multi-class classification</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </motion.div>

          <motion.div className="content-section" variants={itemVariants}>
            <h2 className="section-title"><TrendingUp size={24} />Assignment 1: Linear Regression</h2>
            <div style={{background:'linear-gradient(135deg, rgba(10,132,255,0.08), rgba(10,132,255,0.02))',padding:'var(--spacing-xl)',borderRadius:'var(--radius-lg)',borderLeft:'4px solid var(--apple-blue)'}}>
              <p style={{fontSize:'var(--font-size-sm)',color:'var(--apple-gray)',marginBottom:'var(--spacing-lg)'}}>
                Introduction to regression tasks with linear models. Implements hypothesis functions, mean squared error cost, 
                and gradient descent optimization. Features polynomial feature expansion and normalization.
              </p>
              <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))',gap:'var(--spacing-md)',marginBottom:'var(--spacing-lg)'}}>
                <div className="info-card">
                  <Target size={20} style={{color:'var(--apple-blue)',marginBottom:'var(--spacing-xs)'}} />
                  <strong>Cost Function</strong>
                  <div style={{fontSize:'var(--font-size-xs)',color:'var(--apple-gray)'}}>Mean Squared Error</div>
                </div>
                <div className="info-card">
                  <TrendingUp size={20} style={{color:'var(--apple-blue)',marginBottom:'var(--spacing-xs)'}} />
                  <strong>Optimization</strong>
                  <div style={{fontSize:'var(--font-size-xs)',color:'var(--apple-gray)'}}>Gradient Descent + Closed-Form</div>
                </div>
                <div className="info-card">
                  <Sparkles size={20} style={{color:'var(--apple-blue)',marginBottom:'var(--spacing-xs)'}} />
                  <strong>Feature Engineering</strong>
                  <div style={{fontSize:'var(--font-size-xs)',color:'var(--apple-gray)'}}>Polynomial Expansion</div>
                </div>
              </div>
              <div className="code-block">
                <strong>Key Experiments:</strong> Learning rate tuning, polynomial degree comparison (underfitting vs. overfitting), 
                training loss curves, and prediction visualizations
              </div>
            </div>
          </motion.div>

          <motion.div className="content-section" variants={itemVariants}>
            <h2 className="section-title"><Target size={24} />Assignment 2: Logistic Regression</h2>
            <div style={{background:'linear-gradient(135deg, rgba(191,90,242,0.08), rgba(191,90,242,0.02))',padding:'var(--spacing-xl)',borderRadius:'var(--radius-lg)',borderLeft:'4px solid var(--apple-purple)'}}>
              <p style={{fontSize:'var(--font-size-sm)',color:'var(--apple-gray)',marginBottom:'var(--spacing-lg)'}}>
                Binary classification using logistic regression. Covers sigmoid activation, cross-entropy cost, gradient descent, 
                and decision boundary visualization. Optional regularization to control overfitting.
              </p>
              <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))',gap:'var(--spacing-md)',marginBottom:'var(--spacing-lg)'}}>
                <div className="info-card">
                  <Activity size={20} style={{color:'var(--apple-purple)',marginBottom:'var(--spacing-xs)'}} />
                  <strong>Activation</strong>
                  <div style={{fontSize:'var(--font-size-xs)',color:'var(--apple-gray)'}}>Sigmoid Function</div>
                </div>
                <div className="info-card">
                  <BarChart3 size={20} style={{color:'var(--apple-purple)',marginBottom:'var(--spacing-xs)'}} />
                  <strong>Cost Function</strong>
                  <div style={{fontSize:'var(--font-size-xs)',color:'var(--apple-gray)'}}>Cross-Entropy Loss</div>
                </div>
                <div className="info-card">
                  <CheckCircle2 size={20} style={{color:'var(--apple-purple)',marginBottom:'var(--spacing-xs)'}} />
                  <strong>Evaluation</strong>
                  <div style={{fontSize:'var(--font-size-xs)',color:'var(--apple-gray)'}}>Accuracy & Confusion Matrix</div>
                </div>
              </div>
              <div className="code-block">
                <strong>Key Experiments:</strong> Decision boundary plots for separable/non-separable data, L2 regularization effects, 
                accuracy reporting, and gradient descent convergence
              </div>
            </div>
          </motion.div>

          <motion.div className="content-section" variants={itemVariants}>
            <h2 className="section-title"><Brain size={24} />Assignment 3: Neural Networks</h2>
            <div style={{background:'linear-gradient(135deg, rgba(52,199,89,0.08), rgba(52,199,89,0.02))',padding:'var(--spacing-xl)',borderRadius:'var(--radius-lg)',borderLeft:'4px solid var(--apple-green)'}}>
              <p style={{fontSize:'var(--font-size-sm)',color:'var(--apple-gray)',marginBottom:'var(--spacing-lg)'}}>
                Feedforward neural networks with backpropagation for multi-layer models and multi-class classification. 
                Includes forward propagation, backpropagation gradient computation, and optimization loops.
              </p>
              <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))',gap:'var(--spacing-md)',marginBottom:'var(--spacing-lg)'}}>
                <div className="info-card">
                  <Layers size={20} style={{color:'var(--apple-green)',marginBottom:'var(--spacing-xs)'}} />
                  <strong>Architecture</strong>
                  <div style={{fontSize:'var(--font-size-xs)',color:'var(--apple-gray)'}}>Multi-Layer Feedforward</div>
                </div>
                <div className="info-card">
                  <GitBranch size={20} style={{color:'var(--apple-green)',marginBottom:'var(--spacing-xs)'}} />
                  <strong>Training</strong>
                  <div style={{fontSize:'var(--font-size-xs)',color:'var(--apple-gray)'}}>Backpropagation Algorithm</div>
                </div>
                <div className="info-card">
                  <Zap size={20} style={{color:'var(--apple-green)',marginBottom:'var(--spacing-xs)'}} />
                  <strong>Optimization</strong>
                  <div style={{fontSize:'var(--font-size-xs)',color:'var(--apple-gray)'}}>Batch/Mini-Batch GD</div>
                </div>
              </div>
              <div className="code-block">
                <strong>Key Experiments:</strong> Hidden unit variations, learning rate tuning, weight initialization strategies, 
                training/validation accuracy plots, and multi-class predictions
              </div>
            </div>
          </motion.div>

          <motion.div className="content-section" variants={itemVariants}>
            <h2 className="section-title"><Sparkles size={24} />How to Run</h2>
            <div style={{background:'var(--bg-accent-light)',padding:'var(--spacing-xl)',borderRadius:'var(--radius-lg)'}}>
              <div style={{marginBottom:'var(--spacing-lg)'}}>
                <h3 style={{margin:'0 0 var(--spacing-sm) 0',color:'var(--apple-blue)',display:'flex',alignItems:'center',gap:'var(--spacing-xs)'}}>
                  <Code2 size={20} />
                  Installation
                </h3>
                <div className="code-block" style={{fontFamily:'monospace',fontSize:'var(--font-size-sm)'}}>
                  python -m pip install --upgrade pip<br/>
                  pip install jupyterlab notebook numpy scipy matplotlib pandas scikit-learn
                </div>
              </div>
              <div style={{marginBottom:'var(--spacing-lg)'}}>
                <h3 style={{margin:'0 0 var(--spacing-sm) 0',color:'var(--apple-green)',display:'flex',alignItems:'center',gap:'var(--spacing-xs)'}}>
                  <BookOpen size={20} />
                  Launch Jupyter
                </h3>
                <div className="code-block" style={{fontFamily:'monospace',fontSize:'var(--font-size-sm)'}}>
                  jupyter lab<br/>
                  # or<br/>
                  jupyter notebook
                </div>
              </div>
              <div>
                <h3 style={{margin:'0 0 var(--spacing-sm) 0',color:'var(--apple-purple)',display:'flex',alignItems:'center',gap:'var(--spacing-xs)'}}>
                  <Zap size={20} />
                  Run Notebooks
                </h3>
                <p style={{fontSize:'var(--font-size-sm)',color:'var(--apple-gray)',margin:0}}>
                  Open the desired assignment notebook and run cells in order. Each notebook contains inline explanations and 
                  visualization cells. Datasets are either generated inside the notebook or placed alongside it.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div className="content-section" variants={itemVariants}>
            <h2 className="section-title"><CheckCircle2 size={24} />Experimentation Tips</h2>
            <div style={{display:'grid',gap:'var(--spacing-md)'}}>
              <div style={{background:'var(--bg-accent-light)',padding:'var(--spacing-lg)',borderRadius:'var(--radius-md)',borderLeft:'4px solid var(--apple-blue)'}}>
                <div style={{display:'flex',alignItems:'center',gap:'var(--spacing-sm)',marginBottom:'var(--spacing-sm)'}}>
                  <TrendingUp size={20} style={{color:'var(--apple-blue)'}} />
                  <strong style={{color:'var(--apple-blue)'}}>Learning Rate Tuning</strong>
                </div>
                <p style={{margin:0,color:'var(--apple-gray)',fontSize:'var(--font-size-sm)'}}>
                  Try different learning rates and plot the loss curve to observe convergence or divergence. Start with common values like 0.1, 0.01, 0.001.
                </p>
              </div>
              <div style={{background:'var(--bg-accent-light)',padding:'var(--spacing-lg)',borderRadius:'var(--radius-md)',borderLeft:'4px solid var(--apple-green)'}}>
                <div style={{display:'flex',alignItems:'center',gap:'var(--spacing-sm)',marginBottom:'var(--spacing-sm)'}}>
                  <Sparkles size={20} style={{color:'var(--apple-green)'}} />
                  <strong style={{color:'var(--apple-green)'}}>Polynomial Features</strong>
                </div>
                <p style={{margin:0,color:'var(--apple-gray)',fontSize:'var(--font-size-sm)'}}>
                  For linear regression, experiment with polynomial feature degrees (1-10) and compare training vs validation error to observe underfitting/overfitting.
                </p>
              </div>
              <div style={{background:'var(--bg-accent-light)',padding:'var(--spacing-lg)',borderRadius:'var(--radius-md)',borderLeft:'4px solid var(--apple-purple)'}}>
                <div style={{display:'flex',alignItems:'center',gap:'var(--spacing-sm)',marginBottom:'var(--spacing-sm)'}}>
                  <Activity size={20} style={{color:'var(--apple-purple)'}} />
                  <strong style={{color:'var(--apple-purple)'}}>Regularization & Network Size</strong>
                </div>
                <p style={{margin:0,color:'var(--apple-gray)',fontSize:'var(--font-size-sm)'}}>
                  For logistic regression and neural networks, try L2 regularization and different network sizes (hidden units) to observe generalization behavior.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default MachineLearning;
