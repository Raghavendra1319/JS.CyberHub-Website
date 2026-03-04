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
import { UserHistoryPage } from "./pages/dashboard/user/UserHistoryPage";
import { UserProfilePage } from "./pages/dashboard/user/UserProfilePage";
import { UserPaymentsPage } from "./pages/dashboard/user/UserPaymentsPage";
import { UserReviewsPage } from "./pages/dashboard/user/UserReviewsPage";

// Admin Dashboard
import { AdminDashboardLayout } from "./pages/dashboard/admin/AdminDashboardLayout";
import { AdminOverviewPage } from "./pages/dashboard/admin/AdminOverviewPage";
import { AdminServicesPage } from "./pages/dashboard/admin/AdminServicesPage";
import { AdminBookingsPage } from "./pages/dashboard/admin/AdminBookingsPage";
import { AdminUsersPage } from "./pages/dashboard/admin/AdminUsersPage";
import { AdminReviewsPage } from "./pages/dashboard/admin/AdminReviewsPage";
import { AdminPaymentsPage } from "./pages/dashboard/admin/AdminPaymentsPage";

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
      { path: "history", Component: UserHistoryPage },
      { path: "profile", Component: UserProfilePage },
      { path: "payments", Component: UserPaymentsPage },
      { path: "reviews", Component: UserReviewsPage },
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
]);
