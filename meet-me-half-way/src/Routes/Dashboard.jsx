// Placeholder dashboard page

import React from 'react'
import Navbar from '../Components/Navbar'
import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-analytics.js";
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDs9dukouikGyLKxjQgTnM1s2bMQ5h_ezs",
  authDomain: "meet-me-halfway-5475f.firebaseapp.com",
  databaseURL: "https://meet-me-halfway-5475f-default-rtdb.firebaseio.com",
  projectId: "meet-me-halfway-5475f",
  storageBucket: "meet-me-halfway-5475f.firebasestorage.app",
  messagingSenderId: "140642671795",
  appId: "1:140642671795:web:49943cd681cdde8e4364c6",
  measurementId: "G-5BL66VCECJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

// Show user dashboard if logged in
const Dashboard = () => {
  const [authenticated, setAuthenticated] = useState(null);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  // Check if user is logged in
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setAuthenticated(true);
    }
  })

  // Call firebase api to delete auth token and set redirect flag
  const handleLogOut = (event) => {
    signOut(auth)
      .then(() => {
        // clear storage and set flag
        localStorage.clear();
        setShouldRedirect(true);
      })
      .catch((error) => {
        console.log(error);
      });
    }

  // Dashboard for non logged in users
  if (!authenticated) {
    return (
      <div>
        <Navbar />
        <h1>Dashboard</h1>
        <p>Please log in to view this page</p>
      </div>
    )
  }

  // Dashboard for logged in users
  else {
    return (
      <div>
        {/* Placeholder navbar and page title */}
        <Navbar />
        <h1>Dashboard</h1>
        <p>Welcome, I need probably need to get your information from the database using the backend</p>

        <div id="button_container">
          <button id="submit" type="submit" onClick={handleLogOut}>Logout</button>
        </div>
        
        {shouldRedirect && <Navigate to="/login" />}
      </div>
    )
  }
}

export default Dashboard