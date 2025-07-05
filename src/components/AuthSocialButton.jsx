import React, { useState } from 'react';
import { motion } from 'framer-motion';
import useGoogleAuth from '../hooks/useGoogleAuth.js';
import useGitHubAuth from '../hooks/useGitHubAuth.js';
import { useToast } from '../contexts/ToastContext';

const icons = {
  google: (
    <svg className="w-5 h-5 mr-2" viewBox="0 0 48 48"><g><path fill="#4285F4" d="M24 9.5c3.54 0 6.36 1.46 7.82 2.68l5.77-5.77C34.36 3.54 29.64 1.5 24 1.5 14.82 1.5 6.98 7.5 3.5 15.5l6.91 5.37C12.1 15.09 17.56 9.5 24 9.5z"/><path fill="#34A853" d="M46.5 24c0-1.64-.15-3.22-.42-4.74H24v9.24h12.7c-.55 2.97-2.18 5.48-4.64 7.18l7.18 5.59C43.98 37.02 46.5 30.98 46.5 24z"/><path fill="#FBBC05" d="M10.41 28.13A14.48 14.48 0 019.5 24c0-1.42.24-2.8.67-4.13l-6.91-5.37A23.93 23.93 0 00.5 24c0 3.77.9 7.34 2.49 10.5l7.42-6.37z"/><path fill="#EA4335" d="M24 46.5c6.48 0 11.92-2.15 15.9-5.86l-7.18-5.59c-2 1.41-4.56 2.25-8.72 2.25-6.44 0-11.9-5.59-13.59-12.63l-7.42 6.37C6.98 40.5 14.82 46.5 24 46.5z"/></g></svg>
  ),
  github: (
    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.339-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.987 1.029-2.686-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.748-1.025 2.748-1.025.546 1.378.202 2.397.1 2.65.64.699 1.028 1.593 1.028 2.686 0 3.847-2.337 4.695-4.566 4.944.359.309.678.919.678 1.852 0 1.336-.012 2.417-.012 2.747 0 .267.18.577.688.479C19.138 20.2 22 16.447 22 12.021 22 6.484 17.523 2 12 2z"/></svg>
  ),
};

export default function AuthSocialButton({ provider, text, onSuccess, onError, ...props }) {
  const [isLoading, setIsLoading] = useState(false);
  const { signInWithGoogle } = useGoogleAuth();
  const { signInWithGitHub } = useGitHubAuth();
  const { showSuccess, showError } = useToast();

  const handleAuth = async () => {
    setIsLoading(true);
    try {
      let result;
      
      if (provider === 'google') {
        result = await signInWithGoogle();
      } else if (provider === 'github') {
        result = await signInWithGitHub();
      } else {
        throw new Error(`Unsupported provider: ${provider}`);
      }

      // Store user data in localStorage
      localStorage.setItem(`${provider}_user_data`, JSON.stringify(result));
      
      // Call success callback if provided
      if (onSuccess) {
        onSuccess(result);
      } else {
        // Default success behavior - show welcome message and reload
        const userName = result.user.name || result.user.displayName || result.user.login || result.user.email.split('@')[0];
        showSuccess(`Welcome, ${userName}!`);
        window.location.reload();
      }
    } catch (error) {
      console.error(`${provider} authentication error:`, error);
      
      // Call error callback if provided
      if (onError) {
        onError(error);
      } else {
              // Default error behavior
      showError(`${provider} authentication failed: ${error.message}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      type="button"
      className={`w-full flex items-center justify-center py-3 rounded-lg border-2 border-gray-200 bg-white text-gray-700 font-semibold shadow-sm hover:border-purple-300 hover:bg-purple-50 transition-all duration-200 ${
        isLoading ? 'opacity-50 cursor-not-allowed' : ''
      }`}
      onClick={handleAuth}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <div className="flex items-center">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-600 mr-2"></div>
          Connecting...
        </div>
      ) : (
        <>
          {icons[provider]}
          {text}
        </>
      )}
    </motion.button>
  );
} 