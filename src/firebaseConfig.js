import { initializeApp } from 'firebase/app';
import { 
  initializeAuth,
  getReactNativePersistence 
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

let firebaseConfig = {};

if (!__DEV__) {
  // PRODUCTION BUILD
  console.log("--- PRODUCTION BUILD DETECTED ---");
  console.log("Checking for FIREBASE_API_KEY...");

  if (!process.env.FIREBASE_API_KEY) {
    // This will fail the build with a clear error
    throw new Error("PRODUCTION BUILD FAILED: FIREBASE_API_KEY secret is missing or not loaded.");
  }

  console.log("Firebase secrets found. Initializing...");
  firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
  };

} else {
  // LOCAL DEVELOPMENT
  console.log("--- LOCAL BUILD DETECTED ---");
  const localConfig = require('./firebaseConfig.local.js');
  firebaseConfig = localConfig.firebaseConfig;
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export const db = getFirestore(app);