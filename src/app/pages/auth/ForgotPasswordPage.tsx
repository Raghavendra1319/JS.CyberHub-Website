import { useState } from "react";
import { Link } from "react-router";
import { Shield, Mail, ArrowLeft, CheckCircle } from "lucide-react";
import { motion } from "motion/react";

export function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setSubmitted(true);
    setLoading(false);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-card to-muted flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          <div className="bg-card rounded-2xl shadow-xl p-8 text-center">
            <div className="w-16 h-16 bg-green-500/15 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-8 w-8 text-green-400" />
            </div>
            
            <h1 className="text-2xl font-bold text-foreground mb-4">
              Check Your Email
            </h1>
            
            <p className="text-muted-foreground mb-8">
              We've sent password reset instructions to{" "}
              <span className="font-medium text-foreground">{email}</span>
            </p>

            <div className="space-y-3">
              <Link
                to="/auth/login"
                className="block w-full px-6 py-3 bg-gradient-to-r from-cyan-400 to-blue-600 text-white font-medium rounded-lg hover:shadow-lg transition-shadow"
              >
                Back to Login
              </Link>
              
              <button
                onClick={() => setSubmitted(false)}
                className="block w-full px-6 py-3 text-foreground/80 font-medium rounded-lg hover:bg-muted/20 transition-colors"
              >
                Try Another Email
              </button>
            </div>

            <p className="mt-8 text-sm text-muted-foreground">
              Didn't receive the email? Check your spam folder or contact support.
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-muted flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <Link to="/" className="flex items-center justify-center gap-2 mb-8">
          <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center">
            <Shield className="h-7 w-7 text-white" />
          </div>
          <span className="text-2xl font-bold text-foreground">JS.CyberHub</span>
        </Link>

        {/* Reset Password Form */}
        <div className="bg-card rounded-2xl shadow-xl p-8">
          <Link
            to="/auth/login"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to login
          </Link>

          <div className="mb-8">
            <h1 className="text-2xl font-bold text-foreground mb-2">
              Forgot Password?
            </h1>
            <p className="text-muted-foreground">
              No worries! Enter your email and we'll send you reset instructions.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground/80 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground/70" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="you@example.com"
                  className="w-full pl-11 pr-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3 bg-gradient-to-r from-cyan-400 to-blue-600 text-white font-medium rounded-lg hover:shadow-lg transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Sending..." : "Send Reset Instructions"}
            </button>
          </form>

          <div className="mt-8 p-4 bg-card rounded-lg">
            <p className="text-sm text-cyan-300">
              <strong>Remember your password?</strong>{" "}
              <Link to="/auth/login" className="text-cyan-500 hover:text-cyan-400 font-medium">
                Sign in instead
              </Link>
            </p>
          </div>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-8">
          Protected by industry-standard encryption
        </p>
      </motion.div>
    </div>
  );
}
