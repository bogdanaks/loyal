import { AnimatePresence } from "framer-motion";
import { Route, Routes, useLocation } from "react-router-dom";

import { ClientDetailPage } from "pages/clients/client-detail.page";
import { ClientsPage } from "pages/clients/clients.page";

export const AnimateRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence
      // mode="wait"
      initial={false}
      onExitComplete={() => {
        if (typeof window !== "undefined") {
          window.scrollTo({ top: 0 });
        }
      }}
    >
      <Routes location={location} key={location.pathname}>
        <Route path="clients" element={<ClientsPage />} />
        <Route path="clients/:id" element={<ClientDetailPage />} />
      </Routes>
    </AnimatePresence>
  );
};
