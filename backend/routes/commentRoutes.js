const express = require('express');
const { createComment, updateComment, deleteComment } = require('../controllers/commentController');
const authMiddleware = require('../middleware/authMiddleware');
const postedByMiddleware = require('../middleware/postedByMiddleware');
const roleCheckMiddleware = require('../middleware/roleCheckMiddleware');

const router = express.Router();

// '/api/comments'
router.param('commentId', postedByMiddleware);

router.post('/', authMiddleware, createComment);
router.put('/:commentId', authMiddleware, roleCheckMiddleware, updateComment);
router.delete('/:commentId', authMiddleware, roleCheckMiddleware, deleteComment);

module.exports = router;
