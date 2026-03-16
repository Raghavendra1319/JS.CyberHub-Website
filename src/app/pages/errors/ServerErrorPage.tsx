import { Link } from "react-router";
import { Home, RefreshCcw, AlertTriangle } from "lucide-react";
import { motion } from "motion/react";

export function ServerErrorPage() {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-white flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl w-full text-center"
      >
        {/* Error Icon */}
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8 flex justify-center"
        >
          <div className="w-32 h-32 bg-red-100 rounded-full flex items-center justify-center">
            <AlertTriangle className="h-16 w-16 text-red-600" />
          </div>
        </motion.div>

        {/* Error Code */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-6"
        >
          <div className="text-6xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-red-600 to-orange-600 leading-none mb-4">
            500
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
            Internal Server Error
          </h1>
          <p className="text-lg text-gray-600 mb-2">
            Something went wrong on our end.
          </p>
          <p className="text-gray-500">
            We're working to fix the issue. Please try again in a moment.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={handleRefresh}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-600 to-orange-600 text-white font-medium rounded-lg hover:shadow-lg transition-shadow"
          >
            <RefreshCcw className="h-5 w-5" />
            Try Again
          </button>
          
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-700 font-medium rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
          >
            <Home className="h-5 w-5" />
            Go Home
          </Link>
        </motion.div>

        {/* Support Information */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12 pt-8 border-t border-gray-200"
        >
          <p className="text-sm text-gray-600 mb-4">
            If the problem persists, please contact our support team:
          </p>
          <div className="flex flex-col items-center gap-2 text-sm">
            <a
              href="mailto:raghavendrakanade13@gmail.com"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              raghavendrakanade13@gmail.com
            </a>
            <a
              href="tel:+918446173815"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              +91 8446173815
            </a>
          </div>
        </motion.div>

        {/* Error ID (for debugging) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-8"
        >
          <p className="text-xs text-gray-400">
            Error ID: {Math.random().toString(36).substring(2, 15)}
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
