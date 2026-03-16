import { useState } from "react";
import { Search, Filter, Calendar, Clock, User, DollarSign, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { motion } from "motion/react";
import { format } from "date-fns";
import { toast } from "sonner";

export function AdminBookingsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  // Mock data
  const bookings = [
    {
      id: "BK1709543210",
      customerName: "Rajesh Kumar",
      customerEmail: "rajesh@example.com",
      serviceName: "Network Security Audit",
      date: new Date(2026, 2, 15),
      time: "10:00 AM",
      status: "confirmed",
      amount: 943,
      paymentStatus: "completed",
    },
    {
      id: "BK1708234567",
      customerName: "Priya Sharma",
      customerEmail: "priya@example.com",
      serviceName: "Custom Website Development",
      date: new Date(2026, 2, 18),
      time: "02:00 PM",
      status: "pending",
      amount: 3539,
      paymentStatus: "pending",
    },
    {
      id: "BK1707123456",
      customerName: "Amit Patel",
      customerEmail: "amit@example.com",
      serviceName: "Business Strategy Consulting",
      date: new Date(2026, 2, 20),
      time: "11:00 AM",
      status: "confirmed",
      amount: 707,
      paymentStatus: "completed",
    },
    {
      id: "BK1706987654",
      customerName: "Sneha Desai",
      customerEmail: "sneha@example.com",
      serviceName: "Cybersecurity Training",
      date: new Date(2026, 2, 22),
      time: "09:00 AM",
      status: "completed",
      amount: 1061,
      paymentStatus: "completed",
    },
    {
      id: "BK1705876543",
      customerName: "Vikram Singh",
      customerEmail: "vikram@example.com",
      serviceName: "Data Recovery Service",
      date: new Date(2026, 2, 12),
      time: "03:00 PM",
      status: "cancelled",
      amount: 825,
      paymentStatus: "refunded",
    },
  ];

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      searchQuery === "" ||
      booking.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.serviceName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === "all" || booking.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: bookings.length,
    confirmed: bookings.filter((b) => b.status === "confirmed").length,
    pending: bookings.filter((b) => b.status === "pending").length,
    completed: bookings.filter((b) => b.status === "completed").length,
    revenue: bookings
      .filter((b) => b.paymentStatus === "completed")
      .reduce((sum, b) => sum + b.amount, 0),
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-blue-100 text-blue-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "completed":
        return "bg-green-100 text-green-700";
      case "cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmed":
        return <CheckCircle className="h-4 w-4" />;
      case "pending":
        return <AlertCircle className="h-4 w-4" />;
      case "completed":
        return <CheckCircle className="h-4 w-4" />;
      case "cancelled":
        return <XCircle className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const handleStatusChange = (bookingId: string, newStatus: string) => {
    toast.success(`Booking ${bookingId} status updated to ${newStatus}`);
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Bookings Management</h1>
        <p className="text-gray-600 mt-1">Monitor and manage all platform bookings</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl p-4 shadow-md"
        >
          <div className="text-2xl font-bold text-gray-900 mb-1">{stats.total}</div>
          <div className="text-sm text-gray-600">Total</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl p-4 shadow-md"
        >
          <div className="text-2xl font-bold text-blue-600 mb-1">{stats.confirmed}</div>
          <div className="text-sm text-gray-600">Confirmed</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl p-4 shadow-md"
        >
          <div className="text-2xl font-bold text-yellow-600 mb-1">{stats.pending}</div>
          <div className="text-sm text-gray-600">Pending</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl p-4 shadow-md"
        >
          <div className="text-2xl font-bold text-green-600 mb-1">{stats.completed}</div>
          <div className="text-sm text-gray-600">Completed</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl p-4 shadow-md"
        >
          <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-1">
            ₹{stats.revenue.toLocaleString("en-IN")}
          </div>
          <div className="text-sm text-gray-600">Revenue</div>
        </motion.div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-4 shadow-md mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by customer name, booking ID, or service..."
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
              <option value="confirmed">Confirmed</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Booking ID
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Customer
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Service
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Date & Time
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Amount
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
              {filteredBookings.map((booking, index) => (
                <motion.tr
                  key={booking.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <span className="font-mono text-sm text-gray-900">{booking.id}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
                        {booking.customerName.charAt(0)}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">{booking.customerName}</div>
                        <div className="text-sm text-gray-500">{booking.customerEmail}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-gray-900">{booking.serviceName}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3 text-gray-600">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {format(booking.date, "MMM d, yyyy")}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {booking.time}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-semibold text-gray-900">₹{booking.amount}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                        booking.status
                      )}`}
                    >
                      {getStatusIcon(booking.status)}
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <select
                        value={booking.status}
                        onChange={(e) => handleStatusChange(booking.id, e.target.value)}
                        className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
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
