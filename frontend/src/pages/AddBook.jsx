import { useState, useRef } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

const AddBook = () => {
  const [form, setForm] = useState({ title: '', author: '', genre: '', description: '', image: '', price: '' });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const fileInputRef = useRef();

  const validate = () => {
    const errs = {};
    if (!form.title.trim()) errs.title = 'Title is required.';
    if (!form.author.trim()) errs.author = 'Author is required.';
    if (!form.genre.trim()) errs.genre = 'Genre is required.';
    if (!form.description.trim()) errs.description = 'Description is required.';
    if (!form.price || isNaN(form.price) || Number(form.price) <= 0) errs.price = 'Price must be a positive number.';
    if (!imageFile) errs.image = 'Book cover image is required.';
    setFieldErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (file) => {
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
    setUploadProgress(0);
  };

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    if (file) handleImageChange(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleImageChange(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleUploadProgress = (percent) => {
    setUploadProgress(percent);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    if (!validate()) return;
    setLoading(true);
    try {
      let base64Image = '';
      if (imageFile) {
        base64Image = await toBase64(imageFile, handleUploadProgress);
      }
      const token = localStorage.getItem('token');
      await axios.post(
        `${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/books`,
        { ...form, image: base64Image, price: Number(form.price) },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSuccess(true);
      setForm({ title: '', author: '', genre: '', description: '', image: '', price: '' });
      setImageFile(null);
      setImagePreview(null);
      setUploadProgress(0);
      setFieldErrors({});
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add book.');
    }
    setLoading(false);
  };

  const toBase64 = (file, onProgress) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadstart = () => onProgress(0);
      reader.onprogress = (event) => {
        if (event.lengthComputable) {
          const percent = Math.round((event.loaded / event.total) * 100);
          onProgress(percent);
        }
      };
      reader.onload = () => {
        onProgress(100);
        resolve(reader.result);
      };
      reader.onerror = (error) => reject(error);
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-100 to-blue-100 text-gray-900 dark:bg-gradient-to-br dark:from-[#181c2f] dark:via-[#2d2250] dark:to-[#0f0c29] dark:text-white">
      <Navbar />
      <div className="flex flex-col items-center justify-center py-10 pt-20">
        <h2 className="text-3xl font-bold mb-6 text-purple-700 dark:text-purple-200">Add a New Book</h2>
        <form onSubmit={handleSubmit} className="bg-white/80 dark:bg-white/10 backdrop-blur-md shadow-xl rounded-2xl px-10 py-8 w-full max-w-lg flex flex-col gap-6 border border-purple-200 dark:border-purple-700/40">
          {error && <div className="text-red-500 dark:text-red-400 text-center text-sm">{error}</div>}
          {success && <div className="text-green-600 dark:text-green-400 text-center text-sm">Book added successfully!</div>}
          <div>
            <label htmlFor="title" className="block mb-1 font-semibold text-purple-700 dark:text-purple-200">Title</label>
            <input id="title" name="title" value={form.title} onChange={handleChange} required placeholder="Title" className={`px-4 py-2 rounded-lg border ${fieldErrors.title ? 'border-red-400' : 'border-purple-200 dark:border-purple-700/40'} bg-white dark:bg-white/10 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-400 transition placeholder:text-purple-400 w-full`} />
            {fieldErrors.title && <span className="text-red-400 text-xs mt-1">{fieldErrors.title}</span>}
          </div>
          <div>
            <label htmlFor="author" className="block mb-1 font-semibold text-purple-700 dark:text-purple-200">Author</label>
            <input id="author" name="author" value={form.author} onChange={handleChange} required placeholder="Author" className={`px-4 py-2 rounded-lg border ${fieldErrors.author ? 'border-red-400' : 'border-purple-200 dark:border-purple-700/40'} bg-white dark:bg-white/10 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-400 transition placeholder:text-purple-400 w-full`} />
            {fieldErrors.author && <span className="text-red-400 text-xs mt-1">{fieldErrors.author}</span>}
          </div>
          <div>
            <label htmlFor="genre" className="block mb-1 font-semibold text-purple-700 dark:text-purple-200">Genre</label>
            <input id="genre" name="genre" value={form.genre} onChange={handleChange} required placeholder="Genre" className={`px-4 py-2 rounded-lg border ${fieldErrors.genre ? 'border-red-400' : 'border-purple-200 dark:border-purple-700/40'} bg-white dark:bg-white/10 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-400 transition placeholder:text-purple-400 w-full`} />
            {fieldErrors.genre && <span className="text-red-400 text-xs mt-1">{fieldErrors.genre}</span>}
          </div>
          <div>
            <label htmlFor="price" className="block mb-1 font-semibold text-purple-700 dark:text-purple-200">Price</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-400">₹</span>
              <input id="price" name="price" value={form.price} onChange={handleChange} required type="number" min="0" step="0.01" placeholder="Price (in ₹)" className={`pl-8 px-4 py-2 rounded-lg border ${fieldErrors.price ? 'border-red-400' : 'border-purple-200 dark:border-purple-700/40'} bg-white dark:bg-white/10 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-400 transition placeholder:text-purple-400 w-full`} />
            </div>
            {fieldErrors.price && <span className="text-red-400 text-xs mt-1">{fieldErrors.price}</span>}
          </div>
          <div>
            <label htmlFor="description" className="block mb-1 font-semibold text-purple-700 dark:text-purple-200">Description</label>
            <textarea id="description" name="description" value={form.description} onChange={handleChange} required placeholder="Description" className={`px-4 py-2 rounded-lg border ${fieldErrors.description ? 'border-red-400' : 'border-purple-200 dark:border-purple-700/40'} bg-white dark:bg-white/10 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-400 transition placeholder:text-purple-400 resize-none min-h-[100px] w-full`} />
            {fieldErrors.description && <span className="text-red-400 text-xs mt-1">{fieldErrors.description}</span>}
          </div>
          <div
            className={`flex flex-col items-center justify-center border-2 border-dashed ${fieldErrors.image ? 'border-red-400' : 'border-purple-300 dark:border-purple-700/40'} rounded-lg p-6 bg-white/60 dark:bg-white/10 cursor-pointer hover:bg-purple-100/60 dark:hover:bg-purple-900/20 transition relative`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={() => fileInputRef.current.click()}
          >
            {imagePreview ? (
              <img src={imagePreview} alt="Preview" className="w-32 h-48 object-cover rounded-lg mb-2 shadow" />
            ) : (
              <span className="text-purple-500 dark:text-purple-300 text-sm">Drag & drop book cover here, or click to select</span>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleFileInput}
              ref={fileInputRef}
              className="hidden"
            />
            {fieldErrors.image && <span className="text-red-400 text-xs mt-1">{fieldErrors.image}</span>}
            {uploadProgress > 0 && uploadProgress < 100 && (
              <div className="w-full mt-2">
                <div className="h-2 bg-purple-200 dark:bg-purple-900/30 rounded-full overflow-hidden">
                  <div
                    className="h-2 bg-gradient-to-r from-purple-400 to-blue-400 dark:from-purple-600 dark:to-blue-500 rounded-full transition-all duration-200"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
                <div className="text-xs text-purple-500 dark:text-purple-300 mt-1 text-center">Uploading: {uploadProgress}%</div>
              </div>
            )}
          </div>
          <button type="submit" disabled={loading} className="bg-gradient-to-r from-purple-500 to-blue-400 dark:from-purple-600 dark:to-blue-500 text-white py-2 rounded-lg font-semibold shadow-lg hover:scale-105 hover:from-blue-500 hover:to-purple-600 transition-all duration-200 focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed">
            {loading ? 'Adding...' : 'Add Book'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBook; 