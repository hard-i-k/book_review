import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import BookCard from '../components/BookCard';

const Books = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [genre, setGenre] = useState('');
  const [author, setAuthor] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

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
    const matchesMinPrice = minPrice !== '' ? book.price >= parseFloat(minPrice) : true;
    const matchesMaxPrice = maxPrice !== '' ? book.price <= parseFloat(maxPrice) : true;
    return matchesSearch && matchesGenre && matchesAuthor && matchesMinPrice && matchesMaxPrice;
  });

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
          <input
            type="number"
            placeholder="Min Price"
            value={minPrice}
            onChange={e => setMinPrice(e.target.value)}
            className="px-4 py-2 rounded-lg border border-purple-700/40 bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-purple-400 transition w-full md:w-1/12"
          />
          <input
            type="number"
            placeholder="Max Price"
            value={maxPrice}
            onChange={e => setMaxPrice(e.target.value)}
            className="px-4 py-2 rounded-lg border border-purple-700/40 bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-purple-400 transition w-full md:w-1/12"
          />
        </div>
        {loading ? (
          <div className="text-center text-purple-200">Loading...</div>
        ) : error ? (
          <div className="text-center text-red-400">{error}</div>
        ) : filteredBooks.length === 0 ? (
          <div className="text-center text-purple-200">No books found.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredBooks.map((book) => (
              <BookCard key={book._id} book={book} onDelete={handleDelete} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Books; 