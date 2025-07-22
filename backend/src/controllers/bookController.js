const Book = require('../models/Book');

exports.addBook = async (req, res) => {
  try {
    const { title, author, genre, description, image } = req.body;
    if (!title || !author || !genre || !description || !image) {
      return res.status(400).json({ message: 'All fields are required.' });
    }
    const book = await Book.create({ title, author, genre, description, image });
    res.status(201).json(book);
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
};

exports.getBooks = async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
}; 