import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BookRatingsProvider } from './context/BookRatingsContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BookRatingsProvider>
      <App />
    </BookRatingsProvider>
  </React.StrictMode>
);
