
import{ use, useState } from 'react';
import { useNavigate, Link} from 'react-router-dom';

import { Routes, Route } from "react-router-dom";
import { Fish, Quote, Register, Login } from './index';

import { AppBar, Box, Toolbar, Typography, Button, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';  
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

export default function App() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [token, setToken] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

console.log('Token in App:', token);

    async function logout() {
        setToken("")
        setIsLoggedIn(false)
        window.localStorage.removeItem("token")
        useNavigate(window.location.href="/login")
    }

  function Navbar({ isLoggedIn, setToken, setIsLoggedIn }) {
  console.log('Navbar isLoggedIn:', isLoggedIn);
  const handleMenuClick = () => {
  console.log("Menu clicked! You can add a drawer here.");
  };


  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleMenuClick} // Handling menu click
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Test App
          </Typography>
         <Button color="inherit" onClick={logout}>Logout</Button>
          <Link to="/login" style={{ textDecoration: 'none' }}>  {/* Link for SPA navigation */}
            <Button color="inherit">Login</Button>
          </Link>
          <Link to="/register" style={{ textDecoration: 'none' }}>  {/* Link for SPA navigation */}
            {isLoggedIn ? <Button color="inherit">Register</Button> : null}
          </Link>
          <Link to="/fish" style={{ textDecoration: 'none' }}>  {/* Link for SPA navigation */}
            <Button color="inherit">Fish</Button>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

  return (
    <div>
      <h1>Test-App</h1>
      <Navbar 
        isLoggedIn={isLoggedIn} 
        setToken={setToken} 
        setIsLoggedIn={setIsLoggedIn} 
      />
      <Quote />
      <Routes>
        <Route path='/login' 
          element={<Login 
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          loggedInUser={loggedInUser}
          setLoggedInUser={setLoggedInUser}
          token={token}
          setToken={setToken}
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
        />} />

        <Route path="/fish" 
          element={<Fish />} />

        <Route path="/register" 
          element={<Register />} />

     
      </Routes>
    </div>
  );
}
