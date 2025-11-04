import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import AnimatedBackground from './AnimatedBackground';
import './LoadingScreen.css';

const LoadingScreen = ({ onEnter }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [currentGreeting, setCurrentGreeting] = useState(0);

  const greetings = [
    { text: 'print("Hello World!")', lang: 'Python' },
    { text: 'console.log("Hello World!");', lang: 'JavaScript' },
    { text: 'System.out.println("Hello World!");', lang: 'Java' },
    { text: 'Console.WriteLine("Hello World!");', lang: 'C#' },
    { text: 'echo "Hello World!";', lang: 'PHP' },
    { text: 'puts "Hello World!"', lang: 'Ruby' },
    { text: 'fmt.Println("Hello World!")', lang: 'Go' },
    { text: 'println!("Hello World!");', lang: 'Rust' },
    { text: 'print("Hello World!")', lang: 'Swift' },
    { text: 'cout << "Hello World!";', lang: 'C++' }
  ];

  // Cycle through greetings continuously
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentGreeting((prev) => (prev + 1) % greetings.length);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  const handleEnter = () => {
    setIsVisible(false);
    // Call the parent's onEnter callback after animation
    setTimeout(() => {
      if (onEnter) onEnter();
    }, 800); // Match the exit animation duration
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          className="welcome-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
        >
          <AnimatedBackground variant="particles" />
          
          <div className="welcome-content">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentGreeting}
                className="greeting-text"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                {greetings[currentGreeting].text}
              </motion.div>
            </AnimatePresence>

            <motion.button
              className="enter-button"
              onClick={handleEnter}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Enter</span>
              <ChevronRight size={20} />
            </motion.button>

            <motion.p
              className="welcome-subtitle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.6 }}
            >
              Portfolio · Tredir Sewpaul
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
