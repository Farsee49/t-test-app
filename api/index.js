
require('dotenv').config();
const apiRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET;
const fishRouter = require('./fish');
const userRouter = require('./users');
const imageRouter = require('./images');
const sessRouter = require('./sessions');
const { userAuth } = require('./middleware');
const catchAsync = require('../utils/catchAsync');
const { getUserById } = require('../db/adapters/users');
const cookieParser = require('cookie-parser');
const chalk = require('chalk');
console.log(SECRET,'SECRET'); // Debugging line, remove in production

apiRouter.use(cookieParser());
apiRouter.use((req, res, next) => {
  console.log('A request was made to /api');
  next();
});

apiRouter.use((req, res, next) => {
   console.log(req.user, 'Session user');
   console.log(chalk.greenBright('A request was made to:'), chalk.blueBright(req.url));
   next();
 });





apiRouter.use('/fish', fishRouter);
apiRouter.use('/users', userRouter);
apiRouter.use('/images', imageRouter);
apiRouter.use('/sessions', sessRouter);

module.exports = apiRouter;