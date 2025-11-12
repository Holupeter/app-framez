import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, RefreshControl } from 'react-native';
import { COLORS } from '../constants/colors';
import { auth } from '../firebaseConfig';

// Import our db
import { db } from '../firebaseConfig';
// Import Firestore functions
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';

// Import our new component
import PostItem from '../components/PostItem';

const FeedScreen = () => {
  const [loading, setLoading] = useState(true); // Start in loading state
  const [posts, setPosts] = useState([]);     // Store our array of posts
  const [refreshing, setRefreshing] = useState(false); // refreshing state
  const currentUserId = auth.currentUser ? auth.currentUser.uid : null;

  // This useEffect will run once when the component mounts
  useEffect(() => {
    // 1. Create a query to get our 'posts' collection
    const postsCollection = collection(db, 'posts');
    
    // 2. Create a query to order the posts by 'createdAt' in descending order
    const q = query(postsCollection, orderBy('createdAt', 'desc'));

    // 3. Set up the real-time listener (onSnapshot)
    // This returns an 'unsubscribe' function
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      // 4. Map over the 'docs' in the snapshot
      const postsArray = querySnapshot.docs.map(doc => ({
        ...doc.data(), // Spread all the document data (text, authorId, etc.)
        id: doc.id,   // Add the document ID as 'id'
      }));

      // 5. Update our local state with the new array of posts
      setPosts(postsArray);
      setLoading(false);
    }, (error) => {
      // Handle errors
      console.error("Error fetching posts: ", error);
      Alert.alert("Error", "Could not fetch posts.");
      setLoading(false);
    });

    // 6. Return the unsubscribe function
    // This will run when the component unmounts, cleaning up the listener
    return () => unsubscribe();
    
  }, []); // The empty array [] means this effect only runs on mount


    // --- This is our new onRefresh function ---
    const onRefresh = useCallback(() => {
        setRefreshing(true);
     // Simulate a 1-second refresh for good UX
        setTimeout(() => {
            setRefreshing(false);
        }, 1000);
    }, []); // Empty dependency array

  // Show a loading spinner while we fetch data
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // Once loaded, show the FlatList
  return (
    <View style={styles.container}>
      <FlatList
        data={posts} // The array of posts
        renderItem={({ item }) => <PostItem post={item} currentUserId={currentUserId} />} // How to render each item
        keyExtractor={(item) => item.id} // A unique key for each item
        ListEmptyComponent={<Text style={styles.emptyText}>No posts yet. Be the first!</Text>}
      
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[COLORS.primary]} // Set the spinner color to our orange
            tintColor={COLORS.primary} // For iOS
          />
        }
      
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.light, // Set the light gray background
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.light, // Also here
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: COLORS.gray,
  }
});

export default FeedScreen;