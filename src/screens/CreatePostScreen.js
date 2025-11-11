import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Alert, ActivityIndicator } from 'react-native';

// Import our db and auth from Firebase
import { db, auth } from '../firebaseConfig'; 

// Import Firestore functions
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'; 

const CreatePostScreen = ({ navigation }) => {
  const [postText, setPostText] = useState('');
  const [loading, setLoading] = useState(false);

  // This function handles saving the post to Firestore
  const handlePost = async () => {
    if (postText.trim() === '') {
      Alert.alert('Empty Post', 'Please write something to post.');
      return;
    }

    setLoading(true);

    try {
      const user = auth.currentUser; // Get the currently logged-in user
      if (!user) {
        throw new Error("No user logged in!");
      }

      // 'posts' is the name of our collection in Firestore
      // addDoc will automatically create a new document with a unique ID
      const docRef = await addDoc(collection(db, 'posts'), {
        text: postText.trim(),
        createdAt: serverTimestamp(), // Get a server-generated timestamp
        authorId: user.uid,           // Save the user's unique ID
        authorEmail: user.email,      // Save the user's email (for easy display)
        // We will add imageUrl here in a later step
      });

      console.log('Post saved with ID: ', docRef.id);
      
      setLoading(false);
      setPostText(''); // Clear the input field
      
      // Navigate back to the Feed to see the new post
      navigation.navigate('Feed'); 

    } catch (error) {
      console.error("Error adding document: ", error);
      Alert.alert('Post Error', 'Something went wrong while trying to post.');
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>What's on your mind?</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Write your post here..."
        value={postText}
        onChangeText={setPostText}
        multiline // Allows multiple lines of text
        numberOfLines={6}
      />

      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <Button 
          title="Post" 
          onPress={handlePost} 
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 150,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingTop: 10, // Start text from the top
    marginBottom: 20,
    fontSize: 16,
    textAlignVertical: 'top', // For Android
  },
});

export default CreatePostScreen;