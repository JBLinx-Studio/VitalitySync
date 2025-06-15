
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HealthProvider } from "@/contexts/HealthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Layout from "@/components/Layout/Layout";

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

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const App = () => {
  // Detect if we're in Lovable preview or production
  const isLovablePreview = window.location.hostname.includes('lovable.app') || window.location.hostname.includes('localhost');
  const basename = isLovablePreview ? "" : "/VitalitySync";

  console.log('App mounting - hostname:', window.location.hostname, 'basename:', basename);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <ThemeProvider>
            <HealthProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter basename={basename}>
                <Layout>
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/food" element={<FoodTracker />} />
                    <Route path="/exercise" element={<ExerciseTracker />} />
                    <Route path="/sleep" element={<SleepTracker />} />
                    <Route path="/mental" element={<MentalWellness />} />
                    <Route path="/body" element={<BodyMeasurements />} />
                    <Route path="/addiction" element={<AddictionTracker />} />
                    <Route path="/achievements" element={<Achievements />} />
                    <Route path="/profile" element={<UserProfile />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Layout>
              </BrowserRouter>
            </HealthProvider>
          </ThemeProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </div>
  );
};

export default App;
