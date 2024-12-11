import React, { useState, useEffect } from "react";
import { GoogleMap, useJsApiLoader, DirectionsRenderer } from "@react-google-maps/api";
import NearbySearch from "./NearbySearch";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

const google = window.google;
const MapWithDirections = () => {
  const containerStyle = {
    width: "100%",
    height: "500px",
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

  const [directionsResponse, setDirectionsResponse] = useState(null);

  var lat_midway = (center.lat + 32.7851) / 2;
  var lng_midway = (center.lng + -96.9683) / 2;
  const t = { lat: lat_midway, lng: lng_midway };

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyA2oxgEXddn3TiBypWPBckx0m6iwn5UDyA", // Replace with your API key
  });

  const fetchDirections = () => {
    if (window.google && window.google.maps) {
      const directionsService = new window.google.maps.DirectionsService();

      directionsService.route(
        {
          origin: center, // Times Square
          destination: { lat: lat_midway, lng: lng_midway }, // Central Park
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            console.log("Directions response:", result);
            setDirectionsResponse(result); // Update state with the directions
            window.alert("The total distance is " + result.routes[0].legs[0].distance.text);
            window.alert("The travel time is " + result.routes[0].legs[0].duration.text);
          } else {
            console.error("Error fetching directions:", status); // Log the error
          }
        }
      );
    } else {
      console.error("Google Maps not loaded.");
    }
  };
  
  const nearbySearch = () => {
    const service = new window.google.maps.places.PlacesService(/*map*/);
    const request = {
        location: middle,
        radius: 5000, // Radius in meters
        // optional parameters  
    };

    service.nearbySearch(request, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK && results) {
        results.forEach((place) => {
          new window.google.maps.Marker({
            position: place.geometry.location,
            //map: map,
          });
        });
      }
    });
  };
  //const [middle, setmiddle] = useState({ lat: lat_midway, lng: lng_midway });
  let middle = { lat: lat_midway, lng: lng_midway };

  // Render a loading or error state
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
        <Link to={{ pathname: "/NearbySearch", state: t}}>NearbySearch</Link>
      </nav>
    </>
  );
};

export default MapWithDirections;
