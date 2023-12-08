import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



const Users = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3000/users')
      .then(response => {
        setUsers(response.data);
        console.log(response.data); // You can log data here to inspect
      })
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  return (
    <div>
      <h2>Users</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            <div onClick={() => navigate(`/users/${user.id}/shifts`)}>
              {user.name} - {user.role} - shifts: {user.shifts && user.shifts.map(shift => `${shift.shiftTime} - ${shift.shiftMovie}`).join(', ')}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;


