import React from 'react'
import { Link, Outlet } from 'react-router-dom'

const Queuing = () => {
  return (
    <div className='flex flex-col items-center p-6'>
        <div className='space-x-4 mb-6'>
        <Link to="MMC"
            className="text-blue-500 hover:text-blue-700 underline"
          >
            M/M/C
          </Link>
          <Link to="MGC"
            className="text-blue-500 hover:text-blue-700 underline"
          >
            M/G/C
          </Link>
          <Link to="GGC"
            className="text-blue-500 hover:text-blue-700 underline"
          >
            G/G/C
          </Link>
          </div>
          <Outlet />
    </div>
  )
}

export default Queuing