import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

// Import our navigators
import AuthNavigator from './src/navigation/AuthNavigator';
import AppNavigator from './src/navigation/AppNavigator';

// Import our new Zustand store!
import { useAuthStore } from './src/store/authStore';

export default function App() {
  // Get the state directly from our store
  // This is a "hook" - it subscribes this component to any changes
  const user = useAuthStore((state) => state.user);
  const isLoading = useAuthStore((state) => state.isLoading);

  // In a future step, we will add a useEffect here to check
  // for a persistent Firebase session when the app loads.
  // For now, we'll manually set isLoading to false in a bit.

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