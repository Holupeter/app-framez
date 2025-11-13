import { initializeApp } from 'firebase/app';
import { 
  initializeAuth, // <-- Import this
  getReactNativePersistence // <-- Import this
} from 'firebase/auth'; // <-- Make sure 'firebase/auth' is imported
import { getFirestore } from 'firebase/firestore';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage'; // <-- Import this

// Your Firebase config object (DO NOT CHANGE THIS)
const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// --- HERE IS THE FIX ---
// Initialize Auth with persistence
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
// ----------------------

// Initialize and export other services
export const db = getFirestore(app);