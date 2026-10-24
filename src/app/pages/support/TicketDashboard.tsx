import { useState } from "react";
import { Ticket, Clock, CheckCircle2, MessageSquare, Plus, Search, Filter, Eye, TrendingUp } from "lucide-react";
import { motion } from "motion/react";
import { Link } from "react-router";
import { format } from "date-fns";

export function TicketDashboard() {
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterPriority, setFilterPriority] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const stats = [
    {
      label: "Open Tickets",
      value: "24",
      change: "+6",
      trend: "up",
      icon: Ticket,
      color: "blue"
    },
    {
      label: "Avg Response Time",
      value: "2.3 hrs",
      change: "-0.5",
      trend: "down",
      icon: Clock,
      color: "purple"
    },
    {
      label: "Resolved Today",
      value: "18",
      change: "+4",
      trend: "up",
      icon: CheckCircle2,
      color: "green"
    },
    {
      label: "Customer Satisfaction",
      value: "4.8/5",
      change: "+0.2",
      trend: "up",
      icon: MessageSquare,
      color: "orange"
    }
  ];

  const tickets = [
    {
      id: "TKT-2024-1045",
      subject: "Unable to access vulnerability reports",
      category: "Technical Support",
      priority: "high",
      status: "open",
      customer: "Anil Verma",
      assignedTo: "Support Team",
      createdAt: new Date(2024, 4, 28, 14, 30),
      lastUpdate: new Date(2024, 4, 28, 15, 45),
      responses: 3,
      sla: 45
    },
    {
      id: "TKT-2024-1044",
      subject: "Request for additional security scan",
      category: "Service Request",
      priority: "medium",
      status: "in-progress",
      customer: "Ravi Sharma",
      assignedTo: "Rajesh Kumar",
      createdAt: new Date(2024, 4, 28, 10, 15),
      lastUpdate: new Date(2024, 4, 28, 12, 30),
      responses: 5,
      sla: 120
    },
    {
      id: "TKT-2024-1043",
      subject: "Billing inquiry for last invoice",
      category: "Billing",
      priority: "low",
      status: "pending",
      customer: "Priya Reddy",
      assignedTo: "Finance Team",
      createdAt: new Date(2024, 4, 27, 16, 45),
      lastUpdate: new Date(2024, 4, 28, 9, 20),
      responses: 2,
      sla: 180
    },
    {
      id: "TKT-2024-1042",
      subject: "Critical: System showing false positives",
      category: "Bug Report",
      priority: "critical",
      status: "escalated",
      customer: "Vikram Singh",
      assignedTo: "Engineering Team",
      createdAt: new Date(2024, 4, 27, 9, 20),
      lastUpdate: new Date(2024, 4, 27, 18, 10),
      responses: 8,
      sla: 30
    },
    {
      id: "TKT-2024-1041",
      subject: "Feature request: Export to PDF",
      category: "Feature Request",
      priority: "low",
      status: "closed",
      customer: "Sneha Patel",
      assignedTo: "Product Team",
      createdAt: new Date(2024, 4, 26, 11, 30),
      lastUpdate: new Date(2024, 4, 27, 14, 45),
      responses: 4,
      sla: 0
    },
    {
      id: "TKT-2024-1040",
      subject: "Need help understanding compliance report",
      category: "General Inquiry",
      priority: "medium",
      status: "resolved",
      customer: "Amit Kumar",
      assignedTo: "Priya Sharma",
      createdAt: new Date(2024, 4, 26, 8, 15),
      lastUpdate: new Date(2024, 4, 26, 16, 20),
      responses: 6,
      sla: 0
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
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
      case "open":
        return "bg-card0/20 text-muted-foreground/80";
      case "in-progress":
        return "bg-yellow-500/20 text-yellow-400";
      case "pending":
        return "bg-orange-500/20 text-orange-400";
      case "escalated":
        return "bg-red-500/20 text-red-400";
      case "resolved":
        return "bg-green-500/20 text-green-400";
      case "closed":
        return "bg-muted/200/20 text-muted-foreground/70";
      default:
        return "bg-muted/200/20 text-muted-foreground/70";
    }
  };

  const getSLAColor = (minutes: number) => {
    if (minutes <= 0) return "text-green-400";
    if (minutes <= 60) return "text-orange-600";
    return "text-red-600";
  };

  const filteredTickets = tickets.filter(ticket => {
    const matchesStatus = filterStatus === "all" || ticket.status === filterStatus;
    const matchesPriority = filterPriority === "all" || ticket.priority === filterPriority;
    const matchesSearch = ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         ticket.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         ticket.customer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesPriority && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Support Tickets</h1>
            <p className="text-muted-foreground">Manage customer support requests and inquiries</p>
          </div>
          <Link
            to="/dashboard/support/create"
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-cyan-600 transition-colors flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Create Ticket
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
                  stat.color === "purple" ? "bg-orange-500/15" :
                  stat.color === "green" ? "bg-green-500/15" :
                  "bg-orange-100"
                }`}>
                  <Icon className={`h-6 w-6 ${
                    stat.color === "blue" ? "text-cyan-500" :
                    stat.color === "purple" ? "text-orange-400" :
                    stat.color === "green" ? "text-green-400" :
                    "text-orange-600"
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

      {/* Filters */}
      <div className="bg-card rounded-2xl p-6 shadow-sm mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground/70" />
            <input
              type="text"
              placeholder="Search tickets by ID, subject, customer..."
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
            <option value="open">Open</option>
            <option value="in-progress">In Progress</option>
            <option value="pending">Pending</option>
            <option value="escalated">Escalated</option>
            <option value="resolved">Resolved</option>
            <option value="closed">Closed</option>
          </select>
          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none bg-card"
          >
            <option value="all">All Priorities</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
      </div>

      {/* Tickets List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-card rounded-2xl shadow-sm overflow-hidden"
      >
        <div className="p-6 border-b border-border">
          <h3 className="text-lg font-semibold text-foreground">
            Tickets ({filteredTickets.length})
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/20">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Ticket ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Subject
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Priority
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Assigned To
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Responses
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  SLA
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-card divide-y divide-border">
              {filteredTickets.map((ticket, index) => (
                <tr key={index} className="hover:bg-muted/20 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-cyan-500">{ticket.id}</div>
                    <div className="text-xs text-muted-foreground">{ticket.category}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-foreground max-w-md">{ticket.subject}</div>
                    <div className="text-xs text-muted-foreground">
                      Updated {format(ticket.lastUpdate, "MMM d, HH:mm")}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border uppercase ${getPriorityColor(ticket.priority)}`}>
                      {ticket.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(ticket.status)}`}>
                      {ticket.status.replace("-", " ")}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full flex items-center justify-center text-white text-xs font-medium">
                        {ticket.customer.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="text-sm text-foreground">{ticket.customer}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-foreground">{ticket.assignedTo}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MessageSquare className="h-4 w-4" />
                      {ticket.responses}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-sm font-bold ${getSLAColor(ticket.sla)}`}>
                      {ticket.sla > 0 ? `${Math.floor(ticket.sla / 60)}h ${ticket.sla % 60}m` : "Met"}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link
                      to={`/dashboard/support/${ticket.id}`}
                      className="text-cyan-500 hover:text-cyan-400 font-medium text-sm flex items-center gap-1"
                    >
                      <Eye className="h-4 w-4" />
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
