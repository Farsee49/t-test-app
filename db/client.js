const { Pool } = require('pg');
require("dotenv").config();

const connectionString = process.env.DBURL


const client = new Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false
  }
});

module.exports = client;
