import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login as loginApi } from '../api/auth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const data = await loginApi({ email, password });
      localStorage.setItem('token', data.token);
      setLoading(false);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#181c2f] via-[#2d2250] to-[#0f0c29] animate-fadeIn relative overflow-hidden text-white dark">
      <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/40 via-transparent to-blue-900/40 opacity-60 animate-gradientMove z-0" />
      <form onSubmit={handleSubmit} className="relative z-10 backdrop-blur-md bg-white/10 shadow-2xl rounded-2xl px-10 py-8 w-full max-w-md flex flex-col gap-6 border border-purple-700/40 animate-slideIn">
        <div className="flex flex-col items-center mb-2">
          <h2 className="text-3xl font-bold text-purple-200 text-center">Login to BookReview</h2>
          <p className="text-purple-300 text-sm mt-1">Welcome back! Please login to your account.</p>
        </div>
        {error && <div className="text-red-400 text-center text-sm">{error}</div>}
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm font-semibold text-purple-200">Email</label>
          <input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required className="px-4 py-2 rounded-lg border border-purple-700/40 bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition placeholder:text-purple-300" placeholder="Enter your email" />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="text-sm font-semibold text-purple-200">Password</label>
          <input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} required className="px-4 py-2 rounded-lg border border-purple-700/40 bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition placeholder:text-purple-300" placeholder="Enter your password" />
        </div>
        <button type="submit" disabled={loading} className="bg-gradient-to-r from-purple-600 to-blue-500 text-white py-2 rounded-lg font-semibold shadow-lg hover:scale-105 hover:from-blue-500 hover:to-purple-600 transition-all duration-200 focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed">
          {loading ? 'Logging in...' : 'Login'}
        </button>
        <p className="text-center text-purple-300 text-sm mt-2">Don't have an account? <Link to="/signup" className="text-purple-200 font-semibold hover:underline">Sign Up</Link></p>
      </form>
    </div>
  );
};

export default Login; 