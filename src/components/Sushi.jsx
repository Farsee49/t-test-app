

import { useState, useEffect, Fragment } from "react";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function Sushi(props) {
    const { images } = props;

    return (
        <>
        {console.log('Rendering Sushi component with images:', images)}
        <Typography variant="h2" sx={{ textAlign: 'center', margin: 2, color: '#007200' }}>
            Image Gallery
        </Typography> 

        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>

            {images.map((image, index) => (
                <Card key={index} sx={{ margin: 2 }}>
                    <CardContent>
                        <Typography variant="h5">{image.title}</Typography>
                        <img src={image.url} alt={image.title} style={{ width: '300px', height: '200px' }} />
                    </CardContent>
                    <CardActions>
                        <Button onClick={() => window.open(image.url, '_blank')} size="small">View</Button>
                    </CardActions>
                </Card>
            ))}
        </Box>
   </> )
}