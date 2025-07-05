import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useUser } from '../../contexts/UserContext';
import { useToast } from '../../contexts/ToastContext';
import authService from '../../services/authService';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Card from '../../components/Card';

export default function Profile() {
  const { user, updateProfile } = useUser();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    bio: user?.bio || '',
    location: user?.location || '',
    website: user?.website || '',
    company: user?.company || '',
    jobTitle: user?.jobTitle || ''
  });

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    // Update form data when user changes
    setFormData({
      firstName: user.firstName || user.name?.split(' ')[0] || '',
      lastName: user.lastName || user.name?.split(' ').slice(1).join(' ') || '',
      email: user.email || '',
      phone: user.phone || '',
      bio: user.bio || '',
      location: user.location || '',
      website: user.website || user.blog || '',
      github: user.github || '',
      linkedin: user.linkedin || '',
      jobTitle: user.jobTitle || ''
    });
  }, [user, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    
    try {
      // Update user data
      updateProfile(formData);
      
      setIsEditing(false);
      setIsLoading(false);
      
      // Show success message
      showToast('Profile updated successfully!', 'success');
    } catch (error) {
      console.error('Error updating profile:', error);
      showToast('Failed to update profile. Please try again.', 'error');
    }
  };

  const handleCancel = () => {
    setFormData({
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
      phone: user?.phone || '',
      bio: user?.bio || '',
      location: user?.location || '',
      website: user?.website || '',
      company: user?.company || '',
      jobTitle: user?.jobTitle || ''
    });
    setIsEditing(false);
  };

  const stats = [
    { label: 'Projects Completed', value: '12', icon: '🚀' },
    { label: 'Hours Worked', value: '1,240', icon: '⏱️' },
    { label: 'Client Rating', value: '4.9/5', icon: '⭐' },
    { label: 'Experience', value: '3+ years', icon: '📈' }
  ];

  const skills = [
    'React', 'Node.js', 'TypeScript', 'Python', 'AWS', 'Docker',
    'MongoDB', 'PostgreSQL', 'GraphQL', 'Kubernetes', 'Machine Learning', 'DevOps'
  ];

  const recentActivity = [
    { action: 'Completed project "E-commerce Platform"', time: '2 hours ago', icon: '✅' },
    { action: 'Updated profile information', time: '1 day ago', icon: '📝' },
    { action: 'Joined new team "AI Research"', time: '3 days ago', icon: '👥' },
    { action: 'Earned certification "AWS Solutions Architect"', time: '1 week ago', icon: '🏆' }
  ];

  if (!user) {
    return (
      <div className="min-h-screen bg-dark-50 pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-neon-cyan mx-auto mb-4"></div>
          <p className="text-white/70">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-cyber font-bold text-white mb-4">
            My Profile
          </h1>
          <p className="text-xl text-white/70">
            Manage your account settings and preferences
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <Card variant="glass" className="p-8 text-center">
              {/* Avatar */}
              <div className="w-32 h-32 mx-auto mb-6 bg-gradient-cyber rounded-full p-2">
                <div className="w-full h-full bg-dark-200 rounded-full flex items-center justify-center text-4xl">
                  {user?.firstName?.charAt(0) || 'U'}
                </div>
              </div>

              {/* User Info */}
              <h2 className="text-2xl font-bold text-white mb-2">
                {user.firstName} {user.lastName}
              </h2>
              <p className="text-neon-cyan font-mono text-sm mb-4">
                {user.jobTitle || 'Software Engineer'}
              </p>
              <p className="text-white/70 text-sm mb-6">
                {user.company || 'Tech Company'}
              </p>

              <div className="space-y-3">
                <div className="flex items-center justify-center space-x-2 text-white/70">
                  <span>📍</span>
                  <span className="text-sm">{user.location}</span>
                </div>
                <div className="flex items-center justify-center space-x-2 text-white/70">
                  <span>📧</span>
                  <span className="text-sm">{user.email}</span>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 my-6">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl mb-1">{stat.icon}</div>
                    <div className="text-lg font-bold text-white">{stat.value}</div>
                    <div className="text-xs text-white/50">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                {!isEditing ? (
                  <Button
                    variant="cyber"
                    onClick={() => setIsEditing(true)}
                    icon="✏️"
                    className="w-full"
                  >
                    Edit Profile
                  </Button>
                ) : (
                  <div className="space-y-3">
                    <Button
                      variant="cyber"
                      onClick={handleSave}
                      loading={isLoading}
                      icon="💾"
                      className="w-full"
                    >
                      Save Changes
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={handleCancel}
                      className="w-full"
                    >
                      Cancel
                    </Button>
                  </div>
                )}
              </div>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Profile Information */}
            <Card variant="glass" className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-white">Profile Information</h3>
                {!isEditing && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsEditing(true)}
                    icon="✏️"
                  >
                    Edit
                  </Button>
                )}
              </div>

              {isEditing ? (
                <form onSubmit={handleSave} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                      label="First Name"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      icon="👤"
                    />
                    <Input
                      label="Last Name"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      icon="👤"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                      label="Email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      icon="📧"
                    />
                    <Input
                      label="Phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      icon="📱"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                      label="Company"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      icon="🏢"
                    />
                    <Input
                      label="Job Title"
                      name="jobTitle"
                      value={formData.jobTitle}
                      onChange={handleInputChange}
                      icon="💼"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                      label="Location"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      icon="📍"
                    />
                    <Input
                      label="Website"
                      name="website"
                      value={formData.website}
                      onChange={handleInputChange}
                      icon="🌐"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-white/70">Bio</label>
                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleInputChange}
                      rows={4}
                      className="input resize-none"
                      placeholder="Tell us about yourself..."
                    />
                  </div>
                </form>
              ) : (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-white/70">First Name</label>
                      <p className="text-white mt-1">{user.firstName}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-white/70">Last Name</label>
                      <p className="text-white mt-1">{user.lastName}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-white/70">Email</label>
                      <p className="text-white mt-1">{user.email}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-white/70">Phone</label>
                      <p className="text-white mt-1">{user.phone || 'Not set'}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-white/70">Company</label>
                      <p className="text-white mt-1">{user.company || 'Not set'}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-white/70">Job Title</label>
                      <p className="text-white mt-1">{user.jobTitle || 'Not set'}</p>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-white/70">Bio</label>
                    <p className="text-white mt-1">{user.bio}</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-white/70">Location</label>
                      <p className="text-white mt-1">{user.location}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-white/70">Website</label>
                      <a href={user.website} className="text-neon-cyan hover:text-neon-cyan/80 mt-1 block">
                        {user.website}
                      </a>
                    </div>
                  </div>

                  {/* Social Links */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-white font-medium">GitHub</p>
                      <a href={user.github} className="text-neon-cyan hover:text-neon-cyan/80 text-sm">
                        {user.github}
                      </a>
                    </div>
                    <div>
                      <p className="text-white font-medium">LinkedIn</p>
                      <a href={user.linkedin} className="text-neon-cyan hover:text-neon-cyan/80 text-sm">
                        {user.linkedin}
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </Card>

            {/* Recent Activity */}
            <Card variant="glass" className="p-8">
              <h3 className="text-2xl font-bold text-white mb-6">Recent Activity</h3>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center space-x-4 p-4 bg-dark-200/50 rounded-xl">
                    <div className="text-2xl">{activity.icon}</div>
                    <div className="flex-1">
                      <p className="text-white font-medium">{activity.action}</p>
                      <p className="text-white/50 text-sm">{activity.time}</p>
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
} 