import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { useState, useEffect, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from './components/layout/Navigation';
import Footer from './components/layout/Footer';
import AnimatedBackground from './components/sections/AnimatedBackground';
import LoadingScreen from './components/utility/LoadingScreen';
import ScrollToTop from './components/ui/ScrollToTop';
import SkipLink from './components/layout/SkipLink';
import './App.css';

// Resets scroll position to top on every route change
function ScrollReset() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// Lazy load pages for code splitting
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Projects = lazy(() => import('./pages/Projects'));
const Skills = lazy(() => import('./pages/Skills'));
const Contact = lazy(() => import('./pages/Contact'));
const Resume = lazy(() => import('./pages/Resume'));

// Lazy load project detail pages
const FinanceBuddy = lazy(() => import('./pages/projects/FinanceBuddy'));
const MachineLearning = lazy(() => import('./pages/projects/MachineLearning'));
const StudentLink = lazy(() => import('./pages/projects/StudentLink'));
const CallCentreAI = lazy(() => import('./pages/projects/CallCentreAI'));
const GodsEye = lazy(() => import('./pages/projects/GodsEye'));
const Hangman = lazy(() => import('./pages/projects/Hangman'));
const TicTacToe = lazy(() => import('./pages/projects/TicTacToe'));
const PostGradPortal = lazy(() => import('./pages/projects/PostGradPortal'));
const GeologyFieldSim = lazy(() => import('./pages/projects/GeologyFieldSim'));
const PhysicsLab = lazy(() => import('./pages/projects/PhysicsLab'));
const AntiTemu = lazy(() => import('./pages/projects/AntiTemu'));

function App() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <HelmetProvider>
      <Router>
        <ScrollReset />
        <AnimatePresence mode="wait">
          {isLoading ? (
            <LoadingScreen key="loading" onEnter={handleLoadingComplete} />
          ) : (
            <motion.div
              key="app"
              className="app"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ 
                duration: 0.5,
                ease: [0.43, 0.13, 0.23, 0.96]
              }}
            >
              <AnimatedBackground variant="orbs" />
              <SkipLink />
              <Navigation />
              <Suspense fallback={<div style={{ minHeight: '100vh' }} />}>
                <main id="main-content" className="main-content">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/projects/financebuddy" element={<FinanceBuddy />} />
                    <Route path="/projects/machine-learning" element={<MachineLearning />} />
                    <Route path="/projects/studentlink" element={<StudentLink />} />
                    <Route path="/projects/callcentre-ai" element={<CallCentreAI />} />
                    <Route path="/projects/godseye" element={<GodsEye />} />
                    <Route path="/projects/hangman" element={<Hangman />} />
                    <Route path="/projects/tictactoe" element={<TicTacToe />} />
                    <Route path="/projects/postgrad-portal" element={<PostGradPortal />} />
                    <Route path="/projects/geology-sim" element={<GeologyFieldSim />} />
                    <Route path="/projects/physics-lab" element={<PhysicsLab />} />
                    <Route path="/projects/anti-temu" element={<AntiTemu />} />
                    <Route path="/skills" element={<Skills />} />
                    <Route path="/resume" element={<Resume />} />
                    <Route path="/experience" element={<Resume />} />
                    <Route path="/contact" element={<Contact />} />
                  </Routes>
                </main>
              </Suspense>
              <Footer />
              <ScrollToTop />
            </motion.div>
          )}
        </AnimatePresence>
      </Router>
    </HelmetProvider>
  );
}

export default App;
