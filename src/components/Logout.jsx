
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import { logoutUser } from '../axios/Users'; // Importing the logout function



export default function Logout(props) {
  const { isLoggedIn, setIsLoggedIn, setLoggedInUser, setToken, token } = props;
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await logoutUser(token);
      setToken("");
      setIsLoggedIn(false);
      setLoggedInUser(null);
      navigate("/login");
    } catch (error) {
      console.error('Error during logout:', error);
    }
  }

return (<>
        {isLoggedIn ? <Button style={{ color: 'red' }} onClick={async () => {  logout(); }}>Logout</Button> : null}
</>)

}