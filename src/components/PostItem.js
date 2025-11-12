import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { COLORS } from '../constants/colors';
import { Ionicons } from '@expo/vector-icons';

// Import Firestore and Storage functions for deleting
import { doc, deleteDoc } from 'firebase/firestore';
import { ref, deleteObject } from 'firebase/storage'; // <-- Import storage
import { db } from '../firebaseConfig'; // <-- We need 'db'
import { getStorage } from 'firebase/storage'; // <-- We need 'getStorage'

const PostItem = ({ post, currentUserId }) => {
  const postDate = post.createdAt ? post.createdAt.toDate().toLocaleDateString() : 'Just now';
  
  // Check if the current user is the author of this post
  const isAuthor = currentUserId === post.authorId;

  // --- This is our new delete function ---
  const handleDelete = () => {
    // 1. Show a confirmation alert
    Alert.alert(
      "Delete Post",
      "Are you sure you want to delete this post?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Delete", 
          style: "destructive", 
          onPress: () => deletePost() // Call the real delete function
        }
      ]
    );
  };

  const deletePost = async () => {
    console.log("Deleting post...");
    try {
      // 1. Delete the post document from Firestore
      const postRef = doc(db, 'posts', post.id);
      await deleteDoc(postRef);

      // 2. If the post has an image, delete it from Storage
      if (post.imagePath) {
        console.log("Deleting image...");
        const storage = getStorage();
        // Create a reference to the file to delete
        // We need to parse the URL to get the file path
        const imageRef = ref(storage, post.imagePath);
        await deleteObject(imageRef);
      }

      console.log("Post deleted successfully!");
      // The onSnapshot listener will automatically update the UI

    } catch (error) {
      console.error("Error deleting post: ", error);
      Alert.alert("Error", "Could not delete the post.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="person-circle" size={40} color={COLORS.gray} style={styles.avatar} />
        <View style={styles.headerText}>
          <Text style={styles.author}>{post.authorEmail}</Text>
          <Text style={styles.date}>{postDate}</Text>
        </View>
        
        {/* --- HERE IS THE LOGIC --- */}
        {/* Only show the delete button if isAuthor is true */}
        {isAuthor && (
          <TouchableOpacity onPress={handleDelete} style={styles.deleteButton}>
            <Ionicons name="trash-outline" size={24} color={COLORS.danger} />
          </TouchableOpacity>
        )}
      </View>

      {/* --- Image Content --- */}
      {post.imageUrl && (
        <Image source={{ uri: post.imageUrl }} style={styles.image} />
      )}

      {/* --- Text Content --- */}
      {post.text ? (
        <Text style={styles.text}>{post.text}</Text>
      ) : null}
    </View>
  );
};

// --- Add new styles ---
const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 12,
    paddingRight: 8, // Make room for button
    paddingVertical: 12,
  },
  avatar: {
    marginRight: 10,
  },
  headerText: {
    flex: 1, // This makes it take up the available space
  },
  author: {
    fontWeight: 'bold',
    fontSize: 16,
    color: COLORS.dark,
  },
  date: {
    fontSize: 12,
    color: COLORS.gray,
  },
  deleteButton: {
    padding: 4,
  },
  image: {
    width: '100%',
    height: 350,
    resizeMode: 'cover',
  },
  text: {
    fontSize: 14,
    color: COLORS.dark,
    paddingHorizontal: 15,
    paddingVertical: 12,
    lineHeight: 20,
  },
});

export default PostItem;