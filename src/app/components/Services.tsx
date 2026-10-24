import { Briefcase, Shield, ShieldAlert, Smartphone, HardDrive, Lock, Users, FileCheck, Code, Globe, Layers, X, CheckCircle, ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { motion, useInView, AnimatePresence } from "motion/react";
import { useRef, useState } from "react";

const services = [
  {
    icon: ShieldAlert,
    title: "Malware Security",
    description: "Advanced protection against malware, viruses, and cyber threats to keep your systems safe.",
    gradient: "from-red-500 to-orange-500",
    detailedInfo: {
      overview: "Comprehensive malware protection powered by cutting-edge threat detection technology. Our solutions provide real-time monitoring, automated threat response, and continuous system scans to keep your infrastructure secure.",
      features: [
        "Real-time malware detection and removal",
        "Advanced behavioral analysis",
        "Zero-day threat protection",
        "Automated security updates",
        "Quarantine and recovery systems",
        "24/7 threat monitoring"
      ],
      benefits: [
        "Protect sensitive business data from ransomware and viruses",
        "Minimize downtime from security incidents",
        "Maintain customer trust with robust security",
        "Compliance with security standards"
      ]
    }
  },
  {
    icon: Smartphone,
    title: "Device Protection",
    description: "Comprehensive security solutions for all your devices, from mobile to desktop.",
    gradient: "from-purple-500 to-pink-500",
    detailedInfo: {
      overview: "Secure every endpoint in your organization with unified device management and protection. From smartphones to workstations, we ensure all devices meet your security standards and policies.",
      features: [
        "Multi-platform device management",
        "Remote wipe and lock capabilities",
        "App whitelisting and blacklisting",
        "Encryption enforcement",
        "Lost device tracking",
        "Automatic policy enforcement"
      ],
      benefits: [
        "Secure BYOD and remote work environments",
        "Centralized device visibility and control",
        "Prevent data leaks from lost or stolen devices",
        "Simplified compliance management"
      ]
    }
  },
  {
    icon: HardDrive,
    title: "Data Recovery",
    description: "Expert data recovery services to restore lost or corrupted files and databases.",
    gradient: "from-cyan-500 to-blue-500",
    detailedInfo: {
      overview: "Professional data recovery services that salvage critical business information from hardware failures, accidental deletions, or cyberattacks. Our experts use advanced techniques to recover your valuable data.",
      features: [
        "Hardware failure recovery",
        "Deleted file restoration",
        "Database reconstruction",
        "RAID and server recovery",
        "Cloud backup integration",
        "Emergency recovery services"
      ],
      benefits: [
        "Minimize business disruption from data loss",
        "Recover critical financial and operational data",
        "Restore customer databases and records",
        "Fast turnaround for emergency situations"
      ]
    }
  },
  {
    icon: Lock,
    title: "Network Security",
    description: "Protect your business network from unauthorized access and cyber attacks.",
    gradient: "from-cyan-400 to-blue-600",
    detailedInfo: {
      overview: "Enterprise-grade network security infrastructure that defends against intrusions, DDoS attacks, and unauthorized access. We design and implement multi-layered security architectures tailored to your business needs.",
      features: [
        "Firewall configuration and management",
        "Intrusion detection and prevention",
        "VPN and secure remote access",
        "Network segmentation",
        "Traffic monitoring and analysis",
        "DDoS protection"
      ],
      benefits: [
        "Prevent unauthorized network access",
        "Secure remote workforce connections",
        "Protect against data exfiltration",
        "Meet regulatory network security requirements"
      ]
    }
  },
  {
    icon: Shield,
    title: "Risk Management",
    description: "Identify and mitigate security risks to protect your business and ensure continuity.",
    gradient: "from-green-500 to-emerald-500",
    detailedInfo: {
      overview: "Comprehensive risk assessment and management services that identify vulnerabilities, evaluate threats, and implement mitigation strategies. We help you build resilient security posture and business continuity plans.",
      features: [
        "Vulnerability assessments",
        "Penetration testing",
        "Risk analysis and scoring",
        "Security roadmap development",
        "Business impact analysis",
        "Incident response planning"
      ],
      benefits: [
        "Proactively identify security weaknesses",
        "Prioritize security investments effectively",
        "Reduce likelihood and impact of breaches",
        "Build stakeholder confidence"
      ]
    }
  },
  {
    icon: Briefcase,
    title: "Business Consulting",
    description: "Strategic guidance to help your business grow, scale, and overcome challenges.",
    gradient: "from-cyan-400 to-blue-600",
    detailedInfo: {
      overview: "Expert business consulting services that provide strategic insights, operational improvements, and growth strategies. We partner with startups and SMBs to navigate challenges and capitalize on opportunities.",
      features: [
        "Business strategy development",
        "Market analysis and positioning",
        "Operational efficiency consulting",
        "Digital transformation guidance",
        "Financial planning support",
        "Growth and scaling strategies"
      ],
      benefits: [
        "Make informed strategic decisions",
        "Optimize operations and reduce costs",
        "Accelerate growth and market expansion",
        "Navigate complex business challenges"
      ]
    }
  },
  {
    icon: Users,
    title: "Security Training",
    description: "Educate your team on cybersecurity best practices and threat prevention.",
    gradient: "from-yellow-500 to-orange-500",
    detailedInfo: {
      overview: "Comprehensive security awareness training programs that transform your employees into your first line of defense. We provide engaging, practical training that builds a strong security culture.",
      features: [
        "Phishing simulation exercises",
        "Security awareness workshops",
        "Role-specific training modules",
        "Compliance training programs",
        "Social engineering defense",
        "Incident reporting procedures"
      ],
      benefits: [
        "Reduce human error in security incidents",
        "Build security-conscious workforce",
        "Meet compliance training requirements",
        "Improve incident detection and reporting"
      ]
    }
  },
  {
    icon: FileCheck,
    title: "Compliance & Auditing",
    description: "Ensure your business meets security standards and regulatory requirements.",
    gradient: "from-teal-500 to-cyan-500",
    detailedInfo: {
      overview: "Professional compliance and security auditing services that ensure your organization meets industry standards and regulatory requirements. We help you navigate complex compliance landscapes with confidence.",
      features: [
        "GDPR compliance assessment",
        "ISO 27001 implementation",
        "SOC 2 audit preparation",
        "HIPAA security reviews",
        "PCI DSS compliance",
        "Regular compliance monitoring"
      ],
      benefits: [
        "Avoid regulatory fines and penalties",
        "Win more enterprise customers",
        "Demonstrate security commitment",
        "Streamline audit processes"
      ]
    }
  },
  {
    icon: Code,
    title: "Software Development",
    description: "Custom software solutions built to meet your specific business requirements and goals.",
    gradient: "from-violet-500 to-purple-500",
    detailedInfo: {
      overview: "Full-stack software development services that deliver secure, scalable, and maintainable solutions. From MVPs to enterprise applications, we bring your vision to life with modern technologies and agile methodologies.",
      features: [
        "Custom application development",
        "API design and integration",
        "Cloud-native architecture",
        "Microservices development",
        "Legacy system modernization",
        "DevOps and CI/CD implementation"
      ],
      benefits: [
        "Accelerate digital transformation",
        "Automate business processes",
        "Gain competitive advantage",
        "Scale efficiently with demand"
      ]
    }
  },
  {
    icon: Globe,
    title: "Website Development",
    description: "Professional, responsive websites that engage users and drive conversions.",
    gradient: "from-cyan-500 to-teal-500",
    detailedInfo: {
      overview: "Modern, high-performance website development that creates stunning digital experiences. We build responsive, SEO-optimized websites that convert visitors into customers and grow with your business.",
      features: [
        "Responsive web design",
        "E-commerce solutions",
        "Content management systems",
        "SEO optimization",
        "Performance optimization",
        "Analytics integration"
      ],
      benefits: [
        "Establish strong online presence",
        "Generate more leads and sales",
        "Improve customer engagement",
        "Build brand credibility"
      ]
    }
  },
  {
    icon: Layers,
    title: "Application Development",
    description: "Native and cross-platform mobile and web applications with seamless user experiences.",
    gradient: "from-pink-500 to-rose-500",
    detailedInfo: {
      overview: "End-to-end mobile and web application development that delivers exceptional user experiences across all platforms. We create intuitive, feature-rich applications that users love and businesses depend on.",
      features: [
        "iOS and Android development",
        "Cross-platform frameworks",
        "Progressive web apps (PWA)",
        "Real-time functionality",
        "Offline capabilities",
        "App store optimization"
      ],
      benefits: [
        "Reach customers on their preferred devices",
        "Increase user engagement and retention",
        "Enable mobile-first business models",
        "Create new revenue streams"
      ]
    }
  },
];

export function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null);

  return (
    <section id="services" className="py-24 bg-gradient-to-b from-white to-gray-50" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div 
            className="inline-flex items-center gap-2 bg-cyan-500/15 text-cyan-400 px-4 py-2 rounded-full text-sm font-medium mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Shield className="h-4 w-4" />
            <span>Comprehensive Solutions</span>
          </motion.div>
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-foreground mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Our Services
          </motion.h2>
          <motion.p 
            className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Expert security solutions, custom development, and strategic business guidance to protect and elevate your business to new heights.
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ 
                  duration: 0.5, 
                  delay: 0.5 + index * 0.1,
                  ease: "easeOut"
                }}
              >
                <motion.div
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedService(service)}
                  className="cursor-pointer"
                >
                  <Card className="hover:shadow-xl transition-all duration-300 border-border group h-full">
                    <CardHeader>
                      <motion.div 
                        className={`w-14 h-14 bg-gradient-to-br ${service.gradient} rounded-xl flex items-center justify-center mb-4 shadow-lg`}
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                      >
                        <Icon className="h-7 w-7 text-white" />
                      </motion.div>
                      <CardTitle className="text-xl font-semibold">{service.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base text-muted-foreground leading-relaxed mb-4">
                        {service.description}
                      </CardDescription>
                      <div className="flex items-center gap-2 text-cyan-500 font-medium text-sm group-hover:gap-3 transition-all">
                        <span>Learn More</span>
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA Section */}
        <motion.div 
          className="mt-16 text-center bg-gradient-to-r from-cyan-400 to-blue-600 rounded-2xl p-12 text-white shadow-xl relative overflow-hidden"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.6, delay: 1.5 }}
        >
          <motion.div
            className="absolute inset-0 opacity-20"
            animate={{
              backgroundPosition: ["0% 0%", "100% 100%"],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            style={{
              backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
              backgroundSize: "50px 50px",
            }}
          />
          <div className="relative z-10">
            <motion.h3 
              className="text-3xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 1.7 }}
            >
              Ready to Transform Your Business?
            </motion.h3>
            <motion.p 
              className="text-xl mb-8 opacity-90"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 1.8 }}
            >
              Let's discuss how our services can help you achieve your goals.
            </motion.p>
            <motion.button 
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="bg-card text-cyan-500 px-8 py-4 rounded-lg font-semibold hover:bg-muted/40 transition-colors shadow-lg text-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 1.9 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Schedule a Consultation
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Service Details Modal */}
      <AnimatePresence>
        {selectedService && (
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedService(null)}
          >
            <motion.div
              className="bg-card rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className={`bg-gradient-to-br ${selectedService.gradient} p-8 text-white relative overflow-hidden`}>
                <motion.div
                  className="absolute inset-0 opacity-20"
                  animate={{
                    backgroundPosition: ["0% 0%", "100% 100%"],
                  }}
                  transition={{
                    duration: 15,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                  style={{
                    backgroundImage: "radial-gradient(circle, white 2px, transparent 2px)",
                    backgroundSize: "30px 30px",
                  }}
                />
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <motion.div 
                      className="w-16 h-16 bg-card/20 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg"
                      initial={{ rotate: -180, scale: 0 }}
                      animate={{ rotate: 0, scale: 1 }}
                      transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    >
                      <selectedService.icon className="h-8 w-8 text-white" />
                    </motion.div>
                    <motion.button
                      onClick={() => setSelectedService(null)}
                      className="w-10 h-10 bg-card/20 backdrop-blur-sm hover:bg-card/30 rounded-lg flex items-center justify-center transition-colors"
                      whileHover={{ scale: 1.1, rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <X className="h-5 w-5" />
                    </motion.button>
                  </div>
                  <motion.h2 
                    className="text-3xl md:text-4xl font-bold mb-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    {selectedService.title}
                  </motion.h2>
                  <motion.p 
                    className="text-white/90 text-lg"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    {selectedService.description}
                  </motion.p>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-8">
                {/* Overview */}
                <motion.div 
                  className="mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <h3 className="text-2xl font-bold text-foreground mb-4">Overview</h3>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    {selectedService.detailedInfo.overview}
                  </p>
                </motion.div>

                {/* Features */}
                <motion.div 
                  className="mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <h3 className="text-2xl font-bold text-foreground mb-4">Key Features</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {selectedService.detailedInfo.features.map((feature, index) => (
                      <motion.div
                        key={index}
                        className="flex items-start gap-3 bg-muted/20 p-4 rounded-lg"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + index * 0.05 }}
                      >
                        <CheckCircle className={`h-5 w-5 text-green-400 flex-shrink-0 mt-0.5`} />
                        <span className="text-foreground/80">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Benefits */}
                <motion.div 
                  className="mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <h3 className="text-2xl font-bold text-foreground mb-4">Business Benefits</h3>
                  <div className="space-y-3">
                    {selectedService.detailedInfo.benefits.map((benefit, index) => (
                      <motion.div
                        key={index}
                        className="flex items-start gap-3 p-4 bg-card border border-border rounded-lg"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.7 + index * 0.05 }}
                      >
                        <div className={`w-6 h-6 bg-gradient-to-br ${selectedService.gradient} rounded-full flex items-center justify-center flex-shrink-0 mt-0.5`}>
                          <span className="text-white text-xs font-bold">{index + 1}</span>
                        </div>
                        <span className="text-foreground/80">{benefit}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* CTA */}
                <motion.div 
                  className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-border"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <motion.button
                    onClick={() => {
                      setSelectedService(null);
                      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className={`flex-1 bg-gradient-to-r ${selectedService.gradient} text-white px-6 py-4 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all text-lg`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Get Started Today
                  </motion.button>
                  <motion.button
                    onClick={() => setSelectedService(null)}
                    className="px-6 py-4 border-2 border-border rounded-lg font-semibold text-foreground/80 hover:border-cyan-500/40 hover:bg-muted/20 transition-all"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Close
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}