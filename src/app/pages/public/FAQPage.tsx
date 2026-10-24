import { useState } from "react";
import { ChevronDown, Search, HelpCircle, Shield, CreditCard, Users, Settings, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export function FAQPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const categories = [
    { id: "all", name: "All Questions", icon: HelpCircle },
    { id: "general", name: "General", icon: Sparkles },
    { id: "security", name: "Security", icon: Shield },
    { id: "billing", name: "Billing", icon: CreditCard },
    { id: "account", name: "Account", icon: Users },
    { id: "technical", name: "Technical", icon: Settings },
  ];

  const faqs = [
    {
      category: "general",
      question: "What services does JS.CyberHub offer?",
      answer: "We offer 11 core services across cybersecurity, custom development, business consulting, and training. Our services include malware security assessment, network security audit, custom website/app development, business strategy consulting, cybersecurity training, data recovery, compliance auditing, and more.",
    },
    {
      category: "general",
      question: "How do I book a service?",
      answer: "Booking is simple! Browse our services page, select the service you need, choose your preferred date and time, fill in the details, and complete the payment. You'll receive instant confirmation via email.",
    },
    {
      category: "general",
      question: "Do you provide services across India?",
      answer: "Yes! We serve clients across India. Many of our services can be delivered remotely, and for on-site requirements, we have a network of certified professionals in major cities.",
    },
    {
      category: "general",
      question: "How long does it take to get started?",
      answer: "For most services, you can book and get started within 24-48 hours. Complex projects like custom software development may require an initial consultation to understand your requirements.",
    },
    {
      category: "security",
      question: "How secure is my data with JS.CyberHub?",
      answer: "We take data security extremely seriously. All client data is encrypted using industry-standard protocols (AES-256), stored securely, and we maintain strict confidentiality agreements. We're ISO certified and GDPR compliant.",
    },
    {
      category: "security",
      question: "What happens during a security audit?",
      answer: "Our security audit includes comprehensive network scanning, vulnerability assessment, penetration testing, firewall configuration review, and access control evaluation. You'll receive a detailed report with actionable recommendations.",
    },
    {
      category: "security",
      question: "Do you provide ongoing security monitoring?",
      answer: "Yes, we offer ongoing security monitoring as part of our Premium and Enterprise plans. This includes 24/7 threat detection, regular security updates, and immediate incident response.",
    },
    {
      category: "security",
      question: "Can you help with compliance requirements?",
      answer: "Absolutely! Our compliance auditing service helps you meet regulatory requirements including GDPR, ISO 27001, PCI DSS, and industry-specific standards. We provide gap analysis, documentation, and implementation support.",
    },
    {
      category: "billing",
      question: "What payment methods do you accept?",
      answer: "We accept all major credit/debit cards, UPI, net banking, and digital wallets. For enterprise clients, we also offer invoice-based billing with NET-30 terms.",
    },
    {
      category: "billing",
      question: "Do you offer refunds?",
      answer: "Yes, we have a 30-day money-back guarantee for subscription plans. For project-based services, refund eligibility depends on the project stage and is outlined in your service agreement.",
    },
    {
      category: "billing",
      question: "Can I get a custom quote for my project?",
      answer: "Yes! For large projects or custom requirements, contact our sales team at raghavendrakanade13@gmail.com or call +91 8446173815. We'll provide a detailed proposal based on your needs.",
    },
    {
      category: "billing",
      question: "Are there any hidden fees?",
      answer: "No hidden fees! All pricing is transparent and clearly stated upfront. Any additional costs for add-ons or customizations will be discussed and approved before implementation.",
    },
    {
      category: "account",
      question: "How do I create an account?",
      answer: "Click 'Sign Up' in the top navigation, choose your role (User, Provider, or Admin), fill in your details, and verify your email. You can also sign up using Google OAuth for faster registration.",
    },
    {
      category: "account",
      question: "Can I switch between User and Provider roles?",
      answer: "Yes, you can have multiple roles. Go to your account settings and request role addition. Provider roles require verification of credentials before approval.",
    },
    {
      category: "account",
      question: "What if I forget my password?",
      answer: "Click 'Forgot Password' on the login page, enter your registered email, and you'll receive a password reset link. Follow the instructions to create a new password.",
    },
    {
      category: "account",
      question: "How do I update my profile information?",
      answer: "Log in to your dashboard, navigate to Profile Settings, and you can update your name, contact details, address, and preferences. Changes are saved instantly.",
    },
    {
      category: "technical",
      question: "What technologies do you use for development?",
      answer: "We use modern, industry-standard technologies including React, Node.js, Python, AWS/Azure cloud platforms, and more. The specific tech stack is chosen based on your project requirements.",
    },
    {
      category: "technical",
      question: "Do you provide post-launch support?",
      answer: "Yes! All development services include free support for the specified period (3-12 months depending on service). Extended support packages are available.",
    },
    {
      category: "technical",
      question: "Can you integrate with our existing systems?",
      answer: "Absolutely! We specialize in integrating with existing systems, databases, and third-party APIs. Our custom integration add-on service handles complex integration requirements.",
    },
    {
      category: "technical",
      question: "What is your response time for support tickets?",
      answer: "Standard support: 24-48 hours. Priority support: 4-8 hours. Enterprise 24/7 support: Immediate response with guaranteed SLA.",
    },
  ];

  const filteredFaqs = faqs.filter((faq) => {
    const matchesCategory = activeCategory === "all" || faq.category === activeCategory;
    const matchesSearch =
      searchQuery === "" ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

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
              <HelpCircle className="h-4 w-4" />
              <span>How Can We Help?</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Frequently Asked{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
                Questions
              </span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Find answers to common questions about our services, pricing, and platform
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground/70" />
                <input
                  type="text"
                  placeholder="Search for answers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-card border border-border rounded-xl shadow-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none text-foreground"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Category Filters */}
      <section className="pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category, index) => (
              <motion.button
                key={category.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                onClick={() => setActiveCategory(category.id)}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium transition-all ${
                  activeCategory === category.id
                    ? "bg-gradient-to-r from-cyan-400 to-blue-600 text-white shadow-lg"
                    : "bg-card text-foreground/80 hover:bg-muted/20 shadow"
                }`}
              >
                <category.icon className="h-4 w-4" />
                {category.name}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="py-12 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredFaqs.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card rounded-2xl p-12 text-center shadow-lg"
            >
              <div className="w-16 h-16 bg-muted/40 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-muted-foreground/70" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">No results found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or browse a different category
              </p>
            </motion.div>
          ) : (
            <div className="space-y-4">
              {filteredFaqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="bg-card rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full flex items-center justify-between p-6 text-left hover:bg-muted/20 transition-colors"
                  >
                    <span className="font-semibold text-foreground pr-8">{faq.question}</span>
                    <ChevronDown
                      className={`h-5 w-5 text-muted-foreground flex-shrink-0 transition-transform ${
                        openFaq === index ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {openFaq === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 text-muted-foreground leading-relaxed border-t border-border pt-4">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Still Have Questions Section */}
      <section className="py-20 bg-muted/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-r from-cyan-400 to-blue-600 rounded-2xl p-12 text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Still Have Questions?
            </h2>
            <p className="text-cyan-100/70 text-lg mb-8">
              Our team is here to help you. Reach out anytime!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-card text-cyan-500 rounded-lg font-medium hover:bg-muted/40 transition-colors"
              >
                Contact Support
              </a>
              <a
                href="tel:+918446173815"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-medium hover:bg-card/10 transition-colors"
              >
                Call +91 8446173815
              </a>
            </div>
            <div className="mt-6 text-cyan-100/70">
              <p>Email: raghavendrakanade13@gmail.com</p>
              <p className="mt-1">Chhatrapati Sambhajinagar, Maharashtra</p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
