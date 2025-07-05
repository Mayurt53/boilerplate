import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, Legend, AreaChart, Area, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';
import Card from '../../../components/Card';
import Button from '../../../components/Button';
import DataTable from '../../../components/DataTable';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalOrders: 0,
    totalRevenue: 0,
    activeProjects: 0
  });

  const [recentOrders, setRecentOrders] = useState([]);
  const [recentUsers, setRecentUsers] = useState([]);

  useEffect(() => {
    // Simple admin route protection
    if (localStorage.getItem('isAdmin') !== 'true') {
      navigate('/admin/login');
    }

    // Simulate loading data
    setTimeout(() => {
      setStats({
        totalUsers: 1247,
        totalOrders: 892,
        totalRevenue: 2847500,
        activeProjects: 23
      });

      setRecentOrders([
        { id: 1, customer: 'John Doe', product: 'Quantum Analytics Suite', amount: 25000, status: 'completed' },
        { id: 2, customer: 'Jane Smith', product: 'Neural Network Framework', amount: 15000, status: 'pending' },
        { id: 3, customer: 'Mike Johnson', product: 'CyberShield Pro', amount: 8000, status: 'processing' },
        { id: 4, customer: 'Sarah Wilson', product: 'CloudSync Platform', amount: 12000, status: 'completed' }
      ]);

      setRecentUsers([
        { id: 1, name: 'Alice Cooper', email: 'alice@example.com', joinDate: '2024-01-15', status: 'active' },
        { id: 2, name: 'Bob Johnson', email: 'bob@example.com', joinDate: '2024-01-14', status: 'active' },
        { id: 3, name: 'Carol Davis', email: 'carol@example.com', joinDate: '2024-01-13', status: 'pending' },
        { id: 4, name: 'David Wilson', email: 'david@example.com', joinDate: '2024-01-12', status: 'active' }
      ]);
    }, 1000);
  }, [navigate]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'neon-green';
      case 'pending': return 'neon-orange';
      case 'processing': return 'neon-cyan';
      case 'active': return 'neon-green';
      default: return 'neon-red';
    }
  };

  const getStatusText = (status) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Revenue',
        data: [120000, 180000, 220000, 280000, 320000, 380000],
        borderColor: '#00ffff',
        backgroundColor: 'rgba(0, 255, 255, 0.1)',
        tension: 0.4
      },
      {
        label: 'Orders',
        data: [45, 62, 78, 95, 112, 128],
        borderColor: '#8b5cf6',
        backgroundColor: 'rgba(139, 92, 246, 0.1)',
        tension: 0.4
      }
    ]
  };

  return (
    <div className="min-h-screen bg-dark-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-cyber font-bold text-white mb-2">
            Admin Dashboard
          </h1>
          <p className="text-white/70">
            Welcome back! Here's what's happening with your business.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card variant="glass" className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/70 text-sm">Total Users</p>
                <p className="text-3xl font-bold text-white">{stats.totalUsers.toLocaleString()}</p>
              </div>
              <div className="text-4xl">👥</div>
            </div>
            <div className="mt-4 flex items-center text-neon-green text-sm">
              <span>↗</span>
              <span className="ml-1">+12% from last month</span>
            </div>
          </Card>

          <Card variant="glass" className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/70 text-sm">Total Orders</p>
                <p className="text-3xl font-bold text-white">{stats.totalOrders.toLocaleString()}</p>
              </div>
              <div className="text-4xl">📦</div>
            </div>
            <div className="mt-4 flex items-center text-neon-cyan text-sm">
              <span>↗</span>
              <span className="ml-1">+8% from last month</span>
            </div>
          </Card>

          <Card variant="glass" className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/70 text-sm">Total Revenue</p>
                <p className="text-3xl font-bold text-white">${(stats.totalRevenue / 1000000).toFixed(1)}M</p>
              </div>
              <div className="text-4xl">💰</div>
            </div>
            <div className="mt-4 flex items-center text-neon-purple text-sm">
              <span>↗</span>
              <span className="ml-1">+15% from last month</span>
            </div>
          </Card>

          <Card variant="glass" className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/70 text-sm">Active Projects</p>
                <p className="text-3xl font-bold text-white">{stats.activeProjects}</p>
              </div>
              <div className="text-4xl">🚀</div>
            </div>
            <div className="mt-4 flex items-center text-neon-pink text-sm">
              <span>↗</span>
              <span className="ml-1">+3 new this week</span>
            </div>
          </Card>
        </div>

        {/* Charts and Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Revenue Chart */}
          <Card variant="glass" className="p-6">
            <h3 className="text-xl font-bold text-white mb-6">Revenue Overview</h3>
            <div className="h-64 bg-dark-300 rounded-xl flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl mb-4">📊</div>
                <p className="text-white/70">Interactive Chart Coming Soon</p>
                <p className="text-white/50 text-sm">Revenue and Orders Analytics</p>
              </div>
            </div>
          </Card>

          {/* Quick Actions */}
          <Card variant="glass" className="p-6">
            <h3 className="text-xl font-bold text-white mb-6">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-4">
              <Button 
                variant="neon" 
                size="lg" 
                icon="➕" 
                className="w-full"
                onClick={() => navigate('/admin/products')}
              >
                Add Product
              </Button>
              <Button 
                variant="neon" 
                size="lg" 
                icon="👥" 
                className="w-full"
                onClick={() => navigate('/admin/applicants')}
              >
                Manage Users
              </Button>
              <Button 
                variant="neon" 
                size="lg" 
                icon="📦" 
                className="w-full"
                onClick={() => navigate('/admin/orders')}
              >
                View Orders
              </Button>
              <Button 
                variant="neon" 
                size="lg" 
                icon="📊" 
                className="w-full"
                onClick={() => navigate('/admin/settings')}
              >
                Analytics
              </Button>
            </div>
          </Card>
        </div>

        {/* Recent Orders */}
        <Card variant="glass" className="p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white">Recent Orders</h3>
            <Button 
              variant="ghost" 
              size="sm" 
              icon="👁️"
              onClick={() => navigate('/admin/orders')}
            >
              View All
            </Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-dark-400">
                  <th className="text-left py-3 px-4 text-white/70 font-medium">Order ID</th>
                  <th className="text-left py-3 px-4 text-white/70 font-medium">Customer</th>
                  <th className="text-left py-3 px-4 text-white/70 font-medium">Product</th>
                  <th className="text-left py-3 px-4 text-white/70 font-medium">Amount</th>
                  <th className="text-left py-3 px-4 text-white/70 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id} className="border-b border-dark-400/50">
                    <td className="py-3 px-4 text-white font-mono">#{order.id}</td>
                    <td className="py-3 px-4 text-white">{order.customer}</td>
                    <td className="py-3 px-4 text-white/80">{order.product}</td>
                    <td className="py-3 px-4 text-neon-cyan font-bold">${order.amount.toLocaleString()}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-bold bg-${getStatusColor(order.status)}/20 text-${getStatusColor(order.status)} border border-${getStatusColor(order.status)}`}>
                        {getStatusText(order.status)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Recent Users */}
        <Card variant="glass" className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white">Recent Users</h3>
            <Button 
              variant="ghost" 
              size="sm" 
              icon="👁️"
              onClick={() => navigate('/admin/applicants')}
            >
              View All
            </Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-dark-400">
                  <th className="text-left py-3 px-4 text-white/70 font-medium">User ID</th>
                  <th className="text-left py-3 px-4 text-white/70 font-medium">Name</th>
                  <th className="text-left py-3 px-4 text-white/70 font-medium">Email</th>
                  <th className="text-left py-3 px-4 text-white/70 font-medium">Join Date</th>
                  <th className="text-left py-3 px-4 text-white/70 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentUsers.map((user) => (
                  <tr key={user.id} className="border-b border-dark-400/50">
                    <td className="py-3 px-4 text-white font-mono">#{user.id}</td>
                    <td className="py-3 px-4 text-white">{user.name}</td>
                    <td className="py-3 px-4 text-white/80">{user.email}</td>
                    <td className="py-3 px-4 text-white/70">{user.joinDate}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-bold bg-${getStatusColor(user.status)}/20 text-${getStatusColor(user.status)} border border-${getStatusColor(user.status)}`}>
                        {getStatusText(user.status)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard; 