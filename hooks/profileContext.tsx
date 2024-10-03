import React, { createContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Constants from 'expo-constants';
interface UserProfile {
  id: number;
  name: string;
  email: string;
  age: number;
  phone: string;
  address: string;
  linkedin: string;
  github: string;
  summary: string;
  avatar: string;
}

interface UserProfileContextProps {
  userProfile: UserProfile | null;
  setUserProfile: React.Dispatch<React.SetStateAction<UserProfile | null>>;
}

export const UserProfileContext = createContext<UserProfileContextProps | undefined>(undefined);

export const UserProfileProvider = ({ children }: { children: ReactNode }) => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const IPv4 = Constants.expoConfig?.extra?.IPv4_Address_URL;
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = await AsyncStorage.getItem('access_token');
        const response = await axios.get(`${IPv4}/auth/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserProfile(response.data as UserProfile);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, []);

  return (
    <UserProfileContext.Provider value={{ userProfile, setUserProfile }}>
      {children}
    </UserProfileContext.Provider>
  );
};