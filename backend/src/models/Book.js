const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true }, // base64 string
}, { timestamps: true });

module.exports = mongoose.model('Book', bookSchema); 