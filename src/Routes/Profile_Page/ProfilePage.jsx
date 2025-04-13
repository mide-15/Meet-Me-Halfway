import React, { useEffect, useState } from "react";
import { Text } from "../../Components/Text";
import { Button } from "../../Components/Button";
import { auth } from "../../firebase"; 
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleEditClick = () => {
    navigate("/settings"); // navigate to settings page
  };

  return (
    <div className="flex flex-col items-center justify-center py-20">
      <Text size="textmd" className="mb-10">
        Profile
      </Text>
      {user ? (
        <div className="space-y-4 text-center">
          <Text size="textxs">Name: {user.displayName || "N/A"}</Text>
          <Text size="textxs">Email: {user.email}</Text>
          {/* Add more user info if needed */}
          <Button onClick={handleEditClick}>Edit</Button>
        </div>
      ) : (
        <Text size="textxs">Loading user info...</Text>
      )}
    </div>
  );
};

export default ProfilePage;
