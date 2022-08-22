const Book = require('../models/bookModel');

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
// @route GET api/books/:id
// @access Public
const getBook = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      res.status(400);
      throw new Error('Book with this id does not exist');
    }
    res.status(200);
    res.json({ message: `Get specific book with id: ${req.params.id}`, payload: book });
  } catch (error) {
    next(error);
  }
};

// @desc POST a book
// @route POST api/books
// @access Private/admin
const createBook = async (req, res, next) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.description) {
      res.status(400);
      throw new Error('Missing required book data.');
    }
    const book = await Book.create({
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
// @route PUT api/books/:id
// @access Private/admin
const updateBook = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      res.status(400);
      throw new Error('Book with this id does not exist');
    }

    const update = req.body;
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, update, { new: true });
    res.status(200);
    res.json({ message: `Update a book with id: ${req.params.id}`, payload: updatedBook });
  } catch (error) {
    next(error);
  }
};

// @desc DELETE specific book
// @route DELETE api/books/:id
// @access Private/admin
const deleteBook = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      res.status(400);
      throw new Error('Book with this id does not exist');
    }
    book.remove();
    res.status(200);
    res.json({ message: `Delete a book with id: ${req.params.id}`, id: req.params.id });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
};
