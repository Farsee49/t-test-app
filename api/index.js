

const apiRouter = require('express').Router();
const fishRouter = require('./fish');
//const userRouter = require('./users');

apiRouter.use('/fish', fishRouter);
//apiRouter.use('/users', userRouter);

module.exports = apiRouter;