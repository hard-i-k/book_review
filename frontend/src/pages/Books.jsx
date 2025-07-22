import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import BookCard from '../components/BookCard';

const Books = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/books`);
        setBooks(res.data);
      } catch (err) {
        setError('Failed to fetch books.');
      }
      setLoading(false);
    };
    fetchBooks();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#181c2f] via-[#2d2250] to-[#0f0c29] text-white dark">
      <Navbar />
      <div className="max-w-6xl mx-auto py-10 px-4">
        <h2 className="text-3xl font-bold mb-8">All Books</h2>
        {loading ? (
          <div className="text-center text-purple-200">Loading...</div>
        ) : error ? (
          <div className="text-center text-red-400">{error}</div>
        ) : books.length === 0 ? (
          <div className="text-center text-purple-200">No books found.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {books.map((book) => (
              <BookCard key={book._id} book={book} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Books; 