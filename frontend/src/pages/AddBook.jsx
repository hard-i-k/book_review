import { useState, useRef } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { HiOutlineExclamationCircle, HiOutlineCheckCircle, HiOutlineUpload } from 'react-icons/hi';

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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-800 text-slate-100 flex flex-col items-center justify-center dark">
      <Navbar />
      <div className="flex flex-col items-center justify-center py-10 pt-24 w-full">
        <div className="w-full max-w-lg mx-auto">
          <div className="bg-slate-800/90 backdrop-blur-md shadow-2xl rounded-2xl px-8 py-10 border border-indigo-800/40">
            <h2 className="text-3xl font-bold mb-2 text-indigo-200 text-center">Add a New Book</h2>
            <p className="text-indigo-300 text-center mb-6">Share your favorite reads with the community!</p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {error && <div className="flex items-center gap-2 text-red-400 text-sm mb-2"><HiOutlineExclamationCircle className="w-5 h-5" />{error}</div>}
              {success && <div className="flex items-center gap-2 text-green-400 text-sm mb-2"><HiOutlineCheckCircle className="w-5 h-5" />Book added successfully!</div>}
              <div>
                <label htmlFor="title" className="block mb-1 font-semibold text-indigo-200">Title</label>
                <input id="title" name="title" value={form.title} onChange={handleChange} required placeholder="Title" className={`w-full px-4 py-3 rounded-xl border ${fieldErrors.title ? 'border-red-400' : 'border-indigo-800/40'} bg-slate-900/60 text-slate-100 shadow focus:outline-none focus:ring-2 focus:ring-indigo-400 transition placeholder:text-indigo-300`} />
                {fieldErrors.title && <span className="flex items-center gap-1 text-red-400 text-xs mt-1"><HiOutlineExclamationCircle className="w-4 h-4" />{fieldErrors.title}</span>}
              </div>
              <div>
                <label htmlFor="author" className="block mb-1 font-semibold text-indigo-200">Author</label>
                <input id="author" name="author" value={form.author} onChange={handleChange} required placeholder="Author" className={`w-full px-4 py-3 rounded-xl border ${fieldErrors.author ? 'border-red-400' : 'border-indigo-800/40'} bg-slate-900/60 text-slate-100 shadow focus:outline-none focus:ring-2 focus:ring-indigo-400 transition placeholder:text-indigo-300`} />
                {fieldErrors.author && <span className="flex items-center gap-1 text-red-400 text-xs mt-1"><HiOutlineExclamationCircle className="w-4 h-4" />{fieldErrors.author}</span>}
              </div>
              <div>
                <label htmlFor="genre" className="block mb-1 font-semibold text-indigo-200">Genre</label>
                <input id="genre" name="genre" value={form.genre} onChange={handleChange} required placeholder="Genre" className={`w-full px-4 py-3 rounded-xl border ${fieldErrors.genre ? 'border-red-400' : 'border-indigo-800/40'} bg-slate-900/60 text-slate-100 shadow focus:outline-none focus:ring-2 focus:ring-indigo-400 transition placeholder:text-indigo-300`} />
                {fieldErrors.genre && <span className="flex items-center gap-1 text-red-400 text-xs mt-1"><HiOutlineExclamationCircle className="w-4 h-4" />{fieldErrors.genre}</span>}
              </div>
              <div>
                <label htmlFor="price" className="block mb-1 font-semibold text-indigo-200">Price</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-400">₹</span>
                  <input id="price" name="price" value={form.price} onChange={handleChange} required type="number" min="0" step="0.01" placeholder="Price (in ₹)" className={`w-full pl-8 px-4 py-3 rounded-xl border ${fieldErrors.price ? 'border-red-400' : 'border-indigo-800/40'} bg-slate-900/60 text-slate-100 shadow focus:outline-none focus:ring-2 focus:ring-indigo-400 transition placeholder:text-indigo-300`} />
                </div>
                {fieldErrors.price && <span className="flex items-center gap-1 text-red-400 text-xs mt-1"><HiOutlineExclamationCircle className="w-4 h-4" />{fieldErrors.price}</span>}
              </div>
              <div>
                <label htmlFor="description" className="block mb-1 font-semibold text-indigo-200">Description</label>
                <textarea id="description" name="description" value={form.description} onChange={handleChange} required placeholder="Description" className={`w-full px-4 py-3 rounded-xl border ${fieldErrors.description ? 'border-red-400' : 'border-indigo-800/40'} bg-slate-900/60 text-slate-100 shadow focus:outline-none focus:ring-2 focus:ring-indigo-400 transition placeholder:text-indigo-300 resize-none min-h-[100px]`} />
                {fieldErrors.description && <span className="flex items-center gap-1 text-red-400 text-xs mt-1"><HiOutlineExclamationCircle className="w-4 h-4" />{fieldErrors.description}</span>}
              </div>
              <div
                className={`flex flex-col items-center justify-center border-2 border-dashed ${fieldErrors.image ? 'border-red-400' : 'border-indigo-400'} rounded-xl p-6 bg-slate-900/40 cursor-pointer hover:bg-indigo-900/30 transition relative group`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onClick={() => fileInputRef.current.click()}
                tabIndex={0}
                aria-label="Upload book cover image"
              >
                {imagePreview ? (
                  <img src={imagePreview} alt="Preview" className="w-32 h-48 object-cover rounded-lg mb-2 shadow" />
                ) : (
                  <span className="flex items-center gap-2 text-indigo-300 text-sm"><HiOutlineUpload className="w-5 h-5" />Drag & drop book cover here, or click to select</span>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileInput}
                  ref={fileInputRef}
                  className="hidden"
                />
                {fieldErrors.image && <span className="flex items-center gap-1 text-red-400 text-xs mt-1"><HiOutlineExclamationCircle className="w-4 h-4" />{fieldErrors.image}</span>}
                {uploadProgress > 0 && uploadProgress < 100 && (
                  <div className="w-full mt-2">
                    <div className="h-2 bg-indigo-900/30 rounded-full overflow-hidden">
                      <div
                        className="h-2 bg-gradient-to-r from-indigo-400 to-violet-400 rounded-full transition-all duration-200"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                    <div className="text-xs text-indigo-300 mt-1 text-center">Uploading: {uploadProgress}%</div>
                  </div>
                )}
              </div>
              <button type="submit" disabled={loading} className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-violet-700 text-slate-100 py-3 rounded-xl font-semibold shadow-lg hover:scale-105 hover:from-violet-700 hover:to-indigo-600 transition-all duration-200 focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed group">
                <HiOutlineCheckCircle className={`w-5 h-5 transition-transform duration-200 group-hover:scale-110 ${loading ? 'animate-spin' : ''}`} />
                {loading ? 'Adding...' : 'Add Book'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBook; 