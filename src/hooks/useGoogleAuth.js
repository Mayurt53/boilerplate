import { useState } from 'react';
import { signInWithGoogle } from '../integrations/google/auth.js';

export default function useGoogleAuth() {
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error('Google sign-in error:', error);
      throw error;
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return { 
    signInWithGoogle: handleGoogleSignIn, 
    isGoogleLoading 
  };
} 