import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native'; // Import Image

const PostItem = ({ post }) => {
  const postDate = post.createdAt?.toDate().toLocaleDateString();

  return (
    <View style={styles.container}>
      {/* --- Header --- */}
      <View style={styles.header}>
        <Text style={styles.author}>{post.authorEmail}</Text>
        <Text style={styles.date}>{postDate}</Text>
      </View>

      {/* --- Text Content --- */}
      {post.text ? (
        <Text style={styles.text}>{post.text}</Text>
      ) : null}

      {/* --- Image Content --- */}
      {/* Only render the Image component if post.imageUrl exists */}
      {post.imageUrl && (
        <Image source={{ uri: post.imageUrl }} style={styles.image} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#eee',
    marginVertical: 8,
    marginHorizontal: 16,
    overflow: 'hidden', // Ensures image corners are rounded
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  author: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  text: {
    fontSize: 14,
    paddingHorizontal: 15,
    paddingBottom: 15, // Add padding if there's text
  },
  date: {
    fontSize: 12,
    color: '#888',
  },
  image: {
    width: '100%',
    height: 300, // Fixed height for images
    resizeMode: 'cover',
  }
});

export default PostItem;