import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signup as signupApi } from '../api/auth';

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f0c29] via-[#2d2250] to-[#181c2f] animate-fadeIn relative overflow-hidden text-white dark">
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/40 via-transparent to-purple-900/40 opacity-60 animate-gradientMove z-0" />
      <form onSubmit={handleSubmit} className="relative z-10 backdrop-blur-md bg-white/10 shadow-2xl rounded-2xl px-10 py-8 w-full max-w-md flex flex-col gap-6 border border-blue-700/40 animate-slideIn">
        <div className="flex flex-col items-center mb-2">
          <h2 className="text-3xl font-bold text-blue-200 text-center">Sign Up for BookReview</h2>
          <p className="text-blue-300 text-sm mt-1">Create your free account and start reviewing books!</p>
        </div>
        {error && <div className="text-red-400 text-center text-sm">{error}</div>}
        {success && <div className="text-green-400 text-center text-sm">Signup successful! Redirecting...</div>}
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-sm font-semibold text-blue-200">Name</label>
          <input id="name" type="text" value={name} onChange={e => setName(e.target.value)} required className="px-4 py-2 rounded-lg border border-blue-700/40 bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition" placeholder="Enter your name" />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm font-semibold text-blue-200">Email</label>
          <input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required className="px-4 py-2 rounded-lg border border-blue-700/40 bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition" placeholder="Enter your email" />
          {emailError && <span className="text-red-400 text-xs mt-1">{emailError}</span>}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="text-sm font-semibold text-blue-200">Password</label>
          <input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} required className="px-4 py-2 rounded-lg border border-blue-700/40 bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition" placeholder="Enter your password" />
          {passwordError && <span className="text-red-400 text-xs mt-1">{passwordError}</span>}
        </div>
        <button type="submit" disabled={loading} className="bg-gradient-to-r from-blue-600 to-purple-500 text-white py-2 rounded-lg font-semibold shadow-lg hover:scale-105 hover:from-purple-500 hover:to-blue-600 transition-all duration-200 focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed">{loading ? 'Signing up...' : 'Sign Up'}</button>
        <p className="text-center text-blue-300 text-sm mt-2">Already have an account? <Link to="/login" className="text-blue-200 font-semibold hover:underline">Login</Link></p>
      </form>
    </div>
  );
};

export default Signup; 