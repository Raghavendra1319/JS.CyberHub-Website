import { useParams, useNavigate, Link } from "react-router";
import { useState } from "react";
import { ArrowRight, ArrowLeft, CheckCircle, User, Mail, Phone, FileText } from "lucide-react";
import { motion } from "motion/react";
import { services } from "../../data/services";
import { useBooking } from "../../context/BookingContext";
import { format } from "date-fns";

export function BookingDetailsPage() {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const { bookingData, updateBooking } = useBooking();
  
  const service = services.find(s => s.id === serviceId);
  
  const [formData, setFormData] = useState({
    customerName: bookingData.customerName || "",
    customerEmail: bookingData.customerEmail || "",
    customerPhone: bookingData.customerPhone || "",
    notes: bookingData.notes || "",
  });

  const [errors, setErrors] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
  });

  if (!service || !bookingData.date || !bookingData.timeSlot) {
    navigate("/booking");
    return null;
  }

  const validateForm = () => {
    const newErrors = {
      customerName: "",
      customerEmail: "",
      customerPhone: "",
    };

    if (!formData.customerName.trim()) {
      newErrors.customerName = "Name is required";
    }

    if (!formData.customerEmail.trim()) {
      newErrors.customerEmail = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.customerEmail)) {
      newErrors.customerEmail = "Invalid email format";
    }

    if (!formData.customerPhone.trim()) {
      newErrors.customerPhone = "Phone is required";
    } else if (!/^[+]?[\d\s-()]{10,}$/.test(formData.customerPhone)) {
      newErrors.customerPhone = "Invalid phone format";
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error !== "");
  };

  const handleContinue = () => {
    if (validateForm()) {
      updateBooking({
        customerName: formData.customerName,
        customerEmail: formData.customerEmail,
        customerPhone: formData.customerPhone,
        notes: formData.notes,
      });
      navigate(`/booking/summary/${serviceId}`);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <div className="min-h-screen bg-muted/20">
      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link
            to={`/booking/datetime/${serviceId}`}
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>
          <h1 className="text-2xl font-bold text-foreground">Your Details</h1>
          <p className="text-muted-foreground mt-1">We need some information to complete your booking</p>
        </div>
      </div>

      {/* Progress */}
      <div className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2">
            {["Select Service", "Date & Time", "Your Details", "Payment"].map((step, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className={`flex items-center gap-2 ${index <= 2 ? "text-cyan-500" : "text-muted-foreground/70"}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    index < 2 ? "bg-green-600 text-white" : index === 2 ? "bg-primary text-white" : "bg-muted text-muted-foreground"
                  }`}>
                    {index < 2 ? <CheckCircle className="h-5 w-5" /> : index + 1}
                  </div>
                  <span className="text-sm font-medium hidden sm:inline">{step}</span>
                </div>
                {index < 3 && <ArrowRight className="h-4 w-4 text-gray-300 hidden sm:block" />}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card rounded-2xl p-8"
            >
              <h2 className="text-xl font-bold text-foreground mb-6">Contact Information</h2>

              <div className="space-y-6">
                {/* Full Name */}
                <div>
                  <label htmlFor="customerName" className="block text-sm font-medium text-foreground/80 mb-2">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground/70" />
                    <input
                      type="text"
                      id="customerName"
                      name="customerName"
                      value={formData.customerName}
                      onChange={handleChange}
                      className={`w-full pl-11 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none ${
                        errors.customerName ? "border-red-500" : "border-border"
                      }`}
                      placeholder="John Doe"
                    />
                  </div>
                  {errors.customerName && (
                    <p className="mt-1 text-sm text-red-600">{errors.customerName}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="customerEmail" className="block text-sm font-medium text-foreground/80 mb-2">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground/70" />
                    <input
                      type="email"
                      id="customerEmail"
                      name="customerEmail"
                      value={formData.customerEmail}
                      onChange={handleChange}
                      className={`w-full pl-11 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none ${
                        errors.customerEmail ? "border-red-500" : "border-border"
                      }`}
                      placeholder="john@example.com"
                    />
                  </div>
                  {errors.customerEmail && (
                    <p className="mt-1 text-sm text-red-600">{errors.customerEmail}</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="customerPhone" className="block text-sm font-medium text-foreground/80 mb-2">
                    Phone Number *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground/70" />
                    <input
                      type="tel"
                      id="customerPhone"
                      name="customerPhone"
                      value={formData.customerPhone}
                      onChange={handleChange}
                      className={`w-full pl-11 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none ${
                        errors.customerPhone ? "border-red-500" : "border-border"
                      }`}
                      placeholder="+91 1234567890"
                    />
                  </div>
                  {errors.customerPhone && (
                    <p className="mt-1 text-sm text-red-600">{errors.customerPhone}</p>
                  )}
                </div>

                {/* Additional Notes */}
                <div>
                  <label htmlFor="notes" className="block text-sm font-medium text-foreground/80 mb-2">
                    Additional Notes (Optional)
                  </label>
                  <div className="relative">
                    <FileText className="absolute left-3 top-3 h-5 w-5 text-muted-foreground/70" />
                    <textarea
                      id="notes"
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                      rows={4}
                      className="w-full pl-11 pr-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none"
                      placeholder="Any special requirements or questions..."
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-card rounded-2xl p-6 sticky top-24"
            >
              <h3 className="font-semibold text-foreground mb-4">Booking Summary</h3>
              
              <div className="space-y-4 mb-6">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Service</div>
                  <div className="font-medium text-foreground">{service.name}</div>
                </div>

                <div>
                  <div className="text-sm text-muted-foreground mb-1">Date</div>
                  <div className="font-medium text-foreground">
                    {format(bookingData.date, "EEEE, MMMM d, yyyy")}
                  </div>
                </div>

                <div>
                  <div className="text-sm text-muted-foreground mb-1">Time</div>
                  <div className="font-medium text-foreground">{bookingData.timeSlot}</div>
                </div>

                <div>
                  <div className="text-sm text-muted-foreground mb-1">Duration</div>
                  <div className="font-medium text-foreground">{service.duration}</div>
                </div>

                <div className="pt-4 border-t border-border">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Total</span>
                    <span className="text-2xl font-bold text-foreground">₹{service.price}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleContinue}
                className="w-full px-6 py-3 bg-gradient-to-r from-cyan-400 to-blue-600 text-white font-medium rounded-lg hover:shadow-lg transition-shadow flex items-center justify-center gap-2"
              >
                Continue to Review
                <ArrowRight className="h-5 w-5" />
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
