// @desc Create a comment
// @route POST api/comments/
// @access Private
const createComment = (req, res, next) => {
  res.status(200);
  res.json({ message: 'Comment created' });
};

// @desc Update a comment
// @route PUT api/comments/:commentId
// @access Private
const updateComment = (req, res, next) => {
  res.status(200);
  res.json({ message: 'Comment updated' });
};

// @desc Delete a comment
// @route DELETE api/comments/:commentId
// @access Private/admin
const deleteComment = (req, res, next) => {
  res.status(200);
  res.json({ message: 'Comment deleted' });
};

module.exports = {
  createComment,
  updateComment,
  deleteComment,
};
