const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const Book = require('../models/bookModel');

const removeCover = async (fileName) => {
  try {
    fs.unlinkSync(`./frontend/public/uploads/${fileName}`);
  } catch (error) {
    throw new Error(error);
  }
};
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, './frontend/public/uploads');
  },
  filename: (req, file, callback) => {
    callback(null, uuidv4() + Date.now() + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, callback) => {
  const allowedFileTypes = ['image/jpg', 'image/jpeg', 'image/png', 'image/webp'];
  if (allowedFileTypes.includes(file.mimetype)) {
    callback(null, true);
  } else {
    callback(null, false);
  }
};

const upload = multer({ storage, fileFilter });

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

// @desc GET all books
// @route GET api/users/:userId/books
// @access Private
const getUserBooks = async (req, res, next) => {
  // As pointed out in internet resources this is not a really scalable way, since skip is not really efficient with big colletions
  // Also if any new document is inserted in between queries, we can have repeated document on a new page from previous page.
  // Another solutions is to implement some kind of cursor based on timestamps.
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

    // Check if user found after authorization
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
    const pageSize = 5; // Books per page
    const documentsCount = await Book.countDocuments({ user: req.params.userId });
    const totalPages = Math.ceil(documentsCount / pageSize);

    // Maybe need an if clause to check that page should not be bigget than totalPages
    const results = await Book.find({ user: req.params.userId })
      .limit(pageSize)
      .skip(pageSize * (page - 1))
      .sort('-createdAt');

    res.status(200);
    res.json({
      payload: results,
      paginationInfo: { page, totalPages, pageSize, documentsCount },
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
      await removeCover(req.file.filename);
      res.status(400);
      throw new Error('Missing required book data.');
    }

    const book = await Book.create({
      user: req.user.id, // Coming from the auth middleware
      title: req.body.title,
      author: req.body.author,
      description: req.body.description,
      cover: req.file.filename,
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
  // when updating the book cover, i need to delete the previous
  try {
    if (!req.params.bookId.match(/^[0-9a-fA-F]{24}$/)) {
      // Checking if Id formad is correct before querying with wrong id
      await removeCover(req.file.filename);
      res.status(400);
      throw new Error('Invalid book Id');
    }

    const book = await Book.findById(req.params.bookId);
    if (!book) {
      res.status(400);
      throw new Error('Book with this id does not exist');
    }

    let newCover = null;
    // In Edit the cover is Optional because there should be a previous cover
    // so we check first if req.file exists to avoid undefined property error
    // when reading req.file.filename
    // If there is another cover though, we remove previous cover first
    if (req.file) {
      if (book.cover) {
        await removeCover(book.cover);
      }
      newCover = req.file.filename;
    } else {
      newCover = book.cover;
    }

    const update = {
      user: req.user.id,
      title: req.body.title,
      author: req.body.author,
      description: req.body.description,
      // cover: req.file.filename,
      cover: newCover,
    }; // When another admin updates, we want to update the relational user id of the admin

    const updatedBook = await Book.findByIdAndUpdate(req.params.bookId, update, { new: true });
    res.status(200);
    res.json(updatedBook);
  } catch (error) {
    next(error);
  }
};

// @desc DELETE specific book
// @route DELETE api/books/:bookId
// @access Private/admin
const deleteBook = async (req, res, next) => {
  try {
    if (!req.params.bookId) {
      res.status(400);
      throw new Error('Missing comment id parameter');
    }

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

    // Remove previous cover
    if (book.cover) {
      await removeCover(book.cover);
    }
    book.remove();
    res.status(200);
    res.json({ message: 'Book deleted', payload: book });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  upload,
  getAllBooks,
  getUserBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
};
