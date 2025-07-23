
import { getFish } from "../axios/Fish";
import { useState, useEffect } from "react";



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
                console.log('Fish fetched successfully');
            })
            .catch((error) => {
                console.error('Error fetching fish:', error);
            });
    }, []);

    return (
        <>
            <h2>Fish List</h2>
            <ul>
                {fish.map(fishItem => (
                    <li key={fishItem.id}>
                        <h3>{fishItem.species}</h3>
                        <p>{fishItem.description}</p>
                    </li>
                ))}
            </ul>
        </>
    );
}

// Note: Ensure that the `getFish` function is imported from the appropriate file where it is defined, similar to how `getQuote` is imported in the Quote component.