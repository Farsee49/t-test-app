
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
                console.log('Fish fetched successfully');
            })
            .catch((error) => {
                console.error('Error fetching fish:', error);
            });
    }, []);

    return (
        <FishList fish={fish} />

    );
}

// Note: Ensure that the `getFish` function is imported from the appropriate file where it is defined, similar to how `getQuote` is imported in the Quote component.