import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { auth } from '../firebaseConfig'; // We need auth to know who is uploading
import uuid from 'react-native-uuid'; // To give images a unique name

// 1. Install this new package for generating unique IDs
// Run: npm install react-native-uuid
// We need this so users don't overwrite each other's files.

/**
 * Uploads an image to Firebase Storage.
 * @param {string} uri - The local file URI of the image (e.g., 'file://...')
 * @returns {Promise<string>} - A promise that resolves with the public download URL of the image.
 */
export const uploadImageToStorage = async (uri) => {
  const user = auth.currentUser;
  if (!user) throw new Error("User not authenticated for image upload.");

  try {
    // 1. Get the image blob
    // We fetch the local file and convert it to a 'blob',
    // which is the format Firebase Storage understands.
    const response = await fetch(uri);
    const blob = await response.blob();

    // 2. Create a unique file path in Firebase Storage
    // We'll store images in a 'posts/{userId}/{randomUuid}.jpg' structure.
    // This is good practice to keep things organized.
    const fileId = uuid.v4(); // Generates a random unique ID
    const storage = getStorage();
    const filePath = `posts/${user.uid}/${fileId}`;
    const storageRef = ref(storage, filePath);

    // 3. Upload the file
    // 'uploadBytesResumable' is good for large files,
    // as it allows for progress tracking (though we won't add that just yet).
    const uploadTask = await uploadBytesResumable(storageRef, blob);

    // 4. Get the public Download URL
    // After the upload is complete, we get the URL
    // that anyone can use to view the image.
    const downloadURL = await getDownloadURL(uploadTask.ref);

    //Return BOTH the URL and the path
    return { downloadURL, filePath };

  } catch (error) {
    console.error("Error uploading image:", error);
    throw new Error("Image upload failed.");
  }
};