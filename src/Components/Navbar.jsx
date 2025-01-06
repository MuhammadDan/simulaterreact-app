import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <>
     <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-4 sticky top-0 shadow-md z-10">
          <div className="container mx-auto flex justify-between items-center px-4">
            <Link to="/" className="text-3xl font-bold tracking-wide">
              Trauma Center Simulater
            </Link>
            <nav>
              <ul className="flex gap-10">
                <li>
                  <a
                    href="#features"
                    className="hover:text-yellow-300 transition duration-300"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#how-it-works"
                    className="hover:text-yellow-300 transition duration-300"
                  >
                    How It Works
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    className="hover:text-yellow-300 transition duration-300"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </header>
    </>
  )
}

export default Navbar