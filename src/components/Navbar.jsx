
import { AppBar, Box, Toolbar, Typography, Button, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate, Link} from 'react-router-dom';

export default function Navbar({ logout, isLoggedIn, loggedInUser }) {

  const handleMenuClick = () => {
  console.log("Menu clicked! You can add a drawer here.");
  };


  return (
    <Box  sx={{ flexGrow: 1 }}>
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
            Test App {isLoggedIn && <h2 style= {{textAlign: 'center'}}>Welcome, {loggedInUser ? loggedInUser.username : 'Guest'}!</h2>}
          </Typography>
            {isLoggedIn ? <Button color="inherit" onClick={logout}>Logout</Button> : null}
          <Link to="/login" style={{ textDecoration: 'none' }}>  {/* Link for SPA navigation */}
            {!isLoggedIn ? <Button color="inherit">Login</Button> : null}
          </Link>
          <Link to="/register" style={{ textDecoration: 'none' }}>  {/* Link for SPA navigation */}
            {!isLoggedIn ? <Button color="inherit">Register</Button> : null}
          </Link>
          <Link to="/fish" style={{ textDecoration: 'none' }}>  {/* Link for SPA navigation */}
            <Button color="inherit">Fish</Button>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}