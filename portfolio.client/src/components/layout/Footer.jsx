import { Link } from 'react-router-dom';
import {
  Github,
  Linkedin,
  Mail,
  Home,
  User,
  FolderKanban,
  Cpu,
  Briefcase,
  MessageCircle,
  Code2,
  Terminal,
  ArrowUpRight,
} from 'lucide-react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/about', label: 'About', icon: User },
    { path: '/projects', label: 'Projects', icon: FolderKanban },
    { path: '/skills', label: 'Skills', icon: Cpu },
    { path: '/experience', label: 'Experience', icon: Briefcase },
    { path: '/contact', label: 'Contact', icon: MessageCircle },
  ];

  const socialLinks = [
    {
      href: 'https://github.com/tredir',
      label: 'GitHub',
      icon: Github,
    },
    {
      href: 'https://linkedin.com/in/tredir-sewpaul',
      label: 'LinkedIn',
      icon: Linkedin,
    },
    {
      href: 'mailto:tredirs@gmail.com',
      label: 'Email',
      icon: Mail,
    },
  ];

  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Brand */}
        <div className="footer-section footer-brand">
          <h3 className="footer-name">
            <Terminal size={20} className="footer-name-icon" />
            Tredir Sewpaul
          </h3>
          <p className="footer-tagline">Full-Stack Developer &amp; Cloud Architect</p>
          <div className="footer-social">
            {socialLinks.map(({ href, label, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('mailto') ? undefined : '_blank'}
                rel={href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                className="footer-social-link"
                aria-label={label}
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="footer-section">
          <h4>
            <Code2 size={16} className="footer-heading-icon" />
            Navigate
          </h4>
          <div className="footer-links">
            {navLinks.map(({ path, label, icon: Icon }) => (
              <Link key={path} to={path} className="footer-nav-link">
                <Icon size={15} className="footer-link-icon" />
                {label}
              </Link>
            ))}
          </div>
        </div>

        {/* Connect */}
        <div className="footer-section">
          <h4>
            <ArrowUpRight size={16} className="footer-heading-icon" />
            Connect
          </h4>
          <div className="footer-links">
            {socialLinks.map(({ href, label, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('mailto') ? undefined : '_blank'}
                rel={href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                className="footer-nav-link"
              >
                <Icon size={15} className="footer-link-icon" />
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {currentYear} Tredir Sewpaul. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
