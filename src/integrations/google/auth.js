// Google OAuth Configuration
const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID || 'your-google-client-id';

// Initialize Google Identity Services
function initializeGoogleAuth() {
  return new Promise((resolve, reject) => {
    if (window.google) {
      resolve(window.google);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = () => {
      if (window.google) {
        resolve(window.google);
      } else {
        reject(new Error('Google Identity Services failed to load'));
      }
    };
    script.onerror = () => reject(new Error('Failed to load Google Identity Services'));
    document.head.appendChild(script);
  });
}

// Google Sign In Function
export async function signInWithGoogle() {
  try {
    // Check if client ID is properly configured
    if (!GOOGLE_CLIENT_ID || GOOGLE_CLIENT_ID === 'your-google-client-id') {
      throw new Error('Google Client ID not configured. Please set REACT_APP_GOOGLE_CLIENT_ID in your .env file');
    }

    const google = await initializeGoogleAuth();
    
    return new Promise((resolve, reject) => {
      const client = google.accounts.oauth2.initTokenClient({
        client_id: GOOGLE_CLIENT_ID,
        scope: 'email profile openid',
        callback: async (response) => {
          console.log('Google OAuth response:', response);
          
          if (response.error) {
            console.error('Google OAuth error:', response.error);
            reject(new Error(`Google OAuth error: ${response.error}`));
            return;
          }

          try {
            // Get user info using the access token
            const userInfo = await getUserInfo(response.access_token);
            resolve({
              accessToken: response.access_token,
              user: userInfo,
              provider: 'google'
            });
          } catch (error) {
            reject(error);
          }
        },
      });

      client.requestAccessToken();
    });
  } catch (error) {
    console.error('Google Sign In Error:', error);
    throw error;
  }
}

// Get user information from Google
async function getUserInfo(accessToken) {
  try {
    const response = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user info');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching user info:', error);
    throw error;
  }
}

// Sign Out Function
export function signOutFromGoogle() {
  // Clear any stored tokens
  localStorage.removeItem('google_access_token');
  localStorage.removeItem('google_user_info');
  
  // If using Google Identity Services, you can also revoke the token
  if (window.google && window.google.accounts.oauth2) {
    const token = localStorage.getItem('google_access_token');
    if (token) {
      window.google.accounts.oauth2.revoke(token);
    }
  }
} 