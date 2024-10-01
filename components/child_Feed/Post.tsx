import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface PostProps {
  data: {
    name: string;
    email: string;
    avatar: string;
    likes: number;
    comments: Array<{ user: { name: string; avatar: string }; text: string }>;
    linkedin?: string;
    github?: string;
    summary?: string;
  };
  onLike: () => void;
  onComment: () => void;
  like: boolean;
  comment: boolean;
}

const Post: React.FC<PostProps> = ({ data, onLike, onComment, like, comment }) => {
  const { name, avatar, likes, comments } = data;
  return (
    <View style={styles.newContainer}>
      <View style={styles.newHead}>
        <Image source={{ uri: avatar }} style={styles.iconAvatar} />
        <Text style={styles.modalTitle}>{name}</Text>
      </View>

      <View style={styles.newBody}>
        <Text style={styles.newTitle}>Can you review my cv ?</Text>
        <Image source={{ uri: avatar }} style={styles.avatar} />

        <View style={styles.interactionContainer}>
          <Text style={styles.interactionText} onPress={onLike}>Likes: {likes}</Text>
          <Text style={styles.interactionText} onPress={onComment}>Comments: {comments.length}</Text>
        </View>

        <View style={styles.line}></View>

        <View style={styles.buttonContainer}>
          <Text style={styles.buttonText} onPress={onLike}>
            <Ionicons name="thumbs-up-outline" color={like ? "blue" : "black"} size={15} /> Like
          </Text>
          <Text style={styles.buttonText} onPress={onComment}>
            <Ionicons name="chatbubble-outline" color={comment ? "blue" : "black"} size={15} /> Comment
          </Text>
        </View>

        {/* Render comments */}
        <View style={styles.commentsContainer}>
          {comments.map((comment, index) => (
            <View key={index} style={styles.comment}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image source={{ uri: comment.user.avatar }} style={styles.iconComment} />
                <Text style={styles.commentUser}>{comment.user.name}</Text>
              </View>
              <Text style={styles.commentText}>{comment.text}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  newContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: 'white',
    width: '90%',
    height: 'auto',
    margin: 10,
    borderColor: '#000000',
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
  },
  iconAvatar: {
    width: 50,
    height: 50,
    borderRadius: 100,
    borderColor: 'orange',
    borderWidth: 1,
  },
  iconComment: {
    width: 30,
    height: 30,
    borderRadius: 100,
    borderColor: 'orange',
    borderWidth: 2,
    marginRight: 10,
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  newHead: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    justifyContent: 'space-between',
    width: '100%',
    height: 50,
    marginTop: 10,
  },
  newBody: {
    flexDirection: 'column',
    width: '100%',
    marginTop: 5,
  },
  avatar: {
    width: '100%',
    height: 200,
    marginBottom: 10,
  },
  interactionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
  },
  interactionText: {
    fontSize: 16,
  },
  line: {
    height: 1,
    backgroundColor: '#ccc',
    width: '100%',
    marginVertical: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  newTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 16,
    color: 'black',
  },
  commentsContainer: {
    marginTop: 10,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: '100%',
  },
  comment: {
    marginBottom: 5,
    backgroundColor: 'white',
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 5,
    paddingRight: 5,
    borderRadius: 10,
  },
  commentUser: {
    fontWeight: 'bold',
  },
  commentText: {
    marginLeft: 40,
    fontSize: 16,
    color: 'gray',
    backgroundColor: 'rgba(213, 214, 215, 0.96)',
    padding: 5,
    borderRadius: 10,
  },
});

export default Post;