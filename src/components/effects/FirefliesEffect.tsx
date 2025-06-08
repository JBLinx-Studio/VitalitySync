import React, { useCallback, useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import BaseEffect from './BaseEffect';

interface FirefliesEffectProps {
  density?: 'low' | 'medium' | 'high';
  speed?: 'slow' | 'medium' | 'fast';
  interactive?: boolean;
  color?: string;
  className?: string;
}

interface Firefly {
  x: number;
  y: number;
  size: number;
  opacity: number;
  speed: number;
  direction: number;
  pulse: number;
  pulseSpeed: number;
}

const FirefliesEffect: React.FC<FirefliesEffectProps> = ({
  density = 'medium',
  speed = 'medium',
  interactive = false,
  color,
  className = ''
}) => {
  const { theme } = useTheme();
  const [fireflies, setFireflies] = useState<Firefly[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMouseInCanvas, setIsMouseInCanvas] = useState(false);
  
  // Get density count based on the density prop
  const getDensityCount = useCallback(() => {
    switch (density) {
      case 'low': return 20;
      case 'medium': return 40;
      case 'high': return 80;
      default: return 40;
    }
  }, [density]);
  
  // Get speed factor based on the speed prop
  const getSpeedFactor = useCallback(() => {
    switch (speed) {
      case 'slow': return 0.5;
      case 'medium': return 1;
      case 'fast': return 1.5;
      default: return 1;
    }
  }, [speed]);
  
  // Get color based on theme and provided color
  const getColor = useCallback(() => {
    if (color) return color;
    
    // Default colors based on theme
    if (theme === 'dark') {
      return 'rgba(251, 191, 36, 0.8)';
    } else {
      return 'rgba(251, 191, 36, 0.6)';
    }
  }, [color, theme]);
  
  // Handle mouse events for interactivity
  const handleMouseMove = useCallback((e: MouseEvent) => {
    const container = document.getElementById('fireflies-container');
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
    
    const container = document.getElementById('fireflies-container');
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
  
  // Initialize fireflies when dimensions change
  const handleResize = useCallback((dimensions: { width: number; height: number }) => {
    const fireflyCount = getDensityCount();
    const speedFactor = getSpeedFactor();
    const newFireflies: Firefly[] = [];
    
    for (let i = 0; i < fireflyCount; i++) {
      newFireflies.push({
        x: Math.random() * dimensions.width,
        y: Math.random() * dimensions.height,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.5 + 0.2,
        speed: (Math.random() * 0.5 + 0.5) * speedFactor,
        direction: Math.random() * Math.PI * 2,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: (Math.random() * 0.02 + 0.01) * speedFactor
      });
    }
    
    setFireflies(newFireflies);
  }, [getDensityCount, getSpeedFactor]);
  
  // Draw the fireflies effect
  const drawFireflies = useCallback((
    ctx: CanvasRenderingContext2D,
    dimensions: { width: number; height: number },
    timestamp: number
  ) => {
    const fireflyColor = getColor();
    
    // Update fireflies
    const updatedFireflies = fireflies.map(firefly => {
      let { x, y, direction, pulse, opacity, speed } = firefly;
      
      // Update pulse for glowing effect
      pulse += firefly.pulseSpeed;
      const pulseFactor = Math.sin(pulse) * 0.5 + 0.5;
      opacity = 0.2 + pulseFactor * 0.6;
      
      // Interactive behavior
      if (interactive && isMouseInCanvas) {
        const dx = x - mousePosition.x;
        const dy = y - mousePosition.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 150) {
          // Change direction to move away from mouse
          direction = Math.atan2(dy, dx);
          speed = firefly.speed * 2;
        }
      }
      
      // Random direction changes
      if (Math.random() < 0.01) {
        direction += (Math.random() - 0.5) * 0.5;
      }
      
      // Move firefly
      x += Math.cos(direction) * speed;
      y += Math.sin(direction) * speed;
      
      // Keep within bounds
      if (x < 0) x = dimensions.width;
      if (x > dimensions.width) x = 0;
      if (y < 0) y = dimensions.height;
      if (y > dimensions.height) y = 0;
      
      return { ...firefly, x, y, direction, pulse, opacity, speed };
    });
    
    // Draw fireflies with glow effect
    updatedFireflies.forEach(firefly => {
      // Draw glow
      const glow = ctx.createRadialGradient(
        firefly.x, firefly.y, 0,
        firefly.x, firefly.y, firefly.size * 3
      );
      glow.addColorStop(0, fireflyColor.replace(')', `, ${firefly.opacity})`));
      glow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      
      ctx.beginPath();
      ctx.fillStyle = glow;
      ctx.arc(firefly.x, firefly.y, firefly.size * 3, 0, Math.PI * 2);
      ctx.fill();
      
      // Draw core
      ctx.beginPath();
      ctx.arc(firefly.x, firefly.y, firefly.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${firefly.opacity})`;
      ctx.fill();
    });
    
    // Update state
    setFireflies(updatedFireflies);
  }, [fireflies, getColor, interactive, isMouseInCanvas, mousePosition]);
  
  return (
    <div id="fireflies-container" className={`absolute inset-0 ${className}`}>
      <BaseEffect
        draw={drawFireflies}
        onResize={handleResize}
      />
    </div>
  );
};

export default FirefliesEffect;
