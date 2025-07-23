const mongoose = require('mongoose');
const Review = require('../models/Review');
const Book = require('../models/Book');

exports.addReview = async (req, res) => {
  try {
    const { rating, review_text } = req.body;
    const { bookId } = req.params;
    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'Rating must be between 1 and 5.' });
    }
    const review = await Review.create({
      book: bookId,
      user: req.userId,
      rating,
      review_text,
    });
    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
};

exports.getReviews = async (req, res) => {
  try {
    const { bookId } = req.params;
    const reviews = await Review.find({ book: bookId })
      .populate('user', 'name')
      .sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
};

exports.getAverageRating = async (req, res) => {
  try {
    const { bookId } = req.params;
    console.log('Fetching average rating for bookId:', bookId);
    if (!mongoose.Types.ObjectId.isValid(bookId)) {
      console.log('Invalid bookId:', bookId);
      return res.status(400).json({ avgRating: 0, count: 0, message: 'Invalid bookId' });
    }
    const result = await Review.aggregate([
      { $match: { book: new mongoose.Types.ObjectId(bookId) } },
      { $group: { _id: '$book', avgRating: { $avg: '$rating' }, count: { $sum: 1 } } },
    ]);
    console.log('Aggregation result:', result);
    if (result.length === 0) {
      return res.json({ avgRating: 0, count: 0 });
    }
    res.json({ avgRating: result[0].avgRating, count: result[0].count });
  } catch (err) {
    console.error('Error in getAverageRating:', err);
    res.status(500).json({ message: 'Server error.' });
  }
}; 