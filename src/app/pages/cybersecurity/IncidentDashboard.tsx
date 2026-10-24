import { useState } from "react";
import { AlertOctagon, Clock, CheckCircle2, Users, TrendingUp, Plus, Search, Filter, Eye } from "lucide-react";
import { motion } from "motion/react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Link } from "react-router";
import { format } from "date-fns";

export function IncidentDashboard() {
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const stats = [
    {
      label: "Active Incidents",
      value: "8",
      change: "+2",
      trend: "up",
      icon: AlertOctagon,
      color: "red"
    },
    {
      label: "Avg Response Time",
      value: "15 min",
      change: "-5",
      trend: "down",
      icon: Clock,
      color: "blue"
    },
    {
      label: "Resolved Today",
      value: "12",
      change: "+4",
      trend: "up",
      icon: CheckCircle2,
      color: "green"
    },
    {
      label: "Team Utilization",
      value: "78%",
      change: "+12%",
      trend: "up",
      icon: Users,
      color: "purple"
    }
  ];

  const incidentTrend = [
    { month: "Jan", incidents: 45, resolved: 42 },
    { month: "Feb", incidents: 38, resolved: 36 },
    { month: "Mar", incidents: 52, resolved: 48 },
    { month: "Apr", incidents: 41, resolved: 39 },
    { month: "May", incidents: 34, resolved: 32 }
  ];

  const categoryData = [
    { category: "Malware", count: 15 },
    { category: "Phishing", count: 22 },
    { category: "DDoS", count: 8 },
    { category: "Data Breach", count: 5 },
    { category: "Unauthorized Access", count: 12 },
    { category: "Other", count: 6 }
  ];

  const incidents = [
    {
      id: "INC-2024-0156",
      title: "Suspicious Login Attempts from Unknown IP",
      severity: "high",
      category: "Unauthorized Access",
      status: "investigating",
      assignedTo: "Priya Sharma",
      reportedBy: "Security System",
      reportedAt: new Date(2024, 4, 28, 14, 30),
      sla: 45,
      impactedSystems: ["User Portal", "Admin Dashboard"]
    },
    {
      id: "INC-2024-0155",
      title: "Phishing Email Campaign Detected",
      severity: "critical",
      category: "Phishing",
      status: "active",
      assignedTo: "Rajesh Kumar",
      reportedBy: "Email Security Gateway",
      reportedAt: new Date(2024, 4, 28, 10, 15),
      sla: 120,
      impactedSystems: ["Email System"]
    },
    {
      id: "INC-2024-0154",
      title: "Malware Detected on Endpoint",
      severity: "high",
      category: "Malware",
      status: "contained",
      assignedTo: "Amit Patel",
      reportedBy: "John Doe",
      reportedAt: new Date(2024, 4, 27, 16, 45),
      sla: 30,
      impactedSystems: ["Workstation-042"]
    },
    {
      id: "INC-2024-0153",
      title: "Unauthorized API Access Attempt",
      severity: "medium",
      category: "Unauthorized Access",
      status: "investigating",
      assignedTo: "Sneha Reddy",
      reportedBy: "API Gateway",
      reportedAt: new Date(2024, 4, 27, 9, 20),
      sla: 15,
      impactedSystems: ["API Gateway", "Database"]
    },
    {
      id: "INC-2024-0152",
      title: "DDoS Attack Mitigation",
      severity: "critical",
      category: "DDoS",
      status: "resolved",
      assignedTo: "Vikram Singh",
      reportedBy: "Network Monitoring",
      reportedAt: new Date(2024, 4, 26, 22, 10),
      sla: 0,
      impactedSystems: ["Web Server", "CDN"]
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      case "high":
        return "bg-orange-500/20 text-orange-400 border-orange-500/30";
      case "medium":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "low":
        return "bg-card0/20 text-muted-foreground/80 border-blue-500/30";
      default:
        return "bg-muted/200/20 text-muted-foreground/70 border-gray-500/30";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-red-500/20 text-red-400";
      case "investigating":
        return "bg-yellow-500/20 text-yellow-400";
      case "contained":
        return "bg-card0/20 text-muted-foreground/80";
      case "resolved":
        return "bg-green-500/20 text-green-400";
      default:
        return "bg-muted/200/20 text-muted-foreground/70";
    }
  };

  const getSLAColor = (minutes: number) => {
    if (minutes <= 0) return "text-green-400";
    if (minutes <= 30) return "text-orange-600";
    return "text-red-600";
  };

  const filteredIncidents = incidents.filter(incident => {
    const matchesStatus = filterStatus === "all" || incident.status === filterStatus;
    const matchesSearch = incident.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         incident.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Incident Response Center</h1>
            <p className="text-muted-foreground">Monitor and manage security incidents in real-time</p>
          </div>
          <Link
            to="/dashboard/incidents/create"
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Report Incident
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-card rounded-2xl p-6 shadow-sm"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  stat.color === "blue" ? "bg-cyan-500/15" :
                  stat.color === "red" ? "bg-red-500/15" :
                  stat.color === "green" ? "bg-green-500/15" :
                  "bg-orange-500/15"
                }`}>
                  <Icon className={`h-6 w-6 ${
                    stat.color === "blue" ? "text-cyan-500" :
                    stat.color === "red" ? "text-red-600" :
                    stat.color === "green" ? "text-green-400" :
                    "text-orange-400"
                  }`} />
                </div>
                <div className={`flex items-center gap-1 text-sm font-medium ${
                  stat.trend === "up" ? "text-green-400" : "text-red-600"
                }`}>
                  <TrendingUp className={`h-4 w-4 ${stat.trend === "down" ? "rotate-180" : ""}`} />
                  {stat.change}
                </div>
              </div>
              <div className="text-sm text-muted-foreground mb-1">{stat.label}</div>
              <div className="text-3xl font-bold text-foreground">{stat.value}</div>
            </motion.div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        {/* Incident Trend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-card rounded-2xl p-6 shadow-sm"
        >
          <h3 className="text-lg font-semibold text-foreground mb-6">Incident Trend</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={incidentTrend}>
              <CartesianGrid key="grid" strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis key="xaxis" dataKey="month" stroke="#9ca3af" />
              <YAxis key="yaxis" stroke="#9ca3af" />
              <Tooltip key="tooltip" />
              <Line key="line-incidents" type="monotone" dataKey="incidents" stroke="#ef4444" strokeWidth={2} name="Reported" />
              <Line key="line-resolved" type="monotone" dataKey="resolved" stroke="#10b981" strokeWidth={2} name="Resolved" />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Category Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-card rounded-2xl p-6 shadow-sm"
        >
          <h3 className="text-lg font-semibold text-foreground mb-6">Incidents by Category</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={categoryData}>
              <CartesianGrid key="grid" strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis key="xaxis" dataKey="category" stroke="#9ca3af" angle={-45} textAnchor="end" height={80} />
              <YAxis key="yaxis" stroke="#9ca3af" />
              <Tooltip key="tooltip" />
              <Bar key="bar-count" dataKey="count" fill="#6366f1" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Filters */}
      <div className="bg-card rounded-2xl p-6 shadow-sm mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground/70" />
            <input
              type="text"
              placeholder="Search incidents by ID, title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none bg-card"
          >
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="investigating">Investigating</option>
            <option value="contained">Contained</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>
      </div>

      {/* Incidents List */}
      <div className="space-y-4">
        {filteredIncidents.map((incident, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 + index * 0.1 }}
            className="bg-card rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold text-foreground">{incident.title}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border uppercase ${getSeverityColor(incident.severity)}`}>
                    {incident.severity}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(incident.status)}`}>
                    {incident.status}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  {incident.id} • {incident.category}
                </p>

                <div className="grid md:grid-cols-4 gap-4">
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">Reported By</div>
                    <div className="text-sm font-medium text-foreground">{incident.reportedBy}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">Assigned To</div>
                    <div className="text-sm font-medium text-foreground">{incident.assignedTo}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">Reported At</div>
                    <div className="text-sm font-medium text-foreground">
                      {format(incident.reportedAt, "MMM d, HH:mm")}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">SLA Remaining</div>
                    <div className={`text-sm font-bold ${getSLAColor(incident.sla)}`}>
                      {incident.sla > 0 ? `${incident.sla} min` : "Met"}
                    </div>
                  </div>
                </div>

                <div className="mt-3">
                  <div className="text-xs text-muted-foreground mb-1">Impacted Systems</div>
                  <div className="flex flex-wrap gap-2">
                    {incident.impactedSystems.map((system, i) => (
                      <span key={i} className="px-2 py-1 bg-muted/40 text-foreground/80 rounded text-xs font-medium">
                        {system}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <Link
                to={`/dashboard/incidents/${incident.id}`}
                className="ml-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-cyan-600 transition-colors flex items-center gap-2 text-sm font-medium"
              >
                <Eye className="h-4 w-4" />
                View Details
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
