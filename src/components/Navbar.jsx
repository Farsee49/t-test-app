
import { AppBar, Box, Toolbar, Typography, Button, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate, Link} from 'react-router-dom';
import {Logout} from './index'; // Importing Logout component

export default function Navbar(props) {
  const { isLoggedIn, loggedInUser, setIsLoggedIn, setLoggedInUser, setToken, token } = props;

  const handleMenuClick = () => {
  console.log("Menu clicked! You can add a drawer here.");
  };


  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar sx={{backgroundColor: '#007200'}} position="static">
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
            Test App {isLoggedIn && <h2 style= {{textAlign: 'center'}}>Welcome, {loggedInUser ? loggedInUser.username : 'Guest'}!</h2>}
          </Typography>
          {isLoggedIn?<Logout isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setLoggedInUser={setLoggedInUser} setToken={setToken} token={token} />:null}
          <Link to="/login" style={{ textDecoration: 'none' }}>  {/* Link for SPA navigation */}
            {!isLoggedIn ? <Button color="inherit">Login</Button> : null}
          </Link>
          <Link to="/register" style={{ textDecoration: 'none' }}>  {/* Link for SPA navigation */}
            {!isLoggedIn ? <Button color="inherit">Register</Button> : null}
          </Link>
          <Link to="/fish" style={{ textDecoration: 'none' }}>  {/* Link for SPA navigation */}
            {isLoggedIn && <Button color="inherit">Fish</Button>}
          </Link>
          <Link to="/sushi" style={{ textDecoration: 'none' }}>  {/* Link for SPA navigation */}
            {isLoggedIn && <Button color="inherit">Sushi</Button>}
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}