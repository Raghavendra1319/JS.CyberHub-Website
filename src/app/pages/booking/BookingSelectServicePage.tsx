import { Link } from "react-router";
import { ArrowRight, Search } from "lucide-react";
import { motion } from "motion/react";
import { services } from "../../data/services";

export function BookingSelectServicePage() {
  return (
    <div className="min-h-screen bg-muted/20">
      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Book a Service</h1>
              <p className="text-muted-foreground mt-1">Select a service to get started</p>
            </div>
            <Link
              to="/"
              className="text-muted-foreground hover:text-foreground font-medium text-sm"
            >
              Cancel
            </Link>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2">
            {["Select Service", "Date & Time", "Your Details", "Payment"].map((step, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className={`flex items-center gap-2 ${index === 0 ? "text-cyan-500" : "text-muted-foreground/70"}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    index === 0 ? "bg-primary text-white" : "bg-muted text-muted-foreground"
                  }`}>
                    {index + 1}
                  </div>
                  <span className="text-sm font-medium hidden sm:inline">{step}</span>
                </div>
                {index < 3 && (
                  <ArrowRight className="h-4 w-4 text-gray-300 hidden sm:block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground/70" />
            <input
              type="text"
              placeholder="Search services..."
              className="w-full pl-11 pr-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <Link
                to={`/booking/datetime/${service.id}`}
                className="block bg-card rounded-2xl overflow-hidden hover:shadow-xl transition-shadow group h-full"
              >
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute top-3 right-3 bg-card px-3 py-1 rounded-full text-sm font-semibold text-cyan-500">
                    ₹{service.price.toLocaleString('en-IN')}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-cyan-500 transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {service.shortDescription}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <span className="text-sm text-muted-foreground">{service.duration}</span>
                    <span className="text-cyan-500 font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                      Select
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
