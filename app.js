const express = require('express');
const app = express();
const port = 4444;
const cors = require('cors');


const fishRouter = require('./api/fish');
const userRouter = require('./api/users');

app.use(cors());

app.get('/home', (req, res) => {
    res.send('Hello World');
}
);




app.use('/fish', fishRouter);







app.listen(port, () => {
    console.log(`Server is running on
    http://localhost:${port}`);
});