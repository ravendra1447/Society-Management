'use client';
import React, { useState, useEffect } from 'react';
import { Bell, Plus, Edit, Trash2, Search, Pin, Calendar, User, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

export default function NoticesModule() {
  const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingNotice, setEditingNotice] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  
  const [formData, setFormData] = useState({
    title: '',
    category: 'notice',
    priority: 'normal',
    content: '',
    author: '',
    publish_date: '',
    expiry_date: '',
    target_audience: 'all',
    status: 'published',
    attachment_url: '',
    notes: ''
  });

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/notices`);
      if (res.ok) {
        const data = await res.json();
        setNotices(data);
      }
    } catch (err) {
      console.error('Error fetching notices:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editingNotice ? `${API_BASE}/api/notices/${editingNotice.id}` : `${API_BASE}/api/notices`;
      const method = editingNotice ? 'PUT' : 'POST';
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        await fetchNotices();
        setShowForm(false);
        setEditingNotice(null);
        setFormData({
          title: '', category: 'notice', priority: 'normal', content: '',
          author: '', publish_date: '', expiry_date: '', target_audience: 'all',
          status: 'published', attachment_url: '', notes: ''
        });
        alert(editingNotice ? 'Notice updated successfully!' : 'Notice published successfully!');
      }
    } catch (err) {
      console.error('Error saving notice:', err);
      alert('Error saving notice. Please try again.');
    }
  };

  const handleEdit = (notice) => {
    setEditingNotice(notice);
    setFormData({
      title: notice.title,
      category: notice.category,
      priority: notice.priority,
      content: notice.content,
      author: notice.author,
      publish_date: notice.publish_date,
      expiry_date: notice.expiry_date,
      target_audience: notice.target_audience,
      status: notice.status,
      attachment_url: notice.attachment_url,
      notes: notice.notes
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this notice?')) return;
    try {
      const res = await fetch(`${API_BASE}/api/notices/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setNotices(notices.filter(n => n.id !== id));
        alert('Notice deleted successfully!');
      }
    } catch (err) {
      console.error('Error deleting notice:', err);
      alert('Error deleting notice. Please try again.');
    }
  };

  const filteredNotices = notices.filter(notice => {
    const matchesSearch = notice.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notice.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notice.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || notice.category === filterCategory;
    const matchesPriority = filterPriority === 'all' || notice.priority === filterPriority;
    return matchesSearch && matchesCategory && matchesPriority;
  });

  const getCategoryColor = (category) => {
    switch(category) {
      case 'alert': return 'bg-red-100 text-red-700';
      case 'event': return 'bg-green-100 text-green-700';
      case 'announcement': return 'bg-blue-100 text-blue-700';
      case 'notice': return 'bg-indigo-100 text-indigo-700';
      case 'reminder': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'urgent': return 'bg-red-100 text-red-700';
      case 'high': return 'bg-orange-100 text-orange-700';
      case 'normal': return 'bg-blue-100 text-blue-700';
      case 'low': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'published': return 'bg-green-100 text-green-700';
      case 'draft': return 'bg-yellow-100 text-yellow-700';
      case 'archived': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const categories = [...new Set(notices.map(n => n.category))];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-6 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
                <Bell size={24} className="text-white" />
              </div>
              Notice Board
            </h1>
            <p className="text-gray-500 mt-2 text-sm">Digital notice board for society announcements</p>
          </div>
          <button 
            onClick={() => { setEditingNotice(null); setFormData({ title: '', category: 'notice', priority: 'normal', content: '', author: '', publish_date: '', expiry_date: '', target_audience: 'all', status: 'published', attachment_url: '', notes: '' }); setShowForm(true); }}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all flex items-center gap-2 w-full sm:w-auto justify-center"
          >
            <Plus size={18} /> Publish Notice
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-6">
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-4 sm:p-6 rounded-2xl border border-indigo-100">
            <div className="text-2xl sm:text-3xl font-bold text-indigo-600 mb-1">{notices.length}</div>
            <div className="text-gray-600 text-xs sm:text-sm">Total Notices</div>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 sm:p-6 rounded-2xl border border-green-100">
            <div className="text-2xl sm:text-3xl font-bold text-green-600 mb-1">{notices.filter(n => n.status === 'published').length}</div>
            <div className="text-gray-600 text-xs sm:text-sm">Published</div>
          </div>
          <div className="bg-gradient-to-br from-red-50 to-rose-50 p-4 sm:p-6 rounded-2xl border border-red-100">
            <div className="text-2xl sm:text-3xl font-bold text-red-600 mb-1">{notices.filter(n => n.priority === 'urgent' || n.priority === 'high').length}</div>
            <div className="text-gray-600 text-xs sm:text-sm">Urgent/High</div>
          </div>
          <div className="bg-gradient-to-br from-yellow-50 to-amber-50 p-4 sm:p-6 rounded-2xl border border-yellow-100">
            <div className="text-2xl sm:text-3xl font-bold text-yellow-600 mb-1">{notices.filter(n => n.status === 'draft').length}</div>
            <div className="text-gray-600 text-xs sm:text-sm">Drafts</div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search notices..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-2 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
            >
              <option value="all">All Categories</option>
              {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className="px-4 py-2 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
            >
              <option value="all">All Priority</option>
              <option value="urgent">Urgent</option>
              <option value="high">High</option>
              <option value="normal">Normal</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>

        {/* Notices Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <div className="col-span-full p-8 text-center text-gray-500">Loading...</div>
          ) : filteredNotices.length === 0 ? (
            <div className="col-span-full p-8 text-center text-gray-500">No notices found</div>
          ) : (
            filteredNotices.map(notice => (
              <div key={notice.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow relative">
                <div className={`absolute top-0 left-0 w-full h-1 ${
                  notice.category === 'alert' ? 'bg-red-500' : 
                  notice.category === 'event' ? 'bg-green-500' : 
                  notice.category === 'announcement' ? 'bg-blue-500' : 
                  'bg-indigo-500'
                }`}></div>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex gap-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold capitalize ${getCategoryColor(notice.category)}`}>{notice.category}</span>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold capitalize ${getPriorityColor(notice.priority)}`}>{notice.priority}</span>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold capitalize ${getStatusColor(notice.status)}`}>{notice.status}</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{notice.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">{notice.content}</p>
                  <div className="space-y-2 text-xs text-gray-500 mb-4">
                    <div className="flex items-center gap-2"><User size={12} /> {notice.author}</div>
                    <div className="flex items-center gap-2"><Calendar size={12} /> {notice.publish_date}</div>
                    {notice.expiry_date && <div className="flex items-center gap-2">Expires: {notice.expiry_date}</div>}
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => handleEdit(notice)} className="flex-1 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-xl font-bold hover:bg-indigo-100 transition-colors flex items-center justify-center gap-2">
                      <Edit size={14} /> Edit
                    </button>
                    <button onClick={() => handleDelete(notice.id)} className="px-4 py-2 bg-red-50 text-red-600 rounded-xl font-bold hover:bg-red-100 transition-colors">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Add/Edit Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h2 className="text-xl sm:text-2xl font-bold">{editingNotice ? 'Edit Notice' : 'Publish New Notice'}</h2>
                <button onClick={() => setShowForm(false)} className="text-gray-500 text-2xl">✕</button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-bold mb-2">Title *</label>
                    <input type="text" name="title" required value={formData.title} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-xl" placeholder="Notice title" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">Category *</label>
                    <select name="category" required value={formData.category} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-xl">
                      <option value="notice">Notice</option>
                      <option value="announcement">Announcement</option>
                      <option value="alert">Alert</option>
                      <option value="event">Event</option>
                      <option value="reminder">Reminder</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">Priority *</label>
                    <select name="priority" required value={formData.priority} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-xl">
                      <option value="low">Low</option>
                      <option value="normal">Normal</option>
                      <option value="high">High</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">Author *</label>
                    <input type="text" name="author" required value={formData.author} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-xl" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">Status *</label>
                    <select name="status" required value={formData.status} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-xl">
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                      <option value="archived">Archived</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">Publish Date *</label>
                    <input type="date" name="publish_date" required value={formData.publish_date} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-xl" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">Expiry Date</label>
                    <input type="date" name="expiry_date" value={formData.expiry_date} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-xl" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">Target Audience</label>
                    <select name="target_audience" value={formData.target_audience} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-xl">
                      <option value="all">All Residents</option>
                      <option value="owners">Owners Only</option>
                      <option value="tenants">Tenants Only</option>
                      <option value="committee">Committee Members</option>
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-bold mb-2">Content *</label>
                    <textarea name="content" rows="4" required value={formData.content} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-xl resize-none" placeholder="Notice content..."></textarea>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-bold mb-2">Attachment URL</label>
                    <input type="url" name="attachment_url" value={formData.attachment_url} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-xl" placeholder="https://example.com/document.pdf" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-bold mb-2">Notes</label>
                    <textarea name="notes" rows="2" value={formData.notes} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-xl resize-none" placeholder="Internal notes..."></textarea>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 pt-4">
                  <button type="button" onClick={() => setShowForm(false)} className="flex-1 px-6 py-3 bg-gray-100 rounded-xl">Cancel</button>
                  <button type="submit" className="flex-1 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold">{editingNotice ? 'Update Notice' : 'Publish Notice'}</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
