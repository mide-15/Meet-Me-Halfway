import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MergedMap from './MergedMap';
//import MapWithDirections from './MapWithDirections';
//import NearbySearch from './NearbySearch';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MergedMap />} />
        {/* <Route path="/MapWithDirections" element={<MapWithDirections />} /> */}
        {/* <Route path="/NearbySearch" element={<NearbySearch />} /> */}
      </Routes>
    </Router>
  );
}

export default App;