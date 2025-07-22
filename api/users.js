const usersRouter = require('express').Router();
const { createUser,
        getAllUsers, 
        getUserById,
        getUserByUsername, 
        getUserByUsernameForAuth,
        getUserByIdForAuth,
        deleteUser
    } = require('../db/adapters/users');
const catchAsync = require('../utils/catchAsync');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;
const bcrypt = require('bcrypt');

usersRouter.use(catchAsync(async (req,res,next) => {
    console.log('A request was made to /api/users');
    next();
}));

//Register a new user
usersRouter.post('/register', catchAsync(async (req, res, next) => {
    console.log('Registering a new user');
    const { username, password } = req.body;
    if (!username || !password) {
        res.status(400).send({
            error: 'Username and password are required',
            name: 'MissingCredentialsError',
            message: 'Please provide both username and password'

        });
    } else if (password.length < 5) {
        res.status(400).send({
            error: 'Password too short',
            name: 'PasswordLengthError',
            message: 'Password must be at least 8 characters long'
        });
    } else {
        const user = await getUserByUsername(username);
        if (user) {
            res.status(400).send({
                error: 'User already exists',
                name: 'UserExistsError',
                message: 'Please choose a different username'
            });
        } else {
            const newUser = await createUser({ username, password });
            const token = jwt.sign({ id: newUser.id }, JWT_SECRET, { expiresIn: '1w' });
            res.send({
                user: newUser,
                message: 'User created successfully',
                token,
                success: true
            });
        }
    }
}));

//Login an existing user
usersRouter.post('/login', catchAsync(async (req, res, next) => {
    console.log('Logging in user');
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).send({
            error: 'Username and password are required',
            name: 'MissingCredentialsError',
            message: 'Please provide both username and password',
            success: false
        });
    }

    const user = await getUserByUsernameForAuth(username);
    if (!user) {
        return res.status(401).send({
            error: 'Invalid credentials',
            name: 'InvalidCredentialsError',
            message: 'Username or password is incorrect',
            success: false
        });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
        return res.status(401).send({
            error: 'Invalid credentials',
            name: 'InvalidCredentialsError',
            message: 'Username or password is incorrect',
            success: false
        });
    }

    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '2hr' });

    // Remove sensitive data before sending
    const { password: _, ...safeUser } = user;

    res.send({
        user: safeUser,
        message: 'Login successful',
        token,
        success: true,
        isLoggedIn: true
    });
}));

//Delete a user
usersRouter.delete('/:userId', catchAsync(async (req, res, next) => {
    console.log('Deleting user with ID:', req.params.userId);
    const { userId } = req.params;

    if (!userId) {
        return res.status(400).send({
            error: 'User ID is required',
            name: 'MissingUserIdError',
            message: 'Please provide a user ID to delete'
        });
    }

    const deletedUser = await deleteUser(userId);
    if (!deletedUser) {
        return res.status(404).send({
            error: 'User not found',
            name: 'UserNotFoundError',
            message: `No user found with ID ${userId}`
        });
    }

    res.send({
        message: 'User deleted successfully',
        user: deletedUser,
        success: true
    });
}));




module.exports = usersRouter;


