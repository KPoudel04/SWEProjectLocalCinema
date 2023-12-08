import React, { useState, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../userContext/usercontext';
import './signin.css';
function Signin() {
    const navigate = useNavigate();
    const { user, setUser } = useContext(UserContext);
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
                setUser(formData)
                navigate('/dashboard'); 
            } else {
                throw new Error('Signin failed');
            }
            if (!response.ok) {
                throw new Error('Signin failed');
            }
            const userData = await response.json();
            setUser(userData);
            console.log('Signed in successfully:', user);
        } catch (error) {
            console.error('Signin error:', error);
            // Handle error (show error message)
        }
    };

    return (
      <div className="form-container">
        <form onSubmit={handleSubmit} className="form">
          <div className="input-group">
            <label htmlFor="name">Name:</label> 
            <input
              id="name"  
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
              id="password"  
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="button-group">
            <button type="submit">Sign In</button>
            <button onClick={() => navigate('/signup')}>
              Sign Up
            </button>
          </div>
        </form>
      </div>
    );
    
    
}


export default Signin;