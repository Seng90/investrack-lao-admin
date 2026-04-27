import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import Companies from "./pages/Companies.tsx";
import People from "./pages/People.tsx";
import Investors from "./pages/Investors.tsx";
import Rounds from "./pages/Rounds.tsx";
import Taxonomy from "./pages/Taxonomy.tsx";
import Moderation from "./pages/Moderation.tsx";
import BulkImport from "./pages/BulkImport.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/companies" element={<Companies />} />
          <Route path="/people" element={<People />} />
          <Route path="/investors" element={<Investors />} />
          <Route path="/rounds" element={<Rounds />} />
          <Route path="/taxonomy" element={<Taxonomy />} />
          <Route path="/moderation" element={<Moderation />} />
          <Route path="/import" element={<BulkImport />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
