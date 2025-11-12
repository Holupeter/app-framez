import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Alert, ActivityIndicator, Image, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker'; // Import image picker
import { COLORS } from '../constants/colors';

// Import our new upload function
import { uploadImageToStorage } from '../utils/storageHelper'; 

// Import our db and auth from Firebase
import { db, auth } from '../firebaseConfig'; 
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'; 

const CreatePostScreen = ({ navigation }) => {
  const [postText, setPostText] = useState('');
  const [image, setImage] = useState(null); // To store the selected image URI
  const [loading, setLoading] = useState(false);

  // --- Function to pick an image ---
  const pickImage = async () => {
    // Request permission to access the media library
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert("Permission required", "You must allow access to your photos to post an image.");
      return;
    }

    // Launch the image picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, // Only allow images
      allowsEditing: true, // Allow user to crop/edit
      aspect: [4, 3],      // Enforce an aspect ratio
      quality: 0.7,        // Compress image to 70% quality
    });

    if (!result.canceled) {
      // The user picked an image. 'result.assets[0].uri' has the local file path.
      setImage(result.assets[0].uri);
    }
  };

  // --- Function to handle the post ---
  const handlePost = async () => {
    // A user must write text OR add an image
    if (postText.trim() === '' && !image) {
      Alert.alert('Empty Post', 'Please write something or add an image.');
      return;
    }

    setLoading(true);

    try {
      const user = auth.currentUser;
      if (!user) throw new Error("No user logged in!");

      let imageUrl = null;

      // 1. If an image was selected, upload it first
      if (image) {
        console.log("Uploading image...");
        imageUrl = await uploadImageToStorage(image);
        console.log("Image uploaded:", imageUrl);
      }

      // 2. Now, add the post to Firestore, including the new imageUrl
      await addDoc(collection(db, 'posts'), {
        text: postText.trim(),
        createdAt: serverTimestamp(),
        authorId: user.uid,
        authorEmail: user.email,
        imageUrl: imageUrl, // Add the image URL (will be null if no image)
      });

      console.log('Post saved!');
      
      setLoading(false);
      setPostText('');
      setImage(null);
      
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
        multiline
        numberOfLines={4} // Shorten it a bit
      />

      {/* --- Image Picker Button --- */}
      <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
        <Text style={styles.imageButtonText}>Pick an Image</Text>
      </TouchableOpacity>

      {/* --- Show the selected image preview --- */}
      {image && (
        <View style={styles.imagePreviewContainer}>
          <Image source={{ uri: image }} style={styles.imagePreview} />
          <TouchableOpacity style={styles.removeImageButton} onPress={() => setImage(null)}>
            <Text style={styles.removeImageText}>X</Text>
          </TouchableOpacity>
        </View>
      )}

      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <TouchableOpacity style={styles.button} onPress={handlePost} disabled={loading}>
            {loading ? (
                <ActivityIndicator color={COLORS.white} />
            ) : (
                <Text style={styles.buttonText}>Post</Text>
            )}
        </TouchableOpacity>
      )}
    </View>
  );
};

// --- Add new styles ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: COLORS.white,
  },
  input: {
    height: 120,
    backgroundColor: COLORS.light,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingTop: 15,
    marginBottom: 20,
    fontSize: 16,
    color: COLORS.dark,
    textAlignVertical: 'top',
  },
  imageButton: {
    backgroundColor: COLORS.secondary, // Our calm blue
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  imageButtonText: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
  imagePreviewContainer: {
    marginBottom: 20,
    alignItems: 'center',
    position: 'relative',
  },
  imagePreview: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    resizeMode: 'cover',
    borderColor: COLORS.border,
    borderWidth: 1,
  },
  removeImageButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeImageText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  // --- We'll reuse the button style from LoginScreen ---
  button: {
    backgroundColor: COLORS.primary, // Our orange color
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    height: 50,
    justifyContent: 'center',
  },
  buttonText: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default CreatePostScreen;