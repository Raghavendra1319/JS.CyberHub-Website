import { useParams, useNavigate, Link } from "react-router";
import { useState } from "react";
import { ArrowRight, ArrowLeft, CheckCircle, CreditCard, Smartphone, Building2, Wallet, Lock, Shield } from "lucide-react";
import { motion } from "motion/react";
import { services } from "../../data/services";
import { useBooking } from "../../context/BookingContext";
import { format } from "date-fns";

export function BookingPaymentPage() {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const { bookingData } = useBooking();
  
  const service = services.find(s => s.id === serviceId);
  const [selectedMethod, setSelectedMethod] = useState<string>("card");
  const [isProcessing, setIsProcessing] = useState(false);

  // Card form state
  const [cardData, setCardData] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: "",
  });

  if (!service || !bookingData.date || !bookingData.timeSlot || !bookingData.customerName) {
    navigate("/booking");
    return null;
  }

  const totalAmount = service.price + Math.round(service.price * 0.18);

  const paymentMethods = [
    { id: "card", name: "Credit/Debit Card", icon: CreditCard, description: "Visa, Mastercard, RuPay" },
    { id: "upi", name: "UPI", icon: Smartphone, description: "Google Pay, PhonePe, Paytm" },
    { id: "netbanking", name: "Net Banking", icon: Building2, description: "All major banks" },
    { id: "wallet", name: "Digital Wallet", icon: Wallet, description: "Paytm, Amazon Pay" },
  ];

  const handlePayment = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Generate a mock booking ID
    const bookingId = `BK${Date.now()}`;
    
    setIsProcessing(false);
    navigate(`/booking/confirmation/${bookingId}`);
  };

  const handleCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === "number") {
      // Format card number with spaces
      formattedValue = value.replace(/\s/g, "").replace(/(\d{4})/g, "$1 ").trim();
      if (formattedValue.length > 19) return;
    } else if (name === "expiry") {
      // Format expiry as MM/YY
      formattedValue = value.replace(/\D/g, "");
      if (formattedValue.length >= 2) {
        formattedValue = formattedValue.slice(0, 2) + "/" + formattedValue.slice(2, 4);
      }
      if (formattedValue.length > 5) return;
    } else if (name === "cvv") {
      formattedValue = value.replace(/\D/g, "").slice(0, 3);
    }

    setCardData(prev => ({ ...prev, [name]: formattedValue }));
  };

  return (
    <div className="min-h-screen bg-muted/20">
      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link
            to={`/booking/summary/${serviceId}`}
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>
          <h1 className="text-2xl font-bold text-foreground">Secure Payment</h1>
          <p className="text-muted-foreground mt-1">Complete your booking by making a secure payment</p>
        </div>
      </div>

      {/* Progress */}
      <div className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2">
            {["Select Service", "Date & Time", "Your Details", "Payment"].map((step, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className={`flex items-center gap-2 ${index <= 3 ? "text-cyan-500" : "text-muted-foreground/70"}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    index < 3 ? "bg-green-600 text-white" : index === 3 ? "bg-primary text-white" : "bg-muted text-muted-foreground"
                  }`}>
                    {index < 3 ? <CheckCircle className="h-5 w-5" /> : index + 1}
                  </div>
                  <span className="text-sm font-medium hidden sm:inline">{step}</span>
                </div>
                {index < 3 && <ArrowRight className="h-4 w-4 text-gray-300 hidden sm:block" />}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Payment Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Security Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-green-50 border border-green-200 rounded-xl p-4"
            >
              <div className="flex items-center gap-3">
                <Shield className="h-6 w-6 text-green-400" />
                <div>
                  <div className="font-semibold text-green-900">Secure Payment</div>
                  <div className="text-sm text-green-400">
                    Your payment information is encrypted and secure
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Payment Methods */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-card rounded-2xl p-6 shadow-lg"
            >
              <h2 className="text-xl font-bold text-foreground mb-4">Select Payment Method</h2>
              
              <div className="grid grid-cols-2 gap-3">
                {paymentMethods.map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setSelectedMethod(method.id)}
                    className={`p-4 rounded-xl border-2 transition-all text-left ${
                      selectedMethod === method.id
                        ? "border-blue-600 bg-card"
                        : "border-border hover:border-border"
                    }`}
                  >
                    <method.icon className={`h-6 w-6 mb-2 ${
                      selectedMethod === method.id ? "text-cyan-500" : "text-muted-foreground"
                    }`} />
                    <div className="font-semibold text-foreground text-sm mb-1">{method.name}</div>
                    <div className="text-xs text-muted-foreground">{method.description}</div>
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Payment Details Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-card rounded-2xl p-6 shadow-lg"
            >
              <h2 className="text-xl font-bold text-foreground mb-4">Payment Details</h2>

              {selectedMethod === "card" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground/80 mb-2">
                      Card Number
                    </label>
                    <div className="relative">
                      <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground/70" />
                      <input
                        type="text"
                        name="number"
                        value={cardData.number}
                        onChange={handleCardChange}
                        placeholder="1234 5678 9012 3456"
                        className="w-full pl-11 pr-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground/80 mb-2">
                      Cardholder Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={cardData.name}
                      onChange={handleCardChange}
                      placeholder="JOHN DOE"
                      className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none uppercase"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground/80 mb-2">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        name="expiry"
                        value={cardData.expiry}
                        onChange={handleCardChange}
                        placeholder="MM/YY"
                        className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground/80 mb-2">
                        CVV
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground/70" />
                        <input
                          type="password"
                          name="cvv"
                          value={cardData.cvv}
                          onChange={handleCardChange}
                          placeholder="123"
                          className="w-full pl-11 pr-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {selectedMethod === "upi" && (
                <div>
                  <label className="block text-sm font-medium text-foreground/80 mb-2">
                    UPI ID
                  </label>
                  <div className="relative">
                    <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground/70" />
                    <input
                      type="text"
                      placeholder="yourname@upi"
                      className="w-full pl-11 pr-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none"
                    />
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Enter your UPI ID to receive a payment request
                  </p>
                </div>
              )}

              {selectedMethod === "netbanking" && (
                <div>
                  <label className="block text-sm font-medium text-foreground/80 mb-2">
                    Select Your Bank
                  </label>
                  <select className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none">
                    <option value="">Choose your bank</option>
                    <option value="sbi">State Bank of India</option>
                    <option value="hdfc">HDFC Bank</option>
                    <option value="icici">ICICI Bank</option>
                    <option value="axis">Axis Bank</option>
                    <option value="kotak">Kotak Mahindra Bank</option>
                    <option value="pnb">Punjab National Bank</option>
                  </select>
                </div>
              )}

              {selectedMethod === "wallet" && (
                <div>
                  <label className="block text-sm font-medium text-foreground/80 mb-2">
                    Select Wallet
                  </label>
                  <div className="space-y-2">
                    {["Paytm", "Amazon Pay", "PhonePe Wallet", "Google Pay"].map((wallet) => (
                      <button
                        key={wallet}
                        className="w-full p-3 border border-border rounded-lg hover:border-blue-500 hover:bg-card transition-all text-left"
                      >
                        {wallet}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-card rounded-2xl p-6 shadow-lg sticky top-24"
            >
              <h3 className="font-semibold text-foreground mb-4">Order Summary</h3>
              
              <div className="space-y-3 mb-6">
                <div className="p-3 bg-muted/20 rounded-lg">
                  <div className="font-medium text-foreground mb-1">{service.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {format(bookingData.date!, "MMM d, yyyy")} at {bookingData.timeSlot}
                  </div>
                </div>

                <div className="space-y-2 py-3 border-t border-border">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Service Price</span>
                    <span className="text-foreground">₹{service.price}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">GST (18%)</span>
                    <span className="text-foreground">₹{Math.round(service.price * 0.18)}</span>
                  </div>
                </div>

                <div className="pt-3 border-t-2 border-border">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-foreground">Total</span>
                    <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
                      ₹{totalAmount}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={handlePayment}
                disabled={isProcessing}
                className="w-full px-6 py-4 bg-gradient-to-r from-cyan-400 to-blue-600 text-white font-medium rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Lock className="h-5 w-5" />
                    Pay ₹{totalAmount}
                  </>
                )}
              </button>

              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <Lock className="h-3 w-3" />
                <span>Secured by 256-bit SSL encryption</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
