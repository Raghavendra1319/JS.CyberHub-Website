import { Outlet, Link, useLocation, useNavigate } from "react-router";
import {
  Home, Calendar, History, User, CreditCard, Star, LogOut,
  Shield, FileText, AlertTriangle, AlertOctagon, MessageSquare,
  Globe, ChevronRight, Menu, X
} from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useAuth } from "../../../context/AuthContext";
import { NotificationBell } from "../../../components/NotificationBell";

const navigation = [
  { name: "My Bookings",       href: "/dashboard",                    icon: Calendar,       group: "core" },
  { name: "Security Score",    href: "/dashboard/security-score",     icon: Shield,         group: "cyber" },
  { name: "Vulnerabilities",   href: "/dashboard/vulnerability",      icon: AlertTriangle,  group: "cyber" },
  { name: "Incidents",         href: "/dashboard/incidents",          icon: AlertOctagon,   group: "cyber" },
  { name: "Threat Intel",      href: "/dashboard/threat-intelligence",icon: Globe,          group: "cyber" },
  { name: "Support Tickets",   href: "/dashboard/support",            icon: MessageSquare,  group: "cyber" },
  { name: "History",           href: "/dashboard/history",            icon: History,        group: "account" },
  { name: "Invoices",          href: "/dashboard/invoices",           icon: FileText,       group: "account" },
  { name: "Payments",          href: "/dashboard/payments",           icon: CreditCard,     group: "account" },
  { name: "Profile",           href: "/dashboard/profile",            icon: User,           group: "account" },
  { name: "Reviews",           href: "/dashboard/reviews",            icon: Star,           group: "account" },
];

const groups = [
  { key: "core",    label: "Operations" },
  { key: "cyber",   label: "Cyber Defense" },
  { key: "account", label: "Account" },
];

export function UserDashboardLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (path: string) =>
    path === "/dashboard" ? location.pathname === "/dashboard" : location.pathname.startsWith(path);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const NavContent = ({ onNavigate }: { onNavigate?: () => void }) => (
    <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-5">
      {groups.map((group) => {
        const items = navigation.filter((n) => n.group === group.key);
        return (
          <div key={group.key}>
            <p className="px-3 mb-1.5 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/50">
              {group.label}
            </p>
            <div className="space-y-0.5">
              {items.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={onNavigate}
                    className={`group flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                      active
                        ? "bg-primary/10 text-primary border border-primary/20"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                    }`}
                  >
                    <Icon className={`h-4 w-4 flex-shrink-0 transition-colors ${active ? "text-primary" : "text-muted-foreground group-hover:text-foreground"}`} />
                    <span className="flex-1">{item.name}</span>
                    {active && <ChevronRight className="h-3 w-3 text-primary opacity-60" />}
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
      <aside className="hidden md:flex flex-col fixed top-0 left-0 h-full w-60 bg-card border-r border-border z-30">
        {/* Logo */}
        <div className="h-16 flex items-center gap-3 px-5 border-b border-border flex-shrink-0">
          <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
            <Shield className="h-4 w-4 text-primary" />
          </div>
          <div>
            <div className="text-sm font-bold text-foreground">JS.CyberHub</div>
            <div className="text-[10px] text-muted-foreground">User Portal</div>
          </div>
        </div>

        <NavContent />

        {/* User + Logout */}
        <div className="flex-shrink-0 border-t border-border p-3">
          <div className="flex items-center gap-3 px-2 py-2 mb-1">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
              {user?.name?.charAt(0)?.toUpperCase() ?? "U"}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-medium text-foreground truncate">{user?.name ?? "User"}</div>
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
      <header className="md:ml-60 sticky top-0 z-20 h-16 bg-card/80 backdrop-blur-md border-b border-border flex items-center justify-between px-4 sm:px-6">
        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(true)}
          className="md:hidden p-2 rounded-lg hover:bg-muted/40 transition-colors text-muted-foreground"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Mobile logo */}
        <Link to="/" className="md:hidden flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          <span className="text-sm font-bold text-foreground">JS.CyberHub</span>
        </Link>

        {/* Breadcrumb (desktop) */}
        <div className="hidden md:flex items-center gap-1 text-sm">
          <span className="text-muted-foreground">Dashboard</span>
          {location.pathname !== "/dashboard" && (
            <>
              <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/50" />
              <span className="text-foreground font-medium">
                {navigation.find((n) => isActive(n.href))?.name ?? ""}
              </span>
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
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-xs font-bold">
            {user?.name?.charAt(0)?.toUpperCase() ?? "U"}
          </div>
        </div>
      </header>

      {/* ── Main Content ─────────────────────────────────────────── */}
      <main className="md:ml-60 min-h-[calc(100vh-4rem)]">
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
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-md border-t border-border px-2 py-2 z-20">
        <div className="flex items-center justify-around">
          {navigation.slice(0, 5).map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-lg transition-colors ${
                  active ? "text-primary" : "text-muted-foreground"
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="text-[9px] font-medium">{item.name.split(" ")[0]}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* ── Mobile Slide-over Sidebar ─────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="md:hidden fixed inset-0 bg-black/60 z-40"
            />
            <motion.aside
              key="drawer"
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", damping: 28, stiffness: 260 }}
              className="md:hidden fixed top-0 left-0 h-full w-64 bg-card border-r border-border z-50 flex flex-col"
            >
              <div className="h-16 flex items-center justify-between px-5 border-b border-border flex-shrink-0">
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  <span className="text-sm font-bold text-foreground">JS.CyberHub</span>
                </div>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-1 rounded-lg hover:bg-muted/40 text-muted-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <NavContent onNavigate={() => setMobileOpen(false)} />
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
