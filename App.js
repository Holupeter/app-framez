import React, { useEffect } from 'react'; // <-- Import useEffect
import { NavigationContainer } from '@react-navigation/native';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

// Import our navigators
import AuthNavigator from './src/navigation/AuthNavigator';
import AppNavigator from './src/navigation/AppNavigator';

// Import our Zustand store
import { useAuthStore } from './src/store/authStore';

// Import Firebase auth
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './src/firebaseConfig'; // <-- Import auth from our config

export default function App() {
  // Get state and actions from our store
  const user = useAuthStore((state) => state.user);
  const isLoading = useAuthStore((state) => state.isLoading);
  const setUser = useAuthStore((state) => state.setUser);
  const setLoading = useAuthStore((state) => state.setLoading);

  // This effect runs once when the app component mounts
  useEffect(() => {
    // onAuthStateChanged returns an 'unsubscribe' function
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      // 1. We get the user from Firebase (or null)
      console.log("Firebase Auth State Changed:", firebaseUser); // Good for debugging
      
      // 2. We set our user in the global store
      setUser(firebaseUser); 
      
      // 3. We are no longer loading
      setLoading(false);
    });

    // We return the unsubscribe function to clean up the listener
    // when the App component unmounts
    return () => unsubscribe(); 
  }, []); // The empty array [] means this effect runs only once

  // 1. If we are loading, show a simple spinner
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // 2. Once loading is done, check if we have a user
  return (
    <NavigationContainer>
      {user ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});