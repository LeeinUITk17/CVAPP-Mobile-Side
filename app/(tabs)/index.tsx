import React, { useState, useEffect, useContext } from 'react';
import { Image, StyleSheet, View, Text, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { HelloWave } from '@/components/HelloWave';
import Footer from '@/components/child_components/Footer';
import Option from '@/components/child_components/Option';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserProfileContext } from '@/hooks/profileContext';
// interface UserProfile {
//   name: string;
// }

export default function HomeScreen() {
  const userProfileContext = useContext(UserProfileContext);
  if (!userProfileContext) {
    return null; 
  }
  const { userProfile, setUserProfile } = userProfileContext;
  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerImageContainer}>
        <Image
          source={{ uri: 'https://res.cloudinary.com/dbonwxmgl/image/upload/v1726731631/mauh8cky29vbpft7aqpf.jpg' }} 
          style={styles.profilePicture}
        />
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerText}>
            <Ionicons name="home-outline" color="black" size={20} /> HomePage
          </Text>
        </View>
        <Option />
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>
            Welcome to My CV{userProfile ? `, ${userProfile.name}` : ''}
          </Text>
          <HelloWave />
        </View>
        
        <View style={styles.stepContainer}>
          <Text style={styles.sectionTitle}>Introduction</Text>
          <Text style={styles.sectionText}>
            Hi, I'm {userProfile ? userProfile.name : 'Le Thanh Tai'}, a passionate Backend Developer with experience in Node.js, MongoDB, and Express.js. 
            Explore my skills and projects to see how I can contribute to your team.
          </Text>
        </View>

        <View style={styles.stepContainer}>
          <Text style={styles.sectionTitle}>Experience</Text>
          <Text style={styles.sectionText}>
            I am currently interning as a Full-stack Developer at Sun* Inc. where I work on various web application projects. 
            My goal is to become an expert in optimizing processing speed and designing robust system architectures.
          </Text>
        </View>

        <View style={styles.stepContainer}>
          <Text style={styles.sectionTitle}>Projects</Text>
          <Text style={styles.sectionText}>
            Check out my recent projects including a Chrome extension for ChatGPT and various personal web applications. 
            I am always looking to enhance my skills and explore new technologies.
          </Text>
        </View>

        <View style={styles.stepContainer}>
          <Text style={styles.sectionTitle}>Contact</Text>
          <Text style={styles.sectionText}>
            Feel free to reach out to me via email at 22521276@gm.uit.edu.vn or connect with me on LinkedIn.
          </Text>
        </View>
      </View>
      <Footer />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  contentContainer: {
    paddingHorizontal: 16,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: 'orange',
    borderRadius: 10,
    alignSelf: 'center',
    alignContent: 'center',
    paddingLeft: 10,
    paddingRight: 10,
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  stepContainer: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    backgroundColor: 'orange',
    alignSelf: 'flex-start',
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  sectionText: {
    fontSize: 14,
    color: 'gray',
  },
  headerTextContainer: {
    position: 'absolute',
    bottom: 20,
    backgroundColor: 'rgba(250, 244, 230, 0.86)',
    padding: 8,
    borderRadius: 10,
    alignItems: 'center',
    alignSelf: 'center',
  },
  headerText: {
    color: 'black',
    fontSize: 24,
    alignContent: 'center',
  },
});
