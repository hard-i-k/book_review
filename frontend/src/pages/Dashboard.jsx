import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    // Fetch user info from backend
    const fetchUserAndBooks = async () => {
      try {
        const userRes = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/user/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(userRes.data);
        const booksRes = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/books`);
        setBooks(booksRes.data.filter(b => b.user === userRes.data._id));
      } catch (err) {
        setError('Failed to fetch user info or books.');
      }
      setLoading(false);
    };
    fetchUserAndBooks();
    // eslint-disable-next-line
  }, []);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-800 text-slate-100 dark">
      <Navbar />
      <div className="max-w-3xl mx-auto py-10 px-4 pt-20">
        <h2 className="text-3xl font-bold mb-6 text-indigo-200">User Dashboard</h2>
        <div className="bg-slate-800/80 rounded-xl shadow-lg p-6 mb-8 border border-indigo-800/40">
          <div className="mb-2"><span className="font-semibold text-indigo-300">Name:</span> {user.name}</div>
          <div><span className="font-semibold text-indigo-300">Email:</span> {user.email}</div>
        </div>
        <h3 className="text-2xl font-bold mb-4 text-indigo-200">Books Added by You</h3>
        {loading ? (
          <div className="text-indigo-200">Loading...</div>
        ) : error ? (
          <div className="text-red-400">{error}</div>
        ) : books.length === 0 ? (
          <div className="text-indigo-400">You haven't added any books yet.</div>
        ) : (
          <div className="flex flex-col gap-4">
            {books.map(book => (
              <Link
                to={`/books/${book._id}`}
                key={book._id}
                className="bg-slate-800/60 hover:bg-indigo-900/30 rounded-lg p-4 flex items-center gap-4 shadow transition border border-indigo-800/40"
              >
                <img src={book.image} alt={book.title} className="w-16 h-24 object-cover rounded shadow" />
                <div>
                  <div className="font-bold text-lg text-indigo-200">{book.title}</div>
                  <div className="text-indigo-400 text-sm">Genre: {book.genre}</div>
                  <div className="text-violet-400 text-sm">₹{book.price?.toFixed(2)}</div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard; 