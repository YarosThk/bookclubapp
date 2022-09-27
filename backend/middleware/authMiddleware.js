// Middleware dedicated to authenticate the JWT Token and pass on the user
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const secret = process.env.JWT_SECRET;

const authMiddleware = async (req, res, next) => {
  try {
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      // We get token from the header
      const token = req.headers.authorization.split(' ')[1];
      if (!token) {
        res.status(401);
        throw new Error('User not authorized, no token');
      }

      // Decode and verify the token for tampering
      const decodedToken = jwt.verify(token, secret);
      // Get user id from the token since this was in the payload
      const decodedUserId = decodedToken.userId;
      // Assign a user to our request object so it's accesible in the other route handlers
      req.user = await User.findById(decodedUserId).select('-password');
      console.log(req.user);
      next();
    } else {
      res.status(401);
      throw new Error('User not authorized, no token');
    }
  } catch (error) {
    res.status(401); // Not authorized
    next(error);
  }
};

module.exports = authMiddleware;
