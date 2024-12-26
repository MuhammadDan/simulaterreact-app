import React from "react";
import Navbar from './Components/Navbar';
import HeroSection from "./Components/HeroSection";
import FeatureSection from "./Components/FeatureSection";
import Simulation from './Components/Simulation'; // Import the Simulation component
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="bg-gray-100 text-gray-900">
      {/* Header */}
      <Navbar />

      {/* Routes */}
      <Routes>
        <Route path="/" element={
          <>
            <HeroSection />
            <FeatureSection />
          </>
        } />
        <Route path="/simulation" element={<Simulation />} />
      </Routes>

      {/* Footer */}
    </div>
  );
}

export default App;
