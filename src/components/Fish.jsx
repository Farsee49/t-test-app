
import { getFish } from "../axios/Fish";
import { useState, useEffect, Fragment } from "react";
import { useNavigate, Link} from 'react-router-dom';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';




export default function Fish(props) {
    const {  fish, setFish } = props;

    useEffect(() => {
        const fetchFish = async () => {
            try {
                const response = await getFish();
                if (response && response.data) {
                    console.log('Fetched fish at Fish component:', response.data);
                    
                    setFish(response.data);
                }
            } catch (error) {
                console.error('Error fetching fish:', error);
            }
        };

        fetchFish();
    }, []);

  return (
    <>
        <Typography variant="h2" sx={{ textAlign: 'center', margin: 2, color: '#007200' }}>
            Fish List
            <Link to="/addfish" style={{ textDecoration: 'none' }}>
                <Button variant="contained" color="primary" sx={{ marginLeft: 2 }}>
                    Add Fish
                </Button>
            </Link>
        </Typography>
    <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            {fish.map(fishItem => 
            
    <Card key={`${fishItem.id}-${fishItem.species}`} sx={{ backgroundColor: '#623697', width: 600, margin: 2, padding: 2 }}>
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
   
            
        )}
    </Box>
    </>
  );
}
