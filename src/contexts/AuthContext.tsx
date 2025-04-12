
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

// Define types for user and auth context
interface User {
  id: string;
  username: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

// Create the Auth Context with a default undefined value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create a provider component
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    // Check if user data exists in localStorage
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Check if the token is still valid on initial load
  useEffect(() => {
    const checkUserAuth = () => {
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        // In a real app, you would validate the token with a backend
        // For now, we'll just make sure it exists
        setUser(JSON.parse(savedUser));
      } else {
        setUser(null);
      }
    };
    
    checkUserAuth();
    
    // Set up a listener for storage events (to handle logout from other tabs)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'user' && e.newValue === null) {
        setUser(null);
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Mock login function - in a real app, this would connect to a backend
  const login = async (email: string, password: string) => {
    // In a real app, you would validate credentials with a backend
    // This is just a mock implementation for demonstration
    
    // Mock validation
    if (password.length < 6) {
      throw new Error("Invalid credentials");
    }

    // For demo purposes, create a user with the email as username if not found in localStorage
    const savedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const foundUser = savedUsers.find((u: any) => u.email === email);
    
    if (!foundUser) {
      throw new Error("User not found. Please sign up first.");
    }

    if (foundUser.password !== password) {
      throw new Error("Invalid password");
    }

    const loggedInUser = {
      id: foundUser.id,
      username: foundUser.username,
      email: foundUser.email
    };

    // Save to state and localStorage
    setUser(loggedInUser);
    localStorage.setItem('user', JSON.stringify(loggedInUser));
  };

  // Mock signup function
  const signup = async (username: string, email: string, password: string) => {
    // Validate input data
    if (!username || !email || !password) {
      throw new Error("All fields are required");
    }

    if (password.length < 6) {
      throw new Error("Password must be at least 6 characters");
    }

    // Check if user already exists
    const savedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    if (savedUsers.some((u: any) => u.email === email)) {
      throw new Error("User with this email already exists");
    }

    // Create new user
    const newUser = {
      id: Date.now().toString(),
      username,
      email,
      password // Note: In a real app, never store plain text passwords
    };

    // Save user to "database" (localStorage in this case)
    savedUsers.push(newUser);
    localStorage.setItem('users', JSON.stringify(savedUsers));

    // Auto login after signup
    const loggedInUser = {
      id: newUser.id,
      username: newUser.username,
      email: newUser.email
    };
    
    setUser(loggedInUser);
    localStorage.setItem('user', JSON.stringify(loggedInUser));
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isLoggedIn: !!user, 
      login, 
      signup, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

// Create a custom hook for using the auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
