
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
export const animateElement = (
  element: HTMLElement, 
  keyframes: Keyframe[] | PropertyIndexedKeyframes, 
  options: KeyframeAnimationOptions
) => {
  return element.animate(keyframes, options);
};

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
  }
};
