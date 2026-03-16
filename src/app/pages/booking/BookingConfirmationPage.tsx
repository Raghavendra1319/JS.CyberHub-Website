import { useParams, Link } from "react-router";
import { useEffect } from "react";
import { CheckCircle, Calendar, Clock, Mail, Phone, Download, Share2, Home, FileText } from "lucide-react";
import { motion } from "motion/react";
import { useBooking } from "../../context/BookingContext";
import { format } from "date-fns";

export function BookingConfirmationPage() {
  const { bookingId } = useParams();
  const { bookingData, clearBooking } = useBooking();

  useEffect(() => {
    // Clear booking data after showing confirmation
    // But keep it available for this page render
    return () => {
      // Optionally clear after navigating away
    };
  }, []);

  if (!bookingData.serviceName) {
    // If accessed directly without booking data, show minimal confirmation
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full mx-4">
          <div className="bg-white rounded-2xl p-8 text-center shadow-lg">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Booking Confirmed!</h1>
            <p className="text-gray-600 mb-6">
              Your booking ID is: <span className="font-mono font-semibold">{bookingId}</span>
            </p>
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-lg hover:shadow-lg transition-shadow"
            >
              <Home className="h-5 w-5" />
              Go to Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleDownloadReceipt = () => {
    // Simulate receipt download
    alert("Receipt download functionality will be implemented with backend integration");
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Booking Confirmation",
          text: `My booking with JS.CyberHub has been confirmed! Booking ID: ${bookingId}`,
        });
      } catch (err) {
        console.log("Error sharing:", err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(
        `Booking ID: ${bookingId}\nService: ${bookingData.serviceName}\nDate: ${format(bookingData.date!, "MMMM d, yyyy")}\nTime: ${bookingData.timeSlot}`
      );
      alert("Booking details copied to clipboard!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Success Animation */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="text-center mb-8"
        >
          <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, duration: 0.3 }}
            >
              <CheckCircle className="h-12 w-12 text-white" />
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Booking Confirmed!
            </h1>
            <p className="text-lg text-gray-600 mb-2">
              Thank you for choosing JS.CyberHub
            </p>
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full font-medium">
              <span>Booking ID:</span>
              <span className="font-mono font-bold">{bookingId}</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Confirmation Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
            <h2 className="text-2xl font-bold mb-2">Booking Details</h2>
            <p className="text-blue-100">A confirmation email has been sent to {bookingData.customerEmail}</p>
          </div>

          {/* Details Grid */}
          <div className="p-6 space-y-6">
            {/* Service Info */}
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-3">Service Information</h3>
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="font-semibold text-lg text-gray-900 mb-1">
                  {bookingData.serviceName}
                </div>
                <div className="text-gray-600">
                  Amount Paid: <span className="font-bold text-green-600">
                    ₹{bookingData.servicePrice! + Math.round(bookingData.servicePrice! * 0.18)}
                  </span>
                </div>
              </div>
            </div>

            {/* Appointment Details */}
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-3">Appointment Details</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-xl">
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Calendar className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="text-sm text-blue-700 font-medium mb-1">Date</div>
                    <div className="font-semibold text-gray-900">
                      {format(bookingData.date!, "EEEE")}
                    </div>
                    <div className="text-gray-700">
                      {format(bookingData.date!, "MMMM d, yyyy")}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-indigo-50 rounded-xl">
                  <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="text-sm text-indigo-700 font-medium mb-1">Time</div>
                    <div className="font-semibold text-gray-900 text-lg">
                      {bookingData.timeSlot}
                    </div>
                    <div className="text-gray-700 text-sm">
                      Indian Standard Time
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-3">Your Contact Information</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Mail className="h-5 w-5 text-gray-600" />
                  <div>
                    <div className="text-sm text-gray-600">Email</div>
                    <div className="font-medium text-gray-900">{bookingData.customerEmail}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Phone className="h-5 w-5 text-gray-600" />
                  <div>
                    <div className="text-sm text-gray-600">Phone</div>
                    <div className="font-medium text-gray-900">{bookingData.customerPhone}</div>
                  </div>
                </div>
              </div>
            </div>

            {bookingData.notes && (
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-3">Additional Notes</h3>
                <div className="p-4 bg-gray-50 rounded-xl">
                  <FileText className="h-5 w-5 text-gray-600 mb-2" />
                  <p className="text-gray-700">{bookingData.notes}</p>
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Next Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-6"
        >
          <h3 className="text-lg font-bold text-gray-900 mb-4">What happens next?</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">
                1
              </div>
              <div className="text-gray-700">
                You'll receive a confirmation email with all booking details
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">
                2
              </div>
              <div className="text-gray-700">
                Our team will contact you 24 hours before the appointment
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">
                3
              </div>
              <div className="text-gray-700">
                You can track your booking status in your dashboard
              </div>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid md:grid-cols-3 gap-4"
        >
          <button
            onClick={handleDownloadReceipt}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Download className="h-5 w-5" />
            Download Receipt
          </button>
          
          <button
            onClick={handleShare}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Share2 className="h-5 w-5" />
            Share Booking
          </button>
          
          <Link
            to="/dashboard"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-lg hover:shadow-lg transition-shadow"
          >
            <Home className="h-5 w-5" />
            Go to Dashboard
          </Link>
        </motion.div>

        {/* Support Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-8 text-center"
        >
          <p className="text-gray-600 mb-2">Need help? Contact our support team</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm">
            <a href="mailto:raghavendrakanade13@gmail.com" className="text-blue-600 hover:text-blue-700 font-medium">
              raghavendrakanade13@gmail.com
            </a>
            <span className="hidden sm:inline text-gray-400">•</span>
            <a href="tel:+918446173815" className="text-blue-600 hover:text-blue-700 font-medium">
              +91 8446173815
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
