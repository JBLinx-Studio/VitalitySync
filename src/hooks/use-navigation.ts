
import { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { throttle } from '@/utils/performance';

export interface NavigationItem {
  path: string;
  label: string;
  icon: React.ReactNode;
}

export function useNavigation(items: NavigationItem[]) {
  const location = useLocation();
  const [activeIndex, setActiveIndex] = useState(0);
  const [showScrollButtons, setShowScrollButtons] = useState(false);
  const [containerElement, setContainerElement] = useState<HTMLElement | null>(null);
  
  // Find active index based on current location
  useEffect(() => {
    const currentPath = location.pathname.replace('/Health-and-Fitness-Webapp', '');
    const index = items.findIndex(item => item.path === currentPath);
    if (index !== -1) {
      setActiveIndex(index);
    }
  }, [location.pathname, items]);
  
  // Handle scroll check with throttling to improve performance
  const checkForScrollButtons = useCallback(throttle(() => {
    if (!containerElement) return;
    
    const { scrollWidth, clientWidth } = containerElement;
    setShowScrollButtons(scrollWidth > clientWidth);
    
    // Scroll active item into view with smooth animation
    const activeItem = containerElement.children[activeIndex] as HTMLElement;
    if (activeItem) {
      const containerWidth = containerElement.offsetWidth;
      const itemLeft = activeItem.offsetLeft;
      const itemWidth = activeItem.offsetWidth;
      
      // Center the active item
      containerElement.scrollTo({
        left: itemLeft - (containerWidth / 2) + (itemWidth / 2),
        behavior: 'smooth'
      });
    }
  }, 100), [containerElement, activeIndex]);
  
  useEffect(() => {
    if (containerElement) {
      checkForScrollButtons();
      
      // Setup resize observer for responsive updates
      const resizeObserver = new ResizeObserver(() => {
        checkForScrollButtons();
      });
      
      resizeObserver.observe(containerElement);
      
      // Handle window resize events
      window.addEventListener('resize', checkForScrollButtons);
      
      return () => {
        resizeObserver.disconnect();
        window.removeEventListener('resize', checkForScrollButtons);
      };
    }
  }, [containerElement, activeIndex, checkForScrollButtons]);
  
  // Scroll navigation in given direction with improved animation
  const scrollNav = useCallback((direction: 'left' | 'right') => {
    if (!containerElement) return;
    
    const scrollAmount = containerElement.offsetWidth * 0.75;
    const newPosition = direction === 'left' 
      ? containerElement.scrollLeft - scrollAmount
      : containerElement.scrollLeft + scrollAmount;
      
    containerElement.scrollTo({
      left: newPosition,
      behavior: 'smooth'
    });
  }, [containerElement]);
  
  // Check if item is currently active
  const isActive = useCallback((path: string) => {
    const currentPath = location.pathname.replace('/Health-and-Fitness-Webapp', '');
    return currentPath === path;
  }, [location.pathname]);
  
  return {
    activeIndex,
    showScrollButtons,
    setContainerElement,
    scrollNav,
    isActive
  };
}
