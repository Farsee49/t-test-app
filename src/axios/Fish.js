


import axios from 'axios';

export async function getFish() {
    const fishUrl = 'http://localhost:4444/fish';

    try {
        const response = await axios.get(fishUrl, {
            headers: {
                
            }
        });
        console.log(response.data);
        return response;
    } catch (error) {
        console.error(error);
    }
}