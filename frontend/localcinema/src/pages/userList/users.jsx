import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



const Users = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch users from the backend
    axios.get('http://localhost:3000/users')
      .then(response => setUsers(response.data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  return (
    <div>
      <h2>Users</h2>
      <ul>
      {users.map(user => (
  <li key={user.id}>
    <div onClick={() => navigate('/users/${user.id}/shifts')}>
      {user.name}
    </div>
  </li>
))}

      </ul>
    </div>
  );
};

export default Users;

