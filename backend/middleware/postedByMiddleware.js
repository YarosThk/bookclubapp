// Middleware to get the posted by id of the comment.
// in order to check if he/she is authorized to edit that comment in next middleware.
const Comment = require('../models/commentModel');

const postedByMiddleware = async (req, res, next) => {
  try {
    if (!req.params.commentId.match(/^[0-9a-fA-F]{24}$/)) {
      // Checking if Id formad is correct before querying with wrong id
      res.status(400);
      throw new Error('Invalid comment Id');
    }

    const comment = await Comment.findById(req.params.commentId);

    if (!comment) {
      res.status(400);
      throw new Error('Comment with such Id not found');
    }

    req.postedBy = comment.userId;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = postedByMiddleware;
