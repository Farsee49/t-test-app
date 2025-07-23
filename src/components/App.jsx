
import{ useState } from 'react';
import { Routes, Route } from "react-router-dom";
import { Fish, Quote, Register, Navbar, Login } from './index';
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
  return (
    <div>
      <h1>Test-App</h1>
      <Navbar />
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
