import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Components/Navbar";
import "./style.css"; // Make sure this path is correct

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadUserFromStorage = () => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
        } catch (error) {
          console.error("Error parsing stored user:", error);
        }
      }
    };

    loadUserFromStorage();

    // Listen for localStorage changes (works across tabs)
    window.addEventListener("storage", loadUserFromStorage);

    return () => {
      window.removeEventListener("storage", loadUserFromStorage);
    };
  }, []);

  return (
    <div className="profile-background">
      <div className="profile-container">
        <Navbar />
        <div className="profile-content">
          <h1 className="profile-heading">Profile Overview</h1>
          <p className="profile-subheading">Manage your profile information</p>
          <div className="profile-card">
            <div className="avatar-wrapper">
              <img
                src="https://avatars.githubusercontent.com/u/1?v=4"
                alt="User avatar"
                className="avatar"
              />
            </div>
            {user ? (
              <div className="profile-info">
                <div>
                  <label className="label">Name:</label>
                  <p>{user.displayName || user.name || "N/A"}</p>
                </div>
                <div>
                  <label className="label">Email:</label>
                  <p>{user.email}</p>
                </div>
                <button className="edit-button" onClick={() => navigate("/settings")}>
                  Edit Profile
                </button>
              </div>
            ) : (
              <p className="no-info">No profile information available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
