import { Link } from "react-router";
import { Calendar, Clock, MapPin, ExternalLink, Plus, AlertCircle } from "lucide-react";
import { motion } from "motion/react";
import { format } from "date-fns";

export function UserBookingsPage() {
  // Mock data
  const upcomingBookings = [
    {
      id: "1",
      serviceName: "Network Security Audit",
      date: new Date(2026, 1, 20),
      time: "10:00 AM",
      status: "confirmed",
      price: 28000,
      location: "Remote"
    },
    {
      id: "2",
      serviceName: "Custom Website Development",
      date: new Date(2026, 1, 25),
      time: "02:00 PM",
      status: "pending",
      price: 85000,
      location: "On-site"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-500/15 text-green-400";
      case "pending":
        return "bg-cyan-500/15 text-cyan-400";
      case "cancelled":
        return "bg-red-500/15 text-red-400";
      default:
        return "bg-muted/40 text-foreground/80";
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">My Bookings</h1>
          <p className="text-muted-foreground mt-1">Manage your upcoming appointments</p>
        </div>
        <Link
          to="/services"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-400 to-blue-600 text-white font-medium rounded-lg hover:shadow-lg transition-shadow"
        >
          <Plus className="h-5 w-5" />
          Book Service
        </Link>
      </div>

      {upcomingBookings.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-2xl p-12 text-center"
        >
          <div className="w-16 h-16 bg-muted/40 rounded-full flex items-center justify-center mx-auto mb-4">
            <Calendar className="h-8 w-8 text-muted-foreground/70" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            No Upcoming Bookings
          </h3>
          <p className="text-muted-foreground mb-6">
            You don't have any bookings scheduled. Browse our services to get started.
          </p>
          <Link
            to="/services"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-cyan-600 transition-colors"
          >
            Browse Services
            <ExternalLink className="h-4 w-4" />
          </Link>
        </motion.div>
      ) : (
        <div className="space-y-4">
          {upcomingBookings.map((booking, index) => (
            <motion.div
              key={booking.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-card rounded-2xl p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-2">
                        {booking.serviceName}
                      </h3>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          {format(booking.date, "EEEE, MMMM d, yyyy")}
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          {booking.time}
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          {booking.location}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-foreground mb-1">
                        ₹{booking.price.toLocaleString('en-IN')}
                      </div>
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(booking.status)}`}>
                        {booking.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {booking.status === "pending" && (
                <div className="flex items-start gap-3 p-4 bg-yellow-50 rounded-lg mb-4">
                  <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-cyan-300">
                    <strong>Payment Pending:</strong> Please complete payment to confirm your booking.
                  </div>
                </div>
              )}

              <div className="flex gap-3 pt-4 border-t border-border">
                <button className="flex-1 px-4 py-2 bg-primary text-white font-medium rounded-lg hover:bg-cyan-600 transition-colors">
                  View Details
                </button>
                <button className="flex-1 px-4 py-2 bg-muted/40 text-foreground/80 font-medium rounded-lg hover:bg-muted transition-colors">
                  Reschedule
                </button>
                <button className="px-4 py-2 bg-red-50 text-red-600 font-medium rounded-lg hover:bg-red-500/15 transition-colors">
                  Cancel
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
