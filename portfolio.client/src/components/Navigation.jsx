import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './Navigation.css';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/projects', label: 'Projects' },
    { path: '/skills', label: 'Skills' },
    { path: '/experience', label: 'Experience' },
    { path: '/contact', label: 'Contact' }
  ];

  return (
  <nav className={`navigation ${isScrolled ? 'scrolled' : ''}`}>
<div className="nav-container">
        <Link to="/" className="nav-logo">
          <span className="logo-text">Tredir</span>
          <span className="logo-accent">Sewpaul</span>
        </Link>

        <button 
          className="mobile-menu-toggle"
      onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      aria-label="Toggle menu"
        >
          <span></span>
        <span></span>
          <span></span>
     </button>

      <ul className={`nav-links ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
          {navLinks.map(({ path, label }) => (
            <li key={path}>
     <Link 
             to={path}
     className={location.pathname === path ? 'active' : ''}
  onClick={() => setIsMobileMenuOpen(false)}
  >
          {label}
              </Link>
       </li>
          ))}
      </ul>
      </div>
    </nav>
  );
};

export default Navigation;
