import { Outlet, Link, useLocation, useNavigate } from "react-router";
import {
  LayoutDashboard, Calendar, DollarSign, Star, Settings,
  MessageSquare, LogOut, Menu, X, Shield, Briefcase,
  ChevronRight, Clock, Home
} from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useAuth } from "../../../context/AuthContext";
import { NotificationBell } from "../../../components/NotificationBell";

const navItems = [
  { path: "/provider",              label: "Overview",      icon: LayoutDashboard, group: "main" },
  { path: "/provider/services",     label: "My Services",   icon: Briefcase,       group: "main" },
  { path: "/provider/bookings",     label: "Bookings",      icon: Calendar,        group: "main" },
  { path: "/provider/availability", label: "Availability",  icon: Clock,           group: "main" },
  { path: "/provider/earnings",     label: "Earnings",      icon: DollarSign,      group: "business" },
  { path: "/provider/reviews",      label: "Reviews",       icon: Star,            group: "business" },
  { path: "/provider/messages",     label: "Messages",      icon: MessageSquare,   group: "business" },
  { path: "/provider/settings",     label: "Settings",      icon: Settings,        group: "settings" },
];

const groups = [
  { key: "main",     label: "Operations" },
  { key: "business", label: "Business" },
  { key: "settings", label: "Preferences" },
];

export function ProviderDashboardLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isActive = (path: string) =>
    path === "/provider" ? location.pathname === "/provider" : location.pathname.startsWith(path);

  const currentPage = navItems.find((item) => isActive(item.path));

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const NavContent = ({ onNavigate }: { onNavigate?: () => void }) => (
    <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-5">
      {groups.map((group) => {
        const items = navItems.filter((n) => n.group === group.key);
        return (
          <div key={group.key}>
            <p className="px-3 mb-1.5 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/50">
              {group.label}
            </p>
            <div className="space-y-0.5">
              {items.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path);
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={onNavigate}
                    className={`group flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                      active
                        ? "bg-secondary/10 text-secondary border border-secondary/20"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                    }`}
                  >
                    <Icon className={`h-4 w-4 flex-shrink-0 transition-colors ${active ? "text-secondary" : "text-muted-foreground group-hover:text-foreground"}`} />
                    <span className="flex-1">{item.label}</span>
                    {active && <ChevronRight className="h-3 w-3 text-secondary opacity-60" />}
                  </Link>
                );
              })}
            </div>
          </div>
        );
      })}
    </nav>
  );

  return (
    <div className="min-h-screen bg-background cyber-grid">
      {/* ── Desktop Sidebar ──────────────────────────────────────── */}
      <aside className="hidden lg:flex flex-col fixed top-0 left-0 h-full w-60 bg-card border-r border-border z-30">
        {/* Logo */}
        <div className="h-16 flex items-center gap-3 px-5 border-b border-border flex-shrink-0">
          <div className="w-8 h-8 rounded-lg bg-secondary/10 border border-secondary/20 flex items-center justify-center">
            <Shield className="h-4 w-4 text-secondary" />
          </div>
          <div>
            <div className="text-sm font-bold text-foreground">JS.CyberHub</div>
            <div className="text-[10px] text-muted-foreground">Provider Portal</div>
          </div>
        </div>

        <NavContent />

        {/* Status indicator */}
        <div className="flex-shrink-0 px-5 py-3 border-t border-border">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-[10px] text-green-400 font-medium">Provider Active</span>
          </div>

          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-secondary to-primary flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
              {user?.name?.charAt(0)?.toUpperCase() ?? "P"}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-medium text-foreground truncate">{user?.name ?? "Provider"}</div>
              <div className="text-[10px] text-muted-foreground truncate">{user?.email}</div>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium text-destructive hover:bg-destructive/10 transition-colors"
          >
            <LogOut className="h-3.5 w-3.5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* ── Top Bar ──────────────────────────────────────────────── */}
      <header className="lg:ml-60 sticky top-0 z-20 h-16 bg-card/80 backdrop-blur-md border-b border-border flex items-center justify-between px-4 sm:px-6">
        {/* Mobile hamburger */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="lg:hidden p-2 rounded-lg hover:bg-muted/40 transition-colors text-muted-foreground"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Mobile logo */}
        <Link to="/provider" className="lg:hidden flex items-center gap-2">
          <Shield className="h-5 w-5 text-secondary" />
          <span className="text-sm font-bold text-foreground">JS.CyberHub</span>
        </Link>

        {/* Breadcrumb (desktop) */}
        <div className="hidden lg:flex items-center gap-1 text-sm">
          <span className="text-muted-foreground">Provider</span>
          {currentPage && (
            <>
              <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/50" />
              <span className="text-foreground font-medium">{currentPage.label}</span>
            </>
          )}
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="hidden sm:flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors px-2 py-1.5 rounded-lg hover:bg-muted/40"
          >
            <Home className="h-3.5 w-3.5" />
            Home
          </Link>
          <NotificationBell />
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-secondary to-primary flex items-center justify-center text-white text-xs font-bold">
            {user?.name?.charAt(0)?.toUpperCase() ?? "P"}
          </div>
        </div>
      </header>

      {/* ── Main Content ─────────────────────────────────────────── */}
      <main className="lg:ml-60 min-h-[calc(100vh-4rem)]">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* ── Mobile Bottom Nav ─────────────────────────────────────── */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-md border-t border-border px-2 py-2 z-20">
        <div className="flex items-center justify-around">
          {navItems.slice(0, 5).map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-lg transition-colors ${
                  active ? "text-secondary" : "text-muted-foreground"
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="text-[9px] font-medium">{item.label.split(" ")[0]}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* ── Mobile Slide-over Sidebar ─────────────────────────────── */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden fixed inset-0 bg-black/60 z-40"
            />
            <motion.aside
              key="drawer"
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", damping: 28, stiffness: 260 }}
              className="lg:hidden fixed top-0 left-0 h-full w-64 bg-card border-r border-border z-50 flex flex-col"
            >
              <div className="h-16 flex items-center justify-between px-5 border-b border-border flex-shrink-0">
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-secondary" />
                  <div>
                    <div className="text-sm font-bold text-foreground">JS.CyberHub</div>
                    <div className="text-[10px] text-muted-foreground">Provider Portal</div>
                  </div>
                </div>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="p-1 rounded-lg hover:bg-muted/40 text-muted-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <NavContent onNavigate={() => setSidebarOpen(false)} />
              <div className="flex-shrink-0 border-t border-border p-3">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium text-destructive hover:bg-destructive/10 transition-colors"
                >
                  <LogOut className="h-3.5 w-3.5" />
                  Sign Out
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
