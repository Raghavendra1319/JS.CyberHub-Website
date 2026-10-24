import { useParams, Link } from "react-router";
import { ArrowLeft, Calendar, Clock, MapPin, User, Phone, Mail, IndianRupee, Download, MessageSquare, CheckCircle2, Circle, AlertCircle } from "lucide-react";
import { motion } from "motion/react";
import { format } from "date-fns";

export function BookingTrackingPage() {
  const { id } = useParams();

  // Mock booking data
  const booking = {
    id: "BK1234567890",
    serviceName: "Network Security Audit",
    provider: {
      name: "Rajesh Kumar",
      email: "rajesh.kumar@example.com",
      phone: "+91 98765 43210",
      rating: 4.9,
      avatar: "RK"
    },
    date: new Date(2026, 4, 15),
    time: "10:00 AM - 1:00 PM",
    location: "Remote Session",
    price: 28000,
    status: "in-progress",
    paymentStatus: "paid",
    paymentMethod: "UPI",
    transactionId: "TXN98765432"
  };

  const timeline = [
    {
      status: "booking-created",
      label: "Booking Created",
      description: "Your booking request was submitted",
      timestamp: new Date(2026, 4, 1, 10, 30),
      completed: true
    },
    {
      status: "payment-received",
      label: "Payment Received",
      description: "Payment of ₹28,000 received via UPI",
      timestamp: new Date(2026, 4, 1, 10, 35),
      completed: true
    },
    {
      status: "confirmed",
      label: "Booking Confirmed",
      description: "Provider confirmed your appointment",
      timestamp: new Date(2026, 4, 2, 9, 15),
      completed: true
    },
    {
      status: "in-progress",
      label: "Service In Progress",
      description: "Provider is currently working on your service",
      timestamp: new Date(2026, 4, 15, 10, 0),
      completed: true,
      active: true
    },
    {
      status: "completed",
      label: "Service Completed",
      description: "Service will be marked as completed",
      timestamp: null,
      completed: false
    },
    {
      status: "review",
      label: "Review & Feedback",
      description: "Share your experience",
      timestamp: null,
      completed: false
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "in-progress":
        return "bg-cyan-500/10 text-cyan-400 border-border";
      case "completed":
        return "bg-purple-500/20 text-purple-400 border-purple-500/30";
      case "cancelled":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      default:
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <Link
        to="/dashboard"
        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Bookings
      </Link>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Booking Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card rounded-2xl p-6 shadow-lg"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold text-foreground mb-2">
                  {booking.serviceName}
                </h1>
                <p className="text-muted-foreground">Booking ID: {booking.id}</p>
              </div>
              <span className={`px-4 py-2 rounded-lg text-sm font-bold border capitalize ${getStatusColor(booking.status)}`}>
                {booking.status.replace('-', ' ')}
              </span>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mt-6">
              <div className="flex items-center gap-3 p-4 bg-muted/20 rounded-lg">
                <Calendar className="h-5 w-5 text-cyan-500" />
                <div>
                  <div className="text-xs text-muted-foreground">Date</div>
                  <div className="font-semibold text-foreground">
                    {format(booking.date, "EEEE, MMMM d, yyyy")}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-muted/20 rounded-lg">
                <Clock className="h-5 w-5 text-cyan-500" />
                <div>
                  <div className="text-xs text-muted-foreground">Time</div>
                  <div className="font-semibold text-foreground">{booking.time}</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-muted/20 rounded-lg">
                <MapPin className="h-5 w-5 text-cyan-500" />
                <div>
                  <div className="text-xs text-muted-foreground">Location</div>
                  <div className="font-semibold text-foreground">{booking.location}</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-muted/20 rounded-lg">
                <IndianRupee className="h-5 w-5 text-cyan-500" />
                <div>
                  <div className="text-xs text-muted-foreground">Amount Paid</div>
                  <div className="font-semibold text-foreground">
                    ₹{booking.price.toLocaleString('en-IN')}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-card rounded-2xl p-6 shadow-lg"
          >
            <h2 className="text-xl font-bold text-foreground mb-6">Booking Timeline</h2>

            <div className="space-y-6">
              {timeline.map((item, index) => (
                <div key={index} className="relative flex gap-4">
                  {/* Timeline Line */}
                  {index < timeline.length - 1 && (
                    <div className={`absolute left-[15px] top-8 bottom-0 w-0.5 ${
                      item.completed ? "bg-blue-200" : "bg-muted"
                    }`} />
                  )}

                  {/* Icon */}
                  <div className={`relative z-10 flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                    item.active
                      ? "bg-primary ring-4 ring-blue-100"
                      : item.completed
                      ? "bg-primary"
                      : "bg-muted"
                  }`}>
                    {item.completed ? (
                      <CheckCircle2 className="h-4 w-4 text-white" />
                    ) : (
                      <Circle className="h-4 w-4 text-muted-foreground/70" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 pb-6">
                    <div className="flex items-start justify-between mb-1">
                      <h3 className={`font-semibold ${
                        item.completed ? "text-foreground" : "text-muted-foreground/70"
                      }`}>
                        {item.label}
                      </h3>
                      {item.timestamp && (
                        <span className="text-xs text-muted-foreground">
                          {format(item.timestamp, "MMM d, h:mm a")}
                        </span>
                      )}
                    </div>
                    <p className={`text-sm ${
                      item.completed ? "text-muted-foreground" : "text-muted-foreground/70"
                    }`}>
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Provider Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-card rounded-2xl p-6 shadow-lg"
          >
            <h2 className="text-lg font-bold text-foreground mb-4">Service Provider</h2>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                {booking.provider.avatar}
              </div>
              <div>
                <div className="font-semibold text-foreground">{booking.provider.name}</div>
                <div className="text-sm text-muted-foreground">⭐ {booking.provider.rating} Rating</div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                {booking.provider.email}
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                {booking.provider.phone}
              </div>
            </div>

            <button className="w-full mt-4 px-4 py-2 bg-primary text-white font-medium rounded-lg hover:bg-cyan-600 transition-colors flex items-center justify-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Message Provider
            </button>
          </motion.div>

          {/* Payment Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-card rounded-2xl p-6 shadow-lg"
          >
            <h2 className="text-lg font-bold text-foreground mb-4">Payment Details</h2>

            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Status</span>
                <span className="font-semibold text-green-400 capitalize">{booking.paymentStatus}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Method</span>
                <span className="font-semibold text-foreground">{booking.paymentMethod}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Transaction ID</span>
                <span className="font-semibold text-foreground">{booking.transactionId}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-border">
              <div className="flex justify-between mb-2">
                <span className="font-semibold text-foreground">Total Amount</span>
                <span className="font-bold text-xl text-foreground">
                  ₹{booking.price.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            <button className="w-full mt-4 px-4 py-2 bg-muted/40 text-foreground/80 font-medium rounded-lg hover:bg-muted transition-colors flex items-center justify-center gap-2">
              <Download className="h-4 w-4" />
              Download Invoice
            </button>
          </motion.div>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-card rounded-2xl p-6 shadow-lg"
          >
            <h2 className="text-lg font-bold text-foreground mb-4">Actions</h2>

            <div className="space-y-2">
              <button className="w-full px-4 py-2 bg-muted/40 text-foreground/80 font-medium rounded-lg hover:bg-muted transition-colors">
                Reschedule Booking
              </button>
              <button className="w-full px-4 py-2 bg-red-50 text-red-600 font-medium rounded-lg hover:bg-red-500/15 transition-colors">
                Cancel Booking
              </button>
              <button className="w-full px-4 py-2 bg-yellow-50 text-cyan-400 font-medium rounded-lg hover:bg-cyan-500/15 transition-colors flex items-center justify-center gap-2">
                <AlertCircle className="h-4 w-4" />
                Report Issue
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
