import React from "react";
import "./style.css";
import Navbar from '../../Components/Navbar'

const HomePage = () => {
  return (
    <div className="home-page">
      <div className="div">
        <Navbar />
        <div className="overlap-group">
          <div className="header-breakpoint">
            <div className="container-2">
              <div className="column-3">
                <div className="content-2">
                  <div className="medium-length-hero">Meet Me Halfway</div>

                  <p className="text">
                    Sign up today and start finding the perfect meeting spot
                  </p>
                </div>

                <div className="actions-2">
                  <div className="form">
                    <input
                      className="text-input"
                      placeholder="Enter your email"
                      type="email"
                    />

                    <button className="div-wrapper">
                      <button className="button-3">Get Started</button>
                    </button>
                  </div>

                  <p className="p">Already have an account? Log in</p>
                </div>
              </div>

              <img
                className="placeholder-lightbox"
                alt="Placeholder lightbox"
                src="https://c.animaapp.com/BqPHfIZl/img/placeholder-lightbox.svg"
              />
            </div>

            <div className="breakpoint" />
          </div>

          <div className="features">
            <div className="content-3">
              <div className="column-4">
                <div className="div-2">
                  <img
                    className="icon-uxmagic"
                    alt="Icon uxmagic"
                    src="https://c.animaapp.com/BqPHfIZl/img/icon---uxmagic.svg"
                  />

                  <div className="div-2">
                    <div className="heading">Meet Me Halfway</div>

                    <p className="text-2">Find the perfect meeting point</p>
                  </div>
                </div>

                <div className="actions-3">
                  <button className="button-4">
                    <button className="button-5">Sign In</button>
                  </button>

                  <button className="button-6">
                    <button className="button-7">Register</button>

                    <img
                      className="img"
                      alt="Icon right arrow alt"
                      src="https://c.animaapp.com/BqPHfIZl/img/icon---right-arrow-alt.svg"
                    />
                  </button>
                </div>
              </div>

              <div className="column-4">
                <div className="div-2">
                  <img
                    className="icon-uxmagic"
                    alt="Icon uxmagic"
                    src="https://c.animaapp.com/BqPHfIZl/img/icon---uxmagic-1.svg"
                  />

                  <div className="div-2">
                    <div className="heading">Join Our Community</div>

                    <p className="text-2">
                      Connect with others and plan your meetups
                    </p>
                  </div>
                </div>

                <div className="actions-3">
                  <button className="button-4">
                    <button className="button-5">Create Account</button>
                  </button>

                  <button className="button-6">
                    <button className="button-7">Explore Events</button>

                    <img
                      className="img"
                      alt="Icon right arrow alt"
                      src="https://c.animaapp.com/BqPHfIZl/img/icon---right-arrow-alt-1.svg"
                    />
                  </button>
                </div>
              </div>

              <div className="column-4">
                <div className="div-2">
                  <img
                    className="icon-uxmagic"
                    alt="Icon uxmagic"
                    src="https://c.animaapp.com/BqPHfIZl/img/icon---uxmagic-2.svg"
                  />

                  <div className="div-2">
                    <div className="heading">Discover New Places</div>

                    <p className="text-2">
                      Explore different locations and create memories
                    </p>
                  </div>
                </div>

                <div className="actions-3">
                  <button className="button-4">
                    <button className="button-5">Start Exploring</button>
                  </button>

                  <button className="button-6">
                    <button className="button-7">Find Meetups</button>

                    <img
                      className="img"
                      alt="Icon right arrow alt"
                      src="https://c.animaapp.com/BqPHfIZl/img/icon---right-arrow-alt-2.svg"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-breakpoint">
          <div className="content-4">
            <div className="column-5">
              <img className="logo-2" alt="Logo" src="/img/logo.svg" />

              <div className="content-5">
                <div className="content-6">
                  <p className="text-wrapper-2">
                    Level 1, 12 Sample St, Sydney NSW 2000
                  </p>

                  <p className="text-wrapper-3">
                    Level 1, 12 Sample St, Sydney NSW 2000
                  </p>
                </div>

                <div className="content-6">
                  <div className="text-wrapper-2">1672 345 0987</div>

                  <div className="container-3">
                    <div className="text-wrapper-4">1672 345 0987</div>

                    <div className="text-wrapper-5">info@company.io</div>
                  </div>
                </div>

                <img
                  className="social-links"
                  alt="Social links"
                  src="/img/social-links.svg"
                />
              </div>
            </div>

            <div className="column-6">
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
            </div>
          </div>

          <div className="credits">
            <div className="divider" />

            <div className="row">
              <p className="text-wrapper-8">
                © 2023 Company. All rights reserved.
              </p>

              <div className="footer-links">
                <div className="text-wrapper-9">Terms of Service</div>

                <div className="text-wrapper-9">Cookies Settings</div>

                <p className="text-wrapper-9">
                  © 2023 Company. All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage