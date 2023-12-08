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
import ElevateUser from './pages/elevateUser/elevateUser';
import CreateShow from './pages/createShow/createShow';
import AvailableShifts from './pages/availableShifts/availableShifts';
function App() {
    return (
        <UserProvider>
            <Router>
                <Routes>
                    <Route path="" element={<Signin />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/shows" element={<Shows />} />
                    <Route path="/shows/:showID" element={<ShowShifts />} />
                    <Route path="/users" element={<Users />} />
                    <Route path="/admin/elevateUser" element={<ElevateUser />} />
                    <Route path="/admin/createShow" element={<CreateShow />} />
                    <Route path="/shifts/available" element={<AvailableShifts />} />
                </Routes>
            </Router>
        </UserProvider>
    );
}

export default App;
