// Simulated secure authentication service
// In production this would call a real API (Supabase/Hono backend)

export type UserRole = "user" | "provider" | "admin";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  company?: string;
  phone?: string;
  joinedAt: string;
  lastLogin: string;
  isActive: boolean;
}

interface SessionToken {
  userId: string;
  role: UserRole;
  issuedAt: number;
  expiresAt: number;
}

// ── Seeded demo accounts ──────────────────────────────────────────────────────
const DEMO_USERS: (AuthUser & { password: string })[] = [
  {
    id: "admin-001",
    name: "Arjun Sharma",
    email: "admin@jscyberhub.com",
    password: "admin123",
    role: "admin",
    company: "JS.CyberHub",
    phone: "+91 98765 00001",
    joinedAt: "2023-01-15",
    lastLogin: new Date().toISOString(),
    isActive: true,
  },
  {
    id: "prov-001",
    name: "Priya Menon",
    email: "provider@jscyberhub.com",
    password: "provider123",
    role: "provider",
    company: "SecureNet India Pvt. Ltd.",
    phone: "+91 98765 00002",
    joinedAt: "2023-03-10",
    lastLogin: new Date().toISOString(),
    isActive: true,
  },
  {
    id: "user-001",
    name: "Rahul Verma",
    email: "user@jscyberhub.com",
    password: "user123",
    role: "user",
    company: "TechCorp Solutions",
    phone: "+91 98765 00003",
    joinedAt: "2023-06-22",
    lastLogin: new Date().toISOString(),
    isActive: true,
  },
  {
    id: "user-002",
    name: "Sneha Iyer",
    email: "sneha@example.com",
    password: "pass123",
    role: "user",
    company: "FinServ Ltd.",
    phone: "+91 98765 00004",
    joinedAt: "2024-01-08",
    lastLogin: new Date().toISOString(),
    isActive: true,
  },
];

const TOKEN_KEY = "jscyberhub_auth_token";
const USER_KEY = "jscyberhub_auth_user";
const TOKEN_TTL_MS = 8 * 60 * 60 * 1000; // 8 hours

// ── Token helpers ─────────────────────────────────────────────────────────────

function issueToken(user: AuthUser): string {
  const token: SessionToken = {
    userId: user.id,
    role: user.role,
    issuedAt: Date.now(),
    expiresAt: Date.now() + TOKEN_TTL_MS,
  };
  return btoa(JSON.stringify(token));
}

function parseToken(raw: string): SessionToken | null {
  try {
    const token: SessionToken = JSON.parse(atob(raw));
    if (Date.now() > token.expiresAt) return null;
    return token;
  } catch {
    return null;
  }
}

// ── Public API ────────────────────────────────────────────────────────────────

export const authService = {
  async login(email: string, _password: string): Promise<AuthUser> {
    await delay(600);
    const match = DEMO_USERS.find(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );
    if (!match) throw new Error("Invalid email or password.");
    if (!match.isActive) throw new Error("Account is suspended. Contact support.");

    const { password: _pw, ...user } = match;
    user.lastLogin = new Date().toISOString();

    const token = issueToken(user);
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    return user;
  },

  async signup(name: string, email: string, _password: string): Promise<AuthUser> {
    await delay(800);
    const exists = DEMO_USERS.find(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );
    if (exists) throw new Error("An account with this email already exists.");

    const user: AuthUser = {
      id: `user-${Date.now()}`,
      name,
      email,
      role: "user",
      joinedAt: new Date().toISOString().split("T")[0],
      lastLogin: new Date().toISOString(),
      isActive: true,
    };

    DEMO_USERS.push({ ...user, password: _password });
    const token = issueToken(user);
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    return user;
  },

  logout() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },

  restoreSession(): AuthUser | null {
    const raw = localStorage.getItem(TOKEN_KEY);
    const stored = localStorage.getItem(USER_KEY);
    if (!raw || !stored) return null;

    const token = parseToken(raw);
    if (!token) {
      this.logout();
      return null;
    }

    try {
      return JSON.parse(stored) as AuthUser;
    } catch {
      return null;
    }
  },

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  },

  isTokenValid(): boolean {
    const raw = localStorage.getItem(TOKEN_KEY);
    if (!raw) return false;
    return parseToken(raw) !== null;
  },

  hasRole(user: AuthUser | null, ...roles: UserRole[]): boolean {
    if (!user) return false;
    return roles.includes(user.role);
  },

  getDemoCredentials() {
    return [
      { label: "Admin", email: "admin@jscyberhub.com", password: "admin123" },
      { label: "Provider", email: "provider@jscyberhub.com", password: "provider123" },
      { label: "Client", email: "user@jscyberhub.com", password: "user123" },
    ];
  },
};

function delay(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}
