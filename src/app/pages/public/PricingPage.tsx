import { Link } from "react-router";
import { Check, ArrowRight, Sparkles, Shield, Zap } from "lucide-react";
import { motion } from "motion/react";

export function PricingPage() {
  const plans = [
    {
      name: "Starter",
      price: 499,
      period: "per service",
      description: "Perfect for individual projects and small businesses",
      features: [
        "Single service booking",
        "Basic support",
        "Email notifications",
        "Service history",
        "Standard response time",
      ],
      cta: "Get Started",
      popular: false,
    },
    {
      name: "Professional",
      price: 1499,
      period: "per month",
      description: "Ideal for growing businesses with regular needs",
      features: [
        "Up to 3 services per month",
        "Priority support",
        "Dedicated account manager",
        "Advanced analytics",
        "Custom service packages",
        "Fast-track booking",
        "Monthly consultation call",
      ],
      cta: "Start Free Trial",
      popular: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "tailored solution",
      description: "Comprehensive solution for large organizations",
      features: [
        "Unlimited services",
        "24/7 premium support",
        "Custom SLA agreements",
        "Multi-user management",
        "API access",
        "Advanced security features",
        "Dedicated team",
        "On-site consultations",
      ],
      cta: "Contact Sales",
      popular: false,
    },
  ];

  const addOns = [
    {
      name: "Priority Support",
      price: 99,
      period: "per month",
      description: "Get dedicated support with guaranteed response times",
      icon: Zap,
    },
    {
      name: "Advanced Security Package",
      price: 299,
      period: "per month",
      description: "24/7 monitoring and threat intelligence",
      icon: Shield,
    },
    {
      name: "Custom Integration",
      price: "From 499",
      period: "one-time",
      description: "Integrate our services with your existing tools",
      icon: Sparkles,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-gray-50">
      {/* Hero Section */}
      <section className="py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Sparkles className="h-4 w-4" />
              <span>Flexible Pricing for Every Need</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Choose Your{" "}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Perfect Plan
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Transparent pricing with no hidden fees. Pay-as-you-go or subscribe for better rates.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative bg-white rounded-2xl p-8 ${
                  plan.popular
                    ? "shadow-2xl ring-2 ring-blue-600 scale-105"
                    : "shadow-lg hover:shadow-xl"
                } transition-all`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-600">{plan.description}</p>
                </div>

                <div className="mb-6">
                  <div className="flex items-baseline gap-2">
                    {typeof plan.price === "number" ? (
                      <>
                        <span className="text-gray-500 text-lg">₹</span>
                        <span className="text-5xl font-bold text-gray-900">
                          {plan.price.toLocaleString("en-IN")}
                        </span>
                      </>
                    ) : (
                      <span className="text-5xl font-bold text-gray-900">{plan.price}</span>
                    )}
                  </div>
                  <p className="text-gray-600 mt-1">{plan.period}</p>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  to={plan.name === "Enterprise" ? "/contact" : "/auth/signup"}
                  className={`w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                    plan.popular
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-lg"
                      : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                  }`}
                >
                  {plan.cta}
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Add-ons Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Enhance Your Plan
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Customize your experience with premium add-ons
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {addOns.map((addon, index) => (
              <motion.div
                key={addon.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                  <addon.icon className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{addon.name}</h3>
                <p className="text-gray-600 mb-4">{addon.description}</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-gray-500">₹</span>
                  <span className="text-2xl font-bold text-gray-900">{addon.price}</span>
                  <span className="text-gray-600">/ {addon.period}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Pricing FAQs
            </h2>
          </motion.div>

          <div className="space-y-4">
            {[
              {
                q: "Can I switch plans anytime?",
                a: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.",
              },
              {
                q: "Is there a long-term commitment?",
                a: "No, all plans are month-to-month. You can cancel anytime without penalties.",
              },
              {
                q: "What payment methods do you accept?",
                a: "We accept all major credit cards, debit cards, UPI, net banking, and digital wallets.",
              },
              {
                q: "Do you offer refunds?",
                a: "Yes, we offer a 30-day money-back guarantee if you're not satisfied with our services.",
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-md"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.q}</h3>
                <p className="text-gray-600">{faq.a}</p>
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
            className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-12 text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Still Have Questions?
            </h2>
            <p className="text-blue-100 text-lg mb-8">
              Our team is here to help you choose the perfect plan for your needs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-blue-600 rounded-lg font-medium hover:bg-gray-100 transition-colors"
              >
                Contact Sales
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                to="/auth/signup"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-medium hover:bg-white/10 transition-colors"
              >
                Start Free Trial
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
