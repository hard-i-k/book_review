import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const features = [
  {
    title: 'Add New Books',
    desc: 'Share your favorite reads with the community.',
    icon: null,
  },
  {
    title: 'Write Reviews',
    desc: 'Express your thoughts and help others discover great books.',
    icon: null,
  },
  {
    title: 'Rate Books',
    desc: 'Give books a star rating and see what others think.',
    icon: null,
  },
  {
    title: 'Filter & Discover',
    desc: 'Find books by genre, author, or rating.',
    icon: null,
  },
];

const Home = () => (
  <div className="min-h-screen bg-gradient-to-br from-[#181c2f] via-[#2d2250] to-[#0f0c29] flex flex-col items-center justify-center px-4 animate-fadeIn text-white dark">
    <Navbar />
    <main className="flex-1 flex flex-col items-center justify-center text-center w-full">
      <div className="flex flex-col items-center mb-8">
        <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4 drop-shadow-lg tracking-tight">Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-300">BookReview</span></h1>
        <p className="text-lg md:text-2xl text-purple-200 mb-8 max-w-2xl">Discover, review, and rate your favorite books. Join our vibrant community to share your thoughts and find your next great read!</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/signup" className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg hover:scale-105 hover:from-blue-500 hover:to-purple-600 transition-all duration-200">Get Started</Link>
          <Link to="/login" className="bg-white/10 text-purple-200 border border-purple-400 px-8 py-3 rounded-full text-lg font-semibold shadow hover:bg-purple-900/30 transition-all duration-200">Login</Link>
        </div>
      </div>
      <section className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-8 mb-12">
        {features.map((f, i) => (
          <div key={i} className="backdrop-blur-md bg-white/10 rounded-xl shadow-lg p-6 flex flex-col items-center hover:scale-105 transition-transform duration-200 border-t-4 border-purple-700/40">
            {/* Optionally add SVG icons here for a more aesthetic look */}
            <h3 className="font-bold text-lg text-purple-200 mb-1">{f.title}</h3>
            <p className="text-purple-300 text-sm">{f.desc}</p>
          </div>
        ))}
      </section>
    </main>
    <footer className="w-full text-center py-4 text-purple-400 text-sm">© {new Date().getFullYear()} BookReview. All rights reserved.</footer>
  </div>
);

export default Home; 