import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import BookCard from '../components/BookCard';
import { useBookRatings } from '../context/BookRatingsContext';

const Books = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [genre, setGenre] = useState('');
  const [author, setAuthor] = useState('');
  const [sortDate, setSortDate] = useState('date-desc');
  const [sortPrice, setSortPrice] = useState('');
  const [sortRating, setSortRating] = useState('');
  const { ratings } = useBookRatings();

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

  // Get unique genres and authors for filters
  const genres = Array.from(new Set(books.map(b => b.genre))).filter(Boolean);
  const authors = Array.from(new Set(books.map(b => b.author))).filter(Boolean);

  // Filter and search logic
  const filteredBooks = books.filter(book => {
    const matchesSearch =
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase()) ||
      book.genre.toLowerCase().includes(search.toLowerCase());
    const matchesGenre = genre ? book.genre === genre : true;
    const matchesAuthor = author ? book.author === author : true;
    return matchesSearch && matchesGenre && matchesAuthor;
  });

  // Sorting logic (only one sort active at a time)
  let sortedBooks = [...filteredBooks];
  if (sortRating) {
    sortedBooks.sort((a, b) => {
      const aRating = ratings[a._id]?.avgRating || 0;
      const bRating = ratings[b._id]?.avgRating || 0;
      if (sortRating === 'rating-desc') return bRating - aRating;
      if (sortRating === 'rating-asc') return aRating - bRating;
      return 0;
    });
  } else if (sortPrice) {
    sortedBooks.sort((a, b) => {
      if (sortPrice === 'price-asc') return a.price - b.price;
      if (sortPrice === 'price-desc') return b.price - a.price;
      return 0;
    });
  } else if (sortDate) {
    sortedBooks.sort((a, b) => {
      if (sortDate === 'date-desc') return new Date(b.createdAt) - new Date(a.createdAt);
      if (sortDate === 'date-asc') return new Date(a.createdAt) - new Date(b.createdAt);
      return 0;
    });
  }

  // Ensure only one sort is active at a time
  const handleSortDate = (e) => {
    setSortDate(e.target.value);
    setSortPrice('');
    setSortRating('');
  };
  const handleSortPrice = (e) => {
    setSortPrice(e.target.value);
    setSortDate('');
    setSortRating('');
  };
  const handleSortRating = (e) => {
    setSortRating(e.target.value);
    setSortDate('');
    setSortPrice('');
  };

  const handleDelete = (id) => {
    setBooks(books => books.filter(b => b._id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#181c2f] via-[#2d2250] to-[#0f0c29] text-white dark">
      <Navbar />
      <div className="max-w-6xl mx-auto py-10 px-4">
        <h2 className="text-3xl font-bold mb-8">All Books</h2>
        <div className="sticky top-0 z-10 bg-[#181c2f]/80 dark:bg-[#181c2f]/80 backdrop-blur-md rounded-xl shadow-lg flex flex-col md:flex-row md:items-end gap-4 mb-8 p-4">
          <input
            type="text"
            placeholder="Search by title, author, or genre..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="px-4 py-2 rounded-lg border border-purple-700/40 bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-purple-400 transition placeholder:text-purple-300 w-full md:w-1/3"
          />
          <select
            value={genre}
            onChange={e => setGenre(e.target.value)}
            className="px-4 py-2 rounded-lg border border-purple-700/40 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-400 transition w-full md:w-1/6"
          >
            <option value="">All Genres</option>
            {genres.map(g => <option key={g} value={g}>{g}</option>)}
          </select>
          <select
            value={author}
            onChange={e => setAuthor(e.target.value)}
            className="px-4 py-2 rounded-lg border border-purple-700/40 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-400 transition w-full md:w-1/6"
          >
            <option value="">All Authors</option>
            {authors.map(a => <option key={a} value={a}>{a}</option>)}
          </select>
          <select
            value={sortDate}
            onChange={handleSortDate}
            className="px-4 py-2 rounded-lg border border-purple-700/40 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-400 transition w-full md:w-1/6"
          >
            <option value="date-desc">Newest First</option>
            <option value="date-asc">Oldest First</option>
          </select>
          <select
            value={sortPrice}
            onChange={handleSortPrice}
            className="px-4 py-2 rounded-lg border border-purple-700/40 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-400 transition w-full md:w-1/6"
          >
            <option value="">Sort by Price</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
          <select
            value={sortRating}
            onChange={handleSortRating}
            className="px-4 py-2 rounded-lg border border-purple-700/40 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-400 transition w-full md:w-1/6"
          >
            <option value="">Sort by Rating</option>
            <option value="rating-desc">Highest Rated</option>
            <option value="rating-asc">Lowest Rated</option>
          </select>
        </div>
        {loading ? (
          <div className="text-center text-purple-200">Loading...</div>
        ) : error ? (
          <div className="text-center text-red-400">{error}</div>
        ) : sortedBooks.length === 0 ? (
          <div className="text-center text-purple-200">No books found.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {sortedBooks.map((book) => (
              <BookCard key={book._id} book={book} onDelete={handleDelete} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Books; 