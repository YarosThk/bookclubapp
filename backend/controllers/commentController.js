const Book = require('../models/bookModel');
const Comment = require('../models/commentModel');

// @desc GET book comments
// @route GET api/books/:bookId/comments
// @access Public
const getBookComments = async (req, res, next) => {
  try {
    if (!req.params.bookId.match(/^[0-9a-fA-F]{24}$/)) {
      // Checking if Id formad is correct before querying with wrong id
      res.status(400);
      throw new Error('Invalid book Id');
    }
    if (!req.params.bookId) {
      res.status(400);
      throw new Error('Missing book id parameter');
    }

    const book = await Book.findById(req.params.bookId);
    if (!book) {
      res.status(400);
      throw new Error('Book with this id does not exist');
    }

    const page = parseInt(req.query.page, 10) || 1; // Queried page
    const pageSize = 5; // Comments per page
    const documentsCount = await Comment.countDocuments({ bookId: req.params.bookId });
    const totalPages = Math.ceil(documentsCount / pageSize);

    const comments = await Comment.find({ bookId: req.params.bookId })
      .limit(pageSize)
      .skip(pageSize * (page - 1))
      .sort('-createdAt');

    res.status(200);
    res.json({ payload: comments, paginationInfo: { page, totalPages, pageSize, documentsCount } });
  } catch (error) {
    next(error);
  }
};

// @desc Get user comments
// @route POST api/users/:userId/comments
// @access Private
const getUserComments = async (req, res, next) => {
  // NEED TO IMPLEMENT PAGINATION
  try {
    if (!req.params.userId.match(/^[0-9a-fA-F]{24}$/)) {
      // Checking if Id formad is correct before querying with wrong id
      res.status(400);
      throw new Error('Invalid user Id');
    }

    if (!req.params.userId) {
      res.status(400);
      throw new Error('Missing user id parameter');
    }

    // Check if user found after authorization, comes from authMiddleware
    if (!req.user.id) {
      res.status(400);
      throw new Error('User not found');
    }

    // To assure that user is able to get only his/her comments
    if (req.params.userId !== req.user.id) {
      res.status(401);
      throw new Error('User not authorized');
    }

    const page = parseInt(req.query.page, 10) || 1; // Queried page
    const pageSize = 5; // Comments per page
    const documentsCount = await Comment.countDocuments({ userId: req.params.userId });
    const totalPages = Math.ceil(documentsCount / pageSize);

    const comments = await Comment.find({ userId: req.params.userId })
      .limit(pageSize)
      .skip(pageSize * (page - 1))
      .sort('-createdAt');

    res.json({ payload: comments, paginationInfo: { page, totalPages, pageSize, documentsCount } });
  } catch (error) {
    next(error);
  }
};

// @desc Get one user comment
// @route GET api/comments/:commentId
// @access Private/admin
const getComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.commentId);

    if (!comment) {
      res.status(400);
      throw new Error('Comment with such Id not found');
    }

    res.status(200);
    res.json(comment);
  } catch (error) {
    next(error);
  }
};

// @desc Create a comment
// @route POST api/comments/
// @access Private
const createComment = async (req, res, next) => {
  try {
    if (!req.params.bookId.match(/^[0-9a-fA-F]{24}$/)) {
      // Checking if Id formad is correct before querying with wrong id
      res.status(400);
      throw new Error('Invalid book Id');
    }

    if (!req.params.bookId) {
      res.status(400);
      throw new Error('Missing book id parameter');
    }

    const book = await Book.findById(req.params.bookId);
    if (!book) {
      res.status(400);
      throw new Error('Book with this id does not exist');
    }

    if (!req.body.commentBody || !req.user.id || !req.user.name) {
      // res.user.id and name come from the token anyway, but maybe for extra reassurance we can check if is's there
      res.status(400);
      throw new Error('Missing required comment data.');
    }

    const comment = await Comment.create({
      userId: req.user.id,
      userName: req.user.name,
      bookId: req.params.bookId,
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
    res.json({ message: 'Comment updated', updatedComment });
  } catch (error) {
    next(error);
  }
};

// @desc Delete a comment
// @route DELETE api/comments/:commentId
// @access Private/admin
const deleteComment = async (req, res, next) => {
  try {
    if (!req.params.commentId) {
      res.status(400);
      throw new Error('Missing comment id parameter');
    }

    if (!req.params.commentId.match(/^[0-9a-fA-F]{24}$/)) {
      // Checking if Id formad is correct before querying with wrong id
      res.status(400);
      throw new Error('Invalid comment Id');
    }
    const comment = await Comment.findById(req.params.commentId);
    await Comment.deleteOne(comment);

    res.status(200);
    res.json({ message: 'Comment deleted', payload: comment });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getBookComments,
  getUserComments,
  getComment,
  createComment,
  updateComment,
  deleteComment,
};
