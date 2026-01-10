import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Analytics } from '@vercel/analytics/react'
import mermaid from 'mermaid'
import './index.css'
import App from './App.jsx'

// Initialize mermaid
mermaid.initialize({ 
  startOnLoad: true,
  theme: 'dark',
  securityLevel: 'loose',
  flowchart: {
    useMaxWidth: true,
    padding: 20,
    nodeSpacing: 50,
    rankSpacing: 50,
    curve: 'linear'
  }
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Analytics />
    <App />
  </StrictMode>,
)
