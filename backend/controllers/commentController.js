const Comment = require('../models/commentModel');

// @desc Create a comment
// @route POST api/comments/
// @access Private
const createComment = async (req, res, next) => {
  try {
    if (!req.body.bookId || !req.body.commentBody || !req.user.id || !req.user.name) {
      // res.user.id and name come from the token anyway, but maybe for extra reassurance we can check if is's there
      res.status(400);
      throw new Error('Missing required comment data.');
    }
    const comment = await Comment.create({
      userId: req.user.id,
      userName: req.user.name,
      bookId: req.body.bookId,
      commentBody: req.body.commentBody,
    });

    res.status(200);
    res.json({ message: 'Comment created', payload: comment });
  } catch (error) {
    next(error);
  }
};

// @desc Update a comment
// @route PUT api/comments/:commentId
// @access Private/admin
const updateComment = async (req, res, next) => {
  try {
    if (!req.body.commentBody) {
      res.status(400);
      throw new Error('Please input the comment body');
    }

    const update = { edited: true, ...req.body };
    const updatedComment = await Comment.findByIdAndUpdate(req.params.commentId, update, {
      new: true,
    });

    res.status(200);
    res.json({ message: 'Comment updated', payload: updatedComment });
  } catch (error) {
    next(error);
  }
};

// @desc Delete a comment
// @route DELETE api/comments/:commentId
// @access Private/admin
const deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    await Comment.deleteOne(comment);

    res.status(200);
    res.json({ message: 'Comment deleted' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createComment,
  updateComment,
  deleteComment,
};
