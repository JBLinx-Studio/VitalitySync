
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HealthProvider } from "@/contexts/HealthContext";
import Layout from "@/components/Layout/Layout";
import Dashboard from "@/pages/Dashboard";
import FoodTracker from "@/pages/FoodTracker";
import ExerciseTracker from "@/pages/ExerciseTracker";
import UserProfile from "@/pages/UserProfile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <HealthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/food" element={<FoodTracker />} />
              <Route path="/exercise" element={<ExerciseTracker />} />
              <Route path="/profile" element={<UserProfile />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </HealthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
