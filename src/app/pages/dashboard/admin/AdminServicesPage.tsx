import { useState } from "react";
import { Plus, Search, Edit2, Trash2, Eye, TrendingUp, DollarSign, Calendar } from "lucide-react";
import { motion } from "motion/react";
import { services } from "../../../data/services";
import { toast } from "sonner";

export function AdminServicesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");

  const filteredServices = services.filter((service) => {
    const matchesSearch =
      searchQuery === "" ||
      service.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      filterCategory === "all" || service.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const stats = {
    total: services.length,
    active: services.length,
    revenue: services.reduce((sum, s) => sum + s.price, 0),
  };

  const handleDelete = (serviceId: string) => {
    if (confirm("Are you sure you want to delete this service?")) {
      toast.success("Service deleted successfully!");
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Services Management</h1>
          <p className="text-muted-foreground mt-1">Manage and monitor all platform services</p>
        </div>
        <button className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-400 to-blue-600 text-white font-medium rounded-lg hover:shadow-lg transition-shadow">
          <Plus className="h-5 w-5" />
          Add New Service
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-2xl p-6 shadow-lg"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-cyan-500/15 rounded-xl flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-cyan-500" />
            </div>
          </div>
          <div className="text-3xl font-bold text-foreground mb-1">{stats.total}</div>
          <div className="text-muted-foreground">Total Services</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card rounded-2xl p-6 shadow-lg"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-500/15 rounded-xl flex items-center justify-center">
              <Calendar className="h-6 w-6 text-green-400" />
            </div>
          </div>
          <div className="text-3xl font-bold text-foreground mb-1">{stats.active}</div>
          <div className="text-muted-foreground">Active Services</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card rounded-2xl p-6 shadow-lg"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-orange-500/15 rounded-xl flex items-center justify-center">
              <DollarSign className="h-6 w-6 text-orange-400" />
            </div>
          </div>
          <div className="text-3xl font-bold text-foreground mb-1">
            ₹{stats.revenue.toLocaleString("en-IN")}
          </div>
          <div className="text-muted-foreground">Total Value</div>
        </motion.div>
      </div>

      {/* Filters */}
      <div className="bg-card rounded-xl p-4 shadow-md mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground/70" />
            <input
              type="text"
              placeholder="Search services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 border border-border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none"
            />
          </div>

          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-2.5 border border-border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none"
          >
            <option value="all">All Categories</option>
            <option value="security">Security</option>
            <option value="development">Development</option>
            <option value="consulting">Consulting</option>
            <option value="training">Training</option>
          </select>
        </div>
      </div>

      {/* Services Table */}
      <div className="bg-card rounded-2xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/20 border-b border-border">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                  Service
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                  Category
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                  Price
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                  Duration
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                  Status
                </th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredServices.map((service, index) => (
                <motion.tr
                  key={service.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-muted/20 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={service.image}
                        alt={service.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div>
                        <div className="font-semibold text-foreground">{service.name}</div>
                        <div className="text-sm text-muted-foreground line-clamp-1">
                          {service.shortDescription}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-cyan-500/15 text-cyan-400 capitalize">
                      {service.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-semibold text-foreground">₹{service.price}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-muted-foreground">{service.duration}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-500/15 text-green-400">
                      Active
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        className="p-2 text-cyan-500 hover:bg-card rounded-lg transition-colors"
                        title="View details"
                      >
                        <Eye className="h-5 w-5" />
                      </button>
                      <button
                        className="p-2 text-muted-foreground hover:bg-muted/40 rounded-lg transition-colors"
                        title="Edit service"
                      >
                        <Edit2 className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(service.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete service"
                      >
                        <Trash2 className="h-5 w-5" />
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
