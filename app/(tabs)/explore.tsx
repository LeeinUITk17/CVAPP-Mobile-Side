import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity, ScrollView, Alert, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Footer from '@/components/child_components/Footer';
import Modal from 'react-native-modal';
import Option from '@/components/child_components/Option';
import Post from '@/components/child_Feed/Post';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CVContext } from '@/hooks/cvContext';
import { UserProfileContext } from '@/hooks/profileContext';
import axios from 'axios';
interface User {
  name: string;
  email: string;
  avatar: string;
  age: number | null;
  phone: string | null;
  address: string | null;
  linkedin: string | null;
  github: string | null;
  summary: string | null;
}

interface Comment {
  user: {
    name: string;
    avatar: string;
  };
}

interface CV {
  id: number;
  createdAt: string;
  updatedAt: string;
  user: User;
  likes: any[]; 
  comments: Comment[];
}
const ExploreScreen = () => {
  const [datacvs, setdatacvs] = useState<CV[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [like, setLike] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any | null>(null);
  const [commentText, setCommentText] = useState<string>(''); 
  const [selectedCV, setSelectedCV] = useState<number | null>(null); 
  const cvContext = useContext(CVContext);
  if (!cvContext) {
    return null;
  }
  const { cvs, setCvs } = cvContext;

  const userProfileContext = useContext(UserProfileContext);
  if (!userProfileContext) {
    return null;
  }
  const { userProfile } = userProfileContext;

  // Handle liking a post
  const handleLike = async (cvId: number) => {
    try {
      const token = await AsyncStorage.getItem('access_token');
      if (!token) {
        Alert.alert('Error', 'User not authenticated');
        return;
      }
      if (!userProfile) {
        Alert.alert('Error', 'User profile not found');
        return;
      }

      const response = like
        ? await fetch(
            `http://192.168.130.91:3000/user/${userProfile.id}/like/${cvId}`,
            {
              method: 'DELETE',
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
        : await fetch(
            `http://192.168.130.91:3000/user/${userProfile.id}/like/${cvId}`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
            }
          );
      console.log(response.ok);
      if (response.ok) {
        setdatacvs((prev) =>
          prev.map((post) =>
            post.id === cvId
              ? { ...post, likes: like ? post.likes.filter((like) => like !== userProfile.id) : [...post.likes, userProfile.id] }
              : post
          )
        );
        setLike(!like);
      } else {
        Alert.alert('Error', 'Failed to update like status');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const handleComment = async (cvId: number) => {
    if (!commentText.trim()) {
      Alert.alert('Error', 'Comment cannot be empty.');
      return;
    }

    try {
      const token = await AsyncStorage.getItem('access_token');
      if (!token) {
        Alert.alert('Error', 'User not authenticated.');
        return;
      }

      if (!userProfile) {
        Alert.alert('Error', 'User profile not found.');
        return;
      }
      console.log(commentText);
      console.log(datacvs);
      const response = await fetch(`http://192.168.130.91:3000/user/${userProfile.id}/comment/${cvId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ text: commentText }),
      });
      console.log(response);
      console.log(response.ok);
      if (response.ok) {
        const updatedCVs = datacvs.map((post) => {
          if (post.id === cvId) {
            return {
              ...post,
              comments: [...post.comments, { text: commentText, user: { name: userProfile?.name || 'Unknown', avatar: userProfile?.avatar || '' } }],
            };
          }
          return post;
        });
        setdatacvs(updatedCVs);
        setCommentText(''); 
        setSelectedCV(null); 
      } else {
        console.error('Failed to add comment');
        Alert.alert('Error', 'Failed to add comment.');
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'An error occurred while adding the comment.');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (cvs == null) {
          console.log('cvs is null');
          setCvs([]);
          return;
        }
        const usersData = cvs; 
        setdatacvs(usersData);
      } catch (error) {
        console.error('Error fetching users:', error);
        setError('Failed to load users');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [cvs]);

  const handleRowPress = (user: any) => {
    setSelectedUser(user);
    setModalVisible(true);
  };

  // const toggleDropdown = () => {
  //   setSelectedCV(null);
  // };

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.postContainer}>
       <TouchableOpacity onPress={() => setSelectedCV(item.id)}>
      <Post
        data={{
          name: item.user.name,
          email: item.user.email,
          avatar: item.user.avatar,
          likes: item.likes || 0,
          comments: item.comments || [],
          linkedin: item.user.linkedin,
          github: item.user.github,
          summary: item.user.summary,
        }}
        onLike={() => handleLike(item.id)}
        onComment={() => handleComment(item.id)}
        like={false}
        comment={false}
      />
      </TouchableOpacity>
      {selectedCV === item.id && (
        <View style={styles.commentInputContainer}>
          <TextInput
            style={styles.commentInput}
            placeholder="Add a comment..."
            value={commentText}
            onChangeText={setCommentText}
          />
          <TouchableOpacity onPress={() => handleComment(item.id)} style={styles.commentButton}>
            <Text style={styles.commentButtonText}>Post</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.ConfigContainer}>
        <View style={styles.headerImageContainer}>
          <Image
            source={{ uri: 'https://res.cloudinary.com/dbonwxmgl/image/upload/v1726731631/mauh8cky29vbpft7aqpf.jpg' }}
            style={styles.profilePicture}
          />
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerText}>
              <Ionicons name="code-outline" color="black" size={20} /> Public Dev
            </Text>
          </View>
          <Option />
        </View>

        <View style={styles.container}>
          {loading ? (
            <Text>Loading...</Text>
          ) : error ? (
            <Text>{error}</Text>
          ) : (
            <FlatList
            data={datacvs.map((cv: CV) => ({ user: cv.user, id: cv.id, comments: cv.comments, likes: cv.likes.length, createdAt: cv.createdAt, updatedAt: cv.updatedAt }))}
              renderItem={renderItem}
              keyExtractor={(item) => item.id.toString()}
            />
          )}
        </View>
      </View>

      {selectedUser && (
        <Modal
          isVisible={modalVisible}
          onBackdropPress={() => setModalVisible(false)}
          onBackButtonPress={() => setModalVisible(false)}
          swipeDirection="left"
          onSwipeComplete={() => setModalVisible(false)}
          animationIn="slideInLeft"
          animationInTiming={800}
          animationOut="slideOutLeft"
          animationOutTiming={800}
          backdropTransitionInTiming={800}
          backdropTransitionOutTiming={800}
          backdropOpacity={0.0}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <View style={styles.flexConfig}>
                <Image source={{ uri: selectedUser.avatar }} style={styles.iconAvatar} />
                <Text style={styles.modalTitle}>{selectedUser.name}</Text>
              </View>
              <Text style={styles.modalText}>
                <Ionicons name="mail-outline" color="black" size={15} /> Email: {selectedUser.email}
              </Text>
              <Text style={styles.modalText}>
                <Ionicons name="calendar-outline" color="black" size={15} /> Age: {selectedUser.age}
              </Text>
              <Text style={styles.modalText}>
                <Ionicons name="call-outline" color="black" size={15} /> Phone: {selectedUser.phone}
              </Text>
              <Text style={styles.modalText}>
                <Ionicons name="location-outline" color="black" size={15} /> Address: {selectedUser.address}
              </Text>
              <Text style={styles.modalText}>
                <Ionicons name="ribbon-outline" color="black" size={15} /> Score: {selectedUser.score}
              </Text>
              <Text style={styles.modalText}>
                <Ionicons name="pricetag-outline" color="black" size={15} /> Summary: {selectedUser.summary}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      )}
      <Footer />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  ConfigContainer: {
    marginTop: 20,
    flex: 1,
  },
  headerImageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  profilePicture: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  headerTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
  },
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 20,
  },
  modalContent: {
    flex: 1,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalText: {
    marginBottom: 10,
  },
  postContainer: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  commentSection: {
    marginTop: 10,
  },
  commentText: {
    fontStyle: 'italic',
  },
  commentInputContainer: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
  },
  commentInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 8,
  },
  commentButton: {
    marginLeft: 10,
    backgroundColor: 'orange',
    padding: 10,
    borderRadius: 10,
  },
  commentButtonText: {
    color: 'white',
    backgroundColor: "orange",
    fontSize: 16,
    fontWeight: 'bold',
  //  borderRadius: 10,
  },
  closeButton: {
    marginTop: 20,
    alignSelf: 'center',
  },
  closeButtonText: {
    color: '#007BFF',
    fontWeight: 'bold',
  },
  iconAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  flexConfig: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default ExploreScreen;