import { Outlet, Link, useLocation, useNavigate } from "react-router";
import {
  LayoutDashboard,
  Calendar,
  DollarSign,
  Star,
  Settings,
  MessageSquare,
  LogOut,
  Menu,
  X,
  Shield,
  User,
  Briefcase
} from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useAuth } from "../../../context/AuthContext";
import { NotificationBell } from "../../../components/NotificationBell";

export function ProviderDashboardLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
    { path: "/provider", label: "Overview", icon: LayoutDashboard },
    { path: "/provider/services", label: "My Services", icon: Briefcase },
    { path: "/provider/bookings", label: "Bookings", icon: Calendar },
    { path: "/provider/availability", label: "Availability", icon: Calendar },
    { path: "/provider/earnings", label: "Earnings", icon: DollarSign },
    { path: "/provider/reviews", label: "Reviews", icon: Star },
    { path: "/provider/messages", label: "Messages", icon: MessageSquare },
    { path: "/provider/settings", label: "Settings", icon: Settings },
  ];

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 z-40">
        <Link to="/provider" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
            <Shield className="h-5 w-5 text-white" />
          </div>
          <span className="font-bold text-gray-900">JS.CyberHub</span>
        </Link>
        
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Sidebar */}
      <AnimatePresence>
        {(sidebarOpen || window.innerWidth >= 1024) && (
          <>
            {/* Overlay for mobile */}
            {sidebarOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden fixed inset-0 bg-black/50 z-40"
              />
            )}

            {/* Sidebar content */}
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", damping: 25 }}
              className="fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-200 flex flex-col z-50 lg:translate-x-0"
            >
              {/* Logo */}
              <div className="h-16 flex items-center gap-3 px-6 border-b border-gray-200">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="font-bold text-gray-900">JS.CyberHub</div>
                  <div className="text-xs text-gray-500">Provider Portal</div>
                </div>
              </div>

              {/* Navigation */}
              <nav className="flex-1 overflow-y-auto p-4">
                <div className="space-y-1">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path;
                    
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => setSidebarOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                          isActive
                            ? "bg-blue-50 text-blue-600 font-medium"
                            : "text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                        {item.label}
                      </Link>
                    );
                  })}
                </div>
              </nav>

              {/* User Profile */}
              <div className="p-4 border-t border-gray-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-medium">
                    {user?.name?.charAt(0) || "P"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-gray-900 truncate">
                      {user?.name || "Provider"}
                    </div>
                    <div className="text-xs text-gray-500 truncate">
                      {user?.email}
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors text-sm font-medium"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="lg:ml-64 pt-16 lg:pt-0">
        {/* Top Bar */}
        <div className="hidden lg:flex h-16 bg-white border-b border-gray-200 items-center justify-between px-8">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              {navItems.find(item => item.path === location.pathname)?.label || "Provider Dashboard"}
            </h2>
          </div>
          
          <div className="flex items-center gap-4">
            <NotificationBell />

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-medium text-sm">
                {user?.name?.charAt(0) || "P"}
              </div>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <main className="p-4 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
