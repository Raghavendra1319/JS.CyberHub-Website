import { useState } from "react";
import { Search, Filter, Calendar, Clock, MapPin, Phone, Mail } from "lucide-react";
import { motion } from "motion/react";

export function ProviderBookingsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const bookings = [
    {
      id: "BK-001",
      client: "TechCorp Inc.",
      clientEmail: "contact@techcorp.com",
      clientPhone: "+1 555-0123",
      service: "Network Security Audit",
      date: "2026-03-04",
      time: "2:00 PM",
      location: "Client Office",
      amount: "$799",
      status: "confirmed",
      payment: "paid"
    },
    {
      id: "BK-002",
      client: "StartupXYZ",
      clientEmail: "hello@startupxyz.com",
      clientPhone: "+1 555-0124",
      service: "Custom Website Development",
      date: "2026-03-05",
      time: "10:00 AM",
      location: "Remote",
      amount: "$2,999",
      status: "confirmed",
      payment: "paid"
    },
    {
      id: "BK-003",
      client: "SmallBiz Co",
      clientEmail: "info@smallbiz.com",
      clientPhone: "+1 555-0125",
      service: "Business Consulting Session",
      date: "2026-03-06",
      time: "3:00 PM",
      location: "Online Meeting",
      amount: "$599",
      status: "pending",
      payment: "pending"
    },
    {
      id: "BK-004",
      client: "Enterprise LLC",
      clientEmail: "support@enterprise.com",
      clientPhone: "+1 555-0126",
      service: "Cybersecurity Training",
      date: "2026-03-02",
      time: "9:00 AM",
      location: "Training Center",
      amount: "$899",
      status: "completed",
      payment: "paid"
    },
    {
      id: "BK-005",
      client: "Digital Co",
      clientEmail: "contact@digital.com",
      clientPhone: "+1 555-0127",
      service: "Security Assessment",
      date: "2026-03-08",
      time: "1:00 PM",
      location: "Client Office",
      amount: "$1,299",
      status: "cancelled",
      payment: "refunded"
    },
  ];

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = booking.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || booking.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    const styles = {
      confirmed: "bg-cyan-500/15 text-cyan-400",
      pending: "bg-cyan-500/15 text-cyan-400",
      completed: "bg-green-500/15 text-green-400",
      cancelled: "bg-red-500/15 text-red-400"
    };
    
    return styles[status as keyof typeof styles] || styles.pending;
  };

  const getPaymentBadge = (payment: string) => {
    const styles = {
      paid: "bg-green-500/15 text-green-400",
      pending: "bg-cyan-500/15 text-cyan-400",
      refunded: "bg-muted/40 text-foreground/80"
    };
    
    return styles[payment as keyof typeof styles] || styles.pending;
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Bookings</h1>
        <p className="text-muted-foreground mt-1">Manage and track all your service bookings</p>
      </div>

      {/* Search and Filters */}
      <div className="bg-card rounded-2xl p-6 shadow-sm mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground/70" />
            <input
              type="text"
              placeholder="Search by client, service, or booking ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            />
          </div>
          
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="confirmed">Confirmed</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total", count: bookings.length, color: "blue" },
          { label: "Confirmed", count: bookings.filter(b => b.status === "confirmed").length, color: "green" },
          { label: "Pending", count: bookings.filter(b => b.status === "pending").length, color: "yellow" },
          { label: "Completed", count: bookings.filter(b => b.status === "completed").length, color: "purple" }
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-card rounded-xl p-4 shadow-sm"
          >
            <div className="text-2xl font-bold text-foreground mb-1">{stat.count}</div>
            <div className="text-sm text-muted-foreground">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Bookings List */}
      <div className="space-y-4">
        {filteredBookings.map((booking, index) => (
          <motion.div
            key={booking.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-card rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex flex-col lg:flex-row lg:items-start gap-6">
              {/* Left: Client Info */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full flex items-center justify-center text-white font-medium text-lg">
                        {booking.client.charAt(0)}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">{booking.client}</h3>
                        <p className="text-sm text-muted-foreground">ID: {booking.id}</p>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-3">
                      <div className="flex items-center gap-1">
                        <Mail className="h-4 w-4" />
                        {booking.clientEmail}
                      </div>
                      <div className="flex items-center gap-1">
                        <Phone className="h-4 w-4" />
                        {booking.clientPhone}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(booking.status)}`}>
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPaymentBadge(booking.payment)}`}>
                      {booking.payment.charAt(0).toUpperCase() + booking.payment.slice(1)}
                    </span>
                  </div>
                </div>

                <div className="p-4 bg-muted/20 rounded-lg">
                  <div className="font-medium text-foreground mb-3">{booking.service}</div>
                  
                  <div className="grid md:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      {new Date(booking.date).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric', 
                        year: 'numeric' 
                      })}
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      {booking.time}
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      {booking.location}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Amount and Actions */}
              <div className="flex flex-col items-end gap-4">
                <div className="text-right">
                  <div className="text-sm text-muted-foreground mb-1">Total Amount</div>
                  <div className="text-2xl font-bold text-foreground">{booking.amount}</div>
                </div>
                
                <div className="flex gap-2">
                  {booking.status === "pending" && (
                    <>
                      <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium">
                        Accept
                      </button>
                      <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium">
                        Decline
                      </button>
                    </>
                  )}
                  {booking.status === "confirmed" && (
                    <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-cyan-600 transition-colors text-sm font-medium">
                      Start Service
                    </button>
                  )}
                  <button className="px-4 py-2 border border-border rounded-lg hover:bg-muted/20 transition-colors text-sm font-medium">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredBookings.length === 0 && (
        <div className="bg-card rounded-2xl p-12 shadow-sm text-center">
          <div className="w-16 h-16 bg-muted/40 rounded-full flex items-center justify-center mx-auto mb-4">
            <Calendar className="h-8 w-8 text-muted-foreground/70" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">No bookings found</h3>
          <p className="text-muted-foreground">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
}
