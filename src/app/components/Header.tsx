import { Menu, X, Shield } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { motion, useScroll, useTransform } from "motion/react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const headerBackground = useTransform(
    scrollY,
    [0, 100],
    ["rgba(255, 255, 255, 0.9)", "rgba(255, 255, 255, 0.95)"]
  );
  const headerShadow = useTransform(
    scrollY,
    [0, 100],
    ["0 1px 2px 0 rgb(0 0 0 / 0.05)", "0 4px 6px -1px rgb(0 0 0 / 0.1)"]
  );

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 backdrop-blur-md z-50 border-b border-border"
      style={{
        backgroundColor: headerBackground,
        boxShadow: headerShadow
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <motion.div
            className="flex items-center gap-2 text-2xl font-semibold text-foreground cursor-pointer group"
            onClick={() => scrollToSection("hero")}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.div
              className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <Shield className="h-6 w-6 text-white" />
            </motion.div>
            <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              JS.CyberHub
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {["services", "about", "contact"].map((item, index) => (
              <motion.button
                key={item}
                onClick={() => scrollToSection(item)}
                className="px-4 py-2 text-foreground/80 hover:text-cyan-500 hover:bg-card rounded-lg transition-all font-medium capitalize"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {item}
              </motion.button>
            ))}
            <motion.div
              className="ml-4"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <Button onClick={() => scrollToSection("contact")} className="shadow-sm hover:shadow-md transition-shadow">
                Get Started
              </Button>
            </motion.div>
          </nav>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-foreground/80 hover:bg-muted/40 rounded-lg transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              animate={{ rotate: isMenuOpen ? 90 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </motion.div>
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <motion.nav
          className="md:hidden overflow-hidden border-t border-border"
          initial={false}
          animate={{
            height: isMenuOpen ? "auto" : 0,
            opacity: isMenuOpen ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
        >
          <div className="py-4 space-y-2">
            {["services", "about", "contact"].map((item, index) => (
              <motion.button
                key={item}
                onClick={() => scrollToSection(item)}
                className="block w-full text-left px-4 py-3 text-foreground/80 hover:bg-card hover:text-cyan-500 rounded-lg transition-all font-medium capitalize"
                initial={{ opacity: 0, x: -20 }}
                animate={isMenuOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                {item}
              </motion.button>
            ))}
            <motion.div
              className="px-4 pt-2"
              initial={{ opacity: 0, x: -20 }}
              animate={isMenuOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.3, delay: 0.15 }}
            >
              <Button onClick={() => scrollToSection("contact")} className="w-full">
                Get Started
              </Button>
            </motion.div>
          </div>
        </motion.nav>
      </div>
    </motion.header>
  );
}