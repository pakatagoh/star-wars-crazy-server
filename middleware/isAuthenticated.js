const jwt = require('jsonwebtoken');
const { User } = require('../models');

const secret = 'the-secret-key';

const isAuthenticatedMiddleware = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) return res.status(401).json({ error: { message: 'Please login' } });

    const user = await jwt.verify(token, secret);

    if (!user) {
      res.status(401).json({ error: { message: 'Invalid token' } });
    }
    const foundUser = await User.findOne({ where: { id: user.id } });

    if (!foundUser) {
      return res.status(401).json({ error: { message: 'No such user exists, Please signup' } });
    }

    req.user = foundUser;
    next();
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

module.exports = isAuthenticatedMiddleware;
