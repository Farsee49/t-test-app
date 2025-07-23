import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom'; // Import Link for SPA navigation

export default function Navbar() {
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
            News
          </Typography>
          <Link to="/login" style={{ textDecoration: 'none' }}>  {/* Link for SPA navigation */}
            <Button color="inherit">Login</Button>
          </Link>
          <Link to="/register" style={{ textDecoration: 'none' }}>  {/* Link for SPA navigation */}
            <Button color="inherit">Register</Button>
          </Link>
          <Link to="/fish" style={{ textDecoration: 'none' }}>  {/* Link for SPA navigation */}
            <Button color="inherit">Fish</Button>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
