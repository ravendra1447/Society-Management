'use client';
import React, { useState, useEffect } from 'react';
import { Users, Plus, Edit, Trash2, Search, Clock, Phone, Mail, CheckCircle, XCircle } from 'lucide-react';

export default function VisitorManagement() {
  const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
  const [visitors, setVisitors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingVisitor, setEditingVisitor] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  
  const [formData, setFormData] = useState({
    visitor_name: '',
    contact_number: '',
    email: '',
    purpose: '',
    flat_to_visit: '',
    resident_name: '',
    visit_date: '',
    check_in_time: '',
    check_out_time: '',
    id_proof: '',
    id_number: '',
    vehicle_number: '',
    status: 'checked-in',
    notes: ''
  });

  useEffect(() => {
    fetchVisitors();
  }, []);

  const fetchVisitors = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/visitors`);
      if (res.ok) {
        const data = await res.json();
        setVisitors(data);
      }
    } catch (err) {
      console.error('Error fetching visitors:', err);
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
      const url = editingVisitor ? `${API_BASE}/api/visitors/${editingVisitor.id}` : `${API_BASE}/api/visitors`;
      const method = editingVisitor ? 'PUT' : 'POST';
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        await fetchVisitors();
        setShowForm(false);
        setEditingVisitor(null);
        setFormData({
          visitor_name: '', contact_number: '', email: '', purpose: '',
          flat_to_visit: '', resident_name: '', visit_date: '',
          check_in_time: '', check_out_time: '', id_proof: '',
          id_number: '', vehicle_number: '', status: 'checked-in', notes: ''
        });
        alert(editingVisitor ? 'Visitor updated successfully!' : 'Visitor checked in successfully!');
      }
    } catch (err) {
      console.error('Error saving visitor:', err);
      alert('Error saving visitor. Please try again.');
    }
  };

  const handleCheckOut = async (id) => {
    try {
      const res = await fetch(`${API_BASE}/api/visitors/${id}/checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ check_out_time: new Date().toLocaleTimeString(), status: 'checked-out' })
      });
      if (res.ok) {
        await fetchVisitors();
        alert('Visitor checked out successfully!');
      }
    } catch (err) {
      console.error('Error checking out visitor:', err);
      alert('Error checking out visitor. Please try again.');
    }
  };

  const handleEdit = (visitor) => {
    setEditingVisitor(visitor);
    setFormData({
      visitor_name: visitor.visitor_name,
      contact_number: visitor.contact_number,
      email: visitor.email,
      purpose: visitor.purpose,
      flat_to_visit: visitor.flat_to_visit,
      resident_name: visitor.resident_name,
      visit_date: visitor.visit_date,
      check_in_time: visitor.check_in_time,
      check_out_time: visitor.check_out_time,
      id_proof: visitor.id_proof,
      id_number: visitor.id_number,
      vehicle_number: visitor.vehicle_number,
      status: visitor.status,
      notes: visitor.notes
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this visitor record?')) return;
    try {
      const res = await fetch(`${API_BASE}/api/visitors/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setVisitors(visitors.filter(v => v.id !== id));
        alert('Visitor record deleted successfully!');
      }
    } catch (err) {
      console.error('Error deleting visitor:', err);
      alert('Error deleting visitor. Please try again.');
    }
  };

  const filteredVisitors = visitors.filter(visitor => {
    const matchesSearch = visitor.visitor_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         visitor.flat_to_visit.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         visitor.resident_name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || visitor.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-6 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-violet-500/20">
                <Users size={24} className="text-white" />
              </div>
              Visitor Management
            </h1>
            <p className="text-gray-500 mt-2 text-sm">Track and manage visitor entries and exits</p>
          </div>
          <button 
            onClick={() => { setEditingVisitor(null); setFormData({ visitor_name: '', contact_number: '', email: '', purpose: '', flat_to_visit: '', resident_name: '', visit_date: '', check_in_time: '', check_out_time: '', id_proof: '', id_number: '', vehicle_number: '', status: 'checked-in', notes: '' }); setShowForm(true); }}
            className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50 transition-all flex items-center gap-2 w-full sm:w-auto justify-center"
          >
            <Plus size={18} /> Check In Visitor
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-6">
          <div className="bg-gradient-to-br from-violet-50 to-purple-50 p-4 sm:p-6 rounded-2xl border border-violet-100">
            <div className="text-2xl sm:text-3xl font-bold text-violet-600 mb-1">{visitors.length}</div>
            <div className="text-gray-600 text-xs sm:text-sm">Total Visitors</div>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 sm:p-6 rounded-2xl border border-green-100">
            <div className="text-2xl sm:text-3xl font-bold text-green-600 mb-1">{visitors.filter(v => v.status === 'checked-in').length}</div>
            <div className="text-gray-600 text-xs sm:text-sm">Currently In</div>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 sm:p-6 rounded-2xl border border-blue-100">
            <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-1">{visitors.filter(v => v.status === 'checked-out').length}</div>
            <div className="text-gray-600 text-xs sm:text-sm">Checked Out</div>
          </div>
          <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-4 sm:p-6 rounded-2xl border border-orange-100">
            <div className="text-2xl sm:text-3xl font-bold text-orange-600 mb-1">{visitors.filter(v => new Date(v.visit_date).toDateString() === new Date().toDateString()).length}</div>
            <div className="text-gray-600 text-xs sm:text-sm">Today</div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search visitors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-xl focus:ring-2 focus:ring-violet-500 outline-none"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border rounded-xl focus:ring-2 focus:ring-violet-500 outline-none"
            >
              <option value="all">All Status</option>
              <option value="checked-in">Checked In</option>
              <option value="checked-out">Checked Out</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1200px]">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-bold text-gray-500 uppercase">Visitor Name</th>
                  <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-bold text-gray-500 uppercase">Contact</th>
                  <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-bold text-gray-500 uppercase">Purpose</th>
                  <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-bold text-gray-500 uppercase">Flat/Resident</th>
                  <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-bold text-gray-500 uppercase">Visit Date</th>
                  <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-bold text-gray-500 uppercase">Check In</th>
                  <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-bold text-gray-500 uppercase">Check Out</th>
                  <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-bold text-gray-500 uppercase">Status</th>
                  <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-bold text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {loading ? (
                  <tr><td colSpan="9" className="p-8 text-center text-gray-500">Loading...</td></tr>
                ) : filteredVisitors.length === 0 ? (
                  <tr><td colSpan="9" className="p-8 text-center text-gray-500">No visitors found</td></tr>
                ) : (
                  filteredVisitors.map(visitor => (
                    <tr key={visitor.id} className="hover:bg-gray-50">
                      <td className="px-4 sm:px-6 py-3 sm:py-4">
                        <div className="text-sm font-medium text-gray-900">{visitor.visitor_name}</div>
                        <div className="text-xs text-gray-500">{visitor.id_proof}: {visitor.id_number}</div>
                      </td>
                      <td className="px-4 sm:px-6 py-3 sm:py-4">
                        <div className="text-sm text-gray-900 flex items-center gap-1"><Phone size={12} /> {visitor.contact_number}</div>
                        {visitor.email && <div className="text-xs text-gray-500 flex items-center gap-1"><Mail size={12} /> {visitor.email}</div>}
                      </td>
                      <td className="px-4 sm:px-6 py-3 sm:py-4 text-sm text-gray-900">{visitor.purpose}</td>
                      <td className="px-4 sm:px-6 py-3 sm:py-4">
                        <div className="text-sm font-medium text-gray-900">{visitor.flat_to_visit}</div>
                        <div className="text-xs text-gray-500">{visitor.resident_name}</div>
                      </td>
                      <td className="px-4 sm:px-6 py-3 sm:py-4 text-sm text-gray-900">{visitor.visit_date}</td>
                      <td className="px-4 sm:px-6 py-3 sm:py-4 text-sm text-gray-900">{visitor.check_in_time}</td>
                      <td className="px-4 sm:px-6 py-3 sm:py-4 text-sm text-gray-900">{visitor.check_out_time || '-'}</td>
                      <td className="px-4 sm:px-6 py-3 sm:py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                          visitor.status === 'checked-in' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                        }`}>
                          {visitor.status}
                        </span>
                      </td>
                      <td className="px-4 sm:px-6 py-3 sm:py-4">
                        <div className="flex gap-2">
                          {visitor.status === 'checked-in' && (
                            <button onClick={() => handleCheckOut(visitor.id)} className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="Check Out">
                              <CheckCircle size={16} />
                            </button>
                          )}
                          <button onClick={() => handleEdit(visitor)} className="p-2 text-violet-600 hover:bg-violet-50 rounded-lg transition-colors">
                            <Edit size={16} />
                          </button>
                          <button onClick={() => handleDelete(visitor.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
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
                <h2 className="text-xl sm:text-2xl font-bold">{editingVisitor ? 'Edit Visitor' : 'Check In New Visitor'}</h2>
                <button onClick={() => setShowForm(false)} className="text-gray-500 text-2xl">✕</button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold mb-2">Visitor Name *</label>
                    <input type="text" name="visitor_name" required value={formData.visitor_name} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-xl" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">Contact Number *</label>
                    <input type="tel" name="contact_number" required value={formData.contact_number} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-xl" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">Email</label>
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-xl" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">Purpose *</label>
                    <select name="purpose" required value={formData.purpose} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-xl">
                      <option value="">Select Purpose</option>
                      <option value="Personal Visit">Personal Visit</option>
                      <option value="Business">Business</option>
                      <option value="Delivery">Delivery</option>
                      <option value="Service">Service</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">Flat to Visit *</label>
                    <input type="text" name="flat_to_visit" required value={formData.flat_to_visit} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-xl" placeholder="e.g., A-402" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">Resident Name *</label>
                    <input type="text" name="resident_name" required value={formData.resident_name} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-xl" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">Visit Date *</label>
                    <input type="date" name="visit_date" required value={formData.visit_date} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-xl" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">Check In Time *</label>
                    <input type="time" name="check_in_time" required value={formData.check_in_time} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-xl" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">ID Proof Type *</label>
                    <select name="id_proof" required value={formData.id_proof} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-xl">
                      <option value="">Select ID Proof</option>
                      <option value="Aadhar Card">Aadhar Card</option>
                      <option value="PAN Card">PAN Card</option>
                      <option value="Driving License">Driving License</option>
                      <option value="Voter ID">Voter ID</option>
                      <option value="Passport">Passport</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">ID Number *</label>
                    <input type="text" name="id_number" required value={formData.id_number} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-xl" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">Vehicle Number</label>
                    <input type="text" name="vehicle_number" value={formData.vehicle_number} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-xl" placeholder="e.g., MH-01-AB-1234" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">Status</label>
                    <select name="status" value={formData.status} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-xl">
                      <option value="checked-in">Checked In</option>
                      <option value="checked-out">Checked Out</option>
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-bold mb-2">Notes</label>
                    <textarea name="notes" rows="2" value={formData.notes} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-xl resize-none" placeholder="Any additional notes..."></textarea>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 pt-4">
                  <button type="button" onClick={() => setShowForm(false)} className="flex-1 px-6 py-3 bg-gray-100 rounded-xl">Cancel</button>
                  <button type="submit" className="flex-1 px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-xl font-bold">{editingVisitor ? 'Update Visitor' : 'Check In'}</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
