import React, { useState, useEffect }from 'react';
import { View, Text, StyleSheet, Button, Alert, FlatList, ActivityIndicator } from 'react-native';

// Import Firebase auth and db
import { signOut } from 'firebase/auth';
import { auth, db } from '../firebaseConfig'; 

// Import Firestore functions
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';

// Import our reusable component
import PostItem from '../components/PostItem';

const ProfileScreen = () => {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  // Get the current user's info
  const user = auth.currentUser;

  // This useEffect will run once when the component mounts
  useEffect(() => {
    if (!user) {
      setLoading(false);
      return; // If no user, don't try to fetch posts
    }

    // 1. Create a query for the 'posts' collection
    const postsCollection = collection(db, 'posts');
    
    // 2. Create a query to FILTER by 'authorId' and order by 'createdAt'
    const q = query(
      postsCollection, 
      where('authorId', '==', user.uid), // <-- THIS IS THE FILTER
      orderBy('createdAt', 'desc')
    );

    // 3. Set up the real-time listener (onSnapshot)
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const postsArray = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
      }));

      setPosts(postsArray);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching user's posts: ", error);
      Alert.alert("Error", "Could not fetch your posts.");
      setLoading(false);
    });

    // 4. Return the unsubscribe function for cleanup
    return () => unsubscribe();

  }, [user]); // Re-run this effect if the 'user' object ever changes

  // Logout Handler
  const handleLogout = async () => {
    try {
      await signOut(auth);
      // Our App.js listener will handle navigation
    } catch (error) {
      console.error(error);
      Alert.alert('Logout Error', error.message);
    }
  };

  // Show a loading spinner
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // Once loaded, show the user's info and their posts
  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <Text style={styles.emailText}>{user ? user.email : 'Not Logged In'}</Text>
        <Button title="Log Out" onPress={handleLogout} color="red" />
      </View>
      
      <FlatList
        data={posts}
        renderItem={({ item }) => <PostItem post={item} />}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={<Text style={styles.postsTitle}>Your Posts</Text>}
        ListEmptyComponent={<Text style={styles.emptyText}>You haven't posted anything yet.</Text>}
        style={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileHeader: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    alignItems: 'center',
  },
  emailText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  postsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    paddingHorizontal: 16,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 30,
    fontSize: 16,
    color: '#888',
  },
  list: {
    flex: 1,
  }
});

export default ProfileScreen;