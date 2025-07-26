require ('dotenv').config();
const client = require('./db/client');
const express = require('express');
const server = express();
const EXPPORT = process.env.EXPPORT;
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const chalk = require('chalk');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

const corsOptions = {
  origin: 'http://localhost:3000', // Replace with your frontend's origin
  credentials: true, // Enable cookies
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
};

// server.use(express.static('public'));
server.use(express.static(path.join(__dirname, 'public')));
server.use(morgan('dev'));
server.use(cors(corsOptions));
server.use(bodyParser.json());
server.use(cookieParser());

const apiRouter = require('./api');
server.use('/api', apiRouter);


server.listen(EXPPORT, () => {
    console.log(
      chalk.blueBright("Server is listening on PORT:"),
      chalk.yellow(EXPPORT),
      chalk.blueBright("SPACE PORTAL OPEN!!!")
    )
  });
  try {
    client.connect();
    console.log(chalk.greenBright("DATABASE ENGAGED!"));
    } catch (error) {
    console.error(chalk.redBright("DATABASE START FAILURE!!!!!!!!!!"));
    }


    module.exports = {server, client};