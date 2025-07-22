

const client = require('../client');



const createFish = async ({ species, scientificName, location, userId }) => {
    try {
        const query = `
            INSERT INTO fish(species, scientificName, location, userId)
            VALUES($1, $2, $3, $4)
            RETURNING *;
        `;
        const { rows: [fish] } = await client.query(query, [species, scientificName, location, userId]);
        return fish;
    } catch (error) {
        console.error('Error creating fish', error);
        throw new Error('Failed to create fish');
    }
};

const getAllFish = async () => {
    try {
        const query = `
            SELECT * FROM fish;
        `;
        const { rows: fish } = await client.query(query);
        return fish;
    } catch (error) {
        console.error('Error getting all fish', error);
        throw new Error('Failed to get all fish');
    }
};

const getFishById = async (id) => {
    try {
        const query = `
            SELECT * FROM fish
            WHERE id=$1;
        `;
        const { rows: [fish] } = await client.query(query, [id]);
        return fish;
    } catch (error) {
        console.error('Error getting fish by ID', error);
        throw new Error('Failed to get fish by ID');
    }
};

const getFishByUserId = async (userId) => {
    try {
        const query = `
            SELECT * FROM fish
            WHERE userId=$1;
        `;
        const { rows: fish } = await client.query(query, [userId]);
        return fish;
    } catch (error) {
        console.error('Error getting fish by user ID', error);
        throw new Error('Failed to get fish by user ID');
    }
};

module.exports = {
    createFish,
    getAllFish,
    getFishById,
    getFishByUserId,
};