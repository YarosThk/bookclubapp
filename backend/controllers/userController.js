const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

// Secret for JWT token
const secret = process.env.JWT_SECRET;

// Generate JWT Token with user id and user role (regular user or admin)
const generateAccessToken = (userId, userRole) =>
  jwt.sign({ userId, userRole }, secret, { expiresIn: '30d' });

// @desc Register a User
// @route POST api/users
// @access Public
const registerUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      res.status(400);
      throw new Error('Please fill the required data.');
    }
    // First check if user exists already
    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400);
      throw new Error('User already exists');
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    if (user) {
      res.status(201);
      res.json({
        _id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateAccessToken(user.id, user.role),
      });
    } else {
      res.status(400);
      throw new Error('Invalid user data');
    }
  } catch (error) {
    next(error);
  }
};

// @desc Authenticate a User
// @route POST api/users/login
// @access Public
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    // First we want to check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400);
      res.json({ message: 'User not found' });
    }
    // Unhash and check the hashed password in DB vs the provided passowrd
    const hashedPassword = user.password;
    const passwordCheck = await bcrypt.compare(password, hashedPassword);
    if (passwordCheck) {
      res.status(200);
      res.json({
        _id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateAccessToken(user.id, user.role),
      });
    } else {
      res.status(400);
      res.json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    next(error);
  }
};

// @desc Get user data
// @route POST api/users/me
// @access Private
const getUser = async (req, res, next) => {
  try {
    // Check if user found after authorization
    if (!req.user.id) {
      res.status(401);
      throw new Error('User not found');
    }

    res.json({ message: 'Get user data', payload: req.user });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUser,
};
