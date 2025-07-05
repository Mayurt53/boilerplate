import React, { useState } from 'react';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import Card from '../../../components/Card';

const AdminSettings = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('general');

  const [generalSettings, setGeneralSettings] = useState({
    siteName: 'CyberTech Solutions',
    siteDescription: 'Cutting-edge technology solutions for the future',
    contactEmail: 'admin@cybertech.com',
    supportPhone: '+1 (555) 123-4567',
    timezone: 'PST (UTC-8)',
    dateFormat: 'MM/DD/YYYY',
    timeFormat: '12-hour'
  });

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: true,
    sessionTimeout: 30,
    passwordExpiry: 90,
    maxLoginAttempts: 5,
    ipWhitelist: '',
    auditLogging: true
  });

  const [emailSettings, setEmailSettings] = useState({
    smtpHost: 'smtp.cybertech.com',
    smtpPort: 587,
    smtpUsername: 'noreply@cybertech.com',
    smtpPassword: '********',
    fromName: 'CyberTech Admin',
    fromEmail: 'noreply@cybertech.com'
  });

  const [notificationSettings, setNotificationSettings] = useState({
    newOrders: true,
    lowStock: true,
    systemAlerts: true,
    userRegistrations: false,
    emailNotifications: true,
    pushNotifications: true
  });

  const handleGeneralSave = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
  };

  const handleSecuritySave = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
  };

  const handleEmailSave = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
  };

  const handleNotificationSave = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
  };

  const tabs = [
    { id: 'general', name: 'General', icon: '⚙️' },
    { id: 'security', name: 'Security', icon: '🔒' },
    { id: 'email', name: 'Email', icon: '📧' },
    { id: 'notifications', name: 'Notifications', icon: '🔔' }
  ];

  return (
    <div className="min-h-screen bg-dark-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-cyber font-bold text-white mb-2">
            System Settings
          </h1>
          <p className="text-white/70">
            Configure system-wide settings and preferences
          </p>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 mb-8 bg-dark-200 rounded-xl p-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-neon-cyan text-dark-50 shadow-glow-cyan'
                  : 'text-white/70 hover:text-white hover:bg-dark-300'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.name}</span>
            </button>
          ))}
        </div>

        {/* General Settings */}
        {activeTab === 'general' && (
          <Card variant="glass" className="p-8">
            <h3 className="text-xl font-bold text-white mb-6">General Settings</h3>
            <form onSubmit={(e) => { e.preventDefault(); handleGeneralSave(); }} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Site Name"
                  name="siteName"
                  value={generalSettings.siteName}
                  onChange={(e) => setGeneralSettings({ ...generalSettings, siteName: e.target.value })}
                  icon="🏢"
                />
                <Input
                  label="Contact Email"
                  name="contactEmail"
                  type="email"
                  value={generalSettings.contactEmail}
                  onChange={(e) => setGeneralSettings({ ...generalSettings, contactEmail: e.target.value })}
                  icon="📧"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Site Description</label>
                <textarea
                  name="siteDescription"
                  value={generalSettings.siteDescription}
                  onChange={(e) => setGeneralSettings({ ...generalSettings, siteDescription: e.target.value })}
                  rows={3}
                  className="input resize-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Input
                  label="Support Phone"
                  name="supportPhone"
                  value={generalSettings.supportPhone}
                  onChange={(e) => setGeneralSettings({ ...generalSettings, supportPhone: e.target.value })}
                  icon="📱"
                />
                <div className="form-group">
                  <label className="form-label">Timezone</label>
                  <select
                    name="timezone"
                    value={generalSettings.timezone}
                    onChange={(e) => setGeneralSettings({ ...generalSettings, timezone: e.target.value })}
                    className="input"
                  >
                    <option value="PST (UTC-8)">PST (UTC-8)</option>
                    <option value="EST (UTC-5)">EST (UTC-5)</option>
                    <option value="GMT (UTC+0)">GMT (UTC+0)</option>
                    <option value="CET (UTC+1)">CET (UTC+1)</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Date Format</label>
                  <select
                    name="dateFormat"
                    value={generalSettings.dateFormat}
                    onChange={(e) => setGeneralSettings({ ...generalSettings, dateFormat: e.target.value })}
                    className="input"
                  >
                    <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                    <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                    <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                  </select>
                </div>
              </div>

              <Button
                type="submit"
                variant="cyber"
                loading={isLoading}
                icon="💾"
              >
                {isLoading ? 'Saving...' : 'Save General Settings'}
              </Button>
            </form>
          </Card>
        )}

        {/* Security Settings */}
        {activeTab === 'security' && (
          <Card variant="glass" className="p-8">
            <h3 className="text-xl font-bold text-white mb-6">Security Settings</h3>
            <form onSubmit={(e) => { e.preventDefault(); handleSecuritySave(); }} className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-dark-300 rounded-xl border border-dark-400">
                  <div>
                    <h4 className="text-white font-medium">Two-Factor Authentication</h4>
                    <p className="text-white/70 text-sm">Require 2FA for all admin accounts</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={securitySettings.twoFactorAuth}
                      onChange={(e) => setSecuritySettings({ ...securitySettings, twoFactorAuth: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-dark-400 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-neon-cyan"></div>
                  </label>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Input
                    label="Session Timeout (minutes)"
                    name="sessionTimeout"
                    type="number"
                    value={securitySettings.sessionTimeout}
                    onChange={(e) => setSecuritySettings({ ...securitySettings, sessionTimeout: e.target.value })}
                    icon="⏰"
                  />
                  <Input
                    label="Password Expiry (days)"
                    name="passwordExpiry"
                    type="number"
                    value={securitySettings.passwordExpiry}
                    onChange={(e) => setSecuritySettings({ ...securitySettings, passwordExpiry: e.target.value })}
                    icon="🔑"
                  />
                  <Input
                    label="Max Login Attempts"
                    name="maxLoginAttempts"
                    type="number"
                    value={securitySettings.maxLoginAttempts}
                    onChange={(e) => setSecuritySettings({ ...securitySettings, maxLoginAttempts: e.target.value })}
                    icon="🚫"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">IP Whitelist (optional)</label>
                  <textarea
                    name="ipWhitelist"
                    value={securitySettings.ipWhitelist}
                    onChange={(e) => setSecuritySettings({ ...securitySettings, ipWhitelist: e.target.value })}
                    placeholder="Enter IP addresses, one per line"
                    rows={3}
                    className="input resize-none"
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-dark-300 rounded-xl border border-dark-400">
                  <div>
                    <h4 className="text-white font-medium">Audit Logging</h4>
                    <p className="text-white/70 text-sm">Log all administrative actions</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={securitySettings.auditLogging}
                      onChange={(e) => setSecuritySettings({ ...securitySettings, auditLogging: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-dark-400 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-neon-cyan"></div>
                  </label>
                </div>
              </div>

              <Button
                type="submit"
                variant="cyber"
                loading={isLoading}
                icon="💾"
              >
                {isLoading ? 'Saving...' : 'Save Security Settings'}
              </Button>
            </form>
          </Card>
        )}

        {/* Email Settings */}
        {activeTab === 'email' && (
          <Card variant="glass" className="p-8">
            <h3 className="text-xl font-bold text-white mb-6">Email Configuration</h3>
            <form onSubmit={(e) => { e.preventDefault(); handleEmailSave(); }} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="SMTP Host"
                  name="smtpHost"
                  value={emailSettings.smtpHost}
                  onChange={(e) => setEmailSettings({ ...emailSettings, smtpHost: e.target.value })}
                  icon="🌐"
                />
                <Input
                  label="SMTP Port"
                  name="smtpPort"
                  type="number"
                  value={emailSettings.smtpPort}
                  onChange={(e) => setEmailSettings({ ...emailSettings, smtpPort: e.target.value })}
                  icon="🔌"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="SMTP Username"
                  name="smtpUsername"
                  value={emailSettings.smtpUsername}
                  onChange={(e) => setEmailSettings({ ...emailSettings, smtpUsername: e.target.value })}
                  icon="👤"
                />
                <Input
                  label="SMTP Password"
                  name="smtpPassword"
                  type="password"
                  value={emailSettings.smtpPassword}
                  onChange={(e) => setEmailSettings({ ...emailSettings, smtpPassword: e.target.value })}
                  icon="🔒"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="From Name"
                  name="fromName"
                  value={emailSettings.fromName}
                  onChange={(e) => setEmailSettings({ ...emailSettings, fromName: e.target.value })}
                  icon="📝"
                />
                <Input
                  label="From Email"
                  name="fromEmail"
                  type="email"
                  value={emailSettings.fromEmail}
                  onChange={(e) => setEmailSettings({ ...emailSettings, fromEmail: e.target.value })}
                  icon="📧"
                />
        </div>

              <Button
                type="submit"
                variant="cyber"
                loading={isLoading}
                icon="💾"
              >
                {isLoading ? 'Saving...' : 'Save Email Settings'}
              </Button>
      </form>
          </Card>
        )}

        {/* Notification Settings */}
        {activeTab === 'notifications' && (
          <Card variant="glass" className="p-8">
            <h3 className="text-xl font-bold text-white mb-6">Notification Preferences</h3>
            <form onSubmit={(e) => { e.preventDefault(); handleNotificationSave(); }} className="space-y-6">
              <div className="space-y-4">
                {[
                  { key: 'newOrders', label: 'New Orders', description: 'Notify when new orders are placed' },
                  { key: 'lowStock', label: 'Low Stock Alerts', description: 'Notify when products are running low' },
                  { key: 'systemAlerts', label: 'System Alerts', description: 'Notify about system issues and updates' },
                  { key: 'userRegistrations', label: 'User Registrations', description: 'Notify when new users register' }
                ].map((notification) => (
                  <div key={notification.key} className="flex items-center justify-between p-4 bg-dark-300 rounded-xl border border-dark-400">
                    <div>
                      <h4 className="text-white font-medium">{notification.label}</h4>
                      <p className="text-white/70 text-sm">{notification.description}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notificationSettings[notification.key]}
                        onChange={(e) => setNotificationSettings({ ...notificationSettings, [notification.key]: e.target.checked })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-dark-400 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-neon-cyan"></div>
                    </label>
                  </div>
                ))}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center justify-between p-4 bg-dark-300 rounded-xl border border-dark-400">
                    <div>
                      <h4 className="text-white font-medium">Email Notifications</h4>
                      <p className="text-white/70 text-sm">Receive notifications via email</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notificationSettings.emailNotifications}
                        onChange={(e) => setNotificationSettings({ ...notificationSettings, emailNotifications: e.target.checked })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-dark-400 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-neon-cyan"></div>
                    </label>
      </div>

                  <div className="flex items-center justify-between p-4 bg-dark-300 rounded-xl border border-dark-400">
      <div>
                      <h4 className="text-white font-medium">Push Notifications</h4>
                      <p className="text-white/70 text-sm">Receive browser push notifications</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notificationSettings.pushNotifications}
                        onChange={(e) => setNotificationSettings({ ...notificationSettings, pushNotifications: e.target.checked })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-dark-400 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-neon-cyan"></div>
                    </label>
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                variant="cyber"
                loading={isLoading}
                icon="💾"
              >
                {isLoading ? 'Saving...' : 'Save Notification Settings'}
              </Button>
            </form>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AdminSettings; 