import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import { HealthProvider } from "@/contexts/HealthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { Layout } from "@/components/layout";
import { useEffect } from "react";

// Pages
import Index from "@/pages/Index";
import Dashboard from "@/pages/Dashboard";
import FoodTracker from "@/pages/FoodTracker";
import ExerciseTracker from "@/pages/ExerciseTracker";
import UserProfile from "@/pages/UserProfile";
import SleepTracker from "@/pages/SleepTracker";
import MentalWellness from "@/pages/MentalWellness";
import BodyMeasurements from "@/pages/BodyMeasurements";
import AddictionTracker from "@/pages/AddictionTracker";
import Achievements from "@/pages/Achievements";
import NotFound from "./pages/NotFound";
import Settings from "./pages/Settings";

// Create a client with enhanced options
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
    },
    mutations: {
      retry: 1,
      onError: (error) => {
        console.error('Mutation error:', error);
      }
    }
  },
});

const App = () => {
  // Initialize any global app settings or listeners
  useEffect(() => {
    // Set cosmic theme CSS variables
    document.documentElement.style.setProperty('--cosmic-nebula-rgb', '124, 58, 237');
    document.documentElement.style.setProperty('--cosmic-highlight-rgb', '6, 182, 212');
    document.documentElement.style.setProperty('--cosmic-star-rgb', '251, 191, 36');
    document.documentElement.style.setProperty('--cosmic-accent-rgb', '236, 72, 153');
    document.documentElement.style.setProperty('--cosmic-deep-rgb', '15, 23, 42');
    document.documentElement.style.setProperty('--cosmic-space-rgb', '30, 41, 59');
    
    // Add app initialization mark
    performance.mark('app-initialized');
    
    // Set up custom error handling
    const originalConsoleError = console.error;
    console.error = (...args) => {
      // Could send to error tracking service here
      originalConsoleError(...args);
    };
    
    // Handle any redirect from 404.html
    const redirectPath = sessionStorage.getItem('redirectPath');
    if (redirectPath) {
      sessionStorage.removeItem('redirectPath');
      // We're using HashRouter so we don't need to do anything here
      // HashRouter will handle the navigation automatically
    }
    
    return () => {
      // Cleanup custom handlers
      console.error = originalConsoleError;
    };
  }, []);
  
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <HealthProvider>
            <Toaster />
            <Sonner theme="dark" />
            <HashRouter>
              <Routes>
                <Route path="/" element={<Layout><Index /></Layout>} />
                <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
                <Route path="/food" element={<Layout><FoodTracker /></Layout>} />
                <Route path="/exercise" element={<Layout><ExerciseTracker /></Layout>} />
                <Route path="/sleep" element={<Layout><SleepTracker /></Layout>} />
                <Route path="/mental" element={<Layout><MentalWellness /></Layout>} />
                <Route path="/body" element={<Layout><BodyMeasurements /></Layout>} />
                <Route path="/addiction" element={<Layout><AddictionTracker /></Layout>} />
                <Route path="/achievements" element={<Layout><Achievements /></Layout>} />
                <Route path="/profile" element={<Layout><UserProfile /></Layout>} />
                <Route path="/settings" element={<Layout><Settings /></Layout>} />
                <Route path="*" element={<Layout><NotFound /></Layout>} />
              </Routes>
            </HashRouter>
          </HealthProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
