const BookCard = ({ book }) => (
  <div className="bg-white/10 backdrop-blur-md rounded-xl shadow-lg p-6 flex flex-col items-center border-t-4 border-purple-700/40">
    <img src={book.image} alt={book.title} className="w-32 h-48 object-cover rounded-lg mb-4 shadow" />
    <h3 className="font-bold text-lg text-purple-200 mb-1">{book.title}</h3>
    <p className="text-purple-300 text-sm mb-1">by {book.author}</p>
    <p className="text-purple-400 text-xs mb-2">Genre: {book.genre}</p>
    <p className="text-purple-200 text-sm mb-4 line-clamp-3">{book.description}</p>
    <button className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-4 py-2 rounded-lg font-semibold shadow hover:scale-105 hover:from-blue-500 hover:to-purple-600 transition-all duration-200">Review</button>
  </div>
);

export default BookCard; 