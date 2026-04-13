import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Shield, Mail, Lock, Loader2, AlertCircle, ShieldCheck, Fingerprint } from "lucide-react";
import { motion } from "motion/react";
import { useAuth } from "../../context/AuthContext";
import { toast } from "sonner";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(email, password);
      toast.success("Access Granted - Welcome back!");

      // Redirect based on email
      if (email === "admin@jscyberhub.com") {
        navigate("/admin");
      } else if (email === "provider@jscyberhub.com") {
        navigate("/provider");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      setError("Access Denied - Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cyber-dark relative overflow-hidden flex items-center justify-center p-4">
      {/* Background Effects */}
      <div className="absolute inset-0 cyber-grid opacity-20" />
      <motion.div
        className="absolute top-20 right-20 w-96 h-96 bg-neon-indigo rounded-full blur-[120px] opacity-20"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-20 left-20 w-96 h-96 bg-neon-purple rounded-full blur-[120px] opacity-15"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{ duration: 10, repeat: Infinity, delay: 1 }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Logo */}
        <Link to="/" className="flex items-center justify-center gap-3 mb-10">
          <div className="w-14 h-14 bg-gradient-to-br from-neon-indigo to-neon-purple rounded-xl flex items-center justify-center neon-glow">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <div className="flex items-baseline gap-0.5">
            <span className="text-3xl font-bold text-white">JS</span>
            <span className="text-3xl font-bold gradient-text">.CyberHub</span>
          </div>
        </Link>

        {/* Login Form */}
        <div className="cyber-card rounded-2xl p-8 neon-border">
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg cyber-surface neon-border mb-4"
            >
              <ShieldCheck className="h-4 w-4 text-neon-blue" />
              <span className="text-xs font-bold text-blue-300 uppercase tracking-wider">Secure Access Portal</span>
            </motion.div>

            <h1 className="text-3xl font-bold text-white mb-2">
              Authentication Required
            </h1>
            <p className="text-blue-300">
              Enter your credentials to access the system
            </p>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-6 p-4 cyber-surface border border-red-500/50 rounded-lg flex items-start gap-3"
            >
              <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-red-400 font-medium">{error}</div>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-bold text-blue-300 mb-2 uppercase tracking-wider">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-neon-blue" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="your.email@domain.com"
                  className="w-full pl-12 pr-4 py-3.5 bg-cyber-surface border border-neon-blue/30 rounded-lg focus:ring-2 focus:ring-neon-blue focus:border-neon-blue text-white placeholder-blue-400/50 transition-all"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-bold text-blue-300 mb-2 uppercase tracking-wider">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-neon-blue" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••••••"
                  className="w-full pl-12 pr-4 py-3.5 bg-cyber-surface border border-neon-blue/30 rounded-lg focus:ring-2 focus:ring-neon-blue focus:border-neon-blue text-white placeholder-blue-400/50 transition-all"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  className="rounded border-neon-blue/30 bg-cyber-surface text-neon-blue focus:ring-neon-blue focus:ring-offset-0"
                />
                <span className="text-blue-300 group-hover:text-neon-blue transition-colors">Remember me</span>
              </label>
              <Link
                to="/auth/forgot-password"
                className="text-neon-blue hover:text-neon-purple font-semibold transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-4 bg-gradient-to-r from-neon-indigo to-neon-purple text-white font-bold rounded-lg neon-glow hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Authenticating...
                </>
              ) : (
                <>
                  <ShieldCheck className="h-5 w-5" />
                  Access System
                </>
              )}
            </button>
          </form>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-neon-blue/20"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-cyber-surface text-blue-400 font-semibold">Alternative Access</span>
              </div>
            </div>

            <button
              onClick={() => {
                toast.info("Google OAuth integration available - configure in Supabase settings");
              }}
              className="mt-6 w-full flex items-center justify-center gap-3 px-6 py-3.5 border border-neon-blue/30 rounded-lg hover:bg-neon-blue/5 hover:border-neon-blue/50 transition-all cyber-surface"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <span className="text-blue-300 font-semibold">Continue with Google</span>
            </button>
          </div>

          <div className="mt-8 text-center text-sm">
            <span className="text-blue-400">New to the system? </span>
            <Link to="/auth/signup" className="text-neon-blue hover:text-neon-purple font-bold transition-colors">
              Register Access
            </Link>
          </div>

          {/* Demo Credentials */}
          <div className="mt-8 p-4 cyber-surface rounded-lg border border-neon-blue/30">
            <div className="flex items-center gap-2 mb-3">
              <Fingerprint className="h-4 w-4 text-neon-blue" />
              <div className="text-xs font-bold text-blue-300 uppercase tracking-wider">Test Credentials</div>
            </div>
            <div className="text-xs text-blue-400 space-y-1.5 font-mono">
              <div><span className="text-neon-blue font-bold">Admin:</span> admin@jscyberhub.com</div>
              <div><span className="text-neon-purple font-bold">Provider:</span> provider@jscyberhub.com</div>
              <div><span className="text-blue-400 font-bold">User:</span> user@example.com</div>
              <div className="pt-1 border-t border-neon-blue/20 mt-2"><span className="text-green-400 font-bold">Pass:</span> any password</div>
            </div>
          </div>
        </div>

        <div className="text-center mt-8 flex items-center justify-center gap-2">
          <Shield className="h-4 w-4 text-neon-blue" />
          <p className="text-sm text-blue-400 font-semibold">
            Military-grade AES-256 encryption
          </p>
        </div>
      </motion.div>
    </div>
  );
}