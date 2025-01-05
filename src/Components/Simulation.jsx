import React from "react";
// import { useState } from "react";
import { Link, Outlet} from "react-router-dom";
const Simulation = () => {
  // const handleMM1Click = (e) => {
  //   e.preventDefault();
  //   setShowSecondForm(true);
  // };
  // const handleMMCClick = (e) => {
  //   e.preventDefault();
  //   setShowForm(true);
  // };
  return (
    <>
      <div className="flex flex-col items-center p-6">
        <div className="space-x-4 mb-6">
          <Link to="MM1"
            // onClick={handleMM1Click}
            className="text-blue-500 hover:text-blue-700 underline"
          >
            M/M/1
          </Link>
          <Link to="MMCSimulation"
            // onClick={handleMM1Click}
            className="text-blue-500 hover:text-blue-700 underline"
          >
            M/M/C
          </Link>
          <Link to="MGCSimulation"
            // onClick={handleMM1Click}
            className="text-blue-500 hover:text-blue-700 underline"
          >
            M/G/C
          </Link>
        </div>

      <Outlet/>
        
         
      </div>
    </>
  );
};

export default Simulation;
