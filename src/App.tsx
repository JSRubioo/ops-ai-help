import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import NovoTicket from "./pages/NovoTicket";
import FAQ from "./pages/FAQ";
import Relatorios from "./pages/Relatorios";
import PesquisarTickets from "./pages/PesquisarTickets";
import EditarTicket from "./pages/EditarTicket";
import VisualizarTicket from "./pages/VisualizarTicket";
import Usuarios from "./pages/Usuarios";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/novo-ticket" element={<NovoTicket />} />
            <Route path="/meus-tickets" element={<PesquisarTickets />} />
            <Route path="/editar-ticket/:id" element={<EditarTicket />} />
            <Route path="/visualizar-ticket/:id" element={<VisualizarTicket />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/relatorios" element={<Relatorios />} />
            <Route path="/usuarios" element={<Usuarios />} />
            <Route path="/configuracoes" element={<Dashboard />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
