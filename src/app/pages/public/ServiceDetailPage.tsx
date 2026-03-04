import { useParams, Link, useNavigate } from "react-router";
import { ArrowLeft, Clock, DollarSign, CheckCircle, ArrowRight, Star } from "lucide-react";
import { motion } from "motion/react";
import { services } from "../../data/services";

export function ServiceDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const service = services.find((s) => s.id === id);

  if (!service) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Service Not Found</h2>
          <Link
            to="/services"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Back to Services
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Services
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Image */}
              <div className="relative h-96 rounded-2xl overflow-hidden mb-8">
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <div className="inline-block bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium text-gray-900 capitalize mb-3">
                    {service.category}
                  </div>
                  <h1 className="text-4xl font-bold text-white">
                    {service.name}
                  </h1>
                </div>
              </div>

              {/* Description */}
              <div className="bg-white rounded-2xl p-8 mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Service Overview
                </h2>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {service.fullDescription}
                </p>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
                    <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <DollarSign className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Starting at</div>
                      <div className="font-bold text-gray-900">${service.price}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
                    <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Clock className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Duration</div>
                      <div className="font-bold text-gray-900">{service.duration}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-lg">
                    <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Star className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Rating</div>
                      <div className="font-bold text-gray-900">4.9/5</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="bg-white rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  What's Included
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {service.features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3"
                    >
                      <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      </div>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="sticky top-24"
            >
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
                <div className="mb-6">
                  <div className="text-3xl font-bold text-gray-900 mb-1">
                    ${service.price}
                  </div>
                  <div className="text-gray-600">One-time payment</div>
                </div>

                <button
                  onClick={() => navigate(`/booking/datetime/${service.id}`)}
                  className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-lg hover:shadow-xl transition-shadow mb-4 flex items-center justify-center gap-2"
                >
                  Book Now
                  <ArrowRight className="h-5 w-5" />
                </button>

                <div className="text-center text-sm text-gray-600 mb-6">
                  Secure payment • Instant confirmation
                </div>

                <div className="pt-6 border-t border-gray-200 space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium text-gray-900 mb-1">
                        Money-back guarantee
                      </div>
                      <div className="text-sm text-gray-600">
                        100% satisfaction or full refund
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium text-gray-900 mb-1">
                        Expert professionals
                      </div>
                      <div className="text-sm text-gray-600">
                        Certified and experienced team
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium text-gray-900 mb-1">
                        24/7 Support
                      </div>
                      <div className="text-sm text-gray-600">
                        We're here to help anytime
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <Link
                    to="/contact"
                    className="block text-center text-blue-600 hover:text-blue-700 font-medium text-sm"
                  >
                    Have questions? Contact us
                  </Link>
                </div>
              </div>

              {/* Trust Badge */}
              <div className="mt-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6">
                <div className="flex items-center gap-4 mb-4">
                  {[1, 2, 3].map((i) => (
                    <img
                      key={i}
                      src={`https://i.pravatar.cc/40?img=${i + 10}`}
                      alt="Customer"
                      className="w-10 h-10 rounded-full border-2 border-white"
                    />
                  ))}
                  <div className="text-sm">
                    <div className="font-semibold text-gray-900">200+ bookings</div>
                    <div className="text-gray-600">in the last 30 days</div>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                  <span className="ml-2 text-sm font-medium text-gray-900">
                    4.9 out of 5
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
