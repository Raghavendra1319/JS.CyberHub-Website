import { useState, useRef } from "react";
import { Mail, Phone, MapPin, Send, Check, Shield } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { toast } from "sonner";
import { projectId, publicAnonKey } from "/utils/supabase/info";
import { motion, useInView } from "motion/react";

export function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [emailVerification, setEmailVerification] = useState({
    sent: false,
    code: "",
    verified: false,
  });

  const [phoneVerification, setPhoneVerification] = useState({
    sent: false,
    code: "",
    verified: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const sendEmailVerification = async () => {
    if (!formData.email) {
      toast.error("Please enter your email first");
      return;
    }

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-98f33885/send-email-verification`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({ email: formData.email }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error || "Failed to send verification code");
        console.error("Error sending email verification:", data.error);
        return;
      }

      setEmailVerification({ ...emailVerification, sent: true });
      toast.success("Verification code sent to your email");
    } catch (error) {
      console.error("Error sending email verification:", error);
      toast.error("Failed to send verification code");
    }
  };

  const verifyEmail = async () => {
    if (!emailVerification.code) {
      toast.error("Please enter the verification code");
      return;
    }

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-98f33885/verify-email`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({ email: formData.email, code: emailVerification.code }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error || "Invalid verification code");
        console.error("Error verifying email:", data.error);
        return;
      }

      setEmailVerification({ ...emailVerification, verified: true });
      toast.success("Email verified successfully!");
    } catch (error) {
      console.error("Error verifying email:", error);
      toast.error("Failed to verify email");
    }
  };

  const sendPhoneVerification = async () => {
    if (!formData.phone) {
      toast.error("Please enter your phone number first");
      return;
    }

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-98f33885/send-sms-verification`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({ phone: formData.phone }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error || "Failed to send verification code");
        console.error("Error sending SMS verification:", data.error);
        return;
      }

      setPhoneVerification({ ...phoneVerification, sent: true });
      toast.success("Verification code sent to your phone");
    } catch (error) {
      console.error("Error sending SMS verification:", error);
      toast.error("Failed to send verification code");
    }
  };

  const verifyPhone = async () => {
    if (!phoneVerification.code) {
      toast.error("Please enter the verification code");
      return;
    }

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-98f33885/verify-sms`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({ phone: formData.phone, code: phoneVerification.code }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error || "Invalid verification code");
        console.error("Error verifying phone:", data.error);
        return;
      }

      setPhoneVerification({ ...phoneVerification, verified: true });
      toast.success("Phone verified successfully!");
    } catch (error) {
      console.error("Error verifying phone:", error);
      toast.error("Failed to verify phone");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!emailVerification.verified) {
      toast.error("Please verify your email address");
      return;
    }

    if (formData.phone && !phoneVerification.verified) {
      toast.error("Please verify your phone number");
      return;
    }

    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast.success("Thank you! We'll get back to you soon.");
      setFormData({ name: "", email: "", phone: "", message: "" });
      setEmailVerification({ sent: false, code: "", verified: false });
      setPhoneVerification({ sent: false, code: "", verified: false });
      setIsSubmitting(false);
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Reset verification when email or phone changes
    if (name === "email") {
      setEmailVerification({ sent: false, code: "", verified: false });
    }
    if (name === "phone") {
      setPhoneVerification({ sent: false, code: "", verified: false });
    }
  };

  return (
    <section id="contact" className="py-24 bg-gradient-to-b from-gray-50 to-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
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
            <Mail className="h-4 w-4" />
            <span>Contact Us</span>
          </motion.div>
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Get In Touch
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Ready to start your project? Contact us today and let's discuss how we can help your business grow.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <motion.div 
              className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200"
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Contact Information</h3>
              <div className="space-y-6">
                {[
                  { icon: Mail, label: "Email", value: "raghavendrakanade13@gmail.com", color: "blue" },
                  { icon: Phone, label: "Phone", value: "+91 8446173815", color: "green" },
                  { icon: MapPin, label: "Address", value: "24/159, Bhagyoday Nagar, Satara Parisar,\nBeed By Pass, Chhatrapati Sambhajinagar", color: "purple" }
                ].map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <motion.div 
                      key={index}
                      className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors"
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                      transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                      whileHover={{ x: 5 }}
                    >
                      <motion.div 
                        className={`w-12 h-12 bg-${item.color}-100 rounded-lg flex items-center justify-center flex-shrink-0`}
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Icon className={`h-6 w-6 text-${item.color}-600`} />
                      </motion.div>
                      <div>
                        <p className="font-semibold text-gray-900 mb-1">{item.label}</p>
                        <p className="text-gray-600" style={{ whiteSpace: 'pre-line' }}>{item.value}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            <motion.div 
              className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl p-8 text-white shadow-lg"
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              <h4 className="text-2xl font-semibold mb-6">Business Hours</h4>
              <div className="space-y-4">
                {[
                  { day: "Monday - Friday", hours: "9:00 AM - 6:00 PM" },
                  { day: "Saturday", hours: "10:00 AM - 4:00 PM" },
                  { day: "Sunday", hours: "Closed" }
                ].map((item, index) => (
                  <motion.div 
                    key={index}
                    className="flex justify-between items-center pb-3 border-b border-white/20"
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                    transition={{ duration: 0.4, delay: 1 + index * 0.1 }}
                  >
                    <span className="font-medium">{item.day}</span>
                    <span className="opacity-90">{item.hours}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div 
            className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm text-gray-700 mb-2">
                  Full Name *
                </label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm text-gray-700 mb-2">
                  Email Address *
                </label>
                <div className="flex gap-2">
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className="flex-1"
                  />
                  {!emailVerification.verified && (
                    <Button
                      type="button"
                      variant={emailVerification.sent ? "outline" : "default"}
                      size="sm"
                      onClick={sendEmailVerification}
                      disabled={emailVerification.sent || !formData.email}
                    >
                      <Shield className="h-4 w-4 mr-1" />
                      {emailVerification.sent ? "Sent" : "Verify"}
                    </Button>
                  )}
                  {emailVerification.verified && (
                    <Button type="button" variant="outline" size="sm" disabled>
                      <Check className="h-4 w-4 mr-1 text-green-600" />
                      Verified
                    </Button>
                  )}
                </div>
                {emailVerification.sent && !emailVerification.verified && (
                  <div className="mt-3 flex gap-2">
                    <Input
                      type="text"
                      value={emailVerification.code}
                      onChange={(e) =>
                        setEmailVerification({ ...emailVerification, code: e.target.value })
                      }
                      placeholder="Enter 6-digit code"
                      maxLength={6}
                      className="flex-1"
                    />
                    <Button type="button" size="sm" onClick={verifyEmail}>
                      Verify Code
                    </Button>
                  </div>
                )}
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm text-gray-700 mb-2">
                  Phone Number
                </label>
                <div className="flex gap-2">
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 1234567890"
                    className="flex-1"
                  />
                  {formData.phone && !phoneVerification.verified && (
                    <Button
                      type="button"
                      variant={phoneVerification.sent ? "outline" : "default"}
                      size="sm"
                      onClick={sendPhoneVerification}
                      disabled={phoneVerification.sent}
                    >
                      <Shield className="h-4 w-4 mr-1" />
                      {phoneVerification.sent ? "Sent" : "Verify"}
                    </Button>
                  )}
                  {phoneVerification.verified && (
                    <Button type="button" variant="outline" size="sm" disabled>
                      <Check className="h-4 w-4 mr-1 text-green-600" />
                      Verified
                    </Button>
                  )}
                </div>
                {phoneVerification.sent && !phoneVerification.verified && (
                  <div className="mt-3 flex gap-2">
                    <Input
                      type="text"
                      value={phoneVerification.code}
                      onChange={(e) =>
                        setPhoneVerification({ ...phoneVerification, code: e.target.value })
                      }
                      placeholder="Enter 6-digit code"
                      maxLength={6}
                      className="flex-1"
                    />
                    <Button type="button" size="sm" onClick={verifyPhone}>
                      Verify Code
                    </Button>
                  </div>
                )}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm text-gray-700 mb-2">
                  Message *
                </label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your project..."
                  rows={5}
                />
              </div>

              <Button type="submit" className="w-full group" disabled={isSubmitting}>
                Send Message
                <Send className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}