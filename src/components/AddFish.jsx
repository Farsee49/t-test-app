



import  { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { addFish} from '../axios/Fish'; // Assuming you have an axios function to add fish

export default function AddFish({ user, token }) {
  console.log('AddFish component mounted', user);
    
    const [fishData, setFishData] = useState([]);
  const [species, setSpecies] = useState('');
    const [scientificName, setScientificName] = useState('');
    const [location, setLocation] = useState('');
   const navigate = useNavigate();

 

  const handleSubmit = (event) => {
    event.preventDefault();
    const newFish = {
      species,
      scientificName,
      location,
      userId: user.id // Assuming user has an id property
    };

    console.log('Form submitted:', newFish);
    const response = addFish(token, newFish);
    if (response && response.success) {
      console.log('Fish added successfully:', response.data);
      console.log('Form submitted:', newFish);
    }
   navigate('/fish'); // Adjust the path as needed
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TextField
        label="species"
        name="species"
        value={species}
        onChange={(e) => setSpecies(e.target.value)}
        variant="outlined"
        fullWidth
      />
      <TextField
        label="scientificName"
        name="scientificName"
        value={scientificName}
        onChange={(e) => setScientificName(e.target.value)}
        variant="outlined"
        fullWidth
      />
      <TextField
        label="location"
        name="location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        variant="outlined"
        fullWidth
      />
     
      <Button type="submit" variant="contained" color="primary">
        Add Fish
      </Button>
    </Box>
  );
    }
    




   