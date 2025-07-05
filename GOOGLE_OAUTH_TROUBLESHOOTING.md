# Google OAuth Authorization Error Troubleshooting

## Common Causes and Solutions

### 1. **Missing or Invalid Client ID**

**Error**: "access blocked authorization error" or "Google Client ID not configured"

**Solution**:
1. Create a `.env` file in your project root:
```env
REACT_APP_GOOGLE_CLIENT_ID=your-actual-google-client-id-here
```

2. Get your Google Client ID from [Google Cloud Console](https://console.cloud.google.com/):
   - Go to "APIs & Services" > "Credentials"
   - Find your OAuth 2.0 Client ID or create a new one
   - Copy the Client ID (not the Client Secret)

### 2. **Incorrect OAuth Consent Screen Configuration**

**Error**: "This app isn't verified" or "Unverified app"

**Solution**:
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to "APIs & Services" > "OAuth consent screen"
3. Make sure your app is configured:
   - App name is set
   - User support email is added
   - Developer contact information is added
4. Add your email as a test user if using "External" user type

### 3. **Missing Authorized JavaScript Origins**

**Error**: "Error: redirect_uri_mismatch" or "Invalid client"

**Solution**:
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to "APIs & Services" > "Credentials"
3. Edit your OAuth 2.0 Client ID
4. Add these to "Authorized JavaScript origins":
   - `http://localhost:3000`
   - `http://localhost:3001` (if using different port)
   - `https://your-production-domain.com` (for production)

### 4. **Missing Required APIs**

**Error**: "API not enabled" or "access blocked"

**Solution**:
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to "APIs & Services" > "Library"
3. Enable these APIs:
   - Google+ API
   - Google Identity Services API
   - Google OAuth2 API

### 5. **Browser Security Issues**

**Error**: CORS errors or blocked popups

**Solution**:
1. Make sure you're running on `http://localhost:3000` (not `file://`)
2. Check browser console for CORS errors
3. Disable ad blockers temporarily
4. Try in incognito/private mode

## Step-by-Step Setup Guide

### Step 1: Create Google Cloud Project
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable billing (required for OAuth)

### Step 2: Configure OAuth Consent Screen
1. Go to "APIs & Services" > "OAuth consent screen"
2. Choose "External" user type
3. Fill in required information:
   - App name: Your app name
   - User support email: Your email
   - Developer contact information: Your email
4. Add scopes: `email`, `profile`, `openid`
5. Add test users (your email)

### Step 3: Create OAuth Credentials
1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "OAuth 2.0 Client IDs"
3. Choose "Web application"
4. Add authorized JavaScript origins:
   - `http://localhost:3000`
5. Copy the Client ID

### Step 4: Configure Environment Variables
1. Create `.env` file in your project root:
```env
REACT_APP_GOOGLE_CLIENT_ID=your-copied-client-id-here
```

2. Restart your development server:
```bash
npm start
```

### Step 5: Test the Implementation
1. Open browser console (F12)
2. Click "Login with Google"
3. Check console for any error messages
4. Complete the OAuth flow

## Debugging Tips

### Check Browser Console
Look for these error messages:
- `Google Client ID not configured` → Set up `.env` file
- `redirect_uri_mismatch` → Check authorized origins
- `access_denied` → Check OAuth consent screen
- `invalid_client` → Verify Client ID

### Verify Environment Variables
1. Check that `.env` file exists in project root
2. Verify variable name: `REACT_APP_GOOGLE_CLIENT_ID`
3. Make sure there are no spaces around `=`
4. Restart development server after changes

### Test with Different Browsers
- Try Chrome, Firefox, Safari
- Test in incognito/private mode
- Disable browser extensions temporarily

## Production Considerations

For production deployment:
1. Update authorized origins to your production domain
2. Add production domain to OAuth consent screen
3. Set up proper error handling
4. Implement server-side session management
5. Use HTTPS in production

## Still Having Issues?

If you're still experiencing problems:
1. Check the browser console for specific error messages
2. Verify your Google Cloud Console configuration
3. Make sure all required APIs are enabled
4. Test with a fresh browser session
5. Check if your Google account has any restrictions 