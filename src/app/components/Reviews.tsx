import { Star, Quote, TrendingUp } from "lucide-react";
import { motion, useInView, AnimatePresence } from "motion/react";
import { useRef, useState, useEffect } from "react";

export function Reviews() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const [liveCount, setLiveCount] = useState(45);

  const reviews = [
    {
      name: "Priya Sharma",
      company: "TechStart India",
      role: "CEO",
      rating: 5,
      text: "JS.CyberHub helped us establish a robust security infrastructure from day one. Their fresh perspective and competitive pricing made them the perfect partner for our startup.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop"
    },
    {
      name: "Amit Patel",
      company: "Digital Solutions Hub",
      role: "Founder",
      rating: 5,
      text: "Outstanding service! The team's expertise in both cybersecurity and business consulting gave us the confidence to scale safely. Highly recommended for any growing business.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop"
    },
    {
      name: "Sneha Desai",
      company: "CloudVenture Labs",
      role: "CTO",
      rating: 5,
      text: "Their malware security and network protection solutions are top-notch. The personalized attention and 24/7 support have been invaluable to our operations.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop"
    },
    {
      name: "Rajesh Kumar",
      company: "InnovateTech",
      role: "Managing Director",
      rating: 5,
      text: "Working with JS.CyberHub was a game-changer. Their software development team delivered our application ahead of schedule with exceptional quality.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop"
    },
    {
      name: "Kavita Menon",
      company: "SecureBase Solutions",
      role: "Operations Manager",
      rating: 5,
      text: "The compliance auditing and security training provided by their team helped us meet all regulatory requirements smoothly. Professional and thorough!",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop"
    },
    {
      name: "Vikram Singh",
      company: "GrowthPath Consulting",
      role: "Business Head",
      rating: 5,
      text: "Their business consulting services helped us identify key growth opportunities. The risk management strategies they implemented have been crucial for our expansion.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop"
    }
  ];

  // Simulate real-time review counter
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveCount(prev => prev + 1);
    }, 8000); // New review every 8 seconds
    return () => clearInterval(interval);
  }, []);

  // Auto-rotate featured review
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentReviewIndex(prev => (prev + 1) % reviews.length);
    }, 5000); // Change every 5 seconds
    return () => clearInterval(interval);
  }, [reviews.length]);

  return (
    <section id="reviews" className="py-24 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden" ref={ref}>
      {/* Background decorative elements */}
      <motion.div 
        className="absolute top-1/4 left-0 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl opacity-40"
        animate={{
          scale: [1, 1.3, 1],
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
        className="absolute bottom-1/4 right-0 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl opacity-40"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, -50, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      ></motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Live Reviews Ticker */}
        <motion.div 
          className="mb-12 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-2xl p-1 overflow-hidden shadow-lg"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-card rounded-xl p-4 flex items-center gap-4">
            <div className="flex items-center gap-2 flex-shrink-0">
              <motion.div 
                className="w-3 h-3 bg-green-500 rounded-full"
                animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="font-semibold text-foreground">Live Reviews</span>
            </div>
            <div className="overflow-hidden flex-1">
              <motion.div
                className="flex gap-8"
                animate={{ x: [-1000, 0] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                {[...reviews, ...reviews].map((review, idx) => (
                  <div key={idx} className="flex items-center gap-2 flex-shrink-0">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-foreground/80 text-sm">
                      <strong>{review.name}</strong> from {review.company}
                    </span>
                  </div>
                ))}
              </motion.div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0 px-4 py-2 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-lg">
              <TrendingUp className="h-4 w-4 text-orange-600" />
              <span className="text-sm font-semibold text-orange-900">{liveCount}+ Reviews</span>
            </div>
          </div>
        </motion.div>

        {/* Featured Live Review */}
        <motion.div 
          className="mb-16 max-w-4xl mx-auto"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="bg-gradient-to-br from-card to-muted rounded-3xl p-8 md:p-12 relative overflow-hidden border border-border">
            <motion.div 
              className="absolute top-0 right-0 w-64 h-64 bg-blue-200 rounded-full blur-3xl opacity-30"
              animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <motion.div 
                    className="w-2 h-2 bg-red-500 rounded-full"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                  <span className="text-sm font-medium text-red-600">LIVE NOW</span>
                </div>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentReviewIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <p className="text-xl md:text-2xl text-foreground leading-relaxed mb-8 italic">
                    "{reviews[currentReviewIndex].text}"
                  </p>

                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden ring-4 ring-white shadow-lg">
                      <img 
                        src={reviews[currentReviewIndex].image} 
                        alt={reviews[currentReviewIndex].name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground text-lg">{reviews[currentReviewIndex].name}</h4>
                      <p className="text-muted-foreground">{reviews[currentReviewIndex].role}, {reviews[currentReviewIndex].company}</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Review navigation dots */}
              <div className="flex justify-center gap-2 mt-8">
                {reviews.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentReviewIndex(index)}
                    className="focus:outline-none"
                  >
                    <motion.div
                      className={`h-2 rounded-full transition-all ${
                        index === currentReviewIndex 
                          ? 'bg-primary w-8' 
                          : 'bg-blue-300 w-2 hover:bg-blue-400'
                      }`}
                      whileHover={{ scale: 1.2 }}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-400/10 to-blue-600/10 text-cyan-400 px-4 py-2 rounded-full text-sm font-medium mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
          >
            <Star className="h-4 w-4 fill-current" />
            <span>Client Reviews</span>
          </motion.div>
          
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-foreground mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            What Our <span className="bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">Clients Say</span>
          </motion.h2>
          
          <motion.p 
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Don't just take our word for it. Here's what our valued clients have to say about working with us.
          </motion.p>
        </div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              className="bg-card rounded-2xl p-8 shadow-lg border border-border hover:shadow-2xl transition-shadow relative group"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              whileHover={{ y: -5 }}
            >
              {/* Quote icon */}
              <motion.div 
                className="absolute top-6 right-6 text-cyan-100/70 group-hover:text-foreground/70 transition-colors"
                whileHover={{ rotate: 180, scale: 1.2 }}
                transition={{ duration: 0.3 }}
              >
                <Quote className="h-10 w-10" />
              </motion.div>

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                    transition={{ duration: 0.3, delay: 0.4 + (index * 0.1) + (i * 0.05) }}
                  >
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  </motion.div>
                ))}
              </div>

              {/* Review text */}
              <p className="text-foreground/80 leading-relaxed mb-6 relative z-10">
                "{review.text}"
              </p>

              {/* Client info */}
              <div className="flex items-center gap-4 pt-6 border-t border-border">
                <motion.div 
                  className="relative"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-blue-100">
                    <img 
                      src={review.image} 
                      alt={review.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <motion.div 
                    className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  ></motion.div>
                </motion.div>
                <div>
                  <h4 className="font-semibold text-foreground">{review.name}</h4>
                  <p className="text-sm text-muted-foreground">{review.role}, {review.company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats section */}
        <motion.div 
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          {[
            { label: "Happy Clients", value: "50+", color: "blue" },
            { label: "Projects Completed", value: "75+", color: "indigo" },
            { label: "5-Star Reviews", value: `${liveCount}+`, color: "yellow" },
            { label: "Client Retention", value: "95%", color: "green" }
          ].map((stat, index) => (
            <motion.div 
              key={index}
              className="text-center p-6 bg-card rounded-xl shadow-md border border-border"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.4, delay: 0.9 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <motion.div 
                className={`text-3xl md:text-4xl font-bold bg-gradient-to-r from-${stat.color}-600 to-${stat.color}-700 bg-clip-text text-transparent mb-2`}
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 1, delay: 1 + index * 0.1 }}
              >
                {stat.value}
              </motion.div>
              <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}