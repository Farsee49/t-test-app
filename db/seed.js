const client = require('./client');
const {createFish} = require('./adapters/fish');
const {createUser} = require('./adapters/users');
const {fishData, userData} = require('./seedData');


async function dropTables() {
    try {
        await client.query(`
        DROP TABLE IF EXISTS fish;
        DROP TABLE IF EXISTS users;
        `);
        console.log('Tables dropped');
    } catch (error) {
        console.error('Error dropping tables');
        throw error;
    }
};

async function createTables() {
    try {
        await client.query(`
        CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL
        );
        CREATE TABLE fish (
            id SERIAL PRIMARY KEY,
            species VARCHAR(255) NOT NULL,
            scientificName VARCHAR(255),
            location VARCHAR(255),
            userId INTEGER REFERENCES users(id)
        );
        `);
        console.log('Tables created');
    } catch (error) {
        console.error('Error creating tables');
        throw error;
    }
}

async function createInitialUsers() {
    try {
        console.log('Creating users');
        const usersToCreate = userData.map(user => createUser(user));
        await Promise.all(usersToCreate);
        console.log('Users created');
    }
    catch (error) {
        console.error('Error creating users');
        throw new Error('Failed to create users');
    }
}

async function createInitialFish() {
    try {
        console.log('Creating fish');
        const fishToCreate = fishData.map(fish => createFish(fish));
        await Promise.all(fishToCreate);
        console.log('Fish created');
    } catch (error) {
        console.error('Error creating fish');
        throw new Error('Failed to create fish');
    }
}




async function createDb () {
    console.log('Creating database');
    try {
      client.connect();
       await dropTables();
       await createTables();
       await createInitialUsers();
       await createInitialFish();
    } catch (error) {
        console.error('Error creating database');
        throw error;
    }
    console.log('Database created');
}
createDb().catch(console.error).finally(() => client.end());