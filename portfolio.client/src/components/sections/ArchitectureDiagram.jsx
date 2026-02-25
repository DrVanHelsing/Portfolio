import { ArrowRight } from 'lucide-react';
import './ArchitectureDiagram.css';

/**
 * ArchitectureDiagram
 * 
 * A reusable React component for displaying 3-column system architecture diagrams.
 * Each column contains a title and a list of items (cards) with optional icons and subtitles.
 * Features connecting arrows between columns and enhanced visual design.
 * 
 * @param {Object} props
 * @param {Array} props.columns - Array of column objects with title and items
 * @param {string} props.className - Optional additional CSS class
 * @param {boolean} props.showArrows - Show connecting arrows between columns (default: true)
 * @param {Array} props.features - Optional feature cards displayed below the diagram
 */
export default function ArchitectureDiagram({ columns, className = '', showArrows = true, features = [] }) {
  return (
    <div className={`architecture-diagram ${className}`}>
      <div className="architecture-grid">
        {columns.map((col, colIdx) => (
          <>
            <div key={col.id ?? colIdx} className="architecture-column">
              <h3 className="architecture-column-title">{col.title}</h3>
              
              <div className="architecture-items">
                {col.items.map((item, itemIdx) => (
                  <div key={item.id ?? itemIdx} className="architecture-card">
                    <div className="architecture-card-content">
                      {item.icon && (
                        <div className="architecture-card-icon">
                          {item.icon}
                        </div>
                      )}
                      
                      <div className="architecture-card-text">
                        <div className="architecture-card-title">{item.title}</div>
                        {item.subtitle && (
                          <div className="architecture-card-subtitle">{item.subtitle}</div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Arrow connector between columns */}
            {showArrows && colIdx < columns.length - 1 && (
              <div key={`arrow-${colIdx}`} className="architecture-arrow">
                <ArrowRight className="arrow-icon" />
              </div>
            )}
          </>
        ))}
      </div>
      
      {/* Optional feature cards below the main diagram */}
      {features && features.length > 0 && (
        <div className="architecture-features">
          {features.map((feature, idx) => (
            <div key={idx} className="architecture-feature-card">
              {feature.icon && (
                <div className="architecture-feature-icon">
                  {feature.icon}
                </div>
              )}
              <div className="architecture-feature-text">
                <div className="architecture-feature-title">{feature.title}</div>
                {feature.subtitle && (
                  <div className="architecture-feature-subtitle">{feature.subtitle}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
