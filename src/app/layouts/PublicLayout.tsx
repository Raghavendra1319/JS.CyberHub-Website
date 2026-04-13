import { Outlet, Link, useLocation } from "react-router";
import { Shield, Menu, X, User, LogOut } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { motion, AnimatePresence } from "motion/react";

export function PublicLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, user, logout, isAdmin } = useAuth();
  const location = useLocation();

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Pricing", href: "/pricing" },
    { name: "Testimonials", href: "/testimonials" },
    { name: "FAQ", href: "/faq" },
    { name: "Contact", href: "/contact" },
  ];

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen flex flex-col bg-cyber-dark">
      {/* Header */}
      <header className="sticky top-0 z-50 cyber-surface backdrop-blur-xl border-b border-neon-blue/20">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-gradient-to-br from-neon-indigo to-neon-purple rounded-lg flex items-center justify-center group-hover:neon-glow transition-all">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div className="flex items-baseline gap-0.5">
                <span className="text-xl font-bold text-white">JS</span>
                <span className="text-xl font-bold gradient-text">.CyberHub</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`text-sm font-semibold transition-all relative ${
                    isActive(item.href)
                      ? "text-neon-blue"
                      : "text-blue-300 hover:text-neon-blue"
                  }`}
                >
                  {item.name}
                  {isActive(item.href) && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute -bottom-[21px] left-0 right-0 h-0.5 bg-gradient-to-r from-neon-indigo to-neon-purple"
                    />
                  )}
                </Link>
              ))}
            </div>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center gap-4">
              {isAuthenticated ? (
                <>
                  <Link
                    to={isAdmin ? "/admin" : "/dashboard"}
                    className="flex items-center gap-2 text-sm font-semibold text-blue-300 hover:text-neon-blue transition-colors"
                  >
                    <User className="h-4 w-4" />
                    {user?.name}
                  </Link>
                  <button
                    onClick={logout}
                    className="flex items-center gap-2 text-sm font-semibold text-blue-300 hover:text-red-400 transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/auth/login"
                    className="text-sm font-semibold text-blue-300 hover:text-neon-blue transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    to="/auth/signup"
                    className="px-5 py-2.5 bg-gradient-to-r from-neon-indigo to-neon-purple text-white text-sm font-bold rounded-lg neon-glow hover:scale-105 transition-transform"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-neon-blue/10 transition-colors"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6 text-blue-300" />
              ) : (
                <Menu className="h-6 w-6 text-blue-300" />
              )}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden border-t border-neon-blue/20 bg-cyber-surface backdrop-blur-xl"
            >
              <div className="px-4 py-4 space-y-2">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-4 py-3 rounded-lg text-sm font-semibold transition-all ${
                      isActive(item.href)
                        ? "bg-neon-blue/10 text-neon-blue neon-border"
                        : "text-blue-300 hover:bg-neon-blue/5"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="border-t border-neon-blue/20 pt-3 mt-3 space-y-2">
                  {isAuthenticated ? (
                    <>
                      <Link
                        to={isAdmin ? "/admin" : "/dashboard"}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block px-4 py-3 rounded-lg text-sm font-semibold text-blue-300 hover:bg-neon-blue/5"
                      >
                        Dashboard
                      </Link>
                      <button
                        onClick={() => {
                          logout();
                          setMobileMenuOpen(false);
                        }}
                        className="w-full text-left px-4 py-3 rounded-lg text-sm font-semibold text-red-400 hover:bg-red-500/10"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/auth/login"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block px-4 py-3 rounded-lg text-sm font-semibold text-blue-300 hover:bg-neon-blue/5"
                      >
                        Login
                      </Link>
                      <Link
                        to="/auth/signup"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block px-4 py-3 bg-gradient-to-r from-neon-indigo to-neon-purple text-white text-sm font-bold rounded-lg text-center"
                      >
                        Get Started
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-cyber-darker relative overflow-hidden border-t border-neon-blue/20">
        <div className="absolute inset-0 cyber-grid opacity-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-neon-indigo to-neon-purple rounded-lg flex items-center justify-center neon-glow">
                  <Shield className="h-7 w-7 text-white" />
                </div>
                <div className="flex items-baseline gap-0.5">
                  <span className="text-2xl font-bold text-white">JS</span>
                  <span className="text-2xl font-bold gradient-text">.CyberHub</span>
                </div>
              </div>
              <p className="text-blue-300 mb-6 leading-relaxed max-w-md">
                Advanced cybersecurity solutions, penetration testing, and security consulting for the modern digital landscape.
              </p>
              <div className="flex items-center gap-4">
                {["ISO 27001", "SOC 2"].map((cert) => (
                  <div key={cert} className="px-3 py-1.5 cyber-surface rounded-md neon-border">
                    <span className="text-xs font-bold text-neon-blue">{cert}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-bold text-white mb-6 text-sm uppercase tracking-wider">Quick Access</h3>
              <ul className="space-y-3 text-sm">
                <li><Link to="/services" className="text-blue-300 hover:text-neon-blue transition-colors flex items-center gap-2 group">
                  <span className="w-1 h-1 bg-neon-blue rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  Services
                </Link></li>
                <li><Link to="/pricing" className="text-blue-300 hover:text-neon-blue transition-colors flex items-center gap-2 group">
                  <span className="w-1 h-1 bg-neon-blue rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  Pricing
                </Link></li>
                <li><Link to="/faq" className="text-blue-300 hover:text-neon-blue transition-colors flex items-center gap-2 group">
                  <span className="w-1 h-1 bg-neon-blue rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  FAQ
                </Link></li>
                <li><Link to="/contact" className="text-blue-300 hover:text-neon-blue transition-colors flex items-center gap-2 group">
                  <span className="w-1 h-1 bg-neon-blue rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  Contact
                </Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-white mb-6 text-sm uppercase tracking-wider">Command Center</h3>
              <ul className="space-y-3 text-sm text-blue-300">
                <li className="flex items-start gap-2">
                  <span className="text-neon-blue mt-0.5">▸</span>
                  <span>raghavendrakanade13@gmail.com</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-neon-blue mt-0.5">▸</span>
                  <span>+91 8446173815</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-neon-blue mt-0.5">▸</span>
                  <span>Chhatrapati Sambhajinagar</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-neon-blue/20">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-blue-400">
                &copy; 2026 <span className="font-bold gradient-text">JS.CyberHub</span>. All systems secured.
              </p>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-xs font-semibold text-green-400 uppercase tracking-wider">System Online</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
