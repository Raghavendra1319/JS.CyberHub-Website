import { useParams, useNavigate, Link } from "react-router";
import { ArrowRight, ArrowLeft, CheckCircle, Calendar, Clock, User, Mail, Phone, FileText, Edit2 } from "lucide-react";
import { motion } from "motion/react";
import { services } from "../../data/services";
import { useBooking } from "../../context/BookingContext";
import { format } from "date-fns";

export function BookingSummaryPage() {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const { bookingData } = useBooking();
  
  const service = services.find(s => s.id === serviceId);

  if (!service || !bookingData.date || !bookingData.timeSlot || !bookingData.customerName) {
    navigate("/booking");
    return null;
  }

  const handleContinue = () => {
    navigate(`/booking/payment/${serviceId}`);
  };

  return (
    <div className="min-h-screen bg-muted/20">
      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link
            to={`/booking/details/${serviceId}`}
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>
          <h1 className="text-2xl font-bold text-foreground">Review Your Booking</h1>
          <p className="text-muted-foreground mt-1">Please review the details before proceeding to payment</p>
        </div>
      </div>

      {/* Progress */}
      <div className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2">
            {["Select Service", "Date & Time", "Your Details", "Payment"].map((step, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className={`flex items-center gap-2 ${index <= 2 ? "text-green-400" : "text-muted-foreground/70"}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    index <= 2 ? "bg-green-600 text-white" : "bg-muted text-muted-foreground"
                  }`}>
                    {index <= 2 ? <CheckCircle className="h-5 w-5" /> : index + 1}
                  </div>
                  <span className="text-sm font-medium hidden sm:inline">{step}</span>
                </div>
                {index < 3 && <ArrowRight className="h-4 w-4 text-gray-300 hidden sm:block" />}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Service Details */}
          <div className="bg-card rounded-2xl p-6 shadow-lg">
            <div className="flex items-start justify-between mb-4">
              <h2 className="text-xl font-bold text-foreground">Service Details</h2>
              <Link
                to="/booking"
                className="inline-flex items-center gap-2 text-sm text-cyan-500 hover:text-cyan-400"
              >
                <Edit2 className="h-4 w-4" />
                Change
              </Link>
            </div>

            <div className="flex gap-6">
              <img
                src={service.image}
                alt={service.name}
                className="w-32 h-32 rounded-xl object-cover"
              />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-foreground mb-2">{service.name}</h3>
                <p className="text-muted-foreground text-sm mb-3">{service.shortDescription}</p>
                <div className="flex flex-wrap gap-2">
                  {service.features.slice(0, 3).map((feature, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1 bg-card text-cyan-400 px-3 py-1 rounded-full text-xs"
                    >
                      <CheckCircle className="h-3 w-3" />
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Appointment Details */}
          <div className="bg-card rounded-2xl p-6 shadow-lg">
            <div className="flex items-start justify-between mb-4">
              <h2 className="text-xl font-bold text-foreground">Appointment Details</h2>
              <Link
                to={`/booking/datetime/${serviceId}`}
                className="inline-flex items-center gap-2 text-sm text-cyan-500 hover:text-cyan-400"
              >
                <Edit2 className="h-4 w-4" />
                Change
              </Link>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-cyan-500/15 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Calendar className="h-6 w-6 text-cyan-500" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Date</div>
                  <div className="font-semibold text-foreground">
                    {format(bookingData.date, "EEEE, MMMM d, yyyy")}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-cyan-500/15 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Clock className="h-6 w-6 text-cyan-500" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Time</div>
                  <div className="font-semibold text-foreground">{bookingData.timeSlot}</div>
                  <div className="text-sm text-muted-foreground mt-1">Duration: {service.duration}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-card rounded-2xl p-6 shadow-lg">
            <div className="flex items-start justify-between mb-4">
              <h2 className="text-xl font-bold text-foreground">Contact Information</h2>
              <Link
                to={`/booking/details/${serviceId}`}
                className="inline-flex items-center gap-2 text-sm text-cyan-500 hover:text-cyan-400"
              >
                <Edit2 className="h-4 w-4" />
                Edit
              </Link>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-muted/40 rounded-lg flex items-center justify-center flex-shrink-0">
                  <User className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Name</div>
                  <div className="font-medium text-foreground">{bookingData.customerName}</div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-muted/40 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Email</div>
                  <div className="font-medium text-foreground">{bookingData.customerEmail}</div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-muted/40 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Phone</div>
                  <div className="font-medium text-foreground">{bookingData.customerPhone}</div>
                </div>
              </div>

              {bookingData.notes && (
                <div className="flex items-start gap-4 pt-4 border-t border-border">
                  <div className="w-10 h-10 bg-muted/40 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FileText className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Additional Notes</div>
                    <div className="text-foreground">{bookingData.notes}</div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Pricing Summary */}
          <div className="bg-gradient-to-br from-card to-muted rounded-2xl p-6 shadow-lg">
            <h2 className="text-xl font-bold text-foreground mb-4">Pricing Summary</h2>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-foreground/80">{service.name}</span>
                <span className="font-medium text-foreground">₹{service.price}</span>
              </div>
              
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Service charge</span>
                <span className="text-foreground">₹0</span>
              </div>

              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Taxes (18% GST)</span>
                <span className="text-foreground">₹{Math.round(service.price * 0.18)}</span>
              </div>

              <div className="pt-4 border-t-2 border-blue-200">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-foreground">Total Amount</span>
                  <span className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
                    ₹{service.price + Math.round(service.price * 0.18)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to={`/booking/details/${serviceId}`}
              className="flex-1 px-6 py-3 bg-card border-2 border-border text-foreground/80 font-medium rounded-lg hover:bg-muted/20 transition-colors flex items-center justify-center gap-2"
            >
              <ArrowLeft className="h-5 w-5" />
              Go Back
            </Link>
            <button
              onClick={handleContinue}
              className="flex-1 px-6 py-4 bg-gradient-to-r from-cyan-400 to-blue-600 text-white font-medium rounded-lg hover:shadow-lg transition-shadow flex items-center justify-center gap-2"
            >
              Proceed to Payment
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>

          {/* Terms Notice */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
            <p className="text-sm text-cyan-300">
              By proceeding to payment, you agree to our{" "}
              <a href="/terms" className="underline font-medium">Terms of Service</a> and{" "}
              <a href="/privacy" className="underline font-medium">Privacy Policy</a>. 
              Cancellation policy: Free cancellation up to 24 hours before the scheduled time.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
