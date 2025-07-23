const Book = require('../models/Book');

exports.addBook = async (req, res) => {
  try {
    const { title, author, genre, description, image, price } = req.body;
    if (!title || !author || !genre || !description || !image || price === undefined) {
      return res.status(400).json({ message: 'All fields are required.' });
    }
    const book = await Book.create({ title, author, genre, description, image, price, user: req.userId });
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

exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found.' });
    if (book.user.toString() !== req.userId) return res.status(403).json({ message: 'Not authorized.' });
    await book.deleteOne();
    res.json({ message: 'Book deleted.' });
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
}; 