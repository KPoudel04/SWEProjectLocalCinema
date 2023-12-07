import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ShowShifts = ({ showID }) => {
  const [shifts, setShifts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch shifts for a specific show from the backend
    axios.get(`http://localhost:3000/shows/${showID}/shifts`)
      .then(response => setShifts(response.data))
      .catch(error => console.error('Error fetching shifts:', error));
  }, [showID]);

  return (
    <div>
      <h2>Shifts for Show {showID}</h2>
      <ul>
        {shifts.map(shift => (
          <li key={shift.id}>
            <div onClick={() => navigate(`/shifts/${shift.id}/movies`)}>
              {shift.name}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShowShifts;


