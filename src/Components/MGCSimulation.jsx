import React, { useState } from 'react'
import generateCummulativeProbability from './MGClogicsimulation.js'
import { Paper, Table, TableContainer, TableHead,TableBody, TableRow } from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
const StyledTableCell = styled(TableCell)(({ }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: 'blue',
      color:'#fff'
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(( ) => ({
    '&:nth-of-type(odd)': {
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
}));
const MGCSimulation = () => {
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
        const {arrivalTime,minserviceTime,maxserviceTime,NumberofServer,priority} = data;
        console.log(priority)
        const res = generateCummulativeProbability(arrivalTime,minserviceTime,maxserviceTime,NumberofServer,priority);
        console.log("res",res);
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
                Min Service Time
              </label>
              <input
                type="number"
                onChange={(e)=>(handleChange(e.target.name,e.target.value))}
                id="minserviceTime"
                name="minserviceTime"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter service Time"
              />
              
            </div>
            <div className="mb-4">
              <label
                htmlFor="serviceTime"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Max Service Time
              </label>
              <input
                type="number"
                onChange={(e)=>(handleChange(e.target.name,e.target.value))}
                id="maxserviceTime"
                name="maxserviceTime"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter service Time"
              />
              
            </div>
            <div className="mb-4">
              <label
                htmlFor="Number of server"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Number of Server
              </label>
              <input
                type="number"
                onChange={(e)=>(handleChange(e.target.name,e.target.value))}
                id="Number of Server"
                name="NumberofServer"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter Number of Server"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="priority"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Priority
              </label>
              <input
                type="number"
                onChange={(e)=>(handleChange(e.target.name,e.target.value))}
                id="priority"
                name="priority"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="priority"
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
                            {row?.length !==0?
                              row?.priority?.length !== 0 && <StyledTableCell align="center">Priority</StyledTableCell>
                            :null
                            }
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
                              {rows?.priority !== undefined &&
                              <StyledTableCell align="center">{rows.priority}</StyledTableCell>
                              }
                              <StyledTableCell align="center">{rows.startTime}</StyledTableCell>
                              <StyledTableCell align="center">{rows.endingTime}</StyledTableCell>
                              <StyledTableCell align="center">{rows.turnAroundTime}</StyledTableCell>
                              <StyledTableCell align="center">{rows.waitingTime}</StyledTableCell>
                              <StyledTableCell align="center">{rows.responseTime}</StyledTableCell>
                            </StyledTableRow>
                          ))}
                        </TableBody>
                      </Table>
                      <div className="flex flex-wrap my-[2vw] mx-[1vw] justify-center">
                  <div className="flex flex-wrap items-center justify-center w-full">
                    {row?.ganttCharts?.length !== 0 ? (
                      row?.ganttCharts?.map((chart, chartIndex) => (
                        <div
                          key={chartIndex}
                          className="gantt-chart-section my-2 flex flex-col w-full "
                        >
                          <h3 className="text-lg md:text-left text-center font-bold">Chart {chartIndex + 1}</h3>
                          <div className="flex flex-wrap md:justify-start justify-center">
                            {chart.map((item, index) => {
                              const nextItem = chart[index + 1];
                              const idleTime =
                                nextItem && nextItem.start_Time > item.end_Time
                                  ? nextItem.start_Time - item.end_Time
                                  : 0;

                              return (
                                <React.Fragment key={index}>
                                
                                  <div className="md:w-20 w-[23vw] h-16 rounded-2xl text-center relative border border-1 py-3 px-2 my-2 border-blue-700">
                                    <p className="text-center font-semibold">P{item?.customer_Id + 1}</p>
                                    <p className="absolute bottom-1 left-1">{item?.start_Time}</p>
                                    <p className="absolute bottom-1 right-1">{item?.end_Time}</p>
                                  </div>

                                  
                                  {idleTime > 0 && (
                                    <div className="md:w-20 w-[23vw] h-16  text-center flex items-center justify-center relative border border-dotted rounded-2xl py-3 px-2 my-2 bg-blue-700">
                                      <p className="text-white text-sm">Idle</p>
                                    </div>
                                  )}
                                </React.Fragment>
                              );
                            })}
                          </div>
                        </div>
                      ))
                    ) : (
                      <p>No Gantt chart data available.</p>
                    )}
                  </div>
                </div>    
                <h4 style={{
                  margin: '2em auto',
                  paddingBottom:'10px',
                  textAlign: 'center',
                  fontSize: '22px',
                  fontWeight: 'bold'
                }}>
                  {
                    row?.serverUtilization?.map((utilization,index)=>(
                      <div key={index}> 
                        <p className='text-blue-700'>Server{index+1} Utilization: {utilization.toFixed(2)}%</p>
                      </div>
                    ))
                  }
                    
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

export default MGCSimulation;