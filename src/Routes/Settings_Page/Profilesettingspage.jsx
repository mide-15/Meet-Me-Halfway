import React, { useState, useEffect } from "react";
import { Input } from "../../Components/Input";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { app } from "../../firebase";
import Navbar from "../../Components/Navbar";

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
        navigate("/dashboard");
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
                  <div className="div-2">
                    <div className="heading">Update Your Settings</div>
                    <p className="sub-heading">Keep your profile up to date</p>
                  </div>

                  <form
                    onSubmit={handleSubmit}
                    className="frame-4 bg-white shadow-xl rounded-2xl p-8 border border-gray-200 max-w-md mx-auto animate-fade-in"
                  >
                    <div className="space-y-4">
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
                        className="div-wrapper bg-[#031749] text-white text-sm font-medium rounded-full py-2 px-6 hover:bg-[#041d60] transition-colors shadow-md w-full"
                        disabled={loading}
                      >
                        {loading ? "Saving..." : "Save Changes"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
