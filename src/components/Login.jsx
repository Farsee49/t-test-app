

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../axios/Users';

export default function Login({
    username,                          
    setUsername,                        
    password, 
    setPassword, 
    loggedInUser, 
    setLoggedInUser,
    token, 
    setToken, 
    isLoggedIn, 
    setIsLoggedIn
}) {

    const navigate = useNavigate();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = { username, password };
        try {
        // Attempt to log in the user
        const response = await loginUser(user);
        console.log('Login response:', response);
        console.log('Login successful:', response.user);
         console.log('Token:', response.token);
        setLoggedInUser(response.user);
        if(response.success === true) {
            setToken(response.token);
            setIsLoggedIn(true);
            window.localStorage.setItem('token', response.token);
            
          
            navigate('/fish')
        }
        // On success, navigate to the desired route
        navigate('/fish');
        } catch (error) {
        // Handle login error
        console.error('Login failed:', error.message);
        alert(`Login failed: ${error.message}`);
        }
    };
    
    return (
        <div style={{ padding: '20px' }}>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
            <TextField
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" variant="contained" color="primary">
            Login
            </Button>
        </form>
        </div>
    );
    }
