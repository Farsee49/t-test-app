
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

//     return (
//         <>
//             <h2>Fish List</h2>
//             <ul>
//                 {fish.map(fishItem => (
//                     <li key={fishItem.id}>
//                         <h3>{fishItem.species}</h3>
//                         <p>{fishItem.description}</p>
//                     </li>
//                 ))}
//             </ul>
//         </>
//     );
// }

// Note: Ensure that the `getFish` function is imported from the appropriate file where it is defined, similar to how `getQuote` is imported in the Quote component.






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
