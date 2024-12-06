// Placeholder Navbar component

import React from 'react'
import { Link } from 'react-router-dom'

// Navbar links to routes in router
const Navbar = () => {
  return (
    <div>
        <Link to="/">Home</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/login">Login</Link>
    </div>
  )
}

export default Navbar