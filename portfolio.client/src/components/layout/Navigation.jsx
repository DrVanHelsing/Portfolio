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

  // Close menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Close on Escape key
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setIsMobileMenuOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
  <nav className={`navigation ${isScrolled ? 'scrolled' : ''}`} aria-label="Primary">
<div className="nav-container">
        <Link to="/" className="nav-logo">
          <span className="logo-text">Tredir</span>
          <span className="logo-accent">Sewpaul</span>
        </Link>

        <button 
          className="mobile-menu-toggle"
      onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
      aria-expanded={isMobileMenuOpen}
      aria-controls="primary-navigation"
        >
          <span className={isMobileMenuOpen ? 'bar open' : 'bar'}></span>
          <span className={isMobileMenuOpen ? 'bar open' : 'bar'}></span>
          <span className={isMobileMenuOpen ? 'bar open' : 'bar'}></span>
     </button>

      {/* Backdrop to close menu when clicking outside */}
      {isMobileMenuOpen && (
        <button
          type="button"
          className="nav-backdrop"
          aria-label="Close menu"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <ul id="primary-navigation" className={`nav-links ${isMobileMenuOpen ? 'mobile-open' : ''}`} role="menubar">
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
