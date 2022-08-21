// @desc GET all books
// @route GET api/books/
// @access Public
const getAllBooks = (req, res) => {
  res.status(200);
  res.json({ message: 'Get all books' });
};

// @desc GET a specific book
// @route GET api/books/:id
// @access Public
const getBook = (req, res) => {
  res.status(200);
  res.json({ message: `Get specific book with id: ${req.params.id}` });
};

// @desc POST a book
// @route POST api/books
// @access Private/admin
const createBook = (req, res) => {
  if (!req.body.title) {
    // can add few more exception like body, date, etc
    res.status(400);
    throw new Error('Please add a title'); // In case of Async code we must run next(err) to handle the error
  }
  res.status(200);
  res.json({ message: `Create specific book with name: ${req.body.title}` });
};

// @desc UPDATE a specific book
// @route PUT api/books/:id
// @access Private/admin
const updateBook = (req, res) => {
  res.status(200);
  res.json({ message: `Update a book with id: ${req.params.id}` });
};

// @desc DELETE specific book
// @route DELETE api/books/:id
// @access Private/admin
const deleteBook = (req, res) => {
  res.status(200);
  res.json({ message: `Delete a book with id: ${req.params.id}` });
};

module.exports = {
  getAllBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
};
