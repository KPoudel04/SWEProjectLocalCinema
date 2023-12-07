import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserShifts = ({ userID }) => {
  const [shifts, setShifts] = useState([]);

  useEffect(() => {
    // Fetch shifts for a specific user from the backend
    axios.get(`http://localhost:3000/users/${userID}/shifts`)
      .then(response => setShifts(response.data))
      .catch(error => console.error('Error fetching shifts:', error));
  }, [userID]);

  return (
    <div>
      <h2>Shifts for User {userID}</h2>
      <ul>
        {shifts.map(shift => (
          <li key={shift.shiftID}>
            {shift.shiftTime}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserShifts;

