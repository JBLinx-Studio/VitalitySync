
/**
 * Throttle a function call to limit how often it can be executed
 * @param func The function to throttle
 * @param limit The time limit in milliseconds
 * @returns A throttled version of the function
 */
export function throttle<T extends (...args: any[]) => any>(func: T, limit: number): (...args: Parameters<T>) => void {
  let inThrottle = false;
  let lastResult: ReturnType<T>;
  
  return function(this: any, ...args: Parameters<T>): void {
    if (!inThrottle) {
      lastResult = func.apply(this, args);
      inThrottle = true;
      
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
}

/**
 * Debounce a function call to delay execution until after a period of inactivity
 * @param func The function to debounce
 * @param wait The wait time in milliseconds
 * @param immediate Whether to execute immediately
 * @returns A debounced version of the function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T, 
  wait: number, 
  immediate = false
): (...args: Parameters<T>) => void {
  let timeout: number | undefined;
  
  return function(this: any, ...args: Parameters<T>): void {
    const later = () => {
      timeout = undefined;
      if (!immediate) func.apply(this, args);
    };
    
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = window.setTimeout(later, wait);
    
    if (callNow) func.apply(this, args);
  };
}

/**
 * Measure the performance of a function
 * @param fn The function to measure
 * @param name A name for the performance measurement
 * @returns The original function wrapped with performance measurement
 */
export function measurePerformance<T extends (...args: any[]) => any>(
  fn: T, 
  name: string
): (...args: Parameters<T>) => ReturnType<T> {
  return function(this: any, ...args: Parameters<T>): ReturnType<T> {
    const start = performance.now();
    const result = fn.apply(this, args);
    const end = performance.now();
    
    console.log(`${name} took ${end - start}ms to execute`);
    
    return result;
  };
}

/**
 * A function to batch DOM reads and writes to prevent layout thrashing
 */
interface DOMBatch {
  read: (callback: () => void) => void;
  write: (callback: () => void) => void;
  flush: () => void;
}

export const domBatch = (): DOMBatch => {
  const reads: Array<() => void> = [];
  const writes: Array<() => void> = [];
  let scheduled = false;
  
  const flush = () => {
    // Process all reads
    reads.forEach(read => read());
    reads.length = 0;
    
    // Process all writes
    writes.forEach(write => write());
    writes.length = 0;
    
    scheduled = false;
  };
  
  const schedule = () => {
    if (!scheduled) {
      scheduled = true;
      requestAnimationFrame(flush);
    }
  };
  
  return {
    read: (callback: () => void) => {
      reads.push(callback);
      schedule();
    },
    write: (callback: () => void) => {
      writes.push(callback);
      schedule();
    },
    flush
  };
};
