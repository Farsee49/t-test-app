


import axios from 'axios';

export async function getFish() {
    const fishUrl = 'http://localhost:4444/api/fish';

    try {
        const response = await axios.get(fishUrl, {
          
        });
        console.log(response.data);
        return response;
    } catch (error) {
        console.error(error);
    }
}


export async function addFish(token, newFish) {
    console.log('Adding new fish:', newFish);
    const fishUrl = 'http://localhost:4444/api/fish';

    try {
        const response = await axios.post(fishUrl, newFish, {
            headers: {
                // 'Content-Type': 'application/json',
                // 'Accept': 'application/json',
                'Authorization': `Bearer ${token}`

            }
        });
        console.log('Fish added successfully at axios fish:', response.data);
        return response.data;

    } catch (error) {
        console.error('Error adding fish:', error);
        throw error;
    }
}

       