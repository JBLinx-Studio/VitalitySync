
import React, { useMemo, useCallback, useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import BaseEffect from './BaseEffect';

interface ParticlesEffectProps {
  density?: 'low' | 'medium' | 'high';
  speed?: 'slow' | 'medium' | 'fast';
  interactive?: boolean;
  color?: string;
  className?: string;
}

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
}

const ParticlesEffect: React.FC<ParticlesEffectProps> = ({
  density = 'medium',
  speed = 'medium',
  interactive = false,
  color,
  className = ''
}) => {
  const { theme } = useTheme();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMouseInCanvas, setIsMouseInCanvas] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  
  // Get density count based on the density prop
  const getDensityCount = useCallback(() => {
    switch (density) {
      case 'low': return 30;
      case 'medium': return 60;
      case 'high': return 100;
      default: return 60;
    }
  }, [density]);
  
  // Get speed factor based on the speed prop - REDUCED for smoother effect
  const getSpeedFactor = useCallback(() => {
    switch (speed) {
      case 'slow': return 0.2;
      case 'medium': return 0.5;
      case 'fast': return 1;
      default: return 0.5;
    }
  }, [speed]);
  
  // Get color based on theme and provided color
  const getColor = useCallback(() => {
    if (color) return color;
    
    // Default colors based on theme
    if (theme === 'dark') {
      return 'rgba(79, 209, 197, 0.4)';
    } else {
      return 'rgba(79, 209, 197, 0.2)';
    }
  }, [color, theme]);
  
  // Initialize particles when dimensions change
  const handleResize = useCallback((dimensions: { width: number; height: number }) => {
    const particleCount = getDensityCount();
    const newParticles: Particle[] = [];
    
    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        x: Math.random() * dimensions.width,
        y: Math.random() * dimensions.height,
        size: Math.random() * 2 + 0.5, // Smaller particles
        speedX: (Math.random() - 0.5) * getSpeedFactor() * 0.5, // Reduce speed by half
        speedY: (Math.random() - 0.5) * getSpeedFactor() * 0.5, // Reduce speed by half
        opacity: Math.random() * 0.6 + 0.1 // Lower opacity
      });
    }
    
    setParticles(newParticles);
  }, [getDensityCount, getSpeedFactor]);
  
  // Handle mouse events for interactivity
  const handleMouseMove = useCallback((e: MouseEvent) => {
    const container = document.getElementById('particles-container');
    if (!container) return;
    
    const rect = container.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  }, []);
  
  const handleMouseEnter = useCallback(() => {
    setIsMouseInCanvas(true);
  }, []);
  
  const handleMouseLeave = useCallback(() => {
    setIsMouseInCanvas(false);
  }, []);
  
  // Set up mouse event listeners
  React.useEffect(() => {
    if (!interactive) return;
    
    const container = document.getElementById('particles-container');
    if (!container) return;
    
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [interactive, handleMouseMove, handleMouseEnter, handleMouseLeave]);
  
  // Draw the particles
  const drawParticles = useCallback((
    ctx: CanvasRenderingContext2D,
    dimensions: { width: number; height: number },
    timestamp: number
  ) => {
    const particleColor = getColor();
    const speedFactor = getSpeedFactor();
    
    // Update particles
    const updatedParticles = particles.map(particle => {
      let { x, y, speedX, speedY } = particle;
      
      // Interactive behavior - gentler interaction
      if (interactive && isMouseInCanvas) {
        const dx = x - mousePosition.x;
        const dy = y - mousePosition.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 100) {
          const forceDirectionX = dx / distance;
          const forceDirectionY = dy / distance;
          const force = (100 - distance) / 100;
          speedX += forceDirectionX * force * 0.2; // Reduced force
          speedY += forceDirectionY * force * 0.2; // Reduced force
        }
      }
      
      // Apply speed limits - tighter limits
      speedX = Math.max(-speedFactor * 0.5, Math.min(speedFactor * 0.5, speedX));
      speedY = Math.max(-speedFactor * 0.5, Math.min(speedFactor * 0.5, speedY));
      
      x += speedX;
      y += speedY;
      
      // Wrap particles around screen
      if (x < 0) x = dimensions.width;
      if (x > dimensions.width) x = 0;
      if (y < 0) y = dimensions.height;
      if (y > dimensions.height) y = 0;
      
      return { ...particle, x, y, speedX, speedY };
    });
    
    // Draw connecting lines - fewer connections, more subtle
    ctx.strokeStyle = particleColor.replace(')', ',0.05)'); // More subtle lines
    ctx.lineWidth = 0.3;
    
    for (let i = 0; i < updatedParticles.length; i++) {
      for (let j = i; j < updatedParticles.length; j++) {
        const dx = updatedParticles[i].x - updatedParticles[j].x;
        const dy = updatedParticles[i].y - updatedParticles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 70) { // Shorter connection distance
          ctx.beginPath();
          ctx.moveTo(updatedParticles[i].x, updatedParticles[i].y);
          ctx.lineTo(updatedParticles[j].x, updatedParticles[j].y);
          ctx.stroke();
        }
      }
    }
    
    // Draw particles
    updatedParticles.forEach(particle => {
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fillStyle = particleColor.replace(')', `,${particle.opacity})`);
      ctx.fill();
    });
    
    // Update state for next frame
    setParticles(updatedParticles);
  }, [particles, getColor, getSpeedFactor, interactive, isMouseInCanvas, mousePosition]);
  
  return (
    <div id="particles-container" className={`absolute inset-0 ${className}`}>
      <BaseEffect
        draw={drawParticles}
        onResize={handleResize}
      />
    </div>
  );
};

export default ParticlesEffect;
