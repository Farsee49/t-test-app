

const apiRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;
const fishRouter = require('./fish');
const userRouter = require('./users');
const { getUserById } = require('../db/adapters/users');
const cookieParser = require('cookie-parser');

apiRouter.use(cookieParser());

 apiRouter.use(async (req, res, next) => {
  const prefix = 'Bearer ';
  const auth = req.header('Authorization');

  if (!auth) { // nothing to see here
    next();
  } else if (auth.startsWith(prefix)) {
    const token = auth.slice(prefix.length);

    try {
      const { id } = jwt.verify(token, JWT_SECRET);
      console.log('Token verified, user ID:', id);

      if (id) {
        req.user = await getUserById(id);
       confirmUser = req.user;
        console.log('User confirmed:', confirmUser);
        next();
      }
    } catch ({ name, message }) {
      next({ name, message });
    }
  } else {
    next({
      name: 'AuthorizationHeaderError',
      message: `Authorization token must start with ${ prefix }`
    });
  }
});



apiRouter.use('/fish', fishRouter);
apiRouter.use('/users', userRouter);

module.exports = apiRouter;