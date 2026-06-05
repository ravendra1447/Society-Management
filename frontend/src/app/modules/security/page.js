'use client';
import React, { useState, useEffect } from 'react';
import { Shield, Plus, Edit, Trash2, Search, Clock, MapPin, User, AlertTriangle, CheckCircle } from 'lucide-react';

export default function SecurityLogs() {
  const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingLog, setEditingLog] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterSeverity, setFilterSeverity] = useState('all');
  
  const [formData, setFormData] = useState({
    log_type: '',
    severity: 'low',
    location: '',
    description: '',
    guard_name: '',
    incident_date: '',
    incident_time: '',
    action_taken: '',
    status: 'open',
    reported_by: '',
    notes: ''
  });

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/security-logs`);
      if (res.ok) {
        const data = await res.json();
        setLogs(data);
      } else {
        // Fallback to localStorage if API fails
        const storedLogs = localStorage.getItem('society_security_logs');
        if (storedLogs) {
          setLogs(JSON.parse(storedLogs));
        }
      }
    } catch (err) {
      console.error('Error fetching security logs:', err);
      // Fallback to localStorage
      const storedLogs = localStorage.getItem('society_security_logs');
      if (storedLogs) {
        setLogs(JSON.parse(storedLogs));
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
      const url = editingLog ? `${API_BASE}/api/security-logs/${editingLog.id}` : `${API_BASE}/api/security-logs`;
      const method = editingLog ? 'PUT' : 'POST';
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        await fetchLogs();
        setShowForm(false);
        setEditingLog(null);
        setFormData({
          log_type: '', severity: 'low', location: '', description: '',
          guard_name: '', incident_date: '', incident_time: '',
          action_taken: '', status: 'open', reported_by: '', notes: ''
        });
        alert(editingLog ? 'Log updated successfully!' : 'Security log created successfully!');
      } else {
        // Fallback to localStorage if backend fails
        const storedLogs = JSON.parse(localStorage.getItem('society_security_logs') || '[]');
        if (editingLog) {
          const updatedLogs = storedLogs.map(l => l.id === editingLog.id ? { ...formData, id: editingLog.id } : l);
          localStorage.setItem('society_security_logs', JSON.stringify(updatedLogs));
        } else {
          const newLog = { ...formData, id: storedLogs.length + 1, created_at: new Date().toISOString() };
          localStorage.setItem('society_security_logs', JSON.stringify([newLog, ...storedLogs]));
        }
        await fetchLogs();
        setShowForm(false);
        setEditingLog(null);
        setFormData({
          log_type: '', severity: 'low', location: '', description: '',
          guard_name: '', incident_date: '', incident_time: '',
          action_taken: '', status: 'open', reported_by: '', notes: ''
        });
        alert(editingLog ? 'Log updated successfully (saved locally)!' : 'Security log created successfully (saved locally)!');
      }
    } catch (err) {
      console.error('Error saving log:', err);
      // Fallback to localStorage
      const storedLogs = JSON.parse(localStorage.getItem('society_security_logs') || '[]');
      if (editingLog) {
        const updatedLogs = storedLogs.map(l => l.id === editingLog.id ? { ...formData, id: editingLog.id } : l);
        localStorage.setItem('society_security_logs', JSON.stringify(updatedLogs));
      } else {
        const newLog = { ...formData, id: storedLogs.length + 1, created_at: new Date().toISOString() };
        localStorage.setItem('society_security_logs', JSON.stringify([newLog, ...storedLogs]));
      }
      await fetchLogs();
      setShowForm(false);
      setEditingLog(null);
      setFormData({
        log_type: '', severity: 'low', location: '', description: '',
        guard_name: '', incident_date: '', incident_time: '',
        action_taken: '', status: 'open', reported_by: '', notes: ''
      });
      alert(editingLog ? 'Log updated successfully (saved locally)!' : 'Security log created successfully (saved locally)!');
    }
  };

  const handleEdit = (log) => {
    setEditingLog(log);
    setFormData({
      log_type: log.log_type,
      severity: log.severity,
      location: log.location,
      description: log.description,
      guard_name: log.guard_name,
      incident_date: log.incident_date,
      incident_time: log.incident_time,
      action_taken: log.action_taken,
      status: log.status,
      reported_by: log.reported_by,
      notes: log.notes
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this security log?')) return;
    try {
      const res = await fetch(`${API_BASE}/api/security-logs/${id}`, { method: 'DELETE' });
      if (res.ok) {
        await fetchLogs();
        alert('Security log deleted successfully!');
      } else {
        // Fallback to localStorage if backend fails
        const storedLogs = JSON.parse(localStorage.getItem('society_security_logs') || '[]');
        const updatedLogs = storedLogs.filter(l => l.id !== id);
        localStorage.setItem('society_security_logs', JSON.stringify(updatedLogs));
        await fetchLogs();
        alert('Security log deleted successfully (saved locally)!');
      }
    } catch (err) {
      console.error('Error deleting log:', err);
      // Fallback to localStorage
      const storedLogs = JSON.parse(localStorage.getItem('society_security_logs') || '[]');
      const updatedLogs = storedLogs.filter(l => l.id !== id);
      localStorage.setItem('society_security_logs', JSON.stringify(updatedLogs));
      await fetchLogs();
      alert('Security log deleted successfully (saved locally)!');
    }
  };

  const filteredLogs = logs.filter(log => {
    const matchesSearch = log.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.guard_name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || log.log_type === filterType;
    const matchesSeverity = filterSeverity === 'all' || log.severity === filterSeverity;
    return matchesSearch && matchesType && matchesSeverity;
  });

  const getSeverityColor = (severity) => {
    switch(severity) {
      case 'critical': return 'bg-red-100 text-red-700';
      case 'high': return 'bg-orange-100 text-orange-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'low': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'open': return 'bg-red-100 text-red-700';
      case 'in-progress': return 'bg-yellow-100 text-yellow-700';
      case 'resolved': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-6 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-rose-600 rounded-xl flex items-center justify-center shadow-lg shadow-red-500/20">
                <Shield size={24} className="text-white" />
              </div>
              Security Logs
            </h1>
            <p className="text-gray-500 mt-2 text-sm">Track security incidents and patrol activities</p>
          </div>
          <button 
            onClick={() => { setEditingLog(null); setFormData({ log_type: '', severity: 'low', location: '', description: '', guard_name: '', incident_date: '', incident_time: '', action_taken: '', status: 'open', reported_by: '', notes: '' }); setShowForm(true); }}
            className="bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-red-500/30 hover:shadow-red-500/50 transition-all flex items-center gap-2 w-full sm:w-auto justify-center"
          >
            <Plus size={18} /> Add Security Log
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-6">
          <div className="bg-gradient-to-br from-red-50 to-rose-50 p-4 sm:p-6 rounded-2xl border border-red-100">
            <div className="text-2xl sm:text-3xl font-bold text-red-600 mb-1">{logs.length}</div>
            <div className="text-gray-600 text-xs sm:text-sm">Total Logs</div>
          </div>
          <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-4 sm:p-6 rounded-2xl border border-orange-100">
            <div className="text-2xl sm:text-3xl font-bold text-orange-600 mb-1">{logs.filter(l => l.severity === 'critical' || l.severity === 'high').length}</div>
            <div className="text-gray-600 text-xs sm:text-sm">High Priority</div>
          </div>
          <div className="bg-gradient-to-br from-yellow-50 to-lime-50 p-4 sm:p-6 rounded-2xl border border-yellow-100">
            <div className="text-2xl sm:text-3xl font-bold text-yellow-600 mb-1">{logs.filter(l => l.status === 'open').length}</div>
            <div className="text-gray-600 text-xs sm:text-sm">Open Cases</div>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 sm:p-6 rounded-2xl border border-green-100">
            <div className="text-2xl sm:text-3xl font-bold text-green-600 mb-1">{logs.filter(l => l.status === 'resolved').length}</div>
            <div className="text-gray-600 text-xs sm:text-sm">Resolved</div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search logs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-xl focus:ring-2 focus:ring-red-500 outline-none"
              />
            </div>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-2 border rounded-xl focus:ring-2 focus:ring-red-500 outline-none"
            >
              <option value="all">All Types</option>
              <option value="incident">Incident</option>
              <option value="patrol">Patrol</option>
              <option value="access">Access Control</option>
              <option value="emergency">Emergency</option>
              <option value="maintenance">Maintenance</option>
            </select>
            <select
              value={filterSeverity}
              onChange={(e) => setFilterSeverity(e.target.value)}
              className="px-4 py-2 border rounded-xl focus:ring-2 focus:ring-red-500 outline-none"
            >
              <option value="all">All Severity</option>
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1200px]">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-bold text-gray-500 uppercase">Type</th>
                  <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-bold text-gray-500 uppercase">Severity</th>
                  <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-bold text-gray-500 uppercase">Location</th>
                  <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-bold text-gray-500 uppercase">Description</th>
                  <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-bold text-gray-500 uppercase">Guard</th>
                  <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-bold text-gray-500 uppercase">Date/Time</th>
                  <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-bold text-gray-500 uppercase">Status</th>
                  <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-bold text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {loading ? (
                  <tr><td colSpan="8" className="p-8 text-center text-gray-500">Loading...</td></tr>
                ) : filteredLogs.length === 0 ? (
                  <tr><td colSpan="8" className="p-8 text-center text-gray-500">No security logs found</td></tr>
                ) : (
                  filteredLogs.map(log => (
                    <tr key={log.id} className="hover:bg-gray-50">
                      <td className="px-4 sm:px-6 py-3 sm:py-4">
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-700 capitalize">{log.log_type}</span>
                      </td>
                      <td className="px-4 sm:px-6 py-3 sm:py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold capitalize ${getSeverityColor(log.severity)}`}>{log.severity}</span>
                      </td>
                      <td className="px-4 sm:px-6 py-3 sm:py-4 text-sm text-gray-900 flex items-center gap-1"><MapPin size={12} /> {log.location}</td>
                      <td className="px-4 sm:px-6 py-3 sm:py-4">
                        <div className="text-sm text-gray-900 max-w-xs truncate">{log.description}</div>
                      </td>
                      <td className="px-4 sm:px-6 py-3 sm:py-4 text-sm text-gray-900 flex items-center gap-1"><User size={12} /> {log.guard_name}</td>
                      <td className="px-4 sm:px-6 py-3 sm:py-4 text-sm text-gray-900">
                        <div className="flex items-center gap-1"><Clock size={12} /> {log.incident_date}</div>
                        <div className="text-xs text-gray-500">{log.incident_time}</div>
                      </td>
                      <td className="px-4 sm:px-6 py-3 sm:py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold capitalize ${getStatusColor(log.status)}`}>{log.status}</span>
                      </td>
                      <td className="px-4 sm:px-6 py-3 sm:py-4">
                        <div className="flex gap-2">
                          <button onClick={() => handleEdit(log)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                            <Edit size={16} />
                          </button>
                          <button onClick={() => handleDelete(log.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
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
                <h2 className="text-xl sm:text-2xl font-bold">{editingLog ? 'Edit Security Log' : 'Add Security Log'}</h2>
                <button onClick={() => setShowForm(false)} className="text-gray-500 text-2xl">✕</button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold mb-2">Log Type *</label>
                    <select name="log_type" required value={formData.log_type} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-xl">
                      <option value="">Select Type</option>
                      <option value="incident">Incident</option>
                      <option value="patrol">Patrol</option>
                      <option value="access">Access Control</option>
                      <option value="emergency">Emergency</option>
                      <option value="maintenance">Maintenance</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">Severity *</label>
                    <select name="severity" required value={formData.severity} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-xl">
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="critical">Critical</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">Location *</label>
                    <input type="text" name="location" required value={formData.location} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-xl" placeholder="e.g., Main Gate, Parking Area" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">Guard Name *</label>
                    <input type="text" name="guard_name" required value={formData.guard_name} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-xl" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">Incident Date *</label>
                    <input type="date" name="incident_date" required value={formData.incident_date} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-xl" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">Incident Time *</label>
                    <input type="time" name="incident_time" required value={formData.incident_time} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-xl" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">Reported By</label>
                    <input type="text" name="reported_by" value={formData.reported_by} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-xl" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">Status *</label>
                    <select name="status" required value={formData.status} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-xl">
                      <option value="open">Open</option>
                      <option value="in-progress">In Progress</option>
                      <option value="resolved">Resolved</option>
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-bold mb-2">Description *</label>
                    <textarea name="description" rows="3" required value={formData.description} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-xl resize-none" placeholder="Describe the incident or activity..."></textarea>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-bold mb-2">Action Taken</label>
                    <textarea name="action_taken" rows="2" value={formData.action_taken} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-xl resize-none" placeholder="What actions were taken..."></textarea>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-bold mb-2">Notes</label>
                    <textarea name="notes" rows="2" value={formData.notes} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-xl resize-none" placeholder="Additional notes..."></textarea>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 pt-4">
                  <button type="button" onClick={() => setShowForm(false)} className="flex-1 px-6 py-3 bg-gray-100 rounded-xl">Cancel</button>
                  <button type="submit" className="flex-1 px-6 py-3 bg-gradient-to-r from-red-600 to-rose-600 text-white rounded-xl font-bold">{editingLog ? 'Update Log' : 'Add Log'}</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
