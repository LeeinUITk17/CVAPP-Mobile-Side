import React, { useState, useEffect } from 'react';
import { View, Text, Image, TextInput, Button, StyleSheet, TouchableOpacity, Linking, Alert, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Footer from '@/components/child_components/Footer';
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

const ProfileScreen = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const IPv4 = Constants.expoConfig?.extra?.IPv4_Address_URL;
  // Fetch profile data
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

  // Pick image from gallery
  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert('Permission to access camera roll is required!');
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!pickerResult.canceled) {
      setSelectedImage(pickerResult.assets[0].uri);
    }
  };

  // Upload avatar to server
  const uploadAvatar = async () => {
    if (!selectedImage || !userProfile) return;

    const formData = new FormData();
    formData.append('file', {
      uri: selectedImage,
      name: 'avatar.jpg',
      type: 'image/jpeg',
    } as any);

    try {
      const token = await AsyncStorage.getItem('access_token');
      const response = await axios.post(
        `${IPv4}/user/${userProfile.id}/avatar`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      Alert.alert('Avatar updated successfully!');
      const data = response.data as { secure_url: string };
      setUserProfile({ ...userProfile, avatar: data.secure_url });
      setSelectedImage(null);
    } catch (error) {
      const errorMessage = (error as Error).message;
      Alert.alert('Failed to upload avatar:', errorMessage);
    }
  };

  // Handle profile updates
  const handleUpdateProfile = async () => {
    if (!userProfile) return;

    try {
      const token = await AsyncStorage.getItem('access_token');
      await axios.put(`${IPv4}/user/${userProfile.id}/profile`, userProfile, {
        headers: { Authorization: `Bearer ${token}` },
      });
      Alert.alert('Profile updated successfully!');
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
      Alert.alert('Failed to update profile');
    }
  };

  if (!userProfile) {
    return <Text>Loading profile...</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileContainer}>
        <View style={styles.avatarContainer}>
          <Image source={{ uri: selectedImage || userProfile.avatar }} style={styles.avatar} />
        </View>

        <View style={styles.buttonRow}>
  {selectedImage ? (
    <TouchableOpacity onPress={uploadAvatar} style={styles.uploadButton}>
      <Text style={styles.uploadButtonText}>Upload Avatar</Text>
    </TouchableOpacity>
  ) : (
    <TouchableOpacity onPress={pickImage} style={styles.uploadButton}>
      <Text style={styles.uploadButtonText}>Change Avatar</Text>
    </TouchableOpacity>
  )}

  {isEditing ? (
    <TouchableOpacity onPress={handleUpdateProfile} style={styles.uploadButton}>
      <Text style={styles.uploadButtonText}>Save Profile</Text>
    </TouchableOpacity>
  ) : (
    <TouchableOpacity onPress={() => setIsEditing(true)} style={styles.uploadButton}>
      <Text style={styles.uploadButtonText}>Edit Profile</Text>
    </TouchableOpacity>
  )}
</View>
         <Text style={styles.infoTitle}>Name:</Text>
        <TextInput
          style={styles.input}
          value={userProfile.name}
          onChangeText={(text) => setUserProfile({ ...userProfile, name: text })}
          editable={isEditing}
        />
        <Text style={styles.infoTitle}>Age:</Text>
        <TextInput
          style={styles.input}
          value={userProfile.age?.toString() ?? ''} // Ensure the value is a string
          onChangeText={(text) => setUserProfile({ ...userProfile, age: parseInt(text, 10) || 0 })} // Handle NaN case
          editable={isEditing}
          keyboardType="numeric" // Specify numeric keyboard
        />
         <Text style={styles.infoTitle}>Summary:</Text>
        <TextInput
          style={styles.input}
          value={userProfile.summary}
          onChangeText={(text) => setUserProfile({ ...userProfile, summary: text })}
          editable={isEditing}
        />
         <Text style={styles.infoTitle}>Phone:</Text>
        <TextInput
          style={styles.input}
          value={userProfile.phone}
          onChangeText={(text) => setUserProfile({ ...userProfile, phone: text })}
          editable={isEditing}
        />
         <Text style={styles.infoTitle}>Address:</Text>
        <TextInput
          style={styles.input}
          value={userProfile.address}
          onChangeText={(text) => setUserProfile({ ...userProfile, address: text })}
          editable={isEditing}
        />


              <Text style={styles.infoTitle}>LinkedIn:</Text>
              <TouchableOpacity onPress={() => Linking.openURL(userProfile.linkedin)}>
              <TextInput
          style={styles.input}
          value={userProfile.linkedin}
          onChangeText={(text) => setUserProfile({ ...userProfile, linkedin: text })}
          editable={isEditing}
        />
          </TouchableOpacity>

   
              <Text style={styles.infoTitle}>GitHub:</Text>
              <TouchableOpacity onPress={() => Linking.openURL(userProfile.github)}>
              <TextInput
          style={styles.input}
          value={userProfile.github}
          onChangeText={(text) => setUserProfile({ ...userProfile, github: text })}
          editable={isEditing}
        />
          </TouchableOpacity>
      </View>
      <View style={styles.configFooter}>
     <Footer />
     </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    marginTop: 30,
    backgroundColor: 'white',
    // borderWidth: 5,
    // borderColor: 'gray',
    // borderRadius: 20,
    
  },
  profileContainer: {
    // alignItems: 'center',
  },
  avatarContainer: {
    borderWidth: 2,
    borderColor: 'orange',
    borderRadius: 75, // Giữ vòng tròn quanh avatar
    // padding: 5,
    marginBottom: 20,
    justifyContent: 'center', // Căn giữa avatar theo chiều dọc
    alignItems: 'center', // Căn giữa avatar theo chiều ngang
    alignSelf: 'center',
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  buttonRow: {
    flexDirection: 'row', // Đặt các nút trên cùng một hàng
    justifyContent: 'space-around', // Căn khoảng cách giữa các nút
    width: '100%',
    marginBottom: 20,
  },
  uploadButton: {
    backgroundColor: 'orange',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'white',
  },
  uploadButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  name: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'orange',
    textAlign: 'center',
    padding: 10,
    backgroundColor: 'rgba(255, 165, 0, 0.1)',
    borderRadius: 10,
    overflow: 'hidden',  // Tạo hiệu ứng bo góc
  },
  summary: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
    marginVertical: 10,
    paddingHorizontal: 15,
    lineHeight: 22,
  },
  infoTable: {
    width: '100%',
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    alignItems: 'center',
  },
  infoTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'black',

  },
  infoValue: {
    fontSize: 16,
    color: 'gray',
  },
  link: {
    color: 'orange',
    fontSize: 10,
    textDecorationLine: 'underline',
  },
  input: {
    width: '100%',
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
  },
  configFooter: {
    flex: 1,
    alignContent: 'flex-end',
    backgroundColor: 'orange',
    // bottom: 2,
    width: '100%',
    borderRadius: 20,
    // borderWidth: 5,
    // borderBlockColor: 'black',
  },
});

export default ProfileScreen;
