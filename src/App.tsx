
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import { HealthProvider } from "@/contexts/HealthContext";
import Layout from "@/components/Layout/Layout";
import Index from "@/pages/Index";
import Dashboard from "@/pages/Dashboard";
import FoodTracker from "@/pages/FoodTracker";
import ExerciseTracker from "@/pages/ExerciseTracker";
import UserProfile from "@/pages/UserProfile";
import SleepTracker from "@/pages/SleepTracker";
import MentalWellness from "@/pages/MentalWellness";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
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
              <Route path="/profile" element={<UserProfile />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </HashRouter>
      </HealthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
