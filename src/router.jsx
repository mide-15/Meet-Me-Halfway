import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

// Import routes below
import App from './App';
//import Dashboard from './Routes/Dashboard_Page/Dashboard';
import MergedMap from './Routes/Dashboard_Page/MergedMap';
import Login from './Routes/Login_Page/Login';
import HomePage from './Routes/Home_Page/HomePage';
import RegistrationPage from './Routes/Registration_Page/RegistrationPage';
import Mypage from './Routes/test/testpage';
import ProfilePage from './Routes/Profile_Page/ProfilePage';
import Profilesettingpage from './Routes/Settings_Page/Profilesettingpage';

// Router configuration
// Add a path and element for each page in the app
export const router = createBrowserRouter([
    { path: '/', element: <HomePage /> },
    { path: '/dashboard', element: <MergedMap /> },
    { path: '/login', element: <Login /> },
    { path: '/registration', element: <RegistrationPage />},
    { path: '/test', element: <Mypage />},
    { path: '/profile', element: <ProfilePage />},
    { path: '/settings', element: <Profilesettingpage />}
  ]);
