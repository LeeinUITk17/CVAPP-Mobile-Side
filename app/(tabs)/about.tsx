import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, Alert, ScrollView, Image, TouchableOpacity, ImageBackground } from 'react-native';
import Footer from '@/components/child_components/Footer';
import Option from '@/components/child_components/Option';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserProfileContext } from '@/hooks/profileContext';

const AboutScreen = () => {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState<{ id: string; text: string; createdAt: string }[]>([]);
  const [error, setError] = useState('');
  const userProfileContext = useContext(UserProfileContext);
  if (!userProfileContext) {
    return null; 
  }
  const { userProfile, setUserProfile } = userProfileContext;

  const fetchComments = async () => {
    try {
      const response = await fetch('http://192.168.130.91:3000/user/comments');
      if (response.ok) {
        const data = await response.json();
        setComments(data);
      } else {
        console.error('Failed to fetch comments');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const validation = (comment: string) => {
    if (!comment.trim()) {
      setError('This field is required');
      setTimeout(() => {
        setError('');
      }, 3000);
      return false;
    } else {
      setError('');
      return true;
    }
  };

  // Handle adding a comment
  // const handleAddComment = async () => {
  //   if (!validation(comment)) return;
  //   try {
  //     const token = await AsyncStorage.getItem('access_token');
  //     if (!userProfile) {
  //       console.error('User profile is null');
  //       return;
  //     }
  //     const response = await fetch(`http://192.168.130.91:3000/user/${userProfile.id}/comment`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authorization: `Bearer ${token}`,
  //       },
  //       body: JSON.stringify({ text: comment }),
  //     });

  //     if (response.ok) {
  //       const newComment = await response.json();
  //       setComments([...comments, newComment]);
  //       setComment('');
  //       alertFunction(newComment.text);
  //     } else {
  //       console.error('Failed to add comment');
  //     }
  //   } catch (error) {
  //     console.error('Error:', error);
  //   }
  // };

  // Alert function to display the added comment
  const alertFunction = (comment: string) =>
    Alert.alert('Hi there', `Your comment is ${comment}`, [{ text: 'OK' }]);

  // Fetch comments when the component mounts
  useEffect(() => {
    fetchComments();
  }, []);

  const renderComment = ({ item }: { item: { id: string; text: string; createdAt: string } }) => (
    <View style={styles.commentItem}>
    <Text style={styles.commentText}>{item.text}</Text>
  </View>

  );

  return (
    <ScrollView style={styles.container}>
      <ImageBackground
      source={{ uri: 'https://res.cloudinary.com/dbonwxmgl/image/upload/v1726731631/mauh8cky29vbpft7aqpf.jpg' }}
      style={styles.backgroundImage}
    >
      <View style={styles.profilePictureContainer}>
        <Image
          source={{ uri: userProfile ? userProfile.avatar : 'https://res.cloudinary.com/dbonwxmgl/image/upload/v1718691428/ymijup68uyjglfikvfqx.jpg' }}
          style={styles.profilePicture}
        />
      </View>
      <Text style={styles.introductionTitle}>
      レ・タイン・タイ
      </Text>
      <Text style={styles.introductionSubtitle}>
      フルスタック開発者
      </Text>
      <Option/>
    </ImageBackground>
      <View style={styles.MainContent}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About Me</Text>
        
        <Text style={styles.sectionText}>
          I am currently pursuing a degree in Information Technology at the University of Information Technology (UIT) with a focus on Japanese-oriented IT. 
          I have experience working with technologies like Node.js, MongoDB, and Express.js, and I am passionate about backend development. My goal is to become 
          an expert in optimizing processing speed and algorithms, while designing robust system architectures.
        </Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Hobbies & Interests</Text>
        <Text style={styles.sectionText}>
          In my free time, I enjoy playing the guitar, singing, and composing my own songs. I also like to explore new programming frameworks and tools, 
          continuously expanding my technical knowledge.
        </Text>
      </View>
      <View style={styles.container}>
      <FlatList
        data={comments}
        keyExtractor={(item) => item.id}
        renderItem={renderComment}
        contentContainerStyle={styles.commentsContainer}
      />
      {/* <TextInput
        style={styles.commentInput}
        placeholder="Write your comment here..."
        value={comment}
        onChangeText={setComment}
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <TouchableOpacity style={styles.button} onPress={handleAddComment}>
        <Text style={styles.buttonText}>Add Comment</Text>
      </TouchableOpacity> */}
    </View>
      </View>
      <Footer />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    // padding: 20,
  },
  MainContent:{
    padding: 10,
  },
  errorText: {
    color: 'red',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'stretch', 
  },
  profilePictureContainer: {
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 16,
  },
  profilePicture: {
    width: 128,
    height: 128,
    borderRadius: 100,
  },
  introductionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    // backgroundColor: 'rgba(134, 92, 9, 0.35)',
    backgroundColor: 'rgba(250, 244, 230, 0.86)',
    alignSelf: 'center',
    borderRadius: 10,
  },
  introductionSubtitle: {
    fontSize: 18,
    color: 'black',
    textAlign: 'center',
    marginTop: 8,
    backgroundColor: 'rgba(250, 244, 230, 0.86)',
    alignSelf: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 10,
  },
  section: {
    marginTop: 24,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#4A4A4A',
    marginBottom: 16,
    backgroundColor: 'orange',
    borderRadius: 10,
    alignSelf: 'center',
    width: 'auto',
    paddingLeft: 10,
    paddingRight: 10,
  },
  sectionText: {
    fontSize: 16,
    color: '#7D7D7D',
    lineHeight: 24,
  },
  commentInput: {
    borderColor: 'orange',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
  },
  commentsContainer: {
    marginTop: 20,
  },
  commentItem: {
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  commentText: {
    fontSize: 16,
    color: '#4A4A4A',
  },
  button: {
    backgroundColor: 'orange',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
    width: '50%',
    alignSelf: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default AboutScreen;