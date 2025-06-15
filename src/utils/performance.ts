
/**
 * Performance utilities to help optimize the application
 */

/**
 * Debounce function to limit how often a function is called
 * @param fn Function to be debounced
 * @param ms Milliseconds to wait before calling the function
 * @returns Debounced function
 */
export const debounce = <T extends (...args: any[]) => any>(
  fn: T, 
  ms = 300
): ((...args: Parameters<T>) => void) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  
  return function(this: any, ...args: Parameters<T>): void {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
};

/**
 * Throttle function to limit the rate at which a function is called
 * @param fn Function to be throttled
 * @param ms Milliseconds to wait between function calls
 * @returns Throttled function
 */
export const throttle = <T extends (...args: any[]) => any>(
  fn: T, 
  ms = 100
): ((...args: Parameters<T>) => void) => {
  let inThrottle = false;
  let lastFunc: ReturnType<typeof setTimeout>;
  let lastRan: number;
  
  return function(this: any, ...args: Parameters<T>): void {
    if (!inThrottle) {
      fn.apply(this, args);
      lastRan = Date.now();
      inThrottle = true;
      
      setTimeout(() => {
        inThrottle = false;
      }, ms);
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(() => {
        if (Date.now() - lastRan >= ms) {
          fn.apply(this, args);
          lastRan = Date.now();
        }
      }, ms - (Date.now() - lastRan));
    }
  };
};

/**
 * Checks if the device has low memory or CPU capabilities
 * @returns boolean indicating if device should use reduced animations/effects
 */
export const shouldReduceEffects = (): boolean => {
  // Check if device is low-end or has data saving enabled
  const connection = (navigator as any).connection;
  const saveData = connection?.saveData;
  const lowMemory = (navigator as any).deviceMemory < 4;
  const userPreference = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  return saveData || lowMemory || userPreference;
};

/**
 * Measures component render time for performance analysis
 * @param componentName Name of the component to measure
 * @param callback Function to run after measurement
 */
export const measureRenderTime = (
  componentName: string,
  callback?: (duration: number) => void
) => {
  return () => {
    const startTime = performance.now();
    
    return () => {
      const endTime = performance.now();
      const duration = endTime - startTime;
      
      if (process.env.NODE_ENV === 'development') {
        console.log(`[Performance] ${componentName} rendered in ${duration.toFixed(2)}ms`);
      }
      
      if (callback) {
        callback(duration);
      }
    };
  };
};

/**
 * Updates the utils/index.ts file to export the performance utilities
 */
