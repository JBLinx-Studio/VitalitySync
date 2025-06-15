import React, { useCallback, useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import BaseEffect from './BaseEffect';

interface AuroraEffectProps {
  density?: 'low' | 'medium' | 'high';
  speed?: 'slow' | 'medium' | 'fast';
  interactive?: boolean;
  color?: string;
  className?: string;
}

interface AuroraWave {
  points: { x: number; y: number }[];
  color: string;
  speed: number;
  offset: number;
}

const AuroraEffect: React.FC<AuroraEffectProps> = ({
  density = 'medium',
  speed = 'medium',
  color,
  className = ''
}) => {
  const { theme } = useTheme();
  const [waves, setWaves] = useState<AuroraWave[]>([]);
  
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
      return 'rgba(16, 185, 129, 0.6)';
    } else {
      return 'rgba(16, 185, 129, 0.3)';
    }
  }, [color, theme]);
  
  // Initialize aurora waves when dimensions change
  const handleResize = useCallback((dimensions: { width: number; height: number }) => {
    const speedFactor = getSpeedFactor();
    const baseColor = getColor();
    
    const colorBase = baseColor.replace(/[^,]+(?=\))/, '0.6');
    const secondaryColor = baseColor.replace('rgba', 'rgba').replace(/[^,]+(?=\))/, '0.4');
    const tertiaryColor = baseColor.replace('rgba', 'rgba').replace(/[^,]+(?=\))/, '0.2');
    
    const newWaves: AuroraWave[] = [];
    
    // Create waves
    const createWave = (color: string, yStart: number, speed: number) => {
      const points: { x: number; y: number }[] = [];
      const segments = Math.floor(dimensions.width / 50);
      
      for (let i = 0; i <= segments; i++) {
        points.push({
          x: i * (dimensions.width / segments),
          y: yStart + (Math.random() * 50 - 25)
        });
      }
      
      return {
        points,
        color,
        speed: speed * speedFactor,
        offset: Math.random() * Math.PI * 2
      };
    };
    
    newWaves.push(createWave(colorBase, dimensions.height * 0.6, 0.5));
    newWaves.push(createWave(secondaryColor, dimensions.height * 0.7, 0.3));
    newWaves.push(createWave(tertiaryColor, dimensions.height * 0.8, 0.2));
    
    setWaves(newWaves);
  }, [getSpeedFactor, getColor]);
  
  // Draw the aurora effect
  const drawAurora = useCallback((
    ctx: CanvasRenderingContext2D,
    dimensions: { width: number; height: number },
    timestamp: number
  ) => {
    // Draw starfield background
    for (let i = 0; i < 50; i++) {
      const x = Math.random() * dimensions.width;
      const y = Math.random() * dimensions.height * 0.5;
      const size = Math.random() * 1.5 + 0.5;
      const opacity = Math.random() * 0.8 + 0.2;
      
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
      ctx.fill();
    }
    
    // Update and draw waves
    const updatedWaves = waves.map(wave => {
      const updatedWave = { ...wave };
      updatedWave.offset += wave.speed;
      
      // Update points
      updatedWave.points = wave.points.map((point, index) => {
        const x = point.x;
        const waveHeight = Math.sin((x / dimensions.width) * Math.PI * 2 + wave.offset) * 20;
        const y = point.y + waveHeight * 0.05;
        
        // Keep within bounds
        const minY = dimensions.height * 0.2;
        const maxY = dimensions.height * 0.8;
        return {
          x,
          y: Math.max(minY, Math.min(maxY, y))
        };
      });
      
      return updatedWave;
    });
    
    // Draw waves
    updatedWaves.forEach(wave => {
      ctx.beginPath();
      ctx.moveTo(0, dimensions.height);
      
      // Draw curve through points
      for (let i = 0; i < wave.points.length - 1; i++) {
        const xc = (wave.points[i].x + wave.points[i + 1].x) / 2;
        const yc = (wave.points[i].y + wave.points[i + 1].y) / 2;
        ctx.quadraticCurveTo(wave.points[i].x, wave.points[i].y, xc, yc);
      }
      
      // Complete the path
      ctx.quadraticCurveTo(
        wave.points[wave.points.length - 1].x,
        wave.points[wave.points.length - 1].y,
        dimensions.width,
        dimensions.height
      );
      
      ctx.lineTo(dimensions.width, dimensions.height);
      ctx.lineTo(0, dimensions.height);
      ctx.closePath();
      
      // Create gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, dimensions.height);
      gradient.addColorStop(0, wave.color);
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      
      ctx.fillStyle = gradient;
      ctx.fill();
    });
    
    // Update state
    setWaves(updatedWaves);
  }, [waves]);
  
  return (
    <div className={`absolute inset-0 ${className}`}>
      <BaseEffect
        draw={drawAurora}
        onResize={handleResize}
      />
    </div>
  );
};

export default AuroraEffect;
