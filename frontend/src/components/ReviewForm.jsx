import { useState } from 'react';
import { addReview } from '../api/reviews';
import StarRating from './StarRating';

const ReviewForm = ({ bookId, onReviewAdded }) => {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const isLoggedIn = !!localStorage.getItem('token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);
    try {
      const token = localStorage.getItem('token');
      await addReview(bookId, { rating, review_text: reviewText }, token);
      setSuccess(true);
      setRating(0);
      setReviewText('');
      onReviewAdded && onReviewAdded();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit review.');
    }
    setLoading(false);
  };

  if (!isLoggedIn) return null;

  return (
    <form onSubmit={handleSubmit} className="bg-white/80 dark:bg-white/10 rounded-xl shadow p-6 flex flex-col gap-4">
      <h4 className="text-lg font-bold text-purple-700 dark:text-purple-200 mb-2">Add Your Review</h4>
      <div className="flex items-center gap-2">
        <span className="text-purple-500">Your Rating:</span>
        <StarRating value={rating} onChange={setRating} size="text-2xl" />
      </div>
      <textarea
        value={reviewText}
        onChange={e => setReviewText(e.target.value)}
        placeholder="Write your review (optional)"
        className="px-4 py-2 rounded-lg border border-purple-200 dark:border-purple-700/40 bg-white dark:bg-white/10 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-400 transition placeholder:text-purple-400 resize-none min-h-[80px]"
      />
      {error && <div className="text-red-500 dark:text-red-400 text-sm text-center">{error}</div>}
      {success && <div className="text-green-600 dark:text-green-400 text-sm text-center">Review submitted!</div>}
      <button
        type="submit"
        disabled={loading || rating === 0}
        className="bg-gradient-to-r from-purple-500 to-blue-400 dark:from-purple-600 dark:to-blue-500 text-white py-2 rounded-lg font-semibold shadow hover:scale-105 transition-all duration-200 focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? 'Submitting...' : 'Submit Review'}
      </button>
    </form>
  );
};

export default ReviewForm; 