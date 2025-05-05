
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './App.css'
import './styles/premium.css'

// Performance optimizations - preconnect to API domain
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

// Error handling for React rendering
const renderApp = () => {
  try {
    const rootElement = document.getElementById('root');
    if (!rootElement) {
      console.error('Root element not found');
      return;
    }
    
    ReactDOM.createRoot(rootElement).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
    );
    
    console.log('App successfully mounted');
  } catch (error) {
    console.error('Failed to render the app:', error);
    // Display a user-friendly error message
    const rootElement = document.getElementById('root');
    if (rootElement) {
      rootElement.innerHTML = `
        <div style="padding: 20px; text-align: center; font-family: system-ui, sans-serif;">
          <h2>Something went wrong</h2>
          <p>We're sorry, but there was an error loading the application. Please try refreshing the page.</p>
          <button onclick="location.reload()" style="padding: 8px 16px; background: linear-gradient(90deg, #7C3AED, #06B6D4); border: none; border-radius: 4px; color: white; cursor: pointer; margin-top: 20px;">
            Refresh Page
          </button>
        </div>
      `;
    }
  }
};

// Render the app
renderApp();

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
  
  // Add custom font loading optimization
  if ('fonts' in document) {
    Promise.all([
      document.fonts.load('1em Quicksand'),
      document.fonts.load('1em Poppins')
    ]).then(() => {
      document.documentElement.classList.add('fonts-loaded');
      console.log('All fonts loaded successfully');
    }).catch(err => {
      console.warn('Some fonts could not be loaded:', err);
    });
  }
});

// Add enhanced error handling for uncaught errors
window.addEventListener('error', (event) => {
  console.error('Global error caught:', event.error);
  // You could send this error to a monitoring service here
});

// Add unhandled promise rejection handler
window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
  // You could send this error to a monitoring service here
});
