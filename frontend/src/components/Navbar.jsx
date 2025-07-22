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

  return (
    <nav className="w-full flex justify-between items-center py-6 px-4 max-w-5xl mx-auto">
      <span className="text-2xl font-extrabold text-purple-300 tracking-tight drop-shadow">BookReview</span>
      <div className="flex items-center gap-4">
        <Link to="/books" className="text-purple-200 font-semibold hover:underline transition-all duration-200">Books</Link>
        {loggedIn && (
          <Link to="/add-book" className="text-purple-200 font-semibold hover:underline transition-all duration-200">Add Book</Link>
        )}
        {!loggedIn ? (
          <>
            <Link to="/login" className="text-purple-200 font-semibold hover:underline transition-all duration-200">Login</Link>
            <Link to="/signup" className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-4 py-2 rounded-lg shadow hover:from-blue-500 hover:to-purple-600 transition-all duration-200">Sign Up</Link>
          </>
        ) : (
          <>
            <button onClick={handleLogout} className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-4 py-2 rounded-lg shadow hover:from-blue-500 hover:to-purple-600 transition-all duration-200">Logout</button>
            <Link to="/dashboard" className="text-purple-200 font-semibold hover:underline transition-all duration-200">Profile</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 