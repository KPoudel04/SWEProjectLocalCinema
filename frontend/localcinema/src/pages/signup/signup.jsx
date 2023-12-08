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
                Navigate('/')
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
        <div className="form-container">
          <form onSubmit={handleSubmit} className="form">
            <div className="input-group">
              <label htmlFor="name">Name:</label>
              <input
                id="name" // Add this line
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="password">Password:</label>
              <input
                id="password" // Add this line
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="button-group">
              <button type="submit">Sign In</button>
              <button onClick={() => Navigate('/signup')}>
                Sign Up
              </button>
            </div>
          </form>
        </div>
      );
      
    
}

export default Signup;
