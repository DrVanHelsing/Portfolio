import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SEO from '../components/utility/SEO';
import { Home } from 'lucide-react';
import './NotFound.css';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const NotFound = () => (
  <div className="notfound-page">
    <SEO title="404 Not Found — Tredir Sewpaul" />
    <motion.div
      className="notfound-container"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.img
        src="/memojis/memoji-lightbulb-moment.png"
        alt="Lightbulb moment memoji"
        className="notfound-memoji"
        variants={itemVariants}
        onError={(e) => { e.target.style.display = 'none'; }}
      />
      <motion.h1 className="notfound-code" variants={itemVariants}>404</motion.h1>
      <motion.h2 className="notfound-title" variants={itemVariants}>Page Not Found</motion.h2>
      <motion.p className="notfound-subtitle" variants={itemVariants}>
        Looks like this page got lost in the void.
      </motion.p>
      <motion.div variants={itemVariants}>
        <Link to="/" className="notfound-cta">
          <Home size={18} />
          Go Home
        </Link>
      </motion.div>
    </motion.div>
  </div>
);

export default NotFound;
