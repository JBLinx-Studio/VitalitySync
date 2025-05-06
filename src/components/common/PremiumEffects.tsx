import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { VisualEffectProps } from '@/types';

const PremiumEffects: React.FC<VisualEffectProps> = ({ 
  type = 'particles', 
  density = 'medium', 
  speed = 'medium',
  interactive = false,
  color,
  className = ''
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const { theme, isReducedMotion } = useTheme();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMouseInCanvas, setIsMouseInCanvas] = useState(false);

  // Get density count based on the density prop
  const getDensityCount = () => {
    switch (density) {
      case 'low': return 30;
      case 'medium': return 60;
      case 'high': return 100;
      default: return 60;
    }
  };

  // Get speed factor based on the speed prop
  const getSpeedFactor = () => {
    switch (speed) {
      case 'slow': return 0.5;
      case 'medium': return 1;
      case 'fast': return 2;
      default: return 1;
    }
  };

  // Get color based on theme and provided color
  const getColor = () => {
    if (color) return color;
    
    // Default colors based on theme
    if (theme === 'dark') {
      switch (type) {
        case 'aurora': return 'rgba(16, 185, 129, 0.6)';
        case 'cosmic': return 'rgba(139, 92, 246, 0.7)';
        case 'particles': return 'rgba(79, 209, 197, 0.6)';
        case 'matrix': return 'rgba(16, 185, 129, 0.7)';
        case 'gradient': return 'rgba(79, 209, 197, 0.6)';
        case 'atmosphere': return 'rgba(59, 130, 246, 0.6)';
        default: return 'rgba(79, 209, 197, 0.6)';
      }
    } else {
      switch (type) {
        case 'aurora': return 'rgba(16, 185, 129, 0.3)';
        case 'cosmic': return 'rgba(139, 92, 246, 0.3)';
        case 'particles': return 'rgba(79, 209, 197, 0.3)';
        case 'matrix': return 'rgba(16, 185, 129, 0.3)';
        case 'gradient': return 'rgba(79, 209, 197, 0.3)';
        case 'atmosphere': return 'rgba(59, 130, 246, 0.3)';
        default: return 'rgba(79, 209, 197, 0.3)';
      }
    }
  };

  // Particles effect
  const renderParticlesEffect = () => {
    if (!canvasRef.current || isReducedMotion) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const particleColor = getColor();
    const particleCount = getDensityCount();
    const speedFactor = getSpeedFactor();
    
    // Resize canvas
    const resizeCanvas = () => {
      if (!containerRef.current || !canvas) return;
      canvas.width = containerRef.current.clientWidth;
      canvas.height = containerRef.current.clientHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Create particles
    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      color: string;
      
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 0.5;
        this.speedX = (Math.random() - 0.5) * speedFactor;
        this.speedY = (Math.random() - 0.5) * speedFactor;
        this.opacity = Math.random() * 0.8 + 0.2;
        this.color = particleColor;
      }
      
      update() {
        if (interactive && isMouseInCanvas) {
          // Calculate distance from mouse
          const dx = this.x - mousePosition.x;
          const dy = this.y - mousePosition.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          // Repel particles from mouse with smooth effect
          if (distance < 100) {
            const forceDirectionX = dx / distance;
            const forceDirectionY = dy / distance;
            const force = (100 - distance) / 100;
            this.speedX += forceDirectionX * force * 0.5;
            this.speedY += forceDirectionY * force * 0.5;
          }
        }
        
        // Apply speed limits
        this.speedX = Math.max(-speedFactor, Math.min(speedFactor, this.speedX));
        this.speedY = Math.max(-speedFactor, Math.min(speedFactor, this.speedY));
        
        this.x += this.speedX;
        this.y += this.speedY;
        
        // Wrap particles around screen
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
      }
      
      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color.replace(')', `,${this.opacity})`);
        ctx.fill();
      }
    }
    
    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
    
    const animate = () => {
      if (!ctx || !canvas) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw connecting lines
      ctx.strokeStyle = particleColor.replace(')', ',0.15)');
      ctx.lineWidth = 0.5;
      
      for (let i = 0; i < particles.length; i++) {
        for (let j = i; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
        
        particles[i].update();
        particles[i].draw();
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    // Mouse interaction setup
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    };
    
    const handleMouseEnter = () => {
      setIsMouseInCanvas(true);
    };
    
    const handleMouseLeave = () => {
      setIsMouseInCanvas(false);
    };
    
    if (interactive) {
      containerRef.current?.addEventListener('mousemove', handleMouseMove);
      containerRef.current?.addEventListener('mouseenter', handleMouseEnter);
      containerRef.current?.addEventListener('mouseleave', handleMouseLeave);
    }
    
    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', resizeCanvas);
      
      if (interactive && containerRef.current) {
        containerRef.current.removeEventListener('mousemove', handleMouseMove);
        containerRef.current.removeEventListener('mouseenter', handleMouseEnter);
        containerRef.current.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  };

  // Aurora effect
  const renderAuroraEffect = () => {
    if (!canvasRef.current || isReducedMotion) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const baseColor = getColor();
    const speedFactor = getSpeedFactor();
    
    // Resize canvas
    const resizeCanvas = () => {
      if (!containerRef.current || !canvas) return;
      canvas.width = containerRef.current.clientWidth;
      canvas.height = containerRef.current.clientHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Create aurora waves
    class AuroraWave {
      points: {x: number, y: number}[];
      color: string;
      speed: number;
      offset: number;
      
      constructor(color: string, yStart: number, speed: number) {
        this.points = [];
        this.color = color;
        this.speed = speed * speedFactor;
        this.offset = 0;
        
        const segments = Math.floor(canvas.width / 50);
        for (let i = 0; i <= segments; i++) {
          this.points.push({
            x: i * (canvas.width / segments),
            y: yStart + (Math.random() * 50 - 25)
          });
        }
      }
      
      update() {
        this.offset += this.speed;
        for (let i = 0; i < this.points.length; i++) {
          const x = this.points[i].x;
          const waveHeight = Math.sin((x / canvas.width) * Math.PI * 2 + this.offset) * 20;
          this.points[i].y += waveHeight * 0.05;
          
          // Keep within bounds
          const minY = canvas.height * 0.2;
          const maxY = canvas.height * 0.8;
          if (this.points[i].y < minY) this.points[i].y = minY;
          if (this.points[i].y > maxY) this.points[i].y = maxY;
        }
      }
      
      draw() {
        if (!ctx) return;
        
        ctx.beginPath();
        ctx.moveTo(0, canvas.height);
        
        // Draw curve through points
        for (let i = 0; i < this.points.length - 1; i++) {
          const xc = (this.points[i].x + this.points[i + 1].x) / 2;
          const yc = (this.points[i].y + this.points[i + 1].y) / 2;
          ctx.quadraticCurveTo(this.points[i].x, this.points[i].y, xc, yc);
        }
        
        // Complete the path
        ctx.quadraticCurveTo(
          this.points[this.points.length - 1].x,
          this.points[this.points.length - 1].y,
          canvas.width,
          canvas.height
        );
        
        ctx.lineTo(canvas.width, canvas.height);
        ctx.lineTo(0, canvas.height);
        ctx.closePath();
        
        // Create gradient
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0, this.color);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        
        ctx.fillStyle = gradient;
        ctx.fill();
      }
    }
    
    const colorBase = baseColor.replace(/[^,]+(?=\))/, '0.6');
    const secondaryColor = baseColor.replace('rgba', 'rgba').replace(/[^,]+(?=\))/, '0.4');
    const tertiaryColor = baseColor.replace('rgba', 'rgba').replace(/[^,]+(?=\))/, '0.2');
    
    const waves = [
      new AuroraWave(colorBase, canvas.height * 0.6, 0.5),
      new AuroraWave(secondaryColor, canvas.height * 0.7, 0.3),
      new AuroraWave(tertiaryColor, canvas.height * 0.8, 0.2)
    ];
    
    const animate = () => {
      if (!ctx || !canvas) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (const wave of waves) {
        wave.update();
        wave.draw();
      }
      
      // Add stars
      for (let i = 0; i < 50; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height * 0.5;
        const size = Math.random() * 1.5 + 0.5;
        const opacity = Math.random() * 0.8 + 0.2;
        
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.fill();
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', resizeCanvas);
    };
  };

  // Cosmic effect
  const renderCosmicEffect = () => {
    if (!canvasRef.current || isReducedMotion) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Resize canvas
    const resizeCanvas = () => {
      if (!containerRef.current || !canvas) return;
      canvas.width = containerRef.current.clientWidth;
      canvas.height = containerRef.current.clientHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Create stars
    class Star {
      x: number;
      y: number;
      size: number;
      opacity: number;
      pulse: number;
      pulseSpeed: number;
      
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.opacity = Math.random() * 0.8 + 0.2;
        this.pulse = 0;
        this.pulseSpeed = (Math.random() * 0.1 + 0.05) * getSpeedFactor();
      }
      
      update() {
        this.pulse += this.pulseSpeed;
        const pulseFactor = Math.sin(this.pulse) * 0.5 + 0.5;
        this.opacity = 0.2 + pulseFactor * 0.6;
      }
      
      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.fill();
      }
    }
    
    // Create nebulas
    class Nebula {
      x: number;
      y: number;
      size: number;
      color: string;
      rotation: number;
      rotationSpeed: number;
      
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 200 + 100;
        this.color = getColor();
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() * 0.002 + 0.001) * getSpeedFactor();
      }
      
      update() {
        this.rotation += this.rotationSpeed;
      }
      
      draw() {
        if (!ctx) return;
        
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        
        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, this.size);
        gradient.addColorStop(0, this.color.replace(')', ', 0.4)'));
        gradient.addColorStop(0.5, this.color.replace(')', ', 0.1)'));
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.ellipse(0, 0, this.size, this.size * 0.6, 0, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();
      }
    }
    
    const stars: Star[] = [];
    const nebulas: Nebula[] = [];
    
    const particleCount = getDensityCount() * 2;
    for (let i = 0; i < particleCount; i++) {
      stars.push(new Star());
    }
    
    for (let i = 0; i < 3; i++) {
      nebulas.push(new Nebula());
    }
    
    const animate = () => {
      if (!ctx || !canvas) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw nebulas first
      nebulas.forEach(nebula => {
        nebula.update();
        nebula.draw();
      });
      
      // Draw stars on top
      stars.forEach(star => {
        star.update();
        star.draw();
      });
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', resizeCanvas);
    };
  };

  // Matrix effect
  const renderMatrixEffect = () => {
    if (!canvasRef.current || isReducedMotion) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Resize canvas
    const resizeCanvas = () => {
      if (!containerRef.current || !canvas) return;
      canvas.width = containerRef.current.clientWidth;
      canvas.height = containerRef.current.clientHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    const fontSize = 12;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = [];
    
    // Initialize drops
    for (let i = 0; i < columns; i++) {
      drops[i] = 1;
    }
    
    // Matrix characters
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%&*()";
    
    const baseColor = getColor().replace('rgba', 'rgba').replace(/[^,]+(?=\))/, '1');
    const fadeColor = getColor().replace('rgba', 'rgba').replace(/[^,]+(?=\))/, '0.07');
    const speedFactor = getSpeedFactor();
    
    const animate = () => {
      if (!ctx || !canvas) return;
      
      // Semi-transparent to create trails
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = baseColor;
      ctx.font = `${fontSize}px monospace`;
      
      for (let i = 0; i < drops.length; i++) {
        // Random character
        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;
        
        // Leading characters are brighter
        ctx.fillStyle = baseColor;
        ctx.fillText(char, x, y);
        
        // After drawing randomly decide if this column needs to reset
        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        
        // Increment y coordinate
        drops[i] += (Math.random() * 0.5 + 0.5) * speedFactor;
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', resizeCanvas);
    };
  };

  // Gradient effect
  const renderGradientEffect = () => {
    if (!canvasRef.current || isReducedMotion) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Resize canvas
    const resizeCanvas = () => {
      if (!containerRef.current || !canvas) return;
      canvas.width = containerRef.current.clientWidth;
      canvas.height = containerRef.current.clientHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    const baseColor = getColor();
    const speedFactor = getSpeedFactor();
    
    class GradientPoint {
      x: number;
      y: number;
      targetX: number;
      targetY: number;
      speed: number;
      
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.targetX = Math.random() * canvas.width;
        this.targetY = Math.random() * canvas.height;
        this.speed = (Math.random() * 0.0005 + 0.0002) * speedFactor;
      }
      
      update() {
        const dx = this.targetX - this.x;
        const dy = this.targetY - this.y;
        
        if (Math.abs(dx) < 1 && Math.abs(dy) < 1) {
          this.targetX = Math.random() * canvas.width;
          this.targetY = Math.random() * canvas.height;
        }
        
        this.x += dx * this.speed;
        this.y += dy * this.speed;
      }
    }
    
    // Create gradient points
    const points: GradientPoint[] = [];
    const count = Math.max(3, Math.floor(getDensityCount() / 20));
    
    for (let i = 0; i < count; i++) {
      points.push(new GradientPoint());
    }
    
    const animate = () => {
      if (!ctx || !canvas) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update points
      points.forEach(point => point.update());
      
      // Create gradient
      const gradient = ctx.createLinearGradient(
        points[0].x, points[0].y, 
        points[1].x, points[1].y
      );
      
      gradient.addColorStop(0, baseColor.replace('rgba', 'rgba').replace(/[^,]+(?=\))/, '0.6'));
      gradient.addColorStop(0.5, baseColor.replace('rgba', 'rgba').replace(/[^,]+(?=\))/, '0.3'));
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Second gradient layer
      if (points.length > 2) {
        const gradient2 = ctx.createRadialGradient(
          points[2].x, points[2].y, 0,
          points[2].x, points[2].y, canvas.width / 2
        );
        
        gradient2.addColorStop(0, baseColor.replace('rgba', 'rgba').replace(/[^,]+(?=\))/, '0.4'));
        gradient2.addColorStop(1, 'rgba(0, 0, 0, 0)');
        
        ctx.fillStyle = gradient2;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', resizeCanvas);
    };
  };

  // Atmosphere effect
  const renderAtmosphereEffect = () => {
    if (!canvasRef.current || isReducedMotion) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Resize canvas
    const resizeCanvas = () => {
      if (!containerRef.current || !canvas) return;
      canvas.width = containerRef.current.clientWidth;
      canvas.height = containerRef.current.clientHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    const baseColor = getColor();
    const speedFactor = getSpeedFactor();
    
    class Cloud {
      x: number;
      y: number;
      radius: number;
      speed: number;
      opacity: number;
      
      constructor() {
        this.radius = Math.random() * 100 + 50;
        this.x = Math.random() * (canvas.width + this.radius * 2) - this.radius;
        this.y = Math.random() * canvas.height * 0.8;
        this.speed = (Math.random() * 0.3 + 0.1) * speedFactor;
        this.opacity = Math.random() * 0.2 + 0.1;
      }
      
      update() {
        this.x += this.speed;
        if (this.x > canvas.width + this.radius) {
          this.x = -this.radius;
          this.y = Math.random() * canvas.height * 0.8;
          this.opacity = Math.random() * 0.2 + 0.1;
        }
      }
      
      draw() {
        if (!ctx) return;
        
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = baseColor.replace(')', `, ${this.opacity})`);
        ctx.fill();
      }
    }
    
    // Create clouds
    const clouds: Cloud[] = [];
    const cloudCount = Math.floor(getDensityCount() / 3);
    
    for (let i = 0; i < cloudCount; i++) {
      clouds.push(new Cloud());
    }
    
    const animate = () => {
      if (!ctx || !canvas) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw gradient background
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, baseColor.replace(')', ', 0.2)'));
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw clouds
      clouds.forEach(cloud => {
        cloud.update();
        cloud.draw();
      });
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', resizeCanvas);
    };
  };

  useEffect(() => {
    // Skip animation if user prefers reduced motion
    if (isReducedMotion) return;
    
    // Clean up any existing animation
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    
    // Render the appropriate effect
    let cleanup;
    
    switch (type) {
      case 'aurora':
        cleanup = renderAuroraEffect();
        break;
      case 'cosmic':
        cleanup = renderCosmicEffect();
        break;
      case 'matrix':
        cleanup = renderMatrixEffect();
        break;
      case 'gradient':
        cleanup = renderGradientEffect();
        break;
      case 'atmosphere':
        cleanup = renderAtmosphereEffect();
        break;
      case 'particles':
      default:
        cleanup = renderParticlesEffect();
        break;
    }
    
    return cleanup;
  }, [type, density, speed, interactive, theme, isReducedMotion]);

  return (
    <div 
      ref={containerRef} 
      className={`w-full h-full absolute top-0 left-0 overflow-hidden ${className}`}
      style={{ pointerEvents: 'none' }}
    >
      <canvas 
        ref={canvasRef} 
        className="absolute top-0 left-0 w-full h-full"
      />
    </div>
  );
};

export default PremiumEffects;
