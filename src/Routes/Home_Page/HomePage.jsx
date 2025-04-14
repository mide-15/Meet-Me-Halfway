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
                src={`${process.env.PUBLIC_URL}/hmlogovid2.mov`}
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

              <div className="actions-2">
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
                <p className="p">Already have an account? <a href="/login"> Log in </a></p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="features">
        <div className="content-3">
          {[
            {
              title: "Meet Me Halfway",
              description: "Find the perfect meeting point",
            },
            {
              title: "Join Our Community",
              description: "Connect with others and plan your meetups",
            },
            {
              title: "Discover New Places",
              description: "Explore different locations and create memories",
            }
          ].map((section, i) => (
            <div className="column-4" key={i}>
              <div className="div-2">
                <div className="heading">{section.title}</div>
                <p className="text-2">{section.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <footer className="footer-breakpoint">
        <div className="credits">
          <div className="divider" />
          <div className="row">
            <p className="text-wrapper-8">© 2024 Meet Me Halfway. All rights reserved.</p>
            <div className="footer-links">
              <div className="text-wrapper-9">Terms of Service</div>
              <div className="text-wrapper-9">Cookies Settings</div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
