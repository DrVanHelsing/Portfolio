import { useEffect } from 'react';
import mermaid from 'mermaid';
import './MermaidDiagram.css';

export default function MermaidDiagram({ diagram, title }) {
  useEffect(() => {
    mermaid.contentLoaded();
  }, [diagram]);

  return (
    <div className="mermaid-diagram-wrapper">
      {title && <h3 className="mermaid-diagram-title">{title}</h3>}
      <div className="mermaid-diagram-container">
        <div className="mermaid">
          {diagram}
        </div>
      </div>
    </div>
  );
}
