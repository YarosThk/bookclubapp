const express = require('express');
const { createComment, updateComment, deleteComment } = require('../controllers/commentController');
const authMiddleware = require('../middleware/authMiddleware');
const postedByMiddleware = require('../middleware/postedByMiddleware');
const roleCheckMiddleware = require('../middleware/roleCheckMiddleware');

const router = express.Router();

// '/api/comments'
// Param used to check wheter the user editing the comment is the original posted
router.param('commentId', postedByMiddleware);

router.post('/', authMiddleware, createComment);
router.put('/:commentId', authMiddleware, roleCheckMiddleware, updateComment);
router.delete('/:commentId', authMiddleware, roleCheckMiddleware, deleteComment);
module.exports = router;
