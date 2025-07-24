
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
    console.log
    function FishItem({ species, scientificname , location }) {
    return (
        <li>
            <article>
                <h3>Species: {species}</h3>
                <p><b>Scientific Name:</b> {scientificname}</p>
                <p><b>Location:</b> {location}</p>
            </article>
        </li>
    );
}
    function FishList({ fish = [] }) {
    if (fish.length === 0) {
        return <p>No fish to display.</p>;
    }

    return (
        <section>
            <h2>Fish List</h2>
            <ul>
                {fish.map(({ id, species, scientificname, location }) => (
                    <FishItem key={id} species={species} 
                    scientificname={scientificname} location={location} />
                ))}
            </ul>
        </section>
    );
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
      {fish.map(fishItem => 
        <Fragment key={fishItem.id}>
        <Card sx={{ backgroundColor: '#623697', width: 600, margin: 2, padding: 2 }}>
      <CardContent>
        <Typography variant="h5" component="div">
            {fishItem.species}
        </Typography>
        <br />
       <span> <Typography ><i>Scientific Name:</i>  {fishItem.scientificname}</Typography> </span>
       <br />
       <Typography ><i>Location:</i> {fishItem.location}</Typography>
        <Typography variant="body2">
          
          <br />
       
        </Typography>
      </CardContent>
      <CardActions>
      
      </CardActions>
    </Card>
  </Fragment>
)}
        </Box>
    </>
  );
}
