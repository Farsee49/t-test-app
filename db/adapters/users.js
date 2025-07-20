const client = require('../client');
const bcrypt = require('bcrypt');
const SALT_COUNT = 10;




createUser = async ({ username, password }) => {
    try {
        const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
        const query = `
            INSERT INTO users(username, password)
            VALUES($1, $2)
            RETURNING *;
        `;
        const { rows: [user] } = await client.query(query, [username, hashedPassword]);
        return user;
    } catch (error) {
        console.error('Error creating user', error);
        throw new Error('Failed to create user');
    }
};

getAllUsers = async () => {
    try {
        const query = `
            SELECT * FROM users;
        `;
        const { rows: users } = await client.query(query);
        return users;
    } catch (error) {
        console.error('Error getting all users', error);
        throw new Error('Failed to get all users');
    }
};

getUserByUsername = async (username) => {
    try{
        const query = `
            SELECT * FROM users
            WHERE username=$1;
        `;
        const {rows: [user]} = await client.query(query, [username]);
        return user;
    } catch (error) {
        console.error('Error fetching user by username:', error);
        throw error;
    }
}

getUserById = async (id) => {
    try {
        const query = `
        SELECT * FROM users
        WHERE id=$1;
        `;
        const { rows: [user] } = await client.query(query, [id]);
        return user;
    } catch (error) {
        console.error('Error fetching user by ID:', error);
        throw error;
    }
}



module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    getUserByUsername
}