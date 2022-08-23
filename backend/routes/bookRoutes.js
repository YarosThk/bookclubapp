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
const adminAuthMiddleware = require('../middleware/adminAuthMiddleware');

const router = express.Router();

// '/api/books'
router.get('/', getAllBooks);
router.get('/:bookId', getBook);
router.get('/:bookId/comments', getBookComments); // Get all comments for a specific book
// router.get('/by/userId', getBooksByUser)
router.post('/', authMiddleware, adminAuthMiddleware, createBook); // Should be done by Admin role
router.put('/:bookId', authMiddleware, adminAuthMiddleware, updateBook); // Should be done by Admin role
router.delete('/:bookId', authMiddleware, adminAuthMiddleware, deleteBook); // Should be done by Admin role

module.exports = router;
