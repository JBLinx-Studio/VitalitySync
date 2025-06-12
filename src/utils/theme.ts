
import { GlassEffect } from '@/types';

/**
 * Gets the appropriate CSS class for a glass effect
 * @param effect The glass effect to apply
 * @returns The CSS class for the glass effect
 */
export const getGlassEffectClass = (effect: GlassEffect): string => {
  switch (effect) {
    case 'frosted':
      return "frosted-glass";
    case 'neo':
      return "neo-glass";
    case 'ultra':
      return "ultra-glass";
    case 'iridescent':
      return "iridescent-glass";
    case 'cosmic':
      return "cosmic-glass";
    default:
      return "glass-card";
  }
};

/**
 * Generates a CSS gradient based on theme colors
 * @param primary Primary color
 * @param secondary Secondary color
 * @param opacity Opacity value (0-1)
 * @returns CSS gradient string
 */
export const generateGradient = (
  primary: string = 'var(--cosmic-nebula)',
  secondary: string = 'var(--cosmic-highlight)',
  opacity: number = 1
): string => {
  return `linear-gradient(135deg, ${primary}${Math.round(opacity * 100).toString(16)} 0%, ${secondary}${Math.round(opacity * 100).toString(16)} 100%)`;
};
