import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage on app start
  useEffect(() => {
    const loadUser = () => {
      try {
        // Check for Google user data
        const googleUser = localStorage.getItem('google_user_data');
        if (googleUser) {
          const parsedUser = JSON.parse(googleUser);
          setUser({
            ...parsedUser.user,
            provider: 'google',
            accessToken: parsedUser.accessToken
          });
        }

        // Check for GitHub user data
        const githubUser = localStorage.getItem('github_user_data');
        if (githubUser) {
          const parsedUser = JSON.parse(githubUser);
          setUser({
            ...parsedUser.user,
            provider: 'github',
            accessToken: parsedUser.accessToken
          });
        }

        // Check for regular user data
        const regularUser = localStorage.getItem('user_data');
        if (regularUser) {
          setUser(JSON.parse(regularUser));
        }
      } catch (error) {
        console.error('Error loading user data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const login = async (email, password) => {
    // Simulate login API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Mock user data - in real app, this would come from your API
        const userData = {
          id: '1',
          email: email,
          firstName: 'John',
          lastName: 'Doe',
          phone: '+1 (555) 123-4567',
          company: 'TechCorp Inc.',
          jobTitle: 'Senior Developer',
          bio: 'Passionate developer with expertise in React, Node.js, and cloud technologies.',
          location: 'San Francisco, CA',
          website: 'https://johndoe.dev',
          github: 'https://github.com/johndoe',
          linkedin: 'https://linkedin.com/in/johndoe',
          provider: 'email'
        };
        
        setUser(userData);
        localStorage.setItem('user_data', JSON.stringify(userData));
        resolve(userData);
      }, 1000);
    });
  };

  const signup = async (email, password, userData = {}) => {
    // Simulate signup API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Mock user data - in real app, this would come from your API
        const newUser = {
          id: '2',
          email: email,
          firstName: userData.firstName || 'New',
          lastName: userData.lastName || 'User',
          phone: '',
          company: '',
          jobTitle: '',
          bio: '',
          location: '',
          website: '',
          github: '',
          linkedin: '',
          provider: 'email',
          ...userData
        };
        
        setUser(newUser);
        localStorage.setItem('user_data', JSON.stringify(newUser));
        resolve(newUser);
      }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user_data');
    localStorage.removeItem('google_user_data');
    localStorage.removeItem('github_user_data');
    localStorage.removeItem('google_access_token');
    localStorage.removeItem('github_access_token');
  };

  const updateProfile = (updatedData) => {
    const updatedUser = { ...user, ...updatedData };
    setUser(updatedUser);
    localStorage.setItem('user_data', JSON.stringify(updatedUser));
  };

  const value = {
    user,
    loading,
    login,
    signup,
    logout,
    updateProfile,
    isAuthenticated: !!user
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}; 