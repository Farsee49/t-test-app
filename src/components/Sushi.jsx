

import { useState, useEffect, Fragment } from "react";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { getImages } from "../axios/Images";



export default function Sushi() {
    const [images, setImages] = useState([]);
    const fetchImages = async () => {
        const response = await getImages();
        if (response && response.data) {
            console.log('Fetched images at Sushi component:', response.data);
            setImages(prevImages => [...prevImages, ...response.data]);
        }
    }

    useEffect(() => {
        Promise.all([fetchImages()])
            .then(() => {
                console.log('Images fetched successfully', images);
            })
            .catch((error) => {
                console.error('Error fetching images:', error);
            });
    }, []);
    
    return (
        <>
        {console.log('Rendering Sushi component with images:', images)}
        <Typography variant="h2" sx={{ textAlign: 'center', margin: 2, color: '#007200' }}>
            Image Gallery
        </Typography> 

        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            {images.map((image, index) => (
                console.log('Rendering image:', image.url),
                <Card key={index} sx={{ margin: 2 }}>
                    <CardContent>
                        <Typography variant="h5">{image.title}</Typography>
                        <img src={image.url} alt={image.title} style={{ width: '600px', height: '500px' }} />
                    </CardContent>
                    <CardActions>
                        <Button onClick={() => window.open(image.url, '_blank')} size="small">View</Button>
                    </CardActions>
                </Card>
            ))}
        </Box>
   </> )
}