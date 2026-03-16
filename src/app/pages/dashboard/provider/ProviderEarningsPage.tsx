import { DollarSign, TrendingUp, Download, Calendar } from "lucide-react";
import { motion } from "motion/react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export function ProviderEarningsPage() {
  const stats = [
    { label: "Total Earnings", value: "$12,450", change: "+15.3%", trend: "up" },
    { label: "This Month", value: "$4,200", change: "+8.2%", trend: "up" },
    { label: "Pending", value: "$850", change: "-", trend: "neutral" },
    { label: "Avg per Booking", value: "$723", change: "+5.1%", trend: "up" }
  ];

  const earningsData = [
    { month: "Jan", earnings: 2400, bookings: 8 },
    { month: "Feb", earnings: 1800, bookings: 6 },
    { month: "Mar", earnings: 3200, bookings: 10 },
    { month: "Apr", earnings: 2800, bookings: 9 },
    { month: "May", earnings: 3800, bookings: 12 },
    { month: "Jun", earnings: 4200, bookings: 14 },
  ];

  const recentTransactions = [
    {
      id: "TXN-001",
      client: "TechCorp Inc.",
      service: "Network Security Audit",
      date: "2026-03-02",
      amount: "$799",
      status: "completed"
    },
    {
      id: "TXN-002",
      client: "StartupXYZ",
      service: "Website Development",
      date: "2026-03-01",
      amount: "$2,999",
      status: "completed"
    },
    {
      id: "TXN-003",
      client: "SmallBiz Co",
      service: "Business Consulting",
      date: "2026-02-28",
      amount: "$599",
      status: "pending"
    },
    {
      id: "TXN-004",
      client: "Enterprise LLC",
      service: "Cybersecurity Training",
      date: "2026-02-25",
      amount: "$899",
      status: "completed"
    },
    {
      id: "TXN-005",
      client: "Digital Co",
      service: "Security Assessment",
      date: "2026-02-20",
      amount: "$1,299",
      status: "completed"
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Earnings</h1>
            <p className="text-gray-600 mt-1">Track your revenue and payment history</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-lg hover:shadow-lg transition-shadow">
            <Download className="h-5 w-5" />
            Export Report
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="bg-white rounded-2xl p-6 shadow-sm"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="text-sm text-gray-600">{stat.label}</div>
              {stat.trend !== "neutral" && (
                <div className={`flex items-center gap-1 text-sm font-medium ${
                  stat.trend === "up" ? "text-green-600" : "text-red-600"
                }`}>
                  <TrendingUp className="h-4 w-4" />
                  {stat.change}
                </div>
              )}
            </div>
            <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        {/* Earnings Trend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white rounded-2xl p-6 shadow-sm"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Earnings Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={earningsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip />
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

        {/* Bookings vs Earnings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="bg-white rounded-2xl p-6 shadow-sm"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Monthly Bookings</h3>
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
      </div>

      {/* Recent Transactions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="bg-white rounded-2xl shadow-sm overflow-hidden"
      >
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Transaction ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Client
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Service
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentTransactions.map((transaction, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{transaction.id}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white text-xs font-medium">
                        {transaction.client.charAt(0)}
                      </div>
                      <div className="text-sm text-gray-900">{transaction.client}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 max-w-xs truncate">{transaction.service}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <Calendar className="h-4 w-4" />
                      {new Date(transaction.date).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric', 
                        year: 'numeric' 
                      })}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-semibold text-gray-900">{transaction.amount}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      transaction.status === "completed"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
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
