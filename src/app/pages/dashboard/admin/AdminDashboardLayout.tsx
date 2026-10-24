import { Outlet, Link, useLocation, useNavigate } from "react-router";
import { Home, LayoutDashboard, Briefcase, Calendar, Users, Star, CreditCard, LogOut, Shield, ShieldCheck } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";
import { motion, AnimatePresence } from "motion/react";
import { NotificationBell } from "../../../components/NotificationBell";

export function AdminDashboardLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const navigation = [
    { name: "Overview", href: "/admin", icon: LayoutDashboard },
    { name: "Services", href: "/admin/services", icon: Briefcase },
    { name: "Bookings", href: "/admin/bookings", icon: Calendar },
    { name: "Users", href: "/admin/users", icon: Users },
    { name: "Reviews", href: "/admin/reviews", icon: Star },
    { name: "Payments", href: "/admin/payments", icon: CreditCard },
  ];

  const isActive = (path: string) => {
    if (path === "/admin") return location.pathname === "/admin";
    return location.pathname.startsWith(path);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-cyber-dark relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 cyber-grid opacity-10 pointer-events-none" />

      {/* Top Bar */}
      <header className="cyber-surface backdrop-blur-xl border-b border-border sticky top-0 z-40">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-9 h-9 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center group-hover:neon-glow transition-all">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="flex items-baseline gap-0.5">
                  <span className="text-lg font-bold text-white">JS</span>
                  <span className="text-lg font-bold gradient-text">.CyberHub</span>
                </div>
                <span className="text-xs bg-cyan-500/10 text-cyan-400 px-2 py-0.5 rounded-md font-bold uppercase tracking-wider border border-border">
                  Admin Portal
                </span>
              </div>
            </Link>

            <div className="flex items-center gap-4">
              <Link
                to="/"
                className="text-sm text-muted-foreground hover:text-cyan-400 flex items-center gap-2 font-semibold transition-colors"
              >
                <Home className="h-4 w-4" />
                <span className="hidden sm:inline">Public Site</span>
              </Link>
              <NotificationBell />
              <div className="flex items-center gap-3 pl-4 border-l border-border">
                <div className="text-right hidden sm:block">
                  <div className="text-sm font-bold text-white">{user?.name}</div>
                  <div className="text-xs text-cyan-400 uppercase tracking-wider">System Admin</div>
                </div>
                <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold border border-border">
                  {user?.name?.charAt(0).toUpperCase()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex relative z-10">
        {/* Sidebar */}
        <aside className="w-64 cyber-surface border-r border-border min-h-[calc(100vh-4rem)] sticky top-16 hidden md:block">
          <nav className="p-4 space-y-2">
            {navigation.map((item, index) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`relative flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold transition-all group ${
                    active
                      ? "bg-cyan-500/10 text-cyan-400 neon-border"
                      : "text-muted-foreground hover:bg-cyan-500/5 hover:text-cyan-400"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="uppercase tracking-wider">{item.name}</span>
                  {active && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-400 to-blue-600 rounded-r"
                    />
                  )}
                </Link>
              );
            })}
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold text-red-400 hover:bg-red-500/10 hover:border-red-500/30 border border-transparent transition-all mt-6 uppercase tracking-wider"
            >
              <LogOut className="h-5 w-5" />
              Logout
            </button>

            {/* Status Indicator */}
            <div className="mt-8 p-4 cyber-card rounded-lg neon-border">
              <div className="flex items-center gap-2 mb-2">
                <ShieldCheck className="h-4 w-4 text-cyan-400" />
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">System Status</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-xs font-bold text-green-400 uppercase tracking-wider">All Systems Online</span>
              </div>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-h-[calc(100vh-4rem)]">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="p-4 sm:p-6 lg:p-8"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 cyber-surface backdrop-blur-xl border-t border-border px-4 py-2 z-40">
        <div className="flex items-center justify-around">
          {navigation.slice(0, 5).map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex flex-col items-center gap-1 px-2 py-2 rounded-lg text-xs font-bold transition-all ${
                  active
                    ? "text-cyan-400"
                    : "text-muted-foreground/80 hover:text-cyan-400"
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="text-[10px] uppercase tracking-wider">{item.name}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
