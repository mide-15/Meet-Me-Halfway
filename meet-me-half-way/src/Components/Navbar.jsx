// Placeholder Navbar component

import React from 'react'
import { Link } from 'react-router-dom'
import "./NavbarStyle.css";

// Navbar links to routes in router
/*const Navbar = () => {
  return (
    <div>
        <Link to="/">Home</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/login">Login</Link>
    </div>
  )
}*/

const Navbar = () => {
  return (
    <div className="navbar-breakpoint">
      <div className="container">
        <div className="content">
          <div className="logo" />
        </div>

        <div className="column">
          <div className="column-2">
            <div className="text-wrapper"><Link to="/dashboard">Dashboard</Link></div>

            <div className="text-wrapper"><Link to="/login">Login</Link></div>

            <div className="text-wrapper"><Link to="/registration">Registration</Link></div>

            <div className="nav-link-dropdown">
              <div className="text-wrapper">Menu</div>

              <img
                className="img"
                alt="Chevron down"
                src="https://c.animaapp.com/BqPHfIZl/img/chevron-down.svg"
              />
            </div>
          </div>

          <div className="actions">
            <button className="button">
              <button className="button-2">Create Poll</button>
            </button>

            <button className="button-wrapper">
              <button className="button-3">View Map</button>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar