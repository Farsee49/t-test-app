
import{ useState, useEffect } from 'react';
import { useNavigate} from 'react-router-dom';
import { Routes, Route } from "react-router-dom";
import { Fish, Quote, Register, Login, Navbar, Sushi, AddFish } from './index';
import { getFish } from '../axios/Fish';
import { getImages } from '../axios/Images';
  
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
    const [fish, setFish] = useState([]);
    const [images, setImages] = useState([]);

    

    const fetchImages = async () => {
      try {
        const response = await getImages();
        if (response && response.data) {
            console.log('Fetched images at App component:', response.data);
            setImages(prevImages => [...prevImages, ...response.data]);
        }
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    }

    

   useEffect(() => {
  //getFish(setFish, token);
  fetchImages();
   //fetchFish(setFish, token);
}, []);

console.log('App component mounted',token, isLoggedIn);
  return (
    <div>
      <h1>Test-App</h1>
      <Navbar 
      isLoggedIn={isLoggedIn}
      loggedInUser={loggedInUser}
      setIsLoggedIn={setIsLoggedIn}
      setLoggedInUser={setLoggedInUser}
      setToken={setToken}
      token={token}
      />
      <Quote />
      <br />
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
       
        <Route path="/sushi" 
          element={<Sushi 
            images={images}
            setImages={setImages}
          />} />  
        <Route path="/fish" 
          element={<Fish 
            fish={fish}
            setFish={setFish}
           
          />} />
        <Route path="/addfish" 
          element={<AddFish 
            addFish={setFish}
            token={token}
            user={loggedInUser}
          />} />

        <Route path="/register" 
          element={<Register />} />
       
      </Routes>
    </div>
  );
}
