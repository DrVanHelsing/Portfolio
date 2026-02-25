import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const gradientText = {
    background: 'linear-gradient(135deg, #64c8ff, #533483)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3 style={gradientText}>Tredir Sewpaul</h3>
          <p>Full-Stack Developer & Cloud Architect</p>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <div className="footer-links">
            <a href="/">Home</a>
            <a href="/about">About</a>
            <a href="/projects">Projects</a>
            <a href="/skills">Skills</a>
          </div>
        </div>

        <div className="footer-section">
          <h4>Connect</h4>
          <div className="footer-links">
            <a href="https://github.com/tredir" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="https://linkedin.com/in/tredir-sewpaul" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="mailto:tredirs@gmail.com">Email</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {currentYear} Tredir Sewpaul. All rights reserved.</p>
        <p>Built with React, .NET Core & ??</p>
      </div>
    </footer>
  );
};

export default Footer;
