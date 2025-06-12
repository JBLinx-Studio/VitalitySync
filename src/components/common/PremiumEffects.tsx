
import React, { lazy, Suspense } from 'react';
import { VisualEffectProps } from '@/types';

// Use lazy loading for better performance
const VisualEffectsUI = lazy(() => import('@/components/ui/VisualEffects'));

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
  // Map unsupported types to supported ones
  const mapTypeToSupported = (inputType: string): "aurora" | "particles" | "cosmic" | "fireflies" => {
    switch (inputType) {
      case 'aurora': return 'aurora';
      case 'particles': return 'particles';
      case 'cosmic': return 'cosmic';
      // Map unsupported types to similar supported ones
      case 'matrix':
      case 'gradient':
      case 'atmosphere':
        return 'cosmic';
      default:
        return 'cosmic';
    }
  };
  
  // Ensure we only pass allowed types
  const safeType = mapTypeToSupported(type);
  
  return (
    <div className={`w-full h-full ${className}`}>
      <Suspense fallback={<div className="w-full h-full"></div>}>
        <VisualEffectsUI 
          type={safeType}
          density={density}
          speed={speed}
          interactive={interactive}
        />
      </Suspense>
    </div>
  );
};

export default PremiumEffects;
