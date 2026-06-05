'use client';
import React, { useState, useEffect } from 'react';
import { Users, Clock, Edit, Trash2, Plus, LogOut, LogIn } from 'lucide-react';

export default function StaffModule() {
  const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
  const [staffLogs, setStaffLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingStaff, setEditingStaff] = useState(null);
  const [formData, setFormData] = useState({ 
    staff_name: '', role: 'housekeeping', shift_type: 'morning', 
    status: 'present', qr_code: 'SYS-GEN-123' 
  });

  useEffect(() => {
    const fetchStaffLogs = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/staff`);
        if (!res.ok) throw new Error('Unable to load staff records');
        const data = await res.json();
        setStaffLogs(data);
      } catch (err) {
        console.error('Staff load error', err);
        setStaffLogs([]);
      } finally {
        setLoading(false);
      }
    };
    fetchStaffLogs();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleClockIn = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE}/api/staff/in`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          staff_name: formData.staff_name,
          role: formData.role,
          shift_type: formData.shift_type,
          status: formData.status,
          qr_code: 'ST-' + Math.random().toString(36).substring(2, 8).toUpperCase()
        })
      });
      if (!response.ok) throw new Error('Unable to clock in staff');
      const record = await response.json();
      setStaffLogs([record, ...staffLogs]);
      setShowAddForm(false);
      setFormData({ staff_name: '', role: 'housekeeping', shift_type: 'morning', status: 'present', qr_code: 'SYS-GEN-123' });
      alert('Staff clocked in successfully!');
    } catch (err) {
      console.error('Clock in error', err);
      alert('Unable to clock staff in. Check your backend.');
    }
  };

  const handleClockOut = async (id) => {
    try {
      const response = await fetch(`${API_BASE}/api/staff/out/${id}`, {
        method: 'POST'
      });
      if (!response.ok) throw new Error('Unable to clock out staff');
      const updated = await response.json();
      setStaffLogs(staffLogs.map(log => log.id === updated.id ? updated : log));
      alert('Staff clocked out successfully!');
    } catch (err) {
      console.error('Clock out error', err);
      alert('Unable to clock staff out. Check your backend.');
    }
  };

  const handleEdit = (staff) => {
    setEditingStaff(staff);
    setFormData({
      staff_name: staff.staff_name,
      role: staff.role,
      shift_type: staff.shift_type,
      status: staff.status,
      qr_code: staff.qr_code
    });
    setShowAddForm(true);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    setStaffLogs(staffLogs.map(log => log.id === editingStaff.id ? {
      ...log,
      staff_name: formData.staff_name,
      role: formData.role,
      shift_type: formData.shift_type,
      status: formData.status
    } : log));
    setEditingStaff(null);
    setShowAddForm(false);
    setFormData({ staff_name: '', role: 'housekeeping', shift_type: 'morning', status: 'present', qr_code: 'SYS-GEN-123' });
    alert('Staff record updated successfully!');
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this staff record?')) return;
    try {
      const response = await fetch(`${API_BASE}/api/staff/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('Unable to delete record');
      setStaffLogs(staffLogs.filter(log => log.id !== id));
      alert('Staff record deleted successfully!');
    } catch (err) {
      console.error('Delete staff error', err);
      alert('Unable to delete staff record.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-black text-gray-900 flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
                <Users size={24} className="text-white" />
              </div>
              Staff Attendance
            </h1>
            <p className="text-gray-500 mt-2 text-sm">Real-time tracking of operations staff</p>
          </div>
          <button 
            onClick={() => { setEditingStaff(null); setFormData({ staff_name: '', role: 'housekeeping', shift_type: 'morning', status: 'present', qr_code: 'SYS-GEN-123' }); setShowAddForm(!showAddForm); }}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all flex items-center gap-2"
          >
            {showAddForm ? <LogOut size={18} /> : <LogIn size={18} />}
            {showAddForm ? 'Cancel' : 'Clock IN'}
          </button>
        </div>

        {showAddForm && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 mb-8 animate-fade-in-up">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                {editingStaff ? <Edit size={20} className="text-white" /> : <LogIn size={20} className="text-white" />}
              </div>
              {editingStaff ? 'Edit Staff Record' : 'Clock IN Staff'}
            </h2>
            <form onSubmit={editingStaff ? handleUpdate : handleClockIn} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Staff Name</label>
                  <input type="text" name="staff_name" onChange={handleInputChange} value={formData.staff_name} placeholder="Ramesh Kumar" className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-sm font-bold" required />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Role</label>
                  <select name="role" onChange={handleInputChange} value={formData.role} className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-sm font-bold">
                    <option value="housekeeping">Housekeeping</option>
                    <option value="electrician">Electrician</option>
                    <option value="plumber">Plumber</option>
                    <option value="FM">Facility Manager</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Shift Type</label>
                  <select name="shift_type" onChange={handleInputChange} value={formData.shift_type} className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-sm font-bold">
                    <option value="morning">Morning</option>
                    <option value="evening">Evening</option>
                    <option value="night">Night</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Status</label>
                  <select name="status" onChange={handleInputChange} value={formData.status} className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-sm font-bold">
                    <option value="present">Present</option>
                    <option value="late">Late</option>
                    <option value="half-day">Half-Day</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => { setShowAddForm(false); setEditingStaff(null); }}
                  className="px-6 py-3 text-gray-600 hover:text-gray-800 font-bold rounded-xl hover:bg-gray-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all"
                >
                  {editingStaff ? 'Update' : 'Clock IN'}
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100 text-gray-600 text-xs font-bold uppercase tracking-wider">
                  <th className="p-4 rounded-tl-lg">ID</th>
                  <th className="p-4">Staff Details</th>
                  <th className="p-4">IN Time</th>
                  <th className="p-4">OUT Time</th>
                  <th className="p-4 text-center">Hours</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right rounded-tr-lg">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loading ? (
                  <tr><td colSpan="7" className="p-8 text-center text-gray-500">Loading records...</td></tr>
                ) : staffLogs.length === 0 ? (
                  <tr><td colSpan="7" className="p-8 text-center text-gray-500">No attendance records found for today.</td></tr>
                ) : (
                  staffLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-gray-50 transition-colors">
                      <td className="p-4 text-xs font-bold text-gray-800">#{log.id}</td>
                      <td className="p-4">
                        <div className="text-sm font-bold text-gray-900">{log.staff_name}</div>
                        <div className="text-xs text-gray-500 mt-0.5 capitalize">{log.role} • {log.shift_type}</div>
                      </td>
                      <td className="p-4">
                        <div className="text-sm text-gray-800 font-medium flex items-center gap-1">
                          <Clock size={12} />
                          {new Date(log.in_time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                        </div>
                        <div className="text-xs text-gray-400">{new Date(log.in_time).toLocaleDateString()}</div>
                      </td>
                      <td className="p-4">
                        {log.out_time ? (
                          <>
                            <div className="text-sm text-gray-800 font-medium flex items-center gap-1">
                              <LogOut size={12} />
                              {new Date(log.out_time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                            </div>
                            <div className="text-xs text-gray-400">{new Date(log.out_time).toLocaleDateString()}</div>
                          </>
                        ) : (
                          <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded-lg">Working</span>
                        )}
                      </td>
                      <td className="p-4 text-center">
                        {log.out_time ? (
                          <span className="text-sm font-bold text-gray-700">
                            {(() => {
                              const inTime = new Date(log.in_time);
                              const outTime = new Date(log.out_time);
                              const diffMs = outTime - inTime;
                              const diffHours = (diffMs / (1000 * 60 * 60)).toFixed(2);
                              return `${diffHours}h`;
                            })()}
                          </span>
                        ) : (
                          <span className="text-gray-300">-</span>
                        )}
                      </td>
                      <td className="p-4">
                        <span className={`px-3 py-1 text-xs font-bold rounded-lg ${
                          log.status === 'present' ? 'bg-green-100 text-green-700' : 
                          log.status === 'late' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'
                        }`}>
                          {log.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {!log.out_time && (
                            <button 
                              onClick={() => handleClockOut(log.id)}
                              className="p-2 bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition-colors"
                              title="Clock OUT"
                            >
                              <LogOut size={16} />
                            </button>
                          )}
                          <button 
                            onClick={() => handleEdit(log)}
                            className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <Edit size={16} />
                          </button>
                          <button 
                            onClick={() => handleDelete(log.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete"
                          >
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
      </div>
    </div>
  );
}
