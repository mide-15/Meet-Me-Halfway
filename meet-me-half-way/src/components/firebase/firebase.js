import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; 

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDs9dukouikGyLKxjQgTnM1s2bMQ5h_ezs",
  authDomain: "meet-me-halfway-5475f.firebaseapp.com",
  projectId: "meet-me-halfway-5475f",
  storageBucket: "meet-me-halfway-5475f.appspot.com",
  messagingSenderId: "140642671795",
  appId: "1:140642671795:web:49943cd681cdde8e4364c6",
  measurementId: "G-5BL66VCECJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {app, auth};
