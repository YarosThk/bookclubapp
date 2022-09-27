const express = require('express');
const { registerUser, loginUser, getUser } = require('../controllers/userController');
const { getBooksByUser } = require('../controllers/bookController');
const { getUserComments } = require('../controllers/commentController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// '/api/users'
router.post('/', registerUser);
router.post('/login', loginUser);
router.get('/:userId/books', authMiddleware, getBooksByUser);
router.get('/:userId/comments', authMiddleware, getUserComments);
router.get('/me', authMiddleware, getUser);

module.exports = router;
