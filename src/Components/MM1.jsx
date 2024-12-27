import React, { useState } from 'react'
import generateCummulativeProbability from './Backend';
import { Paper, Table, TableContainer, TableHead,TableBody, TableRow } from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
const StyledTableCell = styled(TableCell)(({ }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#000",
      color:'#fff'
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(( ) => ({
    '&:nth-of-type(odd)': {
    //   backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
}));
const MM1 = () => {
    const [showsecondform, setShowSecondForm] = useState(true);
    const [data,setData] = useState({});
    const [row,setRow] = useState([]);
    const handleChange = (name,val) => {
        setData({...data,
            [name]:val
        })
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log(data)
        const {arrivalTime,serviceTime} = data;
        console.log(arrivalTime,serviceTime)
        const res = generateCummulativeProbability(arrivalTime,serviceTime);
        console.log(res);
        setRow(res)
    }
    console.log("row->",row)
  return (
    <>
    {showsecondform && (
        <>
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
                onChange={(e)=>(handleChange(e.target.name,e.target.value))}
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
                onChange={(e)=>(handleChange(e.target.name,e.target.value))}
                id="serviceTime"
                name="serviceTime"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter service Time"
              />
            </div>
            <div className="flex items-center justify-center">
              <button
                type="button"
                onClick={(e)=>(handleSubmit(e))}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Calculate
              </button>
            </div>
          </form>
          <div>
              {
                row?.table?.length !== 0 ?
                  <>
                    <TableContainer component={Paper} sx={{
                      maxWidth: '1200px', margin: 'auto',
                    }}>
                      <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                          <TableRow>
                            <StyledTableCell align="center">Patient</StyledTableCell>
                            <StyledTableCell align="center">Arrival Time</StyledTableCell>
                            <StyledTableCell align="center">Service Time</StyledTableCell>
                            <StyledTableCell align="center">Start Time</StyledTableCell>
                            <StyledTableCell align="center">End Time</StyledTableCell>
                            <StyledTableCell align="center">Turnaround Time</StyledTableCell>
                            <StyledTableCell align="center">Wait Time</StyledTableCell>
                            <StyledTableCell align="center">Response Time</StyledTableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {row?.table?.map((rows,idx) => (
                            <StyledTableRow key={idx}>
                              <StyledTableCell align="center">{idx+1}</StyledTableCell>
                              <StyledTableCell align="center">{rows.arrivalTime}</StyledTableCell>
                              <StyledTableCell align="center">{rows.serviceTime}</StyledTableCell>
                              <StyledTableCell align="center">{rows.startTime}</StyledTableCell>
                              <StyledTableCell align="center">{rows.endingTime}</StyledTableCell>
                              <StyledTableCell align="center">{rows.turnAroundTime}</StyledTableCell>
                              <StyledTableCell align="center">{rows.waitingTime}</StyledTableCell>
                              <StyledTableCell align="center">{rows.responseTime}</StyledTableCell>
                            </StyledTableRow>
                          ))}
                        </TableBody>
                      </Table>
                      <h4 style={{
                        margin: '1em auto',
                        textAlign: 'center'
                      }}>
                        <p style={{
                          fontSize: '1rem',
                        }}>
                          Server Utilization: {row?.serverUtilization}%
                        </p>
                      </h4>
                    </TableContainer>
                  </>
      
                  : null
                }
          </div>
        </>
        )}
    </>
  )
}

export default MM1