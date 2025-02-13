import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useNavigate } from 'react-router-dom';

const Map = () => {
  const containerStyle = {
    width: "100%",
    height: "400px", // Adjust height as needed
  }; //View of the map 

  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate('/directions'); // Redirect to About page
  };

  const defaultCenter = { lat: 40.7128, lng: -74.0060 }; // Default location (e.g., New York)

  const [center, setCenter] = useState(defaultCenter);

  // Get user's location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCenter({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.error("Geolocation not supported by this browser.");
    }
  }, []);

  return (
    <LoadScript googleMapsApiKey="AIzaSyA2oxgEXddn3TiBypWPBckx0m6iwn5UDyA">
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={20}>
        <Marker position={center} />
      </GoogleMap>
      <button onclick={handleRedirect}>Get Directions</button>
    </LoadScript>
  );
};

export default Map;
