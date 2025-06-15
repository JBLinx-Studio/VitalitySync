
export type VisualEffectType = 'aurora' | 'particles' | 'cosmic' | 'matrix' | 'gradient' | 'atmosphere';
export type EffectDensity = 'low' | 'medium' | 'high';
export type EffectSpeed = 'slow' | 'medium' | 'fast';
export type GlassEffect = 'standard' | 'frosted' | 'neo' | 'ultra' | 'iridescent' | 'cosmic';

export interface VisualEffectProps {
  type?: VisualEffectType;
  density?: EffectDensity;
  speed?: EffectSpeed;
  interactive?: boolean;
  color?: string;
  className?: string;
}
