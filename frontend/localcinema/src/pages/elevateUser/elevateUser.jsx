import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
function ElevateUser() {
    const [users, setUsers] = useState([]);

    const navigate = useNavigate();
    // Fetch users from the backend on component mount
    useEffect(() => {
        fetch('http://localhost:3000/users') // Adjust this to your actual endpoint for fetching users
            .then(response => response.json())
            .then(data => setUsers(data))
            .catch(error => console.error('Error fetching users:', error));
    }, []);

    const handleElevate = (userId) => {
        fetch(`http://localhost:3000/admin/elevateUser/${userId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
        })
        .then(response => {
            if (response.ok) {
                setUsers(users.map(user => {
                    if (user.id === userId) {
                        return { ...user, role: 'superUser' };
                    }
                    return user;
                }));
            } else {
                throw new Error('Failed to elevate user');
            }
        }).then(() => {
            navigate('/dashboard');
        })
        .catch(error => console.error('Error elevating user:', error));
    };

    return (
        <div>
            <h1>Elevate Users to Super User</h1>
            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        {user.name} - {user.role}
                        {user.role !== 'superUser' && (
                            <button onClick={() => handleElevate(user.id)}>Elevate to Super User</button>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ElevateUser;
