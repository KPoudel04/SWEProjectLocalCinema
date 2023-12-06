import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signin from './signin/signin';
import Signup from './signup/signup';
import Dashboard from './dashboard/dashboard';
import { UserProvider } from './userContext/usercontext';
function App() {
    return (
        <UserProvider>
        <Router>
            <Routes>
                <Route path="/signin" element={<Signin />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </Router>
        </UserProvider>
    );
}

export default App;
