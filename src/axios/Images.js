

import axios from "axios";



export async function getImages() {
    const imagesUrl = 'http://localhost:4444/api/images';

    try {
        const response = await axios.get(imagesUrl, {
            headers: {
                // Add any necessary headers here
            }
        });
        console.log(response.data);
        return response;
    } catch (error) {
        console.error('Error fetching images:', error);
    }
}