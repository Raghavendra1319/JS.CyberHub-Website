import { useState } from "react";
import { Download, Eye, Search, Filter, FileText, IndianRupee, Calendar } from "lucide-react";
import { motion } from "motion/react";
import { format } from "date-fns";

export function UserInvoicesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const invoices = [
    {
      id: "INV-2026-001",
      bookingId: "BK1234567890",
      serviceName: "Network Security Audit",
      date: new Date(2026, 4, 1),
      amount: 28000,
      tax: 5040,
      total: 33040,
      status: "paid",
      paymentMethod: "UPI",
      provider: "Rajesh Kumar"
    },
    {
      id: "INV-2026-002",
      bookingId: "BK1234567891",
      serviceName: "Custom Website Development",
      date: new Date(2026, 3, 15),
      amount: 85000,
      tax: 15300,
      total: 100300,
      status: "paid",
      paymentMethod: "Credit Card",
      provider: "Priya Sharma"
    },
    {
      id: "INV-2026-003",
      bookingId: "BK1234567892",
      serviceName: "Business Consulting Session",
      date: new Date(2026, 3, 5),
      amount: 18000,
      tax: 3240,
      total: 21240,
      status: "paid",
      paymentMethod: "UPI",
      provider: "Amit Patel"
    }
  ];

  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = invoice.serviceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         invoice.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === "all" || invoice.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-500/15 text-green-400";
      case "pending":
        return "bg-cyan-500/15 text-cyan-400";
      case "overdue":
        return "bg-red-500/15 text-red-400";
      default:
        return "bg-muted/40 text-foreground/80";
    }
  };

  const handleDownload = (invoiceId: string) => {
    console.log(`Downloading invoice: ${invoiceId}`);
  };

  const handleView = (invoiceId: string) => {
    console.log(`Viewing invoice: ${invoiceId}`);
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Invoices</h1>
        <p className="text-muted-foreground mt-1">View and download your payment invoices</p>
      </div>

      {/* Filters and Search */}
      <div className="bg-card rounded-2xl p-6 mb-6 shadow-sm">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground/70" />
            <input
              type="text"
              placeholder="Search invoices by service or invoice ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none"
            />
          </div>

          <div className="flex gap-2">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none bg-card"
            >
              <option value="all">All Status</option>
              <option value="paid">Paid</option>
              <option value="pending">Pending</option>
              <option value="overdue">Overdue</option>
            </select>
          </div>
        </div>
      </div>

      {/* Invoice Statistics */}
      <div className="grid md:grid-cols-3 gap-6 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-cyan-400 to-blue-600 rounded-2xl p-6 text-white"
        >
          <div className="flex items-center justify-between mb-4">
            <FileText className="h-8 w-8 opacity-80" />
            <span className="text-3xl font-bold">{invoices.length}</span>
          </div>
          <div className="text-sm opacity-90">Total Invoices</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white"
        >
          <div className="flex items-center justify-between mb-4">
            <IndianRupee className="h-8 w-8 opacity-80" />
            <span className="text-3xl font-bold">
              ₹{invoices.reduce((sum, inv) => sum + inv.total, 0).toLocaleString('en-IN')}
            </span>
          </div>
          <div className="text-sm opacity-90">Total Amount Paid</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white"
        >
          <div className="flex items-center justify-between mb-4">
            <Calendar className="h-8 w-8 opacity-80" />
            <span className="text-3xl font-bold">
              {format(invoices[0]?.date || new Date(), "MMM yyyy")}
            </span>
          </div>
          <div className="text-sm opacity-90">Latest Invoice</div>
        </motion.div>
      </div>

      {/* Invoices List */}
      {filteredInvoices.length === 0 ? (
        <div className="bg-card rounded-2xl p-12 text-center">
          <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">No Invoices Found</h3>
          <p className="text-muted-foreground">
            {searchQuery || filterStatus !== "all"
              ? "Try adjusting your search or filters"
              : "Your invoices will appear here once you make a booking"}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredInvoices.map((invoice, index) => (
            <motion.div
              key={invoice.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-card rounded-2xl p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-cyan-500/15 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FileText className="h-6 w-6 text-cyan-500" />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-lg font-semibold text-foreground">
                            {invoice.serviceName}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            Invoice: {invoice.id} • Booking: {invoice.bookingId}
                          </p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(invoice.status)}`}>
                          {invoice.status}
                        </span>
                      </div>

                      <div className="grid md:grid-cols-4 gap-4 mt-4">
                        <div>
                          <div className="text-xs text-muted-foreground mb-1">Invoice Date</div>
                          <div className="font-medium text-foreground">
                            {format(invoice.date, "MMM d, yyyy")}
                          </div>
                        </div>

                        <div>
                          <div className="text-xs text-muted-foreground mb-1">Provider</div>
                          <div className="font-medium text-foreground">{invoice.provider}</div>
                        </div>

                        <div>
                          <div className="text-xs text-muted-foreground mb-1">Payment Method</div>
                          <div className="font-medium text-foreground">{invoice.paymentMethod}</div>
                        </div>

                        <div>
                          <div className="text-xs text-muted-foreground mb-1">Total Amount</div>
                          <div className="font-bold text-lg text-foreground">
                            ₹{invoice.total.toLocaleString('en-IN')}
                          </div>
                        </div>
                      </div>

                      {/* Amount Breakdown */}
                      <div className="mt-4 p-4 bg-muted/20 rounded-lg">
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <div className="text-muted-foreground">Service Amount</div>
                            <div className="font-semibold text-foreground">
                              ₹{invoice.amount.toLocaleString('en-IN')}
                            </div>
                          </div>
                          <div>
                            <div className="text-muted-foreground">GST (18%)</div>
                            <div className="font-semibold text-foreground">
                              ₹{invoice.tax.toLocaleString('en-IN')}
                            </div>
                          </div>
                          <div>
                            <div className="text-muted-foreground">Total</div>
                            <div className="font-bold text-foreground">
                              ₹{invoice.total.toLocaleString('en-IN')}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 ml-4">
                  <button
                    onClick={() => handleView(invoice.id)}
                    className="p-2 bg-card text-cyan-500 rounded-lg hover:bg-cyan-500/15 transition-colors"
                    title="View Invoice"
                  >
                    <Eye className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDownload(invoice.id)}
                    className="p-2 bg-green-50 text-green-400 rounded-lg hover:bg-green-500/15 transition-colors"
                    title="Download Invoice"
                  >
                    <Download className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
