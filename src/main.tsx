
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import '@/index.css';

console.log('Starting VitalitySync application...');

const rootElement = document.getElementById('root');

if (!rootElement) {
  console.error('Root element not found!');
  document.body.innerHTML = '<div style="padding: 20px; font-family: sans-serif;"><h1>Error: Root element not found</h1><p>The app could not start because the root element is missing.</p></div>';
} else {
  console.log('Root element found, mounting React app...');
  
  try {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    console.log('React app mounted successfully!');
  } catch (error) {
    console.error('Failed to mount React app:', error);
    rootElement.innerHTML = `
      <div style="padding: 20px; font-family: sans-serif; background: #f5f5f5; min-height: 100vh;">
        <h1 style="color: #d32f2f;">Application Error</h1>
        <p>The application failed to start. Please check the console for more details.</p>
        <pre style="background: white; padding: 10px; border-radius: 4px; overflow: auto;">${error}</pre>
        <button onclick="window.location.reload()" style="padding: 10px 20px; background: #1976d2; color: white; border: none; border-radius: 4px; cursor: pointer;">Reload Page</button>
      </div>
    `;
  }
}
