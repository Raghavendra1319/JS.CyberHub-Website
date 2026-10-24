import { Link } from "react-router";
import { Home, Search, ArrowLeft } from "lucide-react";
import { motion } from "motion/react";

export function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-muted flex items-center justify-center p-4">
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
          <div className="text-[120px] md:text-[180px] font-bold text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 to-blue-600 leading-none">
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
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Page Not Found
          </h1>
          <p className="text-lg text-muted-foreground mb-2">
            Oops! The page you're looking for doesn't exist.
          </p>
          <p className="text-muted-foreground">
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
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-400 to-blue-600 text-white font-medium rounded-lg hover:shadow-lg transition-shadow"
          >
            <Home className="h-5 w-5" />
            Go Home
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 px-6 py-3 bg-card text-foreground/80 font-medium rounded-lg border border-border hover:bg-muted/20 transition-colors"
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
          className="mt-12 pt-8 border-t border-border"
        >
          <p className="text-sm text-muted-foreground mb-4">You might be looking for:</p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
            <Link to="/services" className="text-cyan-500 hover:text-cyan-400 font-medium">
              Services
            </Link>
            <span className="text-gray-300">•</span>
            <Link to="/pricing" className="text-cyan-500 hover:text-cyan-400 font-medium">
              Pricing
            </Link>
            <span className="text-gray-300">•</span>
            <Link to="/contact" className="text-cyan-500 hover:text-cyan-400 font-medium">
              Contact Us
            </Link>
            <span className="text-gray-300">•</span>
            <Link to="/dashboard" className="text-cyan-500 hover:text-cyan-400 font-medium">
              Dashboard
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
