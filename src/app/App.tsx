import { RouterProvider } from "react-router";
import { router } from "./routes";
import { Toaster } from "./components/ui/sonner";
import { AuthProvider } from "./context/AuthContext";
import { BookingProvider } from "./context/BookingContext";
import { NotificationProvider } from "./contexts/NotificationContext";

export default function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <BookingProvider>
          <RouterProvider router={router} />
          <Toaster />
        </BookingProvider>
      </NotificationProvider>
    </AuthProvider>
  );
}
