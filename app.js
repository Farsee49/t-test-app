const express = require('express');
const server = express();
const port = 4444;
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();




server.use(cors());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

server.get('/home', (req, res) => {
    res.send('Hello World');
}
);



const apiRouter = require('./api');
server.use('/api', apiRouter);



server.listen(port, () => {
    console.log(`Server is running on
    http://localhost:${port}`);
});