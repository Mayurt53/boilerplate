import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/Button';
import Input from '../../components/Input';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate password reset process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsLoading(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-dark-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-radial from-neon-cyan/10 via-transparent to-neon-purple/10"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-dark-100 via-dark-200 to-dark-300"></div>
        </div>

        <div className="relative max-w-md w-full space-y-8">
          <div className="text-center">
            <div className="text-6xl mb-6">✅</div>
            <h2 className="text-4xl font-cyber font-bold text-white mb-2">
              Check Your Email
            </h2>
            <p className="text-white/70 mb-8">
              We've sent a password reset link to your email address.
            </p>
          </div>

          <div className="bg-dark-200 rounded-2xl p-8 border border-dark-400 text-center">
            <div className="text-4xl mb-4">📧</div>
            <h3 className="text-xl font-bold text-white mb-4">
              Reset Link Sent
            </h3>
            <p className="text-white/70 mb-6">
              Please check your email and click the link to reset your password. The link will expire in 1 hour.
            </p>
            <Button
              variant="ghost"
              size="lg"
              onClick={() => setIsSubmitted(false)}
              icon="🔄"
            >
              Try Again
            </Button>
          </div>

          <div className="text-center">
            <Link
              to="/login"
              className="text-neon-cyan hover:text-neon-cyan/80 transition-colors duration-300"
            >
              ← Back to Sign In
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-radial from-neon-cyan/10 via-transparent to-neon-purple/10"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-dark-100 via-dark-200 to-dark-300"></div>
      </div>

      <div className="relative max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="text-6xl mb-6">🔐</div>
          <h2 className="text-4xl font-cyber font-bold text-white mb-2">
            Reset Password
          </h2>
          <p className="text-white/70">
            Enter your email address and we'll send you a link to reset your password.
          </p>
        </div>

        {/* Reset Form */}
        <div className="bg-dark-200 rounded-2xl p-8 border border-dark-400">
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Email Address"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your.email@example.com"
              required
              icon="📧"
            />

            <Button
              type="submit"
              variant="cyber"
              size="lg"
              loading={isLoading}
              icon="🚀"
              className="w-full"
            >
              {isLoading ? 'Sending...' : 'Send Reset Link'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-white/50 text-sm">
              Remember your password?{' '}
              <Link
                to="/login"
                className="text-neon-cyan hover:text-neon-cyan/80 transition-colors duration-300"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center">
          <Link
            to="/"
            className="text-white/50 hover:text-white transition-colors duration-300 text-sm"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword; 