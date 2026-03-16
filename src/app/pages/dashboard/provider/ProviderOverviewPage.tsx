import { TrendingUp, DollarSign, Calendar, Star, Users, Clock } from "lucide-react";
import { motion } from "motion/react";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export function ProviderOverviewPage() {
  const stats = [
    {
      name: "Total Earnings",
      value: "$12,450",
      change: "+15.3%",
      trend: "up",
      icon: DollarSign,
      color: "green"
    },
    {
      name: "Active Bookings",
      value: "23",
      change: "+5",
      trend: "up",
      icon: Calendar,
      color: "blue"
    },
    {
      name: "Total Clients",
      value: "156",
      change: "+12",
      trend: "up",
      icon: Users,
      color: "purple"
    },
    {
      name: "Avg Rating",
      value: "4.9",
      change: "+0.1",
      trend: "up",
      icon: Star,
      color: "yellow"
    }
  ];

  const earningsData = [
    { month: "Jan", earnings: 2400 },
    { month: "Feb", earnings: 1800 },
    { month: "Mar", earnings: 3200 },
    { month: "Apr", earnings: 2800 },
    { month: "May", earnings: 3800 },
    { month: "Jun", earnings: 4200 },
  ];

  const servicesData = [
    { service: "Network Security", bookings: 15 },
    { service: "Web Development", bookings: 12 },
    { service: "Consulting", bookings: 8 },
    { service: "Training", bookings: 6 },
  ];

  const upcomingBookings = [
    {
      client: "TechCorp Inc.",
      service: "Network Security Audit",
      date: "Today, 2:00 PM",
      status: "confirmed",
      amount: "$799"
    },
    {
      client: "StartupXYZ",
      service: "Website Development",
      date: "Tomorrow, 10:00 AM",
      status: "confirmed",
      amount: "$2,999"
    },
    {
      client: "SmallBiz Co",
      service: "Business Consulting",
      date: "Mar 6, 3:00 PM",
      status: "pending",
      amount: "$599"
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Welcome Back!</h1>
        <p className="text-gray-600 mt-1">Here's an overview of your service provider performance.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 bg-${stat.color}-100 rounded-xl flex items-center justify-center`}>
                  <Icon className={`h-6 w-6 text-${stat.color}-600`} />
                </div>
                <div className={`flex items-center gap-1 text-sm font-medium ${
                  stat.trend === "up" ? "text-green-600" : "text-red-600"
                }`}>
                  <TrendingUp className="h-4 w-4" />
                  {stat.change}
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.name}</div>
            </motion.div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        {/* Earnings Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white rounded-2xl p-6 shadow-sm"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Earnings Overview</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={earningsData}>
              <defs>
                <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip />
              <Area type="monotone" dataKey="earnings" stroke="#10b981" fillOpacity={1} fill="url(#colorEarnings)" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Services Performance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="bg-white rounded-2xl p-6 shadow-sm"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Top Services</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={servicesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="service" stroke="#9ca3af" fontSize={12} />
              <YAxis stroke="#9ca3af" />
              <Tooltip />
              <Bar dataKey="bookings" fill="#6366f1" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Upcoming Bookings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="bg-white rounded-2xl p-6 shadow-sm"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Upcoming Bookings</h3>
          <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
            View All
          </button>
        </div>
        
        <div className="space-y-4">
          {upcomingBookings.map((booking, index) => (
            <div key={index} className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-medium">
                  {booking.client.charAt(0)}
                </div>
                <div>
                  <div className="font-medium text-gray-900">{booking.client}</div>
                  <div className="text-sm text-gray-600">{booking.service}</div>
                  <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                    <Clock className="h-3 w-3" />
                    {booking.date}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="font-semibold text-gray-900">{booking.amount}</div>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                    booking.status === "confirmed" 
                      ? "bg-green-100 text-green-700" 
                      : "bg-yellow-100 text-yellow-700"
                  }`}>
                    {booking.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
