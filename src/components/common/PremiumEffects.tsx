
import React, { lazy, Suspense } from 'react';
import { VisualEffectProps } from '@/types';

// Use lazy loading instead of require
const VisualEffectsUI = lazy(() => import('@/components/ui/VisualEffects'));

const PremiumEffects: React.FC<VisualEffectProps> = (props) => {
  return (
    <Suspense fallback={<div className="w-full h-full"></div>}>
      <VisualEffectsUI {...props} />
    </Suspense>
  );
};

export default PremiumEffects;
