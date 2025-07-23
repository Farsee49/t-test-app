
import{ useState, useEffect } from 'react';
import { useNavigate} from 'react-router-dom';
import { Routes, Route } from "react-router-dom";
import { Fish, Quote, Register, Login, Navbar } from './index';
  
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
console.log('Cookies in App:', document.cookie);
    async function logout() {
         setToken("")
         setIsLoggedIn(false)
        window.localStorage.removeItem("token")
        useNavigate(window.location.href="/login")
    }

    function getCookie(name) {
  const cookies = document.cookie.split('; ');
  console.log('Cookies:', cookies);
  // Find the cookie with the specified name
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i];
    if (cookie.startsWith(`${name}=`)) {
      return cookie.substring(name.length + 1);
    }
  }
  return null;
}
    // Check if the user is logged in by checking the token in localStorage
    useEffect(() => {
        const cookieToken = getCookie('token');
        console.log('Cookie token:', cookieToken);
    }, []);

// Access the authentication token
const authToken = getCookie('authToken');

if (authToken) {
  console.log('User is authenticated with token:', authToken);
}

  return (
    <div>
      <h1>Test-App</h1>
      <Navbar 
      logout={logout}
      isLoggedIn={isLoggedIn}
      loggedInUser={loggedInUser}
      />
      <Quote />
      {/* {isLoggedIn && <h2>Welcome, {loggedInUser ? loggedInUser.username : 'Guest'}!</h2>} */}
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
