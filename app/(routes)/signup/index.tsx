import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Image } from 'react-native';
import axios from 'axios';
import { Link, router } from 'expo-router';
import Footer from '@/components/child_components/Footer';
import Constants from 'expo-constants';
const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const IPv4 = Constants.expoConfig?.extra?.IPv4_Address_URL;
  const handleSignUp = async () => {
    try {
      await axios.post(`${IPv4}/auth/signup`, { name, email, password });
      Alert.alert('Sign Up Successful', 'You can now log in.');
      router.push('/(tabs)');
    } catch (err) {
      Alert.alert('Sign Up Failed', 'Please try again.');
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
     <Text style={styles.title}>Sign Up</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
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
       <View style={styles.configButton}>
       <Button title="Sign Up" onPress={handleSignUp} color="orange"/>
       </View>
       <View style={styles.signinContainer}>
      <Text>Already have an account?</Text>
      <Link href="/(routes)/login">
        <Text style={styles.backButton}>Log in</Text>
      </Link>
      </View>
     {/* </View>    */}
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
  signinContainer: {
    marginTop: 16,
    alignItems: 'center',
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
  configButton:{
    backgroundColor: 'orange',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    width: '50%',
    alignSelf: 'center',
    justifyContent: 'center',
 },
 backButton: {
  color: 'orange',
  fontWeight: 'bold',
  fontSize: 16,
  alignItems: 'center',
  alignSelf: 'center',
 }
});

export default SignUp;
