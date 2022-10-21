// Resource for book routes API
// API endpoint to query all the books, post new books, update books, delete books
const express = require('express');
const {
  upload,
  getAllBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
} = require('../controllers/bookController');
const { getBookComments } = require('../controllers/commentController');
const authMiddleware = require('../middleware/authMiddleware');
const adminCheck = require('../middleware/adminCheck');

const router = express.Router();

// '/api/books'
router.get('/', getAllBooks);
router.get('/:bookId', getBook);
router.get('/:bookId/comments', getBookComments); // Get all comments for a specific book.
router.post('/', authMiddleware, adminCheck, upload.single('bookCover'), createBook); // Should be done by Admin role
router.put('/:bookId', authMiddleware, adminCheck, upload.single('bookCover'), updateBook); // Should be done by Admin role
router.delete('/:bookId', authMiddleware, adminCheck, deleteBook); // Should be done by Admin role, regardless of which admin created a book

module.exports = router;
