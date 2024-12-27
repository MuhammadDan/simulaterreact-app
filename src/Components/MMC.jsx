import React, { useState } from 'react'

const MMC = () => {
    const [showform, setShowForm] = useState(true);
  return (
    <>
    {showform && (
          <form className="w-full max-w-sm bg-gray-100 p-4 rounded shadow-md">
            <div className="mb-4">
              <label
                htmlFor="arrivalTime"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Arrival Time
              </label>
              <input
                type="number"
                id="arrivalTime"
                name="arrivalTime"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter arrival Time"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="serviceTime"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Service Time
              </label>
              <input
                type="number"
                id="serviceTime"
                name="serviceTime"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter service Time"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="numberofServers" className="block text-gray-700 text-sm font-bold mb-2">
                Number of Servers
              </label>
              <input
                type="number"
                id="numberofServers"
                name="numberofServers"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter number of servers"
              />
            </div>
            <div className="flex items-center justify-center">
              <button
                type="button"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Calculate
              </button>
            </div>
          </form>
        )}
    </>
  )
}

export default MMC