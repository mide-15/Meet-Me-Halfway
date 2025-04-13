import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { Text } from "../../components";
import { Input } from "../../components/Input";
import { Button } from "@/components/ui/button";
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import {
  getAuth,
  updatePassword,
  updateEmail,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDs9dukouikGyLKxjQgTnM1s2bMQ5h_ezs",
  authDomain: "meet-me-halfway-5475f.firebaseapp.com",
  databaseURL: "https://meet-me-halfway-5475f-default-rtdb.firebaseio.com",
  projectId: "meet-me-halfway-5475f",
  storageBucket: "meet-me-halfway-5475f.appspot.com",
  messagingSenderId: "140642671795",
  appId: "1:140642671795:web:49943cd681cdde8e4364c6",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default function ProfilesettingPage() {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setEmail(currentUser.email || "");
        setName(currentUser.displayName || "");

        const response = await fetch("/api/get-user-info");
        const data = await response.json();
        setState(data.state || "");
        setCity(data.city || "");
      }
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword && newPassword !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      const data = new FormData();
      data.append("name", name);
      data.append("email", email);
      data.append("state", state);
      data.append("city", city);

      const response = await fetch("/api/update-profile", {
        method: "POST",
        body: data,
      });

      if (!response.ok) {
        const err = await response.json();
        alert(err.message);
        return;
      }

      if (user) {
        if (email !== user.email) await updateEmail(user, email);
        if (newPassword) await updatePassword(user, newPassword);
      }

      alert("Profile updated!");
      setRedirect(true);
    } catch (err) {
      alert("Error updating profile: " + err.message);
    }
  };

  if (redirect) return <Navigate to="/profile" />;

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-4xl mx-auto mt-16 bg-white p-10 rounded-xl shadow-md space-y-6"
    >
      <h2 className="text-2xl font-semibold mb-4">Edit Profile</h2>

      <div>
        <Text>Name</Text>
        <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
      </div>

      <div>
        <Text>Email</Text>
        <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      </div>

      <div>
        <Text>New Password</Text>
        <Input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="New Password" />
      </div>

      <div>
        <Text>Confirm Password</Text>
        <Input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm Password" />
      </div>

      <div>
        <Text>State</Text>
        <Input value={state} onChange={(e) => setState(e.target.value)} placeholder="State" />
      </div>

      <div>
        <Text>City</Text>
        <Input value={city} onChange={(e) => setCity(e.target.value)} placeholder="City" />
      </div>

      <Button type="submit" className="w-full bg-blue-600 text-white mt-6 py-3 rounded-md">
        Save Changes
      </Button>
    </form>
  );
}
