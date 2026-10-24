import { ArrowRight, CheckCircle, Shield, Zap, Award } from "lucide-react";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { motion } from "motion/react";

export function Hero() {
  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="hero" className="pt-20 min-h-screen flex items-center bg-gradient-to-br from-background via-card to-muted relative overflow-hidden">
      {/* Background decorative elements */}
      <motion.div 
        className="absolute top-20 right-0 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl opacity-30"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      ></motion.div>
      <motion.div 
        className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl opacity-30"
        animate={{
          scale: [1, 1.3, 1],
          x: [0, -50, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      ></motion.div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <motion.div 
              className="inline-flex items-center gap-2 bg-cyan-500/15 text-cyan-400 px-4 py-2 rounded-full text-sm font-medium border border-cyan-500/25"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Zap className="h-4 w-4" />
              <span>Professional Security & Development Solutions</span>
            </motion.div>
            
            <motion.h1 
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Secure Your Business & 
              <span className="bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent"> Drive Growth</span>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-muted-foreground leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Comprehensive cybersecurity solutions, custom software development, and strategic business consulting to protect and scale your enterprise.
            </motion.p>

            <motion.div 
              className="flex flex-wrap gap-6 text-foreground/80"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              {[
                "24/7 Security Monitoring",
                "Expert Development Team",
                "Competitive Pricing"
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  className="flex items-center gap-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                >
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <span className="font-medium">{item}</span>
                </motion.div>
              ))}
            </motion.div>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              <Button size="lg" onClick={scrollToContact} className="group text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all">
                Get Started Today
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="outline" onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })} className="text-lg px-8 py-6 border-2">
                Explore Services
              </Button>
            </motion.div>

            {/* Trust indicators */}
            <motion.div 
              className="flex flex-wrap gap-8 pt-4 border-t border-border"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.1 }}
            >
              <motion.div 
                className="flex items-center gap-3"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="w-12 h-12 bg-cyan-500/15 rounded-full flex items-center justify-center">
                  <Shield className="h-6 w-6 text-cyan-500" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">100%</div>
                  <div className="text-sm text-muted-foreground">Secure Solutions</div>
                </div>
              </motion.div>
              <motion.div 
                className="flex items-center gap-3"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="w-12 h-12 bg-green-500/15 rounded-full flex items-center justify-center border border-green-500/20">
                  <Award className="h-6 w-6 text-green-400" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">Expert</div>
                  <div className="text-sm text-muted-foreground">Certified Team</div>
                </div>
              </motion.div>
            </motion.div>
          </div>
          
          <motion.div 
            className="relative lg:ml-8"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-2xl opacity-10 blur-2xl"></div>
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1581093805071-a04e696db334?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMHRlYW18ZW58MXx8fHwxNzY3NzY0NDQ2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Professional business team"
              className="rounded-2xl shadow-2xl w-full h-auto relative z-10 border border-border"
            />
            {/* Floating card */}
            <motion.div 
              className="absolute -bottom-6 -left-6 cyber-card rounded-xl p-6 hidden lg:block"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.3 }}
              whileHover={{ scale: 1.05, rotate: 2 }}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-white" />
                </div>
                <div>
                  <motion.div 
                    className="text-2xl font-bold text-foreground"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1.5 }}
                  >
                    99.9%
                  </motion.div>
                  <div className="text-sm text-muted-foreground">Uptime Guarantee</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}