const Book = require('../models/bookModel');
const Comment = require('../models/commentModel');

// @desc GET all books
// @route GET api/books/
// @access Public
const getAllBooks = async (req, res, next) => {
  try {
    const allGoals = await Book.find();
    res.status(200);
    res.json({ message: 'Get all books', payload: allGoals });
  } catch (error) {
    next(error);
  }
};

// @desc GET a specific book
// @route GET api/books/:Id
// @access Public
const getBook = async (req, res, next) => {
  try {
    if (!req.params.bookId.match(/^[0-9a-fA-F]{24}$/)) {
      // Checking if Id formad is correct before querying with wrong id
      res.status(400);
      throw new Error('Invalid book Id');
    }
    const book = await Book.findById(req.params.bookId);

    if (!book) {
      res.status(400);
      throw new Error('Book with this id does not exist');
    }
    res.status(200);
    res.json({ message: `Get specific book with id: ${book.id}`, payload: book });
  } catch (error) {
    next(error);
  }
};

// @desc GET book comments
// @route GET api/books/:bookId
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

    const comments = await Comment.find({ bookId: req.params.bookId });

    res.status(200);
    res.json({ message: 'All comments for the book', payload: comments });
  } catch (error) {
    next(error);
  }
};

// @desc POST a book
// @route POST api/books
// @access Private/admin
const createBook = async (req, res, next) => {
  try {
    if (!req.user.id || !req.body.title || !req.body.author || !req.body.description) {
      res.status(400);
      throw new Error('Missing required book data.');
    }
    const book = await Book.create({
      user: req.user.id, // Coming from the auth middleware
      title: req.body.title,
      author: req.body.author,
      description: req.body.description,
    });

    res.status(200);
    res.json({ message: `Create specific book with name: ${book.title}`, payload: book });
  } catch (error) {
    next(error);
  }
};

// @desc UPDATE a specific book
// @route PUT api/books/:bookId
// @access Private/admin
const updateBook = async (req, res, next) => {
  try {
    if (!req.params.bookId.match(/^[0-9a-fA-F]{24}$/)) {
      // Checking if Id formad is correct before querying with wrong id
      res.status(400);
      throw new Error('Invalid book Id');
    }

    // Check if user found after authorization
    if (!req.user.id) {
      res.status(401);
      throw new Error('User not found');
    }

    const book = await Book.findById(req.params.bookId);
    if (!book) {
      res.status(400);
      throw new Error('Book with this id does not exist');
    }

    const update = { user: req.user.id, ...req.body }; // When another admin updates, we want to update the relational user id of the admin
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, update, { new: true });
    res.status(200);
    res.json({ message: `Update a book with id: ${updatedBook.id}`, payload: updatedBook });
  } catch (error) {
    next(error);
  }
};

// @desc DELETE specific book
// @route DELETE api/books/:bookId
// @access Private/admin
const deleteBook = async (req, res, next) => {
  try {
    if (!req.params.bookId.match(/^[0-9a-fA-F]{24}$/)) {
      // Checking if Id formad is correct before querying with wrong id
      res.status(400);
      throw new Error('Invalid book Id');
    }

    // Check if user found after authorization
    if (!req.user.id) {
      res.status(401);
      throw new Error('User not found');
    }

    const book = await Book.findById(req.params.bookId);
    if (!book) {
      res.status(400);
      throw new Error('Book with this id does not exist');
    }
    book.remove();
    res.status(200);
    res.json({ message: `Delete a book}`, id: req.params.bookId });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllBooks,
  getBook,
  getBookComments,
  createBook,
  updateBook,
  deleteBook,
};
