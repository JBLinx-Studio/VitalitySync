
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

const root = document.getElementById('root');

// Handle GitHub Pages SPA routing with better error handling
(function(l) {
  if (l.search) {
    try {
      var q: { [key: string]: string } = {};
      l.search.slice(1).split('&').forEach(function(v) {
        var a = v.split('=');
        if (a[0]) {
          q[a[0]] = a.slice(1).join('=').replace(/~and~/g, '&');
        }
      });
      if (q.p !== undefined) {
        const newPath = l.pathname.slice(0, -1) + (q.p || '') +
          (q.q ? ('?' + q.q) : '') + l.hash;
        window.history.replaceState(null, '', newPath);
      }
    } catch (error) {
      console.warn('Error handling GitHub Pages routing:', error);
    }
  }
}(window.location));

if (root) {
  createRoot(root).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error('Root element not found - ensure index.html has a div with id="root"');
}
