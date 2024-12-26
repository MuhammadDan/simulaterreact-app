import React from "react";
import featureIcon1 from "../assets/feature1.png";
import featureIcon2 from "../assets/feature2.png";
import featureIcon3 from "../assets/feature3.png";
import Footer from "./Footer";
const FeatureSection = () => {
  return (
    <>
      <section id="features" className="py-20">
        <div className="container mx-auto text-center px-4">
          <h3 className="text-4xl font-bold mb-12">Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                title: "Real-Time Simulation",
                description:
                  "Visualize and analyze queuing models in real-time.",
                icon: featureIcon1,
              },
              {
                title: "Customizable Parameters",
                description:
                  "Adjust arrival rates, service rates, and queue lengths.",
                icon: featureIcon2,
              },
              {
                title: "Detailed Analytics",
                description:
                  "Get insights on system performance and bottlenecks.",
                icon: featureIcon3,
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="p-8 bg-white shadow-lg rounded-lg hover:shadow-xl transform hover:scale-105 transition duration-300"
              >
                <img
                  src={feature.icon}
                  alt={`${feature.title} Icon`}
                  className="mx-auto mb-6 h-20"
                />
                <h4 className="text-xl font-semibold mb-4">{feature.title}</h4>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section id="how-it-works" className="bg-gray-200 py-20">
        <div className="container mx-auto px-4">
          <h3 className="text-4xl font-bold text-center mb-12">How It Works</h3>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-blue-600 h-full"></div>
            {[
              "Input your queuing model parameters.",
              "Run the simulation to visualize the queue.",
              "Analyze the results and optimize the system.",
            ].map((step, index) => (
              <div
                key={index}
                className={`flex items-center space-x-6 text-lg mb-10 ${
                  index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                }`}
              >
                <div className="bg-blue-600 text-white w-10 h-10 flex items-center justify-center rounded-full font-bold">
                  {index + 1}
                </div>
                <p className="bg-white p-6 rounded-lg shadow-lg">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default FeatureSection;
