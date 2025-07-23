const express = require('express');
const router = express.Router();
const { addReview, getReviews, getAverageRating } = require('../controllers/reviewController');
const auth = require('../middleware/authMiddleware');

router.post('/:bookId', auth, addReview);
router.get('/:bookId', getReviews);
router.get('/:bookId/average', getAverageRating);

module.exports = router; 