// Login page with placeholder html

import React from 'react'
import { useState } from 'react'
import Navbar from '../../Components/Navbar'
import { Navigate } from 'react-router-dom'

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-analytics.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";

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

const Login = () => {
  // Inputs and redirect condition
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [shouldRedirect, setShouldRedirect] = useState(false);
  
  // Handle form submission using firebase sdk to log in
  const handleSubmit = (event) => {
    event.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        localStorage.setItem("user", JSON.stringify(user));
        setShouldRedirect(true);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
      });
  }


  return (
    <div>
      {/* Placeholder navbar and page */}
      <Navbar />

      {/* Html form */}
      <form onSubmit={handleSubmit}>
        <div id="content_container">
          <div id="form_container">

            <div id="form_header_container">
              <h2 id="form_header">Login</h2>
            </div>

            <div id="form_content_container">
              <div id="form_content_inner_container">
                {/* Inputs need to be formatted like this for firebase login */}
                <input 
                  type="email" 
                  placeholder="Email" 
                  id="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}>
                </input>
                <input 
                  type="password" 
                  placeholder="Password" 
                  id="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}>
                </input>

                {/* The button is not as important as log as it submits */}
                <div id="button_container">
                    <button id="submit" type="submit">Login</button>
                </div>

              </div>
            </div>

          </div>
        </div>
      </form>
      
      {/* If the user has logged in, redirect them */}
      { shouldRedirect && <Navigate to="/dashboard" /> }
    </div>
  )
}

export default Login