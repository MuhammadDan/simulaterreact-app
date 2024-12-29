import React from "react";

const GGC = () => {
  function factorial(n) {
    if (n < 0) return 1; // Safeguard for invalid input
    if (n === 0) return 1;
    return n * factorial(n - 1);
  }

  const calculatePo = (c, rho) => {
    let res = 0;
    for (let n = 0; n < c; n++) {
      res += Math.pow(c * rho, n) / factorial(n);
    }
    return 1 / (res + (Math.pow(c * rho, c) / (factorial(c) * (1 - rho))));
  };

  const calculateGGC = (meanArrival, meanService, arrivalVariance, serviceVariance, servers) => {
    const lambda = 1 / meanArrival;
    const mu = 1 / meanService;
    const ca = arrivalVariance / Math.pow(lambda, 2);
    const cs = serviceVariance / Math.pow(mu, 2);
    const rho = lambda / (servers * mu);

    if (rho >= 1) {
      console.error("System is unstable. Utilization (\u03C1) must be less than 1.");
      return null;
    }

    const Po = calculatePo(servers, rho);
    const avgQueueLength = (Po * Math.pow(lambda / mu, servers) * rho) / (factorial(servers) * Math.pow(1 - rho, 2));
    const Lq = +(avgQueueLength * (ca + cs) / 2).toFixed(2);
    const Wq = +(Lq / lambda).toFixed(2);
    const Ws = +(Wq + 1 / mu).toFixed(2);
    const Ls = +(lambda * Ws).toFixed(2);
    const idle = +(1 - rho).toFixed(2);

    return {
      rho: +rho.toFixed(2),
      idle,
      Lq,
      Wq,
      Ws,
      Ls,
    };
  };

  const handleCalculate = () => {
    const meanArrival = parseFloat(document.getElementById("meanArrival").value);
    const meanService = parseFloat(document.getElementById("meanService").value);
    const arrivalVariance = parseFloat(document.getElementById("arrivalVariance").value);
    const serviceVariance = parseFloat(document.getElementById("serviceVariance").value);
    const servers = parseInt(document.getElementById("servers").value, 10);

    if (
      isNaN(meanArrival) ||
      isNaN(meanService) ||
      isNaN(arrivalVariance) ||
      isNaN(serviceVariance) ||
      isNaN(servers)
    ) {
      alert("Please enter valid inputs for all fields.");
      return;
    }

    const results = calculateGGC(meanArrival, meanService, arrivalVariance, serviceVariance, servers);

    if (results) {
      const resultDiv = document.getElementById("results");
      resultDiv.innerHTML = `
        <table class="w-full text-center border-collapse">
          <thead>
            <tr class="bg-black text-white">
              <th class="border px-4 py-2">Utilization (\u03C1)</th>
              <th class="border px-4 py-2">Idle Probability</th>
              <th class="border px-4 py-2">Average Queue Length (Lq)</th>
              <th class="border px-4 py-2">Average Waiting Time in Queue (Wq)</th>
              <th class="border px-4 py-2">Average Time in System (Ws)</th>
              <th class="border px-4 py-2">Average Number in System (Ls)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="border px-4 py-2">${results.rho}</td>
              <td class="border px-4 py-2">${results.idle}</td>
              <td class="border px-4 py-2">${results.Lq}</td>
              <td class="border px-4 py-2">${results.Wq}</td>
              <td class="border px-4 py-2">${results.Ws}</td>
              <td class="border px-4 py-2">${results.Ls}</td>
            </tr>
          </tbody>
        </table>
      `;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">G/G/C Queue Simulator</h1>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Arrival Mean</label>
          <input
            type="number"
            id="meanArrival"
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter arrival mean (e.g., 5)"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Service Mean</label>
          <input
            type="number"
            id="meanService"
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter service mean (e.g., 2)"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Arrival Variance</label>
          <input
            type="number"
            id="arrivalVariance"
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter arrival variance (e.g., 4)"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Service Variance</label>
          <input
            type="number"
            id="serviceVariance"
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter service variance (e.g., 1)"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Number of Servers (C)</label>
          <input
            type="number"
            id="servers"
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter number of servers (e.g., 3)"
          />
        </div>

        <button
          onClick={handleCalculate}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Calculate
        </button>

        <div id="results" className="mt-4"></div>
      </div>
    </div>
  );
};

export default GGC;
