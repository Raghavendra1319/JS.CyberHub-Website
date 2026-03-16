import { useState } from "react";
import { Search, Filter, Shield, UserCheck, UserX, Mail, Phone, Calendar, MoreVertical } from "lucide-react";
import { motion } from "motion/react";
import { format } from "date-fns";
import { toast } from "sonner";

export function AdminUsersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  // Mock data
  const users = [
    {
      id: "USR001",
      name: "Rajesh Kumar",
      email: "rajesh@example.com",
      phone: "+91 9876543210",
      role: "user",
      status: "active",
      joinedDate: new Date(2025, 10, 15),
      totalBookings: 5,
      totalSpent: 4500,
      lastActive: new Date(2026, 2, 10),
    },
    {
      id: "USR002",
      name: "Priya Sharma",
      email: "priya@example.com",
      phone: "+91 9876543211",
      role: "user",
      status: "active",
      joinedDate: new Date(2025, 11, 20),
      totalBookings: 3,
      totalSpent: 2800,
      lastActive: new Date(2026, 2, 12),
    },
    {
      id: "PRV001",
      name: "Amit Patel",
      email: "amit@example.com",
      phone: "+91 9876543212",
      role: "provider",
      status: "active",
      joinedDate: new Date(2025, 9, 10),
      totalServices: 8,
      totalEarnings: 15000,
      lastActive: new Date(2026, 2, 13),
    },
    {
      id: "USR003",
      name: "Sneha Desai",
      email: "sneha@example.com",
      phone: "+91 9876543213",
      role: "user",
      status: "inactive",
      joinedDate: new Date(2025, 8, 5),
      totalBookings: 1,
      totalSpent: 500,
      lastActive: new Date(2026, 1, 20),
    },
    {
      id: "PRV002",
      name: "Vikram Singh",
      email: "vikram@example.com",
      phone: "+91 9876543214",
      role: "provider",
      status: "active",
      joinedDate: new Date(2025, 10, 1),
      totalServices: 12,
      totalEarnings: 25000,
      lastActive: new Date(2026, 2, 14),
    },
    {
      id: "USR004",
      name: "Anjali Mehta",
      email: "anjali@example.com",
      phone: "+91 9876543215",
      role: "user",
      status: "active",
      joinedDate: new Date(2026, 0, 10),
      totalBookings: 7,
      totalSpent: 6200,
      lastActive: new Date(2026, 2, 11),
    },
  ];

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      searchQuery === "" ||
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = filterRole === "all" || user.role === filterRole;
    const matchesStatus = filterStatus === "all" || user.status === filterStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const stats = {
    total: users.length,
    users: users.filter((u) => u.role === "user").length,
    providers: users.filter((u) => u.role === "provider").length,
    active: users.filter((u) => u.status === "active").length,
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "user":
        return "bg-blue-100 text-blue-700";
      case "provider":
        return "bg-purple-100 text-purple-700";
      case "admin":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const handleStatusToggle = (userId: string, currentStatus: string) => {
    const newStatus = currentStatus === "active" ? "inactive" : "active";
    toast.success(`User ${userId} status changed to ${newStatus}`);
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Users Management</h1>
        <p className="text-gray-600 mt-1">Monitor and manage all platform users</p>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-6 shadow-lg"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <UserCheck className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">{stats.total}</div>
          <div className="text-gray-600">Total Users</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl p-6 shadow-lg"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <UserCheck className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">{stats.users}</div>
          <div className="text-gray-600">Customers</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl p-6 shadow-lg"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <Shield className="h-6 w-6 text-purple-600" />
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">{stats.providers}</div>
          <div className="text-gray-600">Providers</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl p-6 shadow-lg"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
              <UserCheck className="h-6 w-6 text-indigo-600" />
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">{stats.active}</div>
          <div className="text-gray-600">Active Users</div>
        </motion.div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-4 shadow-md mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, email, or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-gray-600" />
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            >
              <option value="all">All Roles</option>
              <option value="user">Users</option>
              <option value="provider">Providers</option>
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  User
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Contact
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Role
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Activity
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Joined
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
              {filteredUsers.map((user, index) => (
                <motion.tr
                  key={user.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Mail className="h-4 w-4" />
                        {user.email}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Phone className="h-4 w-4" />
                        {user.phone}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium capitalize ${getRoleBadgeColor(
                        user.role
                      )}`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {user.role === "user" ? (
                      <div className="text-sm">
                        <div className="text-gray-900">
                          {user.totalBookings} bookings
                        </div>
                        <div className="text-gray-500">
                          ₹{user.totalSpent.toLocaleString("en-IN")} spent
                        </div>
                      </div>
                    ) : (
                      <div className="text-sm">
                        <div className="text-gray-900">
                          {user.totalServices} services
                        </div>
                        <div className="text-gray-500">
                          ₹{user.totalEarnings?.toLocaleString("en-IN")} earned
                        </div>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="h-4 w-4" />
                      {format(user.joinedDate, "MMM d, yyyy")}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleStatusToggle(user.id, user.status)}
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                        user.status === "active"
                          ? "bg-green-100 text-green-700 hover:bg-green-200"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {user.status === "active" ? <UserCheck className="h-3 w-3" /> : <UserX className="h-3 w-3" />}
                      {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end">
                      <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                        <MoreVertical className="h-5 w-5" />
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
