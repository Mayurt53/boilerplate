import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { handleGitHubCallback } from '../integrations/github/auth.js';

function GitHubCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('Processing...');
  const [error, setError] = useState(null);

  useEffect(() => {
    const processCallback = async () => {
      try {
        const code = searchParams.get('code');
        const state = searchParams.get('state');
        const error = searchParams.get('error');

        if (error) {
          setError(`GitHub authentication error: ${error}`);
          setStatus('Authentication failed');
          return;
        }

        if (!code || !state) {
          setError('Missing required parameters from GitHub');
          setStatus('Authentication failed');
          return;
        }

        setStatus('Completing authentication...');
        
        // Handle the GitHub callback
        const result = await handleGitHubCallback(code, state);
        
        // Store the result
        localStorage.setItem('github_user_data', JSON.stringify(result));
        
        setStatus('Authentication successful!');
        
        // Redirect to home page after a short delay
        setTimeout(() => {
          navigate('/', { replace: true });
        }, 2000);
        
      } catch (err) {
        console.error('GitHub callback error:', err);
        setError(err.message);
        setStatus('Authentication failed');
      }
    };

    processCallback();
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-100 via-blue-200 to-white">
      <div className="w-full max-w-md bg-white/70 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-blue-100 text-center">
        <div className="mb-6">
          <svg className="w-16 h-16 mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.339-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.987 1.029-2.686-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.748-1.025 2.748-1.025.546 1.378.202 2.397.1 2.65.64.699 1.028 1.593 1.028 2.686 0 3.847-2.337 4.695-4.566 4.944.359.309.678.919.678 1.852 0 1.336-.012 2.417-.012 2.747 0 .267.18.577.688.479C19.138 20.2 22 16.447 22 12.021 22 6.484 17.523 2 12 2z"/>
          </svg>
        </div>
        
        <h2 className="text-2xl font-bold text-blue-900 mb-4">
          GitHub Authentication
        </h2>
        
        <div className="mb-6">
          {error ? (
            <div className="text-red-600">
              <p className="font-semibold">Error:</p>
              <p>{error}</p>
            </div>
          ) : (
            <div className="text-blue-700">
              <p className="font-semibold">{status}</p>
              {status === 'Processing...' || status === 'Completing authentication...' ? (
                <div className="mt-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                </div>
              ) : null}
            </div>
          )}
        </div>
        
        {error && (
          <button
            onClick={() => navigate('/login')}
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition"
          >
            Back to Login
          </button>
        )}
      </div>
    </div>
  );
}

export default GitHubCallback; 