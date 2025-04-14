import React, { useState } from 'react';
import "./style.css";
import Navbar from '../../Components/Navbar';
import { Navigate } from 'react-router-dom';

const HomePage = () => {
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const handleSubmit = (event) => {
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
          <div className="form">
            <input
              className="text-input"
              placeholder="Enter your email"
              type="email"
            />
            <button className="div-wrapper">
              <span className="button-3">Get Started</span>
            </button>
            {shouldRedirect && <Navigate to="/dashboard" />}
          </div>
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
              buttons: ["Sign In", "Register"],
              icon: "https://c.animaapp.com/BqPHfIZl/img/icon---right-arrow-alt.svg"
            },
            {
              title: "Join Our Community",
              description: "Connect with others and plan your meetups",
              buttons: ["Create Account", "Explore Events"],
              icon: "https://c.animaapp.com/BqPHfIZl/img/icon---right-arrow-alt-1.svg"
            },
            {
              title: "Discover New Places",
              description: "Explore different locations and create memories",
              buttons: ["Start Exploring", "Find Meetups"],
              icon: "https://c.animaapp.com/BqPHfIZl/img/icon---right-arrow-alt-2.svg"
            }
          ].map((section, i) => (
            <div className="column-4" key={i}>
              <div className="div-2">
                <div className="heading">{section.title}</div>
                <p className="text-2">{section.description}</p>
              </div>
              <div className="actions-3">
                <button className="button-4">
                  <span className="button-5">{section.buttons[0]}</span>
                </button>
                <button className="button-6">
                  <span className="button-7">{section.buttons[1]}</span>
                  <img className="img" src={section.icon} alt="" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <footer className="footer-breakpoint">
        <div className="content-4">
          <div className="column-5">
    
            <div className="content-5">
            <img
                    className="img-2"
                    alt="Social links"
                    src="https://c.animaapp.com/qsNvXK1b/img/social-links.svg"
                  />
            </div>
          </div>

         { /*<div className="column-6">
            <div className="link-list">
              <div className="text-wrapper-6">Google Calendar</div>
              <div className="text-wrapper-7">Login</div>
              <div className="text-wrapper-7">Registration</div>
              <div className="text-wrapper-7">Menu</div>
              <div className="text-wrapper-7">Polls</div>
            </div>

            <div className="link-list">
              <div className="text-wrapper-6">Map</div>
              <div className="text-wrapper-7">Location Services</div>
              <div className="text-wrapper-7">Location Filter</div>
              <div className="text-wrapper-7">Footer Section</div>
              <div className="text-wrapper-7">Divider</div>
            </div>
          </div>*/}
        </div>

        <div className="credits">
          <div className="divider" />
          <div className="row">
            <p className="text-wrapper-8">© 2024 Company. All rights reserved.</p>
            <div className="footer-links">
              <div className="text-wrapper-9">Terms of Service</div>
              <div className="text-wrapper-9">Cookies Settings</div>
              <div className="text-wrapper-9">© 2024 Company. All rights reserved.</div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
