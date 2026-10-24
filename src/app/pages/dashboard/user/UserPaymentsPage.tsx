import { useState } from "react";
import { CreditCard, Download, Calendar, Check, DollarSign, TrendingUp, Filter } from "lucide-react";
import { motion } from "motion/react";
import { format } from "date-fns";

export function UserPaymentsPage() {
  const [filterPeriod, setFilterPeriod] = useState("all");

  // Mock data
  const paymentHistory = [
    {
      id: "PAY1709543210",
      bookingId: "BK1709543210",
      service: "Network Security Audit",
      amount: 943,
      date: new Date(2026, 1, 20),
      method: "Credit Card",
      status: "completed",
      cardLast4: "4242",
    },
    {
      id: "PAY1708234567",
      bookingId: "BK1708234567",
      service: "Custom Website Development",
      amount: 3539,
      date: new Date(2026, 1, 18),
      method: "UPI",
      status: "completed",
      upiId: "user@upi",
    },
    {
      id: "PAY1707123456",
      bookingId: "BK1707123456",
      service: "Business Strategy Consulting",
      amount: 707,
      date: new Date(2026, 0, 15),
      method: "Net Banking",
      status: "completed",
      bank: "HDFC Bank",
    },
    {
      id: "PAY1706987654",
      bookingId: "BK1706987654",
      service: "Cybersecurity Training",
      amount: 1061,
      date: new Date(2025, 11, 28),
      method: "Credit Card",
      status: "completed",
      cardLast4: "8888",
    },
    {
      id: "PAY1705876543",
      bookingId: "BK1705876543",
      service: "Data Recovery Service",
      amount: 825,
      date: new Date(2025, 11, 10),
      method: "Digital Wallet",
      status: "completed",
      wallet: "Paytm",
    },
  ];

  const savedCards = [
    {
      id: "card1",
      type: "Visa",
      last4: "4242",
      expiry: "12/26",
      isDefault: true,
    },
    {
      id: "card2",
      type: "Mastercard",
      last4: "8888",
      expiry: "09/27",
      isDefault: false,
    },
  ];

  const stats = {
    totalSpent: paymentHistory.reduce((sum, p) => sum + p.amount, 0),
    thisMonth: paymentHistory
      .filter((p) => p.date.getMonth() === new Date().getMonth())
      .reduce((sum, p) => sum + p.amount, 0),
    totalTransactions: paymentHistory.length,
  };

  const getPaymentMethodIcon = (method: string) => {
    return <CreditCard className="h-5 w-5 text-cyan-500" />;
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Payments & Billing</h1>
        <p className="text-muted-foreground mt-1">Manage your payment methods and view transaction history</p>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-cyan-400 to-blue-600 rounded-2xl p-6 text-white shadow-lg"
        >
          <div className="flex items-center justify-between mb-4">
            <DollarSign className="h-8 w-8 opacity-80" />
            <TrendingUp className="h-5 w-5 opacity-80" />
          </div>
          <div className="text-3xl font-bold mb-1">
            ₹{stats.totalSpent.toLocaleString("en-IN")}
          </div>
          <div className="text-cyan-100/70">Total Spent</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card rounded-2xl p-6 shadow-lg"
        >
          <div className="flex items-center justify-between mb-4">
            <Calendar className="h-8 w-8 text-cyan-500" />
            <div className="text-xs text-muted-foreground bg-muted/40 px-2 py-1 rounded">
              This Month
            </div>
          </div>
          <div className="text-3xl font-bold text-foreground mb-1">
            ₹{stats.thisMonth.toLocaleString("en-IN")}
          </div>
          <div className="text-muted-foreground">Current Month</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card rounded-2xl p-6 shadow-lg"
        >
          <div className="flex items-center justify-between mb-4">
            <Check className="h-8 w-8 text-green-400" />
          </div>
          <div className="text-3xl font-bold text-foreground mb-1">
            {stats.totalTransactions}
          </div>
          <div className="text-muted-foreground">Transactions</div>
        </motion.div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Payment Methods */}
        <div className="lg:col-span-1">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-card rounded-2xl p-6 shadow-lg"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-foreground">Payment Methods</h3>
              <button className="text-cyan-500 hover:text-cyan-400 text-sm font-medium">
                + Add New
              </button>
            </div>

            <div className="space-y-3">
              {savedCards.map((card) => (
                <div
                  key={card.id}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    card.isDefault
                      ? "border-blue-500 bg-card"
                      : "border-border hover:border-border"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
                        {card.type === "Visa" ? "V" : "M"}
                      </div>
                      <div>
                        <div className="font-semibold text-foreground">{card.type}</div>
                        <div className="text-sm text-muted-foreground">•••• {card.last4}</div>
                      </div>
                    </div>
                    {card.isDefault && (
                      <span className="bg-green-500/15 text-green-400 text-xs px-2 py-1 rounded-full font-medium">
                        Default
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-muted-foreground">Expires {card.expiry}</div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
              <div className="text-sm text-cyan-300">
                <strong>Secure Payments:</strong> All payment information is encrypted and
                securely stored.
              </div>
            </div>
          </motion.div>
        </div>

        {/* Transaction History */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-card rounded-2xl p-6 shadow-lg"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-foreground">Transaction History</h3>
              <div className="flex items-center gap-2">
                <Filter className="h-5 w-5 text-muted-foreground" />
                <select
                  value={filterPeriod}
                  onChange={(e) => setFilterPeriod(e.target.value)}
                  className="px-3 py-2 border border-border rounded-lg text-sm focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none"
                >
                  <option value="all">All Time</option>
                  <option value="month">This Month</option>
                  <option value="quarter">This Quarter</option>
                  <option value="year">This Year</option>
                </select>
              </div>
            </div>

            <div className="space-y-3">
              {paymentHistory.map((payment, index) => (
                <motion.div
                  key={payment.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.05 }}
                  className="p-4 rounded-xl border border-border hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-green-500/15 rounded-lg flex items-center justify-center flex-shrink-0">
                        {getPaymentMethodIcon(payment.method)}
                      </div>
                      <div>
                        <div className="font-semibold text-foreground">{payment.service}</div>
                        <div className="text-sm text-muted-foreground">{payment.method}</div>
                        <div className="text-xs text-muted-foreground mt-1">
                          ID: {payment.id}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-foreground">
                        ₹{payment.amount}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {format(payment.date, "MMM d, yyyy")}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-border">
                    <div className="flex items-center gap-2">
                      <span className="bg-green-500/15 text-green-400 text-xs px-2 py-1 rounded-full font-medium flex items-center gap-1">
                        <Check className="h-3 w-3" />
                        {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                      </span>
                      {payment.cardLast4 && (
                        <span className="text-xs text-muted-foreground">
                          Card •••• {payment.cardLast4}
                        </span>
                      )}
                      {payment.upiId && (
                        <span className="text-xs text-muted-foreground">{payment.upiId}</span>
                      )}
                      {payment.bank && (
                        <span className="text-xs text-muted-foreground">{payment.bank}</span>
                      )}
                      {payment.wallet && (
                        <span className="text-xs text-muted-foreground">{payment.wallet}</span>
                      )}
                    </div>
                    <button className="text-cyan-500 hover:text-cyan-400 text-sm font-medium flex items-center gap-1">
                      <Download className="h-4 w-4" />
                      Receipt
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 flex justify-center">
              <button className="px-6 py-2.5 border-2 border-border text-foreground/80 rounded-lg hover:bg-muted/20 transition-colors font-medium">
                Load More Transactions
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
