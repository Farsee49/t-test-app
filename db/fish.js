

const client = require('./client');


createFish = async ({species, scientificName, location, userId}) => {
    try {
        const query = `
        INSERT INTO fish(species, scientificName, location, userId)
        VALUES($1, $2, $3, $4)
        RETURNING *;
        `;
        const {rows: [fish]} = await client.query(query, 
            [species, scientificName, location, userId]);
        return fish;
    }catch (error) {
        console.error('Error creating fish',error);
        throw new Error('Failed to create fish');
    }
}

getAllFish = async () => {
    try {
        const query = `
        SELECT * FROM fish;
        `;
        const {rows: fish} = await client.query(query);
        return fish;
    } catch (error) {
        console.error('Error getting fish',error);
        throw new Error('Failed to get fish');
    }
}

getFishById = async (id) => {
    try {
        const {rows: [fish]} = await client.query(`
        SELECT * FROM fish
        WHERE id=$1;
        `, [id]);
        return fish;
    } catch (error) {
        console.error('Error getting fish by id');
        throw error;
    }
}

getFishByUserId = async (userId) => {
    try {
        const {rows: fish} = await client.query(`
        SELECT * FROM fish
        WHERE userId=$1;
        `, [userId]);
        return fish;
    } catch (error) {
        console.error('Error getting fish by user id');
        throw error;
    }
}


module.exports = {
    createFish,
    getAllFish,
    getFishById,
    getFishByUserId,
};