import React from "react";

const MGC = () => {
  const factorial = (n) => {
    if (n === 0) {
      return 1;
    }
    if (n > 0) {
      return n * factorial(n - 1);
    }
  };

  function calculatePo(c, rho) {
    let res = 0;
    for (let n = 0; n < c; n++) {
      res += Math.pow(c * rho, n) / factorial(n);
    }
    return 1 / (res + Math.pow(c * rho, c) / (factorial(c) * (1 - rho)));
  }

  const calculateCsSquare = (variance, mue) => {
    return variance / Math.pow(1 / mue, 2);
  };

  const calculateMGC = (meanArrivalTime, minServiceTime, maxServiceTime, servers) => {
    meanArrivalTime = parseFloat(1 / meanArrivalTime);
    let meanServiceTime = 1 / ((+minServiceTime + +maxServiceTime) / 2);
    servers = parseInt(servers);

    const rho = +(meanArrivalTime / (servers * meanServiceTime)).toFixed(1);
    if (rho < 1) {
      const idle = +(1 - rho).toFixed(1);
      const variance = Math.pow(maxServiceTime - minServiceTime, 2) / 12;
      const cs2 = calculateCsSquare(variance, meanServiceTime);
      const Lq = +(
        (calculatePo(servers, rho) *
          Math.pow(meanArrivalTime / meanServiceTime, servers) *
          rho) /
        (factorial(servers) * Math.pow(1 - rho, 2)) *
        ((cs2 + 1) / 2)
      ).toFixed(1);
      const Wq = +(Lq / meanArrivalTime).toFixed(2);
      const Ws = +(Wq + 1 / meanServiceTime).toFixed(2);
      const Ls = +(meanArrivalTime * Ws).toFixed(2);

      return {
        rho,
        idle,
        Wq,
        Lq,
        Ws,
        Ls,
      };
    } else {
      console.log("This is not a valid queuing model.");
    }
  };

  const handleCalculate = () => {
    const arrivalRate = parseFloat(document.getElementById("arrivalRate").value);
    const minServiceRate = parseFloat(document.getElementById("minServiceRate").value);
    const maxServiceRate = parseFloat(document.getElementById("maxServiceRate").value);
    const servers = parseInt(document.getElementById("servers").value);

    const results = calculateMGC(arrivalRate, minServiceRate, maxServiceRate, servers);

    if (results) {
      const resultDiv = document.getElementById("results");
      resultDiv.innerHTML = `
        <table class="w-full text-center border-collapse">
          <thead>
            <tr class="bg-black text-white">
              <th class="border px-4 py-2">Utilization (ρ)</th>
              <th class="border px-4 py-2">Average Queue Length (Lq)</th>
              <th class="border px-4 py-2">Average Number in System (L)</th>
              <th class="border px-4 py-2">Average Waiting Time in Queue (Wq)</th>
              <th class="border px-4 py-2">Average Time in System (W)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="border px-4 py-2">${results.rho}</td>
              <td class="border px-4 py-2">${results.Lq}</td>
              <td class="border px-4 py-2">${results.Ls}</td>
              <td class="border px-4 py-2">${results.Wq}</td>
              <td class="border px-4 py-2">${results.Ws}</td>
            </tr>
          </tbody>
        </table>
      `;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">M/G/C Queue Simulator</h1>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Arrival Time</label>
          <input
            type="number"
            id="arrivalRate"
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter arrival rate (e.g., 5)"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Min Service Time</label>
          <input
            type="number"
            id="minServiceRate"
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter min service rate (e.g., 2)"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Max Service Time</label>
          <input
            type="number"
            id="maxServiceRate"
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter max service rate (e.g., 6)"
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

export default MGC;