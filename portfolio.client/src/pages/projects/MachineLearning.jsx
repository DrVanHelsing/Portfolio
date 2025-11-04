import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import AnimatedBackground from '../../components/AnimatedBackground';
import AnimatedChart from '../../components/AnimatedChart';
import TechIconChip from '../../components/TechIconChip';
import SEO from '../../components/SEO';
import { 
  ArrowLeft, Brain, Code2, CheckCircle2, BookOpen, TrendingUp, BarChart3, 
  Zap, Target, Calendar, Image, MessageSquare, Database, GitBranch,
  Layers, Activity, Sparkles, FolderTree
} from 'lucide-react';
import './ProjectDetail.css';
import '../../components/ArchitectureDiagram.css';

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
        title="Neural Networks & Machine Learning | Tredir Sewpaul"
        description="Comprehensive machine learning research and implementation repository with neural networks, optimization algorithms, and model evaluation."
        keywords="machine learning, neural networks, Python, deep learning, AI research"
        path="/projects/machine-learning"
      />
      <AnimatedBackground variant="particles" />
      
      <motion.div className="project-detail-container" initial="hidden" animate="visible" variants={containerVariants}>
        <Link to="/projects" className="back-link" style={{display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--apple-blue)', marginBottom: 'var(--spacing-xl)', textDecoration: 'none'}}>
          <ArrowLeft size={20} />
          Back to Projects
        </Link>

        <motion.div className="project-header" variants={itemVariants}>
          <div className="project-badge">
            <BookOpen size={16} style={{display: 'inline', marginRight: '4px'}} />
            Research & Education
          </div>
          <h1 className="project-title">Neural Networks Lab</h1>
          <p className="project-subtitle">
            From-scratch implementations and experiments covering the fundamentals of machine learning and deep neural networks
          </p>
          <div className="project-badges" style={{marginTop:'var(--spacing-sm)'}}>
            <span className="status-badge" style={{background:'var(--bg-accent-light)'}}>
              <Calendar size={16} style={{display:'inline',marginRight:4}} />
              2024
            </span>
          </div>
          
          <div style={{marginTop:'var(--spacing-lg)',display:'flex',gap:'var(--spacing-sm)',flexWrap:'wrap'}}>
            <TechIconChip technology="Python" />
            <TechIconChip technology="PyTorch" />
            <TechIconChip technology="TensorFlow" />
            <TechIconChip technology="scikit-learn" />
            <TechIconChip technology="NumPy" />
            <TechIconChip technology="Pandas" />
            <TechIconChip technology="Jupyter" />
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
                A comprehensive research repository demonstrating deep understanding of machine learning fundamentals through 
                implementation from scratch. Covers neural network architecture, forward/backward propagation, optimization 
                algorithms, and model evaluation across multiple domains including computer vision, NLP, and tabular data.
              </p>
            </div>
          </motion.div>

          <motion.div className="content-section" variants={itemVariants}>
            <h2 className="section-title"><FolderTree size={24} />Project Structure</h2>
            <div style={{background:'var(--bg-accent-light)',padding:'var(--spacing-xl)',borderRadius:'var(--radius-lg)',overflowX:'auto'}}>
              <table style={{width:'100%',borderCollapse:'collapse'}}>
                <thead>
                  <tr style={{borderBottom:'2px solid var(--apple-gray-light)'}}>
                    <th style={{padding:'var(--spacing-md)',textAlign:'left',color:'var(--apple-blue)'}}>Directory</th>
                    <th style={{padding:'var(--spacing-md)',textAlign:'left',color:'var(--apple-blue)'}}>Purpose</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{borderBottom:'1px solid var(--apple-gray-light)'}}>
                    <td style={{padding:'var(--spacing-md)',fontFamily:'monospace'}}>data/</td>
                    <td style={{padding:'var(--spacing-md)'}}>Dataset downloaders and preprocessing scripts</td>
                  </tr>
                  <tr style={{borderBottom:'1px solid var(--apple-gray-light)'}}>
                    <td style={{padding:'var(--spacing-md)',fontFamily:'monospace'}}>notebooks/</td>
                    <td style={{padding:'var(--spacing-md)'}}>Jupyter notebooks for experiments and visualizations</td>
                  </tr>
                  <tr style={{borderBottom:'1px solid var(--apple-gray-light)'}}>
                    <td style={{padding:'var(--spacing-md)',fontFamily:'monospace'}}>src/</td>
                    <td style={{padding:'var(--spacing-md)'}}>Source code for models, training loops, and utilities</td>
                  </tr>
                  <tr style={{borderBottom:'1px solid var(--apple-gray-light)'}}>
                    <td style={{padding:'var(--spacing-md)',fontFamily:'monospace'}}>models/</td>
                    <td style={{padding:'var(--spacing-md)'}}>Trained model checkpoints and fetch scripts</td>
                  </tr>
                  <tr style={{borderBottom:'1px solid var(--apple-gray-light)'}}>
                    <td style={{padding:'var(--spacing-md)',fontFamily:'monospace'}}>scripts/</td>
                    <td style={{padding:'var(--spacing-md)'}}>CLI tools for training, evaluation, and preprocessing</td>
                  </tr>
                  <tr style={{borderBottom:'1px solid var(--apple-gray-light)'}}>
                    <td style={{padding:'var(--spacing-md)',fontFamily:'monospace'}}>configs/</td>
                    <td style={{padding:'var(--spacing-md)'}}>YAML configuration files for experiments</td>
                  </tr>
                  <tr>
                    <td style={{padding:'var(--spacing-md)',fontFamily:'monospace'}}>tests/</td>
                    <td style={{padding:'var(--spacing-md)'}}>Unit and integration tests</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </motion.div>

          <motion.div className="content-section" variants={itemVariants}>
            <h2 className="section-title"><BarChart3 size={24} />Experiment Results</h2>
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit, minmax(400px,1fr))',gap:'var(--spacing-lg)',maxWidth:'1200px',margin:'0 auto'}}>
              <AnimatedChart
                title="Image Classification Accuracy"
                data={[
                  {label:'MNIST CNN',value:98.5},
                  {label:'CIFAR-10 ResNet18',value:89.2},
                  {label:'MNIST MLP Baseline',value:95.3}
                ]}
                type="bar"
                showValues
                height={240}
                colorMap={{
                  'MNIST CNN':'var(--apple-blue)',
                  'CIFAR-10 ResNet18':'var(--apple-indigo)',
                  'MNIST MLP Baseline':'var(--apple-gray)'
                }}
              />
              <AnimatedChart
                title="Text Classification Accuracy"
                data={[
                  {label:'IMDB Transformer',value:92.8},
                  {label:'IMDB BiLSTM',value:88.5},
                  {label:'AG News (4-class)',value:91.2}
                ]}
                type="bar"
                showValues
                height={240}
                colorMap={{
                  'IMDB Transformer':'var(--apple-purple)',
                  'IMDB BiLSTM':'var(--apple-pink)',
                  'AG News (4-class)':'var(--apple-orange)'
                }}
              />
              <AnimatedChart
                title="Training Epochs Distribution"
                data={[
                  {label:'MNIST',value:10},
                  {label:'CIFAR-10',value:50},
                  {label:'IMDB',value:20},
                  {label:'Tabular',value:15}
                ]}
                type="pie"
                height={240}
              />
              <AnimatedChart
                title="Model Complexity (Parameters in M)"
                data={[
                  {label:'Small CNN',value:0.5},
                  {label:'ResNet18',value:11.2},
                  {label:'BiLSTM',value:2.3},
                  {label:'Transformer',value:8.7}
                ]}
                type="donut"
                height={240}
              />
            </div>
          </motion.div>

          <motion.div className="content-section" variants={itemVariants}>
            <h2 className="section-title"><Image size={24} />1. Image Classification</h2>
            <div style={{background:'linear-gradient(135deg, rgba(10,132,255,0.08), rgba(10,132,255,0.02))',padding:'var(--spacing-xl)',borderRadius:'var(--radius-lg)',borderLeft:'4px solid var(--apple-blue)'}}>
              <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(250px,1fr))',gap:'var(--spacing-lg)',marginBottom:'var(--spacing-lg)'}}>
                <div>
                  <h3 style={{margin:'0 0 var(--spacing-sm) 0',color:'var(--apple-blue)'}}>MNIST Digits</h3>
                  <p style={{fontSize:'var(--font-size-sm)',color:'var(--apple-gray)',margin:'0 0 var(--spacing-sm) 0'}}>Handwritten digit classification (0-9)</p>
                  <div style={{display:'flex',flexWrap:'wrap',gap:'var(--spacing-xs)'}}>
                    <span style={{background:'var(--apple-blue)',color:'white',padding:'4px 8px',borderRadius:'var(--radius-sm)',fontSize:'var(--font-size-xs)'}}>Small CNN</span>
                    <span style={{background:'var(--apple-indigo)',color:'white',padding:'4px 8px',borderRadius:'var(--radius-sm)',fontSize:'var(--font-size-xs)'}}>MLP Baseline</span>
                  </div>
                  <div className="info-card-sm" style={{marginTop:'var(--spacing-sm)'}}>
                    <strong>Accuracy:</strong> 98-99% (5-10 epochs)
                  </div>
                </div>
                <div>
                  <h3 style={{margin:'0 0 var(--spacing-sm) 0',color:'var(--apple-indigo)'}}>CIFAR-10</h3>
                  <p style={{fontSize:'var(--font-size-sm)',color:'var(--apple-gray)',margin:'0 0 var(--spacing-sm) 0'}}>10-class natural image classification</p>
                  <div style={{display:'flex',flexWrap:'wrap',gap:'var(--spacing-xs)'}}>
                    <span style={{background:'var(--apple-indigo)',color:'white',padding:'4px 8px',borderRadius:'var(--radius-sm)',fontSize:'var(--font-size-xs)'}}>ResNet18</span>
                  </div>
                  <div className="info-card-sm" style={{marginTop:'var(--spacing-sm)'}}>
                    <strong>Accuracy:</strong> 85-92% (with augmentation)
                  </div>
                </div>
              </div>
              <div className="code-block">
                <strong>Key Features:</strong> Data augmentation, batch normalization, dropout regularization, learning rate scheduling
              </div>
            </div>
          </motion.div>

          <motion.div className="content-section" variants={itemVariants}>
            <h2 className="section-title"><MessageSquare size={24} />2. Text Classification</h2>
            <div style={{background:'linear-gradient(135deg, rgba(191,90,242,0.08), rgba(191,90,242,0.02))',padding:'var(--spacing-xl)',borderRadius:'var(--radius-lg)',borderLeft:'4px solid var(--apple-purple)'}}>
              <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(250px,1fr))',gap:'var(--spacing-lg)',marginBottom:'var(--spacing-lg)'}}>
                <div>
                  <h3 style={{margin:'0 0 var(--spacing-sm) 0',color:'var(--apple-purple)'}}>IMDB Sentiment</h3>
                  <p style={{fontSize:'var(--font-size-sm)',color:'var(--apple-gray)',margin:'0 0 var(--spacing-sm) 0'}}>Binary sentiment classification</p>
                  <div style={{display:'flex',flexWrap:'wrap',gap:'var(--spacing-xs)'}}>
                    <span style={{background:'var(--apple-purple)',color:'white',padding:'4px 8px',borderRadius:'var(--radius-sm)',fontSize:'var(--font-size-xs)'}}>BiLSTM</span>
                    <span style={{background:'var(--apple-pink)',color:'white',padding:'4px 8px',borderRadius:'var(--radius-sm)',fontSize:'var(--font-size-xs)'}}>Transformer</span>
                  </div>
                  <div className="info-card-sm" style={{marginTop:'var(--spacing-sm)'}}>
                    <strong>BiLSTM:</strong> 86-90% | <strong>Transformer:</strong> 90-94%
                  </div>
                </div>
                <div>
                  <h3 style={{margin:'0 0 var(--spacing-sm) 0',color:'var(--apple-pink)'}}>AG News</h3>
                  <p style={{fontSize:'var(--font-size-sm)',color:'var(--apple-gray)',margin:'0 0 var(--spacing-sm) 0'}}>4-class topic classification</p>
                  <div style={{display:'flex',flexWrap:'wrap',gap:'var(--spacing-xs)'}}>
                    <span style={{background:'var(--apple-pink)',color:'white',padding:'4px 8px',borderRadius:'var(--radius-sm)',fontSize:'var(--font-size-xs)'}}>Transformer</span>
                  </div>
                  <div className="info-card-sm" style={{marginTop:'var(--spacing-sm)'}}>
                    <strong>Accuracy:</strong> ~91%
                  </div>
                </div>
              </div>
              <div className="code-block">
                <strong>Key Features:</strong> Pretrained embeddings, custom tokenizer, attention mechanisms, sequence padding
              </div>
            </div>
          </motion.div>

          <motion.div className="content-section" variants={itemVariants}>
            <h2 className="section-title"><Database size={24} />3. Tabular Prediction</h2>
            <div style={{background:'linear-gradient(135deg, rgba(52,199,89,0.08), rgba(52,199,89,0.02))',padding:'var(--spacing-xl)',borderRadius:'var(--radius-lg)',borderLeft:'4px solid var(--apple-green)'}}>
              <div style={{marginBottom:'var(--spacing-lg)'}}>
                <p style={{fontSize:'var(--font-size-sm)',color:'var(--apple-gray)',margin:'0 0 var(--spacing-sm) 0'}}>Regression and classification on structured data</p>
                <div style={{display:'flex',flexWrap:'wrap',gap:'var(--spacing-xs)'}}>
                  <span style={{background:'var(--apple-green)',color:'white',padding:'4px 8px',borderRadius:'var(--radius-sm)',fontSize:'var(--font-size-xs)'}}>XGBoost</span>
                  <span style={{background:'var(--apple-teal)',color:'white',padding:'4px 8px',borderRadius:'var(--radius-sm)',fontSize:'var(--font-size-xs)'}}>LightGBM</span>
                  <span style={{background:'var(--apple-blue)',color:'white',padding:'4px 8px',borderRadius:'var(--radius-sm)',fontSize:'var(--font-size-xs)'}}>Feedforward NN</span>
                </div>
              </div>
              <div className="code-block">
                <strong>Datasets:</strong> UCI datasets (Wine Quality, Housing), synthetic data for testing
                <br/>
                <strong>Preprocessing:</strong> Imputation, scaling, categorical encoding, feature engineering
              </div>
            </div>
          </motion.div>

          <motion.div className="content-section" variants={itemVariants}>
            <h2 className="section-title"><GitBranch size={24} />4. Unsupervised Learning</h2>
            <div style={{background:'linear-gradient(135deg, rgba(255,159,10,0.08), rgba(255,159,10,0.02))',padding:'var(--spacing-xl)',borderRadius:'var(--radius-lg)',borderLeft:'4px solid var(--apple-orange)'}}>
              <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))',gap:'var(--spacing-md)',marginBottom:'var(--spacing-lg)'}}>
                <div className="info-card" style={{textAlign:'center'}}>
                  <Layers size={24} style={{color:'var(--apple-orange)',margin:'0 auto var(--spacing-xs)'}} />
                  <strong>PCA</strong>
                  <div style={{fontSize:'var(--font-size-xs)',color:'var(--apple-gray)'}}>Dimensionality Reduction</div>
                </div>
                <div className="info-card" style={{textAlign:'center'}}>
                  <Activity size={24} style={{color:'var(--apple-orange)',margin:'0 auto var(--spacing-xs)'}} />
                  <strong>t-SNE</strong>
                  <div style={{fontSize:'var(--font-size-xs)',color:'var(--apple-gray)'}}>Visualization</div>
                </div>
                <div className="info-card" style={{textAlign:'center'}}>
                  <Target size={24} style={{color:'var(--apple-orange)',margin:'0 auto var(--spacing-xs)'}} />
                  <strong>KMeans</strong>
                  <div style={{fontSize:'var(--font-size-xs)',color:'var(--apple-gray)'}}>Clustering</div>
                </div>
                <div className="info-card" style={{textAlign:'center'}}>
                  <Brain size={24} style={{color:'var(--apple-orange)',margin:'0 auto var(--spacing-xs)'}} />
                  <strong>Autoencoders</strong>
                  <div style={{fontSize:'var(--font-size-xs)',color:'var(--apple-gray)'}}>Feature Learning</div>
                </div>
              </div>
              <div className="code-block">
                <strong>Applications:</strong> MNIST embedding visualization, clustering quality metrics (NMI, ARI), representation learning
              </div>
            </div>
          </motion.div>

          <motion.div className="content-section" variants={itemVariants}>
            <h2 className="section-title"><Image size={24} />5. Segmentation</h2>
            <div style={{background:'linear-gradient(135deg, rgba(255,55,95,0.08), rgba(255,55,95,0.02))',padding:'var(--spacing-xl)',borderRadius:'var(--radius-lg)',borderLeft:'4px solid var(--apple-red)'}}>
              <div style={{marginBottom:'var(--spacing-lg)'}}>
                <p style={{fontSize:'var(--font-size-sm)',color:'var(--apple-gray)',margin:'0 0 var(--spacing-sm) 0'}}>Semantic segmentation reference implementations</p>
                <div style={{display:'flex',flexWrap:'wrap',gap:'var(--spacing-xs)'}}>
                  <span style={{background:'var(--apple-red)',color:'white',padding:'4px 8px',borderRadius:'var(--radius-sm)',fontSize:'var(--font-size-xs)'}}>U-Net</span>
                </div>
              </div>
              <div className="code-block">
                <strong>Datasets:</strong> Cityscapes/VOC subsets, synthetic masks
                <br/>
                <strong>Metrics:</strong> IoU (Intersection over Union) baselines, qualitative segmentation masks
              </div>
            </div>
          </motion.div>

          <motion.div className="content-section" variants={itemVariants}>
            <h2 className="section-title"><Sparkles size={24} />Technical Stack</h2>
            <div style={{background:'var(--bg-accent-light)',padding:'var(--spacing-xl)',borderRadius:'var(--radius-lg)'}}>
              <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(250px,1fr))',gap:'var(--spacing-lg)'}}>
                <div>
                  <Brain size={24} style={{color:'var(--apple-blue)',marginBottom:'var(--spacing-sm)'}} />
                  <h3 style={{margin:'var(--spacing-xs) 0',color:'var(--apple-blue)'}}>Deep Learning</h3>
                  <div style={{display:'flex',flexWrap:'wrap',gap:'var(--spacing-xs)',marginTop:'var(--spacing-sm)'}}>
                    <TechIconChip technology="PyTorch" />
                    <TechIconChip technology="TensorFlow" />
                  </div>
                </div>
                <div>
                  <BarChart3 size={24} style={{color:'var(--apple-green)',marginBottom:'var(--spacing-sm)'}} />
                  <h3 style={{margin:'var(--spacing-xs) 0',color:'var(--apple-green)'}}>ML Libraries</h3>
                  <div style={{display:'flex',flexWrap:'wrap',gap:'var(--spacing-xs)',marginTop:'var(--spacing-sm)'}}>
                    <TechIconChip technology="scikit-learn" />
                    <TechIconChip technology="XGBoost" />
                  </div>
                </div>
                <div>
                  <Code2 size={24} style={{color:'var(--apple-purple)',marginBottom:'var(--spacing-sm)'}} />
                  <h3 style={{margin:'var(--spacing-xs) 0',color:'var(--apple-purple)'}}>Data Processing</h3>
                  <div style={{display:'flex',flexWrap:'wrap',gap:'var(--spacing-xs)',marginTop:'var(--spacing-sm)'}}>
                    <TechIconChip technology="NumPy" />
                    <TechIconChip technology="Pandas" />
                  </div>
                </div>
                <div>
                  <BookOpen size={24} style={{color:'var(--apple-orange)',marginBottom:'var(--spacing-sm)'}} />
                  <h3 style={{margin:'var(--spacing-xs) 0',color:'var(--apple-orange)'}}>Research Tools</h3>
                  <div style={{display:'flex',flexWrap:'wrap',gap:'var(--spacing-xs)',marginTop:'var(--spacing-sm)'}}>
                    <TechIconChip technology="Jupyter" />
                    <TechIconChip technology="Python" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div className="content-section" variants={itemVariants}>
            <h2 className="section-title"><CheckCircle2 size={24} />Key Implementations</h2>
            <div style={{display:'grid',gap:'var(--spacing-md)'}}>
              <div style={{background:'var(--bg-accent-light)',padding:'var(--spacing-lg)',borderRadius:'var(--radius-md)',borderLeft:'4px solid var(--apple-blue)'}}>
                <div style={{display:'flex',alignItems:'center',gap:'var(--spacing-sm)',marginBottom:'var(--spacing-sm)'}}>
                  <Brain size={20} style={{color:'var(--apple-blue)'}} />
                  <strong style={{color:'var(--apple-blue)'}}>Neural Network From Scratch</strong>
                </div>
                <p style={{margin:0,color:'var(--apple-gray)',fontSize:'var(--font-size-sm)'}}>Complete implementation of forward propagation, backpropagation, and gradient descent using only NumPy. Includes gradient checking and multiple activation functions.</p>
              </div>
              <div style={{background:'var(--bg-accent-light)',padding:'var(--spacing-lg)',borderRadius:'var(--radius-md)',borderLeft:'4px solid var(--apple-green)'}}>
                <div style={{display:'flex',alignItems:'center',gap:'var(--spacing-sm)',marginBottom:'var(--spacing-sm)'}}>
                  <Zap size={20} style={{color:'var(--apple-green)'}} />
                  <strong style={{color:'var(--apple-green)'}}>Optimization Algorithms</strong>
                </div>
                <p style={{margin:0,color:'var(--apple-gray)',fontSize:'var(--font-size-sm)'}}>SGD, Adam, RMSprop with learning rate scheduling, momentum, and adaptive learning rates. Includes visualization of convergence paths.</p>
              </div>
              <div style={{background:'var(--bg-accent-light)',padding:'var(--spacing-lg)',borderRadius:'var(--radius-md)',borderLeft:'4px solid var(--apple-purple)'}}>
                <div style={{display:'flex',alignItems:'center',gap:'var(--spacing-sm)',marginBottom:'var(--spacing-sm)'}}>
                  <Activity size={20} style={{color:'var(--apple-purple)'}} />
                  <strong style={{color:'var(--apple-purple)'}}>Regularization Techniques</strong>
                </div>
                <p style={{margin:0,color:'var(--apple-gray)',fontSize:'var(--font-size-sm)'}}>L1/L2 regularization, dropout, batch normalization, data augmentation, and early stopping to prevent overfitting.</p>
              </div>
              <div style={{background:'var(--bg-accent-light)',padding:'var(--spacing-lg)',borderRadius:'var(--radius-md)',borderLeft:'4px solid var(--apple-orange)'}}>
                <div style={{display:'flex',alignItems:'center',gap:'var(--spacing-sm)',marginBottom:'var(--spacing-sm)'}}>
                  <TrendingUp size={20} style={{color:'var(--apple-orange)'}} />
                  <strong style={{color:'var(--apple-orange)'}}>Reproducible Experiments</strong>
                </div>
                <p style={{margin:0,color:'var(--apple-gray)',fontSize:'var(--font-size-sm)'}}>YAML-based configuration management, deterministic seeding, comprehensive logging with TensorBoard, and checkpoint management.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default MachineLearning;
