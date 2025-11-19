import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import RouteTransition from "./components/RouteTransition";

import Home from "./pages/Home";
import ServicesHub from "./pages/ServicesHub";
import AutoDetailingInterior from "./pages/services/AutoDetailingInterior";
import AutoDetailingExterior from "./pages/services/AutoDetailingExterior";
import PaintCorrection from "./pages/services/PaintCorrection";
import CeramicCoating from "./pages/services/CeramicCoating";
import Gallery from "./pages/Gallery";
import FAQ from "./pages/FAQ";
import Contact from "./pages/Contact";
import Booking from "./pages/Booking";
import BookingSuccess from "./pages/BookingSuccess";
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
            <Route element={<RouteTransition />}>
              <Route index element={<Home />} />
              <Route path="services" element={<ServicesHub />} />
              <Route path="services/auto-detailing-interior" element={<AutoDetailingInterior />} />
              <Route path="services/auto-detailing-exterior" element={<AutoDetailingExterior />} />
              <Route path="services/paint-correction" element={<PaintCorrection />} />
              <Route path="services/ceramic-coating" element={<CeramicCoating />} />
              <Route path="gallery" element={<Gallery />} />
              <Route path="faq" element={<FAQ />} />
              <Route path="contact" element={<Contact />} />
              <Route path="booking" element={<Booking />} />
              <Route path="booking-success" element={<BookingSuccess />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
