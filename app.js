require ('dotenv').config();
const client = require('./db/client');
const express = require('express');
const server = express();
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const EXPPORT = process.env.EXPPORT;
const SES_SECRET = process.env.SESSION_SECRET;
const cors = require('cors');
const bodyParser = require('body-parser');
const { userAuth } = require('./api/middleware');
const path = require('path');
const chalk = require('chalk');
const apiRouter = require('./api');


const morgan = require('morgan');
const cookieParser = require('cookie-parser');

const corsOptions = {
  origin: 'http://localhost:3000', // Replace with your frontend's origin
  credentials: true, // Enable cookies
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
};
server.use(session({
  store: new pgSession({
    pool: client, // Use the existing PostgreSQL client
    tableName: 'session', // Use a specific table for sessions
    createTableIfMissing: true,
    ttl: 24 * 60 * 60 // Session expiration time in seconds (24 hours)
  }),
  secret: SES_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true, // Prevent client-side access to the cookie
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // Cookie expiration time (24 hours)
    secure: false, // Set to true if using HTTPS
    sameSite: 'lax' // Adjust based on your needs
  }
}));
server.use(userAuth);
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(express.static(path.join(__dirname, 'public')));
server.use(morgan('dev'));
server.use(cors(corsOptions));
server.use(bodyParser.json());
server.use(cookieParser());

server.use((req, res, next) => {
  res.locals.currentUser = req.user || null; // Attach the current user to res.locals
  console.log('Current user:', res.locals.currentUser); // Debugging line, remove in production
  next();
});

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