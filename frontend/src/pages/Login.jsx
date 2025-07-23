import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login as loginApi } from '../api/auth';
import { HiOutlineExclamationCircle, HiOutlineCheckCircle, HiOutlineLockClosed } from 'react-icons/hi';

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-800 animate-fadeIn relative overflow-hidden text-slate-100 dark">
      <div className="absolute inset-0 bg-gradient-to-tr from-indigo-900/40 via-transparent to-violet-900/40 opacity-60 animate-gradientMove z-0" />
      <div className="w-full max-w-md mx-auto z-10">
        <form onSubmit={handleSubmit} className="backdrop-blur-md bg-slate-800/90 shadow-2xl rounded-2xl px-8 py-10 flex flex-col gap-6 border border-indigo-800/40 animate-slideIn">
          <div className="flex flex-col items-center mb-2">
            <h2 className="text-3xl font-bold text-indigo-200 text-center">Login to ReviewShelf</h2>
            <p className="text-indigo-300 text-sm mt-1">Welcome back! Please login to your account.</p>
          </div>
          {error && <div className="flex items-center gap-2 text-red-400 text-sm"><HiOutlineExclamationCircle className="w-5 h-5" />{error}</div>}
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm font-semibold text-indigo-200">Email</label>
            <input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full px-4 py-3 rounded-xl border border-indigo-800/40 bg-slate-900/60 text-slate-100 shadow focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition placeholder:text-indigo-300" placeholder="Enter your email" />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-sm font-semibold text-indigo-200">Password</label>
            <input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} required className="w-full px-4 py-3 rounded-xl border border-indigo-800/40 bg-slate-900/60 text-slate-100 shadow focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition placeholder:text-indigo-300" placeholder="Enter your password" />
          </div>
          <button type="submit" disabled={loading} className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-violet-700 text-slate-100 py-3 rounded-xl font-semibold shadow-lg hover:scale-105 hover:from-violet-700 hover:to-indigo-600 transition-all duration-200 focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed group">
            <HiOutlineLockClosed className={`w-5 h-5 transition-transform duration-200 group-hover:scale-110 ${loading ? 'animate-spin' : ''}`} />
            {loading ? 'Logging in...' : 'Login'}
          </button>
          <p className="text-center text-indigo-300 text-sm mt-2">Don't have an account? <Link to="/signup" className="text-indigo-200 font-semibold hover:underline">Sign Up</Link></p>
        </form>
      </div>
    </div>
  );
};

export default Login; 