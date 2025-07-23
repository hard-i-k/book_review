import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';

const features = [
  { title: 'Add New Books', desc: 'Share your favorite reads with the community.' },
  { title: 'Write Reviews', desc: 'Express your thoughts and help others discover great books.' },
  { title: 'Rate Books', desc: 'Give books a star rating and see what others think.' },
  { title: 'Filter & Discover', desc: 'Find books by genre, author, or rating.' },
];

const Home = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoggedIn(!!localStorage.getItem('token'));
  }, [window.location.pathname]);

  const handleAddBook = () => {
    if (loggedIn) {
      navigate('/add-book');
    } else {
      navigate('/login');
    }
  };
  const handleSeeBooks = () => {
    if (loggedIn) {
      navigate('/books');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1446] via-[#2d2250] to-[#0f0c29] flex flex-col items-center justify-center px-4 animate-fadeIn text-white dark">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center text-center w-full pt-20">
        <div className="flex flex-col items-center mb-8">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4 drop-shadow-lg tracking-tight">Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-300">BookReview</span></h1>
          <p className="text-lg md:text-2xl text-purple-200 mb-8 max-w-2xl">Discover, review, and rate your favorite books. Join our vibrant community to share your thoughts and find your next great read!</p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center mt-4">
            <button
              onClick={handleAddBook}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-xl text-xl font-bold shadow-lg hover:scale-105 hover:from-purple-600 hover:to-blue-500 transition-all duration-200"
            >
              Add a Book
            </button>
            <button
              onClick={handleSeeBooks}
              className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-8 py-4 rounded-xl text-xl font-bold shadow-lg hover:scale-105 hover:from-blue-500 hover:to-purple-600 transition-all duration-200"
            >
              See Listed Books
            </button>
          </div>
        </div>
        <section className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-8 mb-12">
          {features.map((f, i) => (
            <div key={i} className="backdrop-blur-md bg-white/10 rounded-xl shadow-lg p-6 flex flex-col items-center hover:scale-105 transition-transform duration-200 border-t-4 border-purple-700/40">
              <h3 className="font-bold text-lg text-purple-200 mb-1">{f.title}</h3>
              <p className="text-purple-300 text-sm">{f.desc}</p>
            </div>
          ))}
        </section>
      </main>
      <footer className="w-full text-center py-4 text-purple-400 text-sm">© {new Date().getFullYear()} BookReview. All rights reserved.</footer>
    </div>
  );
};

export default Home; 