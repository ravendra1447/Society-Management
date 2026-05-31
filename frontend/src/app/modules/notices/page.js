'use client';
import React, { useState, useEffect } from 'react';

export default function NoticesModule() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({ title: '', content: '', category: 'Notice' });

  const fetchNotices = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/notices');
      const data = await res.json();
      setNotices(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/notices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, author: 'Admin' })
      });
      if (res.ok) {
        alert('Notice published successfully!');
        setShowAddForm(false);
        setFormData({ title: '', content: '', category: 'Notice' });
        fetchNotices();
      }
    } catch (err) {
      console.error(err);
      alert('Error publishing notice.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div>
            <h1 className="text-3xl font-extrabold text-indigo-900">📢 Notices & Events</h1>
            <p className="text-gray-500 mt-2">Digital Notice Board for Society Announcements.</p>
          </div>
          <div className="mt-4 sm:mt-0 space-x-3 flex">
            <a href="/" className="px-5 py-2.5 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors">
              Home
            </a>
            <button 
              onClick={() => setShowAddForm(!showAddForm)}
              className="px-5 py-2.5 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
            >
              {showAddForm ? 'View Notice Board' : '+ Publish Notice'}
            </button>
          </div>
        </div>

        {showAddForm ? (
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden p-6 sm:p-8 max-w-2xl mx-auto animate-fade-in-up">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Draft New Announcement</h2>
            <form className="space-y-6" onSubmit={handleCreate}>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Subject / Title</label>
                <input type="text" name="title" onChange={handleInputChange} value={formData.title} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-600 outline-none" required />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                <select name="category" onChange={handleInputChange} value={formData.category} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-600 bg-white outline-none">
                  <option>Notice</option><option>Event</option><option>Alert</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Message Content</label>
                <textarea name="content" rows="4" onChange={handleInputChange} value={formData.content} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-600 outline-none resize-none" required></textarea>
              </div>
              <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-8 rounded-xl shadow-md transition-all">Publish to Residents</button>
            </form>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              <p className="text-gray-500">Loading notices...</p>
            ) : notices.length === 0 ? (
              <p className="text-gray-500">No active notices.</p>
            ) : (
              notices.map((notice, idx) => (
                <div key={idx} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow relative overflow-hidden group">
                  <div className={`absolute top-0 left-0 w-full h-1 ${
                    notice.category === 'Alert' ? 'bg-red-500' : notice.category === 'Event' ? 'bg-green-500' : 'bg-indigo-500'
                  }`}></div>
                  <div className="flex justify-between items-start mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      notice.category === 'Alert' ? 'bg-red-100 text-red-700' : notice.category === 'Event' ? 'bg-green-100 text-green-700' : 'bg-indigo-100 text-indigo-700'
                    }`}>
                      {notice.category}
                    </span>
                    <span className="text-xs text-gray-400">{new Date(notice.date).toLocaleDateString()}</span>
                  </div>
                  <h3 className="font-bold text-xl text-gray-900 mb-2">{notice.title}</h3>
                  <p className="text-gray-600 text-sm whitespace-pre-wrap leading-relaxed">{notice.content}</p>
                  <div className="mt-6 pt-4 border-t border-gray-50 text-xs text-gray-400 font-medium">
                    Published by: {notice.author}
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
