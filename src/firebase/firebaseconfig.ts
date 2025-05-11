// src/firebase/firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDJTN5NiMob99JO1F3fScoORJH5Z2WaYPs",
    authDomain: "kasir-bapak.firebaseapp.com",
    projectId: "kasir-bapak",
    storageBucket: "kasir-bapak.firebasestorage.app",
    messagingSenderId: "454366589834",
    appId: "1:454366589834:web:a9d6454be54ebba7cd0e73"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export auth, provider, and firestore
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);