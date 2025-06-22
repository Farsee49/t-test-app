const {Pool} = require('pg');
require('dotenv').config();

connectionString = process.env.DBURL


const client = new Pool({
    connectionString: connectionString,
    ssl: {
        rejectUnauthorized: false
    },
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000, 
});

module.exports = client; 