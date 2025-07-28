const client = require('../client');
const bcrypt = require('bcrypt');
const SALT_COUNT = 10;




const createUser = async ({ username, password }) => {
    try {
        const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
        const query = `
            INSERT INTO users(username, password)
            VALUES($1, $2)
            RETURNING *;
        `;
        const { rows: [user] } = await client.query(query, [username, hashedPassword]);
        
        // Remove sensitive data before returning
        const { password: _, ...safeUser } = user;
        return safeUser;
    } catch (error) {
        console.error('Error creating user', error);
        
        // Handle duplicate username constraint violation
        if (error.code === '23505' && error.constraint === 'users_username_key') {
            throw new Error('Username already exists');
        }
        
        throw new Error('Failed to create user');
    }
};

const getAllUsers = async () => {
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

const getUserByUsername = async (username) => {
    try{
        const query = `
            SELECT * FROM users
            WHERE username=$1;
        `;
        const {rows: [user]} = await client.query(query, [username]);
        
        // Handle case when no user is found
        if (!user) {
            return null;
        }
        
        // Remove sensitive data before returning
        const { password: _, ...safeUser } = user;
        return safeUser;
    } catch (error) {
        console.error('Error fetching user by username:', error);
        throw error;
    }
}

const getUserByUsernameForAuth = async (username) => {
    try{
        const query = `
            SELECT * FROM users
            WHERE username=$1;
        `;
        const {rows: [user]} = await client.query(query, [username]);
        return user; // Return full user object including password for authentication
    } catch (error) {
        console.error('Error fetching user by username for auth:', error);
        throw error;
    }
}

const getUserById = async (id) => {
    try {
        const query = `
            SELECT * FROM users
            WHERE id=$1;
        `;
        const { rows: [user] } = await client.query(query, [id]);
        
        // Handle case when no user is found
        if (!user) {
            return null;
        }
        
        // Remove sensitive data before returning
        const { password: _, ...safeUser } = user;
        return safeUser;
    } catch (error) {
        console.error('Error fetching user by ID:', error);
        throw error;
    }
}

const getUserByIdForAuth = async (id) => {
    try {
        const query = `
            SELECT * FROM users
            WHERE id=$1;
        `;
        const { rows: [user] } = await client.query(query, [id]);
        return user; // Return full user object including password for authentication
    } catch (error) {
        console.error('Error fetching user by ID for auth:', error);
        throw error;
    }
}


const deleteUser = async (id) => {
    try {
        const query = `
            DELETE FROM users
            WHERE id=$1
            RETURNING *;
        `;
        const { rows: [user] } = await client.query(query, [id]);
        if (!user) {
            throw new Error('User not found');
        }
        return user; // Return the deleted user object
    } catch (error) {
        console.error('Error deleting user:', error);
        throw new Error('Failed to delete user');
    }
};





module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    getUserByUsername,
    getUserByUsernameForAuth,
    getUserByIdForAuth,
    deleteUser
}