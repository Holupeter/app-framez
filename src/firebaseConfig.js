import { initializeApp } from 'firebase/app';
import { 
  initializeAuth,
  getReactNativePersistence 
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// This object will hold our keys
let firebaseConfig = {};

// Check if we are running in an EAS build environment
// by checking if the secret key exists.
if (process.env.FIREBASE_API_KEY) {
  // We are in a production build, load from environment variables
  console.log("Using EAS Secrets for Firebase config");
  firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
  };
} else {
  // We are not in a production build, so we must be in local development.
  // Load keys from our local, git-ignored file.
  console.log("Using local config for Firebase");
  const localConfig = require('./firebaseConfig.local.js');
  firebaseConfig = localConfig.firebaseConfig;
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth with persistence
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export const db = getFirestore(app);