const express = require('express');
const server = express();
const port = 4444;
const cors = require('cors');




server.use(cors());

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