
import React from 'react';

// Simple motion system for shared layout animations
export const motion = {
  span: ({ 
    className, 
    layoutId, 
    transition, 
    children 
  }: { 
    className: string, 
    layoutId: string,
    transition: any,
    children?: React.ReactNode
  }) => {
    return (
      <span
        className={className}
        data-layout-id={layoutId}
        style={{
          transition: `all ${transition.duration || 0.3}s ${transition.type === 'spring' ? 'cubic-bezier(0.34, 1.56, 0.64, 1)' : 'ease'}`
        }}
      >
        {children}
      </span>
    );
  }
};

// Animation utility functions
export function animateElement(
  element: HTMLElement, 
  keyframes: Keyframe[] | PropertyIndexedKeyframes, 
  options: KeyframeAnimationOptions
) {
  return element.animate(keyframes, options);
}

// Common animations
export const animations = {
  fadeIn: (element: HTMLElement, duration = 300) => {
    return animateElement(
      element,
      [
        { opacity: 0, transform: 'translateY(10px)' },
        { opacity: 1, transform: 'translateY(0)' }
      ],
      { duration, easing: 'ease-out', fill: 'forwards' }
    );
  },
  
  fadeOut: (element: HTMLElement, duration = 300) => {
    return animateElement(
      element,
      [
        { opacity: 1, transform: 'translateY(0)' },
        { opacity: 0, transform: 'translateY(10px)' }
      ],
      { duration, easing: 'ease-in', fill: 'forwards' }
    );
  },
  
  scaleIn: (element: HTMLElement, duration = 200) => {
    return animateElement(
      element,
      [
        { opacity: 0, transform: 'scale(0.95)' },
        { opacity: 1, transform: 'scale(1)' }
      ],
      { duration, easing: 'ease-out', fill: 'forwards' }
    );
  },
  
  // Add more fluid animations
  slideIn: (element: HTMLElement, direction = 'left', duration = 300) => {
    const startX = direction === 'left' ? '-20px' : direction === 'right' ? '20px' : '0';
    const startY = direction === 'top' ? '-20px' : direction === 'bottom' ? '20px' : '0';
    
    return animateElement(
      element,
      [
        { opacity: 0, transform: `translate(${startX}, ${startY})` },
        { opacity: 1, transform: 'translate(0, 0)' }
      ],
      { duration, easing: 'cubic-bezier(0.25, 1, 0.5, 1)', fill: 'forwards' }
    );
  },
  
  // Enhanced pulse animation
  pulse: (element: HTMLElement, intensity = 1.05, duration = 1000) => {
    return animateElement(
      element,
      [
        { transform: 'scale(1)', opacity: 0.9 },
        { transform: `scale(${intensity})`, opacity: 1 },
        { transform: 'scale(1)', opacity: 0.9 }
      ],
      { duration, easing: 'ease-in-out', iterations: Infinity }
    );
  }
};
