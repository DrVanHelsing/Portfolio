import { useState, useEffect } from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';
import './ThemeToggle.css';

const ThemeToggle = () => {
  const [theme, setTheme] = useState('system');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme') || 'system';
    setTheme(savedTheme);
    applyTheme(savedTheme);
  }, []);

  const applyTheme = (newTheme) => {
    const root = document.documentElement;
    
    if (newTheme === 'system') {
      root.removeAttribute('data-theme');
      localStorage.removeItem('theme');
    } else {
      root.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
    }
  };

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    applyTheme(newTheme);
  };

  if (!mounted) return null;

  return (
    <div className="theme-toggle">
      <button
        className={`theme-option ${theme === 'light' ? 'active' : ''}`}
        onClick={() => handleThemeChange('light')}
        aria-label="Light mode"
        title="Light mode"
      >
        <Sun size={18} />
      </button>
      <button
        className={`theme-option ${theme === 'system' ? 'active' : ''}`}
        onClick={() => handleThemeChange('system')}
        aria-label="System theme"
        title="System theme"
      >
        <Monitor size={18} />
      </button>
      <button
        className={`theme-option ${theme === 'dark' ? 'active' : ''}`}
        onClick={() => handleThemeChange('dark')}
        aria-label="Dark mode"
        title="Dark mode"
      >
        <Moon size={18} />
      </button>
    </div>
  );
};

export default ThemeToggle;
