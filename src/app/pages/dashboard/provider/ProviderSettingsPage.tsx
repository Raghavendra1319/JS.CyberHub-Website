import { useState } from "react";
import { User, Lock, Bell, CreditCard, Shield, Save, Camera } from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";

export function ProviderSettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [loading, setLoading] = useState(false);

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "security", label: "Security", icon: Lock },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "billing", label: "Billing", icon: CreditCard },
  ];

  const handleSave = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast.success("Settings saved successfully!");
    setLoading(false);
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your account preferences and settings</p>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Tabs Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-card rounded-2xl p-2 shadow-sm">
            <nav className="space-y-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left ${
                      activeTab === tab.id
                        ? "bg-card text-cyan-500 font-medium"
                        : "text-foreground/80 hover:bg-muted/20"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3">
          <div className="bg-card rounded-2xl shadow-sm">
            {/* Profile Settings */}
            {activeTab === "profile" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6"
              >
                <h2 className="text-xl font-semibold text-foreground mb-6">Profile Information</h2>

                {/* Profile Photo */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-foreground/80 mb-3">
                    Profile Photo
                  </label>
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-medium">
                      JS
                    </div>
                    <div>
                      <button className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-muted/20 transition-colors text-sm font-medium">
                        <Camera className="h-4 w-4" />
                        Change Photo
                      </button>
                      <p className="text-xs text-muted-foreground mt-1">JPG, PNG or GIF, max 2MB</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground/80 mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        defaultValue="JS"
                        className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground/80 mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        defaultValue="CyberHub"
                        className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground/80 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      defaultValue="raghavendrakanade13@gmail.com"
                      className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground/80 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      defaultValue="+91 8446173815"
                      className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground/80 mb-2">
                      Location
                    </label>
                    <input
                      type="text"
                      defaultValue="Chhatrapati Sambhajinagar"
                      className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground/80 mb-2">
                      Bio
                    </label>
                    <textarea
                      rows={4}
                      defaultValue="Professional cybersecurity consultant and business advisor specializing in network security, web development, and business consulting."
                      className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-border flex justify-end">
                  <button
                    onClick={handleSave}
                    disabled={loading}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-400 to-blue-600 text-white font-medium rounded-lg hover:shadow-lg transition-shadow disabled:opacity-50"
                  >
                    <Save className="h-5 w-5" />
                    {loading ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </motion.div>
            )}

            {/* Security Settings */}
            {activeTab === "security" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6"
              >
                <h2 className="text-xl font-semibold text-foreground mb-6">Security Settings</h2>

                <div className="space-y-6">
                  {/* Change Password */}
                  <div className="p-4 border border-border rounded-lg">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-medium text-foreground mb-1">Password</h3>
                        <p className="text-sm text-muted-foreground">Last changed 3 months ago</p>
                      </div>
                      <button className="px-4 py-2 border border-border rounded-lg hover:bg-muted/20 transition-colors text-sm font-medium">
                        Change Password
                      </button>
                    </div>
                  </div>

                  {/* Two-Factor Authentication */}
                  <div className="p-4 border border-border rounded-lg">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-medium text-foreground mb-1">Two-Factor Authentication</h3>
                        <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                      </div>
                      <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-cyan-600 transition-colors text-sm font-medium">
                        Enable
                      </button>
                    </div>
                  </div>

                  {/* Active Sessions */}
                  <div className="p-4 border border-border rounded-lg">
                    <h3 className="font-medium text-foreground mb-4">Active Sessions</h3>
                    <div className="space-y-3">
                      {[
                        { device: "Chrome on Windows", location: "Mumbai, India", time: "Active now" },
                        { device: "Safari on iPhone", location: "Mumbai, India", time: "2 days ago" },
                      ].map((session, index) => (
                        <div key={index} className="flex items-center justify-between py-2">
                          <div>
                            <div className="text-sm font-medium text-foreground">{session.device}</div>
                            <div className="text-xs text-muted-foreground">{session.location} • {session.time}</div>
                          </div>
                          {index > 0 && (
                            <button className="text-sm text-red-600 hover:text-red-400 font-medium">
                              Revoke
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Notification Settings */}
            {activeTab === "notifications" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6"
              >
                <h2 className="text-xl font-semibold text-foreground mb-6">Notification Preferences</h2>

                <div className="space-y-6">
                  {[
                    { title: "New Booking", description: "Get notified when you receive a new booking request", enabled: true },
                    { title: "Booking Updates", description: "Updates about your confirmed bookings", enabled: true },
                    { title: "Messages", description: "New messages from clients", enabled: true },
                    { title: "Reviews", description: "When clients leave a review for your service", enabled: true },
                    { title: "Payment Updates", description: "Payment confirmations and updates", enabled: true },
                    { title: "Marketing", description: "Tips, features, and promotional content", enabled: false },
                  ].map((notification, index) => (
                    <div key={index} className="flex items-start justify-between py-4 border-b border-border last:border-0">
                      <div className="flex-1">
                        <h3 className="font-medium text-foreground mb-1">{notification.title}</h3>
                        <p className="text-sm text-muted-foreground">{notification.description}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer ml-4">
                        <input
                          type="checkbox"
                          defaultChecked={notification.enabled}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-muted peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-card after:border-border after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-border flex justify-end">
                  <button
                    onClick={handleSave}
                    disabled={loading}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-400 to-blue-600 text-white font-medium rounded-lg hover:shadow-lg transition-shadow disabled:opacity-50"
                  >
                    <Save className="h-5 w-5" />
                    {loading ? "Saving..." : "Save Preferences"}
                  </button>
                </div>
              </motion.div>
            )}

            {/* Billing Settings */}
            {activeTab === "billing" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6"
              >
                <h2 className="text-xl font-semibold text-foreground mb-6">Billing & Payments</h2>

                <div className="space-y-6">
                  {/* Payment Method */}
                  <div className="p-4 border border-border rounded-lg">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-medium text-foreground mb-1">Payment Method</h3>
                        <p className="text-sm text-muted-foreground">How you receive payments from clients</p>
                      </div>
                      <button className="px-4 py-2 border border-border rounded-lg hover:bg-muted/20 transition-colors text-sm font-medium">
                        Update
                      </button>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-muted/20 rounded-lg">
                      <CreditCard className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <div className="text-sm font-medium text-foreground">Bank Account •••• 4567</div>
                        <div className="text-xs text-muted-foreground">HDFC Bank</div>
                      </div>
                    </div>
                  </div>

                  {/* Payout Schedule */}
                  <div className="p-4 border border-border rounded-lg">
                    <h3 className="font-medium text-foreground mb-4">Payout Schedule</h3>
                    <select className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent">
                      <option>Weekly (Every Monday)</option>
                      <option>Bi-weekly</option>
                      <option>Monthly</option>
                    </select>
                  </div>

                  {/* Tax Information */}
                  <div className="p-4 border border-border rounded-lg">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-medium text-foreground mb-1">Tax Information</h3>
                        <p className="text-sm text-muted-foreground">GST and tax details for invoicing</p>
                      </div>
                      <button className="px-4 py-2 border border-border rounded-lg hover:bg-muted/20 transition-colors text-sm font-medium">
                        Manage
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
