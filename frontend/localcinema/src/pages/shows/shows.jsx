import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './shows.css';
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
    <div className="show-container">
      <h2>Shows</h2>
      <ul className="show-list">
        {shows.map(show => (
          <li key={show.id} className="show-item" onClick={() => navigate(`/shows/${show.id}`)}>
            <div className="show-title">
              {show.name}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
        };
const styles = {
  clickable: {
      cursor: 'pointer',
      color: 'blue',
      textDecoration: 'underline',
      '&:hover': {
          color: 'darkblue',
      }
  },
  button: {
      padding: '10px 15px',
      border: '1px solid #ccc',
      background: '#f5f5f5',
      cursor: 'pointer',
      '&:hover': {
          background: '#e0e0e0',
      }
  }
};


export default Shows;

