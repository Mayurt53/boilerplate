import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Card from '../../components/Card';
import { useUser } from '../../contexts/UserContext';
import { useToast } from '../../contexts/ToastContext';
import useGoogleAuth from '../../hooks/useGoogleAuth';

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const { signup } = useUser();
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
    
    if (formData.password !== formData.confirmPassword) {
      showToast('Passwords do not match.', 'error');
      return;
    }

    setIsLoading(true);

    try {
      await signup(formData.email, formData.password, {
        firstName: formData.firstName,
        lastName: formData.lastName
      });
      showToast('Account created successfully!', 'success');
      navigate('/');
    } catch (error) {
      showToast('Signup failed. Please try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      await signInWithGoogle();
      showToast('Account created successfully!', 'success');
      navigate('/');
    } catch (error) {
      showToast('Google signup failed. Please try again.', 'error');
    }
  };

  return (
    <div className="min-h-screen bg-dark-50 pt-20 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <Card variant="glass" className="p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-cyber font-bold text-white mb-2">
              Create Account
            </h1>
            <p className="text-white/70">
              Join us and start your journey
            </p>
          </div>

          {/* Google Signup Button */}
          <Button
            variant="ghost"
            onClick={handleGoogleSignup}
            disabled={isGoogleLoading}
            icon="🔍"
            className="w-full mb-6 border border-dark-400 hover:border-neon-cyan"
          >
            {isGoogleLoading ? 'Creating account...' : 'Continue with Google'}
          </Button>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-dark-400"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-dark-100 text-white/50">Or sign up with email</span>
            </div>
          </div>

          {/* Signup Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                required
                icon="👤"
              />
              <Input
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                required
                icon="👤"
              />
            </div>

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

            <Input
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
              icon="🔒"
            />

            <div className="flex items-center">
              <input
                type="checkbox"
                required
                className="rounded border-dark-400 text-neon-cyan focus:ring-neon-cyan bg-dark-200"
              />
              <span className="ml-2 text-sm text-white/70">
                I agree to the{' '}
                <Link to="/terms" className="text-neon-cyan hover:text-neon-cyan/80">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link to="/privacy" className="text-neon-cyan hover:text-neon-cyan/80">
                  Privacy Policy
                </Link>
              </span>
            </div>

            <Button
              type="submit"
              variant="cyber"
              disabled={isLoading}
              icon="🚀"
              className="w-full"
            >
              {isLoading ? 'Creating account...' : 'Create Account'}
            </Button>
          </form>

          {/* Sign In Link */}
          <div className="text-center mt-6">
            <p className="text-white/70">
              Already have an account?{' '}
              <Link
                to="/login"
                className="text-neon-cyan hover:text-neon-cyan/80 font-medium transition-colors"
              >
                Sign in
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Signup; 