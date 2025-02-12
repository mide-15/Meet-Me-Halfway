import React, { useState, useEffect } from "react";
import { GoogleMap, useJsApiLoader, DirectionsRenderer } from "@react-google-maps/api";
import { Link } from "react-router-dom";
import './App.css';

const MapWithDirections = () => {
  const containerStyle = {
    width: "100%",
    height: "500px",
  };

  const defaultCenter = { lat: 40.7128, lng: -74.0060 }; // Default location (e.g., New York)
  const [center, setCenter] = useState(defaultCenter);
  const [directionsResponse, setDirectionsResponse] = useState(null);

  // Create panel dynamically
  useEffect(() => {
    const container = document.createElement("div");
    container.id = "container";
    container.style.display = "flex";
    container.style.height = "100vh";

    const panelDiv = document.createElement("div");
    panelDiv.id = "panel";
    panelDiv.style.flex = "30%";
    panelDiv.style.overflow = "auto";
    panelDiv.style.padding = "10px";
    panelDiv.style.background = "#f7f7f7";

    container.appendChild(panelDiv);
    document.body.appendChild(container);

    return () => {
      // Cleanup to remove the dynamically added panel on unmount
      document.body.removeChild(container);
    };
  }, []);

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

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyA2oxgEXddn3TiBypWPBckx0m6iwn5UDyA", // Replace with your API key
  });

  const fetchDirections = () => {
    if (window.google && window.google.maps) {
      const directionsService = new window.google.maps.DirectionsService();
      const directionsRenderer = new window.google.maps.DirectionsRenderer();

      directionsRenderer.setMap(null); // Ensure no duplicate renderers
      directionsRenderer.setPanel(document.getElementById("panel")); // Attach the panel

      directionsService.route(
        {
          origin: center, // User's current location
          destination: { lat: 32.7851, lng: -96.9683 }, // Midway point or custom location
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            setDirectionsResponse(result); // Update state with the directions
            directionsRenderer.setDirections(result); // Render the directions in the panel
          } else {
            console.error("Error fetching directions:", status);
          }
        }
      );
    } else {
      console.error("Google Maps not loaded.");
    }
  };

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <>
      <button onClick={fetchDirections} style={{ margin: "10px" }}>
        Get Directions
      </button>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={20}>
        {directionsResponse && <DirectionsRenderer directions={directionsResponse} />}
      </GoogleMap>
      <nav>
        <Link to="/NearbySearch">NearbySearch</Link>
      </nav>
    </>
  );
};

export default MapWithDirections;
