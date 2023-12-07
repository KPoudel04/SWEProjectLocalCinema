import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signin from './pages/signin/signin';
import Signup from './pages/signup/signup';
import Dashboard from './pages/dashboard/dashboard';
import { UserProvider } from './userContext/usercontext';
import ShowShifts from './pages/showShifts/showShift'; 
import Shows from './pages/shows/shows';
import Users from './pages/userList/users';
import UserShifts from './pages/userShifts/userShift';

function App() {
    return (
        <UserProvider>
        <Router>
            <Routes>
                <Route path="/signin" element={<Signin />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/shifts" element={<ShowShifts />} />
                <Route path="/shows" element={<Shows/>} />
                <Route path="/users" element={<Users/>} />
                <Route path="/users/:userID/shifts" element={<UserShifts/>} />
            </Routes>
        </Router>
        </UserProvider>
    );
}

export default App;
