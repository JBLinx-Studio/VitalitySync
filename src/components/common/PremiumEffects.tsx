
import React, { lazy, Suspense } from 'react';
import { VisualEffectProps } from '@/types';

// Use lazy loading for better performance
const VisualEffectsUI = lazy(() => import('@/components/ui/VisualEffects'));

const PremiumEffects: React.FC<VisualEffectProps> = ({ 
  type = 'cosmic',
  density = 'medium',
  speed = 'medium',
  interactive = true,
  color,
  className
}) => {
  // Ensure we're only passing allowed types to VisualEffectsUI
  const safeType = type === 'matrix' ? 'cosmic' : type;
  
  return (
    <Suspense fallback={<div className="w-full h-full"></div>}>
      <VisualEffectsUI 
        type={safeType} 
        density={density} 
        speed={speed} 
        interactive={interactive} 
      />
    </Suspense>
  );
};

export default PremiumEffects;
