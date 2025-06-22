const express = require('express');
const app = express();
const port = 4444;


const fishRouter = require('./api/fish');
const userRouter = require('./api/users');



app.get('/home', (req, res) => {
    res.send('Hello World');
}
);




app.use('/fish', fishRouter);







app.listen(port, () => {
    console.log(`Server is running on
    http://localhost:${port}`);
});