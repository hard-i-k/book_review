import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getBookById, getBookAvgRating, getBookReviews } from '../api/books';
import Navbar from '../components/Navbar';
import StarRating from '../components/StarRating';
import ReviewForm from '../components/ReviewForm';
import { useBookRatings } from '../context/BookRatingsContext';

const BookDetail = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [avgRating, setAvgRating] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { setRating } = useBookRatings();

  const fetchBook = async () => {
    try {
      const found = await getBookById(id);
      setBook(found);
    } catch (err) {
      setError('Failed to fetch book.');
    }
  };

  const fetchAvgRating = async () => {
    try {
      const data = await getBookAvgRating(id);
      setAvgRating(data.avgRating || 0);
      setReviewCount(data.count || 0);
      setRating(id, data.avgRating || 0, data.count || 0);
    } catch {}
  };

  const fetchReviews = async () => {
    try {
      const data = await getBookReviews(id);
      setReviews(data);
    } catch {}
  };

  useEffect(() => {
    setLoading(true);
    Promise.all([fetchBook(), fetchAvgRating(), fetchReviews()]).then(() => setLoading(false));
    // eslint-disable-next-line
  }, [id]);

  const handleReviewAdded = () => {
    fetchAvgRating();
    fetchReviews();
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center text-purple-400">Loading...</div>;
  if (error || !book) return <div className="min-h-screen flex items-center justify-center text-red-400">{error || 'Book not found.'}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-100 to-blue-100 text-gray-900 dark:bg-gradient-to-br dark:from-[#181c2f] dark:via-[#2d2250] dark:to-[#0f0c29] dark:text-white">
      <Navbar />
      <div className="max-w-6xl mx-auto py-10 px-4 flex flex-col md:flex-row gap-8 pt-20">
        {/* Left: Book details */}
        <div className="flex-1 bg-white/80 dark:bg-white/10 rounded-2xl shadow-xl p-8 flex flex-col items-center md:items-start">
          <img src={book.image} alt={book.title} className="w-40 h-60 object-cover rounded-lg shadow mb-4" />
          <h2 className="text-3xl font-bold text-purple-700 dark:text-purple-200 mb-2">{book.title}</h2>
          <p className="text-lg text-purple-500 dark:text-purple-300">by {book.author}</p>
          <p className="text-sm text-purple-400 mb-2">Genre: {book.genre}</p>
          <p className="mb-2 text-blue-600 dark:text-blue-400 font-semibold">₹{book.price?.toFixed(2)}</p>
          <div className="flex items-center gap-2 mb-2">
            <StarRating value={avgRating} readOnly size="text-xl" />
            <span className="text-purple-500 text-sm">({reviewCount} review{reviewCount !== 1 ? 's' : ''})</span>
          </div>
          <p className="mb-4 text-gray-700 dark:text-gray-200 text-sm text-justify">{book.description}</p>
        </div>
        {/* Right: Reviews and add review */}
        <div className="flex-1 flex flex-col gap-8">
          <ReviewForm bookId={id} onReviewAdded={handleReviewAdded} />
          <div>
            <h3 className="text-2xl font-bold mb-4 text-purple-700 dark:text-purple-200">Reviews</h3>
            {reviews.length === 0 ? (
              <div className="text-purple-400">No reviews yet.</div>
            ) : (
              <div className="flex flex-col gap-6">
                {reviews.map((review) => (
                  <div key={review._id} className="bg-white/70 dark:bg-white/10 rounded-xl shadow p-4 flex flex-col gap-1">
                    <div className="flex items-center gap-2 mb-1">
                      <StarRating value={review.rating} readOnly size="text-lg" />
                      <span className="text-purple-500 text-xs">by {review.user?.name || 'User'}</span>
                      <span className="text-gray-400 text-xs ml-auto">{new Date(review.createdAt).toLocaleDateString()}</span>
                    </div>
                    {review.review_text && <div className="text-gray-700 dark:text-gray-200 text-sm">{review.review_text}</div>}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetail; 