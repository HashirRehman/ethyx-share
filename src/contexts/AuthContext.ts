'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types/auth';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => {},
  logout: async () => {},
  isLoading: true,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      // Implement your session check logic here
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      // Implement your login logic here
      // Set user data after successful login
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      // Implement your logout logic here
      setUser(null);
    } catch (error) {
      throw error;
    }
  };
  return {
    user,
    login,
    logout,
    isLoading
  };
}
