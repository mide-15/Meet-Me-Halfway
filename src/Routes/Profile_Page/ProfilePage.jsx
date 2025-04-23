import React, { useEffect, useState } from "react";
import { Text } from "../../Components/Text";
import { Button } from "../../Components/Button";
import { useNavigate } from "react-router-dom";

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

    // Load user on initial render
    loadUserFromStorage();

    // Also listen for localStorage changes from other tabs
    window.addEventListener("storage", loadUserFromStorage);

    // Clean up
    return () => {
      window.removeEventListener("storage", loadUserFromStorage);
    };
  }, []);

  const handleEditClick = () => {
    navigate("/settings");
  };

  return (
    <div className="flex flex-col items-center justify-center py-20">
      <Text size="textmd" className="mb-10">
        Profile
      </Text>
      {user ? (
        <div className="space-y-4 text-center">
          <Text size="textxs">Name: {user.displayName || "N/A"}</Text>
          <Text size="textxs">Email: {user.email || "N/A"}</Text>
          <Text size="textxs">City: {user.city || "N/A"}</Text>
          <Text size="textxs">State: {user.state || "N/A"}</Text>
          <Button onClick={handleEditClick}>Edit</Button>
        </div>
      ) : (
        <Text size="textxs">No profile information available.</Text>
      )}
    </div>
  );
};

export default ProfilePage;

