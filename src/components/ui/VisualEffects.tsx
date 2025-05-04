
import React, { useEffect, useRef } from 'react';
import { useTheme } from '@/contexts/ThemeContext';

interface VisualEffectsProps {
  type?: 'cosmic' | 'aurora' | 'particles' | 'fireflies';
  density?: 'low' | 'medium' | 'high';
  speed?: 'slow' | 'medium' | 'fast';
  interactive?: boolean;
}

const VisualEffects: React.FC<VisualEffectsProps> = ({
  type = 'cosmic',
  density = 'medium',
  speed = 'medium',
  interactive = true
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme, isReducedMotion } = useTheme();
  
  useEffect(() => {
    if (isReducedMotion) return;
    
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let animationFrameId: number;
    let particles: any[] = [];
    let mouseX = 0;
    let mouseY = 0;
    
    const resizeCanvas = () => {
      if (canvas && container) {
        canvas.width = container.offsetWidth;
        canvas.height = container.offsetHeight;
        initParticles();
      }
    };
    
    const getParticleCount = () => {
      const baseCount = canvas.width * canvas.height / 10000;
      switch (density) {
        case 'low': return Math.floor(baseCount * 0.5);
        case 'high': return Math.floor(baseCount * 2);
        default: return Math.floor(baseCount);
      }
    };
    
    const getSpeedMultiplier = () => {
      switch (speed) {
        case 'slow': return 0.5;
        case 'fast': return 2;
        default: return 1;
      }
    };
    
    const initParticles = () => {
      particles = [];
      const count = getParticleCount();
      const speedMultiplier = getSpeedMultiplier();
      
      for (let i = 0; i < count; i++) {
        let particle: any = {};
        
        if (type === 'cosmic') {
          particle = {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 2 + 0.5,
            color: theme === 'dark' 
              ? `rgba(${124 + Math.random() * 50}, ${58 + Math.random() * 50}, ${237 + Math.random() * 18}, ${Math.random() * 0.5 + 0.3})`
              : `rgba(${79 + Math.random() * 50}, ${209 + Math.random() * 40}, ${197 + Math.random() * 30}, ${Math.random() * 0.5 + 0.3})`,
            speedX: (Math.random() - 0.5) * speedMultiplier,
            speedY: (Math.random() - 0.5) * speedMultiplier,
            lifespan: Math.random() * 1000 + 2000,
            age: 0,
            pulsating: Math.random() > 0.7,
            pulseSpeed: Math.random() * 0.03 + 0.01
          };
        } else if (type === 'aurora') {
          particle = {
            x: Math.random() * canvas.width,
            y: canvas.height + Math.random() * 100,
            width: Math.random() * 200 + 100,
            height: Math.random() * 100 + 50,
            speedY: -(Math.random() * 0.5 + 0.2) * speedMultiplier,
            color1: `rgba(${6 + Math.random() * 40}, ${182 + Math.random() * 30}, ${212 + Math.random() * 43}, ${Math.random() * 0.2 + 0.1})`,
            color2: `rgba(${124 + Math.random() * 50}, ${58 + Math.random() * 40}, ${237 + Math.random() * 18}, ${Math.random() * 0.2 + 0.1})`,
            lifespan: Math.random() * 20000 + 10000,
            age: 0
          };
        } else if (type === 'fireflies') {
          particle = {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 3 + 1,
            color: theme === 'dark' 
              ? `rgba(${251 + Math.random() * 5}, ${191 + Math.random() * 5}, ${36 + Math.random() * 5}, ${Math.random() * 0.7 + 0.3})`
              : `rgba(${255}, ${255}, ${255}, ${Math.random() * 0.7 + 0.3})`,
            speedX: (Math.random() - 0.5) * speedMultiplier,
            speedY: (Math.random() - 0.5) * speedMultiplier,
            lifespan: Math.random() * 5000 + 3000,
            age: 0,
            glowing: true,
            glowRadius: Math.random() * 10 + 5,
            pulseSpeed: Math.random() * 0.05 + 0.02
          };
        } else { // particles
          particle = {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 4 + 1,
            color: theme === 'dark' 
              ? `rgba(${79 + Math.random() * 20}, ${209 + Math.random() * 20}, ${197 + Math.random() * 20}, ${Math.random() * 0.4 + 0.1})`
              : `rgba(${155 + Math.random() * 20}, ${135 + Math.random() * 20}, ${245 + Math.random() * 10}, ${Math.random() * 0.3 + 0.1})`,
            speedX: (Math.random() - 0.5) * speedMultiplier,
            speedY: (Math.random() - 0.5) * speedMultiplier,
            lifespan: Math.random() * 8000 + 5000,
            age: 0
          };
        }
        
        particles.push(particle);
      }
    };
    
    const drawCosmicParticle = (p: any) => {
      if (!ctx) return;
      
      const lifeRatio = p.age / p.lifespan;
      const opacity = lifeRatio < 0.2 
        ? lifeRatio * 5 
        : lifeRatio > 0.8 
          ? (1 - lifeRatio) * 5 
          : 1;
      
      const color = p.color.replace(/[\d\.]+\)$/, `${opacity})`);
      
      ctx.beginPath();
      if (p.pulsating) {
        const pulseScale = 1 + Math.sin(p.age * p.pulseSpeed) * 0.5;
        ctx.arc(p.x, p.y, p.radius * pulseScale, 0, Math.PI * 2);
        
        // Add glow for some particles
        if (Math.random() > 0.8) {
          const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 5);
          glow.addColorStop(0, color);
          glow.addColorStop(1, 'rgba(0,0,0,0)');
          ctx.fillStyle = glow;
          ctx.fill();
        }
      } else {
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      }
      
      ctx.fillStyle = color;
      ctx.fill();
    };
    
    const drawAuroraParticle = (p: any) => {
      if (!ctx) return;
      
      const lifeRatio = p.age / p.lifespan;
      const opacity = lifeRatio < 0.2 
        ? lifeRatio * 5 
        : lifeRatio > 0.8 
          ? (1 - lifeRatio) * 5 
          : 1;
      
      const gradient = ctx.createLinearGradient(p.x, p.y, p.x + p.width, p.y);
      gradient.addColorStop(0, p.color1.replace(/[\d\.]+\)$/, `${opacity * 0.8})`));
      gradient.addColorStop(0.5, p.color2.replace(/[\d\.]+\)$/, `${opacity})`));
      gradient.addColorStop(1, p.color1.replace(/[\d\.]+\)$/, `${opacity * 0.8})`));
      
      ctx.beginPath();
      ctx.globalAlpha = opacity;
      ctx.fillStyle = gradient;
      
      // Create wavy aurora shape
      const waveHeight = 20;
      const waveCount = 3;
      
      ctx.moveTo(p.x, p.y);
      for (let i = 0; i <= waveCount; i++) {
        const x = p.x + (p.width / waveCount) * i;
        const y = p.y + Math.sin((p.age / 1000) + i) * waveHeight;
        ctx.lineTo(x, y);
      }
      for (let i = waveCount; i >= 0; i--) {
        const x = p.x + (p.width / waveCount) * i;
        const y = p.y + p.height + Math.sin((p.age / 1000) + i + Math.PI) * waveHeight;
        ctx.lineTo(x, y);
      }
      
      ctx.closePath();
      ctx.fill();
      ctx.globalAlpha = 1;
    };
    
    const drawFireflyParticle = (p: any) => {
      if (!ctx) return;
      
      const lifeRatio = p.age / p.lifespan;
      const opacity = lifeRatio < 0.2 
        ? lifeRatio * 5 
        : lifeRatio > 0.8 
          ? (1 - lifeRatio) * 5 
          : 1;
      
      // Pulse effect
      const pulseScale = 1 + Math.sin(p.age * p.pulseSpeed) * 0.3;
      const radius = p.radius * pulseScale * opacity;
      
      if (p.glowing) {
        // Create glowing effect
        const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.glowRadius);
        glow.addColorStop(0, p.color);
        glow.addColorStop(1, 'rgba(0,0,0,0)');
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.glowRadius, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();
      }
      
      // Draw firefly body
      ctx.beginPath();
      ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color.replace(/[\d\.]+\)$/, `${opacity})`);
      ctx.fill();
    };
    
    const drawParticle = (p: any) => {
      if (!ctx) return;
      
      const lifeRatio = p.age / p.lifespan;
      const opacity = lifeRatio < 0.2 
        ? lifeRatio * 5 
        : lifeRatio > 0.8 
          ? (1 - lifeRatio) * 5 
          : 1;
      
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color.replace(/[\d\.]+\)$/, `${opacity})`);
      ctx.fill();
    };
    
    const updateAndDrawParticles = () => {
      if (!ctx || !canvas) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const newParticles = [];
      
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.age += 16; // Approximately 16ms per frame at 60fps
        
        if (p.age < p.lifespan) {
          // Update position
          p.x += p.speedX;
          p.y += p.speedY;
          
          // Interactive behavior if enabled
          if (interactive) {
            const dx = p.x - mouseX;
            const dy = p.y - mouseY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const maxDistance = 150;
            
            if (distance < maxDistance) {
              const force = (1 - distance / maxDistance) * 0.6;
              p.speedX += dx * force * 0.01;
              p.speedY += dy * force * 0.01;
            }
            
            // Apply slight drag to prevent excessive speed
            p.speedX *= 0.99;
            p.speedY *= 0.99;
          }
          
          // Handle boundaries
          if (p.x < 0) p.x = canvas.width;
          if (p.x > canvas.width) p.x = 0;
          if (p.y < 0) p.y = canvas.height;
          if (p.y > canvas.height) p.y = 0;
          
          // Draw particle based on type
          if (type === 'cosmic') {
            drawCosmicParticle(p);
          } else if (type === 'aurora') {
            drawAuroraParticle(p);
          } else if (type === 'fireflies') {
            drawFireflyParticle(p);
          } else {
            drawParticle(p);
          }
          
          newParticles.push(p);
        }
      }
      
      // Replace old particles array with updated particles
      particles = newParticles;
      
      // Add new particles to maintain count
      while (particles.length < getParticleCount()) {
        let newParticle: any = {};
        
        if (type === 'cosmic') {
          newParticle = {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 2 + 0.5,
            color: theme === 'dark' 
              ? `rgba(${124 + Math.random() * 50}, ${58 + Math.random() * 50}, ${237 + Math.random() * 18}, ${Math.random() * 0.5 + 0.3})`
              : `rgba(${79 + Math.random() * 50}, ${209 + Math.random() * 40}, ${197 + Math.random() * 30}, ${Math.random() * 0.5 + 0.3})`,
            speedX: (Math.random() - 0.5) * getSpeedMultiplier(),
            speedY: (Math.random() - 0.5) * getSpeedMultiplier(),
            lifespan: Math.random() * 1000 + 2000,
            age: 0,
            pulsating: Math.random() > 0.7,
            pulseSpeed: Math.random() * 0.03 + 0.01
          };
        } else if (type === 'aurora') {
          newParticle = {
            x: Math.random() * canvas.width,
            y: canvas.height + Math.random() * 100,
            width: Math.random() * 200 + 100,
            height: Math.random() * 100 + 50,
            speedY: -(Math.random() * 0.5 + 0.2) * getSpeedMultiplier(),
            color1: `rgba(${6 + Math.random() * 40}, ${182 + Math.random() * 30}, ${212 + Math.random() * 43}, ${Math.random() * 0.2 + 0.1})`,
            color2: `rgba(${124 + Math.random() * 50}, ${58 + Math.random() * 40}, ${237 + Math.random() * 18}, ${Math.random() * 0.2 + 0.1})`,
            lifespan: Math.random() * 20000 + 10000,
            age: 0
          };
        } else if (type === 'fireflies') {
          newParticle = {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 3 + 1,
            color: theme === 'dark' 
              ? `rgba(${251 + Math.random() * 5}, ${191 + Math.random() * 5}, ${36 + Math.random() * 5}, ${Math.random() * 0.7 + 0.3})`
              : `rgba(${255}, ${255}, ${255}, ${Math.random() * 0.7 + 0.3})`,
            speedX: (Math.random() - 0.5) * getSpeedMultiplier(),
            speedY: (Math.random() - 0.5) * getSpeedMultiplier(),
            lifespan: Math.random() * 5000 + 3000,
            age: 0,
            glowing: true,
            glowRadius: Math.random() * 10 + 5,
            pulseSpeed: Math.random() * 0.05 + 0.02
          };
        } else { // particles
          newParticle = {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 4 + 1,
            color: theme === 'dark' 
              ? `rgba(${79 + Math.random() * 20}, ${209 + Math.random() * 20}, ${197 + Math.random() * 20}, ${Math.random() * 0.4 + 0.1})`
              : `rgba(${155 + Math.random() * 20}, ${135 + Math.random() * 20}, ${245 + Math.random() * 10}, ${Math.random() * 0.3 + 0.1})`,
            speedX: (Math.random() - 0.5) * getSpeedMultiplier(),
            speedY: (Math.random() - 0.5) * getSpeedMultiplier(),
            lifespan: Math.random() * 8000 + 5000,
            age: 0
          };
        }
        
        particles.push(newParticle);
      }
      
      animationFrameId = requestAnimationFrame(updateAndDrawParticles);
    };
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!container) return;
      
      const rect = container.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };
    
    // Setup event listeners
    window.addEventListener('resize', resizeCanvas);
    if (interactive) {
      container.addEventListener('mousemove', handleMouseMove);
    }
    
    // Initialize
    resizeCanvas();
    updateAndDrawParticles();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, [type, density, speed, interactive, theme, isReducedMotion]);
  
  if (isReducedMotion) {
    return null;
  }
  
  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
    >
      <canvas 
        ref={canvasRef} 
        className="w-full h-full"
      />
    </div>
  );
};

export default VisualEffects;
