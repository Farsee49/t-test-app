const usersRouter = require('express').Router();
const { createUser, getAllUsers, getUserById } = require('../db/users');
const catchAsync = require('../utils/catchAsync');
const bcrypt = require('bcrypt');

usersRouter.use(catchAsync(async (req,res,next) => {
    console.log('A request was made to /api/users');
    next();
}));



module.exports = usersRouter;