
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './App.css'
import './styles/premium.css'

// Add performance optimization - preconnect to API domain
const preconnect = document.createElement('link');
preconnect.rel = 'preconnect';
preconnect.href = 'https://api.vitalitysync.com';
document.head.appendChild(preconnect);

// Add DNS prefetch
const dnsPrefetch = document.createElement('link');
dnsPrefetch.rel = 'dns-prefetch';
dnsPrefetch.href = 'https://api.vitalitysync.com';
document.head.appendChild(dnsPrefetch);

// Add preload for fonts
const fontPreload = document.createElement('link');
fontPreload.rel = 'preload';
fontPreload.href = '/fonts/quicksand-v30-latin-600.woff2';
fontPreload.as = 'font';
fontPreload.type = 'font/woff2';
fontPreload.crossOrigin = 'anonymous';
document.head.appendChild(fontPreload);

// Create a feature detection function
const supportsIntersectionObserver = 'IntersectionObserver' in window;

// Create and append a performance mark
performance.mark('app-start');

// Add passive event listeners for better scrolling performance
document.addEventListener('touchstart', function() {}, {passive: true});
document.addEventListener('wheel', function() {}, {passive: true});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

// Measure initial render time
window.addEventListener('load', () => {
  performance.mark('app-loaded');
  performance.measure('app-render-time', 'app-start', 'app-loaded');
  
  // Log performance metrics
  const perfEntries = performance.getEntriesByType('measure');
  if (perfEntries.length > 0) {
    console.log(`Initial render took: ${perfEntries[0].duration.toFixed(2)}ms`);
  }
  
  // Lazy load non-critical resources after page load
  setTimeout(() => {
    // Load any secondary scripts or resources here
    if (supportsIntersectionObserver) {
      // Initialize lazy loading for images/components if needed
      console.log('Lazy loading supported');
    }
  }, 100);
});
