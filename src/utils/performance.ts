
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
 * Memoize function results for performance optimization
 * @param fn Function to memoize
 * @param getKey Function to generate cache key
 * @returns Memoized function
 */
export const memoize = <T extends (...args: any[]) => any>(
  fn: T,
  getKey?: (...args: Parameters<T>) => string
): T => {
  const cache = new Map();
  
  return ((...args: Parameters<T>) => {
    const key = getKey ? getKey(...args) : JSON.stringify(args);
    
    if (cache.has(key)) {
      return cache.get(key);
    }
    
    const result = fn(...args);
    cache.set(key, result);
    return result;
  }) as T;
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
 * Optimized requestAnimationFrame wrapper
 * @param callback Function to call on next animation frame
 * @returns Cancel function
 */
export const raf = (callback: () => void): (() => void) => {
  const id = requestAnimationFrame(callback);
  return () => cancelAnimationFrame(id);
};

/**
 * Intersection Observer utility for lazy loading
 * @param elements Elements to observe
 * @param callback Function to call when element enters viewport
 * @param options Intersection observer options
 */
export const createIntersectionObserver = (
  elements: Element[],
  callback: (entry: IntersectionObserverEntry) => void,
  options: IntersectionObserverInit = {}
) => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(callback);
  }, {
    threshold: 0.1,
    rootMargin: '50px',
    ...options
  });

  elements.forEach(el => observer.observe(el));
  
  return {
    disconnect: () => observer.disconnect(),
    observe: (el: Element) => observer.observe(el),
    unobserve: (el: Element) => observer.unobserve(el)
  };
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
 * Batch DOM updates for better performance
 * @param updates Array of functions that make DOM updates
 */
export const batchDOMUpdates = (updates: (() => void)[]): void => {
  raf(() => {
    updates.forEach(update => update());
  });
};

/**
 * Preload images for better user experience
 * @param imageUrls Array of image URLs to preload
 * @returns Promise that resolves when all images are loaded
 */
export const preloadImages = (imageUrls: string[]): Promise<void[]> => {
  return Promise.all(
    imageUrls.map(url => 
      new Promise<void>((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve();
        img.onerror = reject;
        img.src = url;
      })
    )
  );
};
