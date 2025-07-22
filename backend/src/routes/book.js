const express = require('express');
const router = express.Router();
const { addBook, getBooks } = require('../controllers/bookController');
const auth = require('../middleware/authMiddleware');

router.post('/', auth, addBook);
router.get('/', getBooks);

module.exports = router; 