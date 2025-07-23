import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Navbar = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoggedIn(!!localStorage.getItem('token'));
  }, [window.location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);
    navigate('/login');
  };

  const handleAuthNav = (path) => {
    if (loggedIn) {
      navigate(path);
    } else {
      navigate('/login');
    }
  };

  return (
    <nav className="w-full fixed top-0 left-0 z-50 flex justify-between items-center py-4 px-6 bg-gradient-to-r from-[#1a1446] via-[#2d2250] to-[#0f0c29] border-b border-purple-900">
      <Link to="/" className="text-3xl font-extrabold text-white tracking-tight drop-shadow hover:text-purple-300 transition-all duration-200">BookReview</Link>
      <div className="flex items-center gap-4">
        <button
          onClick={() => handleAuthNav('/add-book')}
          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-5 py-2 rounded-lg font-semibold hover:scale-105 hover:from-purple-600 hover:to-blue-500 transition-all duration-200"
        >
          Add Book
        </button>
        <button
          onClick={() => handleAuthNav('/books')}
          className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-5 py-2 rounded-lg font-semibold hover:scale-105 hover:from-blue-500 hover:to-purple-600 transition-all duration-200"
        >
          See Books
        </button>
        {loggedIn ? (
          <>
            <button
              onClick={() => navigate('/dashboard')}
              className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-5 py-2 rounded-lg font-semibold hover:scale-105 hover:from-blue-500 hover:to-green-500 transition-all duration-200"
            >
              Profile
            </button>
            <button
              onClick={handleLogout}
              className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-5 py-2 rounded-lg font-semibold hover:scale-105 hover:from-pink-500 hover:to-red-500 transition-all duration-200"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-5 py-2 rounded-lg font-semibold hover:scale-105 hover:from-purple-600 hover:to-blue-500 transition-all duration-200">Login</Link>
            <Link to="/signup" className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-5 py-2 rounded-lg font-semibold hover:scale-105 hover:from-blue-500 hover:to-purple-600 transition-all duration-200">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 