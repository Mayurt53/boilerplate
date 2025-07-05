import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Card from '../../components/Card';
import { useUser } from '../../contexts/UserContext';
import { useToast } from '../../contexts/ToastContext';
import useGoogleAuth from '../../hooks/useGoogleAuth';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useUser();
  const { showToast } = useToast();
  const { signInWithGoogle, isGoogleLoading } = useGoogleAuth();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await login(formData.email, formData.password);
      showToast('Login successful!', 'success');
      navigate('/');
    } catch (error) {
      showToast('Login failed. Please check your credentials.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      showToast('Login successful!', 'success');
      navigate('/');
    } catch (error) {
      showToast('Google login failed. Please try again.', 'error');
    }
  };

  return (
    <div className="min-h-screen bg-dark-50 pt-20 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <Card variant="glass" className="p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-cyber font-bold text-white mb-2">
              Welcome Back
            </h1>
            <p className="text-white/70">
              Sign in to your account to continue
            </p>
          </div>

          {/* Google Login Button */}
          <Button
            variant="ghost"
            onClick={handleGoogleLogin}
            disabled={isGoogleLoading}
            icon="🔍"
            className="w-full mb-6 border border-dark-400 hover:border-neon-cyan"
          >
            {isGoogleLoading ? 'Signing in...' : 'Continue with Google'}
          </Button>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-dark-400"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-dark-100 text-white/50">Or continue with email</span>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              icon="📧"
            />

            <Input
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              icon="🔒"
            />

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="rounded border-dark-400 text-neon-cyan focus:ring-neon-cyan bg-dark-200"
                />
                <span className="ml-2 text-sm text-white/70">Remember me</span>
              </label>
              <Link
                to="/forgot-password"
                className="text-sm text-neon-cyan hover:text-neon-cyan/80 transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              variant="cyber"
              disabled={isLoading}
              icon="🚀"
              className="w-full"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          {/* Sign Up Link */}
          <div className="text-center mt-6">
            <p className="text-white/70">
              Don't have an account?{' '}
              <Link
                to="/signup"
                className="text-neon-cyan hover:text-neon-cyan/80 font-medium transition-colors"
              >
                Sign up
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Login; 