import { useState } from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import {
  FileText, Download, Shield, Calendar, CreditCard, AlertTriangle,
  CheckCircle2, Clock, TrendingUp, ExternalLink, ArrowRight,
  Globe, Star, BookOpen, Bell, ChevronRight, Package, Zap
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { dataService } from "../../services/dataService";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";

// ── Helpers ───────────────────────────────────────────────────────────────────

function statusBadge(status: string) {
  const map: Record<string, string> = {
    confirmed:   "bg-card0/15 text-muted-foreground/80 border-blue-500/25",
    pending:     "bg-yellow-500/15 text-yellow-400 border-yellow-500/25",
    "in-progress":"bg-purple-500/15 text-purple-400 border-purple-500/25",
    completed:   "bg-green-500/15 text-green-400 border-green-500/25",
    cancelled:   "bg-red-500/15 text-red-400 border-red-500/25",
    paid:        "bg-green-500/15 text-green-400 border-green-500/25",
    overdue:     "bg-red-500/15 text-red-400 border-red-500/25",
    draft:       "bg-muted text-muted-foreground border-border",
    final:       "bg-green-500/15 text-green-400 border-green-500/25",
    "in-review": "bg-yellow-500/15 text-yellow-400 border-yellow-500/25",
  };
  return `inline-flex items-center px-2 py-0.5 rounded-full border text-[10px] font-semibold uppercase tracking-wide ${map[status] ?? "bg-muted text-muted-foreground border-border"}`;
}

function severityDot(severity: string) {
  const map: Record<string, string> = {
    critical: "bg-red-500",
    high:     "bg-orange-500",
    medium:   "bg-yellow-500",
    low:      "bg-card0",
    informational: "bg-green-500",
  };
  return `w-2 h-2 rounded-full flex-shrink-0 ${map[severity] ?? "bg-muted-foreground"}`;
}

const spendTrend = [
  { month: "Feb", spend: 0 },
  { month: "Mar", spend: 0 },
  { month: "Apr", spend: 0 },
  { month: "May", spend: 35399 },
  { month: "Jun", spend: 17699 },
  { month: "Jul", spend: 29499 },
];

// ── Component ─────────────────────────────────────────────────────────────────

export function ClientPortalPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<"overview" | "bookings" | "invoices" | "reports">("overview");

  const userId = user?.id ?? "user-001";
  const role   = user?.role ?? "user";

  const bookings = dataService.getBookings(userId, role);
  const invoices = dataService.getInvoices(userId, role);
  const reports  = dataService.getReports(userId, role);
  const totals   = dataService.getInvoiceTotals(userId, role);

  const activeBookings   = bookings.filter((b) => ["confirmed", "pending", "in-progress"].includes(b.status));
  const completedBookings = bookings.filter((b) => b.status === "completed");

  const quickStats = [
    { label: "Active Services",   value: String(activeBookings.length),   icon: Package,     color: "blue"   },
    { label: "Reports Available", value: String(reports.length),           icon: FileText,    color: "purple" },
    { label: "Total Paid",        value: `₹${(totals.paid / 100).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`, icon: CreditCard,  color: "green"  },
    { label: "Pending Invoices",  value: `₹${(totals.pending / 100).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`, icon: Clock,       color: "yellow" },
  ];

  const colorMap: Record<string, { icon: string; bg: string }> = {
    blue:   { icon: "text-muted-foreground/80",   bg: "bg-card0/10 border-blue-500/20"   },
    purple: { icon: "text-purple-400", bg: "bg-purple-500/10 border-purple-500/20" },
    green:  { icon: "text-green-400",  bg: "bg-green-500/10 border-green-500/20"  },
    yellow: { icon: "text-yellow-400", bg: "bg-yellow-500/10 border-yellow-500/20" },
  };

  return (
    <div className="min-h-screen bg-background cyber-grid">
      {/* ── Welcome Banner ─────────────────────────────────────────────────── */}
      <div className="px-6 pt-6 pb-2">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/10 border border-primary/20 p-6"
        >
          <div className="absolute inset-0 cyber-grid opacity-30 pointer-events-none" />
          <div className="relative flex items-start justify-between gap-4 flex-wrap">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Shield className="w-4 h-4 text-primary" />
                <span className="text-xs font-semibold text-primary uppercase tracking-wider">Client Portal</span>
              </div>
              <h1 className="text-2xl font-bold text-foreground mb-1">
                Welcome back, {user?.name?.split(" ")[0] ?? "Client"}
              </h1>
              <p className="text-sm text-muted-foreground">
                {user?.company ? `${user.company} · ` : ""}Security management portal · {new Date().toLocaleDateString("en-IN", { dateStyle: "long" })}
              </p>
            </div>
            <div className="flex gap-2">
              <Link
                to="/booking"
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors"
              >
                <Zap className="w-4 h-4" />
                Book a Service
              </Link>
              <Link
                to="/dashboard/security-score"
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted/50 border border-border text-sm font-medium text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors"
              >
                <Shield className="w-4 h-4" />
                Security Score
              </Link>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── Quick Stats ────────────────────────────────────────────────────── */}
      <div className="px-6 py-4 grid grid-cols-2 lg:grid-cols-4 gap-3">
        {quickStats.map((stat, i) => {
          const c = colorMap[stat.color];
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              className="cyber-card rounded-xl p-4"
            >
              <div className={`w-8 h-8 rounded-lg border flex items-center justify-center mb-3 ${c.bg}`}>
                <stat.icon className={`w-4 h-4 ${c.icon}`} />
              </div>
              <p className="text-xl font-bold text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
            </motion.div>
          );
        })}
      </div>

      {/* ── Tabs ───────────────────────────────────────────────────────────── */}
      <div className="px-6">
        <div className="flex gap-1 border-b border-border mb-5">
          {(["overview", "bookings", "invoices", "reports"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2.5 text-sm font-medium rounded-t-lg border-b-2 transition-colors capitalize ${
                activeTab === tab
                  ? "border-primary text-primary bg-primary/5"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* ── Overview Tab ─────────────────────────────────────────────────── */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 pb-8">
            {/* Spend chart */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:col-span-2 cyber-card rounded-xl p-5"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-sm font-semibold text-foreground">Security Spend — 2026</h2>
                  <p className="text-xs text-muted-foreground">Total invoiced amount per month (₹)</p>
                </div>
                <TrendingUp className="w-4 h-4 text-muted-foreground" />
              </div>
              <ResponsiveContainer width="100%" height={180}>
                <AreaChart data={spendTrend} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="spendGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%"  stopColor="#6366f1" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}   />
                    </linearGradient>
                  </defs>
                  <CartesianGrid key="grid"   strokeDasharray="3 3" stroke="rgba(99,102,241,0.08)" />
                  <XAxis        key="xaxis"  dataKey="month" tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                  <YAxis        key="yaxis"  tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${(v/1000).toFixed(0)}k`} />
                  <Tooltip      key="tooltip" contentStyle={{ background: "#13131a", border: "1px solid rgba(99,102,241,0.2)", borderRadius: 8, fontSize: 11 }} itemStyle={{ color: "#e0e7ff" }} formatter={(v: number) => [`₹${v.toLocaleString("en-IN")}`, "Spend"]} />
                  <Area key="area" type="monotone" dataKey="spend" stroke="#6366f1" fill="url(#spendGrad)" strokeWidth={2} dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Active services */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="cyber-card rounded-xl p-5"
            >
              <h2 className="text-sm font-semibold text-foreground mb-3">Active Services</h2>
              {activeBookings.length === 0 ? (
                <div className="py-8 text-center">
                  <Package className="w-8 h-8 text-muted-foreground/30 mx-auto mb-2" />
                  <p className="text-xs text-muted-foreground">No active services</p>
                  <Link to="/booking" className="text-xs text-primary mt-1 inline-block">Book one →</Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {activeBookings.map((b) => (
                    <div key={b.id} className="p-3 rounded-lg bg-muted/20 border border-border/50">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <p className="text-xs font-medium text-foreground leading-snug">{b.serviceName}</p>
                        <span className={statusBadge(b.status)}>{b.status}</span>
                      </div>
                      <p className="text-[10px] text-muted-foreground">{b.date} · {b.providerName}</p>
                    </div>
                  ))}
                </div>
              )}
              <Link to="/booking" className="mt-3 flex items-center gap-1 text-xs text-primary hover:underline">
                <Zap className="w-3 h-3" /> Book new service
              </Link>
            </motion.div>

            {/* Recent reports */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="cyber-card rounded-xl p-5"
            >
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-semibold text-foreground">Recent Reports</h2>
                <button
                  onClick={() => setActiveTab("reports")}
                  className="text-xs text-primary hover:underline flex items-center gap-0.5"
                >
                  View all <ChevronRight className="w-3 h-3" />
                </button>
              </div>
              {reports.length === 0 ? (
                <p className="text-xs text-muted-foreground py-4 text-center">No reports yet</p>
              ) : (
                <div className="space-y-2">
                  {reports.slice(0, 3).map((r) => (
                    <div key={r.id} className="flex items-center gap-3 p-2.5 rounded-lg bg-muted/20 border border-border/50 hover:border-primary/30 transition-colors group">
                      <span className={severityDot(r.severity)} />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-foreground truncate">{r.title}</p>
                        <p className="text-[10px] text-muted-foreground">{r.createdAt} · {r.findings} findings</p>
                      </div>
                      <button className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-foreground">
                        <Download className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Invoice summary */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="cyber-card rounded-xl p-5"
            >
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-semibold text-foreground">Invoice Summary</h2>
                <button
                  onClick={() => setActiveTab("invoices")}
                  className="text-xs text-primary hover:underline flex items-center gap-0.5"
                >
                  View all <ChevronRight className="w-3 h-3" />
                </button>
              </div>
              <div className="space-y-3">
                {[
                  { label: "Total Billed",     value: totals.total,   color: "text-foreground"     },
                  { label: "Paid",             value: totals.paid,    color: "text-green-400"      },
                  { label: "Pending",          value: totals.pending, color: "text-yellow-400"     },
                  { label: "Overdue",          value: totals.overdue, color: "text-red-400"        },
                ].map((row) => (
                  <div key={row.label} className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground text-xs">{row.label}</span>
                    <span className={`font-semibold text-xs ${row.color}`}>
                      ₹{row.value.toLocaleString("en-IN")}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-3 pt-3 border-t border-border/50">
                <div className="w-full h-1.5 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full rounded-full bg-green-500"
                    style={{ width: totals.total ? `${(totals.paid / totals.total) * 100}%` : "0%" }}
                  />
                </div>
                <p className="text-[10px] text-muted-foreground mt-1">
                  {totals.total ? Math.round((totals.paid / totals.total) * 100) : 0}% paid
                </p>
              </div>
            </motion.div>

            {/* Quick links */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="cyber-card rounded-xl p-5"
            >
              <h2 className="text-sm font-semibold text-foreground mb-3">Quick Links</h2>
              <div className="space-y-1.5">
                {[
                  { label: "Security Score",        to: "/dashboard/security-score",     icon: Shield         },
                  { label: "Vulnerability Scanner",  to: "/dashboard/vulnerability",      icon: AlertTriangle  },
                  { label: "Threat Intelligence",    to: "/dashboard/threat-intelligence",icon: Globe          },
                  { label: "Incident Response",      to: "/dashboard/incidents",          icon: Bell           },
                  { label: "Support Tickets",        to: "/dashboard/support",            icon: BookOpen       },
                  { label: "Leave a Review",         to: "/dashboard/reviews",            icon: Star           },
                ].map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors group"
                  >
                    <link.icon className="w-3.5 h-3.5 flex-shrink-0 group-hover:text-primary transition-colors" />
                    {link.label}
                    <ArrowRight className="w-3 h-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>
        )}

        {/* ── Bookings Tab ──────────────────────────────────────────────────── */}
        {activeTab === "bookings" && (
          <div className="pb-8 space-y-3">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-muted-foreground">{bookings.length} total bookings</p>
              <Link
                to="/booking"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/20 text-xs text-primary font-medium hover:bg-primary/20 transition-colors"
              >
                <Zap className="w-3.5 h-3.5" /> Book New Service
              </Link>
            </div>
            {bookings.map((b, i) => (
              <motion.div
                key={b.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="cyber-card rounded-xl p-4 flex items-start gap-4 flex-wrap"
              >
                <div className={`p-2 rounded-lg flex-shrink-0 ${
                  b.status === "completed" ? "bg-green-500/10 border border-green-500/20"
                  : b.status === "cancelled" ? "bg-red-500/10 border border-red-500/20"
                  : "bg-primary/10 border border-primary/20"
                }`}>
                  <Calendar className={`w-4 h-4 ${
                    b.status === "completed" ? "text-green-400"
                    : b.status === "cancelled" ? "text-red-400"
                    : "text-primary"
                  }`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="text-sm font-semibold text-foreground">{b.serviceName}</span>
                    <span className={statusBadge(b.status)}>{b.status}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">
                    {b.providerName} · {b.date} at {b.time}
                  </p>
                  <p className="text-xs font-semibold text-foreground">
                    ₹{b.amount.toLocaleString("en-IN")} + GST
                  </p>
                  {b.notes && <p className="text-[10px] text-muted-foreground mt-1 italic">"{b.notes}"</p>}
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  {b.reportUrl && (
                    <button className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 hover:bg-green-500/20 transition-colors">
                      <Download className="w-3.5 h-3.5" /> Report
                    </button>
                  )}
                  <Link
                    to={`/dashboard/booking/${b.id}`}
                    className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs rounded-lg bg-muted/50 border border-border text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" /> Track
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* ── Invoices Tab ──────────────────────────────────────────────────── */}
        {activeTab === "invoices" && (
          <div className="pb-8">
            {/* Summary bar */}
            <div className="grid grid-cols-3 gap-3 mb-5">
              {[
                { label: "Total Billed", value: totals.total, color: "text-foreground" },
                { label: "Paid",         value: totals.paid,  color: "text-green-400"  },
                { label: "Pending",      value: totals.pending, color: "text-yellow-400" },
              ].map((item) => (
                <div key={item.label} className="cyber-card rounded-xl p-4 text-center">
                  <p className={`text-lg font-bold ${item.color}`}>
                    ₹{item.value.toLocaleString("en-IN")}
                  </p>
                  <p className="text-xs text-muted-foreground">{item.label}</p>
                </div>
              ))}
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-border">
                    {["Invoice", "Service", "Issued", "Due", "Amount", "GST", "Total", "Status", ""].map((h) => (
                      <th key={h} className="px-3 py-3 text-left text-muted-foreground font-medium whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  {invoices.map((inv, i) => (
                    <motion.tr
                      key={inv.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.04 }}
                      className="hover:bg-muted/20 transition-colors"
                    >
                      <td className="px-3 py-3 font-mono text-foreground/80 whitespace-nowrap">{inv.id}</td>
                      <td className="px-3 py-3 text-foreground whitespace-nowrap max-w-[180px] truncate">{inv.serviceName}</td>
                      <td className="px-3 py-3 text-muted-foreground whitespace-nowrap">{inv.issuedDate}</td>
                      <td className="px-3 py-3 text-muted-foreground whitespace-nowrap">{inv.dueDate}</td>
                      <td className="px-3 py-3 text-foreground whitespace-nowrap">₹{inv.amount.toLocaleString("en-IN")}</td>
                      <td className="px-3 py-3 text-muted-foreground whitespace-nowrap">₹{inv.gst.toLocaleString("en-IN")}</td>
                      <td className="px-3 py-3 font-semibold text-foreground whitespace-nowrap">₹{inv.total.toLocaleString("en-IN")}</td>
                      <td className="px-3 py-3 whitespace-nowrap">
                        <span className={statusBadge(inv.status)}>{inv.status}</span>
                      </td>
                      <td className="px-3 py-3 whitespace-nowrap">
                        <button className="text-muted-foreground hover:text-foreground transition-colors">
                          <Download className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── Reports Tab ───────────────────────────────────────────────────── */}
        {activeTab === "reports" && (
          <div className="pb-8 space-y-3">
            <p className="text-sm text-muted-foreground mb-4">{reports.length} security report{reports.length !== 1 ? "s" : ""} available</p>
            {reports.length === 0 && (
              <div className="py-16 text-center">
                <FileText className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" />
                <p className="text-sm text-muted-foreground">No reports yet. Reports are generated after service completion.</p>
              </div>
            )}
            {reports.map((r, i) => (
              <motion.div
                key={r.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                className="cyber-card rounded-xl p-5 flex items-start gap-4 flex-wrap"
              >
                <div className="p-2 rounded-lg bg-primary/10 border border-primary/20 flex-shrink-0">
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="text-sm font-semibold text-foreground">{r.title}</span>
                    <span className={statusBadge(r.status)}>{r.status}</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2 flex-wrap">
                    <span className="flex items-center gap-1">
                      <span className={severityDot(r.severity)} />
                      {r.severity} severity
                    </span>
                    <span>{r.findings} findings</span>
                    <span>{r.createdAt}</span>
                    <span>{r.size}</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{r.summary}</p>
                </div>
                {r.status === "final" && (
                  <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-primary/10 border border-primary/20 text-xs text-primary font-medium hover:bg-primary/20 transition-colors flex-shrink-0">
                    <Download className="w-3.5 h-3.5" /> Download PDF
                  </button>
                )}
                {r.status === "in-review" && (
                  <div className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-yellow-500/10 border border-yellow-500/20 text-xs text-yellow-400 flex-shrink-0">
                    <Clock className="w-3.5 h-3.5" /> In review
                  </div>
                )}
              </motion.div>
            ))}

            {completedBookings.filter((b) => !reports.find((r) => r.bookingId === b.id)).length > 0 && (
              <div className="mt-4 p-4 rounded-xl bg-muted/20 border border-border/50 text-center">
                <CheckCircle2 className="w-6 h-6 text-muted-foreground/40 mx-auto mb-1" />
                <p className="text-xs text-muted-foreground">
                  {completedBookings.filter((b) => !reports.find((r) => r.bookingId === b.id)).length} completed service(s) with reports pending generation.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
