// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; // Add this import

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAyLDZSt9x6AYfHoKyJh1dh_CghFKgNRlk",
  authDomain: "tastify-fdbb4.firebaseapp.com",
  projectId: "tastify-fdbb4",
  storageBucket: "tastify-fdbb4.firebasestorage.app",
  messagingSenderId: "688617869491",
  appId: "1:688617869491:web:247228c5b3a29cd7d820c6",
  measurementId: "G-DN2WD6MGW7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize and export Firebase Authentication
export const auth = getAuth(app);
