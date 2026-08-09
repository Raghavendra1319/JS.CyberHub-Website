import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { authService } from "../services/authService";
import type { AuthUser, UserRole } from "../services/authService";

// Re-export so existing imports keep working
export type { AuthUser as User };

interface AuthContextType {
  user: AuthUser | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isProvider: boolean;
  isLoading: boolean;
  hasRole: (...roles: UserRole[]) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Restore session from localStorage on mount
  useEffect(() => {
    const restored = authService.restoreSession();
    if (restored) setUser(restored);
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const authedUser = await authService.login(email, password);
    setUser(authedUser);
  };

  const signup = async (name: string, email: string, password: string) => {
    const newUser = await authService.signup(name, email, password);
    setUser(newUser);
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const hasRole = (...roles: UserRole[]) => authService.hasRole(user, ...roles);

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        isAuthenticated: !!user,
        isAdmin: user?.role === "admin",
        isProvider: user?.role === "provider",
        isLoading,
        hasRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
