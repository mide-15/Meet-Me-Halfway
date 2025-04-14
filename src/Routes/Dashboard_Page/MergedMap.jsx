import React, { useState, useEffect, useRef, useCallback } from "react";
import Navbar from '../../Components/Navbar';
import {
  GoogleMap,
  useJsApiLoader,
  DirectionsRenderer,
  Marker,
  Autocomplete,
} from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "80vh"
};

const inputStyle = {
  backgroundColor: "#ffffff",
  border: "1px solid #031749",
  borderRadius: "8px",
  color: "#082367",
  fontSize: "16px",
  padding: "12px",
  width: "100%",
  maxWidth: "300px",
  margin: "5px"
};

const defaultCenter = { lat: 40.7128, lng: -74.0060 };

const MergedMap = () => {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [originCoords, setOriginCoords] = useState(null);
  const [destinationCoords, setDestinationCoords] = useState(null);
  const [midpoint, setMidpoint] = useState(null);
  const [center, setCenter] = useState(defaultCenter);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [places, setPlaces] = useState([]);
  const [travelMode, setTravelMode] = useState("DRIVING");
  const [directionsSteps1, setDirectionsSteps1] = useState([]);
  const [directionsSteps2, setDirectionsSteps2] = useState([]);

  const [originAutocomplete, setOriginAutocomplete] = useState(null);
  const [destinationAutocomplete, setDestinationAutocomplete] = useState(null);

  const [radius, setRadius] = useState(5000);
  const [placeFilter, setPlaceFilter] = useState("all");

  const mapRef = useRef(null);
  const directionsRenderersRef = useRef([]);

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
        (error) => console.error("Error getting location:", error)
      );
    }
  }, []);

  const geocodeAddress = async (address) => {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=AIzaSyA2oxgEXddn3TiBypWPBckx0m6iwn5UDyA`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data.status === "OK" ? data.results[0].geometry.location : null;
    } catch (error) {
      console.error("Error fetching geocode:", error);
      return null;
    }
  };

  const calculateMidpoint = (coord1, coord2) => ({
    lat: (coord1.lat + coord2.lat) / 2,
    lng: (coord1.lng + coord2.lng) / 2,
  });

  const clearDirectionsOverlays = () => {
    directionsRenderersRef.current.forEach((dr) => dr.setMap(null));
    directionsRenderersRef.current = [];
    setDirectionsResponse(null);
  };

  const fetchDirections = async () => {
    clearDirectionsOverlays();
    setOriginCoords(null);
    setDestinationCoords(null);
    setMidpoint(null);
    setPlaces([]);

    if (!origin || !destination) return alert("Please enter both addresses.");

    const coords1 = await geocodeAddress(origin);
    const coords2 = await geocodeAddress(destination);
    if (!coords1 || !coords2) return alert("Invalid addresses.");

    setOriginCoords(coords1);
    setDestinationCoords(coords2);
    const midpointCalculated = calculateMidpoint(coords1, coords2);
    setMidpoint(midpointCalculated);
    setCenter(midpointCalculated);

    const service = new window.google.maps.DirectionsService();
    service.route({ origin: coords1, destination: coords2, travelMode: window.google.maps.TravelMode[travelMode], provideRouteAlternatives: true },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          fetchNearbyPlaces(midpointCalculated);
        } else {
          console.error("Error fetching directions:", status);
        }
      });
  };

  const fetchNearbyPlaces = useCallback((midpoint) => {
    if (!midpoint || !mapRef.current) return;
    const service = new window.google.maps.places.PlacesService(mapRef.current);
    const request = { location: midpoint, radius, ...(placeFilter !== "all" && { type: placeFilter }) };
    service.nearbySearch(request, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK && results) {
        setPlaces(results);
      } else {
        console.error("Nearby search failed:", status);
      }
    });
  }, [radius, placeFilter]);

  useEffect(() => {
    if (midpoint) fetchNearbyPlaces(midpoint);
  }, [radius, placeFilter, midpoint, fetchNearbyPlaces]);

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading...</div>;

  const customIcon = {
    url: "https://cdn1.iconfinder.com/data/icons/color-bold-style/21/14_1-512.png",
    scaledSize: new window.google.maps.Size(40, 40),
  };
  const nearbyPlaceIcon = {
    url: "https://maps.google.com/mapfiles/ms/icons/yellow-dot.png",
    scaledSize: new window.google.maps.Size(30, 30),
  };

  return (
    <>
      <Navbar />

      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "10px", padding: "10px" }}>
        <Autocomplete onLoad={setOriginAutocomplete} onPlaceChanged={() => {
          if (originAutocomplete) setOrigin(originAutocomplete.getPlace()?.formatted_address || "");
        }}>
          <input style={inputStyle} type="text" placeholder="Enter first address" value={origin} onChange={(e) => setOrigin(e.target.value)} />
        </Autocomplete>

        <Autocomplete onLoad={setDestinationAutocomplete} onPlaceChanged={() => {
          if (destinationAutocomplete) setDestination(destinationAutocomplete.getPlace()?.formatted_address || "");
        }}>
          <input style={inputStyle} type="text" placeholder="Enter second address" value={destination} onChange={(e) => setDestination(e.target.value)} />
        </Autocomplete>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", alignItems: "center", gap: "10px", padding: "10px" }}>
        <select value={travelMode} onChange={(e) => setTravelMode(e.target.value)}>
          <option value="DRIVING">Driving</option>
          <option value="WALKING">Walking</option>
          <option value="BICYCLING">Bicycling</option>
          <option value="TRANSIT">Transit</option>
        </select>
        <button onClick={fetchDirections}>Get Directions</button>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", alignItems: "center", gap: "10px", padding: "10px" }}>
        <label>
          Radius: {radius}m
          <input type="range" min="1000" max="10000" step="500" value={radius} onChange={(e) => setRadius(+e.target.value)} />
        </label>
        <label>
          Filter:
          <select value={placeFilter} onChange={(e) => setPlaceFilter(e.target.value)}>
            <option value="all">All</option>
            <option value="restaurant">Restaurant</option>
            <option value="cafe">Cafe</option>
            <option value="bar">Bar</option>
            <option value="museum">Museum</option>
            <option value="park">Park</option>
            <option value="shopping_mall">Shopping Mall</option>
            <option value="gas_station">Gas Station</option>
          </select>
        </label>
      </div>

      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10} onLoad={(map) => (mapRef.current = map)}>
        {directionsResponse && directionsResponse.routes.map((route, index) => (
          <DirectionsRenderer key={index} directions={{ ...directionsResponse, routes: [route] }} onLoad={(dr) => directionsRenderersRef.current.push(dr)} onUnmount={(dr) => directionsRenderersRef.current = directionsRenderersRef.current.filter(item => item !== dr)} />
        ))}
        {originCoords && <Marker position={originCoords} />}
        {destinationCoords && <Marker position={destinationCoords} />}
        {midpoint && <Marker position={midpoint} icon={customIcon} />}
        {places.map((place, index) => (
          <Marker key={index} position={place.geometry.location} icon={nearbyPlaceIcon} />
        ))}
      </GoogleMap>

      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "10px", padding: "10px" }}>
        <div style={{ flex: 1, minWidth: "300px", maxWidth: "600px", backgroundColor: "#f8f9fa", padding: "10px", borderRadius: "5px" }}>
          <h3>Address 1 Directions</h3>
          <ul>{directionsSteps1.map((step, idx) => (<li key={idx} dangerouslySetInnerHTML={{ __html: step }} />))}</ul>
        </div>
        <div style={{ flex: 1, minWidth: "300px", maxWidth: "600px", backgroundColor: "#f8f9fa", padding: "10px", borderRadius: "5px" }}>
          <h3>Address 2 Directions</h3>
          <ul>{directionsSteps2.map((step, idx) => (<li key={idx} dangerouslySetInnerHTML={{ __html: step }} />))}</ul>
        </div>
      </div>
    </>
  );
};

export default MergedMap;
