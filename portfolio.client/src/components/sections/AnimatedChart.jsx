import { motion } from 'framer-motion';
import './AnimatedChart.css';
import { useMemo } from 'react';

export default function AnimatedChart({
  data = [],
  height = 160,
  max = null,
  type = 'bar', // 'bar', 'line', 'pie', 'donut'
  gradient = ['var(--apple-blue)', 'var(--apple-indigo)'],
  showLabels = true,
  showValues = false,
  animate = true,
  colorMap = null // For pie/donut charts
}) {
  const maxValue = max ?? Math.max(...data.map(d => d.value), 1);
  
  // Calculate pie/donut chart segments
  const pieData = useMemo(() => {
    if (type !== 'pie' && type !== 'donut') return null;
    const total = data.reduce((sum, d) => sum + d.value, 0);
    let currentAngle = -90; // Start at top
    return data.map((d, i) => {
      const percentage = (d.value / total) * 100;
      const angle = (percentage / 100) * 360;
      const segment = {
        ...d,
        percentage,
        startAngle: currentAngle,
        endAngle: currentAngle + angle,
        color: colorMap?.[d.label] || gradient[i % gradient.length]
      };
      currentAngle += angle;
      return segment;
    });
  }, [data, type, gradient, colorMap]);

  // Line chart path
  const linePath = useMemo(() => {
    if (type !== 'line' || data.length === 0) return '';
    const width = 100;
    const padding = 10;
    const chartWidth = width - 2 * padding;
    const step = chartWidth / (data.length - 1 || 1);
    
    const points = data.map((d, i) => {
      const x = padding + i * step;
      const y = 100 - ((d.value / maxValue) * 80 + 10);
      return `${x},${y}`;
    }).join(' ');
    
    return points;
  }, [data, maxValue, type]);

  return (
    <div className="animated-chart-root" style={{ height }}>
      {/* Bar Chart */}
      {type === 'bar' && (
        <div className="animated-chart-bars">
          {data.map((d, i) => (
            <div key={i} className="animated-chart-bar-wrap">
              <motion.div
                className="animated-chart-bar"
                initial={animate ? { height: 0, opacity: 0.6 } : false}
                animate={{ height: `${(d.value / maxValue) * 100}%`, opacity: 1 }}
                transition={{ delay: i * 0.05, duration: 0.6, type: 'spring' }}
                style={{
                  background: `linear-gradient(180deg, ${gradient[0]}, ${gradient[1]})`
                }}
                title={`${d.label}: ${d.value}`}
              />
              {showLabels && <div className="animated-chart-label">{d.label}</div>}
              {showValues && <div className="animated-chart-value">{d.value}</div>}
            </div>
          ))}
        </div>
      )}

      {/* Line Chart */}
      {type === 'line' && (
        <svg className="animated-chart-line" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id="line-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={gradient[0]} stopOpacity="0.3" />
              <stop offset="100%" stopColor={gradient[1]} stopOpacity="0.05" />
            </linearGradient>
          </defs>
          
          {/* Area under line */}
          <motion.path
            d={`M ${linePath.split(' ')[0]} ${linePath} L ${linePath.split(' ').pop()?.split(',')[0]},100 L ${linePath.split(' ')[0]?.split(',')[0]},100 Z`}
            fill="url(#line-gradient)"
            initial={animate ? { opacity: 0 } : false}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
          
          {/* Line */}
          <motion.polyline
            points={linePath}
            fill="none"
            stroke={gradient[0]}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={animate ? { pathLength: 0, opacity: 0 } : false}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          />
          
          {/* Data points */}
          {data.map((d, i) => {
            const width = 100;
            const padding = 10;
            const chartWidth = width - 2 * padding;
            const step = chartWidth / (data.length - 1 || 1);
            const x = padding + i * step;
            const y = 100 - ((d.value / maxValue) * 80 + 10);
            
            return (
              <motion.circle
                key={i}
                cx={x}
                cy={y}
                r="2"
                fill={gradient[0]}
                initial={animate ? { scale: 0, opacity: 0 } : false}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.8 + i * 0.05, duration: 0.3 }}
              />
            );
          })}
        </svg>
      )}

      {/* Pie/Donut Chart */}
      {(type === 'pie' || type === 'donut') && pieData && (
        <div className="animated-chart-pie-container">
          <svg className="animated-chart-pie" viewBox="0 0 100 100">
            {pieData.map((segment, i) => {
              const radius = type === 'donut' ? 35 : 45;
              const innerRadius = type === 'donut' ? 20 : 0;
              const largeArc = segment.percentage > 50 ? 1 : 0;
              
              const startX = 50 + radius * Math.cos((segment.startAngle * Math.PI) / 180);
              const startY = 50 + radius * Math.sin((segment.startAngle * Math.PI) / 180);
              const endX = 50 + radius * Math.cos((segment.endAngle * Math.PI) / 180);
              const endY = 50 + radius * Math.sin((segment.endAngle * Math.PI) / 180);
              
              let path;
              if (type === 'donut') {
                const innerStartX = 50 + innerRadius * Math.cos((segment.startAngle * Math.PI) / 180);
                const innerStartY = 50 + innerRadius * Math.sin((segment.startAngle * Math.PI) / 180);
                const innerEndX = 50 + innerRadius * Math.cos((segment.endAngle * Math.PI) / 180);
                const innerEndY = 50 + innerRadius * Math.sin((segment.endAngle * Math.PI) / 180);
                
                path = `
                  M ${startX} ${startY}
                  A ${radius} ${radius} 0 ${largeArc} 1 ${endX} ${endY}
                  L ${innerEndX} ${innerEndY}
                  A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${innerStartX} ${innerStartY}
                  Z
                `;
              } else {
                path = `
                  M 50 50
                  L ${startX} ${startY}
                  A ${radius} ${radius} 0 ${largeArc} 1 ${endX} ${endY}
                  Z
                `;
              }
              
              return (
                <motion.path
                  key={i}
                  d={path}
                  fill={segment.color}
                  stroke="white"
                  strokeWidth="1"
                  initial={animate ? { opacity: 0, scale: 0 } : false}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1, duration: 0.5, type: 'spring' }}
                  style={{ transformOrigin: '50% 50%' }}
                >
                  <title>{`${segment.label}: ${segment.value} (${segment.percentage.toFixed(1)}%)`}</title>
                </motion.path>
              );
            })}
          </svg>
          
          {showLabels && (
            <div className="animated-chart-pie-labels">
              {pieData.map((segment, i) => (
                <div key={i} className="animated-chart-pie-label">
                  <span className="color-dot" style={{ backgroundColor: segment.color }} />
                  <span className="label-text">{segment.label}</span>
                  {showValues && <span className="label-value">{segment.percentage.toFixed(1)}%</span>}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
