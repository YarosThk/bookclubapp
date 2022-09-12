const Book = require('../models/bookModel');

// @desc GET all books
// @route GET api/books/?page=1
// @access Public
const getAllBooks = async (req, res, next) => {
  // As pointed out in internet resources this is not a really scalable way, since skip is not really efficient with big colletions
  // Also if any new document is inserted in between queries, we can have repeated document on a new page from previous page.
  // Another solutions is to implement some kind of cursor based on timestamps.
  try {
    const page = parseInt(req.query.page, 10) || 1; // Queried page
    const pageSize = 5; // Books per page

    const documentsCount = await Book.countDocuments();
    const totalPages = Math.ceil(documentsCount / pageSize);

    // Maybe need an if clause to check that page should not be bigget than totalPages
    const results = await Book.find()
      .limit(pageSize)
      .skip(pageSize * (page - 1))
      .sort('-createdAt');

    res.status(200);
    res.json({
      paginationInfo: { page, totalPages, pageSize, documentsCount },
      payload: results,
    });
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
    res.json(book);
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
    res.json({ book });
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
    res.json({ updatedBook });
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
    res.json({ id: req.params.bookId });
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
