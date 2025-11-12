
# Framez - Mobile Social App

Framez is a mobile social application built with React Native and Firebase. It's inspired by apps like Instagram, allowing users to share posts with text and images. This project demonstrates a full-stack mobile workflow, including authentication, real-time data, and cloud file storage.



## 🚀 Core Features

* **Firebase Authentication:** Secure user sign-up, login, and logout using email & password.
* **Persistent Sessions:** Users remain logged in even after closing the app.
* **Real-time Post Feed:** A global feed showing posts from all users, updated in real-time using Firestore.
* **Create Posts:** Users can create posts with text and upload images from their device's gallery.
* **Image Uploads:** Images are uploaded to **Firebase Storage** and linked to the post in Firestore.
* **User Profile Screen:** Shows the current user's info and a real-time feed of *only* their own posts.
* **Professional UI/UX:** Styled with a "cool and calm" theme, featuring a custom orange accent color.

## 🛠️ Tech Stack

* **Frontend:** React Native (Expo)
* **Backend:** Firebase
    * **Authentication:** For user management.
    * **Firestore:** Real-time NoSQL database for post and user data.
    * **Storage:** For image file uploads.
* **State Management:** Zustand (for simple, minimal global auth state)
* **Navigation:** React Navigation (Stack & Tabs)
* **UI:** `expo-vector-icons` for icons.

---

## ⚙️ Setup and Installation

To run this project locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/app-framez.git](https://github.com/Holupeter/app-framez.git)
    cd framez
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up Firebase:**
    * Create a new project on the [Firebase Console](https://console.firebase.google.com/).
    * Enable **Authentication** (Email/Password).
    * Enable **Firestore Database** (in Test Mode).
    * Enable **Storage** (in Test Mode).
    * Go to Project Settings and "Add app" (select the Web `</>` option).
    * Copy your `firebaseConfig` object.

4.  **Create your config file:**
    * In the `src/` folder, create a new file named `firebaseConfig.js`.
    * **This file is in `.gitignore` and will not be pushed to GitHub.**
    * Paste the following code into the file, adding your keys from the Firebase console:

    ```javascript
    import { initializeApp } from 'firebase/app';
    import { 
      initializeAuth,
      getReactNativePersistence 
    } from 'firebase/auth';
    import { getFirestore } from 'firebase/firestore';
    import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

    // Add your Firebase project configuration
    const firebaseConfig = {
      apiKey: "YOUR_API_KEY",
      authDomain: "YOUR_AUTH_DOMAIN",
      projectId: "YOUR_PROJECT_ID",
      storageBucket: "YOUR_STORAGE_BUCKET",
      messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
      appId: "YOUR_APP_ID"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);

    // Initialize Auth with persistence
    export const auth = initializeAuth(app, {
      persistence: getReactNativePersistence(ReactNativeAsyncStorage)
    });
    
    export const db = getFirestore(app);
    ```

5.  **Run the app:**
    ```bash
    npx expo start
    ```
