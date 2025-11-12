import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'; // Import the icons

// Import our screens
import FeedScreen from '../screens/FeedScreen';
import CreatePostScreen from '../screens/CreatePostScreen';
import ProfileScreen from '../screens/ProfileScreen';

// Import our colors
import { COLORS } from '../constants/colors';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        // This function sets the icon for each tab
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Feed') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Create') {
            iconName = focused ? 'add-circle' : 'add-circle-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          // You can return any component that you want here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        // --- Here are the style options ---
        tabBarActiveTintColor: COLORS.primary, // The active icon (our orange)
        tabBarInactiveTintColor: COLORS.gray, // The inactive icon
        tabBarStyle: {
          backgroundColor: COLORS.white, // Tab bar background
        },
        headerStyle: {
          backgroundColor: COLORS.white, // Header background
          borderBottomWidth: 1,
          borderBottomColor: COLORS.border,
        },
        headerTitleStyle: {
          color: COLORS.primary, // Header title text (our orange)
          fontWeight: 'bold',
        },
        headerTitleAlign: 'center', // Center the header title
      })}
    >
      <Tab.Screen name="Feed" component={FeedScreen} />
      <Tab.Screen name="Create" component={CreatePostScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default AppNavigator;