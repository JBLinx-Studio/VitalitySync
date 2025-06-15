
import React, { useRef, useEffect } from 'react';
import { useTheme } from '@/contexts/ThemeContext';

interface BaseEffectProps {
  draw: (
    ctx: CanvasRenderingContext2D, 
    dimensions: { width: number; height: number }, 
    timestamp: number
  ) => void;
  className?: string;
  onResize?: (dimensions: { width: number; height: number }) => void;
}

const BaseEffect: React.FC<BaseEffectProps> = ({ 
  draw, 
  className = '',
  onResize 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const { isReducedMotion } = useTheme();

  useEffect(() => {
    if (isReducedMotion) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Resize canvas to match container
    const resizeCanvas = () => {
      if (!containerRef.current || !canvas) return;
      
      const { width, height } = containerRef.current.getBoundingClientRect();
      
      // Only update if size changed
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        
        if (onResize) {
          onResize({ width, height });
        }
      }
    };
    
    resizeCanvas();
    
    // Animation loop
    let lastTimestamp = 0;
    const animate = (timestamp: number) => {
      if (!ctx || !canvas) return;
      
      // Optional throttling for better performance
      if (timestamp - lastTimestamp > 16) { // ~60fps
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        draw(ctx, { width: canvas.width, height: canvas.height }, timestamp);
        lastTimestamp = timestamp;
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animate(0);
    
    // Handle resize events
    const debouncedResize = () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      
      resizeCanvas();
      animationRef.current = requestAnimationFrame(animate);
    };
    
    window.addEventListener('resize', debouncedResize);
    
    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', debouncedResize);
    };
  }, [draw, isReducedMotion, onResize]);

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

export default BaseEffect;
