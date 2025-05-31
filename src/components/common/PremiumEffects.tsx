
import React from 'react';
import { VisualEffectProps } from '@/types';

// This wrapper component imports from the UI component
const PremiumEffects: React.FC<VisualEffectProps> = (props) => {
  // Import the actual component dynamically to avoid circular dependencies
  const PremiumEffectsUI = require('@/components/ui/PremiumEffects').default;
  
  return <PremiumEffectsUI {...props} />;
};

export default PremiumEffects;
