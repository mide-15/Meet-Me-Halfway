import React, { useEffect, useState } from "react";
import { Text } from "../../Components/Text";
import { Button } from "../../Components/Button";
import { useNavigate } from "react-router-dom";

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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white shadow-lg rounded-2xl p-8 mt-10">
        <Text size="textmd" className="text-center mb-6 font-bold text-gray-900">
          Profile
        </Text>
        {user ? (
          <div className="space-y-4 text-center">
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
              <Button onClick={handleEditClick}>Edit Profile</Button>
            </div>
          </div>
        ) : (
          <Text size="textxs" className="text-gray-500 text-center">
            No profile information available.
          </Text>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
