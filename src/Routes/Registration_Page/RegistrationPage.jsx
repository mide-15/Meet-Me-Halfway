import React, { useState, useEffect } from "react";
import "./style.css";
import Navbar from "../../Components/Navbar";
import { Navigate, useNavigate } from "react-router-dom";
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-analytics.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";

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

const RegistrationPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dname, setDname] = useState("");
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? 2 : prevIndex - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 2 ? 0 : prevIndex + 1));
  };

  useEffect(() => {
    const interval = setInterval(goToNext, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = new FormData();
      data.append("dname", dname);
      data.append("email", email);
      data.append("password", password);

      const response = await fetch("/api/register", {
        method: "POST",
        body: data,
      });

      if (response.ok) {
        signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            const user = userCredential.user;
            localStorage.setItem("user", JSON.stringify(user));
            setShouldRedirect(true);
          })
          .catch((error) => {
            alert("Authentication failed: " + error.message);
          });
      } else {
        const error = await response.json();
        alert(error.message || "Registration failed.");
      }
    } catch (error) {
      alert("An error occurred: " + error.message);
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
                <div className="form-carousel-wrapper">
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
                              alt="Show"
                              src="https://c.animaapp.com/qsNvXK1b/img/icon---show.svg"
                            />
                          </div>

                          <div className="agreement">
                            <img
                              className="img"
                              alt="Checkbox"
                              src="https://c.animaapp.com/qsNvXK1b/img/icon---checkbox.svg"
                            />
                            <p className="by-clicking-sign-up">
                              By clicking Sign Up you're confirming that you agree
                              with our Terms and Conditions.
                            </p>
                          </div>
                        </div>

                        <div className="div-2">
                          <button className="div-wrapper" id="submit" type="submit">
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

                          <button
                            className="button-5"
                            type="button"
                            onClick={() => navigate("/login")}
                          >
                            Login
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>

                  <div className="carousel-container">
                    <h3 className="sub-heading">Explore Meet Points</h3>
                    <div className="carousel-slide">
                      {[
                        <iframe
                          key="map1"
                          title="Denton Location Map"
                          src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d24219.19191684946!2d-97.15876599366678!3d33.22383918705614!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sus!4v1743654362799!5m2!1sen!2sus"
                          width="100%"
                          height="400"
                          style={{ border: 0 }}
                          allowFullScreen=""
                          loading="lazy"
                        />, <iframe
                          key="map2"
                          title="Lewisville Location Map"
                          src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d58043.724101793836!2d-97.01643329269521!3d33.11192778873516!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sus!4v1743654429746!5m2!1sen!2sus"
                          width="100%"
                          height="400"
                          style={{ border: 0 }}
                          allowFullScreen=""
                          loading="lazy"
                        />, <iframe
                          key="map3"
                          title="Carrollton Location Map"
                          src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d72414.31892785156!2d-97.04238429254256!3d32.94005389064968!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sus!4v1743654468067!5m2!1sen!2sus"
                          width="100%"
                          height="400"
                          style={{ border: 0 }}
                          allowFullScreen=""
                          loading="lazy"
                        />
                      ][currentIndex]}
                    </div>

                    <div className="carousel-controls">
                      <img
                        className="img-2"
                        alt="Prev"
                        src="https://c.animaapp.com/qsNvXK1b/img/button.svg"
                        onClick={goToPrevious}
                      />
                      <div className="slider-dots">
                        {[0, 1, 2].map((idx) => (
                          <div
                            key={idx}
                            className={idx === currentIndex ? "dot" : "dot-2"}
                            onClick={() => setCurrentIndex(idx)}
                          />
                        ))}
                      </div>
                      <img
                        className="img-2"
                        alt="Next"
                        src="https://c.animaapp.com/qsNvXK1b/img/button-1.svg"
                        onClick={goToNext}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {shouldRedirect && <Navigate to="/dashboard" />}
      </div>
    </div>
  );
};

export default RegistrationPage;
