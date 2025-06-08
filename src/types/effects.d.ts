
declare interface VisualEffectProps {
  type?: 'aurora' | 'particles' | 'cosmic' | 'matrix' | 'gradient' | 'atmosphere';
  density?: 'low' | 'medium' | 'high';
  speed?: 'slow' | 'medium' | 'fast';
  interactive?: boolean;
  color?: string;
  className?: string;
}
