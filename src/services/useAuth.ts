import { useState, useEffect } from 'react';
import { userService, UserData, UserCredentials, RegisterData } from '../services/userService';

export function useAuth() {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      setUser(JSON.parse(userInfo));
    }
    setLoading(false);
  }, []);

  const login = async (credentials: UserCredentials) => {
    try {
      setLoading(true);
      setError(null);
      const userData = await userService.login(credentials);
      setUser(userData);
      return userData;
    } catch (err: any) {
      const message = err.response?.data?.message || 'An error occurred';
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: RegisterData) => {
    try {
      setLoading(true);
      setError(null);
      const newUser = await userService.register(userData);
      setUser(newUser);
      return newUser;
    } catch (err: any) {
      const message = err.response?.data?.message || 'An error occurred';
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    userService.logout();
    setUser(null);
  };

  const updateProfile = async (userData: Partial<RegisterData>) => {
    try {
      setLoading(true);
      setError(null);
      const updatedUser = await userService.updateProfile(userData);
      setUser(updatedUser);
      return updatedUser;
    } catch (err: any) {
      const message = err.response?.data?.message || 'An error occurred';
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    loading,
    error,
    login,
    register,
    logout,
    updateProfile,
    isAuthenticated: !!user,
  };
}