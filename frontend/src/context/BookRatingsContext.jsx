import { createContext, useContext, useState, useCallback } from 'react';
import { getBookAvgRating } from '../api/reviews';

const BookRatingsContext = createContext();

export const useBookRatings = () => useContext(BookRatingsContext);

export const BookRatingsProvider = ({ children }) => {
  const [ratings, setRatings] = useState({}); // { [bookId]: { avgRating, reviewCount } }

  const fetchRating = useCallback(async (bookId) => {
    try {
      const data = await getBookAvgRating(bookId);
      setRatings(r => ({ ...r, [bookId]: { avgRating: data.avgRating || 0, reviewCount: data.count || 0 } }));
    } catch {
      setRatings(r => ({ ...r, [bookId]: { avgRating: 0, reviewCount: 0 } }));
    }
  }, []);

  const setRating = (bookId, avgRating, reviewCount) => {
    setRatings(r => {
      // Always return a new object reference
      return { ...r, [bookId]: { avgRating, reviewCount } };
    });
  };

  return (
    <BookRatingsContext.Provider value={{ ratings, fetchRating, setRating }}>
      {children}
    </BookRatingsContext.Provider>
  );
}; 