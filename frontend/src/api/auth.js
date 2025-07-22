import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/auth';

export const signup = async ({ name, email, password }) => {
  const res = await axios.post(`${API_URL}/register`, { name, email, password });
  return res.data;
};

export const login = async ({ email, password }) => {
  const res = await axios.post(`${API_URL}/login`, { email, password });
  return res.data;
}; 