import React, { useState, useEffect, useRef } from "react";
import { GoogleMap, useJsApiLoader, DirectionsRenderer, Marker } from "@react-google-maps/api";
//import { Link } from "react-router-dom";

const containerStyle = {
  width: "100%",
  height: "500px",
};

const defaultCenter = { lat: 40.7128, lng: -74.0060 }; // Default to NYC

const MergedMap = () => {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [originCoords, setOriginCoords] = useState(null);
  const [destinationCoords, setDestinationCoords] = useState(null);
  const [midpoint, setMidpoint] = useState(null);
  const [center, setCenter] = useState(defaultCenter);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [places, setPlaces] = useState([]);
  const mapRef = useRef(null);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyA2oxgEXddn3TiBypWPBckx0m6iwn5UDyA",
    libraries: ["places"],
  });

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
    }
  }, []);

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

  const calculateMidpoint = (coord1, coord2) => ({
    lat: (coord1.lat + coord2.lat) / 2,
    lng: (coord1.lng + coord2.lng) / 2,
  });

  const fetchDirections = async () => {
    setDirectionsResponse(null); // Clear previous directions to force recalculation
    if (!window.google || !window.google.maps) {
      console.error("Google Maps not loaded.");
      return;
    }

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

    setOriginCoords(coords1);
    setDirectionsResponse(null);
    setOriginCoords(null);
    setDestinationCoords(null);
    setMidpoint(null);
    setDestinationCoords(coords2);
    setDirectionsResponse(null);
    setOriginCoords(null);
    setDestinationCoords(null);
    setMidpoint(null);
    const midpointCalculated = calculateMidpoint(coords1, coords2);
    setMidpoint(midpointCalculated);
    setCenter(midpointCalculated);

    const directionsService = new window.google.maps.DirectionsService();
    directionsService.route(
      {
        origin: coords1,
        destination: coords2,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          setDirectionsResponse(result);
          fetchNearbyPlaces(midpointCalculated);
        } else {
          console.error("Error fetching directions:", status);
        }
      }
    );
  };

  const fetchNearbyPlaces = (midpoint) => {
    if (!midpoint || !window.google || !window.google.maps) {
      console.error("Midpoint or Google Maps API not loaded.");
      return;
    }

    if (!mapRef.current) {
      console.error("Map reference is not set.");
      return;
    }

    const service = new window.google.maps.places.PlacesService(mapRef.current);
    const request = {
      location: midpoint,
      radius: 5000,
    
    };

    service.nearbySearch(request, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK && results) {
        setPlaces(results);
      } else {
        console.error("Nearby search failed:", status);
      }
    });
  };

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <>
      <div style={{ marginBottom: "10px" }}>
        <input type="text" placeholder="Enter origin address" value={origin} onChange={(e) => setOrigin(e.target.value)} />
        <input type="text" placeholder="Enter destination address" value={destination} onChange={(e) => setDestination(e.target.value)} />
        <button onClick={fetchDirections}>Get Directions</button>
      </div>

      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10} onLoad={(map) => (mapRef.current = map)}>
        {directionsResponse && <DirectionsRenderer directions={directionsResponse} />}
        {originCoords && <Marker position={originCoords} label="A" />}
        {destinationCoords && <Marker position={destinationCoords} label="B" />}
        {midpoint && <Marker position={midpoint} label="C" />}
        {places.map((place, index) => (
          <Marker key={index} position={place.geometry.location} />
        ))}
      </GoogleMap>

    </>
  );
};

export default MergedMap;
