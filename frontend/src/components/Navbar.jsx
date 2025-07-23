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
    <nav className="w-full fixed top-0 left-0 z-50 flex justify-between items-center py-4 px-6 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-800 border-b border-indigo-900/60 shadow-lg">
      <Link to="/" className="text-3xl font-extrabold text-indigo-200 tracking-tight drop-shadow hover:text-violet-300 transition-all duration-200">ReviewShelf</Link>
      <div className="flex items-center gap-4">
        <button
          onClick={() => handleAuthNav('/add-book')}
          className="bg-gradient-to-r from-indigo-600 to-violet-700 text-slate-100 px-5 py-2 rounded-lg font-semibold shadow hover:scale-105 hover:from-violet-700 hover:to-indigo-600 transition-all duration-200"
        >
          Add Book
        </button>
        <button
          onClick={() => handleAuthNav('/books')}
          className="bg-gradient-to-r from-violet-700 to-indigo-600 text-slate-100 px-5 py-2 rounded-lg font-semibold shadow hover:scale-105 hover:from-indigo-600 hover:to-violet-700 transition-all duration-200"
        >
          See Books
        </button>
        {loggedIn ? (
          <>
            <button
              onClick={() => navigate('/dashboard')}
              className="bg-gradient-to-r from-indigo-500 to-violet-600 text-slate-100 px-5 py-2 rounded-lg font-semibold shadow hover:scale-105 hover:from-violet-600 hover:to-indigo-500 transition-all duration-200"
            >
              Profile
            </button>
            <button
              onClick={handleLogout}
              className="bg-gradient-to-r from-slate-700 to-indigo-800 text-slate-200 px-5 py-2 rounded-lg font-semibold shadow hover:scale-105 hover:from-indigo-800 hover:to-slate-700 transition-all duration-200"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="bg-gradient-to-r from-indigo-600 to-violet-700 text-slate-100 px-5 py-2 rounded-lg font-semibold shadow hover:scale-105 hover:from-violet-700 hover:to-indigo-600 transition-all duration-200">Login</Link>
            <Link to="/signup" className="bg-gradient-to-r from-violet-700 to-indigo-600 text-slate-100 px-5 py-2 rounded-lg font-semibold shadow hover:scale-105 hover:from-indigo-600 hover:to-violet-700 transition-all duration-200">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 