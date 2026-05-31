'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function UserManagementModule() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRole, setFilterRole] = useState('');
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState({ 
    name: '', username: '', email: '', password: '', phone: '', flat_no: '', role: 'Resident', assigned_modules: [] 
  });

  const availableModules = [
    { id: 'users', label: '🔐 User Management' },
    { id: 'staff', label: '👷 Staff Management' },
    { id: 'vendor', label: '🛠️ Vendor Management' },
    { id: 'resident', label: '🏠 Resident Directory' },
    { id: 'notices', label: '📢 Notice Board' },
    { id: 'complaints', label: '📋 Complaints Desk' },
    { id: 'inventory', label: '📦 Inventory & Assets' },
    { id: 'polls', label: '📊 Polls & Surveys' },
    { id: 'billing', label: '💰 Billing & Accounting' },
    { id: 'facilities', label: '🎾 Facility Booking' },
    { id: 'parking', label: '🅿️ Parking & Vehicles' },
    { id: 'security', label: '🛡️ Gate Security' },
    { id: 'classifieds', label: '🛒 Classifieds' }
  ];

  const fetchUsers = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/users');
      if (res.ok) {
        let data = await res.json();
        data = data.map(u => {
          let modules = u.assigned_modules;
          if (typeof modules === 'string') {
            try { modules = JSON.parse(modules); } catch(e) { modules = []; }
          }
          return { ...u, assigned_modules: modules || [] };
        });
        setUsers(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleModuleToggle = (moduleId) => {
    setFormData((prev) => {
      const isSelected = prev.assigned_modules.includes(moduleId);
      const newModules = isSelected 
        ? prev.assigned_modules.filter(id => id !== moduleId)
        : [...prev.assigned_modules, moduleId];
      return { ...prev, assigned_modules: newModules };
    });
  };

  const selectAllModules = () => {
    setFormData(prev => ({
      ...prev, 
      assigned_modules: availableModules.map(m => m.id)
    }));
  };

  const clearAllModules = () => {
    setFormData(prev => ({ ...prev, assigned_modules: [] }));
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    setCreating(true);
    setError('');
    setSuccess('');

    try {
      const res = await fetch('http://localhost:5000/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const data = await res.json();
      
      if (res.ok) {
        setUsers([data, ...users]);
        setShowAddForm(false);
        setSuccess(`✅ User "${data.name}" created successfully! They can now login with username: ${data.username}`);
        setFormData({ name: '', username: '', email: '', password: '', phone: '', flat_no: '', role: 'Resident', assigned_modules: [] });
      } else {
        setError(data.error || 'Failed to create user.');
      }
    } catch (err) {
      console.error(err);
      setError('Network error. Is the backend server running?');
    } finally {
      setCreating(false);
    }
  };

  const handleDeleteUser = async (userId, userName) => {
    if (!confirm(`Are you sure you want to delete "${userName}"? This cannot be undone.`)) return;
    
    try {
      const res = await fetch(`http://localhost:5000/api/users/${userId}`, { method: 'DELETE' });
      const data = await res.json();
      
      if (res.ok) {
        setUsers(users.filter(u => u.id !== userId));
        setSuccess(`User "${userName}" has been deleted.`);
      } else {
        setError(data.error || 'Failed to delete user.');
      }
    } catch (err) {
      setError('Network error while deleting user.');
    }
  };

  const handleToggleStatus = async (userId) => {
    try {
      const res = await fetch(`http://localhost:5000/api/users/${userId}/status`, { method: 'PATCH' });
      const data = await res.json();
      
      if (res.ok) {
        setUsers(users.map(u => u.id === userId ? { ...u, status: data.status } : u));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const roles = ['Admin', 'Facility Manager', 'Security Guard', 'Electrician', 'Plumber', 'Housekeeping Supvr', 'Vendor', 'Resident'];

  // Filter users
  const filteredUsers = users.filter(u => {
    const matchesSearch = !searchQuery || 
      u.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.username?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = !filterRole || u.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const roleColors = {
    'Admin': 'bg-purple-100 text-purple-700 border-purple-200',
    'Facility Manager': 'bg-blue-100 text-blue-700 border-blue-200',
    'Security Guard': 'bg-red-100 text-red-700 border-red-200',
    'Electrician': 'bg-yellow-100 text-yellow-700 border-yellow-200',
    'Plumber': 'bg-cyan-100 text-cyan-700 border-cyan-200',
    'Housekeeping Supvr': 'bg-pink-100 text-pink-700 border-pink-200',
    'Vendor': 'bg-orange-100 text-orange-700 border-orange-200',
    'Resident': 'bg-emerald-100 text-emerald-700 border-emerald-200'
  };

  return (
    <div className="min-h-screen bg-gray-50 py-4 md:py-6 px-3 sm:px-4 md:px-6 lg:px-8 font-sans pb-20 md:pb-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 md:p-6 rounded-2xl shadow-sm border border-gray-100">
          <div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
                <span className="text-white text-xl">👥</span>
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">User Management</h1>
                <p className="text-gray-500 text-sm">Create accounts, assign roles & manage access permissions</p>
              </div>
            </div>
          </div>
          <div className="mt-2 sm:mt-0 flex gap-2">
            <Link href="/admin" className="px-4 py-2.5 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-all text-sm">
              ← Admin Panel
            </Link>
            <button 
              onClick={() => { setShowAddForm(!showAddForm); setError(''); setSuccess(''); }}
              className={`px-5 py-2.5 font-semibold rounded-xl transition-all shadow-sm text-sm ${
                showAddForm 
                  ? 'bg-gray-200 text-gray-700 hover:bg-gray-300' 
                  : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 shadow-lg shadow-indigo-200'
              }`}
            >
              {showAddForm ? '✕ Cancel' : '+ Create New User'}
            </button>
          </div>
        </div>

        {/* Success/Error Messages */}
        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl text-green-800 text-sm font-medium flex items-center gap-3">
            <span className="text-lg">✅</span>
            <span>{success}</span>
            <button onClick={() => setSuccess('')} className="ml-auto text-green-600 hover:text-green-800">✕</button>
          </div>
        )}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-800 text-sm font-medium flex items-center gap-3">
            <span className="text-lg">⚠️</span>
            <span>{error}</span>
            <button onClick={() => setError('')} className="ml-auto text-red-600 hover:text-red-800">✕</button>
          </div>
        )}

        {/* Create Form */}
        {showAddForm && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 mb-6">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
              <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center">
                <span className="text-indigo-600 text-xl">➕</span>
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800">Create New Account</h2>
                <p className="text-sm text-gray-500">Fill in the details below. The user can login with username or email.</p>
              </div>
            </div>
            
            <form onSubmit={handleCreateUser} className="space-y-6">
              {/* Basic Info */}
              <div>
                <h3 className="text-sm font-bold text-gray-600 uppercase tracking-wider mb-4">Basic Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                    <input type="text" name="name" onChange={handleInputChange} value={formData.name} placeholder="Ramesh Kumar" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none text-sm bg-gray-50 focus:bg-white transition-colors" required />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                    <input type="email" name="email" onChange={handleInputChange} value={formData.email} placeholder="ramesh@society.com" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none text-sm bg-gray-50 focus:bg-white transition-colors" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                    <input type="tel" name="phone" onChange={handleInputChange} value={formData.phone} placeholder="9876543210" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none text-sm bg-gray-50 focus:bg-white transition-colors" />
                  </div>
                </div>
              </div>

              {/* Login & Role */}
              <div>
                <h3 className="text-sm font-bold text-gray-600 uppercase tracking-wider mb-4">Login Credentials & Role</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Username *</label>
                    <input type="text" name="username" onChange={handleInputChange} value={formData.username} placeholder="ramesh_k" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none text-sm bg-gray-50 focus:bg-white transition-colors font-mono" required />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Password *</label>
                    <input type="text" name="password" onChange={handleInputChange} value={formData.password} placeholder="Set initial password" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none text-sm bg-gray-50 focus:bg-white transition-colors" required />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Role *</label>
                    <select name="role" onChange={handleInputChange} value={formData.role} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none text-sm bg-gray-50 focus:bg-white transition-colors">
                      {roles.map(r => <option key={r} value={r}>{r}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Flat / Unit No.</label>
                    <input type="text" name="flat_no" onChange={handleInputChange} value={formData.flat_no} placeholder="A-101" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none text-sm bg-gray-50 focus:bg-white transition-colors" />
                  </div>
                </div>
              </div>
              
              {/* Module Permissions Section */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-gray-600 uppercase tracking-wider">Module Access Permissions</h3>
                  <div className="flex gap-2">
                    <button type="button" onClick={selectAllModules} className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 px-2 py-1 rounded hover:bg-indigo-50 transition-colors">Select All</button>
                    <span className="text-gray-300">|</span>
                    <button type="button" onClick={clearAllModules} className="text-xs font-semibold text-gray-500 hover:text-gray-700 px-2 py-1 rounded hover:bg-gray-100 transition-colors">Clear All</button>
                  </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 bg-gray-50 p-4 rounded-xl border border-gray-200">
                  {availableModules.map(mod => (
                    <label key={mod.id} className={`flex items-center gap-3 cursor-pointer group px-3 py-2.5 rounded-lg border transition-all ${
                      formData.assigned_modules.includes(mod.id) 
                        ? 'bg-indigo-50 border-indigo-200' 
                        : 'bg-white border-gray-200 hover:border-indigo-200'
                    }`}>
                      <div className="relative flex items-center justify-center">
                        <input 
                          type="checkbox" 
                          checked={formData.assigned_modules.includes(mod.id)}
                          onChange={() => handleModuleToggle(mod.id)}
                          className="peer appearance-none w-5 h-5 border-2 border-gray-300 rounded focus:ring-2 focus:ring-indigo-600 focus:outline-none checked:border-indigo-600 checked:bg-indigo-600 transition-all cursor-pointer"
                        />
                        <svg className="absolute w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                        </svg>
                      </div>
                      <span className="text-sm text-gray-700 font-medium">{mod.label}</span>
                    </label>
                  ))}
                </div>
                <p className="text-xs text-gray-400 mt-2">
                  Selected: {formData.assigned_modules.length} / {availableModules.length} modules
                </p>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <button type="button" onClick={() => setShowAddForm(false)} className="px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-all text-sm">
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={creating}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-3 px-8 rounded-xl shadow-lg shadow-indigo-200 transition-all text-sm disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {creating ? (
                    <>
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                      Creating...
                    </>
                  ) : '✅ Create Account'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="relative flex-1">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input 
              type="text" 
              placeholder="Search by name, username or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
            />
          </div>
          <select 
            value={filterRole} 
            onChange={(e) => setFilterRole(e.target.value)}
            className="px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
          >
            <option value="">All Roles</option>
            {roles.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>

        {/* Users Count */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-sm font-semibold text-gray-600">{filteredUsers.length} users found</span>
          {(searchQuery || filterRole) && (
            <button onClick={() => { setSearchQuery(''); setFilterRole(''); }} className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold">
              Clear filters
            </button>
          )}
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-gray-500 text-xs uppercase tracking-wider font-semibold">
                  <th className="p-4">ID</th>
                  <th className="p-4">User Info</th>
                  <th className="p-4">Login Credentials</th>
                  <th className="p-4">Role</th>
                  <th className="p-4">Modules</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {loading ? (
                  <tr><td colSpan="7" className="p-8 text-center text-gray-400">
                    <div className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5 text-indigo-500" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                      Loading accounts...
                    </div>
                  </td></tr>
                ) : filteredUsers.length === 0 ? (
                  <tr><td colSpan="7" className="p-12 text-center">
                    <div className="text-3xl mb-3">👤</div>
                    <p className="text-gray-500 font-medium">No accounts found</p>
                    <p className="text-gray-400 text-sm mt-1">Create a new user to get started</p>
                  </td></tr>
                ) : (
                  filteredUsers.map((u) => (
                    <tr key={u.id} className="hover:bg-gray-50/80 transition-colors group">
                      <td className="p-4 text-xs font-bold text-gray-400">#{u.id}</td>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center shrink-0">
                            <span className="text-white font-bold text-sm">{u.name?.charAt(0)?.toUpperCase() || '?'}</span>
                          </div>
                          <div>
                            <p className="text-sm font-bold text-gray-900">{u.name}</p>
                            {u.phone && <p className="text-xs text-gray-400 mt-0.5">📱 {u.phone}</p>}
                            {u.flat_no && <p className="text-xs text-gray-400">🏠 {u.flat_no}</p>}
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div>
                          <p className="text-sm font-mono text-gray-700 bg-gray-50 px-2 py-0.5 rounded inline-block">{u.username}</p>
                          {u.email && <p className="text-xs text-gray-400 mt-1">✉️ {u.email}</p>}
                        </div>
                      </td>
                      <td className="p-4">
                        <span className={`px-2.5 py-1 text-xs font-bold rounded-lg border ${roleColors[u.role] || 'bg-gray-100 text-gray-700 border-gray-200'}`}>
                          {u.role}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex flex-wrap gap-1 max-w-[180px]">
                          {u.assigned_modules && u.assigned_modules.length > 0 ? (
                            <>
                              {u.assigned_modules.slice(0, 3).map((m, i) => (
                                <span key={i} className="px-2 py-0.5 bg-indigo-50 text-indigo-600 text-[10px] font-bold rounded border border-indigo-100">
                                  {m}
                                </span>
                              ))}
                              {u.assigned_modules.length > 3 && (
                                <span className="px-2 py-0.5 bg-gray-100 text-gray-500 text-[10px] font-bold rounded">
                                  +{u.assigned_modules.length - 3} more
                                </span>
                              )}
                            </>
                          ) : (
                            <span className="text-xs text-gray-400 italic">No modules</span>
                          )}
                        </div>
                      </td>
                      <td className="p-4">
                        <button 
                          onClick={() => handleToggleStatus(u.id)}
                          className={`px-3 py-1 text-xs font-bold rounded-lg border cursor-pointer transition-all hover:shadow-sm ${
                            u.status === 'Active' 
                              ? 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100' 
                              : 'bg-red-50 text-red-700 border-red-200 hover:bg-red-100'
                          }`}
                        >
                          {u.status === 'Active' ? '● Active' : '○ Inactive'}
                        </button>
                      </td>
                      <td className="p-4 text-right">
                        <button 
                          onClick={() => handleDeleteUser(u.id, u.name)}
                          className="px-3 py-1.5 text-xs font-semibold text-red-600 hover:text-white hover:bg-red-600 border border-red-200 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                        >
                          Delete
                        </button>
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
