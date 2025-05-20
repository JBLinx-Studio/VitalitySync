
import { EffectSpeed, EffectDensity } from '@/types';

/**
 * Converts effect speed to duration in milliseconds
 * @param speed Effect speed
 * @returns Duration in milliseconds
 */
export const getAnimationDuration = (speed: EffectSpeed): number => {
  switch (speed) {
    case 'slow': 
      return 1000;
    case 'medium': 
      return 600;
    case 'fast': 
      return 300;
    default: 
      return 600;
  }
};

/**
 * Converts effect density to a numeric density value
 * @param density Effect density
 * @returns Numeric density value
 */
export const getParticleDensity = (density: EffectDensity): number => {
  switch (density) {
    case 'low':
      return 20;
    case 'medium':
      return 50;
    case 'high':
      return 100;
    default:
      return 50;
  }
};

/**
 * Easing functions for animations
 */
export const easings = {
  easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
  easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
  linear: 'linear',
  // Spring-like physics
  spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)'
};

/**
 * Apply animation with delay for staggered animations
 * @param element Element to animate
 * @param animationClass Animation class to apply
 * @param delay Delay in milliseconds
 */
export const animateWithDelay = (
  element: HTMLElement, 
  animationClass: string, 
  delay: number = 0
): void => {
  setTimeout(() => {
    element.classList.add(animationClass);
  }, delay);
};

/**
 * Remove animation class after animation completes
 * @param element Element with animation
 * @param animationClass Animation class to remove
 * @param duration Animation duration in milliseconds
 */
export const cleanupAnimation = (
  element: HTMLElement,
  animationClass: string,
  duration: number = 1000
): void => {
  setTimeout(() => {
    element.classList.remove(animationClass);
  }, duration);
};
