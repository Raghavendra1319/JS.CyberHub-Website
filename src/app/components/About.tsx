import { CheckCircle, Award, Users, TrendingUp, Shield } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { motion, useInView } from "motion/react";
import { useRef } from "react";

export function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const features = [
    {
      icon: Shield,
      title: "Fresh Perspective",
      description: "Modern approach to security challenges with innovative thinking"
    },
    {
      icon: Award,
      title: "Certified Professionals",
      description: "Dedicated team of certified security and development experts"
    },
    {
      icon: Users,
      title: "Personalized Service",
      description: "Individual attention and customized solutions for every client"
    },
    {
      icon: TrendingUp,
      title: "Competitive Pricing",
      description: "Affordable rates tailored for startups and growing businesses"
    },
  ];

  return (
    <section id="about" className="py-24 bg-white relative overflow-hidden" ref={ref}>
      {/* Background decorative elements */}
      <motion.div 
        className="absolute top-0 left-0 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-50"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 30, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      ></motion.div>
      <motion.div 
        className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-50 rounded-full blur-3xl opacity-50"
        animate={{
          scale: [1, 1.3, 1],
          x: [0, -30, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      ></motion.div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-5 gap-16 items-center">
          <motion.div 
            className="relative order-2 lg:order-1 lg:col-span-3"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl opacity-10 blur-2xl"></div>
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1703355685639-d558d1b0f63e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3b3Jrc3BhY2UlMjBvZmZpY2V8ZW58MXx8fHwxNzY3NzAyODA2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Modern workspace"
              className="rounded-2xl shadow-2xl w-full h-auto relative z-10 border border-gray-200"
            />
            {/* Stats card */}
            <motion.div 
              className="absolute -top-6 -right-6 bg-white rounded-xl shadow-xl p-6 border border-gray-100 hidden lg:block"
              initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
              animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : { opacity: 0, scale: 0.8, rotate: -10 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              whileHover={{ scale: 1.05, rotate: 5 }}
            >
              <div className="flex items-center gap-4">
                <motion.div 
                  className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <Users className="h-6 w-6 text-white" />
                </motion.div>
                <div>
                  <motion.div 
                    className="text-2xl font-bold text-gray-900"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 1, delay: 0.8 }}
                  >
                    50+
                  </motion.div>
                  <div className="text-sm text-gray-600">Happy Clients</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
          
          <div className="space-y-8 order-1 lg:order-2 lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div 
                className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-4"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Award className="h-4 w-4" />
                <span>About Our Company</span>
              </motion.div>
              <motion.h2 
                className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                Why Choose <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">JS.CyberHub</span>?
              </motion.h2>
              <motion.p 
                className="text-lg text-gray-600 leading-relaxed mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                As a newly launched startup, we bring fresh energy, innovative thinking, and a personal touch to cybersecurity, software development, and business consulting. Our team of certified experts is passionate about helping businesses like yours establish strong security foundations and sustainable growth strategies from day one.
              </motion.p>
              <motion.p 
                className="text-lg text-gray-600 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                We're building our reputation one satisfied client at a time, delivering excellence in every project we undertake.
              </motion.p>
            </motion.div>

            <div className="grid sm:grid-cols-2 gap-6">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div 
                    key={index} 
                    className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors group"
                    initial={{ opacity: 0, x: -30 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                    whileHover={{ x: 5 }}
                  >
                    <motion.div 
                      className="w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0"
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Icon className="h-6 w-6 text-blue-600" />
                    </motion.div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{feature.title}</h3>
                      <p className="text-sm text-gray-600">{feature.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Trust badges */}
            <motion.div 
              className="flex flex-wrap gap-4 pt-6 border-t border-gray-200"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              {[
                { label: "24/7 Support", color: "blue" },
                { label: "Expert Team", color: "purple" }
              ].map((badge, index) => (
                <motion.div 
                  key={index}
                  className={`flex items-center gap-2 bg-${badge.color}-50 px-4 py-2 rounded-lg`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.4, delay: 1.1 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <CheckCircle className={`h-5 w-5 text-${badge.color}-600`} />
                  <span className={`text-sm font-medium text-${badge.color}-900`}>{badge.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}