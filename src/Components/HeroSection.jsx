import React from 'react';
import { Link } from 'react-router-dom'; // Import Link
import pic1 from "../assets/pic1.jpg";

const HeroSection = () => {
  return (
    <>
      <section className="bg-gradient-to-b from-gray-200 via-white to-gray-200 py-20">
        <div className="container mx-auto flex flex-col-reverse md:flex-row items-center px-4">
          <div className="text-center md:text-left md:w-1/2">
            <h2 className="text-5xl font-bold mb-6">
              Simulate. Analyze. Optimize.
            </h2>
            <p className="text-lg mb-8">
              Empower your decision-making with an intuitive, interactive
              queuing model simulator.
            </p>
            <div className="space-x-4">
              {/* Use Link for Routing */}
              <Link 
                to="/simulation" 
                className="bg-blue-600 text-white px-8 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300"
              >
                Simulation
              </Link>
              <Link to="/Queuing" className="bg-gray-200 text-blue-600 px-8 py-3 rounded-lg shadow-lg hover:bg-gray-300 transition duration-300">
                Queuing Modals
              </Link>
            </div>
          </div>
          <div className="mt-8 md:mt-0 md:w-1/2">
            <img
              src={pic1}
              alt="Simulation illustration"
              className="rounded-lg shadow-xl h-[80vh] object-cover"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
