import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
function Signup() {
    const Navigate = useNavigate();
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
            const response = await fetch('http://localhost:3000/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                Navigate('/signin')
            }else{
                throw new Error('Signup failed');
            }
            const user = await response.json();
            console.log('Signed up successfully:', user);
            // Handle post-signup logic (e.g., redirect to login or dashboard)
        } catch (error) {
            console.error('Signup error:', error);
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
            <button type="submit">Sign Up</button>
        </form>
    );
}

export default Signup;
