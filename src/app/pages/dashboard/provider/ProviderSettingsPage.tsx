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
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-1">Manage your account preferences and settings</p>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Tabs Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl p-2 shadow-sm">
            <nav className="space-y-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left ${
                      activeTab === tab.id
                        ? "bg-blue-50 text-blue-600 font-medium"
                        : "text-gray-700 hover:bg-gray-50"
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
          <div className="bg-white rounded-2xl shadow-sm">
            {/* Profile Settings */}
            {activeTab === "profile" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6"
              >
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Profile Information</h2>

                {/* Profile Photo */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Profile Photo
                  </label>
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white text-2xl font-medium">
                      JS
                    </div>
                    <div>
                      <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
                        <Camera className="h-4 w-4" />
                        Change Photo
                      </button>
                      <p className="text-xs text-gray-500 mt-1">JPG, PNG or GIF, max 2MB</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        defaultValue="JS"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        defaultValue="CyberHub"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      defaultValue="raghavendrakanade13@gmail.com"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      defaultValue="+91 8446173815"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location
                    </label>
                    <input
                      type="text"
                      defaultValue="Chhatrapati Sambhajinagar"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Bio
                    </label>
                    <textarea
                      rows={4}
                      defaultValue="Professional cybersecurity consultant and business advisor specializing in network security, web development, and business consulting."
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200 flex justify-end">
                  <button
                    onClick={handleSave}
                    disabled={loading}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-lg hover:shadow-lg transition-shadow disabled:opacity-50"
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
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Security Settings</h2>

                <div className="space-y-6">
                  {/* Change Password */}
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-medium text-gray-900 mb-1">Password</h3>
                        <p className="text-sm text-gray-600">Last changed 3 months ago</p>
                      </div>
                      <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
                        Change Password
                      </button>
                    </div>
                  </div>

                  {/* Two-Factor Authentication */}
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-medium text-gray-900 mb-1">Two-Factor Authentication</h3>
                        <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
                      </div>
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                        Enable
                      </button>
                    </div>
                  </div>

                  {/* Active Sessions */}
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h3 className="font-medium text-gray-900 mb-4">Active Sessions</h3>
                    <div className="space-y-3">
                      {[
                        { device: "Chrome on Windows", location: "Mumbai, India", time: "Active now" },
                        { device: "Safari on iPhone", location: "Mumbai, India", time: "2 days ago" },
                      ].map((session, index) => (
                        <div key={index} className="flex items-center justify-between py-2">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{session.device}</div>
                            <div className="text-xs text-gray-600">{session.location} • {session.time}</div>
                          </div>
                          {index > 0 && (
                            <button className="text-sm text-red-600 hover:text-red-700 font-medium">
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
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Notification Preferences</h2>

                <div className="space-y-6">
                  {[
                    { title: "New Booking", description: "Get notified when you receive a new booking request", enabled: true },
                    { title: "Booking Updates", description: "Updates about your confirmed bookings", enabled: true },
                    { title: "Messages", description: "New messages from clients", enabled: true },
                    { title: "Reviews", description: "When clients leave a review for your service", enabled: true },
                    { title: "Payment Updates", description: "Payment confirmations and updates", enabled: true },
                    { title: "Marketing", description: "Tips, features, and promotional content", enabled: false },
                  ].map((notification, index) => (
                    <div key={index} className="flex items-start justify-between py-4 border-b border-gray-200 last:border-0">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 mb-1">{notification.title}</h3>
                        <p className="text-sm text-gray-600">{notification.description}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer ml-4">
                        <input
                          type="checkbox"
                          defaultChecked={notification.enabled}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200 flex justify-end">
                  <button
                    onClick={handleSave}
                    disabled={loading}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-lg hover:shadow-lg transition-shadow disabled:opacity-50"
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
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Billing & Payments</h2>

                <div className="space-y-6">
                  {/* Payment Method */}
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-medium text-gray-900 mb-1">Payment Method</h3>
                        <p className="text-sm text-gray-600">How you receive payments from clients</p>
                      </div>
                      <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
                        Update
                      </button>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <CreditCard className="h-5 w-5 text-gray-600" />
                      <div>
                        <div className="text-sm font-medium text-gray-900">Bank Account •••• 4567</div>
                        <div className="text-xs text-gray-600">HDFC Bank</div>
                      </div>
                    </div>
                  </div>

                  {/* Payout Schedule */}
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h3 className="font-medium text-gray-900 mb-4">Payout Schedule</h3>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option>Weekly (Every Monday)</option>
                      <option>Bi-weekly</option>
                      <option>Monthly</option>
                    </select>
                  </div>

                  {/* Tax Information */}
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-medium text-gray-900 mb-1">Tax Information</h3>
                        <p className="text-sm text-gray-600">GST and tax details for invoicing</p>
                      </div>
                      <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
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
