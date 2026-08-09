import { Link } from "react-router";
import { motion } from "motion/react";
import {
  TrendingUp, TrendingDown, DollarSign, Users, Calendar,
  Star, Activity, Clock, AlertTriangle, ChevronRight
} from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Cell
} from "recharts";
import { dataService } from "../../../services/dataService";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-card border border-border rounded-lg p-3 text-xs shadow-xl">
      <p className="text-muted-foreground mb-1">{label}</p>
      {payload.map((e: any) => (
        <div key={e.name} className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: e.color }} />
          <span className="text-muted-foreground">{e.name}:</span>
          <span className="text-foreground font-semibold">
            {e.name === "Revenue" ? `₹${Number(e.value).toLocaleString("en-IN")}` : e.value}
          </span>
        </div>
      ))}
    </div>
  );
};

export function AdminOverviewPage() {
  const stats    = dataService.getAdminStats();
  const revenue  = dataService.getMonthlyRevenue();
  const users    = dataService.getAdminUsers();
  const bookings = dataService.getBookings("", "admin");
  const services = dataService.getServices();

  const recentBookings = [...bookings]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 6);

  const recentUsers = [...users].filter((u) => u.role === "user").slice(0, 5);

  const statCards = [
    { label: "Total Revenue",   value: `₹${(stats.totalRevenue / 100000).toFixed(2)}L`, change: `+${stats.revenueGrowth}%`, up: true,  icon: DollarSign, color: "green",  sub: "This financial year"     },
    { label: "Total Bookings",  value: String(stats.totalBookings),                      change: `+${stats.bookingsGrowth}%`,up: true,  icon: Calendar,   color: "blue",   sub: `${stats.pendingBookings} pending` },
    { label: "Active Users",    value: stats.activeUsers.toLocaleString("en-IN"),        change: `+${stats.usersGrowth}%`,  up: true,  icon: Users,      color: "purple", sub: "Registered clients"      },
    { label: "Avg Rating",      value: String(stats.avgRating),                          change: "+0.12",                   up: true,  icon: Star,       color: "yellow", sub: `${stats.activeServices} active services` },
  ];

  const colorMap: Record<string, { icon: string; bg: string }> = {
    green:  { icon: "text-green-400",  bg: "bg-green-500/10 border-green-500/20"   },
    blue:   { icon: "text-blue-400",   bg: "bg-blue-500/10 border-blue-500/20"     },
    purple: { icon: "text-purple-400", bg: "bg-purple-500/10 border-purple-500/20" },
    yellow: { icon: "text-yellow-400", bg: "bg-yellow-500/10 border-yellow-500/20" },
  };

  function bookingBadge(status: string) {
    const m: Record<string, string> = {
      confirmed: "bg-blue-500/15 text-blue-400 border-blue-500/25",
      pending:   "bg-yellow-500/15 text-yellow-400 border-yellow-500/25",
      "in-progress": "bg-purple-500/15 text-purple-400 border-purple-500/25",
      completed: "bg-green-500/15 text-green-400 border-green-500/25",
      cancelled: "bg-red-500/15 text-red-400 border-red-500/25",
    };
    return `inline-flex px-2 py-0.5 rounded-full border text-[10px] font-semibold uppercase tracking-wide ${m[status] ?? "bg-muted text-muted-foreground border-border"}`;
  }

  return (
    <div className="p-6 space-y-6 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs font-semibold text-green-400 uppercase tracking-wider">System Online</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground">Mission Control</h1>
          <p className="text-sm text-muted-foreground">
            {new Date().toLocaleDateString("en-IN", { dateStyle: "full" })}
          </p>
        </div>
        <div className="flex gap-2">
          <Link to="/admin/bookings" className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-muted/50 border border-border text-xs text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors">
            <Calendar className="w-3.5 h-3.5" /> Bookings
          </Link>
          <Link to="/admin/users" className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-primary/10 border border-primary/20 text-xs text-primary font-semibold hover:bg-primary/20 transition-colors">
            <Users className="w-3.5 h-3.5" /> Manage Users
          </Link>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((s, i) => {
          const c = colorMap[s.color];
          return (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              className="cyber-card rounded-xl p-5"
            >
              <div className="flex items-start justify-between mb-3">
                <div className={`p-2 rounded-lg border ${c.bg}`}>
                  <s.icon className={`w-4 h-4 ${c.icon}`} />
                </div>
                <div className={`flex items-center gap-0.5 text-xs font-semibold ${s.up ? "text-green-400" : "text-red-400"}`}>
                  {s.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {s.change}
                </div>
              </div>
              <p className="text-2xl font-bold text-foreground mb-0.5">{s.value}</p>
              <p className="text-sm font-medium text-foreground/80">{s.label}</p>
              <p className="text-[10px] text-muted-foreground mt-0.5">{s.sub}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2 cyber-card rounded-xl p-5"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-semibold text-foreground">Revenue — 2026</h2>
              <p className="text-xs text-muted-foreground">Monthly performance</p>
            </div>
            <Activity className="w-4 h-4 text-muted-foreground" />
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={revenue} margin={{ top: 0, right: 0, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="adminRevGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#6366f1" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0}   />
                </linearGradient>
              </defs>
              <CartesianGrid key="grid"    strokeDasharray="3 3" stroke="rgba(99,102,241,0.08)" />
              <XAxis        key="xaxis"   dataKey="month" tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <YAxis        key="yaxis"   tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${(v/100000).toFixed(1)}L`} />
              <Tooltip      key="tooltip" content={<CustomTooltip />} />
              <Area key="area" type="monotone" dataKey="revenue" name="Revenue" stroke="#6366f1" fill="url(#adminRevGrad)" strokeWidth={2} dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.38 }}
          className="cyber-card rounded-xl p-5"
        >
          <div className="mb-4">
            <h2 className="text-sm font-semibold text-foreground">Bookings / Month</h2>
            <p className="text-xs text-muted-foreground">2026</p>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={revenue} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <CartesianGrid key="grid"    strokeDasharray="3 3" stroke="rgba(99,102,241,0.08)" />
              <XAxis        key="xaxis"   dataKey="month" tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <YAxis        key="yaxis"   tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <Tooltip      key="tooltip" content={<CustomTooltip />} />
              <Bar key="bar" dataKey="bookings" name="Bookings" radius={[4, 4, 0, 0]}>
                {revenue.map((_, idx) => (
                  <Cell key={idx} fill={`hsl(${250 + idx * 8}, 70%, ${55 + idx * 2}%)`} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="cyber-card rounded-xl p-5"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-foreground">Recent Bookings</h2>
            <Link to="/admin/bookings" className="text-xs text-primary hover:underline flex items-center gap-0.5">
              View all <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="space-y-2">
            {recentBookings.map((b) => (
              <div key={b.id} className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-muted/20 transition-colors">
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-foreground truncate">{b.serviceName}</p>
                  <p className="text-[10px] text-muted-foreground">{b.id} · {b.date}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <span className={bookingBadge(b.status)}>{b.status}</span>
                  <p className="text-[10px] text-muted-foreground mt-0.5">₹{b.amount.toLocaleString("en-IN")}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.52 }}
            className="cyber-card rounded-xl p-5"
          >
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold text-foreground">Recent Users</h2>
              <Link to="/admin/users" className="text-xs text-primary hover:underline flex items-center gap-0.5">
                View all <ChevronRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="space-y-2">
              {recentUsers.map((u) => (
                <div key={u.id} className="flex items-center gap-3 py-1.5">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">
                    {u.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-foreground truncate">{u.name}</p>
                    <p className="text-[10px] text-muted-foreground truncate">{u.company ?? u.email}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-[10px] text-muted-foreground">{u.bookings} bookings</p>
                    <span className={`text-[9px] font-semibold ${u.isActive ? "text-green-400" : "text-red-400"}`}>
                      {u.isActive ? "ACTIVE" : "SUSPENDED"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.58 }}
            className="cyber-card rounded-xl p-4"
          >
            <h2 className="text-sm font-semibold text-foreground mb-3">Pending Actions</h2>
            <div className="space-y-2">
              {[
                { label: "Pending Bookings", count: stats.pendingBookings, icon: Clock,          color: "text-yellow-400", to: "/admin/bookings" },
                { label: "Pending Payouts",  count: stats.pendingPayouts,  icon: DollarSign,     color: "text-orange-400", to: "/admin/payments" },
                { label: "Suspended Users",  count: users.filter((u) => !u.isActive).length, icon: AlertTriangle, color: "text-red-400", to: "/admin/users" },
              ].map((item) => (
                <Link
                  key={item.label}
                  to={item.to}
                  className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-muted/20 transition-colors"
                >
                  <item.icon className={`w-4 h-4 flex-shrink-0 ${item.color}`} />
                  <span className="flex-1 text-xs text-muted-foreground">{item.label}</span>
                  <span className={`text-sm font-bold ${item.color}`}>{item.count}</span>
                  <ChevronRight className="w-3 h-3 text-muted-foreground" />
                </Link>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.62 }}
            className="cyber-card rounded-xl p-4"
          >
            <h2 className="text-sm font-semibold text-foreground mb-3">Service Catalogue</h2>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-2 rounded-lg bg-green-500/10 border border-green-500/20">
                <p className="text-lg font-bold text-green-400">{services.filter((s) => s.isActive).length}</p>
                <p className="text-[10px] text-muted-foreground">Live</p>
              </div>
              <div className="p-2 rounded-lg bg-muted/40 border border-border">
                <p className="text-lg font-bold text-muted-foreground">{services.filter((s) => !s.isActive).length}</p>
                <p className="text-[10px] text-muted-foreground">Paused</p>
              </div>
              <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
                <p className="text-lg font-bold text-primary">{services.length}</p>
                <p className="text-[10px] text-muted-foreground">Total</p>
              </div>
            </div>
            <Link to="/admin/services" className="mt-3 flex items-center justify-center gap-1 text-xs text-primary hover:underline">
              Manage services <ChevronRight className="w-3 h-3" />
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
