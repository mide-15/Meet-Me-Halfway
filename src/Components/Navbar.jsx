import React, { useState } from "react";
import { signOut } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { Navigate } from 'react-router-dom';
import "./NavbarStyle.css";
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-analytics.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";

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

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

const Navbar = () => {
  const [shouldRedirect, setShouldRedirect] = useState(false);

  const handleLogOut = () => {
    signOut(auth)
      .then(() => {
        localStorage.clear();
        setShouldRedirect(true);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: "#031749" }}>
      <a className="navbar-brand" href="/">
        <video
          src={`${process.env.PUBLIC_URL}/hmlogovid2.mov`}
          autoPlay
          loop
          muted
          playsInline
          className="placeholder-lightbox"
          style={{ width: '50px', height: 'auto' }}
        />
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <a className="nav-link text-white" href="/">Home</a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-white" href="/login">Login</a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-white" href="/registration">Register</a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-white" href="/dashboard">Map</a>
          </li>
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle text-white"
              href="#"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Settings
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
              <a className="dropdown-item" href="#">Account</a>
              <a className="dropdown-item" href="#">Another action</a>
              <div className="dropdown-divider"></div>
              <button className="dropdown-item" onClick={handleLogOut}>Sign Out</button>
            </div>
          </li>
        </ul>
      </div>
      {shouldRedirect && <Navigate to="/" />}
    </nav>
  );
};

export default Navbar;
