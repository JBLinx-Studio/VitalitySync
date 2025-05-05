
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

// Create and append a performance mark
performance.mark('app-start');

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
});
