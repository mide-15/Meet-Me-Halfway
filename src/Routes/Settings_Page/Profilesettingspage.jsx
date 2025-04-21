import React, { useState, useEffect } from "react";
import { Input } from "../../Components/Input";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { app } from "../../firebase"; // or wherever your firebase app is initialized

const auth = getAuth(app);

const Settings = () => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    name: "",
    state: "",
    city: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = await auth.currentUser.getIdToken();
        const res = await fetch("/api/get-user-info", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.ok) {
          const data = await res.json();
          setFormValues((prev) => ({
            ...prev,
            ...data,
          }));
        } else {
          console.error("Failed to fetch user info.");
        }
      } catch (err) {
        console.error("Error fetching user info:", err);
      }
    };

    fetchUserInfo();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = await auth.currentUser.getIdToken();

      const formData = new FormData();
      formData.append("name", formValues.name);
      formData.append("state", formValues.state);
      formData.append("city", formValues.city);

      const res = await fetch("/api/update-profile", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const contentType = res.headers.get("content-type");

      if (!res.ok) {
        const errorText = await res.text();
        console.error("Server responded with error:", errorText);
        alert("Error updating profile: " + errorText);
        return;
      }

      if (contentType && contentType.includes("application/json")) {
        const result = await res.json();
        alert("Profile updated!");
        navigate("/dashboard"); // or wherever you'd like
      } else {
        const raw = await res.text();
        console.error("Unexpected non-JSON response:", raw);
        alert("Unexpected response. Check console for details.");
      }
    } catch (err) {
      console.error("Error updating profile:", err);
      alert("An error occurred while updating your profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 max-w-md mx-auto space-y-4">
      <h2 className="text-2xl font-bold">Settings</h2>

      <Input
        name="name"
        placeholder="Name"
        value={formValues.name}
        onChange={handleChange}
      />
      <Input
        name="state"
        placeholder="State"
        value={formValues.state}
        onChange={handleChange}
      />
      <Input
        name="city"
        placeholder="City"
        value={formValues.city}
        onChange={handleChange}
      />

      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        disabled={loading}
      >
        {loading ? "Saving..." : "Save Changes"}
      </button>
    </form>
  );
};

export default Settings;
