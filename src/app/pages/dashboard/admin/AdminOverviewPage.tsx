import { TrendingUp, TrendingDown, DollarSign, Users, Calendar, Star, Activity, Shield, Zap } from "lucide-react";
import { motion } from "motion/react";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export function AdminOverviewPage() {
  const stats = [
    {
      name: "Total Revenue",
      value: "$45,231",
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
      label: "REVENUE"
    },
    {
      name: "Total Bookings",
      value: "234",
      change: "+8.2%",
      trend: "up",
      icon: Calendar,
      label: "DEPLOYMENTS"
    },
    {
      name: "Active Users",
      value: "1,234",
      change: "+23.1%",
      trend: "up",
      icon: Users,
      label: "USERS"
    },
    {
      name: "Security Rating",
      value: "A+",
      change: "+0.2",
      trend: "up",
      icon: Shield,
      label: "RATING"
    }
  ];

  const revenueData = [
    { month: "Jan", revenue: 4000 },
    { month: "Feb", revenue: 3000 },
    { month: "Mar", revenue: 5000 },
    { month: "Apr", revenue: 4500 },
    { month: "May", revenue: 6000 },
    { month: "Jun", revenue: 5500 },
  ];

  const bookingsData = [
    { service: "Security", count: 45 },
    { service: "Development", count: 32 },
    { service: "Consulting", count: 28 },
    { service: "Training", count: 18 },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-3">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-xs font-bold text-green-400 uppercase tracking-wider">System Online</span>
          </div>
          <span className="text-blue-400">•</span>
          <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">Command Center</span>
        </div>
        <h1 className="text-4xl font-bold text-white mb-2">Mission Control</h1>
        <p className="text-blue-300">Real-time operational intelligence and system status</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const TrendIcon = stat.trend === "up" ? TrendingUp : TrendingDown;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="cyber-card rounded-xl p-6 neon-border hover:neon-glow transition-all group relative overflow-hidden"
            >
              {/* Background Accent */}
              <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/5 to-neon-purple/5 opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="relative">
                <div className="flex items-start justify-between mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-neon-blue/20 to-neon-purple/20 rounded-lg flex items-center justify-center border border-neon-blue/30 group-hover:scale-110 transition-transform">
                    <Icon className="h-6 w-6 text-neon-blue" />
                  </div>
                  <div className={`flex items-center gap-1 px-2 py-1 rounded-md text-xs font-bold ${
                    stat.trend === "up"
                      ? "bg-green-500/10 text-green-400 border border-green-500/30"
                      : "bg-red-500/10 text-red-400 border border-red-500/30"
                  }`}>
                    <TrendIcon className="h-3 w-3" />
                    {stat.change}
                  </div>
                </div>
                <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-xs font-bold text-neon-blue uppercase tracking-wider">{stat.label}</div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="cyber-card rounded-xl p-6 neon-border"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Activity className="h-5 w-5 text-neon-blue" />
              Revenue Intelligence
            </h3>
            <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">Last 6 Months</span>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.6}/>
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(99, 102, 241, 0.1)" />
              <XAxis dataKey="month" stroke="#94a3b8" style={{ fontSize: '12px', fontWeight: 600 }} />
              <YAxis stroke="#94a3b8" style={{ fontSize: '12px', fontWeight: 600 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(19, 19, 26, 0.95)',
                  border: '1px solid rgba(99, 102, 241, 0.3)',
                  borderRadius: '8px',
                  color: '#e0e7ff'
                }}
              />
              <Area type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={2} fillOpacity={1} fill="url(#colorRevenue)" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Bookings by Service */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="cyber-card rounded-xl p-6 neon-border"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Zap className="h-5 w-5 text-neon-purple" />
              Service Distribution
            </h3>
            <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">Active Deployments</span>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={bookingsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(99, 102, 241, 0.1)" />
              <XAxis dataKey="service" stroke="#94a3b8" style={{ fontSize: '12px', fontWeight: 600 }} />
              <YAxis stroke="#94a3b8" style={{ fontSize: '12px', fontWeight: 600 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(19, 19, 26, 0.95)',
                  border: '1px solid rgba(168, 85, 247, 0.3)',
                  borderRadius: '8px',
                  color: '#e0e7ff'
                }}
              />
              <Bar dataKey="count" fill="#a855f7" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="cyber-card rounded-xl p-6 neon-border"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Activity className="h-5 w-5 text-neon-blue" />
            Live Operations Feed
          </h3>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-xs font-bold text-green-400 uppercase tracking-wider">Real-time</span>
          </div>
        </div>
        <div className="space-y-3">
          {[
            { customer: "John Doe", service: "Network Security Audit", amount: "$799", status: "confirmed", id: "JD" },
            { customer: "Jane Smith", service: "Custom Website Development", amount: "$2,999", status: "pending", id: "JS" },
            { customer: "Mike Johnson", service: "Business Consulting", amount: "$599", status: "confirmed", id: "MJ" },
            { customer: "Sarah Williams", service: "Cybersecurity Training", amount: "$899", status: "confirmed", id: "SW" },
          ].map((booking, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="flex items-center justify-between p-4 rounded-lg hover:bg-neon-blue/5 transition-all border border-transparent hover:border-neon-blue/30 group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-neon-indigo to-neon-purple rounded-lg flex items-center justify-center text-white font-bold text-sm border border-neon-blue/30 group-hover:neon-glow transition-all">
                  {booking.id}
                </div>
                <div>
                  <div className="font-bold text-white mb-1">{booking.customer}</div>
                  <div className="text-sm text-blue-300">{booking.service}</div>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <div className="font-bold text-white text-lg mb-1">{booking.amount}</div>
                  <span className={`text-xs font-bold px-3 py-1.5 rounded-md uppercase tracking-wider ${
                    booking.status === "confirmed"
                      ? "bg-green-500/10 text-green-400 border border-green-500/30"
                      : "bg-yellow-500/10 text-yellow-400 border border-yellow-500/30"
                  }`}>
                    {booking.status}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
