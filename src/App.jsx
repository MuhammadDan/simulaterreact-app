import React from "react";
import Navbar from './Components/Navbar';
import HeroSection from "./Components/HeroSection";
import FeatureSection from "./Components/FeatureSection";
import Simulation from './Components/Simulation'; // Import the Simulation component
import { Routes, Route } from "react-router-dom";
import MM1 from "./Components/MM1";
import MMC from "./Components/MMC";
import MGC from "./Components/MGC";
import Queuing from "./Components/Queuing";
import GGC from "./Components/GGC";
import MMCSimulation from "./Components/MMCSimulation";
import MGCSimulation from "./Components/MGCSimulation";
// import MM1 from "";
// import MMC from "./Components/MMC";

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
        <Route path="/simulation" element={<Simulation />} >
          <Route path="MM1" element={<MM1/>} />
          <Route path="MMCSimulation" element={<MMCSimulation/>} />
          <Route path="MGCSimulation" element={<MGCSimulation/>} />
          
        </Route>
        <Route path="/Queuing" element={<Queuing />} >
        <Route path="MMC" element={<MMC/>} />
          <Route path="MGC" element={<MGC/>} />
          <Route path="GGC" element={<GGC/>} />
          </Route>
        
      </Routes>

      {/* Footer */}
    </div>
  );
}

export default App;
