const express = require('express');
const {
  registerUser,
  loginUser,
  getUserComments,
  getUser,
} = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// '/api/users'
router.post('/', registerUser);
router.post('/login', loginUser);
router.get('/:userId/comments', authMiddleware, getUserComments); // Get comments by user
router.get('/me', authMiddleware, getUser);

module.exports = router;
