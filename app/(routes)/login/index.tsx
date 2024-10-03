import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ActivityIndicator, Image } from 'react-native';
import axios from 'axios';
import { Link, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Footer from '@/components/child_components/Footer';
import Constants from 'expo-constants';
const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const handleLogin = async () => {
    const IPv4 = Constants.expoConfig?.extra?.IPv4_Address_URL;
    if (!email || !password) {
      Alert.alert('Validation Error', 'Email and Password cannot be empty');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await axios.post<{ access_token: string }>(`${IPv4}/auth/login`, {
        email,
        password,
      });
      console.log(response.data);
      await AsyncStorage.setItem('access_token', response.data.access_token);
      setLoading(false);
      router.push('/(tabs)')
    } catch (err) {
      setLoading(false);
      setError('Invalid email or password');
    }
  };

  return (
    <View style={styles.container}>
       <View style={styles.headerImageContainer}>
        <Image
          source={{ uri: 'https://res.cloudinary.com/dbonwxmgl/image/upload/v1726731631/mauh8cky29vbpft7aqpf.jpg' }} 
          style={styles.profilePicture}
        />
      </View>
     {/* <View style={{ flex: 1, justifyContent: 'center' }}> */}
     <Text style={styles.title}>Sign In</Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <TextInput
      style={styles.input}
      placeholder="Email"
      value={email}
      onChangeText={setEmail}
      keyboardType="email-address"
      autoCapitalize="none"
      />
      <TextInput
      style={styles.input}
      placeholder="Password"
      value={password}
      onChangeText={setPassword}
      secureTextEntry
      />
      {loading ? (
      <ActivityIndicator size="large" color="#0000ff" />
      ) : (
      <View style={styles.configButton}>
        <Button title="Sign In" onPress={handleLogin} color="orange" />
      </View>
      )}

      <View style={styles.signupContainer}>
      <Text>Don't have an account?</Text>
      <Link href="/(routes)/signup">
        <Text style={{ color: 'orange' }}>Create new account</Text>
      </Link>
      </View>
     {/* </View> */}
     <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: 'white',
  },
  headerImageContainer: {
    height: 250,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  profilePicture: {
    height: '100%',
    width: '100%',
    borderRadius: 100,
  },
  title: {
    fontSize: 32,
    marginBottom: 16,
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
    backgroundColor: 'orange',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 20,
    padding: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 2,
    marginBottom: 16,
    paddingHorizontal: 8,
    color: 'gray',
    borderRadius: 10,
  },
  error: {
    color: 'red',
    marginBottom: 16,
    textAlign: 'center',
  },
  signupContainer: {
    marginTop: 16,
    alignItems: 'center',
    marginBottom: 20,
  },
  configButton:{
     backgroundColor: 'orange',
     borderRadius: 10,
     padding: 10,
     marginBottom: 10,
     width: '50%',
     alignSelf: 'center',
     justifyContent: 'center',
  }
});

export default SignIn;