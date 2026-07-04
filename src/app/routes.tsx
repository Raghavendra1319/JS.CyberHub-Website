import { createBrowserRouter } from "react-router";

// Public Pages
import { HomePage } from "./pages/public/HomePage";
import { ServicesPage } from "./pages/public/ServicesPage";
import { ServiceDetailPage } from "./pages/public/ServiceDetailPage";
import { PricingPage } from "./pages/public/PricingPage";
import { TestimonialsPage } from "./pages/public/TestimonialsPage";
import { FAQPage } from "./pages/public/FAQPage";
import { ContactPage } from "./pages/public/ContactPage";

// Auth Pages
import { LoginPage } from "./pages/auth/LoginPage";
import { SignupPage } from "./pages/auth/SignupPage";
import { ForgotPasswordPage } from "./pages/auth/ForgotPasswordPage";
import { ResetPasswordPage } from "./pages/auth/ResetPasswordPage";

// Booking Flow
import { BookingSelectServicePage } from "./pages/booking/BookingSelectServicePage";
import { BookingDateTimePage } from "./pages/booking/BookingDateTimePage";
import { BookingDetailsPage } from "./pages/booking/BookingDetailsPage";
import { BookingSummaryPage } from "./pages/booking/BookingSummaryPage";
import { BookingPaymentPage } from "./pages/booking/BookingPaymentPage";
import { BookingConfirmationPage } from "./pages/booking/BookingConfirmationPage";

// User Dashboard
import { UserDashboardLayout } from "./pages/dashboard/user/UserDashboardLayout";
import { UserBookingsPage } from "./pages/dashboard/user/UserBookingsPage";
import { BookingTrackingPage } from "./pages/dashboard/user/BookingTrackingPage";
import { UserHistoryPage } from "./pages/dashboard/user/UserHistoryPage";
import { UserInvoicesPage } from "./pages/dashboard/user/UserInvoicesPage";
import { UserProfilePage } from "./pages/dashboard/user/UserProfilePage";
import { UserPaymentsPage } from "./pages/dashboard/user/UserPaymentsPage";
import { UserReviewsPage } from "./pages/dashboard/user/UserReviewsPage";

// Cybersecurity Modules
import { VulnerabilityDashboard } from "./pages/cybersecurity/VulnerabilityDashboard";
import { IncidentDashboard } from "./pages/cybersecurity/IncidentDashboard";
import { SecurityScoreDashboard } from "./pages/cybersecurity/SecurityScoreDashboard";
import { ThreatIntelligenceDashboard } from "./pages/cybersecurity/ThreatIntelligenceDashboard";

// Support System
import { TicketDashboard } from "./pages/support/TicketDashboard";

// Provider Dashboard
import { ProviderDashboardLayout } from "./pages/dashboard/provider/ProviderDashboardLayout";
import { ProviderOverviewPage } from "./pages/dashboard/provider/ProviderOverviewPage";
import { ProviderServicesPage } from "./pages/dashboard/provider/ProviderServicesPage";
import { ProviderBookingsPage } from "./pages/dashboard/provider/ProviderBookingsPage";
import { ProviderAvailabilityPage } from "./pages/dashboard/provider/ProviderAvailabilityPage";
import { ProviderEarningsPage } from "./pages/dashboard/provider/ProviderEarningsPage";
import { ProviderReviewsPage } from "./pages/dashboard/provider/ProviderReviewsPage";
import { ProviderMessagesPage } from "./pages/dashboard/provider/ProviderMessagesPage";
import { ProviderSettingsPage } from "./pages/dashboard/provider/ProviderSettingsPage";

// Admin Dashboard
import { AdminDashboardLayout } from "./pages/dashboard/admin/AdminDashboardLayout";
import { AdminOverviewPage } from "./pages/dashboard/admin/AdminOverviewPage";
import { AdminServicesPage } from "./pages/dashboard/admin/AdminServicesPage";
import { AdminBookingsPage } from "./pages/dashboard/admin/AdminBookingsPage";
import { AdminUsersPage } from "./pages/dashboard/admin/AdminUsersPage";
import { AdminReviewsPage } from "./pages/dashboard/admin/AdminReviewsPage";
import { AdminPaymentsPage } from "./pages/dashboard/admin/AdminPaymentsPage";

// Error Pages
import { NotFoundPage } from "./pages/errors/NotFoundPage";
import { ServerErrorPage } from "./pages/errors/ServerErrorPage";

// Layouts
import { PublicLayout } from "./layouts/PublicLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: PublicLayout,
    children: [
      { index: true, Component: HomePage },
      { path: "services", Component: ServicesPage },
      { path: "services/:id", Component: ServiceDetailPage },
      { path: "pricing", Component: PricingPage },
      { path: "testimonials", Component: TestimonialsPage },
      { path: "faq", Component: FAQPage },
      { path: "contact", Component: ContactPage },
    ],
  },
  {
    path: "/auth",
    children: [
      { path: "login", Component: LoginPage },
      { path: "signup", Component: SignupPage },
      { path: "forgot-password", Component: ForgotPasswordPage },
      { path: "reset-password", Component: ResetPasswordPage },
    ],
  },
  {
    path: "/booking",
    children: [
      { index: true, Component: BookingSelectServicePage },
      { path: "datetime/:serviceId", Component: BookingDateTimePage },
      { path: "details/:serviceId", Component: BookingDetailsPage },
      { path: "summary/:serviceId", Component: BookingSummaryPage },
      { path: "payment/:serviceId", Component: BookingPaymentPage },
      { path: "confirmation/:bookingId", Component: BookingConfirmationPage },
    ],
  },
  {
    path: "/dashboard",
    Component: UserDashboardLayout,
    children: [
      { index: true, Component: UserBookingsPage },
      { path: "booking/:id", Component: BookingTrackingPage },
      { path: "history", Component: UserHistoryPage },
      { path: "invoices", Component: UserInvoicesPage },
      { path: "profile", Component: UserProfilePage },
      { path: "payments", Component: UserPaymentsPage },
      { path: "reviews", Component: UserReviewsPage },
      { path: "security-score", Component: SecurityScoreDashboard },
      { path: "vulnerability", Component: VulnerabilityDashboard },
      { path: "incidents", Component: IncidentDashboard },
      { path: "support", Component: TicketDashboard },
      { path: "threat-intelligence", Component: ThreatIntelligenceDashboard },
    ],
  },
  {
    path: "/provider",
    Component: ProviderDashboardLayout,
    children: [
      { index: true, Component: ProviderOverviewPage },
      { path: "services", Component: ProviderServicesPage },
      { path: "bookings", Component: ProviderBookingsPage },
      { path: "availability", Component: ProviderAvailabilityPage },
      { path: "earnings", Component: ProviderEarningsPage },
      { path: "reviews", Component: ProviderReviewsPage },
      { path: "messages", Component: ProviderMessagesPage },
      { path: "settings", Component: ProviderSettingsPage },
    ],
  },
  {
    path: "/admin",
    Component: AdminDashboardLayout,
    children: [
      { index: true, Component: AdminOverviewPage },
      { path: "services", Component: AdminServicesPage },
      { path: "bookings", Component: AdminBookingsPage },
      { path: "users", Component: AdminUsersPage },
      { path: "reviews", Component: AdminReviewsPage },
      { path: "payments", Component: AdminPaymentsPage },
    ],
  },
  {
    path: "/500",
    Component: ServerErrorPage,
  },
  {
    path: "*",
    Component: NotFoundPage,
  },
]);