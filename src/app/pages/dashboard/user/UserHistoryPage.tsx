import { useState } from "react";
import { Calendar, Clock, Check, X, Search, Filter, Download } from "lucide-react";
import { motion } from "motion/react";
import { format } from "date-fns";

export function UserHistoryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  // Mock data
  const bookingHistory = [
    {
      id: "BK1709543210",
      serviceName: "Malware Security Assessment",
      date: new Date(2025, 11, 15),
      time: "10:00 AM",
      status: "completed",
      price: 499,
      rating: 5,
    },
    {
      id: "BK1708234567",
      serviceName: "Business Strategy Consulting",
      date: new Date(2025, 10, 28),
      time: "02:00 PM",
      status: "completed",
      price: 599,
      rating: 5,
    },
    {
      id: "BK1707123456",
      serviceName: "Cybersecurity Training",
      date: new Date(2025, 10, 10),
      time: "09:00 AM",
      status: "completed",
      price: 899,
      rating: 4,
    },
    {
      id: "BK1706987654",
      serviceName: "Device Protection Setup",
      date: new Date(2025, 9, 22),
      time: "03:00 PM",
      status: "completed",
      price: 399,
      rating: 5,
    },
    {
      id: "BK1705876543",
      serviceName: "Network Security Audit",
      date: new Date(2025, 9, 5),
      time: "11:00 AM",
      status: "cancelled",
      price: 799,
      rating: null,
    },
    {
      id: "BK1704765432",
      serviceName: "Data Recovery Service",
      date: new Date(2025, 8, 18),
      time: "01:00 PM",
      status: "completed",
      price: 699,
      rating: 5,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
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
      case "completed":
        return <Check className="h-4 w-4" />;
      case "cancelled":
        return <X className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const filteredHistory = bookingHistory.filter((booking) => {
    const matchesSearch =
      searchQuery === "" ||
      booking.serviceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === "all" || booking.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: bookingHistory.length,
    completed: bookingHistory.filter((b) => b.status === "completed").length,
    cancelled: bookingHistory.filter((b) => b.status === "cancelled").length,
    totalSpent: bookingHistory
      .filter((b) => b.status === "completed")
      .reduce((sum, b) => sum + b.price, 0),
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Booking History</h1>
        <p className="text-gray-600 mt-1">View all your past bookings and transactions</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-xl p-4 shadow-md"
        >
          <div className="text-sm text-gray-600 mb-1">Total Bookings</div>
          <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="bg-white rounded-xl p-4 shadow-md"
        >
          <div className="text-sm text-gray-600 mb-1">Completed</div>
          <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="bg-white rounded-xl p-4 shadow-md"
        >
          <div className="text-sm text-gray-600 mb-1">Cancelled</div>
          <div className="text-2xl font-bold text-red-600">{stats.cancelled}</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="bg-white rounded-xl p-4 shadow-md"
        >
          <div className="text-sm text-gray-600 mb-1">Total Spent</div>
          <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            ₹{stats.totalSpent.toLocaleString("en-IN")}
          </div>
        </motion.div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl p-4 shadow-md mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by service name or booking ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>

          {/* Filter */}
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-gray-600" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            >
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          {/* Export Button */}
          <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
            <Download className="h-5 w-5" />
            <span className="hidden sm:inline">Export</span>
          </button>
        </div>
      </div>

      {/* History List */}
      <div className="space-y-4">
        {filteredHistory.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center shadow-md">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No bookings found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          filteredHistory.map((booking, index) => (
            <motion.div
              key={booking.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {booking.serviceName}
                      </h3>
                      <p className="text-sm text-gray-500">Booking ID: {booking.id}</p>
                    </div>
                    <span
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                        booking.status
                      )}`}
                    >
                      {getStatusIcon(booking.status)}
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      {format(booking.date, "MMM d, yyyy")}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      {booking.time}
                    </div>
                    <div className="font-semibold text-gray-900">₹{booking.price}</div>
                  </div>

                  {booking.rating && (
                    <div className="flex items-center gap-2 mt-3">
                      <span className="text-sm text-gray-600">Your rating:</span>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`h-4 w-4 ${
                              i < booking.rating! ? "text-yellow-400 fill-current" : "text-gray-300"
                            }`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                            />
                          </svg>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row gap-2">
                  <button className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium">
                    View Details
                  </button>
                  {booking.status === "completed" && (
                    <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium">
                      Book Again
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
