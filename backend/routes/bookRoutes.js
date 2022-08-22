// Resource for book routes API
// API endpoint to query all the books, post new books, update books, delete books
const express = require('express');
const {
  getAllBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
} = require('../controllers/goalController');

const router = express.Router();

router.get('/', getAllBooks);
router.get('/:id', getBook);
router.post('/', createBook);
router.put('/:id', updateBook);
router.delete('/:id', deleteBook);

module.exports = router;
