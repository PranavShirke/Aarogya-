// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Replace with your own config from Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyAu94tawjUj9RaKkAfrzE1SZdL5M_s2TbY",
  authDomain: "aicarelink-41053.firebaseapp.com",
  projectId: "aicarelink-41053",
  storageBucket: "aicarelink-41053.firebasestorage.app",
  messagingSenderId: "637585840146",
  appId: "1:637585840146:web:fe81c8026d7a754126e0cb",
  measurementId: "G-TWT0P8FED0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };
