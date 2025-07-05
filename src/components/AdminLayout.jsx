import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import Button from './Button';

const adminLinks = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: '📊' },
  { to: '/admin/orders', label: 'Orders', icon: '📦' },
  { to: '/admin/products', label: 'Products', icon: '🛒' },
  { to: '/admin/applicants', label: 'Applicants', icon: '📝' },
  { to: '/admin/projects', label: 'Projects', icon: '🚀' },
  { to: '/admin/profile', label: 'Profile', icon: '👤' },
  { to: '/admin/settings', label: 'Settings', icon: '⚙️' },
];

function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen flex bg-dark-50">
      {/* Sidebar */}
      <div className={`fixed z-30 inset-y-0 left-0 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-300 ease-in-out bg-dark-200 w-64 border-r border-dark-400 shadow-2xl flex flex-col`}>
        {/* Sidebar Header */}
        <div className="flex items-center justify-between px-6 py-6 border-b border-dark-400">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-cyber rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            <span className="text-xl font-cyber font-bold text-white">Admin Panel</span>
          </div>
          <button 
            className="md:hidden w-8 h-8 bg-dark-300 rounded-lg flex items-center justify-center text-neon-cyan border border-dark-400 hover:border-neon-cyan transition-colors duration-300"
            onClick={() => setSidebarOpen(false)}
          >
            <span className="text-lg">×</span>
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {adminLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                location.pathname === link.to 
                  ? 'bg-neon-cyan/20 text-neon-cyan border border-neon-cyan shadow-glow-cyan' 
                  : 'text-white/70 hover:text-white hover:bg-dark-300 border border-transparent'
              }`}
              onClick={() => setSidebarOpen(false)}
            >
              <span className="text-xl">{link.icon}</span>
              <span>{link.label}</span>
            </Link>
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-dark-400">
          <div className="text-center">
            <p className="text-white/50 text-xs font-mono">CyberTech Solutions</p>
            <p className="text-white/30 text-xs">Admin v2.0</p>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black/80 backdrop-blur-sm md:hidden" 
          onClick={() => setSidebarOpen(false)} 
        />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-dark-200 border-b border-dark-400 shadow-lg sticky top-0 z-10">
          <div className="flex items-center space-x-4">
            <button 
              className="md:hidden w-10 h-10 bg-dark-300 rounded-lg flex items-center justify-center text-neon-cyan border border-dark-400 hover:border-neon-cyan transition-colors duration-300"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="text-xl">☰</span>
            </button>
            <div className="hidden md:flex items-center space-x-4">
              <button 
                className="w-10 h-10 bg-dark-300 rounded-lg flex items-center justify-center text-neon-cyan border border-dark-400 hover:border-neon-cyan transition-colors duration-300"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                <span className="text-xl">☰</span>
              </button>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-cyber rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">A</span>
                </div>
                <span className="text-lg font-cyber font-bold text-white">Admin Dashboard</span>
              </div>
            </div>
          </div>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              className="w-10 h-10 rounded-full bg-gradient-cyber text-white font-bold flex items-center justify-center focus:outline-none border border-dark-400 hover:border-neon-cyan transition-colors duration-300"
              onClick={() => setProfileOpen((v) => !v)}
            >
              A
            </button>
            {profileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-dark-200 rounded-xl shadow-2xl border border-dark-400 py-2 z-50">
                <button
                  className="block w-full text-left px-4 py-3 text-white hover:bg-dark-300 transition-colors duration-300"
                  onClick={() => { setProfileOpen(false); navigate('/admin/profile'); }}
                >
                  <div className="flex items-center space-x-3">
                    <span>👤</span>
                    <span>Profile</span>
                  </div>
                </button>
                <button
                  className="block w-full text-left px-4 py-3 text-white hover:bg-dark-300 transition-colors duration-300"
                  onClick={() => { setProfileOpen(false); navigate('/admin/settings'); }}
                >
                  <div className="flex items-center space-x-3">
                    <span>⚙️</span>
                    <span>Settings</span>
                  </div>
                </button>
                <div className="border-t border-dark-400 my-2"></div>
                <button
                  className="block w-full text-left px-4 py-3 text-neon-red hover:bg-dark-300 transition-colors duration-300"
                  onClick={handleLogout}
                >
                  <div className="flex items-center space-x-3">
                    <span>🚪</span>
                    <span>Logout</span>
                  </div>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Page content */}
        <div className="flex-1 md:ml-64">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AdminLayout; 