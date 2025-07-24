import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const addReview = async (bookId, reviewData, token) => {
  const res = await axios.post(
    `${API_URL}/reviews/${bookId}`,
    reviewData,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};

export const getBookAvgRating = async (bookId) => {
  const res = await axios.get(`${API_URL}/reviews/${bookId}/average`);
  return res.data;
}; 