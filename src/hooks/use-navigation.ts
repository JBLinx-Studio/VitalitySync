
import { useState, useEffect } from 'react';
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
  
  // Handle scroll check with throttling
  const checkForScrollButtons = throttle(() => {
    if (!containerElement) return;
    
    const { scrollWidth, clientWidth } = containerElement;
    setShowScrollButtons(scrollWidth > clientWidth);
    
    // Scroll active item into view
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
  }, 100);
  
  useEffect(() => {
    if (containerElement) {
      checkForScrollButtons();
      
      // Setup resize observer for responsive updates
      const resizeObserver = new ResizeObserver(() => {
        checkForScrollButtons();
      });
      
      resizeObserver.observe(containerElement);
      
      return () => {
        resizeObserver.disconnect();
      };
    }
  }, [containerElement, activeIndex, checkForScrollButtons]);
  
  const scrollNav = (direction: 'left' | 'right') => {
    if (!containerElement) return;
    
    const scrollAmount = containerElement.offsetWidth * 0.75;
    const newPosition = direction === 'left' 
      ? containerElement.scrollLeft - scrollAmount
      : containerElement.scrollLeft + scrollAmount;
      
    containerElement.scrollTo({
      left: newPosition,
      behavior: 'smooth'
    });
  };
  
  return {
    activeIndex,
    showScrollButtons,
    setContainerElement,
    scrollNav,
    isActive: (path: string) => {
      const currentPath = location.pathname.replace('/Health-and-Fitness-Webapp', '');
      return currentPath === path;
    }
  };
}
