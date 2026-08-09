import { Navigate, useLocation } from "react-router";
import { useAuth } from "../context/AuthContext";
import type { UserRole } from "../services/authService";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
  redirectTo?: string;
}

export function ProtectedRoute({
  children,
  allowedRoles,
  redirectTo,
}: ProtectedRouteProps) {
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/auth/login"
        state={{ from: location.pathname }}
        replace
      />
    );
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role as UserRole)) {
    // Redirect to the user's own home based on role
    const roleHome =
      redirectTo ??
      (user.role === "admin"
        ? "/admin"
        : user.role === "provider"
        ? "/provider"
        : "/dashboard");
    return <Navigate to={roleHome} replace />;
  }

  return <>{children}</>;
}
