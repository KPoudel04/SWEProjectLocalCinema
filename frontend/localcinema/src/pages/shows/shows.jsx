import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Shows = () => {
  const [shows, setShows] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch shows from the backend
    axios.get('http://localhost:3000/shows')
      .then(response => setShows(response.data))
      .catch(error => console.error('Error fetching shows:', error));
  }, []);

return (
    <div>
      <h2>Shows</h2>
      <ul>
        {shows.map(show => (
          <li key={show.id}>
            <div onClick={() => navigate(`/shows/${show.id}/shifts`)}>
              {show.name}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Shows;

