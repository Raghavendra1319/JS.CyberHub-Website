import { useState, Fragment } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, Shield, UserCheck, UserX, ChevronDown, Users, Mail } from "lucide-react";
import { toast } from "sonner";
import { dataService } from "../../../services/dataService";
import type { UserRole } from "../../../services/authService";

type FilterRole = "all" | UserRole;
type FilterStatus = "all" | "active" | "suspended";

const ROLE_COLORS: Record<string, string> = {
  admin:    "bg-red-500/15 text-red-400 border-red-500/25",
  provider: "bg-purple-500/15 text-purple-400 border-purple-500/25",
  user:     "bg-blue-500/15 text-blue-400 border-blue-500/25",
};

export function AdminUsersPage() {
  const [search, setSearch]           = useState("");
  const [filterRole, setFilterRole]   = useState<FilterRole>("all");
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("all");
  const [expandedId, setExpandedId]   = useState<string | null>(null);
  const [users, setUsers]             = useState(() => dataService.getAdminUsers());

  const filtered = users.filter((u) => {
    const matchSearch =
      !search ||
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      (u.company ?? "").toLowerCase().includes(search.toLowerCase());
    const matchRole   = filterRole === "all" || u.role === filterRole;
    const matchStatus = filterStatus === "all" || (filterStatus === "active" ? u.isActive : !u.isActive);
    return matchSearch && matchRole && matchStatus;
  });

  const handleToggleStatus = (id: string, currentlyActive: boolean) => {
    dataService.toggleUserStatus(id);
    setUsers([...dataService.getAdminUsers()]);
    toast.success(currentlyActive ? "User suspended." : "User reactivated.");
  };

  const handleRoleChange = (id: string, role: UserRole) => {
    dataService.updateUserRole(id, role);
    setUsers([...dataService.getAdminUsers()]);
    toast.success(`Role updated to ${role}.`);
  };

  const counts = {
    total:     users.length,
    active:    users.filter((u) => u.isActive).length,
    suspended: users.filter((u) => !u.isActive).length,
    admins:    users.filter((u) => u.role === "admin").length,
    providers: users.filter((u) => u.role === "provider").length,
    clients:   users.filter((u) => u.role === "user").length,
  };

  return (
    <div className="p-6 space-y-5 max-w-[1200px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-xl font-bold text-foreground">User Management</h1>
          <p className="text-sm text-muted-foreground">Manage roles, access, and account status</p>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
        {[
          { label: "Total",     value: counts.total,     color: "text-foreground"   },
          { label: "Active",    value: counts.active,    color: "text-green-400"    },
          { label: "Suspended", value: counts.suspended, color: "text-red-400"      },
          { label: "Admins",    value: counts.admins,    color: "text-red-400"      },
          { label: "Providers", value: counts.providers, color: "text-purple-400"   },
          { label: "Clients",   value: counts.clients,   color: "text-blue-400"     },
        ].map((c) => (
          <div key={c.label} className="cyber-card rounded-xl p-3 text-center">
            <p className={`text-xl font-bold ${c.color}`}>{c.value}</p>
            <p className="text-[10px] text-muted-foreground">{c.label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by name, email, or company…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm bg-muted/40 border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50"
          />
        </div>
        <select
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value as FilterRole)}
          className="text-sm bg-muted/40 border border-border rounded-lg px-3 py-2 text-foreground focus:outline-none focus:border-primary/50"
        >
          <option value="all">All Roles</option>
          <option value="admin">Admin</option>
          <option value="provider">Provider</option>
          <option value="user">Client</option>
        </select>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value as FilterStatus)}
          className="text-sm bg-muted/40 border border-border rounded-lg px-3 py-2 text-foreground focus:outline-none focus:border-primary/50"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="suspended">Suspended</option>
        </select>
      </div>

      {/* Table */}
      <div className="cyber-card rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-border bg-muted/20">
                {["User", "Role", "Company", "Bookings", "Spend", "Joined", "Last Login", "Status", "Actions"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-muted-foreground font-medium whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              <AnimatePresence>
                {filtered.map((u, i) => (
                  <Fragment key={u.id}>
                    <motion.tr
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ delay: i * 0.03 }}
                      className="hover:bg-muted/20 transition-colors cursor-pointer"
                      onClick={() => setExpandedId(expandedId === u.id ? null : u.id)}
                    >
                      {/* User */}
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">
                            {u.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-medium text-foreground">{u.name}</p>
                            <p className="text-muted-foreground text-[10px]">{u.email}</p>
                          </div>
                        </div>
                      </td>
                      {/* Role */}
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-0.5 rounded-full border text-[10px] font-semibold uppercase tracking-wide ${ROLE_COLORS[u.role]}`}>
                          {u.role}
                        </span>
                      </td>
                      {/* Company */}
                      <td className="px-4 py-3 whitespace-nowrap text-muted-foreground max-w-[140px] truncate">
                        {u.company ?? "—"}
                      </td>
                      {/* Bookings */}
                      <td className="px-4 py-3 whitespace-nowrap text-foreground font-medium text-center">{u.bookings}</td>
                      {/* Spend */}
                      <td className="px-4 py-3 whitespace-nowrap text-foreground">
                        {u.spend > 0 ? `₹${u.spend.toLocaleString("en-IN")}` : "—"}
                      </td>
                      {/* Joined */}
                      <td className="px-4 py-3 whitespace-nowrap text-muted-foreground">{u.joinedAt}</td>
                      {/* Last Login */}
                      <td className="px-4 py-3 whitespace-nowrap text-muted-foreground">{u.lastLogin.split("T")[0]}</td>
                      {/* Status */}
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className={`flex items-center gap-1 text-[10px] font-semibold ${u.isActive ? "text-green-400" : "text-red-400"}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${u.isActive ? "bg-green-400 animate-pulse" : "bg-red-400"}`} />
                          {u.isActive ? "Active" : "Suspended"}
                        </span>
                      </td>
                      {/* Actions */}
                      <td className="px-4 py-3 whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => handleToggleStatus(u.id, u.isActive)}
                            className={`p-1.5 rounded-lg transition-colors ${u.isActive ? "text-red-400 hover:bg-red-500/10" : "text-green-400 hover:bg-green-500/10"}`}
                            title={u.isActive ? "Suspend user" : "Reactivate user"}
                          >
                            {u.isActive ? <UserX className="w-3.5 h-3.5" /> : <UserCheck className="w-3.5 h-3.5" />}
                          </button>
                          <button
                            onClick={() => setExpandedId(expandedId === u.id ? null : u.id)}
                            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors"
                          >
                            <ChevronDown className={`w-3.5 h-3.5 transition-transform ${expandedId === u.id ? "rotate-180" : ""}`} />
                          </button>
                        </div>
                      </td>
                    </motion.tr>

                    {/* Expanded row */}
                    <AnimatePresence>
                      {expandedId === u.id && (
                        <motion.tr
                          key={`${u.id}-expanded`}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          <td colSpan={9} className="px-4 pb-4 bg-muted/10">
                            <div className="pt-3 border-t border-border/40 grid grid-cols-1 sm:grid-cols-3 gap-4">
                              {/* Contact */}
                              <div>
                                <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-2">Contact</p>
                                <div className="space-y-1.5">
                                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                    <Mail className="w-3 h-3 flex-shrink-0" />
                                    {u.email}
                                  </div>
                                  {u.company && (
                                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                      <Users className="w-3 h-3 flex-shrink-0" />
                                      {u.company}
                                    </div>
                                  )}
                                </div>
                              </div>

                              {/* Change role */}
                              <div>
                                <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-2">Change Role</p>
                                <div className="flex gap-2">
                                  {(["user", "provider", "admin"] as UserRole[]).map((r) => (
                                    <button
                                      key={r}
                                      onClick={() => handleRoleChange(u.id, r)}
                                      className={`px-3 py-1.5 rounded-lg text-[10px] font-semibold uppercase tracking-wide border transition-colors ${
                                        u.role === r
                                          ? ROLE_COLORS[r]
                                          : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
                                      }`}
                                    >
                                      {r}
                                    </button>
                                  ))}
                                </div>
                              </div>

                              {/* Account actions */}
                              <div>
                                <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-2">Account Actions</p>
                                <div className="flex flex-wrap gap-2">
                                  <button
                                    onClick={() => handleToggleStatus(u.id, u.isActive)}
                                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-semibold border transition-colors ${
                                      u.isActive
                                        ? "border-red-500/30 text-red-400 hover:bg-red-500/10"
                                        : "border-green-500/30 text-green-400 hover:bg-green-500/10"
                                    }`}
                                  >
                                    {u.isActive ? <><UserX className="w-3 h-3" /> Suspend</> : <><UserCheck className="w-3 h-3" /> Reactivate</>}
                                  </button>
                                  <button
                                    onClick={() => { toast.info(`Password reset email sent to ${u.email}`); }}
                                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-semibold border border-border text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors"
                                  >
                                    <Shield className="w-3 h-3" /> Reset Password
                                  </button>
                                </div>
                              </div>
                            </div>
                          </td>
                        </motion.tr>
                      )}
                    </AnimatePresence>
                  </Fragment>
                ))}
              </AnimatePresence>
            </tbody>
          </table>

          {filtered.length === 0 && (
            <div className="py-12 text-center">
              <Users className="w-8 h-8 text-muted-foreground/30 mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">No users match your filters</p>
            </div>
          )}
        </div>

        <div className="px-4 py-3 border-t border-border/50 text-xs text-muted-foreground">
          Showing {filtered.length} of {users.length} users
        </div>
      </div>
    </div>
  );
}
