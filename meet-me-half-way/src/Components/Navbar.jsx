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

        <div className="actions">
          <div className="button"><Link className="link-styles" to="/dashboard">Dashboard</Link></div>

          <div className="button"><Link className="link-styles" to="/login">Login</Link></div>

          <div className="button"><Link className="link-styles" to="/registration">Registration</Link></div>

          <button className="button">
            <button className="button-2">Create Poll</button>
          </button>

          <button className="button-wrapper">
            <button className="button-3">View Map</button>
          </button>
          </div>

        </div>
      </div>
  )
}

export default Navbar