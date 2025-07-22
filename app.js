require ('dotenv').config();
const client = require('./db/client');
const express = require('express');
const server = express();
const EXPPORT = process.env.EXPPORT;
const cors = require('cors');
const bodyParser = require('body-parser');
const chalk = require('chalk');
const morgan = require('morgan');



server.use(express.static('public'));
server.use(morgan('dev'));
server.use(cors());
server.use(bodyParser.json());
server.get('/home', (req, res) => {
    res.send('Hello World');
}
);



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