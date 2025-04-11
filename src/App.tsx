
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import GardenPage from "./pages/Garden";
import PlantDetail from "./pages/PlantDetail";
import AboutPage from "./pages/About";
import CategoriesPage from "./pages/Categories";
import AiRecommendations from "./pages/AiRecommendations";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";

// Create a client outside the component
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
    },
  },
});

// Define App as a proper function component
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/garden" element={<GardenPage />} />
              <Route path="/plant/:id" element={<PlantDetail />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/categories" element={<CategoriesPage />} />
              <Route path="/ai-recommendations" element={<AiRecommendations />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
