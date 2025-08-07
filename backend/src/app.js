const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load env vars
dotenv.config();

// Connect to DB
connectDB();

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/books', require('./routes/book'));
app.use('/api/reviews', require('./routes/review'));
app.use('/api/user', require('./routes/user'));

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Server error.' });
});

const SELF_PING_URL = 'https://book-review-jkfz.onrender.com/'; 
const SELF_PING_INTERVAL = 30000; 
function selfPing() {
  axios.get(SELF_PING_URL)
    .then(response => {
      console.log(`Self-ping at ${new Date().toISOString()}: Status ${response.status}`);
    })
    .catch(error => {
      console.error(`Self-ping error at ${new Date().toISOString()}:`, error.message);
    });
}

setInterval(selfPing, SELF_PING_INTERVAL);

module.exports = app;
