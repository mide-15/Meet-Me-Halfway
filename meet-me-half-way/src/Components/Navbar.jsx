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

/*const Navbar = () => {
  return (
    <div className="navbar-breakpoint">
      <div className="container">

        <div className="actions">
          <div className="button"><Link className="link-styles" to="/">Dashboard</Link></div>

          <div className="button"><Link className="link-styles" to="/login">Login</Link></div>

          <div className="button"><Link className="link-styles" to="/registration">Registration</Link></div>

          <button className="button">
            <button className="button-2"><Link className="link-styles" to="/test">Create Poll</Link></button>
          </button>

          <button className="button-wrapper">
            <button className="button-2"><Link className="link-styles-1" to="/Dashboard">View Map</Link></button>
          </button>
          </div>

        </div>
      </div>
  )
}*/

const Navbar = () => {
  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="#">Logo</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
            <a class="nav-link" href="/">Home</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="/login">Login</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="/registration">Register</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="/dashboard">Map</a>
        </li>
        <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Settings
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <a class="dropdown-item" href="#">Account</a>
            <a class="dropdown-item" href="#">Another action</a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="#">Something else here</a>
            </div>
        </li>
        </ul>
      </div>
      </nav>
  )
}

export default Navbar