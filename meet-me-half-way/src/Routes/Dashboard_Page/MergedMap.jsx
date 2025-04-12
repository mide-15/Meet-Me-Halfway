import React, { useState, useEffect, useRef, useCallback } from "react";
import Navbar from '../../Components/Navbar'
import {
  GoogleMap,
  useJsApiLoader,
  DirectionsRenderer,
  Marker,
  Autocomplete,
} from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "100%"
};

const inputStyle = {
  alignSelf: "stretch",
  backgroundColor: "#ffffff",
  border: "1px solid",
  borderColor: "#031749",
  borderRadius: "8px",
  color: "#082367",
  fontFamily: "Inter, Helvetica",
  fontSize: "16px",
  fontWeight: "400",
  letterSpacing: "0",
  lineHeight: "24px",
  marginLeft: "10.00px",
  marginRight: "10.00px",
  marginTop: "-1.00px",
  padding: "12px",
  position: "relative",
  width: "300px"
};

const defaultCenter = { lat: 40.7128, lng: -74.0060 };

const MergedMap = () => {
  // Basic states
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

  // Autocomplete refs
  const [originAutocomplete, setOriginAutocomplete] = useState(null);
  const [destinationAutocomplete, setDestinationAutocomplete] = useState(null);

  // New states for place filtering controls
  const [radius, setRadius] = useState(5000); // in meters
  const [placeFilter, setPlaceFilter] = useState("all"); // "all" means no filtering

  // Refs for map and directions renderers
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
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    }
  }, []);

  const geocodeAddress = async (address) => {
    const apiKey = "AIzaSyA2oxgEXddn3TiBypWPBckx0m6iwn5UDyA";
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=${apiKey}`;

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

  // Function to clear existing DirectionsRenderer overlays.
  const clearDirectionsOverlays = () => {
    directionsRenderersRef.current.forEach((dr) => dr.setMap(null));
    directionsRenderersRef.current = [];
    setDirectionsResponse(null);
  };

  const handleMarkerClick = (position) => {
    clearDirectionsOverlays();
    fetchDirections1(position);
    fetchDirections2(position);
  };

  const fetchDirections1 = (destination) => {
    if (!originCoords || !destination) return;
    
    const directionsService = new window.google.maps.DirectionsService();
    directionsService.route(
      {
        origin: originCoords,
        destination: destination,
        travelMode: window.google.maps.TravelMode[travelMode],
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          setDirectionsResponse(result);
          const steps = result.routes[0].legs[0].steps.map((step) => step.instructions);
          setDirectionsSteps1(steps);
        } else {
          console.error("Error fetching directions:", status);
        }
      }
    );
  };

  const fetchDirections2 = (destination) => {
    if (!originCoords || !destination) return;
    
    const directionsService = new window.google.maps.DirectionsService();
    directionsService.route(
      {
        origin: destinationCoords,
        destination: destination,
        travelMode: window.google.maps.TravelMode[travelMode],
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          setDirectionsResponse(result);
          const steps = result.routes[0].legs[0].steps.map((step) => step.instructions);
          setDirectionsSteps2(steps);
        } else {
          console.error("Error fetching directions:", status);
        }
      }
    );
  };

  const fetchDirections = async () => {
    // Clear previous overlays and state values.
    clearDirectionsOverlays();
    setDirectionsResponse(null);
    setOriginCoords(null);
    setDestinationCoords(null);
    setMidpoint(null);
    setPlaces([]);

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
    setDestinationCoords(coords2);

    const midpointCalculated = calculateMidpoint(coords1, coords2);
    setMidpoint(midpointCalculated);
    setCenter(midpointCalculated);

    const directionsService = new window.google.maps.DirectionsService();
    directionsService.route(
      {
        origin: coords1,
        destination: coords2,
        travelMode: window.google.maps.TravelMode[travelMode],
        provideRouteAlternatives: true,
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          //setDirectionsResponse(result);
          fetchNearbyPlaces(midpointCalculated);
        } else {
          console.error("Error fetching directions:", status);
        }
      }
    );
  };

  // Wrap fetchNearbyPlaces in useCallback for a stable function reference.
  const fetchNearbyPlaces = useCallback(
    (midpoint) => {
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
        radius: radius,
      };

      if (placeFilter !== "all") {
        request.type = placeFilter;
      }

      service.nearbySearch(request, (results, status) => {
        if (
          status === window.google.maps.places.PlacesServiceStatus.OK &&
          results
        ) {
          setPlaces(results);
        } else {
          console.error("Nearby search failed:", status);
        }
      });
    },
    [radius, placeFilter]
  );

  // Refetch nearby places when radius, placeFilter, or midpoint changes.
  useEffect(() => {
    if (midpoint) {
      fetchNearbyPlaces(midpoint);
    }
  }, [radius, placeFilter, midpoint, fetchNearbyPlaces]);

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading...</div>;

  const customIcon = {
    url: "https://cdn1.iconfinder.com/data/icons/color-bold-style/21/14_1-512.png", // Replace with your desired icon URL
    scaledSize: new window.google.maps.Size(40, 40), // Adjust size as needed
  };
  const nearbyPlaceIcon = {
    url: "https://maps.google.com/mapfiles/ms/icons/yellow-dot.png", // Yellow marker for nearby places
    scaledSize: new window.google.maps.Size(30, 30), // Adjust size if needed
  };

  return (
    <>
      <Navbar />
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Autocomplete
          onLoad={(autocomplete) => setOriginAutocomplete(autocomplete)}
          onPlaceChanged={() => {
            if (originAutocomplete) {
              const place = originAutocomplete.getPlace();
              setOrigin(place.formatted_address || "");
            }
          }}
        >
          <input
            style={inputStyle}
            type="text"
            placeholder="Enter first address"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
          />
        </Autocomplete>

        <Autocomplete
          onLoad={(autocomplete) => setDestinationAutocomplete(autocomplete)}
          onPlaceChanged={() => {
            if (destinationAutocomplete) {
              const place = destinationAutocomplete.getPlace();
              setDestination(place.formatted_address || "");
            }
          }}
        >
          <input
            style={inputStyle}
            type="text"
            placeholder="Enter second address"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
        </Autocomplete>
      </div>
      
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: "10px" }}>
        <select
          value={travelMode}
          onChange={(e) => setTravelMode(e.target.value)}
          style={{ marginRight: "10px" }}
        >
          <option value="DRIVING">Driving</option>
          <option value="WALKING">Walking</option>
          <option value="BICYCLING">Bicycling</option>
          <option value="TRANSIT">Transit</option>
        </select>

        <button onClick={fetchDirections}>Get Directions</button>
      </div>

      {/* Controls for Radius and Place Filtering */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: "10px" }}>
        <label>
          Radius (meters): {radius}{" "}
          <input
            type="range"
            min="1000"
            max="10000"
            step="500"
            value={radius}
            onChange={(e) => setRadius(parseInt(e.target.value))}
          />
        </label>
        <label style={{ marginLeft: "10px" }}>
          Place Filter:{" "}
          <select
            value={placeFilter}
            onChange={(e) => setPlaceFilter(e.target.value)}
          >
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

      <div style ={{ display: "inline-block", height: "80vh", width: "100vw", alignItems: "center" }}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
          onLoad={(map) => (mapRef.current = map)}
        >
          {directionsResponse &&
            directionsResponse.routes.map((route, index) => (
              <DirectionsRenderer
                key={index}
                directions={{ ...directionsResponse, routes: [route] }}
                onLoad={(dr) => {
                  directionsRenderersRef.current.push(dr);
                }}
                onUnmount={(dr) => {
                  directionsRenderersRef.current = directionsRenderersRef.current.filter(
                    (item) => item !== dr
                  );
                }}
              />
            ))}
          {originCoords && <Marker position={originCoords} />}
          {destinationCoords && <Marker position={destinationCoords} />}
          {midpoint && <Marker position={midpoint} icon={customIcon} />}
          {places.map((place, index) => (
            <Marker key={index} position={place.geometry.location} onClick={() => handleMarkerClick(place.geometry.location)} icon={nearbyPlaceIcon} />
          ))}
        </GoogleMap>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
      <div style={{ maxHeight: "200px", overflowY: "auto", padding: "10px", backgroundColor: "#f8f9fa", borderRadius: "5px", marginTop: "10px", width: "50%" }}>
        <h3>Address 1 Directions</h3>
        <ul>
            {directionsSteps1.map((step, index) => (
                <li key={index} dangerouslySetInnerHTML={{ __html: step }}></li>
            ))}
        </ul>
      </div>

      <div style={{ maxHeight: "200px", overflowY: "auto", padding: "10px", backgroundColor: "#f8f9fa", borderRadius: "5px", marginTop: "10px", width: "50%" }}>
        <h3>Address 2 Directions</h3>
        <ul>
            {directionsSteps2.map((step, index) => (
                <li key={index} dangerouslySetInnerHTML={{ __html: step }}></li>
            ))}
        </ul>
      </div>
      </div>
    </>
  );
};

export default MergedMap;
