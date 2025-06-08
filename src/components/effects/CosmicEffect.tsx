
import React, { useCallback, useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import BaseEffect from './BaseEffect';

interface CosmicEffectProps {
  density?: 'low' | 'medium' | 'high';
  speed?: 'slow' | 'medium' | 'fast';
  interactive?: boolean;
  color?: string;
  className?: string;
}

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  pulse: number;
  pulseSpeed: number;
}

interface Nebula {
  x: number;
  y: number;
  size: number;
  color: string;
  rotation: number;
  rotationSpeed: number;
}

const CosmicEffect: React.FC<CosmicEffectProps> = ({
  density = 'medium',
  speed = 'medium',
  interactive = false,
  color,
  className = ''
}) => {
  const { theme } = useTheme();
  const [stars, setStars] = useState<Star[]>([]);
  const [nebulas, setNebulas] = useState<Nebula[]>([]);
  
  // Get density count based on the density prop
  const getDensityCount = useCallback(() => {
    switch (density) {
      case 'low': return 50;
      case 'medium': return 100;
      case 'high': return 200;
      default: return 100;
    }
  }, [density]);
  
  // Get speed factor based on the speed prop
  const getSpeedFactor = useCallback(() => {
    switch (speed) {
      case 'slow': return 0.5;
      case 'medium': return 1;
      case 'fast': return 2;
      default: return 1;
    }
  }, [speed]);
  
  // Get color based on theme and provided color
  const getColor = useCallback(() => {
    if (color) return color;
    
    // Default colors based on theme
    if (theme === 'dark') {
      return 'rgba(139, 92, 246, 0.7)';
    } else {
      return 'rgba(139, 92, 246, 0.3)';
    }
  }, [color, theme]);
  
  // Initialize stars and nebulas when dimensions change
  const handleResize = useCallback((dimensions: { width: number; height: number }) => {
    const particleCount = getDensityCount();
    const newStars: Star[] = [];
    const newNebulas: Nebula[] = [];
    const speedFactor = getSpeedFactor();
    
    // Create stars
    for (let i = 0; i < particleCount; i++) {
      newStars.push({
        x: Math.random() * dimensions.width,
        y: Math.random() * dimensions.height,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.8 + 0.2,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: (Math.random() * 0.1 + 0.05) * speedFactor
      });
    }
    
    // Create nebulas
    for (let i = 0; i < 3; i++) {
      newNebulas.push({
        x: Math.random() * dimensions.width,
        y: Math.random() * dimensions.height,
        size: Math.random() * 200 + 100,
        color: getColor(),
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() * 0.002 + 0.001) * speedFactor
      });
    }
    
    setStars(newStars);
    setNebulas(newNebulas);
  }, [getDensityCount, getSpeedFactor, getColor]);
  
  // Draw the cosmic effect
  const drawCosmic = useCallback((
    ctx: CanvasRenderingContext2D,
    dimensions: { width: number; height: number },
    timestamp: number
  ) => {
    // Update and draw nebulas first
    const updatedNebulas = nebulas.map(nebula => {
      const rotation = nebula.rotation + nebula.rotationSpeed;
      return { ...nebula, rotation };
    });
    
    updatedNebulas.forEach(nebula => {
      ctx.save();
      ctx.translate(nebula.x, nebula.y);
      ctx.rotate(nebula.rotation);
      
      const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, nebula.size);
      gradient.addColorStop(0, nebula.color.replace(')', ', 0.4)'));
      gradient.addColorStop(0.5, nebula.color.replace(')', ', 0.1)'));
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.ellipse(0, 0, nebula.size, nebula.size * 0.6, 0, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.restore();
    });
    
    // Update and draw stars
    const updatedStars = stars.map(star => {
      const pulse = star.pulse + star.pulseSpeed;
      const pulseFactor = Math.sin(pulse) * 0.5 + 0.5;
      const opacity = 0.2 + pulseFactor * 0.6;
      return { ...star, pulse, opacity };
    });
    
    updatedStars.forEach(star => {
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
      ctx.fill();
    });
    
    // Update state
    setStars(updatedStars);
    setNebulas(updatedNebulas);
  }, [stars, nebulas]);
  
  return (
    <div className={`absolute inset-0 ${className}`}>
      <BaseEffect
        draw={drawCosmic}
        onResize={handleResize}
      />
    </div>
  );
};

export default CosmicEffect;
