// src/firebase.js
import { initializeApp, getApps, getApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-analytics.js";

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

// Only initialize Firebase if no app has been initialized yet
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const analytics = getAnalytics(app);

export { auth, app, analytics };
