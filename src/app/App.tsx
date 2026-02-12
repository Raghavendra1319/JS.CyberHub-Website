import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Services } from "./components/Services";
import { About } from "./components/About";
import { Reviews } from "./components/Reviews";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { Toaster } from "./components/ui/sonner";
import { AuthModal } from "./components/AuthModal";
import { useState, useEffect } from "react";

export default function App() {
  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {
    // Show auth modal after a short delay when the website loads
    const timer = setTimeout(() => {
      setShowAuthModal(true);
    }, 1000); // 1 second delay

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <Services />
      <About />
      <Reviews />
      <Contact />
      <Footer />
      <Toaster />
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </div>
  );
}