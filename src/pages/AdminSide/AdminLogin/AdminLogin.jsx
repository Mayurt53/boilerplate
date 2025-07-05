import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/Button';
import Input from '../../../components/Input';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    // Simulate admin login process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock admin credentials check
    if (formData.email === 'admin@cybertech.com' && formData.password === 'admin123') {
      navigate('/admin/dashboard');
    } else {
      setError('Invalid admin credentials');
    }
    
    setIsLoading(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-dark-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-radial from-neon-cyan/10 via-transparent to-neon-purple/10"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-dark-100 via-dark-200 to-dark-300"></div>
      </div>

      <div className="relative max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="text-6xl mb-6">👨‍💼</div>
          <h2 className="text-4xl font-cyber font-bold text-white mb-2">
            Admin Portal
          </h2>
          <p className="text-white/70">
            Access the administrative dashboard
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-dark-200 rounded-2xl p-8 border border-dark-400">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-neon-red/20 border border-neon-red text-neon-red px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <Input
              label="Admin Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="admin@cybertech.com"
              required
              icon="📧"
            />

            <Input
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter admin password"
              required
              icon="🔒"
            />

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-neon-cyan focus:ring-neon-cyan border-dark-400 rounded bg-dark-300"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-white/70">
                  Remember me
                </label>
              </div>
            </div>

            <Button
              type="submit"
              variant="cyber"
              size="lg"
              loading={isLoading}
              icon="🚀"
              className="w-full"
            >
              {isLoading ? 'Signing in...' : 'Access Admin Panel'}
            </Button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-dark-300 rounded-xl border border-dark-400">
            <h4 className="text-sm font-medium text-white mb-2">Demo Credentials</h4>
            <div className="text-xs text-white/70 space-y-1">
              <p>Email: admin@cybertech.com</p>
              <p>Password: admin123</p>
            </div>
          </div>
        </div>

        {/* Back to Main Site */}
        <div className="text-center">
          <a
            href="/"
            className="text-white/50 hover:text-white transition-colors duration-300 text-sm"
          >
            ← Back to Main Site
          </a>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin; 