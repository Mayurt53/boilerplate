// GitHub OAuth Configuration
const GITHUB_CLIENT_ID = process.env.REACT_APP_GITHUB_CLIENT_ID || 'your-github-client-id';
const GITHUB_CLIENT_SECRET = process.env.REACT_APP_GITHUB_CLIENT_SECRET || 'your-github-client-secret';
const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI || 'http://localhost:3000/auth/github/callback';

// GitHub Sign In Function
export function signInWithGitHub() {
  try {
    // Construct GitHub OAuth URL
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=user:email&state=${generateRandomState()}`;
    
    // Store state for verification
    localStorage.setItem('github_oauth_state', generateRandomState());
    
    // Redirect to GitHub
    window.location.href = githubAuthUrl;
  } catch (error) {
    console.error('GitHub Sign In Error:', error);
    throw error;
  }
}

// Handle GitHub OAuth Callback
export async function handleGitHubCallback(code, state) {
  try {
    // Verify state parameter
    const storedState = localStorage.getItem('github_oauth_state');
    if (state !== storedState) {
      throw new Error('Invalid state parameter');
    }

    // Exchange code for access token
    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: GITHUB_CLIENT_ID,
        client_secret: GITHUB_CLIENT_SECRET,
        code: code,
        redirect_uri: REDIRECT_URI,
      }),
    });

    const tokenData = await tokenResponse.json();
    
    if (tokenData.error) {
      throw new Error(tokenData.error_description || tokenData.error);
    }

    const accessToken = tokenData.access_token;

    // Get user information
    const userInfo = await getGitHubUserInfo(accessToken);
    
    // Get user emails
    const userEmails = await getGitHubUserEmails(accessToken);

    return {
      accessToken: accessToken,
      user: {
        ...userInfo,
        emails: userEmails
      },
      provider: 'github'
    };
  } catch (error) {
    console.error('GitHub Callback Error:', error);
    throw error;
  }
}

// Get GitHub user information
async function getGitHubUserInfo(accessToken) {
  try {
    const response = await fetch('https://api.github.com/user', {
      headers: {
        'Authorization': `token ${accessToken}`,
        'Accept': 'application/vnd.github.v3+json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch GitHub user info');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching GitHub user info:', error);
    throw error;
  }
}

// Get GitHub user emails
async function getGitHubUserEmails(accessToken) {
  try {
    const response = await fetch('https://api.github.com/user/emails', {
      headers: {
        'Authorization': `token ${accessToken}`,
        'Accept': 'application/vnd.github.v3+json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch GitHub user emails');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching GitHub user emails:', error);
    throw error;
  }
}

// Generate random state for OAuth security
function generateRandomState() {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

// Sign Out Function
export function signOutFromGitHub() {
  // Clear any stored tokens and state
  localStorage.removeItem('github_access_token');
  localStorage.removeItem('github_user_info');
  localStorage.removeItem('github_oauth_state');
} 