
import React, { memo, useMemo } from 'react';

interface PerformanceWrapperProps {
  children: React.ReactNode;
  deps?: any[];
  className?: string;
}

const PerformanceWrapper: React.FC<PerformanceWrapperProps> = memo(({ 
  children, 
  deps = [], 
  className 
}) => {
  const memoizedChildren = useMemo(() => children, deps);

  return (
    <div className={className} style={{ willChange: 'transform' }}>
      {memoizedChildren}
    </div>
  );
});

PerformanceWrapper.displayName = 'PerformanceWrapper';

export default PerformanceWrapper;
