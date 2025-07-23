import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signup as signupApi } from '../api/auth';
import { HiOutlineExclamationCircle, HiOutlineCheckCircle, HiOutlineUserAdd } from 'react-icons/hi';

const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
const validatePassword = (password) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password);

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    let valid = true;
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address.');
      valid = false;
    } else {
      setEmailError('');
    }
    if (!validatePassword(password)) {
      setPasswordError('Password must be at least 8 characters, include uppercase, lowercase, and a number.');
      valid = false;
    } else {
      setPasswordError('');
    }
    if (!valid) return;
    setLoading(true);
    try {
      await signupApi({ name, email, password });
      setSuccess(true);
      setLoading(false);
      setTimeout(() => navigate('/login'), 1200);
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-800 animate-fadeIn relative overflow-hidden text-slate-100 dark">
      <div className="absolute inset-0 bg-gradient-to-tr from-violet-900/40 via-transparent to-indigo-900/40 opacity-60 animate-gradientMove z-0" />
      <div className="w-full max-w-md mx-auto z-10">
        <form onSubmit={handleSubmit} className="backdrop-blur-md bg-slate-800/90 shadow-2xl rounded-2xl px-8 py-10 flex flex-col gap-6 border border-indigo-800/40 animate-slideIn">
          <div className="flex flex-col items-center mb-2">
            <h2 className="text-3xl font-bold text-violet-200 text-center">Sign Up for ReviewShelf</h2>
            <p className="text-violet-300 text-sm mt-1">Create your free account and start reviewing books!</p>
          </div>
          {error && <div className="flex items-center gap-2 text-red-400 text-sm"><HiOutlineExclamationCircle className="w-5 h-5" />{error}</div>}
          {success && <div className="flex items-center gap-2 text-green-400 text-sm"><HiOutlineCheckCircle className="w-5 h-5" />Signup successful! Redirecting...</div>}
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-sm font-semibold text-violet-200">Name</label>
            <input id="name" type="text" value={name} onChange={e => setName(e.target.value)} required className="w-full px-4 py-3 rounded-xl border border-indigo-800/40 bg-slate-900/60 text-slate-100 shadow focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-violet-400 transition placeholder:text-violet-300" placeholder="Enter your name" />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm font-semibold text-violet-200">Email</label>
            <input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full px-4 py-3 rounded-xl border border-indigo-800/40 bg-slate-900/60 text-slate-100 shadow focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-violet-400 transition placeholder:text-violet-300" placeholder="Enter your email" />
            {emailError && <span className="flex items-center gap-1 text-red-400 text-xs mt-1"><HiOutlineExclamationCircle className="w-4 h-4" />{emailError}</span>}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-sm font-semibold text-violet-200">Password</label>
            <input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} required className="w-full px-4 py-3 rounded-xl border border-indigo-800/40 bg-slate-900/60 text-slate-100 shadow focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-violet-400 transition placeholder:text-violet-300" placeholder="Enter your password" />
            {passwordError && <span className="flex items-center gap-1 text-red-400 text-xs mt-1"><HiOutlineExclamationCircle className="w-4 h-4" />{passwordError}</span>}
          </div>
          <button type="submit" disabled={loading} className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-violet-700 to-indigo-600 text-slate-100 py-3 rounded-xl font-semibold shadow-lg hover:scale-105 hover:from-indigo-600 hover:to-violet-700 transition-all duration-200 focus:ring-2 focus:ring-violet-400 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed group">
            <HiOutlineUserAdd className={`w-5 h-5 transition-transform duration-200 group-hover:scale-110 ${loading ? 'animate-spin' : ''}`} />
            {loading ? 'Signing up...' : 'Sign Up'}
          </button>
          <p className="text-center text-violet-300 text-sm mt-2">Already have an account? <Link to="/login" className="text-violet-200 font-semibold hover:underline">Login</Link></p>
        </form>
      </div>
    </div>
  );
};

export default Signup; 