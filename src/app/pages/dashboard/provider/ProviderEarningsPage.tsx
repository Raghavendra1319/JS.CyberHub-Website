import { IndianRupee, TrendingUp, Download, Calendar, TrendingDown, Wallet, CreditCard } from "lucide-react";
import { motion } from "motion/react";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

export function ProviderEarningsPage() {
  const stats = [
    { label: "Total Earnings", value: 425000, change: "+15.3%", trend: "up", icon: Wallet },
    { label: "This Month", value: 132000, change: "+8.2%", trend: "up", icon: TrendingUp },
    { label: "Pending Payments", value: 28000, change: "-12%", trend: "down", icon: CreditCard },
    { label: "Avg per Booking", value: 24500, change: "+5.1%", trend: "up", icon: IndianRupee }
  ];

  const earningsData = [
    { month: "Jan", earnings: 84000, bookings: 8 },
    { month: "Feb", earnings: 56000, bookings: 6 },
    { month: "Mar", earnings: 98000, bookings: 10 },
    { month: "Apr", earnings: 75000, bookings: 9 },
    { month: "May", earnings: 112000, bookings: 12 },
  ];

  const serviceBreakdown = [
    { name: "Security Audits", value: 165000, percentage: 38.8 },
    { name: "Development", value: 142000, percentage: 33.4 },
    { name: "Consulting", value: 75000, percentage: 17.6 },
    { name: "Training", value: 43000, percentage: 10.2 }
  ];

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'];

  const recentTransactions = [
    {
      id: "TXN-001",
      client: "TechCorp India Pvt Ltd",
      service: "Network Security Audit",
      date: "2026-05-02",
      amount: 28000,
      status: "completed"
    },
    {
      id: "TXN-002",
      client: "StartupXYZ Solutions",
      service: "Website Development",
      date: "2026-05-01",
      amount: 85000,
      status: "completed"
    },
    {
      id: "TXN-003",
      client: "SmallBiz Enterprises",
      service: "Business Consulting",
      date: "2026-04-28",
      amount: 18000,
      status: "pending"
    },
    {
      id: "TXN-004",
      client: "Enterprise LLC",
      service: "Cybersecurity Training",
      date: "2026-04-25",
      amount: 28000,
      status: "completed"
    },
    {
      id: "TXN-005",
      client: "Digital Innovations",
      service: "Security Assessment",
      date: "2026-04-20",
      amount: 45000,
      status: "completed"
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Earnings</h1>
            <p className="text-muted-foreground mt-1">Track your revenue and payment history</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-400 to-blue-600 text-white font-medium rounded-lg hover:shadow-lg transition-shadow">
            <Download className="h-5 w-5" />
            Export Report
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-card rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="w-12 h-12 bg-cyan-500/15 rounded-lg flex items-center justify-center">
                  <Icon className="h-6 w-6 text-cyan-500" />
                </div>
                {stat.change && (
                  <div className={`flex items-center gap-1 text-sm font-medium ${
                    stat.trend === "up" ? "text-green-400" : stat.trend === "down" ? "text-red-600" : "text-muted-foreground"
                  }`}>
                    {stat.trend === "up" ? <TrendingUp className="h-4 w-4" /> : stat.trend === "down" ? <TrendingDown className="h-4 w-4" /> : null}
                    {stat.change}
                  </div>
                )}
              </div>
              <div className="text-sm text-muted-foreground mb-1">{stat.label}</div>
              <div className="text-3xl font-bold text-foreground">
                ₹{stat.value.toLocaleString('en-IN')}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        {/* Earnings Trend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="lg:col-span-2 bg-card rounded-2xl p-6 shadow-sm"
        >
          <h3 className="text-lg font-semibold text-foreground mb-6">Earnings Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={earningsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip formatter={(value: number) => `₹${value.toLocaleString('en-IN')}`} />
              <Line
                type="monotone"
                dataKey="earnings"
                stroke="#10b981"
                strokeWidth={3}
                dot={{ fill: "#10b981", r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Service Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="bg-card rounded-2xl p-6 shadow-sm"
        >
          <h3 className="text-lg font-semibold text-foreground mb-6">Service Breakdown</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={serviceBreakdown}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ percentage }) => `${percentage}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {serviceBreakdown.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => `₹${value.toLocaleString('en-IN')}`} />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {serviceBreakdown.map((service, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index] }} />
                  <span className="text-muted-foreground">{service.name}</span>
                </div>
                <span className="font-semibold text-foreground">₹{service.value.toLocaleString('en-IN')}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Monthly Bookings Bar Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="bg-card rounded-2xl p-6 shadow-sm mb-8"
      >
        <h3 className="text-lg font-semibold text-foreground mb-6">Monthly Bookings Overview</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={earningsData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip />
            <Bar dataKey="bookings" fill="#6366f1" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Recent Transactions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="bg-card rounded-2xl shadow-sm overflow-hidden"
      >
        <div className="p-6 border-b border-border">
          <h3 className="text-lg font-semibold text-foreground">Recent Transactions</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/20">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Transaction ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Client
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Service
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-card divide-y divide-border">
              {recentTransactions.map((transaction, index) => (
                <tr key={index} className="hover:bg-muted/20 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-foreground">{transaction.id}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full flex items-center justify-center text-white text-xs font-medium">
                        {transaction.client.charAt(0)}
                      </div>
                      <div className="text-sm text-foreground">{transaction.client}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-foreground max-w-xs truncate">{transaction.service}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      {new Date(transaction.date).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric', 
                        year: 'numeric' 
                      })}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-semibold text-foreground">₹{transaction.amount.toLocaleString('en-IN')}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      transaction.status === "completed"
                        ? "bg-green-500/15 text-green-400"
                        : "bg-cyan-500/15 text-cyan-400"
                    }`}>
                      {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
