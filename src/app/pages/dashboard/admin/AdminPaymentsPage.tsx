import { useState, useId } from "react";
import { Search, Filter, Download, DollarSign, TrendingUp, Calendar, CreditCard, Check, AlertCircle } from "lucide-react";
import { motion } from "motion/react";
import { format } from "date-fns";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export function AdminPaymentsPage() {
  const uid = useId();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterPeriod, setFilterPeriod] = useState("all");

  // Mock data
  const payments = [
    {
      id: "PAY1709543210",
      bookingId: "BK1709543210",
      customerName: "Rajesh Kumar",
      serviceName: "Network Security Audit",
      amount: 943,
      date: new Date(2026, 1, 20),
      method: "Credit Card",
      status: "completed",
      transactionId: "TXN123456789",
    },
    {
      id: "PAY1708234567",
      bookingId: "BK1708234567",
      customerName: "Priya Sharma",
      serviceName: "Custom Website Development",
      amount: 3539,
      date: new Date(2026, 1, 18),
      method: "UPI",
      status: "completed",
      transactionId: "TXN123456788",
    },
    {
      id: "PAY1707123456",
      bookingId: "BK1707123456",
      customerName: "Amit Patel",
      serviceName: "Business Strategy Consulting",
      amount: 707,
      date: new Date(2026, 1, 15),
      method: "Net Banking",
      status: "completed",
      transactionId: "TXN123456787",
    },
    {
      id: "PAY1706987654",
      bookingId: "BK1706987654",
      customerName: "Sneha Desai",
      serviceName: "Cybersecurity Training",
      amount: 1061,
      date: new Date(2026, 1, 22),
      method: "Credit Card",
      status: "completed",
      transactionId: "TXN123456786",
    },
    {
      id: "PAY1705876543",
      bookingId: "BK1705876543",
      customerName: "Vikram Singh",
      serviceName: "Data Recovery Service",
      amount: 825,
      date: new Date(2026, 1, 12),
      method: "Digital Wallet",
      status: "refunded",
      transactionId: "TXN123456785",
    },
    {
      id: "PAY1704765432",
      bookingId: "BK1704765432",
      customerName: "Anjali Mehta",
      serviceName: "Mobile App Development",
      amount: 5899,
      date: new Date(2026, 1, 25),
      method: "Credit Card",
      status: "pending",
      transactionId: "TXN123456784",
    },
  ];

  const revenueData = [
    { month: "Sep", revenue: 12500 },
    { month: "Oct", revenue: 15800 },
    { month: "Nov", revenue: 18200 },
    { month: "Dec", revenue: 22400 },
    { month: "Jan", revenue: 25600 },
    { month: "Feb", revenue: 28900 },
  ];

  const filteredPayments = payments.filter((payment) => {
    const matchesSearch =
      searchQuery === "" ||
      payment.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.bookingId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === "all" || payment.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    totalRevenue: payments
      .filter((p) => p.status === "completed")
      .reduce((sum, p) => sum + p.amount, 0),
    thisMonth: payments
      .filter(
        (p) =>
          p.status === "completed" &&
          p.date.getMonth() === new Date().getMonth() &&
          p.date.getFullYear() === new Date().getFullYear()
      )
      .reduce((sum, p) => sum + p.amount, 0),
    totalTransactions: payments.length,
    pending: payments.filter((p) => p.status === "pending").length,
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "refunded":
        return "bg-red-100 text-red-700";
      case "failed":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <Check className="h-4 w-4" />;
      case "pending":
        return <AlertCircle className="h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Payments & Revenue</h1>
          <p className="text-gray-600 mt-1">Track all transactions and revenue analytics</p>
        </div>
        <button className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
          <Download className="h-5 w-5" />
          Export Report
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg"
        >
          <div className="flex items-center justify-between mb-4">
            <DollarSign className="h-8 w-8 opacity-80" />
            <TrendingUp className="h-5 w-5 opacity-80" />
          </div>
          <div className="text-3xl font-bold mb-1">
            ₹{stats.totalRevenue.toLocaleString("en-IN")}
          </div>
          <div className="text-blue-100">Total Revenue</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl p-6 shadow-lg"
        >
          <div className="flex items-center justify-between mb-4">
            <Calendar className="h-8 w-8 text-green-600" />
            <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">This Month</div>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">
            ₹{stats.thisMonth.toLocaleString("en-IN")}
          </div>
          <div className="text-gray-600">Monthly Revenue</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl p-6 shadow-lg"
        >
          <div className="flex items-center justify-between mb-4">
            <CreditCard className="h-8 w-8 text-purple-600" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">{stats.totalTransactions}</div>
          <div className="text-gray-600">Total Transactions</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl p-6 shadow-lg"
        >
          <div className="flex items-center justify-between mb-4">
            <AlertCircle className="h-8 w-8 text-yellow-600" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">{stats.pending}</div>
          <div className="text-gray-600">Pending Payments</div>
        </motion.div>
      </div>

      {/* Revenue Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-2xl p-6 shadow-lg mb-8"
      >
        <h3 className="text-xl font-bold text-gray-900 mb-6">Revenue Trend</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id={`${uid}-revenue`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid key="grid" strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis key="xaxis" dataKey="month" stroke="#6B7280" />
              <YAxis key="yaxis" stroke="#6B7280" />
              <Tooltip
                key="tooltip"
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #E5E7EB",
                  borderRadius: "8px",
                }}
              />
              <Area
                key="area-revenue"
                type="monotone"
                dataKey="revenue"
                stroke="#3B82F6"
                strokeWidth={2}
                fillOpacity={1}
                fill={`url(#${uid}-revenue)`}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-4 shadow-md mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by customer, payment ID, or booking ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-gray-600" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            >
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="refunded">Refunded</option>
              <option value="failed">Failed</option>
            </select>
            <select
              value={filterPeriod}
              onChange={(e) => setFilterPeriod(e.target.value)}
              className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
            </select>
          </div>
        </div>
      </div>

      {/* Payments Table */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Payment ID
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Customer
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Service
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Amount
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Method
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Date
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Status
                </th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredPayments.map((payment, index) => (
                <motion.tr
                  key={payment.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-mono text-sm text-gray-900">{payment.id}</div>
                      <div className="text-xs text-gray-500">Booking: {payment.bookingId}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{payment.customerName}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-gray-900">{payment.serviceName}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-lg font-bold text-gray-900">₹{payment.amount}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4 text-gray-600" />
                      <span className="text-gray-900">{payment.method}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-gray-900">{format(payment.date, "MMM d, yyyy")}</div>
                    <div className="text-xs text-gray-500">{format(payment.date, "h:mm a")}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                        payment.status
                      )}`}
                    >
                      {getStatusIcon(payment.status)}
                      {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end">
                      <button className="px-3 py-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors text-sm font-medium">
                        View Receipt
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
