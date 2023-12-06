import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
function Signin() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        password: '',
    });

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                navigate('/dashboard'); 
            } else {
                throw new Error('Signin failed');
            }
            if (!response.ok) {
                throw new Error('Signin failed');
            }
            const user = await response.json();
            console.log('Signed in successfully:', user);
        } catch (error) {
            console.error('Signin error:', error);
            // Handle error (show error message)
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Name:</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Password:</label>
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
            </div>
            <button type="submit">Sign In</button>
        </form>
    );
}

export default Signin;