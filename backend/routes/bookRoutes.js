// Resource for book routes API
// API endpoint to query all the books, post new books, update books, delete books
const express = require('express');
const {
  getAllBooks,
  getBook,
  getBookComments,
  createBook,
  updateBook,
  deleteBook,
} = require('../controllers/bookController');
const authMiddleware = require('../middleware/authMiddleware');
const adminCheck = require('../middleware/adminCheck');

const router = express.Router();

// '/api/books'
router.get('/', getAllBooks);
router.get('/:bookId', getBook);
router.get('/:bookId/comments', getBookComments); // Get all comments for a specific book. Maybe should be inside commentRoutes, and inside commentController
router.post('/', authMiddleware, adminCheck, createBook); // Should be done by Admin role
router.put('/:bookId', authMiddleware, adminCheck, updateBook); // Should be done by Admin role
router.delete('/:bookId', authMiddleware, adminCheck, deleteBook); // Should be done by Admin role

module.exports = router;
