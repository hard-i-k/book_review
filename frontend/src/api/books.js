import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const addBook = async (bookData, token) => {
  const res = await axios.post(
    `${API_URL}/books`,
    bookData,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};

export const getBookById = async (id) => {
  const res = await axios.get(`${API_URL}/books`);
  // The backend returns all books, so we filter client-side
  return res.data.find((b) => b._id === id);
};

export const getBookAvgRating = async (id) => {
  const res = await axios.get(`${API_URL}/reviews/${id}/average`);
  return res.data;
};

export const getBookReviews = async (id) => {
  const res = await axios.get(`${API_URL}/reviews/${id}`);
  return res.data;
};

// You can add more book-related API calls here, e.g. getBooks, deleteBook, etc. 