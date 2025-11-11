import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './src/navigation/AuthNavigator';
// We will use AppNavigator later
// import AppNavigator from './src/navigation/AppNavigator'; 

export default function App() {
  // For Step 1, we just show the AuthNavigator
  // Later, we will add logic here to choose which navigator to show
  const user = null; // Placeholder for our auth state

  return (
    <NavigationContainer>
      {/* If user is logged in, show AppNavigator, else show AuthNavigator */}
      {/* We will implement this logic properly with Zustand soon! */}
      {user ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}