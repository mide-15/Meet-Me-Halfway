import React, { useState, useEffect, useRef } from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const NearbySearch = (b) => {
  const mapRef = useRef(null);

  const mapContainerStyle = {
    width: '100vw',
    height: '100vh',
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

  var lat_midway = (center.lat + 32.7851) / 2;
  var lng_midway = (center.lng + -96.9683) / 2;

  const handleLoad = (map) => {
    mapRef.current = map;

    const service = new window.google.maps.places.PlacesService(map);
    const request = {
        location: { lat: lat_midway, lng: lng_midway },
        radius: 5000, // Radius in meters
        // optional parameters  
    };

    service.nearbySearch(request, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK && results) {
        results.forEach((place) => {
          new window.google.maps.Marker({
            position: place.geometry.location,
            map: map,
          });
        });
      }
    });
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyA2oxgEXddn3TiBypWPBckx0m6iwn5UDyA" libraries={['places']}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={{ lat: lat_midway, lng: lng_midway }}
        zoom={14}
        onLoad={handleLoad}
      />
    </LoadScript>
  );
};

export default NearbySearch;