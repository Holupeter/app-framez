import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import our screens
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';

const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator
      // We turn off the header for the auth flow
      // because our screens have their own titles.
      screenOptions={{ headerShown: false }} 
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;