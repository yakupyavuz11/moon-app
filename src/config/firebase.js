// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAVTI0CqC5yqHXksYjybY8ItsFXZTdEKw4",
  authDomain: "moon-chat-f02c7.firebaseapp.com",
  projectId: "moon-chat-f02c7",
  storageBucket: "moon-chat-f02c7.firebasestorage.app",
  messagingSenderId: "808561359816",
  appId: "1:808561359816:web:8775d36d990a3000da1efd",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export auth and firestore
export const auth = getAuth(app); 
export const database = getFirestore(app); 
