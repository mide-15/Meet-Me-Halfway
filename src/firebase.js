// src/firebase.js
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDs9dukouikGyLKxjQgTnM1s2bMQ5h_ezs",
  authDomain: "meet-me-halfway-5475f.firebaseapp.com",
  databaseURL: "https://meet-me-halfway-5475f-default-rtdb.firebaseio.com",
  projectId: "meet-me-halfway-5475f",
  storageBucket: "meet-me-halfway-5475f.appspot.com",
  messagingSenderId: "140642671795",
  appId: "1:140642671795:web:49943cd681cdde8e4364c6",
  measurementId: "G-5BL66VCECJ"
};

// Prevent re-initialization
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// Export initialized services
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, app };
