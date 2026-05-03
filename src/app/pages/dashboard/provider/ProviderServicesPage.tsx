import { useState } from "react";
import { Plus, Search, Edit, Trash2, Eye, ToggleLeft, ToggleRight } from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";

export function ProviderServicesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [services, setServices] = useState([
    {
      id: 1,
      name: "Network Security Audit",
      category: "Security",
      price: "₹28,000",
      duration: "2-3 days",
      bookings: 45,
      rating: 4.9,
      active: true
    },
    {
      id: 2,
      name: "Custom Website Development",
      category: "Development",
      price: "₹85,000",
      duration: "3-5 weeks",
      bookings: 32,
      rating: 4.8,
      active: true
    },
    {
      id: 3,
      name: "Business Consulting Session",
      category: "Consulting",
      price: "₹18,000",
      duration: "3 hours",
      bookings: 28,
      rating: 4.9,
      active: true
    },
    {
      id: 4,
      name: "Cybersecurity Training",
      category: "Training",
      price: "₹28,000",
      duration: "Full day",
      bookings: 18,
      rating: 5.0,
      active: false
    },
  ]);

  const toggleServiceStatus = (id: number) => {
    setServices(services.map(service => 
      service.id === id ? { ...service, active: !service.active } : service
    ));
    toast.success("Service status updated");
  };

  const filteredServices = services.filter(service =>
    service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-3xl font-bold text-gray-900">My Services</h1>
          <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-lg hover:shadow-lg transition-shadow">
            <Plus className="h-5 w-5" />
            Add Service
          </button>
        </div>
        <p className="text-gray-600">Manage your service offerings</p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <select className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option value="">All Categories</option>
            <option value="security">Security</option>
            <option value="development">Development</option>
            <option value="consulting">Consulting</option>
            <option value="training">Training</option>
          </select>
          
          <select className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid gap-6">
        {filteredServices.map((service, index) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex flex-col lg:flex-row lg:items-center gap-6">
              {/* Service Info */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">
                      {service.name}
                    </h3>
                    <div className="flex items-center gap-3 text-sm">
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full font-medium">
                        {service.category}
                      </span>
                      <span className="text-gray-600">{service.duration}</span>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => toggleServiceStatus(service.id)}
                    className="flex items-center gap-2"
                  >
                    {service.active ? (
                      <ToggleRight className="h-8 w-8 text-green-600" />
                    ) : (
                      <ToggleLeft className="h-8 w-8 text-gray-400" />
                    )}
                  </button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Price</div>
                    <div className="text-lg font-semibold text-gray-900">{service.price}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Bookings</div>
                    <div className="text-lg font-semibold text-gray-900">{service.bookings}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Rating</div>
                    <div className="flex items-center gap-1">
                      <span className="text-lg font-semibold text-gray-900">{service.rating}</span>
                      <span className="text-yellow-500">★</span>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Status</div>
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                      service.active 
                        ? "bg-green-100 text-green-700" 
                        : "bg-gray-100 text-gray-700"
                    }`}>
                      {service.active ? "Active" : "Inactive"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex lg:flex-col gap-2">
                <button className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <Eye className="h-4 w-4" />
                  <span className="text-sm font-medium">View</span>
                </button>
                <button className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-4 py-2 border border-blue-300 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
                  <Edit className="h-4 w-4" />
                  <span className="text-sm font-medium">Edit</span>
                </button>
                <button className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors">
                  <Trash2 className="h-4 w-4" />
                  <span className="text-sm font-medium">Delete</span>
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredServices.length === 0 && (
        <div className="bg-white rounded-2xl p-12 shadow-sm text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No services found</h3>
          <p className="text-gray-600">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
}
