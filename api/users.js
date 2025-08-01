const usersRouter = require('express').Router();
const cookieParser = require('cookie-parser');
usersRouter.use(cookieParser());
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
usersRouter.post('/login', catchAsync(async (req, res) => {
    const { username, password } = req.body;
    console.log('Logging in user:', req.body); // Remove this in production

    if (!username || !password) {
        return res.status(400).send({
            error: 'Username and password are required',
            name: 'UserLoginError',
            message: 'Username and password are required',
            success: false
        });
    }

        // Find the user by username
        const user = await getUserByUsernameForAuth(username);
        if (!user) {
            return res.status(400).send({
                error: 'Invalid credentials',
                name: 'AuthenticationError',
                message: 'Username or password is incorrect',
                success: false
            });
        }
        
        req.user = user;  // Ensure req.user is set if using tokenAuth middleware
        //console.log('User found:', user, 'RU', req.user); // Debugging line, remove in production
        // Check if password matches
        // Store user in session
       // Debugging line, remove in production
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send({
                error: 'Invalid credentials',
                name: 'AuthenticationError',
                message: 'Username or password is incorrect',
                success: false
            });
        }

        if (req.user ) {
        // Create JWT token with expiration (1 hour)
        const token = jwt.sign({ id: user.id, username: user.username, req: { user } }, JWT_SECRET, { expiresIn: '1h' });
        //console.log(token,'TOKEN'); // Debugging line, remove in production
            // Sterilize sensitive data before sending
        const { password: _, ...safeUser } = user;
         // Remove password from user object
        console.log('Safe user:', safeUser);
        req.user = safeUser;
        req.session.user = user // Debugging line, remove in production
        res.status(200).send({
            message: 'User logged in successfully',
            user: safeUser,
            token,
            success: true
        });
    }

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

// Logout a user
usersRouter.post('/logout', catchAsync(async (req, res) => {
    // Invalidate the user's token or session
    console.log('Logging out user:', req.user);
    if (!req.user) {
        return res.status(400).send({
            error: 'No user is currently logged in',
            name: 'UserNotLoggedInError',
            message: 'Please log in before attempting to log out'
        });
    }
    req.session.destroy(err => {
    if (err) {
      return res.status(500).send('Could not log out.');
    }
    res.clearCookie('connect.sid'); // Optional
    res.send('Logged out.');
    req.user = null;
    req.session.user = null;
    res.send({
        message: 'User logged out successfully',
        success: true
    });
});
}));

module.exports = usersRouter;


