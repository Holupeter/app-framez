import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PostItem = ({ post }) => {
  // Format the timestamp. 
  // We use '?.' (optional chaining) in case createdAt is null
  // while the server is still setting it.
  const postDate = post.createdAt?.toDate().toLocaleDateString();

  return (
    <View style={styles.container}>
      <Text style={styles.author}>{post.authorEmail}</Text>
      <Text style={styles.text}>{post.text}</Text>
      <Text style={styles.date}>{postDate}</Text>
      {/* We will add the Image here in a later step */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#eee',
    marginVertical: 8,
    marginHorizontal: 16,
  },
  author: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  text: {
    fontSize: 14,
    marginBottom: 8,
  },
  date: {
    fontSize: 12,
    color: '#888',
    textAlign: 'right',
  },
});

export default PostItem;