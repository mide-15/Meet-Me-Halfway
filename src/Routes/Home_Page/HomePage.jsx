import React, { useState } from 'react';
import "./style.css";
import Navbar from '../../Components/Navbar';
import { Navigate } from 'react-router-dom';

const HomePage = () => {
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    localStorage.setItem("email", email);
    setShouldRedirect(true);
  };

  return (
    <div className="home-page">
      <Navbar />

      <div className="header-breakpoint">
        <div className="container-2">
          <div className="column-3">
            <div className="hero-box">
              <video
                src={`${process.env.PUBLIC_URL}/hmlogovid2.mp4`}
                autoPlay
                loop
                muted
                playsInline
                className="placeholder-lightbox"
              >
                Your browser does not support the video tag.
              </video>

              <div className="content-2">
                <div className="medium-length-hero">Meet Me Halfway</div>
                <p className="text">Sign up today and start finding the perfect meeting spot</p>
              </div>

              <form onSubmit={handleSubmit}>
                  <div className="form">
                    <input
                      className="text-input"
                      placeholder="Enter your email"
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <button className="div-wrapper">
                      <span className="button-3">Get Started</span>
                    </button>
                    {shouldRedirect && <Navigate to="/registration" />}
                  </div>
                </form>
                <p className="p">Already have an account? <a href="/login">Log in</a></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
