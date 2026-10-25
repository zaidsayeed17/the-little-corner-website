import React from "react";
import { Routes, Route } from "react-router-dom";
import { AnnouncementBar } from "./components/layout/AnnouncementBar";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { ScrollToTopAndAnchor } from "./components/layout/ScrollToTopAndAnchor";
import { SmoothScroll } from "./components/layout/SmoothScroll";
import { DevNotice } from "./components/ui/DevNotice";
import { HomePage } from "./pages/HomePage";
import { ShopPage } from "./pages/ShopPage";
import { FaqsPage } from "./pages/FaqsPage";
import { PolicyPage } from "./pages/PolicyPage";
import { NotFoundPage } from "./pages/NotFoundPage";

export default function App() {
  return (
    <SmoothScroll>
      <div className="relative min-h-screen flex flex-col overflow-x-hidden">
      {/* Background radial glows fixed behind content */}
      <div className="bg-glow-decor" aria-hidden="true" />

      {/* Accessible Skip-to-content link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 px-4 py-2 bg-rose-600 text-white font-medium text-sm rounded-full shadow-lg outline-2 outline-rose-700"
      >
        Skip to main content
      </a>

      {/* Route & anchor scroll manager */}
      <ScrollToTopAndAnchor />

      {/* Announcement Bar */}
      <AnnouncementBar />

      {/* Sticky Header with Logo, Navigation, Search, Saved Drawer & WhatsApp */}
      <Header />

      {/* Main Landmark */}
      <main id="main-content" className="relative z-10 flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/faqs" element={<FaqsPage />} />
          <Route path="/policies/:slug" element={<PolicyPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      {/* Footer Landmark */}
      <Footer />

      {/* Dev-only notice pinned bottom-left (auto-hidden in production) */}
      <DevNotice />
    </div>
  </SmoothScroll>
  );
}
