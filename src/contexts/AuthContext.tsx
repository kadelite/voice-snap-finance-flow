
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { toast } from '@/hooks/use-toast';

export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
  password?: string; // Password field needed for storage but marked optional for type safety
}

interface StoredUser extends Omit<User, 'createdAt'> {
  createdAt: string; // Store date as string in localStorage
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  login: async () => {},
  signup: async () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

// Helper function to safely get users from localStorage
const getStoredUsers = (): StoredUser[] => {
  try {
    const usersString = localStorage.getItem('users');
    if (usersString) {
      return JSON.parse(usersString);
    }
  } catch (error) {
    console.error('Failed to parse stored users:', error);
  }
  return [];
};

// Helper function to safely store users in localStorage
const storeUsers = (users: StoredUser[]) => {
  try {
    localStorage.setItem('users', JSON.stringify(users));
  } catch (error) {
    console.error('Failed to store users:', error);
  }
};

// Convert a User object to a StoredUser object for localStorage
const userToStoredUser = (user: User): StoredUser => ({
  ...user,
  createdAt: user.createdAt.toISOString(),
});

// Convert a StoredUser object to a User object for application use
const storedUserToUser = (storedUser: StoredUser): User => ({
  ...storedUser,
  createdAt: new Date(storedUser.createdAt),
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize with demo user if it doesn't exist
  useEffect(() => {
    const users = getStoredUsers();
    
    // Add demo user if not already in the users list
    const demoUserExists = users.some(u => u.email === 'demo@example.com');
    
    if (!demoUserExists) {
      const demoUser: StoredUser = {
        id: '1',
        email: 'demo@example.com',
        name: 'Demo User',
        password: 'password',
        createdAt: new Date().toISOString(),
      };
      storeUsers([...users, demoUser]);
    }

    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser({
          ...parsedUser,
          createdAt: new Date(parsedUser.createdAt)
        });
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        localStorage.removeItem('user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Get all users from localStorage
      const users = getStoredUsers();
      
      // Find user with matching email and password
      const matchedUser = users.find(u => u.email === email && u.password === password);
      
      if (matchedUser) {
        // Convert to User object and remove password
        const loggedInUser: User = {
          id: matchedUser.id,
          email: matchedUser.email,
          name: matchedUser.name,
          createdAt: new Date(matchedUser.createdAt),
        };
        
        setUser(loggedInUser);
        // Store user without password in localStorage
        localStorage.setItem('user', JSON.stringify(loggedInUser));
        
        toast({
          title: "Login successful",
          description: `Welcome back, ${loggedInUser.name}!`,
        });
        return;
      }
      
      throw new Error('Invalid email or password');
    } catch (error) {
      toast({
        title: "Login failed",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (email: string, password: string, name: string) => {
    try {
      setIsLoading(true);
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Validation
      if (!email || !password || !name) {
        throw new Error('All fields are required');
      }
      
      // Get existing users
      const users = getStoredUsers();
      
      // Check if user with this email already exists
      if (users.some(u => u.email === email)) {
        throw new Error('A user with this email already exists');
      }
      
      const newUser: User = {
        id: Math.random().toString(36).slice(2, 11),
        email,
        name,
        password, // Store password for login validation
        createdAt: new Date(),
      };
      
      // Add user to localStorage
      const storedUser = userToStoredUser(newUser);
      storeUsers([...users, storedUser]);
      
      // Store user in current session without password
      const { password: _, ...userWithoutPassword } = newUser;
      setUser(userWithoutPassword);
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      
      toast({
        title: "Account created",
        description: "Welcome to FinanceTracker!",
      });
    } catch (error) {
      toast({
        title: "Signup failed",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
