import React from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';

// Import Firebase auth
import { signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig'; // Import our auth export

const ProfileScreen = () => {

  // This function will handle the logout logic
  const handleLogout = async () => {
    try {
      // This is the Firebase function to sign out
      await signOut(auth);
      
      // And again... 'onAuthStateChanged' in App.js
      // will see this! It will set the user to 'null'
      // and automatically navigate back to the AuthNavigator.
      console.log('User logged out!');
      
    } catch (error) {
      console.error(error);
      Alert.alert('Logout Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile Screen</Text>
      
      {/* We will add profile info here later */}
      
      <Button title="Log Out" onPress={handleLogout} color="red" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  }
});

export default ProfileScreen;