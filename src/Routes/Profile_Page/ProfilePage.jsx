import React, { useEffect, useState } from "react";
import { Text } from "../../Components/Text";
import { Button } from "../../Components/Button";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Components/Navbar";
import "./style.css";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error("Error parsing stored user:", error);
      }
    }
  }, []);

  const handleEditClick = () => {
    navigate("/settings");
  };

  return (
    <div
      className="registration-page"
      style={{
        backgroundImage:
          "url('https://maps.googleapis.com/maps/api/staticmap?center=Denton,TX&zoom=14&size=1280x720&key=AIzaSyDMjLMR0jmAj2EkAaUE6ZDXWFKKephbUoo')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="div">
        <Navbar />
        <div className="overlap-group">
          <div className="frame">
            <div className="signup-property-wrapper">
              <div className="signup-property">
                <div className="frame-2">
                  <div className="div-2 items-center">
                    <div className="heading">Profile Overview</div>
                    <p className="sub-heading">Manage your profile information</p>
                  </div>
                  <div className="frame-3">
                    <div className="frame-4 bg-white shadow-2xl p-8 rounded-2xl border border-gray-200 transform transition-transform hover:scale-[1.01] backdrop-blur-lg backdrop-filter bg-opacity-90 animate-fade-in">
                      <div className="flex justify-center mb-6">
                        <img
                          src="https://avatars.githubusercontent.com/u/1?v=4"
                          alt="User avatar"
                          className="w-24 h-24 rounded-full shadow-md border-4 border-white object-cover"
                        />
                      </div>
                      {user ? (
                        <div className="space-y-4 text-left">
                          <div>
                            <Text size="textxs" className="font-semibold text-gray-700">
                              Name:
                            </Text>
                            <p className="text-gray-600">{user.displayName || "N/A"}</p>
                          </div>
                          <div>
                            <Text size="textxs" className="font-semibold text-gray-700">
                              Email:
                            </Text>
                            <p className="text-gray-600">{user.email}</p>
                          </div>
                          <div className="pt-4">
                            <button
                              className="div-wrapper bg-[#031749] text-white text-sm font-medium rounded-full py-2 px-6 hover:bg-[#041d60] transition-colors shadow-md"
                              onClick={handleEditClick}
                            >
                              Edit Profile
                            </button>
                          </div>
                        </div>
                      ) : (
                        <Text size="textxs" className="text-gray-500 text-center">
                          No profile information available.
                        </Text>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
