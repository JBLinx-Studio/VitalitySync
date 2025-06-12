
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
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

const App = () => (
  <div className="app-background">
    <div className="app-container">
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <ThemeProvider>
            <HealthProvider>
              <Toaster />
              <Sonner />
              <HashRouter>
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
              </HashRouter>
            </HealthProvider>
          </ThemeProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </div>
  </div>
);

export default App;
