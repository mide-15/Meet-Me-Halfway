import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

// Import routes below
import App from './App';
import Dashboard from './Routes/Dashboard_Page/Dashboard';
import Login from './Routes/Login_Page/Login';
import HomePage from './Routes/Home_Page/HomePage';
import RegistrationPage from './Routes/Registration_Page/RegistrationPage';

// Router configuration
// Add a path and element for each page in the app
export const router = createBrowserRouter([
    { path: '/', element: <HomePage /> },
    { path: '/dashboard', element: <Dashboard /> },
    { path: '/login', element: <Login /> },
    { path: '/registration', element: <RegistrationPage />}
  ]);