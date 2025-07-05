import { signInWithGitHub, handleGitHubCallback, signOutFromGitHub } from '../integrations/github/auth.js';

export default function useGitHubAuth() {
  return { 
    signInWithGitHub, 
    handleGitHubCallback, 
    signOutFromGitHub 
  };
} 