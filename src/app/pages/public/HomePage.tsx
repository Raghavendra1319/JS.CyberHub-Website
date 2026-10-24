import { Link } from "react-router";
import { ArrowRight, Shield, Zap, Users, CheckCircle, Star, Lock, ShieldCheck, Cpu, Database, Radar, Activity } from "lucide-react";
import { motion } from "motion/react";
import { services } from "../../data/services";

export function HomePage() {
  const popularServices = services.filter(s => s.popular).slice(0, 3);

  return (
    <div className="bg-cyber-dark">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center py-20 overflow-hidden">
        {/* Cyber Grid Background */}
        <div className="absolute inset-0 cyber-grid opacity-40" />

        {/* Animated Glows */}
        <motion.div
          className="absolute top-20 right-10 w-[600px] h-[600px] bg-cyan-500 rounded-full blur-[120px] opacity-20"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 left-10 w-[500px] h-[500px] bg-cyan-500 rounded-full blur-[120px] opacity-15"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />

        {/* Scan Line Effect */}
        <motion.div
          className="absolute inset-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-30"
          animate={{
            y: [0, "100vh", 0],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-8 cyber-surface neon-border"
              >
                <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse" />
                <span className="text-muted-foreground">CYBER DEFENSE SYSTEM ACTIVE</span>
              </motion.div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
                <span className="text-white">JS</span>
                <span className="gradient-text">.CyberHub</span>
              </h1>

              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Next-Gen Cybersecurity Command Center
              </h2>

              <p className="text-lg md:text-xl text-foreground/70 mb-10 leading-relaxed max-w-xl">
                Advanced threat protection, penetration testing, and security consulting powered by AI-driven defense systems. Secure your digital infrastructure.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link
                  to="/services"
                  className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-400 to-blue-600 font-semibold rounded-xl neon-glow hover:scale-105 transition-transform text-white"
                >
                  Deploy Protection
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent border-2 border-cyan-500/30 text-muted-foreground font-semibold rounded-xl hover:bg-cyan-500/10 transition-colors"
                >
                  <Radar className="h-5 w-5" />
                  System Scan
                </Link>
              </div>

              {/* Cyber Stats */}
              <div className="grid grid-cols-3 gap-6">
                {[
                  { value: "500+", label: "Systems Protected", icon: Shield },
                  { value: "99.9%", label: "Uptime SLA", icon: Activity },
                  { value: "24/7", label: "Threat Monitoring", icon: Radar },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                    className="cyber-surface rounded-lg p-4"
                  >
                    <stat.icon className="h-5 w-5 text-cyan-400 mb-2" />
                    <p className="text-2xl font-bold text-white mb-1">{stat.value}</p>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative"
            >
              {/* Main Visual */}
              <div className="relative rounded-2xl overflow-hidden cyber-card neon-border">
                <img
                  src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=600&fit=crop"
                  alt="Cybersecurity Operations"
                  className="w-full h-auto opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-cyber-dark via-transparent to-transparent" />

                {/* Threat Detection Overlay */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.6 }}
                  className="absolute inset-0 border-2 border-border rounded-2xl"
                >
                  {/* Corner Brackets */}
                  {["top-left", "top-right", "bottom-left", "bottom-right"].map((corner) => (
                    <div
                      key={corner}
                      className={`absolute w-8 h-8 ${
                        corner.includes("top") ? "top-4" : "bottom-4"
                      } ${
                        corner.includes("left") ? "left-4" : "right-4"
                      } border-cyan-500/30 border-2 ${
                        corner === "top-left" ? "border-b-0 border-r-0" :
                        corner === "top-right" ? "border-b-0 border-l-0" :
                        corner === "bottom-left" ? "border-t-0 border-r-0" :
                        "border-t-0 border-l-0"
                      }`}
                    />
                  ))}
                </motion.div>
              </div>

              {/* Floating Security Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="absolute -bottom-6 -left-6 cyber-surface rounded-xl p-6 neon-border"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-xl flex items-center justify-center neon-glow">
                    <ShieldCheck className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <p className="text-3xl font-bold gradient-text">A+</p>
                    <p className="text-sm text-muted-foreground">Security Rating</p>
                  </div>
                </div>
              </motion.div>

              {/* Live Activity Indicator */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 1 }}
                className="absolute -top-4 -right-4 cyber-surface rounded-lg p-4 neon-border"
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-3 h-3 bg-green-400 rounded-full" />
                    <div className="absolute inset-0 w-3 h-3 bg-green-400 rounded-full animate-ping" />
                  </div>
                  <span className="text-sm font-semibold text-green-400">LIVE</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Defense Capabilities */}
      <section className="py-24 bg-cyber-darker relative overflow-hidden">
        <div className="absolute inset-0 cyber-grid opacity-20" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block mb-4"
            >
              <span className="text-sm font-bold text-cyan-400 uppercase tracking-wider">DEFENSE CAPABILITIES</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold text-white mb-6"
            >
              Military-Grade Protection
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
            >
              Advanced security infrastructure powered by AI threat detection
            </motion.p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: ShieldCheck,
                title: "Penetration Testing",
                description: "Advanced vulnerability assessment and ethical hacking to expose security weaknesses",
              },
              {
                icon: Lock,
                title: "Zero-Trust Architecture",
                description: "Implement enterprise-grade zero-trust security frameworks and access controls",
              },
              {
                icon: Cpu,
                title: "AI Threat Detection",
                description: "Machine learning-powered real-time threat identification and automated response",
              },
              {
                icon: Database,
                title: "Data Encryption",
                description: "End-to-end encryption for data at rest and in transit using military-grade algorithms",
              },
              {
                icon: Radar,
                title: "24/7 SOC Monitoring",
                description: "Security Operations Center with continuous network surveillance and incident response",
              },
              {
                icon: Activity,
                title: "Compliance & Audit",
                description: "GDPR, ISO 27001, SOC 2 compliance auditing and security framework implementation",
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group cyber-card rounded-xl p-8 hover:neon-glow transition-all duration-300"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-400/20 to-blue-600/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform border border-border">
                  <feature.icon className="h-8 w-8 text-cyan-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Elite Services */}
      <section className="py-24 bg-cyber-dark relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block mb-4"
            >
              <span className="text-sm font-bold text-orange-400 uppercase tracking-wider">MISSION CRITICAL</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold text-white mb-6"
            >
              Deploy Elite Security
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
            >
              Most deployed security solutions by enterprise clients
            </motion.p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {popularServices.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
              >
                <Link
                  to={`/services/${service.id}`}
                  className="block group"
                >
                  <div className="cyber-card rounded-2xl overflow-hidden hover:neon-glow transition-all duration-300 h-full">
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={service.image}
                        alt={service.name}
                        className="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-110 transition-all duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-cyber-surface via-cyber-surface/50 to-transparent" />

                      <div className="absolute top-4 right-4 px-4 py-2 rounded-lg text-sm font-bold gradient-text cyber-surface neon-border">
                        ₹{service.price.toLocaleString('en-IN')}
                      </div>

                      {/* Scan Lines */}
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>

                    <div className="p-6">
                      <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-3">
                        {service.category}
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-3 group-hover:gradient-text transition-all">
                        {service.name}
                      </h3>
                      <p className="text-muted-foreground mb-6 leading-relaxed">
                        {service.shortDescription}
                      </p>
                      <div className="flex items-center justify-between pt-4 border-t border-border">
                        <span className="text-sm text-muted-foreground/80 font-medium">{service.duration}</span>
                        <span className="text-cyan-400 font-semibold group-hover:gap-2 flex items-center gap-1 transition-all">
                          Deploy
                          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <Link
              to="/services"
              className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-cyan-400 to-blue-600 font-bold rounded-xl neon-glow hover:scale-105 transition-transform text-white text-lg"
            >
              View All Solutions
              <ArrowRight className="h-6 w-6" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-cyber-darker relative overflow-hidden">
        <div className="absolute inset-0 cyber-grid opacity-30" />

        {/* Animated Background Elements */}
        <motion.div
          className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500 rounded-full blur-[100px] opacity-20"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500 rounded-full blur-[100px] opacity-20"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.25, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity, delay: 1 }}
        />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-block mb-8"
            >
              <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full cyber-surface neon-border">
                <ShieldCheck className="h-5 w-5 text-cyan-400" />
                <span className="text-sm font-bold text-muted-foreground uppercase tracking-wider">
                  ACTIVATE DEFENSE PROTOCOL
                </span>
              </div>
            </motion.div>

            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Ready to <span className="gradient-text">Secure</span> Your Infrastructure?
            </h2>

            <p className="text-xl text-muted-foreground mb-12 leading-relaxed max-w-3xl mx-auto">
              Deploy enterprise-grade cybersecurity solutions and protect your digital assets from advanced threats
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                to="/services"
                className="group inline-flex items-center justify-center gap-3 px-10 py-5 bg-gradient-to-r from-cyan-400 to-blue-600 font-bold rounded-xl neon-glow hover:scale-105 transition-all text-white text-lg"
              >
                <Shield className="h-6 w-6" />
                Deploy Security
                <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-transparent border-2 border-cyan-500/30 text-muted-foreground font-bold rounded-xl hover:bg-cyan-500/10 transition-all text-lg"
              >
                <Radar className="h-6 w-6" />
                Request Audit
              </Link>
            </div>

            {/* Security Badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-16 flex flex-wrap items-center justify-center gap-8"
            >
              {["ISO 27001", "SOC 2", "GDPR", "PCI DSS"].map((cert) => (
                <div key={cert} className="cyber-surface px-6 py-3 rounded-lg neon-border">
                  <span className="text-sm font-bold text-muted-foreground">{cert}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
