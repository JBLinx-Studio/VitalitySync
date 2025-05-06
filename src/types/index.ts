
// Export all types
export * from './health.d';
export * from './effects';

// Re-export the types from effects.d.ts to ensure they're available
export type { 
  VisualEffectType, 
  VisualEffectDensity, 
  VisualEffectSpeed, 
  VisualEffectProps 
} from './effects';
