import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Projects from "./pages/Projects";
import Deployments from "./pages/DeploymentPage";
import Register from "./pages/Register";
import UsagePage from "./pages/Usage";
import Item from "./pages/Items";
import Docs from "./pages/DocsPage";
import Discover from "./pages/Discover";
import Template from "./pages/Templates";
import MessagesPage from "./pages/MessagesPage";
import ProfilePage from "./pages/ProfilePage"

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          
          
          <Route path="/register" element={<Register />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/deployments" element={<Deployments />} />
          <Route path="/usage" element={<UsagePage />} />
        <Route path="/items" element={<Item />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/docs" element={<Docs />} />
          <Route path="/discover" element={<Discover />} />
          <Route path="/templates" element={<Template />} />
          <Route path="/messages" element={<MessagesPage />} />
          <Route path="/profile" element={<ProfilePage />} />

        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
