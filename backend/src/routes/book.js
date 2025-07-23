const express = require('express');
const router = express.Router();
const { addBook, getBooks, deleteBook } = require('../controllers/bookController');
const auth = require('../middleware/authMiddleware');

router.post('/', auth, addBook);
router.get('/', getBooks);
router.delete('/:id', auth, deleteBook);

module.exports = router; 