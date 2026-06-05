'use client';
import React, { useState, useEffect } from 'react';
import { Wrench, Plus, Edit, Trash2, Search, Clock, MapPin, User, AlertCircle, CheckCircle } from 'lucide-react';

export default function MaintenanceRequests() {
  const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingRequest, setEditingRequest] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  
  const [formData, setFormData] = useState({
    request_title: '',
    category: '',
    priority: 'medium',
    location: '',
    description: '',
    requested_by: '',
    contact_number: '',
    preferred_date: '',
    preferred_time: '',
    assigned_to: '',
    status: 'pending',
    estimated_cost: '',
    notes: ''
  });

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/maintenance-requests`);
      if (res.ok) {
        const data = await res.json();
        setRequests(data);
      } else {
        // Fallback to localStorage if API fails
        const storedRequests = localStorage.getItem('society_maintenance_requests');
        if (storedRequests) {
          setRequests(JSON.parse(storedRequests));
        }
      }
    } catch (err) {
      console.error('Error fetching maintenance requests:', err);
      // Fallback to localStorage
      const storedRequests = localStorage.getItem('society_maintenance_requests');
      if (storedRequests) {
        setRequests(JSON.parse(storedRequests));
      }
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
      const url = editingRequest ? `${API_BASE}/api/maintenance-requests/${editingRequest.id}` : `${API_BASE}/api/maintenance-requests`;
      const method = editingRequest ? 'PUT' : 'POST';
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        await fetchRequests();
        setShowForm(false);
        setEditingRequest(null);
        setFormData({
          request_title: '', category: '', priority: 'medium', location: '',
          description: '', requested_by: '', contact_number: '',
          preferred_date: '', preferred_time: '', assigned_to: '',
          status: 'pending', estimated_cost: '', notes: ''
        });
        alert(editingRequest ? 'Request updated successfully!' : 'Maintenance request created successfully!');
      } else {
        // Fallback to localStorage if backend fails
        const storedRequests = JSON.parse(localStorage.getItem('society_maintenance_requests') || '[]');
        if (editingRequest) {
          const updatedRequests = storedRequests.map(r => r.id === editingRequest.id ? { ...formData, id: editingRequest.id } : r);
          localStorage.setItem('society_maintenance_requests', JSON.stringify(updatedRequests));
        } else {
          const newRequest = { ...formData, id: storedRequests.length + 1, created_at: new Date().toISOString() };
          localStorage.setItem('society_maintenance_requests', JSON.stringify([newRequest, ...storedRequests]));
        }
        await fetchRequests();
        setShowForm(false);
        setEditingRequest(null);
        setFormData({
          request_title: '', category: '', priority: 'medium', location: '',
          description: '', requested_by: '', contact_number: '',
          preferred_date: '', preferred_time: '', assigned_to: '',
          status: 'pending', estimated_cost: '', notes: ''
        });
        alert(editingRequest ? 'Request updated successfully (saved locally)!' : 'Maintenance request created successfully (saved locally)!');
      }
    } catch (err) {
      console.error('Error saving request:', err);
      // Fallback to localStorage
      const storedRequests = JSON.parse(localStorage.getItem('society_maintenance_requests') || '[]');
      if (editingRequest) {
        const updatedRequests = storedRequests.map(r => r.id === editingRequest.id ? { ...formData, id: editingRequest.id } : r);
        localStorage.setItem('society_maintenance_requests', JSON.stringify(updatedRequests));
      } else {
        const newRequest = { ...formData, id: storedRequests.length + 1, created_at: new Date().toISOString() };
        localStorage.setItem('society_maintenance_requests', JSON.stringify([newRequest, ...storedRequests]));
      }
      await fetchRequests();
      setShowForm(false);
      setEditingRequest(null);
      setFormData({
        request_title: '', category: '', priority: 'medium', location: '',
        description: '', requested_by: '', contact_number: '',
        preferred_date: '', preferred_time: '', assigned_to: '',
        status: 'pending', estimated_cost: '', notes: ''
      });
      alert(editingRequest ? 'Request updated successfully (saved locally)!' : 'Maintenance request created successfully (saved locally)!');
    }
  };

  const handleEdit = (request) => {
    setEditingRequest(request);
    setFormData({
      request_title: request.request_title,
      category: request.category,
      priority: request.priority,
      location: request.location,
      description: request.description,
      requested_by: request.requested_by,
      contact_number: request.contact_number,
      preferred_date: request.preferred_date,
      preferred_time: request.preferred_time,
      assigned_to: request.assigned_to,
      status: request.status,
      estimated_cost: request.estimated_cost,
      notes: request.notes
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this maintenance request?')) return;
    try {
      const res = await fetch(`${API_BASE}/api/maintenance-requests/${id}`, { method: 'DELETE' });
      if (res.ok) {
        await fetchRequests();
        alert('Maintenance request deleted successfully!');
      } else {
        // Fallback to localStorage if backend fails
        const storedRequests = JSON.parse(localStorage.getItem('society_maintenance_requests') || '[]');
        const updatedRequests = storedRequests.filter(r => r.id !== id);
        localStorage.setItem('society_maintenance_requests', JSON.stringify(updatedRequests));
        await fetchRequests();
        alert('Maintenance request deleted successfully (saved locally)!');
      }
    } catch (err) {
      console.error('Error deleting request:', err);
      // Fallback to localStorage
      const storedRequests = JSON.parse(localStorage.getItem('society_maintenance_requests') || '[]');
      const updatedRequests = storedRequests.filter(r => r.id !== id);
      localStorage.setItem('society_maintenance_requests', JSON.stringify(updatedRequests));
      await fetchRequests();
      alert('Maintenance request deleted successfully (saved locally)!');
    }
  };

  const filteredRequests = requests.filter(request => {
    const matchesSearch = request.request_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.requested_by.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || request.category === filterCategory;
    const matchesStatus = filterStatus === 'all' || request.status === filterStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'critical': return 'bg-red-100 text-red-700';
      case 'high': return 'bg-orange-100 text-orange-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'low': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'pending': return 'bg-red-100 text-red-700';
      case 'in-progress': return 'bg-yellow-100 text-yellow-700';
      case 'completed': return 'bg-green-100 text-green-700';
      case 'cancelled': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const categories = [...new Set(requests.map(r => r.category))];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-6 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/20">
                <Wrench size={24} className="text-white" />
              </div>
              Maintenance Requests
            </h1>
            <p className="text-gray-500 mt-2 text-sm">Track and manage maintenance requests</p>
          </div>
          <button 
            onClick={() => { setEditingRequest(null); setFormData({ request_title: '', category: '', priority: 'medium', location: '', description: '', requested_by: '', contact_number: '', preferred_date: '', preferred_time: '', assigned_to: '', status: 'pending', estimated_cost: '', notes: '' }); setShowForm(true); }}
            className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-amber-500/30 hover:shadow-amber-500/50 transition-all flex items-center gap-2 w-full sm:w-auto justify-center"
          >
            <Plus size={18} /> New Request
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-6">
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-4 sm:p-6 rounded-2xl border border-amber-100">
            <div className="text-2xl sm:text-3xl font-bold text-amber-600 mb-1">{requests.length}</div>
            <div className="text-gray-600 text-xs sm:text-sm">Total Requests</div>
          </div>
          <div className="bg-gradient-to-br from-red-50 to-rose-50 p-4 sm:p-6 rounded-2xl border border-red-100">
            <div className="text-2xl sm:text-3xl font-bold text-red-600 mb-1">{requests.filter(r => r.status === 'pending').length}</div>
            <div className="text-gray-600 text-xs sm:text-sm">Pending</div>
          </div>
          <div className="bg-gradient-to-br from-yellow-50 to-lime-50 p-4 sm:p-6 rounded-2xl border border-yellow-100">
            <div className="text-2xl sm:text-3xl font-bold text-yellow-600 mb-1">{requests.filter(r => r.status === 'in-progress').length}</div>
            <div className="text-gray-600 text-xs sm:text-sm">In Progress</div>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 sm:p-6 rounded-2xl border border-green-100">
            <div className="text-2xl sm:text-3xl font-bold text-green-600 mb-1">{requests.filter(r => r.status === 'completed').length}</div>
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
                placeholder="Search requests..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-xl focus:ring-2 focus:ring-amber-500 outline-none"
              />
            </div>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-2 border rounded-xl focus:ring-2 focus:ring-amber-500 outline-none"
            >
              <option value="all">All Categories</option>
              {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border rounded-xl focus:ring-2 focus:ring-amber-500 outline-none"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1200px]">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-bold text-gray-500 uppercase">Title</th>
                  <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-bold text-gray-500 uppercase">Category</th>
                  <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-bold text-gray-500 uppercase">Priority</th>
                  <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-bold text-gray-500 uppercase">Location</th>
                  <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-bold text-gray-500 uppercase">Requested By</th>
                  <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-bold text-gray-500 uppercase">Preferred Date</th>
                  <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-bold text-gray-500 uppercase">Assigned To</th>
                  <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-bold text-gray-500 uppercase">Status</th>
                  <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-bold text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {loading ? (
                  <tr><td colSpan="9" className="p-8 text-center text-gray-500">Loading...</td></tr>
                ) : filteredRequests.length === 0 ? (
                  <tr><td colSpan="9" className="p-8 text-center text-gray-500">No maintenance requests found</td></tr>
                ) : (
                  filteredRequests.map(request => (
                    <tr key={request.id} className="hover:bg-gray-50">
                      <td className="px-4 sm:px-6 py-3 sm:py-4">
                        <div className="text-sm font-medium text-gray-900">{request.request_title}</div>
                        <div className="text-xs text-gray-500 max-w-xs truncate">{request.description}</div>
                      </td>
                      <td className="px-4 sm:px-6 py-3 sm:py-4 text-sm text-gray-900">{request.category}</td>
                      <td className="px-4 sm:px-6 py-3 sm:py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold capitalize ${getPriorityColor(request.priority)}`}>{request.priority}</span>
                      </td>
                      <td className="px-4 sm:px-6 py-3 sm:py-4 text-sm text-gray-900 flex items-center gap-1"><MapPin size={12} /> {request.location}</td>
                      <td className="px-4 sm:px-6 py-3 sm:py-4">
                        <div className="text-sm text-gray-900 flex items-center gap-1"><User size={12} /> {request.requested_by}</div>
                        <div className="text-xs text-gray-500">{request.contact_number}</div>
                      </td>
                      <td className="px-4 sm:px-6 py-3 sm:py-4 text-sm text-gray-900">
                        <div className="flex items-center gap-1"><Clock size={12} /> {request.preferred_date}</div>
                        <div className="text-xs text-gray-500">{request.preferred_time}</div>
                      </td>
                      <td className="px-4 sm:px-6 py-3 sm:py-4 text-sm text-gray-900 flex items-center gap-1"><Wrench size={12} /> {request.assigned_to || 'Unassigned'}</td>
                      <td className="px-4 sm:px-6 py-3 sm:py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold capitalize ${getStatusColor(request.status)}`}>{request.status}</span>
                      </td>
                      <td className="px-4 sm:px-6 py-3 sm:py-4">
                        <div className="flex gap-2">
                          <button onClick={() => handleEdit(request)} className="p-2 text-amber-600 hover:bg-amber-50 rounded-lg transition-colors">
                            <Edit size={16} />
                          </button>
                          <button onClick={() => handleDelete(request.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add/Edit Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h2 className="text-xl sm:text-2xl font-bold">{editingRequest ? 'Edit Request' : 'New Maintenance Request'}</h2>
                <button onClick={() => setShowForm(false)} className="text-gray-500 text-2xl">✕</button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-bold mb-2">Request Title *</label>
                    <input type="text" name="request_title" required value={formData.request_title} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-xl" placeholder="Brief title of the maintenance request" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">Category *</label>
                    <select name="category" required value={formData.category} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-xl">
                      <option value="">Select Category</option>
                      <option value="Electrical">Electrical</option>
                      <option value="Plumbing">Plumbing</option>
                      <option value="HVAC">HVAC</option>
                      <option value="Carpentry">Carpentry</option>
                      <option value="Painting">Painting</option>
                      <option value="Cleaning">Cleaning</option>
                      <option value="General">General</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">Priority *</label>
                    <select name="priority" required value={formData.priority} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-xl">
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="critical">Critical</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">Location *</label>
                    <input type="text" name="location" required value={formData.location} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-xl" placeholder="e.g., Building A, Floor 3" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">Requested By *</label>
                    <input type="text" name="requested_by" required value={formData.requested_by} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-xl" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">Contact Number *</label>
                    <input type="tel" name="contact_number" required value={formData.contact_number} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-xl" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">Preferred Date</label>
                    <input type="date" name="preferred_date" value={formData.preferred_date} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-xl" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">Preferred Time</label>
                    <input type="time" name="preferred_time" value={formData.preferred_time} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-xl" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">Assigned To</label>
                    <input type="text" name="assigned_to" value={formData.assigned_to} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-xl" placeholder="Maintenance staff name" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">Estimated Cost</label>
                    <input type="number" step="0.01" name="estimated_cost" value={formData.estimated_cost} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-xl" placeholder="₹" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">Status *</label>
                    <select name="status" required value={formData.status} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-xl">
                      <option value="pending">Pending</option>
                      <option value="in-progress">In Progress</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-bold mb-2">Description *</label>
                    <textarea name="description" rows="3" required value={formData.description} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-xl resize-none" placeholder="Detailed description of the maintenance issue..."></textarea>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-bold mb-2">Notes</label>
                    <textarea name="notes" rows="2" value={formData.notes} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-xl resize-none" placeholder="Additional notes..."></textarea>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 pt-4">
                  <button type="button" onClick={() => setShowForm(false)} className="flex-1 px-6 py-3 bg-gray-100 rounded-xl">Cancel</button>
                  <button type="submit" className="flex-1 px-6 py-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-xl font-bold">{editingRequest ? 'Update Request' : 'Create Request'}</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
