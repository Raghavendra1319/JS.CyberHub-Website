// Centralized mock data service — simulates a secure RBAC-aware backend API
// All data is scoped per user/role; replace fetch() calls with real API endpoints

import type { UserRole } from "./authService";

// ── Shared Types ──────────────────────────────────────────────────────────────

export type BookingStatus = "confirmed" | "pending" | "in-progress" | "completed" | "cancelled";
export type InvoiceStatus  = "paid" | "pending" | "overdue" | "draft";
export type ServiceCategory = "vulnerability" | "pentest" | "compliance" | "cloud" | "incident" | "training" | "consulting" | "web-dev";

export interface Service {
  id: string;
  name: string;
  category: ServiceCategory;
  description: string;
  price: number;
  duration: string;
  provider: string;
  rating: number;
  reviews: number;
  isActive: boolean;
}

export interface Booking {
  id: string;
  userId: string;
  serviceId: string;
  serviceName: string;
  providerName: string;
  date: string;
  time: string;
  status: BookingStatus;
  amount: number;
  notes?: string;
  reportUrl?: string;
}

export interface Invoice {
  id: string;
  userId: string;
  bookingId: string;
  serviceName: string;
  providerName: string;
  amount: number;
  gst: number;
  total: number;
  status: InvoiceStatus;
  issuedDate: string;
  dueDate: string;
  paidDate?: string;
  paymentMethod?: string;
}

export interface Report {
  id: string;
  userId: string;
  bookingId: string;
  title: string;
  type: "vulnerability" | "compliance" | "pentest" | "incident" | "audit";
  severity: "critical" | "high" | "medium" | "low" | "informational";
  status: "final" | "draft" | "in-review";
  createdAt: string;
  size: string;
  findings: number;
  summary: string;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  company?: string;
  joinedAt: string;
  lastLogin: string;
  isActive: boolean;
  bookings: number;
  spend: number;
}

export interface AdminStats {
  totalRevenue: number;
  revenueGrowth: number;
  totalBookings: number;
  bookingsGrowth: number;
  activeUsers: number;
  usersGrowth: number;
  activeServices: number;
  avgRating: number;
  pendingBookings: number;
  pendingPayouts: number;
}

// ── Seed Data ─────────────────────────────────────────────────────────────────

const SERVICES: Service[] = [
  { id: "svc-001", name: "Vulnerability Assessment", category: "vulnerability", description: "Comprehensive scan of systems for known vulnerabilities with CVSS scoring.", price: 24999, duration: "3-5 days", provider: "SecureNet India", rating: 4.8, reviews: 142, isActive: true },
  { id: "svc-002", name: "Web Application Pentest", category: "pentest", description: "Manual and automated penetration testing of web apps per OWASP Top 10.", price: 49999, duration: "5-7 days", provider: "CyberShield Labs", rating: 4.9, reviews: 87, isActive: true },
  { id: "svc-003", name: "DPDPA 2023 Compliance Audit", category: "compliance", description: "Gap analysis and roadmap for India's Digital Personal Data Protection Act.", price: 34999, duration: "4-6 days", provider: "ComplianceIQ", rating: 4.7, reviews: 53, isActive: true },
  { id: "svc-004", name: "Cloud Security Review", category: "cloud", description: "AWS/Azure/GCP configuration review against CIS benchmarks.", price: 29999, duration: "2-4 days", provider: "CloudGuard", rating: 4.6, reviews: 39, isActive: true },
  { id: "svc-005", name: "Incident Response Retainer", category: "incident", description: "24/7 on-call incident response team for active breaches.", price: 89999, duration: "Monthly", provider: "SecureNet India", rating: 4.9, reviews: 21, isActive: true },
  { id: "svc-006", name: "Security Awareness Training", category: "training", description: "Phishing simulation and employee awareness program.", price: 14999, duration: "2 days", provider: "AwareSec", rating: 4.5, reviews: 118, isActive: true },
  { id: "svc-007", name: "IT Act 2000 Advisory", category: "consulting", description: "Legal-technical advisory for IT Act compliance and data governance.", price: 19999, duration: "1-2 days", provider: "LegalTech India", rating: 4.6, reviews: 67, isActive: true },
  { id: "svc-008", name: "Custom Web Development", category: "web-dev", description: "Secure, performant web apps built with modern stacks.", price: 74999, duration: "4-8 weeks", provider: "DevSecure Studio", rating: 4.7, reviews: 34, isActive: false },
];

const BOOKINGS: Booking[] = [
  { id: "BK-2024-001", userId: "user-001", serviceId: "svc-001", serviceName: "Vulnerability Assessment", providerName: "SecureNet India", date: "2026-07-20", time: "10:00 AM", status: "confirmed", amount: 24999, notes: "Full network scan including DMZ" },
  { id: "BK-2024-002", userId: "user-001", serviceId: "svc-002", serviceName: "Web Application Pentest", providerName: "CyberShield Labs", date: "2026-08-05", time: "9:30 AM", status: "pending", amount: 49999 },
  { id: "BK-2024-003", userId: "user-001", serviceId: "svc-006", serviceName: "Security Awareness Training", providerName: "AwareSec", date: "2026-06-15", time: "11:00 AM", status: "completed", amount: 14999, reportUrl: "/reports/BK-2024-003.pdf" },
  { id: "BK-2024-004", userId: "user-001", serviceId: "svc-004", serviceName: "Cloud Security Review", providerName: "CloudGuard", date: "2026-05-28", time: "2:00 PM", status: "completed", amount: 29999, reportUrl: "/reports/BK-2024-004.pdf" },
  { id: "BK-2024-005", userId: "user-002", serviceId: "svc-003", serviceName: "DPDPA 2023 Compliance Audit", providerName: "ComplianceIQ", date: "2026-07-18", time: "10:00 AM", status: "in-progress", amount: 34999 },
  { id: "BK-2024-006", userId: "user-002", serviceId: "svc-007", serviceName: "IT Act 2000 Advisory", providerName: "LegalTech India", date: "2026-06-30", time: "3:00 PM", status: "completed", amount: 19999 },
];

const INVOICES: Invoice[] = [
  { id: "INV-2024-001", userId: "user-001", bookingId: "BK-2024-003", serviceName: "Security Awareness Training", providerName: "AwareSec", amount: 14999, gst: 2700, total: 17699, status: "paid", issuedDate: "2026-06-16", dueDate: "2026-06-30", paidDate: "2026-06-18", paymentMethod: "UPI" },
  { id: "INV-2024-002", userId: "user-001", bookingId: "BK-2024-004", serviceName: "Cloud Security Review", providerName: "CloudGuard", amount: 29999, gst: 5400, total: 35399, status: "paid", issuedDate: "2026-05-29", dueDate: "2026-06-12", paidDate: "2026-06-01", paymentMethod: "Bank Transfer" },
  { id: "INV-2024-003", userId: "user-001", bookingId: "BK-2024-001", serviceName: "Vulnerability Assessment", providerName: "SecureNet India", amount: 24999, gst: 4500, total: 29499, status: "pending", issuedDate: "2026-07-14", dueDate: "2026-07-28" },
  { id: "INV-2024-004", userId: "user-002", bookingId: "BK-2024-006", serviceName: "IT Act 2000 Advisory", providerName: "LegalTech India", amount: 19999, gst: 3600, total: 23599, status: "paid", issuedDate: "2026-07-01", dueDate: "2026-07-15", paidDate: "2026-07-03", paymentMethod: "NEFT" },
  { id: "INV-2024-005", userId: "user-002", bookingId: "BK-2024-005", serviceName: "DPDPA 2023 Compliance Audit", providerName: "ComplianceIQ", amount: 34999, gst: 6300, total: 41299, status: "pending", issuedDate: "2026-07-14", dueDate: "2026-07-28" },
];

const REPORTS: Report[] = [
  { id: "RPT-001", userId: "user-001", bookingId: "BK-2024-003", title: "Security Awareness Training — Assessment Report", type: "audit", severity: "low", status: "final", createdAt: "2026-06-20", size: "2.4 MB", findings: 0, summary: "All 47 employees completed training. Phishing simulation click rate dropped from 34% to 8%." },
  { id: "RPT-002", userId: "user-001", bookingId: "BK-2024-004", title: "AWS Cloud Configuration Review", type: "vulnerability", severity: "medium", status: "final", createdAt: "2026-06-02", size: "5.1 MB", findings: 14, summary: "14 misconfigurations found (3 high, 8 medium, 3 low). IAM over-permissioning and public S3 buckets are critical remediations." },
  { id: "RPT-003", userId: "user-001", bookingId: "BK-2024-001", title: "Network Vulnerability Assessment — Q3 2026", type: "vulnerability", severity: "high", status: "in-review", createdAt: "2026-07-22", size: "8.7 MB", findings: 31, summary: "Preliminary scan complete. Full report with remediation roadmap in review." },
];

const ADMIN_USERS: AdminUser[] = [
  { id: "admin-001", name: "Arjun Sharma", email: "admin@jscyberhub.com", role: "admin", company: "JS.CyberHub", joinedAt: "2023-01-15", lastLogin: "2026-07-14", isActive: true, bookings: 0, spend: 0 },
  { id: "prov-001", name: "Priya Menon", email: "provider@jscyberhub.com", role: "provider", company: "SecureNet India Pvt. Ltd.", joinedAt: "2023-03-10", lastLogin: "2026-07-13", isActive: true, bookings: 42, spend: 0 },
  { id: "user-001", name: "Rahul Verma", email: "user@jscyberhub.com", role: "user", company: "TechCorp Solutions", joinedAt: "2023-06-22", lastLogin: "2026-07-14", isActive: true, bookings: 4, spend: 119895 },
  { id: "user-002", name: "Sneha Iyer", email: "sneha@example.com", role: "user", company: "FinServ Ltd.", joinedAt: "2024-01-08", lastLogin: "2026-07-12", isActive: true, bookings: 2, spend: 54998 },
  { id: "user-003", name: "Vikram Nair", email: "vikram@startupx.in", role: "user", company: "StartupX", joinedAt: "2024-03-15", lastLogin: "2026-07-10", isActive: true, bookings: 1, spend: 24999 },
  { id: "user-004", name: "Divya Krishnan", email: "divya@manufac.co", role: "user", company: "ManufacCo", joinedAt: "2024-05-22", lastLogin: "2026-06-28", isActive: false, bookings: 0, spend: 0 },
  { id: "prov-002", name: "Rohit Bajaj", email: "rohit@cybershield.in", role: "provider", company: "CyberShield Labs", joinedAt: "2023-07-01", lastLogin: "2026-07-11", isActive: true, bookings: 87, spend: 0 },
];

const ADMIN_STATS: AdminStats = {
  totalRevenue: 4829450,
  revenueGrowth: 18.4,
  totalBookings: 312,
  bookingsGrowth: 11.2,
  activeUsers: 1247,
  usersGrowth: 23.1,
  activeServices: 7,
  avgRating: 4.73,
  pendingBookings: 23,
  pendingPayouts: 12,
};

const MONTHLY_REVENUE = [
  { month: "Jan", revenue: 312000, bookings: 41 },
  { month: "Feb", revenue: 287500, bookings: 38 },
  { month: "Mar", revenue: 421000, bookings: 55 },
  { month: "Apr", revenue: 398000, bookings: 52 },
  { month: "May", revenue: 534000, bookings: 69 },
  { month: "Jun", revenue: 612500, bookings: 79 },
  { month: "Jul", revenue: 263950, bookings: 34 },
];

// ── RBAC-scoped data access ───────────────────────────────────────────────────

export const dataService = {
  // Services
  getServices(): Service[] { return SERVICES; },
  getActiveServices(): Service[] { return SERVICES.filter((s) => s.isActive); },
  getServiceById(id: string): Service | undefined { return SERVICES.find((s) => s.id === id); },
  toggleService(id: string) {
    const svc = SERVICES.find((s) => s.id === id);
    if (svc) svc.isActive = !svc.isActive;
  },

  // Bookings — scoped by userId unless admin
  getBookings(userId: string, role: UserRole): Booking[] {
    if (role === "admin") return BOOKINGS;
    return BOOKINGS.filter((b) => b.userId === userId);
  },
  getBookingById(id: string): Booking | undefined { return BOOKINGS.find((b) => b.id === id); },
  updateBookingStatus(id: string, status: BookingStatus) {
    const b = BOOKINGS.find((b) => b.id === id);
    if (b) b.status = status;
  },

  // Invoices — scoped
  getInvoices(userId: string, role: UserRole): Invoice[] {
    if (role === "admin") return INVOICES;
    return INVOICES.filter((i) => i.userId === userId);
  },
  getInvoiceTotals(userId: string, role: UserRole) {
    const inv = this.getInvoices(userId, role);
    return {
      total: inv.reduce((s, i) => s + i.total, 0),
      paid: inv.filter((i) => i.status === "paid").reduce((s, i) => s + i.total, 0),
      pending: inv.filter((i) => i.status === "pending").reduce((s, i) => s + i.total, 0),
      overdue: inv.filter((i) => i.status === "overdue").reduce((s, i) => s + i.total, 0),
    };
  },

  // Reports — scoped
  getReports(userId: string, role: UserRole): Report[] {
    if (role === "admin") return REPORTS;
    return REPORTS.filter((r) => r.userId === userId);
  },

  // Admin-only
  getAdminUsers(): AdminUser[] { return ADMIN_USERS; },
  getAdminStats(): AdminStats { return ADMIN_STATS; },
  getMonthlyRevenue() { return MONTHLY_REVENUE; },
  toggleUserStatus(id: string) {
    const u = ADMIN_USERS.find((u) => u.id === id);
    if (u) u.isActive = !u.isActive;
  },
  updateUserRole(id: string, role: UserRole) {
    const u = ADMIN_USERS.find((u) => u.id === id);
    if (u) u.role = role;
  },
};
