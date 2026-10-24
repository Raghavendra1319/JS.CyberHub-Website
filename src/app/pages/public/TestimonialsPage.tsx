import { Star, Quote, Building2, MapPin, Sparkles } from "lucide-react";
import { motion } from "motion/react";

export function TestimonialsPage() {
  const testimonials = [
    {
      id: 1,
      name: "Rajesh Kumar",
      role: "CTO",
      company: "TechVision Solutions",
      location: "Mumbai, Maharashtra",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
      rating: 5,
      text: "JS.CyberHub transformed our security infrastructure. Their malware assessment and network audit services were exceptional. We've seen a 95% reduction in security incidents since implementing their recommendations.",
      service: "Network Security Audit",
      date: "February 2026",
    },
    {
      id: 2,
      name: "Priya Sharma",
      role: "Founder & CEO",
      company: "HealthTech Innovations",
      location: "Pune, Maharashtra",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
      rating: 5,
      text: "The custom software development team at JS.CyberHub delivered beyond our expectations. They built a robust patient management system that has streamlined our operations completely. Highly professional!",
      service: "Custom Software Development",
      date: "January 2026",
    },
    {
      id: 3,
      name: "Amit Patel",
      role: "Managing Director",
      company: "Global Exports Ltd",
      location: "Chhatrapati Sambhajinagar, Maharashtra",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop",
      rating: 5,
      text: "Their business consulting services helped us identify new growth opportunities. The strategic guidance we received was invaluable. Revenue increased by 40% in just 6 months!",
      service: "Business Strategy Consulting",
      date: "December 2025",
    },
    {
      id: 4,
      name: "Sneha Desai",
      role: "IT Manager",
      company: "EduLearn Platform",
      location: "Bangalore, Karnataka",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop",
      rating: 5,
      text: "The cybersecurity training workshop was excellent! Our entire team now understands security best practices. The phishing simulation exercise was eye-opening and highly effective.",
      service: "Cybersecurity Training",
      date: "March 2026",
    },
    {
      id: 5,
      name: "Vikram Singh",
      role: "VP Technology",
      company: "FinanceFirst Bank",
      location: "Delhi NCR",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop",
      rating: 5,
      text: "Exceptional compliance auditing service. They helped us achieve ISO certification and ensure GDPR compliance. The documentation and guidance were thorough and professional.",
      service: "Compliance Auditing",
      date: "November 2025",
    },
    {
      id: 6,
      name: "Anjali Mehta",
      role: "Product Manager",
      company: "ShopEasy E-commerce",
      location: "Hyderabad, Telangana",
      image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&h=200&fit=crop",
      rating: 5,
      text: "Our mobile app developed by JS.CyberHub has received amazing feedback from users. The UI/UX is intuitive, performance is excellent, and they provided great post-launch support too.",
      service: "Mobile App Development",
      date: "January 2026",
    },
    {
      id: 7,
      name: "Karthik Reddy",
      role: "Operations Head",
      company: "LogiTrans Solutions",
      location: "Chennai, Tamil Nadu",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop",
      rating: 5,
      text: "When we faced a critical data loss situation, JS.CyberHub's data recovery team saved us. They recovered 98% of our data and set up a robust backup system. True lifesavers!",
      service: "Data Recovery Service",
      date: "February 2026",
    },
    {
      id: 8,
      name: "Meera Iyer",
      role: "Director",
      company: "Creative Studio X",
      location: "Kochi, Kerala",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop",
      rating: 5,
      text: "The website they developed for our creative studio perfectly captures our brand identity. It's fast, responsive, and our client inquiries have tripled since the launch!",
      service: "Custom Website Development",
      date: "December 2025",
    },
    {
      id: 9,
      name: "Rohit Kulkarni",
      role: "Risk Manager",
      company: "Insurance Plus",
      location: "Nagpur, Maharashtra",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop",
      rating: 5,
      text: "Their IT risk management service identified vulnerabilities we didn't even know existed. The mitigation strategies were practical and effective. Highly recommend their services!",
      service: "IT Risk Management",
      date: "January 2026",
    },
  ];

  const stats = [
    { label: "Happy Clients", value: "500+" },
    { label: "Projects Completed", value: "1,200+" },
    { label: "Average Rating", value: "4.9/5" },
    { label: "Client Retention", value: "95%" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-cyan-500/15 text-cyan-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Sparkles className="h-4 w-4" />
              <span>Trusted by Industry Leaders</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              What Our{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
                Clients Say
              </span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Read success stories from businesses that transformed their operations with our services
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-card rounded-2xl p-6 text-center shadow-lg"
              >
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-muted-foreground font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-card rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all"
              >
                {/* Quote Icon */}
                <div className="w-12 h-12 bg-cyan-500/15 rounded-xl flex items-center justify-center mb-4">
                  <Quote className="h-6 w-6 text-cyan-500" />
                </div>

                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Testimonial Text */}
                <p className="text-foreground/80 mb-6 leading-relaxed">{testimonial.text}</p>

                {/* Service Badge */}
                <div className="inline-flex items-center gap-2 bg-card text-cyan-400 px-3 py-1 rounded-full text-sm mb-4">
                  <span className="font-medium">{testimonial.service}</span>
                </div>

                {/* Author Info */}
                <div className="flex items-center gap-4 pt-4 border-t border-border">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="font-semibold text-foreground">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                      <Building2 className="h-3 w-3" />
                      <span>{testimonial.company}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                      <MapPin className="h-3 w-3" />
                      <span>{testimonial.location}</span>
                    </div>
                  </div>
                </div>

                {/* Date */}
                <div className="text-xs text-muted-foreground/70 mt-3">{testimonial.date}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Testimonials Section */}
      <section className="py-20 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Video Testimonials
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Hear directly from our satisfied clients
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {[1, 2].map((_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                className="bg-card rounded-2xl p-4 shadow-lg"
              >
                <div className="aspect-video bg-gradient-to-br from-cyan-400/10 to-blue-600/10 rounded-xl flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-card rounded-full flex items-center justify-center mx-auto mb-3 shadow-md">
                      <svg
                        className="w-6 h-6 text-cyan-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                      </svg>
                    </div>
                    <p className="text-muted-foreground font-medium">Video Coming Soon</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-r from-cyan-400 to-blue-600 rounded-2xl p-12 text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Join Our Success Stories?
            </h2>
            <p className="text-cyan-100/70 text-lg mb-8">
              Start your transformation journey with JS.CyberHub today
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/services"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-card text-cyan-500 rounded-lg font-medium hover:bg-muted/40 transition-colors"
              >
                Browse Services
              </a>
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-medium hover:bg-card/10 transition-colors"
              >
                Contact Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
