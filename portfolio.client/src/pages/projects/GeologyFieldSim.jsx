import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import AnimatedChart from '../../components/sections/AnimatedChart';
import TechIconChip from '../../components/ui/TechIconChip';
import ArchitectureDiagram from '../../components/sections/ArchitectureDiagram';
import SEO from '../../components/utility/SEO';
import {
  ArrowLeft, Sparkles, Code2, Lock, Calendar, Mountain, Layers, Droplets,
  TreePine, Eye, Settings, Monitor, Cpu, MapPin, Compass, Ruler,
  Database, Globe, BarChart3, Zap, Sun, Wind, Waves, Pickaxe
} from 'lucide-react';
import './ProjectDetail.css';

const GeologyFieldSim = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const terrainResolutionData = [
    { label: 'Vertices', value: 148 },
    { label: 'Erosion Particles', value: 38 },
    { label: 'Tree Instances', value: 1300 },
    { label: 'Grass Tufts', value: 9000 }
  ];

  const layerDistributionData = [
    { label: 'Granite Gneiss', value: 40 },
    { label: 'Dolomitic Limestone', value: 35 },
    { label: 'Sandstone & Shale', value: 55 },
    { label: 'Schist', value: 50 },
    { label: 'Limestone', value: 40 },
    { label: 'Alluvium', value: 20 }
  ];

  const vegetationData = [
    { label: 'Pines', value: 600 },
    { label: 'Oaks', value: 450 },
    { label: 'Birches', value: 250 },
    { label: 'Bushes', value: 2500 },
    { label: 'Rocks', value: 500 }
  ];

  const waterSystemData = [
    { label: 'Ocean', value: 40 },
    { label: 'Lakes', value: 25 },
    { label: 'River', value: 20 },
    { label: 'Shore Waves', value: 15 }
  ];

  return (
    <div className="project-detail-page">
      <SEO
        title="Geology Field Mapping Simulator - 3D Interactive | Tredir Sewpaul"
        description="Browser-based 3D geology field simulator with procedural terrain, 6 stratigraphic layers, PBR rendering, and virtual field instruments"
        keywords="geology simulator, Three.js, WebGL, procedural terrain, PBR rendering, field mapping, 3D"
        path="/projects/geology-sim"
      />

      <motion.div className="project-detail-container" initial="hidden" animate="visible" variants={containerVariants}>
        <Link to="/projects" className="back-link" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--apple-blue)', marginBottom: 'var(--spacing-xl)', textDecoration: 'none' }}>
          <ArrowLeft size={20} />
          Back to Projects
        </Link>

        <motion.div className="project-header" variants={itemVariants}>
          <div className="project-badge" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <span className="status-badge ongoing">
              <Lock size={16} />
              Ongoing Development
            </span>
            <span className="status-badge" style={{ background: 'var(--bg-accent-light)' }}>
              <Calendar size={16} style={{ display: 'inline', marginRight: 4 }} />
              Feb 2025 - Present
            </span>
          </div>
          <h1 className="project-title">Structural Geology Field Mapping Simulator</h1>
          <p className="project-subtitle">
            A browser-based 3D interactive geology field simulator for education, training, and research &mdash; featuring procedurally generated terrain, 6 stratigraphic layers, and virtual field instruments.
            <br /><br />
            <span style={{ color: 'var(--apple-indigo)', fontWeight: 600 }}>Research Collaboration</span> &mdash; Working with a PhD student as the software developer; co-authoring a paper on the platform.
          </p>

          <div className="project-badges">
            <TechIconChip name="React" />
            <TechIconChip name="Three.js" />
            <TechIconChip name="WebGL" />
            <TechIconChip name="Vite" />
            <TechIconChip name="Zustand" />
            <TechIconChip name="GLSL" />
          </div>

          <div className="project-links">
            <a href="https://github.com/DrVanHelsing/GeologyFieldSim" target="_blank" rel="noopener noreferrer" className="project-link-btn">
              <Code2 size={20} />
              View on GitHub
            </a>
          </div>
        </motion.div>

        <div className="project-content">
          {/* Impact Metrics */}
          <motion.div className="content-section" variants={itemVariants}>
            <h2 className="section-title"><BarChart3 size={24} />At a Glance</h2>
            <div className="metrics-grid" style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-lg)', marginBottom: 'var(--spacing-xl)', justifyContent: 'center' }}>
              <div className="metric-card" style={{ background: 'var(--bg-accent-light)', padding: 'var(--spacing-lg)', borderRadius: 'var(--radius-lg)', textAlign: 'center', border: '2px solid var(--apple-blue)', flex: '1 1 200px', minWidth: '180px', maxWidth: '240px' }}>
                <Mountain size={32} style={{ color: 'var(--apple-blue)', margin: '0 auto var(--spacing-sm)' }} />
                <div style={{ fontSize: 'var(--font-size-3xl)', fontWeight: 'var(--font-weight-bold)', color: 'var(--apple-blue)' }}>2km²</div>
                <div style={{ color: 'var(--apple-gray)', fontSize: 'var(--font-size-sm)' }}>Terrain Area</div>
              </div>
              <div className="metric-card" style={{ background: 'var(--bg-accent-light)', padding: 'var(--spacing-lg)', borderRadius: 'var(--radius-lg)', textAlign: 'center', flex: '1 1 200px', minWidth: '180px', maxWidth: '240px' }}>
                <Layers size={32} style={{ color: 'var(--apple-blue)', margin: '0 auto var(--spacing-sm)' }} />
                <div style={{ fontSize: 'var(--font-size-3xl)', fontWeight: 'var(--font-weight-bold)', color: 'var(--apple-blue)' }}>6</div>
                <div style={{ color: 'var(--apple-gray)', fontSize: 'var(--font-size-sm)' }}>Stratigraphic Layers</div>
              </div>
              <div className="metric-card" style={{ background: 'var(--bg-accent-light)', padding: 'var(--spacing-lg)', borderRadius: 'var(--radius-lg)', textAlign: 'center', flex: '1 1 200px', minWidth: '180px', maxWidth: '240px' }}>
                <Pickaxe size={32} style={{ color: 'var(--apple-blue)', margin: '0 auto var(--spacing-sm)' }} />
                <div style={{ fontSize: 'var(--font-size-3xl)', fontWeight: 'var(--font-weight-bold)', color: 'var(--apple-blue)' }}>5</div>
                <div style={{ color: 'var(--apple-gray)', fontSize: 'var(--font-size-sm)' }}>Field Instruments</div>
              </div>
              <div className="metric-card" style={{ background: 'var(--bg-accent-light)', padding: 'var(--spacing-lg)', borderRadius: 'var(--radius-lg)', textAlign: 'center', flex: '1 1 200px', minWidth: '180px', maxWidth: '240px' }}>
                <Cpu size={32} style={{ color: 'var(--apple-blue)', margin: '0 auto var(--spacing-sm)' }} />
                <div style={{ fontSize: 'var(--font-size-3xl)', fontWeight: 'var(--font-weight-bold)', color: 'var(--apple-blue)' }}>148K</div>
                <div style={{ color: 'var(--apple-gray)', fontSize: 'var(--font-size-sm)' }}>Terrain Vertices</div>
              </div>
            </div>
          </motion.div>

          {/* Overview */}
          <motion.div className="content-section" variants={itemVariants}>
            <h2 className="section-title"><Sparkles size={24} />Overview</h2>
            <div className="section-content">
              <p>
                This simulator recreates a realistic geological field environment entirely in the browser. The terrain is generated 
                procedurally from multi-octave noise functions, carved by hydraulic erosion, and painted with physically-based rock textures. 
                Six stratigraphic layers &mdash; from Precambrian basement to Quaternary alluvium &mdash; are deformed by regional folds, bedding perturbation, 
                and a normal fault, creating a geologically plausible subsurface structure.
              </p>
              <p style={{ marginTop: 'var(--spacing-md)' }}>
                Students can investigate the terrain with a suite of virtual field instruments including rock identification, drill core sampling 
                with configurable inclination and azimuth, distance measurement, dip direction/dip notation, and geological cross-section generation. 
                The application runs on commodity hardware with no installation beyond a modern browser.
              </p>
            </div>
          </motion.div>

          {/* Architecture Diagram */}
          <motion.div className="content-section" variants={itemVariants}>
            <h2 className="section-title"><Settings size={24} />System Architecture</h2>
            <ArchitectureDiagram
              columns={[
                {
                  title: 'Rendering Engine',
                  items: [
                    { icon: <Monitor size={24} />, title: 'Three.js Scene', subtitle: '3D viewport with orbit controls' },
                    { icon: <Sun size={24} />, title: 'PBR Shading', subtitle: 'Cook-Torrance BRDF with tri-planar textures' },
                    { icon: <Eye size={24} />, title: 'Post-Processing', subtitle: 'SSAO, fog, ACES tone mapping' }
                  ]
                },
                {
                  title: 'World Generation',
                  items: [
                    { icon: <Mountain size={24} />, title: 'Terrain Generator', subtitle: 'Multi-octave noise + erosion' },
                    { icon: <Waves size={24} />, title: 'Water System', subtitle: 'Ocean, lakes, river with Gerstner waves' },
                    { icon: <TreePine size={24} />, title: 'Vegetation System', subtitle: 'InstancedMesh GPU rendering' }
                  ]
                },
                {
                  title: 'Field Tools',
                  items: [
                    { icon: <Pickaxe size={24} />, title: 'Rock Identifier', subtitle: 'Layer detection with geology popup' },
                    { icon: <Compass size={24} />, title: 'Strike & Dip', subtitle: 'Wulff net stereonet visualisation' },
                    { icon: <Ruler size={24} />, title: 'Cross-Section', subtitle: 'Canvas geological profile rendering' }
                  ]
                }
              ]}
              features={[
                { icon: <Layers size={28} />, title: '6 Stratigraphic Layers', subtitle: 'Precambrian granite gneiss through Quaternary alluvium with structural deformation' },
                { icon: <Droplets size={28} />, title: 'Unified Water Shading', subtitle: 'Fresnel-Schlick, Gerstner waves, subsurface scattering, caustics, and sparkle' },
                { icon: <Wind size={28} />, title: 'Atmospheric Scattering', subtitle: 'Rayleigh + Mie sky dome with animated clouds and aerial perspective fog' },
                { icon: <MapPin size={28} />, title: 'Farm Compound', subtitle: '6 buildings with foundations, silos, crop fields, fences, and animated windmill' }
              ]}
            />
          </motion.div>

          {/* Charts */}
          <motion.div className="content-section" variants={itemVariants}>
            <h2 className="section-title"><BarChart3 size={24} />World Statistics</h2>
            <div className="charts-grid">
              <div className="chart-card">
                <h3><Layers size={20} />Stratigraphic Layers</h3>
                <AnimatedChart
                  data={layerDistributionData}
                  height={220}
                  type="bar"
                  colorMap={{
                    'Granite Gneiss': '#8B4513',
                    'Dolomitic Limestone': '#B8860B',
                    'Sandstone & Shale': '#CD853F',
                    'Schist': '#708090',
                    'Limestone': '#D4C084',
                    'Alluvium': '#228B22'
                  }}
                  gradient={['#8B4513', '#228B22']}
                  showLabels={true}
                  showValues={true}
                />
              </div>
              <div className="chart-card">
                <h3><Droplets size={20} />Water System</h3>
                <AnimatedChart
                  data={waterSystemData}
                  height={220}
                  type="donut"
                  colorMap={{
                    'Ocean': '#007AFF',
                    'Lakes': '#5AC8FA',
                    'River': '#34C759',
                    'Shore Waves': '#64D2FF'
                  }}
                  showLabels={true}
                  showValues={true}
                />
              </div>
              <div className="chart-card chart-card-full">
                <h3><TreePine size={20} />Vegetation Instances</h3>
                <AnimatedChart
                  data={vegetationData}
                  height={240}
                  type="bar"
                  colorMap={{
                    'Pines': '#228B22',
                    'Oaks': '#2E8B57',
                    'Birches': '#3CB371',
                    'Bushes': '#6B8E23',
                    'Rocks': '#8B8682'
                  }}
                  gradient={['#228B22', '#3CB371']}
                  showLabels={true}
                  showValues={true}
                />
              </div>
            </div>
          </motion.div>

          {/* Field Instruments */}
          <motion.div className="content-section" variants={itemVariants}>
            <h2 className="section-title"><Compass size={24} />Virtual Field Instruments</h2>
            <div className="feature-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--spacing-lg)' }}>
              {[
                { icon: <Pickaxe size={20} />, title: 'Rock Identifier', desc: 'Click terrain to identify geological layer — shows name, minerals, grain size, texture, fossils, and age' },
                { icon: <Database size={20} />, title: 'Drill Core', desc: 'Virtual borehole with configurable inclination (0-90°) and azimuth (0-360°). Animated tripod rig with visual core column' },
                { icon: <Ruler size={20} />, title: 'Distance Measure', desc: 'Two-click measurement showing 3D distance, elevation difference, horizontal distance, bearing, and slope angle' },
                { icon: <Compass size={20} />, title: 'Dip Direction / Dip', desc: 'Bedding orientation with tilted bedding plane disc, dip-direction arrow, pulsing chevrons, and Wulff net stereonet' },
                { icon: <Layers size={20} />, title: 'Cross-Section', desc: 'Two-point geological profile with layer colours, rock-type hatching, water level, surface profile, and layer legend' }
              ].map((item, i) => (
                <div key={i} className="info-card" style={{ padding: 'var(--spacing-lg)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)', marginBottom: 'var(--spacing-sm)' }}>
                    <span style={{ color: 'var(--apple-blue)' }}>{item.icon}</span>
                    <h3 style={{ fontSize: 'var(--font-size-md)', fontWeight: 600, margin: 0, color: 'var(--text-1)' }}>{item.title}</h3>
                  </div>
                  <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-2)', lineHeight: 1.5, margin: 0 }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Rendering Pipeline */}
          <motion.div className="content-section" variants={itemVariants}>
            <h2 className="section-title"><Cpu size={24} />Rendering Pipeline</h2>
            <div className="feature-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--spacing-lg)' }}>
              {[
                { icon: <Sun size={20} />, title: 'PBR Cook-Torrance', desc: 'GGX NDF, Smith-Schlick geometry, Fresnel-Schlick with boosted ambient and rim highlights' },
                { icon: <Layers size={20} />, title: 'Tri-Planar Texturing', desc: '6-tile horizontal atlas (1024px per tile) with procedural PBR albedo, normal, and packed roughness-AO-height maps' },
                { icon: <Eye size={20} />, title: 'SSAO', desc: '12-tap rotated kernel with distance-adaptive radius and golden-angle sampling' },
                { icon: <Wind size={20} />, title: 'Atmospheric Scattering', desc: 'Rayleigh + Mie sky dome with animated clouds, haze bands, and ACES Filmic tone mapping at 1.60 exposure' }
              ].map((item, i) => (
                <div key={i} className="info-card" style={{ padding: 'var(--spacing-lg)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)', marginBottom: 'var(--spacing-sm)' }}>
                    <span style={{ color: 'var(--apple-blue)' }}>{item.icon}</span>
                    <h3 style={{ fontSize: 'var(--font-size-md)', fontWeight: 600, margin: 0, color: 'var(--text-1)' }}>{item.title}</h3>
                  </div>
                  <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-2)', lineHeight: 1.5, margin: 0 }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Tech Stack */}
          <motion.div className="content-section" variants={itemVariants}>
            <h2 className="section-title"><Code2 size={24} />Tech Stack</h2>
            <div style={{ background: 'var(--bg-secondary)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: 'var(--bg-accent-light)', borderBottom: '2px solid var(--border-color)' }}>
                    <th style={{ padding: 'var(--spacing-md)', textAlign: 'left', fontWeight: 600 }}>Technology</th>
                    <th style={{ padding: 'var(--spacing-md)', textAlign: 'left', fontWeight: 600 }}>Purpose</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Vite 5.1', 'Build tool & dev server'],
                    ['React 18.2', 'UI framework'],
                    ['Three.js 0.162', '3D rendering engine'],
                    ['Zustand 4.5', 'Lightweight state management'],
                    ['jsPDF 2.5.1', 'PDF export for field notebook'],
                    ['GLSL (WebGL 1)', 'Custom vertex & fragment shaders']
                  ].map(([tech, purpose], i) => (
                    <tr key={i} style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <td style={{ padding: 'var(--spacing-md)', fontWeight: 500 }}>{tech}</td>
                      <td style={{ padding: 'var(--spacing-md)', color: 'var(--apple-gray)', fontSize: '0.875rem' }}>{purpose}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

        </div>
      </motion.div>
    </div>
  );
};

export default GeologyFieldSim;
