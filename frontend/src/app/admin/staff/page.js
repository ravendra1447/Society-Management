'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AdminStaffManagement() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({ 
    name: '', contact: '', role: 'electrician', shift_type: 'morning' 
  });
  const [staffHistory, setStaffHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const fetchStaff = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/staff');
      const data = await res.json();
      setStaffHistory(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setCreating(true);
    setError('');
    setSuccess('');

    try {
      const res = await fetch('http://localhost:5000/api/staff/in', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          staff_name: formData.name, 
          role: formData.role, 
          shift_type: formData.shift_type, 
          status: 'present' 
        })
      });

      if (res.ok) {
        const newStaff = await res.json();
        setSuccess(`✅ Staff "${formData.name}" created successfully!`);
        setShowAddForm(false);
        setFormData({ name: '', contact: '', role: 'electrician', shift_type: 'morning' });
        fetchStaff();
      } else {
        const errData = await res.json();
        setError(errData.error || 'Failed to create staff. Check backend.');
      }
    } catch (err) {
      console.error(err);
      setError('Network error. Is the backend server running on port 5000?');
    } finally {
      setCreating(false);
    }
  };

  const handleDeleteStaff = async (id, name) => {
    if (!confirm(`Delete staff "${name}"? This cannot be undone.`)) return;
    try {
      const res = await fetch(`http://localhost:5000/api/staff/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setStaffHistory(staffHistory.filter(s => s.id !== id));
        setSuccess(`Staff "${name}" deleted.`);
      }
    } catch (err) {
      setError('Failed to delete staff.');
    }
  };

  const handleClockOut = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/staff/out/${id}`, { method: 'POST' });
      if (res.ok) {
        setSuccess('Staff clocked out successfully!');
        fetchStaff();
      }
    } catch (err) {
      setError('Failed to clock out staff.');
    }
  };

  const roleLabels = {
    'electrician': '⚡ Electrician',
    'plumber': '🔧 Plumber',
    'housekeeping': '🧹 Housekeeping',
    'FM': '🏗️ Facility Manager',
    'security': '🛡️ Security Guard'
  };

  const shiftLabels = {
    'morning': '☀️ Morning (6 AM - 2 PM)',
    'evening': '🌅 Evening (2 PM - 10 PM)',
    'night': '🌙 Night (10 PM - 6 AM)'
  };

  return (
    <div className="min-h-screen bg-gray-50 py-4 md:py-6 px-3 sm:px-4 md:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 md:p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
              <span className="text-white text-xl">👷</span>
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">Staff Directory</h1>
              <p className="text-gray-500 text-sm">Manage society staff, roles & attendance</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Link href="/admin" className="px-4 py-2.5 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-all text-sm">
              ← Admin Panel
            </Link>
            <button 
              onClick={() => { setShowAddForm(!showAddForm); setError(''); setSuccess(''); }}
              className={`px-5 py-2.5 font-semibold rounded-xl transition-all text-sm ${
                showAddForm 
                  ? 'bg-gray-200 text-gray-700' 
                  : 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-200'
              }`}
            >
              {showAddForm ? '✕ Cancel' : '+ Add New Staff'}
            </button>
          </div>
        </div>

        {/* Messages */}
        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl text-green-800 text-sm font-medium flex items-center justify-between">
            <span>{success}</span>
            <button onClick={() => setSuccess('')} className="text-green-600 hover:text-green-800">✕</button>
          </div>
        )}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-800 text-sm font-medium flex items-center justify-between">
            <span>⚠️ {error}</span>
            <button onClick={() => setError('')} className="text-red-600 hover:text-red-800">✕</button>
          </div>
        )}

        {/* Stats */}
        {!showAddForm && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
              <p className="text-sm font-semibold text-gray-500">Total Staff</p>
              <p className="text-3xl font-black text-gray-900 mt-1">{staffHistory.length}</p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
              <p className="text-sm font-semibold text-gray-500">Present</p>
              <p className="text-3xl font-black text-green-600 mt-1">{staffHistory.filter(s => s.status === 'present' && !s.out_time).length}</p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
              <p className="text-sm font-semibold text-gray-500">Clocked Out</p>
              <p className="text-3xl font-black text-orange-600 mt-1">{staffHistory.filter(s => s.out_time).length}</p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
              <p className="text-sm font-semibold text-gray-500">Roles</p>
              <p className="text-3xl font-black text-blue-600 mt-1">{new Set(staffHistory.map(s => s.role)).size}</p>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden p-6">
          {showAddForm ? (
            <div className="max-w-2xl mx-auto">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                  <span className="text-xl">➕</span>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-800">Register New Staff</h2>
                  <p className="text-sm text-gray-500">The staff will be clocked in automatically</p>
                </div>
              </div>
              
              <form className="space-y-6" onSubmit={handleCreate}>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                    <input type="text" name="name" onChange={handleInputChange} value={formData.name} placeholder="Enter staff name" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm bg-gray-50 focus:bg-white transition-colors" required />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                    <input type="tel" name="contact" onChange={handleInputChange} value={formData.contact} placeholder="9876543210" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm bg-gray-50 focus:bg-white transition-colors" />
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Assign Role *</label>
                    <select name="role" onChange={handleInputChange} value={formData.role} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 focus:bg-white outline-none text-sm transition-colors">
                      <option value="electrician">⚡ Electrician</option>
                      <option value="plumber">🔧 Plumber</option>
                      <option value="housekeeping">🧹 Housekeeping</option>
                      <option value="FM">🏗️ Facility Manager</option>
                      <option value="security">🛡️ Security Guard</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Shift Timing *</label>
                    <select name="shift_type" onChange={handleInputChange} value={formData.shift_type} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 focus:bg-white outline-none text-sm transition-colors">
                      <option value="morning">☀️ Morning (6 AM - 2 PM)</option>
                      <option value="evening">🌅 Evening (2 PM - 10 PM)</option>
                      <option value="night">🌙 Night (10 PM - 6 AM)</option>
                    </select>
                  </div>
                </div>
                <button 
                  type="submit" 
                  disabled={creating}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-4 px-8 rounded-xl shadow-lg shadow-blue-200 transition-all text-sm disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {creating ? (
                    <>
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                      Creating...
                    </>
                  ) : '✅ Save Staff & Clock In'}
                </button>
              </form>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider border-b border-gray-200">
                    <th className="p-4 font-semibold">ID</th>
                    <th className="p-4 font-semibold">Staff Details</th>
                    <th className="p-4 font-semibold">Role</th>
                    <th className="p-4 font-semibold">Shift</th>
                    <th className="p-4 font-semibold">Status</th>
                    <th className="p-4 font-semibold">Hours</th>
                    <th className="p-4 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {loading ? (
                    <tr><td colSpan="7" className="p-8 text-center text-gray-400">
                      <div className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5 text-blue-500" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                        Loading staff...
                      </div>
                    </td></tr>
                  ) : staffHistory.length === 0 ? (
                    <tr><td colSpan="7" className="p-12 text-center">
                      <div className="text-3xl mb-3">👷</div>
                      <p className="text-gray-500 font-medium">No staff registered yet</p>
                      <p className="text-gray-400 text-sm mt-1">Click "+ Add New Staff" to register</p>
                    </td></tr>
                  ) : staffHistory.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50/80 transition-colors group">
                      <td className="p-4 text-xs font-bold text-gray-400">STF-{item.id}</td>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shrink-0">
                            <span className="text-white font-bold text-sm">{item.staff_name?.charAt(0)?.toUpperCase() || '?'}</span>
                          </div>
                          <div>
                            <p className="font-bold text-sm text-gray-900">{item.staff_name}</p>
                            {item.in_time && <p className="text-xs text-gray-400 mt-0.5">IN: {new Date(item.in_time).toLocaleString()}</p>}
                            {item.out_time && <p className="text-xs text-orange-500 mt-0.5">OUT: {new Date(item.out_time).toLocaleString()}</p>}
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-lg border border-blue-100">
                          {roleLabels[item.role] || item.role}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className="text-xs text-gray-600 font-medium">
                          {shiftLabels[item.shift_type] || item.shift_type || '-'}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className={`px-3 py-1 text-xs font-bold rounded-lg border ${
                          item.out_time ? 'bg-orange-50 text-orange-700 border-orange-200' :
                          item.status === 'present' ? 'bg-green-50 text-green-700 border-green-200' : 
                          'bg-gray-50 text-gray-700 border-gray-200'
                        }`}>
                          {item.out_time ? '⏹️ Clocked Out' : '✅ ' + (item.status || 'Present')}
                        </span>
                      </td>
                      <td className="p-4 text-sm text-gray-600 font-medium">
                        {item.total_hours ? `${item.total_hours}h` : '-'}
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          {!item.out_time && (
                            <button 
                              onClick={() => handleClockOut(item.id)}
                              className="px-3 py-1.5 text-xs font-semibold text-orange-600 hover:text-white hover:bg-orange-600 border border-orange-200 rounded-lg transition-all"
                            >
                              Clock Out
                            </button>
                          )}
                          <button 
                            onClick={() => handleDeleteStaff(item.id, item.staff_name)}
                            className="px-3 py-1.5 text-xs font-semibold text-red-600 hover:text-white hover:bg-red-600 border border-red-200 rounded-lg transition-all"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
