import React, { useState } from 'react';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import Card from '../../../components/Card';
import {
  useGetStaffQuery,
  useAddStaffMutation,
  useUpdateStaffMutation,
  useDeleteStaffMutation,
} from '../../../services/apiSlice';

const AdminProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [profileData, setProfileData] = useState({
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@cybertech.com',
    phone: '+1 (555) 123-4567',
    role: 'System Administrator',
    department: 'IT Management',
    bio: 'Experienced system administrator with expertise in cybersecurity, cloud infrastructure, and team management. Passionate about implementing cutting-edge technology solutions.',
    location: 'San Francisco, CA',
    timezone: 'PST (UTC-8)',
    permissions: ['user_management', 'product_management', 'order_management', 'analytics', 'system_settings'],
    lastLogin: '2024-01-15 14:30:00',
    accountCreated: '2023-01-01'
  });

  const [formData, setFormData] = useState(profileData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate profile update
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setProfileData(formData);
    setIsEditing(false);
    setIsLoading(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleCancel = () => {
    setFormData(profileData);
    setIsEditing(false);
  };

  const permissions = [
    { id: 'user_management', name: 'User Management', icon: '👥', color: 'neon-cyan' },
    { id: 'product_management', name: 'Product Management', icon: '📦', color: 'neon-purple' },
    { id: 'order_management', name: 'Order Management', icon: '🛒', color: 'neon-pink' },
    { id: 'analytics', name: 'Analytics', icon: '📊', color: 'neon-green' },
    { id: 'system_settings', name: 'System Settings', icon: '⚙️', color: 'neon-orange' }
  ];

  const activityLog = [
    { action: 'Updated product catalog', time: '2024-01-15 14:30:00', type: 'product' },
    { action: 'Processed 5 orders', time: '2024-01-15 13:45:00', type: 'order' },
    { action: 'Added new user account', time: '2024-01-15 12:20:00', type: 'user' },
    { action: 'Generated monthly report', time: '2024-01-15 11:15:00', type: 'analytics' },
    { action: 'Updated system settings', time: '2024-01-15 10:30:00', type: 'settings' }
  ];

  const getActivityIcon = (type) => {
    switch (type) {
      case 'product': return '📦';
      case 'order': return '🛒';
      case 'user': return '👥';
      case 'analytics': return '📊';
      case 'settings': return '⚙️';
      default: return '📝';
    }
  };

  return (
    <div className="min-h-screen bg-dark-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-cyber font-bold text-white mb-2">
            Admin Profile
          </h1>
          <p className="text-white/70">
            Manage your administrative account settings
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <Card variant="glass" className="p-8 text-center">
              <div className="relative mb-6">
                <div className="w-32 h-32 mx-auto bg-gradient-cyber rounded-full p-1">
                  <div className="w-full h-full bg-dark-200 rounded-full flex items-center justify-center text-4xl">
                    👨‍💼
                  </div>
                </div>
                {!isEditing && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="absolute bottom-0 right-0 w-10 h-10 bg-neon-cyan rounded-full flex items-center justify-center text-dark-50 hover:bg-neon-cyan/80 transition-colors duration-300"
                  >
                    ✏️
                  </button>
                )}
              </div>

              <h2 className="text-2xl font-bold text-white mb-2">
                {profileData.firstName} {profileData.lastName}
              </h2>
              <p className="text-neon-cyan font-mono text-sm mb-4">
                {profileData.role}
              </p>
              <p className="text-white/70 text-sm mb-6">
                {profileData.department}
              </p>

              <div className="space-y-3">
                <div className="flex items-center justify-center space-x-2 text-white/70">
                  <span>📧</span>
                  <span className="text-sm">{profileData.email}</span>
                </div>
                <div className="flex items-center justify-center space-x-2 text-white/70">
                  <span>📍</span>
                  <span className="text-sm">{profileData.location}</span>
                </div>
                <div className="flex items-center justify-center space-x-2 text-white/70">
                  <span>🕐</span>
                  <span className="text-sm">{profileData.timezone}</span>
                </div>
              </div>
            </Card>

            {/* Account Stats */}
            <Card variant="glass" className="p-6 mt-6">
              <h3 className="text-lg font-bold text-white mb-4">Account Information</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-white/70">Account Created:</span>
                  <span className="text-white">{profileData.accountCreated}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Last Login:</span>
                  <span className="text-white">{profileData.lastLogin}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Permissions:</span>
                  <span className="text-neon-cyan">{profileData.permissions.length}</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Form */}
            <Card variant="glass" className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">Profile Information</h3>
                {!isEditing && (
                  <Button
                    variant="neon"
                    size="sm"
                    onClick={() => setIsEditing(true)}
                    icon="✏️"
                  >
                    Edit Profile
                  </Button>
                )}
              </div>

              {isEditing ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                      label="First Name"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      icon="👤"
                    />
                    <Input
                      label="Last Name"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      icon="👤"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                      label="Email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      icon="📧"
                    />
                    <Input
                      label="Phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      icon="📱"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                      label="Role"
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      icon="💼"
                    />
                    <Input
                      label="Department"
                      name="department"
                      value={formData.department}
                      onChange={handleChange}
                      icon="🏢"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Bio</label>
                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleChange}
                      rows={4}
                      className="input resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                      label="Location"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      icon="📍"
                    />
                    <Input
                      label="Timezone"
                      name="timezone"
                      value={formData.timezone}
                      onChange={handleChange}
                      icon="🕐"
                    />
                  </div>

                  <div className="flex gap-4">
                    <Button
                      type="submit"
                      variant="cyber"
                      loading={isLoading}
                      icon="💾"
                    >
                      {isLoading ? 'Saving...' : 'Save Changes'}
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={handleCancel}
                      icon="❌"
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-white/70">Bio</label>
                    <p className="text-white mt-1">{profileData.bio}</p>
                  </div>
                </div>
              )}
            </Card>

            {/* Permissions */}
            <Card variant="glass" className="p-8">
              <h3 className="text-xl font-bold text-white mb-6">Permissions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {permissions.map((permission) => (
                  <div
                    key={permission.id}
                    className={`flex items-center space-x-3 p-4 rounded-xl border ${
                      profileData.permissions.includes(permission.id)
                        ? `border-${permission.color} bg-${permission.color}/10`
                        : 'border-dark-400 bg-dark-300'
                    }`}
                  >
                    <div className="text-2xl">{permission.icon}</div>
                    <div>
                      <p className="text-white font-medium">{permission.name}</p>
                      <p className={`text-sm ${
                        profileData.permissions.includes(permission.id)
                          ? `text-${permission.color}`
                          : 'text-white/50'
                      }`}>
                        {profileData.permissions.includes(permission.id) ? 'Granted' : 'Not Granted'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Recent Activity */}
            <Card variant="glass" className="p-8">
              <h3 className="text-xl font-bold text-white mb-6">Recent Activity</h3>
              <div className="space-y-4">
                {activityLog.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-4 p-4 bg-dark-300 rounded-xl border border-dark-400"
                  >
                    <div className="text-2xl">{getActivityIcon(activity.type)}</div>
                    <div className="flex-1">
                      <p className="text-white font-medium">{activity.action}</p>
                      <p className="text-white/70 text-sm">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile; 