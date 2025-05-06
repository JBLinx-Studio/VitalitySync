
import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { HealthProvider } from './contexts/HealthContext';
import App from './App';
import Dashboard from '@/pages/Dashboard';
import FoodTracker from '@/pages/FoodTracker';
import ExerciseTracker from '@/pages/ExerciseTracker';
import SleepTracker from '@/pages/SleepTracker';
import MentalWellness from '@/pages/MentalWellness';
import BodyMeasurements from '@/pages/BodyMeasurements';
import UserProfile from '@/pages/UserProfile';
import Settings from '@/pages/Settings';
import Achievements from '@/pages/Achievements';
import NotFound from '@/pages/NotFound';
import Index from '@/pages/Index';
import { Layout } from '@/components/layout';
import '@/index.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});

// Get base path for GitHub Pages or use "/" for development
const BASE_PATH = import.meta.env.MODE === 'production' ? '/Health-and-Fitness-Webapp' : '';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <HealthProvider>
          <BrowserRouter basename={BASE_PATH}>
            <Routes>
              <Route path="/" element={<Layout><Index /></Layout>} />
              <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
              <Route path="/food" element={<Layout><FoodTracker /></Layout>} />
              <Route path="/exercise" element={<Layout><ExerciseTracker /></Layout>} />
              <Route path="/sleep" element={<Layout><SleepTracker /></Layout>} />
              <Route path="/mental" element={<Layout><MentalWellness /></Layout>} />
              <Route path="/body" element={<Layout><BodyMeasurements /></Layout>} />
              <Route path="/profile" element={<Layout><UserProfile /></Layout>} />
              <Route path="/settings" element={<Layout><Settings /></Layout>} />
              <Route path="/achievements" element={<Layout><Achievements /></Layout>} />
              <Route path="*" element={<Layout><NotFound /></Layout>} />
            </Routes>
          </BrowserRouter>
        </HealthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
