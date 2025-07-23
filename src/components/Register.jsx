

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../axios/Users';

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [newUser, setNewUser] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = { username, password };
    try {
      // Attempt to register the user
      const response = await registerUser(user);
      console.log('Registration successful:', response);
      setNewUser(response);
      console.log('New user registered:', newUser);
    } catch (error) {
      // Handle registration error
      console.error('Registration failed:', error.message);
      alert(`Registration failed: ${error.message}`);
    }   
    // On success, navigate to the desired route
    navigate('/login');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Register</h2>
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
          Register
        </Button>
      </form>
    </div>
  );
}
// This component provides a simple registration form with username and password fields.