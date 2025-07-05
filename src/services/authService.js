// Authentication Service
// This simulates a backend service for user management

class AuthService {
  constructor() {
    // Initialize users from localStorage or empty array
    this.users = JSON.parse(localStorage.getItem('registered_users')) || [];
  }

  // Save users to localStorage
  saveUsers() {
    localStorage.setItem('registered_users', JSON.stringify(this.users));
  }

  // Register a new user
  register(userData) {
    // Check if user already exists
    const existingUser = this.users.find(user => user.email === userData.email);
    if (existingUser) {
      throw new Error('User with this email already exists.');
    }

    // Create new user
    const newUser = {
      id: Date.now().toString(),
      name: userData.name,
      email: userData.email,
      password: userData.password, // In real app, this should be hashed
      provider: 'email',
      createdAt: new Date().toISOString()
    };

    // Add user to array
    this.users.push(newUser);
    this.saveUsers();

    // Return user data without password
    const { password, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
  }

  // Login user
  login(email, password) {
    // Find user by email
    const user = this.users.find(user => user.email === email);
    
    if (!user) {
      throw new Error('User not found. Please sign up first.');
    }

    // Check password
    if (user.password !== password) {
      throw new Error('Invalid password.');
    }

    // Return user data without password
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  // Check if user exists
  userExists(email) {
    return this.users.some(user => user.email === email);
  }

  // Get user by email
  getUserByEmail(email) {
    const user = this.users.find(user => user.email === email);
    if (user) {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    }
    return null;
  }

  // Update user profile
  updateUser(email, updates) {
    const userIndex = this.users.findIndex(user => user.email === email);
    if (userIndex === -1) {
      throw new Error('User not found.');
    }

    // Update user data (excluding sensitive fields)
    const updatedUser = {
      ...this.users[userIndex],
      ...updates,
      email: this.users[userIndex].email, // Prevent email change
      password: this.users[userIndex].password, // Prevent password change
      id: this.users[userIndex].id // Prevent ID change
    };

    this.users[userIndex] = updatedUser;
    this.saveUsers();

    // Return user data without password
    const { password, ...userWithoutPassword } = updatedUser;
    return userWithoutPassword;
  }

  // Reset password (for forgot password flow)
  resetPassword(email, newPassword) {
    const userIndex = this.users.findIndex(user => user.email === email);
    if (userIndex === -1) {
      throw new Error('User not found.');
    }

    this.users[userIndex].password = newPassword;
    this.saveUsers();

    return true;
  }

  // Get all users (for debugging)
  getAllUsers() {
    return this.users.map(user => {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });
  }
}

export default new AuthService(); 