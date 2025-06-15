
import React, { lazy, Suspense } from 'react';
import { VisualEffectProps } from '@/types';
import { ParticlesEffect, CosmicEffect, AuroraEffect, FirefliesEffect } from '@/components/effects';

interface PremiumEffectsProps extends Omit<VisualEffectProps, 'type'> {
  type: 'aurora' | 'particles' | 'cosmic' | 'matrix' | 'gradient' | 'atmosphere';
  className?: string;
}

const PremiumEffects: React.FC<PremiumEffectsProps> = ({ 
  type = 'cosmic',
  density = 'medium',
  speed = 'medium',
  interactive = true,
  color,
  className = ''
}) => {
  // Determine which effect component to render based on type
  const renderEffect = () => {
    switch (type) {
      case 'aurora':
        return (
          <AuroraEffect 
            density={density}
            speed={speed} 
            interactive={interactive}
            color={color}
          />
        );
      case 'particles':
        return (
          <ParticlesEffect 
            density={density}
            speed={speed}
            interactive={interactive}
            color={color}
          />
        );
      case 'cosmic':
        return (
          <CosmicEffect
            density={density}
            speed={speed}
            interactive={interactive}
            color={color}
          />
        );
      case 'matrix':
      case 'gradient': 
      case 'atmosphere':
      default:
        return (
          <FirefliesEffect
            density={density}
            speed={speed}
            interactive={interactive}
            color={color}
          />
        );
    }
  };
  
  return (
    <div className={`w-full h-full ${className}`}>
      <Suspense fallback={<div className="w-full h-full"></div>}>
        {renderEffect()}
      </Suspense>
    </div>
  );
};

export default PremiumEffects;
