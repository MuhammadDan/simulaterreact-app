import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper, 
  Button,
  styled,
} from "@mui/material";

// Styled components
const StyledTableCell = styled(TableCell)(() => ({
  [`&.MuiTableCell-head`]: {
    backgroundColor: "#065F46",
    color: "white",
  },
  [`&.MuiTableCell-body`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(() => ({
  "&:hover": {
    backgroundColor: "#065F46",
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

// Helper functions
function factorial(n) {
  if (n === 0) {
    return 1;
  }
  if (n > 0) {
    return n * factorial(n - 1);
  }
}

function calculatePo(c, rho) {
  let res = 0;
  for (let n = 0; n < c; n++) {
    res += Math.pow(c * rho, n) / factorial(n);
  }
  return 1 / (res + Math.pow(c * rho, c) / (factorial(c) * (1 - rho)));
}

function calculateGGC(meanArrival, meanService, ArrivalVariance, ServiceVariance, servers) {
  meanArrival = 1 / +meanArrival;
  meanService = 1 / +meanService;
  const ca = +ArrivalVariance / Math.pow(1 / meanArrival, 2);
  const cs = +ServiceVariance / Math.pow(1 / meanService, 2);
  const rho = meanArrival / (servers * meanService);
  const idle = +(1 - rho).toFixed(2);

  if (rho < 1) {
    const expaverageQueueLengthQueue =
      (calculatePo(servers, rho) * Math.pow(meanArrival / meanService, servers) * rho) /
      (factorial(servers) * Math.pow(1 - rho, 2));

    const Lq = +(expaverageQueueLengthQueue * ((ca + cs) / 2)).toFixed(2);
    const Wq = +(Lq / meanArrival).toFixed(2);
    const Ws = +(Wq + 1 / meanService).toFixed(2);
    const Ls = +(meanArrival * Ws).toFixed(2);

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
    return null;
  }
}

// Main component
const QueueGGC = () => {
  const [formData, setFormData] = useState({});
  const [data, setData] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { ArrivalMean, ServiceMean, ArrivalVariance, ServiceVariance, Servers } = formData;

    const model = calculateGGC(
      ArrivalMean,
      ServiceMean,
      ArrivalVariance,
      ServiceVariance,
      Servers
    );

    setData(model);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h1 className="text-2xl font-bold mb-4">G/G/c Queuing Model Simulator</h1>
      <form onSubmit={handleSubmit}>
       <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Arrival Mean</label>
          <input
           name="ArrivalMean"
           type="number"
           onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter arrival rate (e.g., 5)"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Service Mean</label>
          <input
            name="ServiceMean"
            type="number"
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter max service rate (e.g., 6)"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Arrival Variance (in minutes)</label>
          <input
            name="ArrivalVariance"
            type="number"
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter max service rate (e.g., 6)"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Service Variance (in minutes)</label>
          <input
            name="ServiceVariance"
            type="number"
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter number of servers (e.g., 3)"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Number of Servers</label>
          <input
           name="Servers"
           type="number"
           onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter number of servers (e.g., 3)"
          />
        </div>
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Submit
        </Button>
        </form>
      {data && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableCell>Metric</StyledTableCell>
                <StyledTableCell>Value</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.entries(data).map(([key, value]) => (
                <StyledTableRow key={key}>
                  <StyledTableCell>{key}</StyledTableCell>
                  <StyledTableCell>{value}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      </div>
    </div>
  );
};

export default QueueGGC;
