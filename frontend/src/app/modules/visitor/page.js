'use client';
import React, { useState, useEffect } from 'react';

export default function VisitorModule() {
  const [visitors, setVisitors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    type: 'Guest',
    flat: '',
    status: 'Pending Approval'
  });

  useEffect(() => {
    // Load visitors from localStorage
    const storedVisitors = localStorage.getItem('society_visitors');
    if (storedVisitors) {
      setVisitors(JSON.parse(storedVisitors));
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    // Save visitors to localStorage whenever they change
    localStorage.setItem('society_visitors', JSON.stringify(visitors));
  }, [visitors]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      // Save to backend API
      const res = await fetch('http://localhost:5000/api/visitor/entry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          visitor_name: formData.name,
          visitor_type: formData.type.toLowerCase(),
          resident_id: 1, // Default resident ID
          status: formData.status.toLowerCase().replace(' ', '')
        })
      });

      let backendData = null;
      if (res.ok) {
        backendData = await res.json();
      }

      // Save to localStorage (works even if backend fails)
      const newVisitor = {
        id: backendData?.id || visitors.length + 1,
        name: formData.name,
        type: formData.type,
        flat: formData.flat,
        status: formData.status,
        created_at: new Date().toISOString()
      };
      
      setVisitors([newVisitor, ...visitors]);
      setShowAddForm(false);
      setFormData({ name: '', type: 'Guest', flat: '', status: 'Pending Approval' });
      alert('Visitor created successfully!');
    } catch (err) {
      console.error(err);
      // Fallback to localStorage only if backend fails
      const newVisitor = {
        id: visitors.length + 1,
        name: formData.name,
        type: formData.type,
        flat: formData.flat,
        status: formData.status,
        created_at: new Date().toISOString()
      };
      
      setVisitors([newVisitor, ...visitors]);
      setShowAddForm(false);
      setFormData({ name: '', type: 'Guest', flat: '', status: 'Pending Approval' });
      alert('Visitor created successfully (saved locally)!');
    }
  };

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Visitor Management</h1>
            <p className="text-gray-500 mt-1 text-sm">Track guests, deliveries, and gate entries.</p>
          </div>
          <div className="mt-4 sm:mt-0 flex space-x-3">
            <button 
              onClick={() => setShowAddForm(!showAddForm)}
              className="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all shadow-md"
            >
              {showAddForm ? 'Cancel' : '+ New Entry'}
            </button>
            <a href="/modules/visitor/invite" className="px-5 py-2.5 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all shadow-md flex items-center">
              <span className="mr-2">📱</span> Send Invite
            </a>
          </div>
        </div>

        {showAddForm && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 mb-8 animate-fade-in-up">
            <h2 className="text-xl font-bold text-gray-800 mb-6 border-b pb-4">New Visitor Entry</h2>
            <form onSubmit={handleCreate} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Visitor Name</label>
                  <input type="text" name="name" onChange={handleInputChange} value={formData.name} placeholder="Enter visitor name" className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gray-900 outline-none text-sm" required />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Visitor Type</label>
                  <select name="type" onChange={handleInputChange} value={formData.type} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gray-900 outline-none text-sm">
                    <option value="Guest">Guest</option>
                    <option value="Delivery">Delivery</option>
                    <option value="Service">Service</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Flat Number</label>
                  <input type="text" name="flat" onChange={handleInputChange} value={formData.flat} placeholder="e.g. A-402" className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gray-900 outline-none text-sm" required />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
                  <select name="status" onChange={handleInputChange} value={formData.status} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gray-900 outline-none text-sm">
                    <option value="Pending Approval">Pending Approval</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end">
                <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-8 rounded-lg shadow-sm transition-all text-sm">Create Entry</button>
              </div>
            </form>
          </div>
        )}

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 sm:p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">Gate Entries</h2>
            </div>
            
            <div className="space-y-4">
              {loading ? (
                <p className="text-gray-500 text-center py-8">Loading visitors...</p>
              ) : visitors.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No visitors found.</p>
              ) : visitors.map((visitor, idx) => (
                <div key={idx} className="flex justify-between items-center p-4 border border-gray-100 rounded-xl hover:bg-gray-50">
                  <div className="flex items-center space-x-4">
                    <div className="h-12 w-12 bg-gray-200 rounded-full flex items-center justify-center text-xl">👤</div>
                    <div>
                      <h3 className="font-bold text-gray-900">{visitor.name}</h3>
                      <p className="text-sm text-gray-500">{visitor.type} • Flat: <span className="font-semibold text-gray-700">{visitor.flat}</span></p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      visitor.status === 'Approved' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {visitor.status}
                    </span>
                    <p className="text-xs text-gray-400 mt-2">{visitor.created_at ? new Date(visitor.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : 'Just now'}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
