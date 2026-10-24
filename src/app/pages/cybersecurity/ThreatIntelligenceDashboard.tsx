import { useState, useId } from "react";
import {
  Globe, Zap, Radio, Eye, AlertOctagon, TrendingUp, TrendingDown,
  Search, Filter, Download, RefreshCw, ExternalLink, Target,
  Activity, Shield, ChevronDown, Copy, CheckCheck, Clock, Tag
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import {
  AreaChart, Area, BarChart, Bar, RadarChart, Radar, PolarGrid,
  PolarAngleAxis, PolarRadiusAxis, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Cell, PieChart, Pie
} from "recharts";
import { Link } from "react-router";

// ─── Types ────────────────────────────────────────────────────────────────────

type ThreatType = "all" | "malware" | "phishing" | "ransomware" | "apt" | "ddos" | "insider";
type ThreatLevel = "all" | "critical" | "high" | "medium" | "low";
type IOCType = "ip" | "domain" | "hash" | "url" | "email";

interface ThreatFeedItem {
  id: string;
  indicator: string;
  ioc_type: IOCType;
  threat_type: string;
  severity: "critical" | "high" | "medium" | "low";
  confidence: number;
  source: string;
  tags: string[];
  first_seen: string;
  last_seen: string;
  hits: number;
  status: "active" | "investigating" | "mitigated";
}

interface APTGroup {
  id: string;
  name: string;
  alias: string;
  origin: string;
  targets: string[];
  tactics: number;
  campaigns: number;
  last_activity: string;
  threat_level: "critical" | "high" | "medium";
  active: boolean;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

const threatTrendData = [
  { date: "Jun 1", malware: 42, phishing: 78, ransomware: 12, apt: 6, ddos: 31 },
  { date: "Jun 5", malware: 55, phishing: 91, ransomware: 18, apt: 9, ddos: 44 },
  { date: "Jun 10", malware: 38, phishing: 67, ransomware: 8, apt: 11, ddos: 28 },
  { date: "Jun 15", malware: 71, phishing: 103, ransomware: 23, apt: 14, ddos: 57 },
  { date: "Jun 20", malware: 63, phishing: 88, ransomware: 19, apt: 8, ddos: 42 },
  { date: "Jun 25", malware: 84, phishing: 121, ransomware: 31, apt: 17, ddos: 65 },
  { date: "Jun 30", malware: 76, phishing: 109, ransomware: 27, apt: 21, ddos: 51 },
];

const threatTypeBreakdown = [
  { name: "Phishing", value: 657, color: "#f97316" },
  { name: "Malware", value: 429, color: "#ef4444" },
  { name: "DDoS", value: 318, color: "#3b82f6" },
  { name: "Ransomware", value: 138, color: "#a855f7" },
  { name: "APT", value: 86, color: "#ec4899" },
  { name: "Insider", value: 42, color: "#f59e0b" },
];

const geoData = [
  { country: "CN", count: 2841, label: "China" },
  { country: "RU", count: 1934, label: "Russia" },
  { country: "US", count: 1102, label: "United States" },
  { country: "KP", count: 876, label: "North Korea" },
  { country: "IR", count: 654, label: "Iran" },
  { country: "NG", count: 432, label: "Nigeria" },
  { country: "BR", count: 318, label: "Brazil" },
  { country: "UA", count: 287, label: "Ukraine" },
];

const radarData = [
  { subject: "Malware", A: 84, fullMark: 100 },
  { subject: "Network", A: 71, fullMark: 100 },
  { subject: "Web App", A: 92, fullMark: 100 },
  { subject: "Social Eng.", A: 66, fullMark: 100 },
  { subject: "Supply Chain", A: 58, fullMark: 100 },
  { subject: "Ransomware", A: 47, fullMark: 100 },
];

const feedItems: ThreatFeedItem[] = [
  {
    id: "IOC-7821",
    indicator: "185.220.101.47",
    ioc_type: "ip",
    threat_type: "C2 Server",
    severity: "critical",
    confidence: 97,
    source: "MISP Community",
    tags: ["cobalt-strike", "apt29", "lateral-movement"],
    first_seen: "2026-06-28",
    last_seen: "2026-06-30",
    hits: 143,
    status: "active",
  },
  {
    id: "IOC-7820",
    indicator: "update-cdn-secure[.]net",
    ioc_type: "domain",
    threat_type: "Phishing Kit",
    severity: "high",
    confidence: 91,
    source: "PhishTank",
    tags: ["phishing", "credential-harvest", "banking"],
    first_seen: "2026-06-29",
    last_seen: "2026-06-30",
    hits: 87,
    status: "active",
  },
  {
    id: "IOC-7819",
    indicator: "4a8d2f1c9b3e6a0f7c5d2e8b1a4f9c3d",
    ioc_type: "hash",
    threat_type: "Ransomware Payload",
    severity: "critical",
    confidence: 99,
    source: "VirusTotal",
    tags: ["lockbit3", "ransomware", "double-extortion"],
    first_seen: "2026-06-27",
    last_seen: "2026-06-30",
    hits: 312,
    status: "investigating",
  },
  {
    id: "IOC-7818",
    indicator: "https://malshare.xyz/dl/update.exe",
    ioc_type: "url",
    threat_type: "Malware Dropper",
    severity: "high",
    confidence: 88,
    source: "URLhaus",
    tags: ["emotet", "dropper", "macro"],
    first_seen: "2026-06-26",
    last_seen: "2026-06-29",
    hits: 56,
    status: "mitigated",
  },
  {
    id: "IOC-7817",
    indicator: "noreply@secure-bank-alert[.]com",
    ioc_type: "email",
    threat_type: "Spear Phishing",
    severity: "medium",
    confidence: 83,
    source: "Internal SOC",
    tags: ["spear-phishing", "bec", "finance"],
    first_seen: "2026-06-25",
    last_seen: "2026-06-28",
    hits: 24,
    status: "mitigated",
  },
  {
    id: "IOC-7816",
    indicator: "91.108.4.102",
    ioc_type: "ip",
    threat_type: "TOR Exit Node",
    severity: "medium",
    confidence: 76,
    source: "SANS ISC",
    tags: ["tor", "anonymization", "recon"],
    first_seen: "2026-06-20",
    last_seen: "2026-06-30",
    hits: 198,
    status: "active",
  },
  {
    id: "IOC-7815",
    indicator: "b9f2e4c7d1a0395f82e6b4c1d7a3f0e9",
    ioc_type: "hash",
    threat_type: "Infostealer",
    severity: "high",
    confidence: 94,
    source: "MalwareBazaar",
    tags: ["redline", "infostealer", "credentials"],
    first_seen: "2026-06-22",
    last_seen: "2026-06-29",
    hits: 78,
    status: "active",
  },
  {
    id: "IOC-7814",
    indicator: "cdn-delivery-fast[.]ru",
    ioc_type: "domain",
    threat_type: "Watering Hole",
    severity: "high",
    confidence: 87,
    source: "OTX AlienVault",
    tags: ["watering-hole", "apt28", "exploit"],
    first_seen: "2026-06-18",
    last_seen: "2026-06-27",
    hits: 41,
    status: "investigating",
  },
];

const aptGroups: APTGroup[] = [
  {
    id: "APT-001",
    name: "Cozy Bear",
    alias: "APT29",
    origin: "Russia",
    targets: ["Government", "Defense", "NGOs"],
    tactics: 14,
    campaigns: 38,
    last_activity: "2026-06-29",
    threat_level: "critical",
    active: true,
  },
  {
    id: "APT-002",
    name: "Lazarus Group",
    alias: "APT38",
    origin: "North Korea",
    targets: ["Finance", "Crypto", "Defense"],
    tactics: 12,
    campaigns: 54,
    last_activity: "2026-06-28",
    threat_level: "critical",
    active: true,
  },
  {
    id: "APT-003",
    name: "Fancy Bear",
    alias: "APT28",
    origin: "Russia",
    targets: ["Government", "Military", "Media"],
    tactics: 16,
    campaigns: 71,
    last_activity: "2026-06-25",
    threat_level: "high",
    active: true,
  },
  {
    id: "APT-004",
    name: "Volt Typhoon",
    alias: "VANGUARD PANDA",
    origin: "China",
    targets: ["Critical Infrastructure", "Telecom"],
    tactics: 11,
    campaigns: 22,
    last_activity: "2026-06-30",
    threat_level: "critical",
    active: true,
  },
  {
    id: "APT-005",
    name: "Charming Kitten",
    alias: "APT35",
    origin: "Iran",
    targets: ["Academic", "Journalists", "Government"],
    tactics: 9,
    campaigns: 31,
    last_activity: "2026-06-20",
    threat_level: "high",
    active: false,
  },
];

const feeds = [
  { name: "MISP Community", type: "Open Source", status: "live", iocs: 14820, updated: "2 min ago", health: 99 },
  { name: "VirusTotal Intelligence", type: "Commercial", status: "live", iocs: 9431, updated: "5 min ago", health: 97 },
  { name: "OTX AlienVault", type: "Open Source", status: "live", iocs: 7254, updated: "12 min ago", health: 94 },
  { name: "PhishTank", type: "Open Source", status: "live", iocs: 5871, updated: "8 min ago", health: 98 },
  { name: "URLhaus", type: "Open Source", status: "live", iocs: 3912, updated: "3 min ago", health: 100 },
  { name: "SANS ISC Feeds", type: "Commercial", status: "degraded", iocs: 2148, updated: "47 min ago", health: 68 },
  { name: "MalwareBazaar", type: "Open Source", status: "live", iocs: 4523, updated: "6 min ago", health: 96 },
];

// ─── Utilities ────────────────────────────────────────────────────────────────

function getSeverityConfig(severity: string) {
  switch (severity) {
    case "critical": return { bg: "bg-red-500/15", text: "text-red-400", border: "border-red-500/30", dot: "bg-red-500" };
    case "high": return { bg: "bg-orange-500/15", text: "text-orange-400", border: "border-orange-500/30", dot: "bg-orange-500" };
    case "medium": return { bg: "bg-yellow-500/15", text: "text-yellow-400", border: "border-yellow-500/30", dot: "bg-yellow-500" };
    default: return { bg: "bg-card0/15", text: "text-muted-foreground/80", border: "border-blue-500/30", dot: "bg-card0" };
  }
}

function getStatusConfig(status: string) {
  switch (status) {
    case "active": return { bg: "bg-red-500/15", text: "text-red-400", label: "Active" };
    case "investigating": return { bg: "bg-yellow-500/15", text: "text-yellow-400", label: "Investigating" };
    case "mitigated": return { bg: "bg-green-500/15", text: "text-green-400", label: "Mitigated" };
    default: return { bg: "bg-muted", text: "text-muted-foreground", label: status };
  }
}

function getIOCIcon(type: IOCType) {
  switch (type) {
    case "ip": return "IP";
    case "domain": return "DOM";
    case "hash": return "MD5";
    case "url": return "URL";
    case "email": return "EML";
  }
}

function getIOCColor(type: IOCType) {
  switch (type) {
    case "ip": return "text-muted-foreground/80 bg-card0/10 border-blue-500/20";
    case "domain": return "text-orange-400 bg-orange-500/10 border-orange-500/20";
    case "hash": return "text-purple-400 bg-purple-500/10 border-purple-500/20";
    case "url": return "text-yellow-400 bg-yellow-500/10 border-yellow-500/20";
    case "email": return "text-pink-400 bg-pink-500/10 border-pink-500/20";
  }
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-card border border-border rounded-lg p-3 text-xs shadow-xl">
      <p className="text-muted-foreground mb-2 font-medium">{label}</p>
      {payload.map((entry: any) => (
        <div key={entry.name} className="flex items-center gap-2 mb-1">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
          <span className="text-muted-foreground">{entry.name}:</span>
          <span className="text-foreground font-semibold">{entry.value}</span>
        </div>
      ))}
    </div>
  );
};

// ─── Component ────────────────────────────────────────────────────────────────

export function ThreatIntelligenceDashboard() {
  const uid = useId();
  const [activeTab, setActiveTab] = useState<"feed" | "apt" | "feeds">("feed");
  const [filterType, setFilterType] = useState<ThreatLevel>("all");
  const [filterIOC, setFilterIOC] = useState<IOCType | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState("Just now");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setLastUpdated("Just now");
    }, 1500);
  };

  const filteredFeed = feedItems.filter((item) => {
    const matchesSeverity = filterType === "all" || item.severity === filterType;
    const matchesIOC = filterIOC === "all" || item.ioc_type === filterIOC;
    const matchesSearch =
      !searchQuery ||
      item.indicator.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.threat_type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some((t) => t.includes(searchQuery.toLowerCase()));
    return matchesSeverity && matchesIOC && matchesSearch;
  });

  const stats = [
    {
      label: "Active Threats",
      value: "1,670",
      change: "+87",
      trend: "up",
      icon: AlertOctagon,
      color: "red",
      sub: "Last 24 hours",
    },
    {
      label: "IOCs Collected",
      value: "47,959",
      change: "+2,841",
      trend: "up",
      icon: Target,
      color: "orange",
      sub: "Total indicators",
    },
    {
      label: "APT Groups Tracked",
      value: "23",
      change: "+2",
      trend: "up",
      icon: Eye,
      color: "purple",
      sub: "Active campaigns",
    },
    {
      label: "Threat Feeds",
      value: "7",
      change: "6 Live",
      trend: "neutral",
      icon: Radio,
      color: "blue",
      sub: "1 degraded",
    },
  ];

  const colorMap: Record<string, string> = {
    red: "text-red-400",
    orange: "text-orange-400",
    purple: "text-purple-400",
    blue: "text-muted-foreground/80",
    green: "text-green-400",
  };
  const bgMap: Record<string, string> = {
    red: "bg-red-500/10 border-red-500/20",
    orange: "bg-orange-500/10 border-orange-500/20",
    purple: "bg-purple-500/10 border-purple-500/20",
    blue: "bg-card0/10 border-blue-500/20",
    green: "bg-green-500/10 border-green-500/20",
  };

  return (
    <div className="min-h-screen bg-background cyber-grid">
      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-20">
        <div className="px-6 py-4 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-orange-500/10 border border-orange-500/20">
              <Globe className="w-5 h-5 text-orange-400" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-foreground">Threat Intelligence</h1>
              <p className="text-xs text-muted-foreground">Global threat landscape — updated {lastUpdated}</p>
            </div>
            <div className="flex items-center gap-1.5 ml-2 px-2 py-1 rounded-full bg-green-500/10 border border-green-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs text-green-400 font-medium">LIVE</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleRefresh}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted/50 border border-border text-sm text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin" : ""}`} />
              Refresh
            </button>
            <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted/50 border border-border text-sm text-muted-foreground hover:text-foreground transition-colors">
              <Download className="w-3.5 h-3.5" />
              Export
            </button>
            <Link
              to="/dashboard"
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/30 text-sm text-primary hover:bg-primary/20 transition-colors"
            >
              <Shield className="w-3.5 h-3.5" />
              Dashboard
            </Link>
          </div>
        </div>
      </div>

      <div className="px-6 py-6 space-y-6 max-w-[1600px] mx-auto">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              className="cyber-card rounded-xl p-4"
            >
              <div className="flex items-start justify-between mb-3">
                <div className={`p-2 rounded-lg border ${bgMap[stat.color]}`}>
                  <stat.icon className={`w-4 h-4 ${colorMap[stat.color]}`} />
                </div>
                {stat.trend !== "neutral" && (
                  <div className={`flex items-center gap-0.5 text-xs font-medium ${stat.trend === "up" ? "text-red-400" : "text-green-400"}`}>
                    {stat.trend === "up" ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    {stat.change}
                  </div>
                )}
              </div>
              <p className="text-2xl font-bold text-foreground mb-0.5">{stat.value}</p>
              <p className="text-sm font-medium text-foreground/80">{stat.label}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{stat.sub}</p>
            </motion.div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Threat Trend */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28 }}
            className="lg:col-span-2 cyber-card rounded-xl p-5"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-sm font-semibold text-foreground">Threat Activity — June 2026</h2>
                <p className="text-xs text-muted-foreground">Daily threat detections by category</p>
              </div>
              <Activity className="w-4 h-4 text-muted-foreground" />
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={threatTrendData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  {[
                    { key: "phishing", color: "#f97316" },
                    { key: "malware", color: "#ef4444" },
                    { key: "ddos", color: "#3b82f6" },
                    { key: "ransomware", color: "#a855f7" },
                    { key: "apt", color: "#ec4899" },
                  ].map(({ key, color }) => (
                    <linearGradient key={key} id={`${uid}-g-${key}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                      <stop offset="95%" stopColor={color} stopOpacity={0} />
                    </linearGradient>
                  ))}
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(99,102,241,0.08)" />
                <XAxis dataKey="date" tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="phishing" stroke="#f97316" fill={`url(#${uid}-g-phishing)`} strokeWidth={1.5} dot={false} />
                <Area type="monotone" dataKey="malware" stroke="#ef4444" fill={`url(#${uid}-g-malware)`} strokeWidth={1.5} dot={false} />
                <Area type="monotone" dataKey="ddos" stroke="#3b82f6" fill={`url(#${uid}-g-ddos)`} strokeWidth={1.5} dot={false} />
                <Area type="monotone" dataKey="ransomware" stroke="#a855f7" fill={`url(#${uid}-g-ransomware)`} strokeWidth={1.5} dot={false} />
                <Area type="monotone" dataKey="apt" stroke="#ec4899" fill={`url(#${uid}-g-apt)`} strokeWidth={1.5} dot={false} />
              </AreaChart>
            </ResponsiveContainer>
            <div className="flex flex-wrap gap-3 mt-3">
              {[
                { label: "Phishing", color: "#f97316" },
                { label: "Malware", color: "#ef4444" },
                { label: "DDoS", color: "#3b82f6" },
                { label: "Ransomware", color: "#a855f7" },
                { label: "APT", color: "#ec4899" },
              ].map((s) => (
                <div key={s.label} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: s.color }} />
                  {s.label}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Type Breakdown */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="cyber-card rounded-xl p-5"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-sm font-semibold text-foreground">By Category</h2>
                <p className="text-xs text-muted-foreground">Total: 1,670 threats</p>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={140}>
              <PieChart>
                <Pie
                  data={threatTypeBreakdown}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={65}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {threatTypeBreakdown.map((entry, i) => (
                    <Cell key={i} fill={entry.color} opacity={0.85} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ background: "#13131a", border: "1px solid rgba(99,102,241,0.2)", borderRadius: 8, fontSize: 11 }}
                  itemStyle={{ color: "#e0e7ff" }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-1.5 mt-2">
              {threatTypeBreakdown.map((item) => (
                <div key={item.name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-muted-foreground">{item.name}</span>
                  </div>
                  <span className="text-foreground font-medium">{item.value}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Second Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Geographic Origins */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.42 }}
            className="cyber-card rounded-xl p-5"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-sm font-semibold text-foreground">Geographic Origins</h2>
                <p className="text-xs text-muted-foreground">Top threat-source countries</p>
              </div>
              <Globe className="w-4 h-4 text-muted-foreground" />
            </div>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={geoData} layout="vertical" margin={{ top: 0, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(99,102,241,0.08)" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="label" tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} width={80} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="count" name="Threats" radius={[0, 4, 4, 0]}>
                  {geoData.map((_, i) => (
                    <Cell key={i} fill={`hsl(${220 + i * 12}, 80%, ${60 - i * 4}%)`} opacity={0.85} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Attack Surface Radar */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.49 }}
            className="cyber-card rounded-xl p-5"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-sm font-semibold text-foreground">Attack Surface Exposure</h2>
                <p className="text-xs text-muted-foreground">Risk score by attack vector</p>
              </div>
              <Zap className="w-4 h-4 text-muted-foreground" />
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <RadarChart data={radarData} margin={{ top: 0, right: 20, left: 20, bottom: 0 }}>
                <PolarGrid stroke="rgba(99,102,241,0.15)" />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fill: "#94a3b8" }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 9, fill: "#64748b" }} />
                <Radar name="Exposure" dataKey="A" stroke="#a855f7" fill="#a855f7" fillOpacity={0.2} strokeWidth={2} />
                <Tooltip
                  contentStyle={{ background: "#13131a", border: "1px solid rgba(99,102,241,0.2)", borderRadius: 8, fontSize: 11 }}
                  itemStyle={{ color: "#e0e7ff" }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Main Tabbed Section */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.56 }}
          className="cyber-card rounded-xl overflow-hidden"
        >
          {/* Tab Bar */}
          <div className="flex items-center justify-between border-b border-border px-5 pt-4 pb-0 gap-4 flex-wrap">
            <div className="flex gap-1">
              {(["feed", "apt", "feeds"] as const).map((tab) => {
                const labels = { feed: "IOC Feed", apt: "APT Groups", feeds: "Feed Sources" };
                return (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2.5 text-sm font-medium rounded-t-lg border-b-2 transition-colors ${
                      activeTab === tab
                        ? "border-primary text-primary bg-primary/5"
                        : "border-transparent text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {labels[tab]}
                  </button>
                );
              })}
            </div>

            {/* Filters (only for feed tab) */}
            {activeTab === "feed" && (
              <div className="flex items-center gap-2 pb-3">
                <div className="relative">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search IOCs..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-8 pr-3 py-1.5 text-xs bg-muted/50 border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 w-44"
                  />
                </div>
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value as ThreatLevel)}
                  className="text-xs bg-muted/50 border border-border rounded-lg px-2 py-1.5 text-foreground focus:outline-none focus:border-primary/50"
                >
                  <option value="all">All Severity</option>
                  <option value="critical">Critical</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
                <select
                  value={filterIOC}
                  onChange={(e) => setFilterIOC(e.target.value as IOCType | "all")}
                  className="text-xs bg-muted/50 border border-border rounded-lg px-2 py-1.5 text-foreground focus:outline-none focus:border-primary/50"
                >
                  <option value="all">All Types</option>
                  <option value="ip">IP Address</option>
                  <option value="domain">Domain</option>
                  <option value="hash">File Hash</option>
                  <option value="url">URL</option>
                  <option value="email">Email</option>
                </select>
              </div>
            )}
          </div>

          {/* IOC Feed Tab */}
          {activeTab === "feed" && (
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-border">
                    {["Type", "Indicator", "Threat", "Severity", "Confidence", "Source", "Hits", "Last Seen", "Status", ""].map((h) => (
                      <th key={h} className="px-4 py-3 text-left text-muted-foreground font-medium whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  <AnimatePresence>
                    {filteredFeed.map((item, i) => {
                      const sev = getSeverityConfig(item.severity);
                      const status = getStatusConfig(item.status);
                      const iocColor = getIOCColor(item.ioc_type);
                      const isCopied = copiedId === item.id;
                      return (
                        <motion.tr
                          key={item.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ delay: i * 0.03 }}
                          className="hover:bg-muted/20 transition-colors group"
                        >
                          <td className="px-4 py-3 whitespace-nowrap">
                            <span className={`inline-block px-1.5 py-0.5 rounded border font-mono text-[10px] font-bold ${iocColor}`}>
                              {getIOCIcon(item.ioc_type)}
                            </span>
                          </td>
                          <td className="px-4 py-3 max-w-[180px]">
                            <div className="flex items-center gap-1.5">
                              <span className="font-mono text-foreground/90 truncate block max-w-[140px]" title={item.indicator}>
                                {item.indicator}
                              </span>
                              <button
                                onClick={() => handleCopy(item.indicator, item.id)}
                                className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-foreground flex-shrink-0"
                              >
                                {isCopied ? <CheckCheck className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
                              </button>
                            </div>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {item.tags.slice(0, 2).map((tag) => (
                                <span key={tag} className="px-1 py-0.5 rounded bg-muted/60 text-muted-foreground text-[9px]">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-foreground/80">{item.threat_type}</td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-[10px] font-semibold ${sev.bg} ${sev.text} ${sev.border}`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${sev.dot}`} />
                              {item.severity}
                            </span>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <div className="flex items-center gap-1.5">
                              <div className="w-16 h-1 rounded-full bg-muted overflow-hidden">
                                <div
                                  className="h-full rounded-full"
                                  style={{
                                    width: `${item.confidence}%`,
                                    background: item.confidence > 90 ? "#22c55e" : item.confidence > 75 ? "#f59e0b" : "#ef4444",
                                  }}
                                />
                              </div>
                              <span className="text-foreground/70">{item.confidence}%</span>
                            </div>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-muted-foreground">{item.source}</td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <span className="text-foreground/80 font-medium">{item.hits.toLocaleString()}</span>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-muted-foreground flex items-center gap-1">
                            <Clock className="w-3 h-3 flex-shrink-0" />
                            {item.last_seen}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${status.bg} ${status.text}`}>
                              {status.label}
                            </span>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <button className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-foreground">
                              <ExternalLink className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </motion.tr>
                      );
                    })}
                  </AnimatePresence>
                </tbody>
              </table>
              {filteredFeed.length === 0 && (
                <div className="py-12 text-center">
                  <Shield className="w-8 h-8 text-muted-foreground/40 mx-auto mb-2" />
                  <p className="text-muted-foreground text-sm">No IOCs match your filters</p>
                </div>
              )}
              <div className="px-4 py-3 border-t border-border/50 flex items-center justify-between text-xs text-muted-foreground">
                <span>Showing {filteredFeed.length} of {feedItems.length} indicators</span>
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  Feed synced — real-time updates active
                </span>
              </div>
            </div>
          )}

          {/* APT Groups Tab */}
          {activeTab === "apt" && (
            <div className="p-5 space-y-3">
              {aptGroups.map((group, i) => {
                const sev = getSeverityConfig(group.threat_level);
                return (
                  <motion.div
                    key={group.id}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07 }}
                    className="flex items-start gap-4 p-4 rounded-xl bg-muted/20 border border-border/50 hover:border-primary/30 transition-colors"
                  >
                    <div className={`p-2.5 rounded-lg border flex-shrink-0 ${sev.bg} ${sev.border}`}>
                      <Target className={`w-5 h-5 ${sev.text}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className="font-semibold text-foreground">{group.name}</span>
                        <span className="text-xs text-muted-foreground font-mono">({group.alias})</span>
                        <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${sev.bg} ${sev.text} ${sev.border} border`}>
                          {group.threat_level.toUpperCase()}
                        </span>
                        {group.active && (
                          <span className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-red-500/10 border border-red-500/20 text-[10px] text-red-400 font-medium">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
                            ACTIVE
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-1 mb-2">
                        {group.targets.map((t) => (
                          <span key={t} className="px-1.5 py-0.5 rounded bg-primary/10 border border-primary/20 text-[10px] text-primary">
                            {t}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground flex-wrap">
                        <span>Origin: <span className="text-foreground">{group.origin}</span></span>
                        <span>MITRE ATT&CK Tactics: <span className="text-foreground">{group.tactics}</span></span>
                        <span>Campaigns: <span className="text-foreground">{group.campaigns}</span></span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          Last seen: <span className="text-foreground">{group.last_activity}</span>
                        </span>
                      </div>
                    </div>
                    <button className="flex-shrink-0 px-3 py-1.5 text-xs rounded-lg bg-muted/50 border border-border text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors">
                      View Profile
                    </button>
                  </motion.div>
                );
              })}
            </div>
          )}

          {/* Feed Sources Tab */}
          {activeTab === "feeds" && (
            <div className="p-5 space-y-2">
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20 text-center">
                  <p className="text-xl font-bold text-green-400">6</p>
                  <p className="text-xs text-muted-foreground">Live Feeds</p>
                </div>
                <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20 text-center">
                  <p className="text-xl font-bold text-yellow-400">1</p>
                  <p className="text-xs text-muted-foreground">Degraded</p>
                </div>
                <div className="p-3 rounded-lg bg-primary/10 border border-primary/20 text-center">
                  <p className="text-xl font-bold text-primary">47,959</p>
                  <p className="text-xs text-muted-foreground">Total IOCs</p>
                </div>
              </div>
              {feeds.map((feed, i) => (
                <motion.div
                  key={feed.name}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="flex items-center gap-4 p-3.5 rounded-xl bg-muted/20 border border-border/50 hover:border-primary/30 transition-colors"
                >
                  <div className="flex-shrink-0">
                    <div className={`flex items-center gap-1.5 ${feed.status === "live" ? "text-green-400" : "text-yellow-400"}`}>
                      <span className={`w-2 h-2 rounded-full ${feed.status === "live" ? "bg-green-400 animate-pulse" : "bg-yellow-400"}`} />
                      <Radio className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-sm font-medium text-foreground">{feed.name}</span>
                      <span className={`px-1.5 py-0.5 rounded text-[10px] ${feed.type === "Commercial" ? "bg-purple-500/10 text-purple-400 border border-purple-500/20" : "bg-card0/10 text-muted-foreground/80 border border-blue-500/20"}`}>
                        {feed.type}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span>{feed.iocs.toLocaleString()} IOCs</span>
                      <span>Updated {feed.updated}</span>
                    </div>
                  </div>
                  <div className="flex-shrink-0 text-right">
                    <p className={`text-sm font-bold ${feed.health > 90 ? "text-green-400" : feed.health > 70 ? "text-yellow-400" : "text-red-400"}`}>
                      {feed.health}%
                    </p>
                    <p className="text-[10px] text-muted-foreground">Health</p>
                  </div>
                  <div className="w-24 h-1.5 rounded-full bg-muted overflow-hidden flex-shrink-0">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${feed.health}%`,
                        background: feed.health > 90 ? "#22c55e" : feed.health > 70 ? "#f59e0b" : "#ef4444",
                      }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
