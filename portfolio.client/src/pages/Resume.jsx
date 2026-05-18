import SEO from '../components/utility/SEO';
import TimelineModern from '../components/sections/TimelineModern';
import { Download } from 'lucide-react';
import './Resume.css';

/**
 * Resume/Experience Page - Interactive timeline with animated background
 * Modern, themed design showcasing education, work experience, projects, and achievements
 */
const Resume = () => {
  return (
    <div className="resume-page">
      <SEO 
        title="Experience - Tredir Sewpaul"
        description="Explore my professional journey through an interactive modern timeline showcasing education, work experience, projects, and achievements."
        keywords="experience, timeline, professional journey, education, work history, interactive portfolio, skills"
        path="/resume"
      />
      
      {/* Animated background rendered at App level */}
      
      {/* Thumbs-up memoji + Download button, stacked and centered */}
      <div className="resume-header-aside">
        <img
          src="/memojis/memoji-thumbs-up.png"
          alt="Thumbs up"
          className="memoji-resume-float"
        />
        <a
          href="/TredirSewpaul_CV.pdf"
          download="TredirSewpaul_CV.pdf"
          className="resume-download-btn"
        >
          <Download size={18} />
          Download CV
        </a>
      </div>

      {/* Modern timeline with resume data */}
      <TimelineModern />
    </div>
  );
};

export default Resume;
