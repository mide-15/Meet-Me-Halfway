import React, { useState } from "react";
import { GoogleMap, useJsApiLoader, DirectionsRenderer } from "@react-google-maps/api";
import NearbySearch from "./NearbySearch";

const containerStyle = {
  width: "100%",
  height: "500px",
};

const MapWithDirections = () => {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [midpoint, setMidpoint] = useState(null);
  const [directionsResponse, setDirectionsResponse] = useState(null);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyA2oxgEXddn3TiBypWPBckx0m6iwn5UDyA",
  });

  const geocodeAddress = async (address) => {
    const apiKey = "AIzaSyA2oxgEXddn3TiBypWPBckx0m6iwn5UDyA"; 
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.status === "OK") {
        return data.results[0].geometry.location; 
      } else {
        console.error("Geocoding failed:", data.status);
        return null;
      }
    } catch (error) {
      console.error("Error fetching geocode:", error);
      return null;
    }
  };

  const calculateMidpoint = (coords1, coords2) => ({
    lat: (coords1.lat + coords2.lat) / 2,
    lng: (coords1.lng + coords2.lng) / 2,
  });

  const fetchDirections = async () => {
    if (!origin || !destination) {
      alert("Please enter both addresses.");
      return;
    }

    const coords1 = await geocodeAddress(origin);
    const coords2 = await geocodeAddress(destination);

    if (!coords1 || !coords2) {
      alert("Invalid addresses. Try again.");
      return;
    }

    const newMidpoint = calculateMidpoint(coords1, coords2);
    setMidpoint(newMidpoint);

    const directionsService = new window.google.maps.DirectionsService();
    directionsService.route(
      {
        origin: coords1,
        destination: newMidpoint, 
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          setDirectionsResponse(result);
        } else {
          console.error("Error fetching directions:", status);
        }
      }
    );
  };

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div>
      <div style={{ marginBottom: "10px" }}>
        <input
          type="text"
          placeholder="Enter origin address"
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter destination address"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />
        <button onClick={fetchDirections}>Find Midpoint & Nearby Places</button>
      </div>

      <GoogleMap mapContainerStyle={containerStyle} center={midpoint || { lat: 40.7128, lng: -74.006 }} zoom={10}>
        {directionsResponse && <DirectionsRenderer directions={directionsResponse} />}
      </GoogleMap>

      {midpoint && <NearbySearch midpoint={midpoint} />}
    </div>
  );
};

export default MapWithDirections;
