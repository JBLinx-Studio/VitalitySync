
import { Suspense, lazy } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HealthProvider } from '@/contexts/HealthContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import Layout from '@/components/layout/Layout';

// Lazy load components for better performance
const Index = lazy(() => import("./pages/Index"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const ExerciseTracker = lazy(() => import("./pages/ExerciseTracker"));
const FoodTracker = lazy(() => import("./pages/FoodTracker"));
const SleepTracker = lazy(() => import("./pages/SleepTracker"));
const MentalWellness = lazy(() => import("./pages/MentalWellness"));
const UserProfile = lazy(() => import("./pages/UserProfile"));
const Achievements = lazy(() => import("./pages/Achievements"));
const Community = lazy(() => import("./pages/Community"));
const Settings = lazy(() => import("./pages/Settings"));
const BodyMeasurements = lazy(() => import("./pages/BodyMeasurements"));
const AddictionTracker = lazy(() => import("./pages/AddictionTracker"));
const PremiumFeatures = lazy(() => import("./pages/PremiumFeatures"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <HealthProvider>
          <TooltipProvider>
            <BrowserRouter>
              <Layout>
                <Suspense fallback={
                  <div className="flex items-center justify-center min-h-screen">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
                  </div>
                }>
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/Health-and-Fitness-Webapp" element={<Index />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/exercise" element={<ExerciseTracker />} />
                    <Route path="/food" element={<FoodTracker />} />
                    <Route path="/sleep" element={<SleepTracker />} />
                    <Route path="/mental" element={<MentalWellness />} />
                    <Route path="/profile" element={<UserProfile />} />
                    <Route path="/achievements" element={<Achievements />} />
                    <Route path="/community" element={<Community />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/body" element={<BodyMeasurements />} />
                    <Route path="/addiction" element={<AddictionTracker />} />
                    <Route path="/premium" element={<PremiumFeatures />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Suspense>
              </Layout>
              <Toaster />
            </BrowserRouter>
          </TooltipProvider>
        </HealthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
