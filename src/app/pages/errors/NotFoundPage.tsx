import { Link } from "react-router";
import { Home, Search, ArrowLeft } from "lucide-react";
import { motion } from "motion/react";

export function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-white flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl w-full text-center"
      >
        {/* 404 Illustration */}
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <div className="text-[120px] md:text-[180px] font-bold text-transparent bg-clip-text bg-gradient-to-br from-blue-600 to-indigo-600 leading-none">
            404
          </div>
        </motion.div>

        {/* Error Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Page Not Found
          </h1>
          <p className="text-lg text-gray-600 mb-2">
            Oops! The page you're looking for doesn't exist.
          </p>
          <p className="text-gray-500">
            It might have been moved or deleted.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-lg hover:shadow-lg transition-shadow"
          >
            <Home className="h-5 w-5" />
            Go Home
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-700 font-medium rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            Go Back
          </button>
        </motion.div>

        {/* Helpful Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12 pt-8 border-t border-gray-200"
        >
          <p className="text-sm text-gray-600 mb-4">You might be looking for:</p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
            <Link to="/services" className="text-blue-600 hover:text-blue-700 font-medium">
              Services
            </Link>
            <span className="text-gray-300">•</span>
            <Link to="/pricing" className="text-blue-600 hover:text-blue-700 font-medium">
              Pricing
            </Link>
            <span className="text-gray-300">•</span>
            <Link to="/contact" className="text-blue-600 hover:text-blue-700 font-medium">
              Contact Us
            </Link>
            <span className="text-gray-300">•</span>
            <Link to="/dashboard" className="text-blue-600 hover:text-blue-700 font-medium">
              Dashboard
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
