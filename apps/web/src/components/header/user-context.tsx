"use client"
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '@/lib/types';
import {ApiResponse, getProfile} from "@/lib/actions";
import {logout as apiLogout} from "@/lib/actions";
// import { ApiResponse } from '@/lib/actions/shared/types';
// import { getProfile } from '@/lib/actions/auth/auth.actions';



interface UserContextType {
  user: User | null;
  loading: boolean;
  fetchUser: () => void;
  logout: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: React.ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const logout = async () => {
    await apiLogout();
    setUser(null);
    // location.reload();
  };

  const fetchUser = async () => {
    try {
      // Replace with your actual API call to fetch the user profile
      const response: ApiResponse<User> = await getProfile();
      if (response.data) {
        setUser(response.data);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error('Failed to fetch user profile:', error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
      <UserContext.Provider value={{ user, loading, fetchUser, logout }}>
        {children}
      </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
