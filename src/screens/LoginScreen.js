import React from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';

// We get the 'navigation' prop automatically from React Navigation
const LoginScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Framez</Text>
      
      {/* We will build out this form in the next step! */}
      <Text style={styles.placeholder}>Login form will go here...</Text>

      <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.switchText}>
          Don't have an account? Sign Up
        </Text>
      </TouchableOpacity>
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  placeholder: {
    marginVertical: 40,
    fontSize: 16,
    color: '#888',
  },
  switchText: {
    marginTop: 20,
    color: 'blue',
  },
});

export default LoginScreen;