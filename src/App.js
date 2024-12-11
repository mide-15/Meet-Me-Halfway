import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Map from './Map';
import MapWithDirections from './MapWithDirections';
import NearbySearch from './NearbySearch';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MapWithDirections />} />
        <Route path="/NearbySearch" element={<NearbySearch />} />
      </Routes>
    </Router>
  );
}

export default App;