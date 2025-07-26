
import { getFish } from "../axios/Fish";
import { useState, useEffect, Fragment } from "react";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';



export default function Fish() {
    const [fish, setFish] = useState([]);
    const fetchFish = async () => {
        const response = await getFish();
        if (response && response.data) {
            console.log(response.data);
            setFish(prevFish => [...prevFish, ...response.data]);
        }
    }
    

    useEffect(() => {
        Promise.all([fetchFish()])
            .then(() => {
                console.log('Fish fetched successfully', fish);
            })
            .catch((error) => {
                console.error('Error fetching fish:', error);
            });
    }, []);


  return (
    <>
        <Typography variant="h2" sx={{ textAlign: 'center', margin: 2, color: '#007200' }}>
            Fish List
        </Typography>
    <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            {fish.map(fishItem => {
            return (
    <Card key={fishItem.id} sx={{ backgroundColor: '#623697', width: 600, margin: 2, padding: 2 }}>
        <CardContent>
            <Typography variant="h5" component="div">
                {fishItem.species}
            </Typography>
                <br />
            <span><Typography >Scientific Name: <></> <i>{fishItem.scientificname}</i></Typography> </span>
                <br />
            <span><Typography >Location: <></> <i>{fishItem.location}</i></Typography></span>
                
        </CardContent>
        <CardActions>
        </CardActions>
    </Card>
   
            );
        })}
    </Box>
    </>
  );
}
