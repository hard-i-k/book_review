import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';

const features = [
  {
    title: '500+ Books & Counting',
    headline: 'Add Books Instantly',
    desc: 'Expand your digital shelf by adding from hundreds of titles or submit your own picks — all in just a few clicks.',
  },
  {
    title: '1,200+ Reviews Shared',
    headline: 'Share Thoughtful Reviews',
    desc: 'Join fellow readers in writing meaningful reviews that help the community discover their next favorite read.',
  },
  {
    title: 'Rated by 300+ Readers',
    headline: 'Rate with Stars',
    desc: 'Express your opinion with a 1–5 star rating system and browse books loved by hundreds of fellow book lovers.',
  },
  {
    title: 'Smart Filters with Instant Results',
    headline: 'Search by Genre, Author & More',
    desc: 'Narrow down your search with filters like genre, author, price, or rating — and find exactly what you\'re looking for.',
  },
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-800 flex flex-col items-center justify-center px-4 animate-fadeIn text-slate-100 dark">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center text-center w-full pt-20">
        <div className="flex flex-col items-center mb-8">
          <h1 className="text-5xl md:text-6xl font-extrabold text-slate-100 mb-2 drop-shadow-lg tracking-tight">Hey Reader!</h1>
          <p className="text-lg md:text-2xl text-indigo-200 mb-8 max-w-2xl">Welcome to your book-loving community. Browse, review, and join fellow readers in discovering amazing titles.</p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center mt-4">
            <button
              onClick={handleAddBook}
              className="bg-gradient-to-r from-indigo-600 to-violet-700 text-slate-100 px-8 py-4 rounded-xl text-xl font-bold shadow-lg hover:scale-105 hover:from-violet-700 hover:to-indigo-600 transition-all duration-200"
            >
              Add a Book
            </button>
            <button
              onClick={handleSeeBooks}
              className="bg-gradient-to-r from-violet-700 to-indigo-600 text-slate-100 px-8 py-4 rounded-xl text-xl font-bold shadow-lg hover:scale-105 hover:from-indigo-600 hover:to-violet-700 transition-all duration-200"
            >
              See Listed Books
            </button>
          </div>
        </div>
        <section className="w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-8 mb-12">
          {features.map((f, i) => (
            <div
              key={i}
              className={`backdrop-blur-md bg-slate-800/80 rounded-xl shadow-lg p-6 flex flex-col items-center hover:scale-105 transition-transform duration-300 border-t-4 border-indigo-800/40 animate-slideIn${i % 2 === 0 ? 'Left' : 'Right'}`}
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              <div className="font-bold text-indigo-300 text-xs uppercase tracking-wider mb-1">{f.title}</div>
              <h3 className="font-bold text-lg text-indigo-100 mb-2">{f.headline}</h3>
              <p className="text-indigo-200 text-sm">{f.desc}</p>
            </div>
          ))}
        </section>
      </main>
      <footer className="w-full text-center py-4 text-indigo-300 text-sm">© {new Date().getFullYear()} ReviewShelf. All rights reserved.</footer>
      <style>{`
        @keyframes slideInLeft { from { opacity: 0; transform: translateX(-60px); } to { opacity: 1; transform: none; } }
        @keyframes slideInRight { from { opacity: 0; transform: translateX(60px); } to { opacity: 1; transform: none; } }
        .animate-slideInLeft { animation: slideInLeft 0.7s cubic-bezier(.4,2,.6,1) both; }
        .animate-slideInRight { animation: slideInRight 0.7s cubic-bezier(.4,2,.6,1) both; }
      `}</style>
    </div>
  );
};

export default Home; 