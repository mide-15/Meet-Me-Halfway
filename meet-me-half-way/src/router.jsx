import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

// Import routes below
import App from './App';
import Dashboard from './Routes/Dashboard';
import Login from './Routes/Login';

// Router configuration
// Add a path and element for each page in the app
export const router = createBrowserRouter([
    { path: '/', element: <App /> },
    { path: '/dashboard', element: <Dashboard /> },
    { path: '/login', element: <Login /> }
  ]);