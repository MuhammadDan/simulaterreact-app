import React from 'react'
import { useState } from 'react';
const MGC = () => {
  const [arrivalRate, setArrivalRate] = useState(); // λ
  const [serviceRate, setServiceRate] = useState(); // μ
  const [variance, setVariance] = useState(); // Variance of service time
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  console.log(arrivalRate)
  console.log(serviceRate)
  console.log(variance)

  const calculateMetrics = () => {
    setError(null);

    if (serviceRate <= 0 || arrivalRate <= 0) {
      setError("Arrival rate and service rate must be greater than 0.");
      return;
    }

    if (arrivalRate >= serviceRate) {
      setError("The system becomes unstable when arrival rate >= service rate.");
      return;
    }

    // Utilization (ρ)
    const utilization = (arrivalRate / serviceRate);

    // Average waiting time in the queue (Wq)
    const averageWaitInQueue =
      (utilization * (1 + variance * serviceRate ** 2)) /
      (2 * (1 - utilization));

    // Average waiting time in the system (Ws)
    const averageWaitInSystem = averageWaitInQueue + 1 / serviceRate;

    // Average number of items in the queue (Lq)
    const averageItemsInQueue = arrivalRate * averageWaitInQueue;

    // Average number of items in the system (Ls)
    const averageItemsInSystem = arrivalRate * averageWaitInSystem;

    // Probability of the server being idle (1 - ρ)
    const idleProbability = 1 - utilization;

    setResults({
      Wq: averageWaitInQueue,
      Ws: averageWaitInSystem,
      rho: utilization,
      Lq: averageItemsInQueue,
      Ls: averageItemsInSystem,
      idle: idleProbability,
    });
  };
      
  return  (<div className="min-h-screen bg-gray-100 flex items-center justify-center">
  <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
    <h1 className="text-2xl font-bold mb-4">M/G/C Queue Simulator</h1>

    <div className="mb-4">
      <label className="block text-gray-700 font-medium mb-2">
        Arrival Rate (λ)
      </label>
      <input
        type="number"
        value={arrivalRate}
        onChange={(e) => setArrivalRate(parseFloat(e.target.value))}
        className="w-full p-2 border border-gray-300 rounded-md"
        placeholder="Enter arrival rate (e.g., 5)"
      />
    </div>

    <div className="mb-4">
      <label className="block text-gray-700 font-medium mb-2">
        Service Rate (μ)
      </label>
      <input
        type="number"
        value={serviceRate}
        onChange={(e) => setServiceRate(parseFloat(e.target.value))}
        className="w-full p-2 border border-gray-300 rounded-md"
        placeholder="Enter service rate (e.g., 8)"
      />
    </div>

    <div className="mb-4">
      <label className="block text-gray-700 font-medium mb-2">
        Variance of Service Time (Var[S])
      </label>
      <input
        type="number"
        value={variance}
        onChange={(e) => setVariance(parseFloat(e.target.value))}
        className="w-full p-2 border border-gray-300 rounded-md"
        placeholder="Enter variance (e.g., 0.5)"
      />
    </div>

    {error && <p className="text-red-500 mb-4">{error}</p>}

    <button
      onClick={calculateMetrics}
      className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
    >
      Calculate
    </button>

    {results && !error && (
      <div className="mt-4">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-blue-200">
              <th className="border px-4 py-2">Metric</th>
              <th className="border px-4 py-2">Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-4 py-2">Average Waiting Time in Queue (Wq)</td>
              <td className="border px-4 py-2">{results.Wq.toFixed(2)}</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Average Waiting Time in System (Ws)</td>
              <td className="border px-4 py-2">{results.Ws.toFixed(2)}</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Server Utilization (ρ)</td>
              <td className="border px-4 py-2">{results.rho.toFixed(2)}</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Average Number in Queue (Lq)</td>
              <td className="border px-4 py-2">{results.Lq.toFixed(2)}</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Average Number in System (Ls)</td>
              <td className="border px-4 py-2">{results.Ls.toFixed(2)}</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Idle Probability</td>
              <td className="border px-4 py-2">{results.idle.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    )}
  </div>
</div>
  )
}

export default MGC