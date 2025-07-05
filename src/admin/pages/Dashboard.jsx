import React from 'react';
import AdminLayout from '../components/AdminLayout';

const Dashboard = () => {
  return (
    <AdminLayout>
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-4 text-neon-cyan">Admin Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-dark-200 rounded-xl p-6 shadow-glow-cyan">
            <div className="text-2xl font-bold text-white">Users</div>
            <div className="text-4xl text-neon-cyan font-mono mt-2">0</div>
          </div>
          <div className="bg-dark-200 rounded-xl p-6 shadow-glow-cyan">
            <div className="text-2xl font-bold text-white">Orders</div>
            <div className="text-4xl text-neon-cyan font-mono mt-2">0</div>
          </div>
          <div className="bg-dark-200 rounded-xl p-6 shadow-glow-cyan">
            <div className="text-2xl font-bold text-white">Revenue</div>
            <div className="text-4xl text-neon-cyan font-mono mt-2">$0</div>
          </div>
          <div className="bg-dark-200 rounded-xl p-6 shadow-glow-cyan">
            <div className="text-2xl font-bold text-white">Projects</div>
            <div className="text-4xl text-neon-cyan font-mono mt-2">0</div>
          </div>
        </div>
        <div className="bg-dark-200 rounded-xl p-6 shadow-glow-cyan mt-8">
          <h2 className="text-xl font-bold text-white mb-4">Recent Activity</h2>
          <div className="text-white/70">No recent activity yet.</div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard; 