
require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET;
const { getUserById } = require('../db/adapters/users');




async function userAuth(req, res, next) {
 const prefix = 'Bearer ';
  const auth = req.header('Authorization');
  console.log('Authorization header:', auth); // Remove in production

  if (!auth) {
    return next(); // Allow anonymous access
  }

  if (!auth.startsWith(prefix)) {
    return next({
      name: 'AuthorizationHeaderError',
      message: `Authorization token must start with ${prefix}`
    });
  }

  const token = auth.slice(prefix.length);
  console.log('Token extracted:', token); // Remove in production

  try {
    const { id } = jwt.verify(token, SECRET);
    console.log('Decoded token ID:', id); // Remove in production

    // Support both payloads: { id: ... } and { user: { id: ... } }
    const userId = id;
    console.log('User ID from token:', userId); // Remove in production

    if (!userId) {
      return next({
        name: 'InvalidTokenError',
        message: 'Token did not contain a valid user ID'
      });
    }

    const user = await getUserById(id);

    if (!user) {
      return next({
        name: 'UserNotFoundError',
        message: 'No user found for this token'
      });
    }

    req.user = user;
    req.auth = { userId: user.id }; // Attach user ID to req.auth
    req.token = token; // Attach token to req for later use
    req.session.user = user;
    req.session.token = token; // Store token in session
    console.log(req.session.user, 'Session user at auth'); // Debugging line, remove in production
    console.log('User attached to req:', user); // Remove in production
    return next();

  } catch (err) {
    return next({
      name: 'JWTVerificationError',
      message: err.message
    });
  }
}

function ignoreFavicon(req, res, next) {
  if (req.originalUrl === '/favicon.ico') {
    return res.status(204).end();
  }
  next();
}

function storeReturnTo(req, res, next) {
    if (req.session.returnTo) {
        res.locals.returnTo = req.session.returnTo;
    }
    next();
}


module.exports = {
    userAuth,
    ignoreFavicon,
    storeReturnTo
};