import { useState } from 'react';
import { Link } from 'react-router-dom';
import { resumeTimelineData } from '../data/resumeTimelineData';
import './TimelineModern.css';

/**
 * Modern interactive timeline component using actual resume data
 * Color-coded by category with tooltips and smooth animations
 */
export default function TimelineModern() {
  const [activeEntry, setActiveEntry] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Combine all timeline entries
  const allEntries = [
    ...resumeTimelineData.education.map(e => ({ ...e, category: 'education' })),
    ...resumeTimelineData.experience,
    ...resumeTimelineData.projects,
    ...resumeTimelineData.achievements
  ].sort((a, b) => {
    // Sort by start date (most recent first)
    const getYear = (period) => {
      const match = period.match(/\d{4}/);
      return match ? parseInt(match[0]) : 0;
    };
    return getYear(b.period) - getYear(a.period);
  });

  // Filter by category
  const filteredEntries = selectedCategory === 'all' 
    ? allEntries 
    : allEntries.filter(e => e.category === selectedCategory || e.type === selectedCategory);

  // Category colors matching portfolio theme
  const categoryColors = {
    education: { primary: '#34c759', secondary: '#30d158', name: 'Education' },
    work: { primary: '#0071e3', secondary: '#0a84ff', name: 'Work Experience' },
    volunteer: { primary: '#5856d6', secondary: '#5e5ce6', name: 'Volunteer' },
    project: { primary: '#bf5af2', secondary: '#da8fff', name: 'Projects' },
    achievement: { primary: '#ff9f0a', secondary: '#ffb340', name: 'Achievements' }
  };

  const getColor = (entry) => {
    const cat = entry.category || entry.type;
    return categoryColors[cat] || categoryColors.work;
  };

  return (
    <div className="timeline-modern-root">
      {/* Category filters */}
      <div className="timeline-filters">
        <button 
          className={`filter-btn ${selectedCategory === 'all' ? 'active' : ''}`}
          onClick={() => setSelectedCategory('all')}
        >
          All
        </button>
        {Object.entries(categoryColors).map(([key, value]) => (
          <button
            key={key}
            className={`filter-btn ${selectedCategory === key ? 'active' : ''}`}
            style={{ 
              '--filter-color': value.primary,
              '--filter-color-hover': value.secondary
            }}
            onClick={() => setSelectedCategory(key)}
          >
            {value.name}
          </button>
        ))}
      </div>

      {/* Timeline container */}
      <div className="timeline-container">
        <div className="timeline-line" />
        
        {filteredEntries.map((entry, index) => {
          const color = getColor(entry);
          const isActive = activeEntry === entry.id;
          
          return (
            <div
              key={entry.id}
              className={`timeline-entry ${isActive ? 'active' : ''} ${entry.status === 'current' ? 'current' : ''}`}
              style={{ '--entry-delay': `${index * 0.1}s` }}
              onMouseEnter={() => setActiveEntry(entry.id)}
              onMouseLeave={() => setActiveEntry(null)}
            >
              {/* Timeline dot */}
              <div 
                className="timeline-dot"
                style={{ 
                  '--dot-color': color.primary,
                  '--dot-glow': `${color.primary}80`
                }}
              >
                {entry.status === 'current' && (
                  <div className="pulse-ring" style={{ borderColor: color.primary }} />
                )}
              </div>

              {/* Content card */}
              <div 
                className="timeline-card"
                style={{ 
                  '--card-border': color.primary,
                  '--card-glow': `${color.primary}20`
                }}
              >
                <div className="card-header">
                  <div className="card-period" style={{ color: color.secondary }}>
                    {entry.period}
                    {entry.status === 'current' && (
                      <span className="current-badge" style={{ backgroundColor: color.primary }}>
                        Current
                      </span>
                    )}
                  </div>
                  <div className="card-category" style={{ color: color.primary }}>
                    {categoryColors[entry.category || entry.type]?.name}
                  </div>
                </div>

                <h3 className="card-title">{entry.title}</h3>
                
                {(entry.institution || entry.company || entry.event) && (
                  <p className="card-subtitle">
                    {entry.institution || entry.company || entry.event}
                  </p>
                )}

                {entry.description && (
                  <p className="card-description">{entry.description}</p>
                )}

                {/* Expandable details */}
                {isActive && (
                  <div className="card-details">
                    {entry.details && (
                      <ul className="details-list">
                        {entry.details.map((detail, i) => (
                          <li key={i}>{detail}</li>
                        ))}
                      </ul>
                    )}
                    {entry.highlights && (
                      <ul className="details-list">
                        {entry.highlights.map((highlight, i) => (
                          <li key={i}>{highlight}</li>
                        ))}
                      </ul>
                    )}
                    {entry.technologies && (
                      <div className="tech-tags">
                        {entry.technologies.map((tech, i) => (
                          <span key={i} className="tech-tag" style={{ borderColor: color.primary }}>
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                    {entry.link && (
                      <Link 
                        to={entry.link}
                        className="github-link"
                        style={{ color: color.primary }}
                      >
                        View Details →
                      </Link>
                    )}
                    {entry.github && !entry.link && (
                      <a 
                        href={entry.github} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="github-link"
                        style={{ color: color.primary }}
                      >
                        View on GitHub →
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Skills summary at bottom */}
      <div className="skills-summary">
        <h3>Technical Skills</h3>
        <div className="skills-grid">
          <div className="skill-category">
            <h4>Programming</h4>
            <div className="skill-tags">
              {resumeTimelineData.skills.programming.map((skill, i) => (
                <span key={i} className="skill-tag">{skill}</span>
              ))}
            </div>
          </div>
          <div className="skill-category">
            <h4>Web Development</h4>
            <div className="skill-tags">
              {resumeTimelineData.skills.web.map((skill, i) => (
                <span key={i} className="skill-tag">{skill}</span>
              ))}
            </div>
          </div>
          <div className="skill-category">
            <h4>Tools & Technologies</h4>
            <div className="skill-tags">
              {resumeTimelineData.skills.tools.map((skill, i) => (
                <span key={i} className="skill-tag">{skill}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
