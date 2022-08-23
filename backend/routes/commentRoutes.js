const express = require('express');
const { createComment, updateComment, deleteComment } = require('../controllers/commentController');
const authMiddleware = require('../middleware/authMiddleware');
const adminAuthMiddleware = require('../middleware/adminAuthMiddleware');

const router = express.Router();

// '/api/comments'
router.post('/', authMiddleware, createComment); // Post a comment on a book, authorized user
router.put('/:commentId', authMiddleware, updateComment); // Update a comment, only original user access
router.delete('/:commentId', authMiddleware, adminAuthMiddleware, deleteComment); // Delete a comment, admin/original user access

module.exports = router;
