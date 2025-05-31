
import React, { useRef, useEffect, useCallback } from 'react';
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
  const lastResizeRef = useRef<{ width: number; height: number }>({ width: 0, height: 0 });
  const { isReducedMotion } = useTheme();

  const resizeCanvas = useCallback(() => {
    if (!containerRef.current || !canvasRef.current) return;
    
    const { width, height } = containerRef.current.getBoundingClientRect();
    const canvas = canvasRef.current;
    
    // Only update if size actually changed to prevent infinite loops
    if (lastResizeRef.current.width !== width || lastResizeRef.current.height !== height) {
      canvas.width = width;
      canvas.height = height;
      
      lastResizeRef.current = { width, height };
      
      if (onResize) {
        onResize({ width, height });
      }
    }
  }, [onResize]);

  useEffect(() => {
    if (isReducedMotion) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;
    
    // Initial resize
    resizeCanvas();
    
    // Animation loop with performance optimizations
    let lastTimestamp = 0;
    const animate = (timestamp: number) => {
      if (!ctx || !canvas) return;
      
      // Throttle to 60fps for better performance
      if (timestamp - lastTimestamp > 16.67) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        try {
          draw(ctx, { width: canvas.width, height: canvas.height }, timestamp);
        } catch (error) {
          console.error('Error in animation draw function:', error);
        }
        
        lastTimestamp = timestamp;
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animationRef.current = requestAnimationFrame(animate);
    
    // Debounced resize handler
    let resizeTimeout: number;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = window.setTimeout(() => {
        resizeCanvas();
      }, 100);
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
    };
  }, [draw, isReducedMotion, resizeCanvas]);

  if (isReducedMotion) {
    return null;
  }

  return (
    <div 
      ref={containerRef} 
      className={`w-full h-full absolute top-0 left-0 overflow-hidden pointer-events-none ${className}`}
    >
      <canvas 
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full"
        style={{ 
          imageRendering: 'auto',
          filter: 'blur(0.5px)', // Subtle blur for smoother appearance
        }}
      />
    </div>
  );
};

export default BaseEffect;
