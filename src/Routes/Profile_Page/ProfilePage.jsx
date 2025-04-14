import React, { useEffect, useState } from "react";
import { Text } from "../../Components/Text";
import { Button } from "../../Components/Button";
import { auth, db } from "../../firebase"; 
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          const docRef = doc(db, "users", currentUser.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setUserData(docSnap.data());
          } else {
            console.warn("No profile data found for this user.");
            setUserData(null);
          }
        } catch (error) {
          console.error("Error fetching profile data:", error);
        }
      } else {
        setUserData(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleEditClick = () => {
    navigate("/settings");
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Text size="textxs">Loading user info...</Text>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Text size="textxs">No profile information available.</Text>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-20">
      <Text size="textmd" className="mb-10">
        Profile
      </Text>
      <div className="space-y-4 text-center">
        <Text size="textxs">Name: {userData.name || "N/A"}</Text>
        <Text size="textxs">Email: {userData.email || "N/A"}</Text>
        <Button onClick={handleEditClick}>Edit</Button>
      </div>
    </div>
  );
};

export default ProfilePage;
