import React, { useState } from "react";
import "./style.css";
import Navbar from "../../Components/Navbar";
import { Navigate } from "react-router-dom";

const RegistrationPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dname, setDname] = useState("");
  const [shouldRedirect, setShouldRedirect] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Construct form data
      const data = new FormData();
      data.append("dname", dname);
      data.append("email", email);
      data.append("password", password);

      const response = await fetch('/api/register', {method: 'POST', body: data})

      if (response.ok) {
        setShouldRedirect(true)
      }

      else {
        //const info = await response.json();
        alert(response.message);
        //alert(JSON.stringify(info));
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="registration-page">
      <div className="div">
        <Navbar />
        <div className="overlap-group">
          <div className="frame">
            <div className="signup-property-wrapper">
              <div className="signup-property">
                <div className="container-2">
                  <div className="frame-2">
                    <div className="div-2">
                      <img
                        src="/hmlogo.jpeg"
                        alt="Meet Me Halfway Logo"
                        id="login_logo"
                      />
                      <div className="heading">Meet Me Halfway</div>
                      <p className="sub-heading">
                        Find the perfect meeting point
                      </p>
                    </div>

                    <form onSubmit={handleSubmit}>
                      <div className="frame-3">
                        <div className="frame-4">
                          <input
                            className="text-input"
                            placeholder="Enter your name"
                            type="text"
                            id="dname"
                            value={dname}
                            onChange={(e) => setDname(e.target.value)}
                          />

                          <input
                            className="input"
                            placeholder="Enter your email"
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />

                          <div className="text-input-2">
                            <div className="text-wrapper-2">
                              <input
                                className="input"
                                placeholder="Enter your password"
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                              />
                            </div>
                            <img
                              className="img"
                              alt="Icon show"
                              src="https://c.animaapp.com/qsNvXK1b/img/icon---show.svg"
                            />
                          </div>

                          <div className="agreement">
                            <img
                              className="img"
                              alt="Icon checkbox"
                              src="https://c.animaapp.com/qsNvXK1b/img/icon---checkbox.svg"
                            />
                            <p className="by-clicking-sign-up">
                              By clicking Sign Up you're confirming that you agree
                              with our Terms and Conditions.
                            </p>
                          </div>
                        </div>

                        <div className="div-2">
                          {/* Single Sign Up button */}
                          <button
                            className="div-wrapper"
                            id="submit"
                            type="submit"
                          >
                            Sign Up
                          </button>

                          <div className="frame-5">
                            <img
                              className="line"
                              alt="Line"
                              src="https://c.animaapp.com/qsNvXK1b/img/line-2.svg"
                            />
                            <div className="text-wrapper-3">or</div>
                            <img
                              className="line"
                              alt="Line"
                              src="https://c.animaapp.com/qsNvXK1b/img/line-2.svg"
                            />
                          </div>

                          <button className="button-5" type="button">
                            Login
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>

                  <div className="group-wrapper">
                    <div className="group">
                      <div className="frame-6">
                        <img
                          className="two-word-query-for"
                          alt="Two word query for"
                          src="https://c.animaapp.com/qsNvXK1b/img/two-word-query-for-image-based-on-the-main-keywords-in-the-promp.png"
                        />
                        <div className="frame-7">
                          <img
                            className="img-2"
                            alt="Button"
                            src="https://c.animaapp.com/qsNvXK1b/img/button.svg"
                          />
                          <div className="slider-dots">
                            <div className="dot" />
                            <div className="dot-2" />
                          </div>
                          <img
                            className="img-2"
                            alt="Button"
                            src="https://c.animaapp.com/qsNvXK1b/img/button-1.svg"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer section with extra bottom buttons removed */}
          <div className="footer-breakpoint">
            <div className="content-2">
              <div className="column-3"></div>
              <img
                className="img-2"
                alt="Social links"
                src="https://c.animaapp.com/qsNvXK1b/img/social-links.svg"
              />
            </div>

            <div className="container-4">
              <div className="row-wrapper">
                <div className="row">
                  <div className="heading-2">Meet Me Halfway</div>
                  <p className="text">
                    Find the perfect meeting spot with Meet Me Halfway
                  </p>
                </div>
              </div>
              {/* Removed extra action buttons */}
            </div>

            <div className="column-4">
              <div className="link-list">
                <div className="text-wrapper-7">Home</div>
                <div className="text-wrapper-8">Google Calendar</div>
                <div className="text-wrapper-8">Login</div>
                <div className="text-wrapper-8">Registration</div>
                <div className="text-wrapper-8">Menu</div>
              </div>

              <div className="link-list">
                <div className="text-wrapper-7">Polls</div>
                <div className="text-wrapper-8">Map</div>
                <div className="text-wrapper-8">Location Services</div>
                <div className="text-wrapper-8">Location Filter</div>
                <div className="text-wrapper-8">Footer</div>
              </div>
            </div>
          </div>

          <div className="credits">
            <div className="divider" />
            <div className="row-2">
              <p className="element-company-all">
                © 2023 Meet Me Halfway. All rights reserved.
              </p>
              <div className="footer-links">
                <div className="text-wrapper-9">Privacy Policy</div>
                <div className="text-wrapper-9">Terms of Service</div>
                <div className="text-wrapper-9">Cookies Settings</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {shouldRedirect && <Navigate to="/dashboard" />}
    </div>
  );
};

export default RegistrationPage;
