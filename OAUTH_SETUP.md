# OAuth Authentication Setup

This guide will help you set up Google and GitHub OAuth authentication for your React application.

## Prerequisites

- A Google Cloud Console account
- A GitHub account
- Your React application running on localhost:3000

## Google OAuth Setup

### 1. Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API

### 2. Configure OAuth Consent Screen

1. Go to "APIs & Services" > "OAuth consent screen"
2. Choose "External" user type
3. Fill in the required information:
   - App name
   - User support email
   - Developer contact information
4. Add scopes: `email`, `profile`, `openid`
5. Add test users if needed

### 3. Create OAuth 2.0 Credentials

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "OAuth 2.0 Client IDs"
3. Choose "Web application"
4. Add authorized redirect URIs:
   - `http://localhost:3000`
   - `http://localhost:3000/auth/google/callback`
5. Copy the Client ID (Client Secret is not needed for frontend-only implementation)

### 4. Add to Environment Variables

Create a `.env` file in your project root and add:

```env
REACT_APP_GOOGLE_CLIENT_ID=your-google-client-id-here
```

## GitHub OAuth Setup

### 1. Create a GitHub OAuth App

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Click "New OAuth App"
3. Fill in the application details:
   - Application name: Your app name
   - Homepage URL: `http://localhost:3000`
   - Authorization callback URL: `http://localhost:3000/auth/github/callback`
4. Click "Register application"
5. Copy the Client ID and Client Secret

### 2. Add to Environment Variables

Add to your `.env` file:

```env
REACT_APP_GITHUB_CLIENT_ID=your-github-client-id-here
REACT_APP_GITHUB_CLIENT_SECRET=your-github-client-secret-here
REACT_APP_REDIRECT_URI=http://localhost:3000/auth/github/callback
```

## Environment Variables

Create a `.env` file in your project root with all the required variables:

```env
# Google OAuth Configuration
REACT_APP_GOOGLE_CLIENT_ID=your-google-client-id-here

# GitHub OAuth Configuration
REACT_APP_GITHUB_CLIENT_ID=your-github-client-id-here
REACT_APP_GITHUB_CLIENT_SECRET=your-github-client-secret-here
REACT_APP_REDIRECT_URI=http://localhost:3000/auth/github/callback
```

## Important Notes

1. **Never commit your `.env` file** to version control
2. **Client secrets should be kept secure** and not exposed in client-side code
3. **Google OAuth uses Identity Services** which only requires Client ID (no secret needed for frontend)
4. **GitHub OAuth requires both Client ID and Client Secret** for the token exchange
5. For production, you'll need to update the redirect URIs to your production domain
6. The current implementation stores user data in localStorage for demo purposes
7. For production, implement proper server-side authentication and session management

## Testing

1. Start your React application: `npm start`
2. Navigate to `/login` or `/signup`
3. Click on "Login with Google" or "Login with GitHub"
4. Complete the OAuth flow
5. Check the browser console for authentication results

## Troubleshooting

### Common Issues:

1. **"Invalid client" error**: Check that your Client ID is correct
2. **"Redirect URI mismatch"**: Ensure the redirect URI in your OAuth app matches exactly
3. **CORS errors**: Make sure your redirect URI is properly configured
4. **"State parameter mismatch"**: This is a security feature; try again

### For Production:

1. Update all redirect URIs to your production domain
2. Implement proper server-side authentication
3. Use secure session management instead of localStorage
4. Add proper error handling and user feedback
5. Consider using a backend service like Firebase Auth or Auth0 for better security 