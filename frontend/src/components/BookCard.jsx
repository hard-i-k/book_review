import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import StarRating from './StarRating';
import axios from 'axios';
import { useBookRatings } from '../context/BookRatingsContext';

const BookCard = ({ book, onDelete }) => {
  const [isOwner, setIsOwner] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { ratings, fetchRating } = useBookRatings();
  const ratingData = ratings[book._id] || { avgRating: 0, reviewCount: 0 };

  useEffect(() => {
    if (!ratings[book._id]) fetchRating(book._id);
    // Check if current user is owner
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setIsOwner(payload.userId === book.user);
      } catch {}
    }
    // eslint-disable-next-line
  }, [book._id, book.user]);

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this book?')) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/books/${book._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      onDelete && onDelete(book._id);
    } catch {}
  };

  const truncated = book.description.length > 120 ? book.description.slice(0, 120) + '...' : book.description;

  return (
    <div className="bg-white/90 dark:bg-white/10 backdrop-blur-md rounded-xl shadow-2xl p-6 flex flex-col items-center border-t-4 border-purple-700/60 hover:shadow-3xl transition-all duration-200 relative">
      <div className="mb-2 flex items-center gap-2">
        <StarRating value={ratingData.avgRating} readOnly size="text-lg" />
        <span className="text-purple-400 text-xs">({ratingData.reviewCount})</span>
      </div>
      <img src={book.image} alt={book.title} className="w-32 h-48 object-cover rounded-lg mb-4 shadow" />
      <h3 className="font-bold text-lg text-purple-900 dark:text-purple-200 mb-1">{book.title}</h3>
      <p className="text-purple-700 dark:text-purple-300 text-sm mb-1">by {book.author}</p>
      <p className="text-purple-500 dark:text-purple-400 text-xs mb-2">Genre: {book.genre}</p>
      <p className="text-blue-600 dark:text-blue-400 text-sm font-semibold mb-2">₹{book.price?.toFixed(2)}</p>
      <p className="text-gray-700 dark:text-purple-200 text-sm mb-2 line-clamp-3">
        {truncated}
        {book.description.length > 120 && (
          <button onClick={() => setShowModal(true)} className="ml-2 text-purple-500 underline hover:text-purple-700">Read more</button>
        )}
      </p>
      <div className="flex gap-2 w-full justify-center">
        <Link to={`/books/${book._id}`} className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-4 py-2 rounded-lg font-semibold shadow hover:scale-105 hover:from-blue-500 hover:to-purple-600 transition-all duration-200">Review</Link>
        {isOwner && (
          <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold shadow hover:bg-red-700 transition-all duration-200">Delete</button>
        )}
      </div>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-white dark:bg-[#181c2f] rounded-xl shadow-xl p-6 max-w-lg w-full relative">
            <button onClick={() => setShowModal(false)} className="absolute top-2 right-2 text-xl text-purple-500 hover:text-purple-700">&times;</button>
            <h3 className="font-bold text-lg text-purple-900 dark:text-purple-200 mb-2">{book.title}</h3>
            <p className="text-gray-700 dark:text-purple-200 text-sm">{book.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookCard; 