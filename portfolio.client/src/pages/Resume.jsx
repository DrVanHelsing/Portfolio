import SEO from '../components/SEO';
import AnimatedBackground from '../components/AnimatedBackground';
import TimelineModern from '../components/TimelineModern';
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
      
      {/* Animated background particles */}
      <AnimatedBackground variant="particles" />
      
      {/* Modern timeline with resume data */}
      <TimelineModern />
    </div>
  );
};

export default Resume;
