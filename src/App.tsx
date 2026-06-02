import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import Companies from "./pages/Companies.tsx";
import Members from "./pages/Members.tsx";
import Investors from "./pages/Investors.tsx";
import Rounds from "./pages/Rounds.tsx";
import Taxonomy from "./pages/Taxonomy.tsx";
import Moderation from "./pages/Moderation.tsx";
import BulkImport from "./pages/BulkImport.tsx";
import CompanyForm from "./pages/CompanyForm.tsx";
import PersonForm from "./pages/PersonForm.tsx";
import InvestorForm from "./pages/InvestorForm.tsx";
import RoundForm from "./pages/RoundForm.tsx";
import DeletePage from "./pages/DeletePage.tsx";
import Settings from "./pages/Settings.tsx";
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
          <Route path="/companies/new" element={<CompanyForm />} />
          <Route path="/companies/:id/edit" element={<CompanyForm />} />

          <Route path="/members" element={<Members />} />

          <Route path="/investors" element={<Investors />} />
          <Route path="/investors/new" element={<InvestorForm />} />
          <Route path="/investors/:id/edit" element={<InvestorForm />} />

          <Route path="/rounds" element={<Rounds />} />
          <Route path="/rounds/new" element={<RoundForm />} />
          <Route path="/rounds/:id/edit" element={<RoundForm />} />

          <Route path="/:entity/:id/delete" element={<DeletePage />} />

          <Route path="/taxonomy" element={<Taxonomy />} />
          <Route path="/moderation" element={<Moderation />} />
          <Route path="/import" element={<BulkImport />} />
          <Route path="/settings" element={<Settings />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
