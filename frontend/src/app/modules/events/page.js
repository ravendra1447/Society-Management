'use client';
import React, { useState, useEffect } from 'react';
import { Calendar, Plus, Edit, Trash2, Search, Clock, MapPin, Users, CheckCircle, XCircle, Star } from 'lucide-react';

export default function EventManagement() {
  const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  
  const [formData, setFormData] = useState({
    event_name: '',
    category: '',
    description: '',
    event_date: '',
    start_time: '',
    end_time: '',
    location: '',
    organizer: '',
    contact_number: '',
    max_participants: '',
    registration_fee: '',
    status: 'upcoming',
    image_url: '',
    notes: ''
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/events`);
      if (res.ok) {
        const data = await res.json();
        setEvents(data);
      }
    } catch (err) {
      console.error('Error fetching events:', err);
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
      const url = editingEvent ? `${API_BASE}/api/events/${editingEvent.id}` : `${API_BASE}/api/events`;
      const method = editingEvent ? 'PUT' : 'POST';
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        await fetchEvents();
        setShowForm(false);
        setEditingEvent(null);
        setFormData({
          event_name: '', category: '', description: '', event_date: '',
          start_time: '', end_time: '', location: '', organizer: '',
          contact_number: '', max_participants: '', registration_fee: '',
          status: 'upcoming', image_url: '', notes: ''
        });
        alert(editingEvent ? 'Event updated successfully!' : 'Event created successfully!');
      }
    } catch (err) {
      console.error('Error saving event:', err);
      alert('Error saving event. Please try again.');
    }
  };

  const handleEdit = (event) => {
    setEditingEvent(event);
    setFormData({
      event_name: event.event_name,
      category: event.category,
      description: event.description,
      event_date: event.event_date,
      start_time: event.start_time,
      end_time: event.end_time,
      location: event.location,
      organizer: event.organizer,
      contact_number: event.contact_number,
      max_participants: event.max_participants,
      registration_fee: event.registration_fee,
      status: event.status,
      image_url: event.image_url,
      notes: event.notes
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this event?')) return;
    try {
      const res = await fetch(`${API_BASE}/api/events/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setEvents(events.filter(e => e.id !== id));
        alert('Event deleted successfully!');
      }
    } catch (err) {
      console.error('Error deleting event:', err);
      alert('Error deleting event. Please try again.');
    }
  };

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.event_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.organizer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || event.category === filterCategory;
    const matchesStatus = filterStatus === 'all' || event.status === filterStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch(status) {
      case 'upcoming': return 'bg-blue-100 text-blue-700';
      case 'ongoing': return 'bg-green-100 text-green-700';
      case 'completed': return 'bg-gray-100 text-gray-700';
      case 'cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const categories = [...new Set(events.map(e => e.category))];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-6 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-600 rounded-xl flex items-center justify-center shadow-lg shadow-pink-500/20">
                <Calendar size={24} className="text-white" />
              </div>
              Event Management
            </h1>
            <p className="text-gray-500 mt-2 text-sm">Organize and manage society events</p>
          </div>
          <button 
            onClick={() => { setEditingEvent(null); setFormData({ event_name: '', category: '', description: '', event_date: '', start_time: '', end_time: '', location: '', organizer: '', contact_number: '', max_participants: '', registration_fee: '', status: 'upcoming', image_url: '', notes: '' }); setShowForm(true); }}
            className="bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-pink-500/30 hover:shadow-pink-500/50 transition-all flex items-center gap-2 w-full sm:w-auto justify-center"
          >
            <Plus size={18} /> Create Event
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-6">
          <div className="bg-gradient-to-br from-pink-50 to-rose-50 p-4 sm:p-6 rounded-2xl border border-pink-100">
            <div className="text-2xl sm:text-3xl font-bold text-pink-600 mb-1">{events.length}</div>
            <div className="text-gray-600 text-xs sm:text-sm">Total Events</div>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 sm:p-6 rounded-2xl border border-blue-100">
            <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-1">{events.filter(e => e.status === 'upcoming').length}</div>
            <div className="text-gray-600 text-xs sm:text-sm">Upcoming</div>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 sm:p-6 rounded-2xl border border-green-100">
            <div className="text-2xl sm:text-3xl font-bold text-green-600 mb-1">{events.filter(e => e.status === 'ongoing').length}</div>
            <div className="text-gray-600 text-xs sm:text-sm">Ongoing</div>
          </div>
          <div className="bg-gradient-to-br from-gray-50 to-slate-50 p-4 sm:p-6 rounded-2xl border border-gray-100">
            <div className="text-2xl sm:text-3xl font-bold text-gray-600 mb-1">{events.filter(e => e.status === 'completed').length}</div>
            <div className="text-gray-600 text-xs sm:text-sm">Completed</div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-xl focus:ring-2 focus:ring-pink-500 outline-none"
              />
            </div>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-2 border rounded-xl focus:ring-2 focus:ring-pink-500 outline-none"
            >
              <option value="all">All Categories</option>
              {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border rounded-xl focus:ring-2 focus:ring-pink-500 outline-none"
            >
              <option value="all">All Status</option>
              <option value="upcoming">Upcoming</option>
              <option value="ongoing">Ongoing</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <div className="col-span-full p-8 text-center text-gray-500">Loading...</div>
          ) : filteredEvents.length === 0 ? (
            <div className="col-span-full p-8 text-center text-gray-500">No events found</div>
          ) : (
            filteredEvents.map(event => (
              <div key={event.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                {event.image_url && (
                  <div className="h-48 bg-gradient-to-br from-pink-100 to-rose-100 flex items-center justify-center">
                    <Calendar size={48} className="text-pink-300" />
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-bold text-gray-900">{event.event_name}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold capitalize ${getStatusColor(event.status)}`}>{event.status}</span>
                  </div>
                  <div className="space-y-2 text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-2"><Calendar size={14} /> {event.event_date}</div>
                    <div className="flex items-center gap-2"><Clock size={14} /> {event.start_time} - {event.end_time}</div>
                    <div className="flex items-center gap-2"><MapPin size={14} /> {event.location}</div>
                    <div className="flex items-center gap-2"><Users size={14} /> {event.organizer}</div>
                    {event.max_participants && <div className="flex items-center gap-2"><Star size={14} /> Max: {event.max_participants}</div>}
                    {event.registration_fee && <div className="flex items-center gap-2">Fee: ₹{event.registration_fee}</div>}
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => handleEdit(event)} className="flex-1 px-4 py-2 bg-pink-50 text-pink-600 rounded-xl font-bold hover:bg-pink-100 transition-colors flex items-center justify-center gap-2">
                      <Edit size={14} /> Edit
                    </button>
                    <button onClick={() => handleDelete(event.id)} className="px-4 py-2 bg-red-50 text-red-600 rounded-xl font-bold hover:bg-red-100 transition-colors">
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
                <h2 className="text-xl sm:text-2xl font-bold">{editingEvent ? 'Edit Event' : 'Create New Event'}</h2>
                <button onClick={() => setShowForm(false)} className="text-gray-500 text-2xl">✕</button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-bold mb-2">Event Name *</label>
                    <input type="text" name="event_name" required value={formData.event_name} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-xl" placeholder="Name of the event" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">Category *</label>
                    <select name="category" required value={formData.category} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-xl">
                      <option value="">Select Category</option>
                      <option value="Social">Social</option>
                      <option value="Cultural">Cultural</option>
                      <option value="Sports">Sports</option>
                      <option value="Educational">Educational</option>
                      <option value="Religious">Religious</option>
                      <option value="Charity">Charity</option>
                      <option value="Meeting">Meeting</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">Status *</label>
                    <select name="status" required value={formData.status} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-xl">
                      <option value="upcoming">Upcoming</option>
                      <option value="ongoing">Ongoing</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">Event Date *</label>
                    <input type="date" name="event_date" required value={formData.event_date} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-xl" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">Start Time *</label>
                    <input type="time" name="start_time" required value={formData.start_time} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-xl" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">End Time *</label>
                    <input type="time" name="end_time" required value={formData.end_time} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-xl" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">Location *</label>
                    <input type="text" name="location" required value={formData.location} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-xl" placeholder="e.g., Community Hall, Garden" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">Organizer *</label>
                    <input type="text" name="organizer" required value={formData.organizer} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-xl" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">Contact Number *</label>
                    <input type="tel" name="contact_number" required value={formData.contact_number} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-xl" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">Max Participants</label>
                    <input type="number" name="max_participants" value={formData.max_participants} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-xl" placeholder="Leave empty for unlimited" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">Registration Fee (₹)</label>
                    <input type="number" step="0.01" name="registration_fee" value={formData.registration_fee} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-xl" placeholder="0 for free" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-bold mb-2">Image URL</label>
                    <input type="url" name="image_url" value={formData.image_url} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-xl" placeholder="https://example.com/event-image.jpg" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-bold mb-2">Description *</label>
                    <textarea name="description" rows="3" required value={formData.description} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-xl resize-none" placeholder="Detailed description of the event..."></textarea>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-bold mb-2">Notes</label>
                    <textarea name="notes" rows="2" value={formData.notes} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-xl resize-none" placeholder="Additional notes..."></textarea>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 pt-4">
                  <button type="button" onClick={() => setShowForm(false)} className="flex-1 px-6 py-3 bg-gray-100 rounded-xl">Cancel</button>
                  <button type="submit" className="flex-1 px-6 py-3 bg-gradient-to-r from-pink-600 to-rose-600 text-white rounded-xl font-bold">{editingEvent ? 'Update Event' : 'Create Event'}</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
