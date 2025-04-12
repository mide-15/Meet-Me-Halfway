// Placeholder Navbar component

import React, { useState } from "react";
import { signOut } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { Navigate } from 'react-router-dom'
import "./NavbarStyle.css";
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-analytics.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";

// Firebase configuration (this should be an env var)
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

const Navbar = () => {
  const [shouldRedirect, setShouldRedirect] = useState(false);

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

  return (
    <nav class="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: "#031749" }}>
      <a class="navbar-brand" href="#">Logo</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
            <a class="nav-link text-white" href="/">Home</a>
        </li>
        <li class="nav-item">
            <a class="nav-link text-white" href="/login">Login</a>
        </li>
        <li class="nav-item">
            <a class="nav-link text-white" href="/registration">Register</a>
        </li>
        <li class="nav-item">
            <a class="nav-link text-white" href="/dashboard">Map</a>
        </li>
        <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle text-white" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Settings
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <a class="dropdown-item" href="#">Account</a>
            <a class="dropdown-item" href="#">Another action</a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" type="submit" onClick={handleLogOut}>Sign Out</a>
            </div>
        </li>
        </ul>
      </div>
      {shouldRedirect && <Navigate to="/" />}
      </nav>
  )
}

export default Navbar