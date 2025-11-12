import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { COLORS } from '../constants/colors'; // Import our colors
import { Ionicons } from '@expo/vector-icons'; // We'll use this for a profile icon

const PostItem = ({ post }) => {
  // Use toDate() only if createdAt is not null
  const postDate = post.createdAt ? post.createdAt.toDate().toLocaleDateString() : 'Just now';

  return (
    <View style={styles.container}>
      {/* --- Post Header --- */}
      <View style={styles.header}>
        <Ionicons name="person-circle" size={40} color={COLORS.gray} style={styles.avatar} />
        <View style={styles.headerText}>
          <Text style={styles.author}>{post.authorEmail}</Text>
          <Text style={styles.date}>{postDate}</Text>
        </View>
      </View>

      {/* --- Image Content --- */}
      {post.imageUrl && (
        <Image source={{ uri: post.imageUrl }} style={styles.image} />
      )}

      {/* --- Text Content --- */}
      {post.text ? (
        <Text style={styles.text}>{post.text}</Text>
      ) : null}
    </View>
  );
};

// --- New Styles ---
const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    marginVertical: 8,
    marginHorizontal: 16,
    // A subtle shadow to lift the card
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  avatar: {
    marginRight: 10,
  },
  headerText: {
    flex: 1,
  },
  author: {
    fontWeight: 'bold',
    fontSize: 16,
    color: COLORS.dark,
  },
  date: {
    fontSize: 12,
    color: COLORS.gray,
  },
  image: {
    width: '100%',
    height: 350, // A taller image, more like Instagram
    resizeMode: 'cover',
  },
  text: {
    fontSize: 14,
    color: COLORS.dark,
    paddingHorizontal: 15,
    paddingVertical: 12,
    lineHeight: 20, // More readable
  },
});

export default PostItem;