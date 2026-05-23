import './AnimatedBackground.css';

const AnimatedBackground = ({ variant = 'gradient' }) => {
  if (variant === 'gradient') {
    return <div className="animated-gradient-bg" />;
  }

  if (variant === 'wave') {
    return (
      <div className="wave-bg">
        <div className="wave wave1" />
        <div className="wave wave2" />
        <div className="wave wave3" />
      </div>
    );
  }

  // Default / 'orbs' / 'particles' variant — glowing floating orbs
  return (
    <div className="orbs-bg">
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />
      <div className="orb orb-4" />
    </div>
  );
};

export default AnimatedBackground;
