'use client';
import React, { useState, useEffect } from 'react';

export default function ClassifiedsModule() {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({ title: '', description: '', category: 'Furniture', price: '', seller_flat: '' });

  const fetchAds = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/classifieds');
      const data = await res.json();
      setAds(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAds();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      // Assuming generic POST route logic for Classifieds
      alert('Ad Posted Successfully! (Mock submission for demo)');
      setShowAddForm(false);
      setAds([{ ...formData, id: Date.now(), createdAt: new Date() }, ...ads]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div>
            <h1 className="text-3xl font-extrabold text-blue-900">🛒 Community Classifieds</h1>
            <p className="text-gray-500 mt-2">Buy, sell, or rent items within the society.</p>
          </div>
          <div className="mt-4 sm:mt-0 space-x-3 flex">
            <a href="/" className="px-5 py-2.5 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors shadow-sm">
              Home
            </a>
            <button 
              onClick={() => setShowAddForm(!showAddForm)}
              className="px-5 py-2.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
            >
              {showAddForm ? 'Browse Ads' : '+ Post New Ad'}
            </button>
          </div>
        </div>

        {/* Create Ad Form */}
        {showAddForm ? (
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden p-6 sm:p-8 max-w-2xl mx-auto animate-fade-in-up">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Post a Classified Ad</h2>
            <form className="space-y-6" onSubmit={handleCreate}>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Ad Title</label>
                  <input type="text" name="title" onChange={handleInputChange} value={formData.title} placeholder="e.g. Sofa for sale" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-600 outline-none" required />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                  <select name="category" onChange={handleInputChange} value={formData.category} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-600 bg-white outline-none">
                    <option>Furniture</option><option>Vehicles</option><option>Electronics</option><option>Services</option><option>Other</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Price (₹)</label>
                  <input type="number" name="price" onChange={handleInputChange} value={formData.price} placeholder="5000" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-600 outline-none" required />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Your Flat No.</label>
                  <input type="text" name="seller_flat" onChange={handleInputChange} value={formData.seller_flat} placeholder="Tower B, 405" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-600 outline-none" required />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                <textarea name="description" rows="4" onChange={handleInputChange} value={formData.description} placeholder="Details about the item..." className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-600 outline-none resize-none" required></textarea>
              </div>
              <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-xl shadow-md transition-all">Post Ad</button>
            </form>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              <p className="text-gray-500 col-span-full text-center">Loading community ads...</p>
            ) : ads.length === 0 ? (
              <div className="col-span-full bg-white rounded-3xl p-10 text-center border border-gray-100 shadow-sm">
                <span className="text-6xl mb-4 block">📦</span>
                <h3 className="text-xl font-bold text-gray-800">No active ads right now.</h3>
                <p className="text-gray-500 mt-2">Be the first to sell something in your society!</p>
              </div>
            ) : (
              ads.map((ad, idx) => (
                <div key={idx} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow group flex flex-col">
                  <div className="h-40 bg-gradient-to-br from-blue-100 to-indigo-50 flex items-center justify-center relative">
                    <span className="text-5xl group-hover:scale-110 transition-transform">
                      {ad.category === 'Vehicles' ? '🚗' : ad.category === 'Electronics' ? '💻' : ad.category === 'Furniture' ? '🛋️' : '📦'}
                    </span>
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur text-blue-800 font-extrabold px-3 py-1 rounded-full shadow-sm">
                      ₹{ad.price}
                    </div>
                  </div>
                  <div className="p-6 flex-grow">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{ad.category}</span>
                      <span className="text-xs text-gray-400">{new Date(ad.createdAt).toLocaleDateString()}</span>
                    </div>
                    <h3 className="font-bold text-xl text-gray-900 mb-2">{ad.title}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">{ad.description}</p>
                    <div className="mt-auto pt-4 border-t border-gray-50 flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-xs">
                          {ad.seller_flat.substring(0,2).toUpperCase()}
                        </div>
                        <span className="text-sm font-medium text-gray-700">{ad.seller_flat}</span>
                      </div>
                      <button className="text-blue-600 hover:text-blue-800 font-bold text-sm bg-blue-50 px-3 py-1.5 rounded-lg">Contact</button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
