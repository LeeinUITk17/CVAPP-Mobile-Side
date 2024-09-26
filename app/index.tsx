import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Redirect } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Index = () => {
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem('access_token');
      if (token) {
        setIsSignedIn(true);
      }
    };
    checkToken();
  }, []);
  return (
    <Redirect href={!isSignedIn ? '/(routes)/login' : '/(tabs)'} />
  );
}

export default Index;