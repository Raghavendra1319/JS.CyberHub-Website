import { Shield, TrendingUp, AlertTriangle, CheckCircle2, Eye, ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { Link } from "react-router";

export function SecurityScoreDashboard() {
  const overallScore = 78;
  const previousScore = 72;
  const scoreChange = overallScore - previousScore;

  const categoryScores = [
    { category: "Network Security", score: 85, maxScore: 100 },
    { category: "Access Control", score: 82, maxScore: 100 },
    { category: "Data Protection", score: 75, maxScore: 100 },
    { category: "Incident Response", score: 70, maxScore: 100 },
    { category: "Compliance", score: 80, maxScore: 100 },
    { category: "Asset Management", score: 72, maxScore: 100 }
  ];

  const trendData = [
    { month: "Jan", score: 65 },
    { month: "Feb", score: 68 },
    { month: "Mar", score: 71 },
    { month: "Apr", score: 72 },
    { month: "May", score: 78 }
  ];

  const recommendations = [
    {
      priority: "critical",
      title: "Enable Multi-Factor Authentication",
      description: "15 user accounts without MFA",
      impact: "+8 points",
      category: "Access Control"
    },
    {
      priority: "high",
      title: "Patch Critical Vulnerabilities",
      description: "5 critical vulnerabilities awaiting remediation",
      impact: "+6 points",
      category: "Network Security"
    },
    {
      priority: "high",
      title: "Update Data Encryption Policies",
      description: "Sensitive data not encrypted at rest",
      impact: "+5 points",
      category: "Data Protection"
    },
    {
      priority: "medium",
      title: "Complete Incident Response Plan",
      description: "IR plan missing escalation procedures",
      impact: "+4 points",
      category: "Incident Response"
    },
    {
      priority: "medium",
      title: "Review Access Permissions",
      description: "12 users with excessive privileges",
      impact: "+3 points",
      category: "Access Control"
    }
  ];

  const metrics = [
    {
      label: "Security Posture",
      value: "Strong",
      score: 78,
      color: "green",
      icon: Shield
    },
    {
      label: "Vulnerabilities",
      value: "24 Open",
      score: 75,
      color: "orange",
      icon: AlertTriangle
    },
    {
      label: "Compliance",
      value: "80%",
      score: 80,
      color: "blue",
      icon: CheckCircle2
    },
    {
      label: "Risk Level",
      value: "Moderate",
      score: 70,
      color: "yellow",
      icon: Eye
    }
  ];

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-400";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return "Excellent";
    if (score >= 60) return "Good";
    if (score >= 40) return "Fair";
    return "Poor";
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      case "high":
        return "bg-orange-500/20 text-orange-400 border-orange-500/30";
      case "medium":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      default:
        return "bg-card0/20 text-muted-foreground/80 border-blue-500/30";
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Security Score Dashboard</h1>
        <p className="text-muted-foreground">Monitor your organization's overall security posture</p>
      </div>

      {/* Overall Score */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-cyan-400 to-blue-600 rounded-2xl p-8 text-white mb-8"
      >
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-medium opacity-90 mb-2">Overall Security Score</div>
            <div className="flex items-baseline gap-4">
              <div className="text-7xl font-bold">{overallScore}</div>
              <div className="text-2xl opacity-75">/100</div>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <div className={`flex items-center gap-1 px-3 py-1 rounded-full ${
                scoreChange >= 0 ? "bg-green-500/30" : "bg-red-500/30"
              }`}>
                <TrendingUp className={`h-4 w-4 ${scoreChange < 0 ? "rotate-180" : ""}`} />
                <span className="text-sm font-medium">
                  {scoreChange >= 0 ? "+" : ""}{scoreChange} points this month
                </span>
              </div>
              <div className="text-sm opacity-75">from {previousScore}</div>
            </div>
          </div>

          <div className="text-right">
            <div className="text-2xl font-bold mb-2">{getScoreLabel(overallScore)}</div>
            <div className="text-sm opacity-90">
              You're performing better than 68% of similar organizations
            </div>
            <Link
              to="/dashboard/security/report"
              className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-card text-cyan-500 rounded-lg hover:bg-card transition-colors text-sm font-medium"
            >
              View Full Report
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Metrics Grid */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.1 }}
              className="bg-card rounded-2xl p-6 shadow-sm"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  metric.color === "green" ? "bg-green-500/15" :
                  metric.color === "orange" ? "bg-orange-100" :
                  metric.color === "blue" ? "bg-cyan-500/15" :
                  "bg-cyan-500/15"
                }`}>
                  <Icon className={`h-6 w-6 ${
                    metric.color === "green" ? "text-green-400" :
                    metric.color === "orange" ? "text-orange-600" :
                    metric.color === "blue" ? "text-cyan-500" :
                    "text-yellow-600"
                  }`} />
                </div>
                <div className={`text-2xl font-bold ${getScoreColor(metric.score)}`}>
                  {metric.score}
                </div>
              </div>
              <div className="text-sm text-muted-foreground mb-1">{metric.label}</div>
              <div className="text-lg font-semibold text-foreground">{metric.value}</div>
            </motion.div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        {/* Category Scores Radar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-card rounded-2xl p-6 shadow-sm"
        >
          <h3 className="text-lg font-semibold text-foreground mb-6">Security Categories</h3>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={categoryScores}>
              <PolarGrid stroke="#e5e7eb" />
              <PolarAngleAxis dataKey="category" tick={{ fontSize: 12 }} />
              <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 10 }} />
              <Radar
                name="Score"
                dataKey="score"
                stroke="#3b82f6"
                fill="#3b82f6"
                fillOpacity={0.3}
                strokeWidth={2}
              />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>

          <div className="mt-4 space-y-2">
            {categoryScores.map((cat, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{cat.category}</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        cat.score >= 80 ? "bg-green-500" :
                        cat.score >= 60 ? "bg-yellow-500" :
                        "bg-red-500"
                      }`}
                      style={{ width: `${cat.score}%` }}
                    />
                  </div>
                  <span className={`text-sm font-bold ${getScoreColor(cat.score)}`}>
                    {cat.score}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Score Trend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-card rounded-2xl p-6 shadow-sm"
        >
          <h3 className="text-lg font-semibold text-foreground mb-6">Score Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={trendData}>
              <defs>
                <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" domain={[0, 100]} />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="score"
                stroke="#3b82f6"
                fillOpacity={1}
                fill="url(#colorScore)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>

          <div className="mt-4 p-4 bg-card rounded-lg">
            <div className="flex items-center gap-2 text-cyan-400 mb-2">
              <TrendingUp className="h-5 w-5" />
              <span className="font-semibold">Positive Trend</span>
            </div>
            <p className="text-sm text-cyan-400">
              Your security score has improved by {scoreChange} points over the last 30 days. Keep up the good work!
            </p>
          </div>
        </motion.div>
      </div>

      {/* Recommendations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="bg-card rounded-2xl p-6 shadow-sm"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-foreground">Top Recommendations to Improve Score</h3>
          <div className="text-sm text-muted-foreground">Potential increase: +26 points</div>
        </div>

        <div className="space-y-4">
          {recommendations.map((rec, index) => (
            <div
              key={index}
              className="p-4 border border-border rounded-lg hover:border-blue-300 transition-colors"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border uppercase ${getPriorityColor(rec.priority)}`}>
                      {rec.priority}
                    </span>
                    <span className="text-xs text-muted-foreground">{rec.category}</span>
                  </div>
                  <h4 className="font-semibold text-foreground mb-1">{rec.title}</h4>
                  <p className="text-sm text-muted-foreground">{rec.description}</p>
                </div>
                <div className="ml-4 text-right">
                  <div className="text-sm text-muted-foreground mb-1">Impact</div>
                  <div className="text-lg font-bold text-green-400">{rec.impact}</div>
                </div>
              </div>
              <button className="mt-3 text-sm text-cyan-500 hover:text-cyan-400 font-medium flex items-center gap-1">
                Take Action
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
