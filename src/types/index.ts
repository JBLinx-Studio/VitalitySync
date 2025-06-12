
// Export all types
export * from './health.d';
export * from './effects';

// Re-export the specific types from effects.d.ts to ensure they're available
export type { 
  VisualEffectType,
  EffectDensity as VisualEffectDensity, 
  EffectSpeed as VisualEffectSpeed, 
  VisualEffectProps 
} from './effects';
