import React, { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import Navbar from '../../Components/Navbar';
import './login.css';

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-analytics.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";

// Firebase configuration
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

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage("");

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        localStorage.setItem("user", JSON.stringify(user));
        setShouldRedirect(true);
      })
      .catch((error) => {
        setErrorMessage(error.message);
        setLoading(false);
      });
  };

  return (
    <div>
      <Navbar />

      <div id="content_container">
        <div className="overlay"></div>

        <form onSubmit={handleSubmit}>
          <div id="form_container">
            <div id="form_header_container">
              <img src="/hmlogo.jpeg" alt="Meet Me Halfway Logo" id="login_logo" />
              <h2 id="form_header">Login</h2>
            </div>

            <div id="form_content_container">
              <div id="form_content_inner_container">
                <input
                  type="email"
                  placeholder="Email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <input
                  type="password"
                  placeholder="Password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                {/* Show error message if it exists */}
                {errorMessage && (
                  <p style={{ color: 'red', fontSize: '14px', marginBottom: '10px' }}>
                    {errorMessage}
                  </p>
                )}

                <div id="button_container">
                  <button id="submit" type="submit" disabled={loading}>
                    {loading ? "Logging in..." : "Login"}
                  </button>
                </div>

                {/* Forgot password & sign up links */}
                <div style={{ marginTop: '20px', textAlign: 'center' }}>
                  <Link to="/forgot-password" style={{ fontSize: '14px', color: '#031749', textDecoration: 'underline' }}>
                    Forgot password?
                  </Link>
                </div>

                <div style={{ marginTop: '10px', textAlign: 'center' }}>
                  <span style={{ fontSize: '14px' }}>Don't have an account? </span>
                  <Link to="/registration" style={{ fontSize: '14px', color: '#031749', textDecoration: 'underline' }}>
                    Create one
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </form>

        {shouldRedirect && <Navigate to="/dashboard" />}
      </div>
    </div>
  );
};

export default Login;