import { useState } from "react";
import { User, Mail, Phone, MapPin, Calendar, Edit2, Save, X, Camera, Shield } from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";

export function UserProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  
  const [profileData, setProfileData] = useState({
    name: "Rajesh Kumar",
    email: "rajesh.kumar@example.com",
    phone: "+91 9876543210",
    address: "123, MG Road, Chhatrapati Sambhajinagar, Maharashtra - 431001",
    city: "Chhatrapati Sambhajinagar",
    state: "Maharashtra",
    pincode: "431001",
    joinedDate: "January 2026",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [tempData, setTempData] = useState(profileData);

  const handleEdit = () => {
    setIsEditing(true);
    setTempData(profileData);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setTempData(profileData);
  };

  const handleSave = () => {
    setProfileData(tempData);
    setIsEditing(false);
    toast.success("Profile updated successfully!");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTempData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("New passwords don't match!");
      return;
    }

    if (passwordData.newPassword.length < 8) {
      toast.error("Password must be at least 8 characters!");
      return;
    }

    // Simulate password change
    toast.success("Password changed successfully!");
    setIsChangingPassword(false);
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
        <p className="text-gray-600 mt-1">Manage your personal information and preferences</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-1"
        >
          <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
            <div className="relative inline-block mb-4">
              <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-4xl font-bold">
                {profileData.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <button className="absolute bottom-0 right-0 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition-colors shadow-lg">
                <Camera className="h-5 w-5" />
              </button>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-1">{profileData.name}</h2>
            <p className="text-gray-600 mb-4">{profileData.email}</p>

            <div className="flex items-center justify-center gap-2 text-sm text-gray-600 mb-6">
              <Calendar className="h-4 w-4" />
              <span>Member since {profileData.joinedDate}</span>
            </div>

            <div className="pt-6 border-t border-gray-200">
              <div className="text-sm text-gray-600 mb-2">Account Status</div>
              <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full font-medium">
                <Shield className="h-4 w-4" />
                Verified
              </div>
            </div>
          </div>
        </motion.div>

        {/* Profile Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2"
        >
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Personal Information</h3>
              {!isEditing ? (
                <button
                  onClick={handleEdit}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Edit2 className="h-4 w-4" />
                  Edit Profile
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={handleCancel}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    <X className="h-4 w-4" />
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <Save className="h-4 w-4" />
                    Save Changes
                  </button>
                </div>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Full Name
                  </div>
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={tempData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                ) : (
                  <div className="px-4 py-2.5 bg-gray-50 rounded-lg text-gray-900">
                    {profileData.name}
                  </div>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Email Address
                  </div>
                </label>
                <div className="px-4 py-2.5 bg-gray-50 rounded-lg text-gray-900">
                  {profileData.email}
                  <span className="text-xs text-gray-500 ml-2">(Cannot be changed)</span>
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    Phone Number
                  </div>
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    name="phone"
                    value={tempData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                ) : (
                  <div className="px-4 py-2.5 bg-gray-50 rounded-lg text-gray-900">
                    {profileData.phone}
                  </div>
                )}
              </div>

              {/* City */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    City
                  </div>
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="city"
                    value={tempData.city}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                ) : (
                  <div className="px-4 py-2.5 bg-gray-50 rounded-lg text-gray-900">
                    {profileData.city}
                  </div>
                )}
              </div>

              {/* State */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="state"
                    value={tempData.state}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                ) : (
                  <div className="px-4 py-2.5 bg-gray-50 rounded-lg text-gray-900">
                    {profileData.state}
                  </div>
                )}
              </div>

              {/* Pincode */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Pincode</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="pincode"
                    value={tempData.pincode}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                ) : (
                  <div className="px-4 py-2.5 bg-gray-50 rounded-lg text-gray-900">
                    {profileData.pincode}
                  </div>
                )}
              </div>

              {/* Address */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Address
                </label>
                {isEditing ? (
                  <textarea
                    name="address"
                    value={tempData.address}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                ) : (
                  <div className="px-4 py-2.5 bg-gray-50 rounded-lg text-gray-900">
                    {profileData.address}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Password Section */}
          <div className="bg-white rounded-2xl p-6 shadow-lg mt-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900">Security</h3>
                <p className="text-sm text-gray-600 mt-1">Manage your password and security settings</p>
              </div>
              {!isChangingPassword && (
                <button
                  onClick={() => setIsChangingPassword(true)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Change Password
                </button>
              )}
            </div>

            {isChangingPassword && (
              <motion.form
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                onSubmit={handlePasswordSubmit}
                className="space-y-4"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Password
                  </label>
                  <input
                    type="password"
                    name="currentPassword"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                    required
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    New Password
                  </label>
                  <input
                    type="password"
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    required
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                    required
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIsChangingPassword(false);
                      setPasswordData({
                        currentPassword: "",
                        newPassword: "",
                        confirmPassword: "",
                      });
                    }}
                    className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Update Password
                  </button>
                </div>
              </motion.form>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
