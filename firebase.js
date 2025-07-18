// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "employee-authentication-d0e1e.firebaseapp.com",
  databaseURL: "https://employee-authentication-d0e1e-default-rtdb.firebaseio.com",
  projectId: "employee-authentication-d0e1e",
  storageBucket: "employee-authentication-d0e1e.appspot.com",
  messagingSenderId: "873525828597",
  appId: "1:873525828597:web:b623f515f059a5d2fbdebc",
  measurementId: "G-YRW425ZHH2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
