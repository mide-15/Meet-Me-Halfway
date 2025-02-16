import React, { useState, useEffect, useRef } from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";

const NearbySearch = ({ midpoint }) => {
  const mapRef = useRef(null);
  const [mapCenter, setMapCenter] = useState(midpoint);
  const [searchType, setSearchType] = useState("restaurant");

  const mapContainerStyle = {
    width: "100%",
    height: "500px",
  };

  useEffect(() => {
    if (midpoint) {
      setMapCenter(midpoint);
    }
  }, [midpoint]);

  const handleLoad = (map) => {
    mapRef.current = map;

    const service = new window.google.maps.places.PlacesService(map);
    const request = {
      location: midpoint,
      radius: 5000, 
      type: searchType, 
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
    <LoadScript googleMapsApiKey="AIzaSyA2oxgEXddn3TiBypWPBckx0m6iwn5UDyA" libraries={["places"]}>
      <div>
        <label>Search for: </label>
        <select value={searchType} onChange={(e) => setSearchType(e.target.value)}>
          <option value="restaurant">Restaurants</option>
          <option value="hotel">Hotels</option>
          <option value="gas_station">Gas Stations</option>
          <option value="cafe">Cafes</option>
          <option value="supermarket">Supermarkets</option>
        </select>
      </div>

      <GoogleMap mapContainerStyle={mapContainerStyle} center={mapCenter} zoom={14} onLoad={handleLoad} />
    </LoadScript>
  );
};

export default NearbySearch;
