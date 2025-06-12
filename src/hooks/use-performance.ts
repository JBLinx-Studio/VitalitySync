import { useEffect, useRef, useState } from 'react';

interface PerformanceMetrics {
  fps: number;
  memoryUsage: number;
  isLowPerformance: boolean;
  shouldReduceAnimations: boolean;
}

export function usePerformance(): PerformanceMetrics {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fps: 60,
    memoryUsage: 0,
    isLowPerformance: false,
    shouldReduceAnimations: false
  });

  const frameCount = useRef(0);
  const lastTime = useRef(performance.now());
  const fpsHistory = useRef<number[]>([]);

  useEffect(() => {
    let animationFrame: number;
    let memoryInterval: number;

    const measureFPS = () => {
      frameCount.current++;
      const currentTime = performance.now();
      
      if (currentTime - lastTime.current >= 1000) {
        const fps = Math.round((frameCount.current * 1000) / (currentTime - lastTime.current));
        
        // Keep history of last 10 FPS measurements
        fpsHistory.current.push(fps);
        if (fpsHistory.current.length > 10) {
          fpsHistory.current.shift();
        }
        
        const avgFps = fpsHistory.current.reduce((sum, f) => sum + f, 0) / fpsHistory.current.length;
        
        setMetrics(prev => ({
          ...prev,
          fps: Math.round(avgFps),
          isLowPerformance: avgFps < 30,
          shouldReduceAnimations: avgFps < 45
        }));
        
        frameCount.current = 0;
        lastTime.current = currentTime;
      }
      
      animationFrame = requestAnimationFrame(measureFPS);
    };

    const measureMemory = () => {
      if ('memory' in performance) {
        const memory = (performance as any).memory;
        const memoryUsage = Math.round((memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100);
        
        setMetrics(prev => ({
          ...prev,
          memoryUsage,
          isLowPerformance: prev.isLowPerformance || memoryUsage > 80
        }));
      }
    };

    // Start measuring
    animationFrame = requestAnimationFrame(measureFPS);
    memoryInterval = window.setInterval(measureMemory, 5000);

    return () => {
      cancelAnimationFrame(animationFrame);
      clearInterval(memoryInterval);
    };
  }, []);

  return metrics;
}
