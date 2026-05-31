'use client';
import React, { useState, useEffect } from 'react';

export default function ComplaintsModule() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({ title: '', description: '', category: 'Plumbing', raised_by: '' });

  const fetchComplaints = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/complaints');
      const data = await res.json();
      setComplaints(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/complaints', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        alert('Complaint Registered Successfully!');
        setShowAddForm(false);
        setFormData({ title: '', description: '', category: 'Plumbing', raised_by: '' });
        fetchComplaints();
      }
    } catch (err) {
      console.error(err);
      alert('Error registering complaint.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div>
            <h1 className="text-3xl font-extrabold text-orange-900">📋 Helpdesk & Complaints</h1>
            <p className="text-gray-500 mt-2">Track and resolve resident issues efficiently.</p>
          </div>
          <div className="mt-4 sm:mt-0 space-x-3 flex">
            <a href="/" className="px-5 py-2.5 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors">
              Home
            </a>
            <button 
              onClick={() => setShowAddForm(!showAddForm)}
              className="px-5 py-2.5 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition-colors shadow-sm"
            >
              {showAddForm ? 'View Helpdesk' : '+ Raise Issue'}
            </button>
          </div>
        </div>

        {showAddForm ? (
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden p-6 sm:p-8 max-w-2xl mx-auto animate-fade-in-up">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Raise a New Complaint</h2>
            <form className="space-y-6" onSubmit={handleCreate}>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Flat Number / Name</label>
                  <input type="text" name="raised_by" onChange={handleInputChange} value={formData.raised_by} placeholder="e.g., Tower A, Flat 101" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-orange-600 outline-none" required />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Issue Category</label>
                  <select name="category" onChange={handleInputChange} value={formData.category} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-orange-600 bg-white outline-none">
                    <option>Electrical</option><option>Plumbing</option><option>Housekeeping</option><option>Security</option><option>Other</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Issue Title</label>
                <input type="text" name="title" onChange={handleInputChange} value={formData.title} placeholder="Brief summary of the issue" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-orange-600 outline-none" required />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                <textarea name="description" rows="4" onChange={handleInputChange} value={formData.description} placeholder="Describe the problem in detail" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-orange-600 outline-none resize-none" required></textarea>
              </div>
              <button type="submit" className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 px-8 rounded-xl shadow-md transition-all">Submit Complaint</button>
            </form>
          </div>
        ) : (
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto p-4 sm:p-6">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-orange-50 text-orange-900 text-sm uppercase tracking-wider">
                    <th className="p-4 rounded-tl-lg font-semibold">TKT ID</th>
                    <th className="p-4 font-semibold">Resident</th>
                    <th className="p-4 font-semibold">Issue Details</th>
                    <th className="p-4 font-semibold">Category</th>
                    <th className="p-4 font-semibold">Status</th>
                    <th className="p-4 rounded-tr-lg font-semibold text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {loading ? (
                    <tr><td colSpan="6" className="p-4 text-center text-gray-500">Loading Helpdesk...</td></tr>
                  ) : complaints.length === 0 ? (
                    <tr><td colSpan="6" className="p-4 text-center text-gray-500">No active complaints! Everything is fine.</td></tr>
                  ) : (
                    complaints.map((c, idx) => (
                      <tr key={idx} className="hover:bg-gray-50 transition-colors">
                        <td className="p-4 text-sm font-bold text-gray-600">#{c.id}</td>
                        <td className="p-4 text-sm font-semibold text-gray-900">{c.raised_by}</td>
                        <td className="p-4">
                          <div className="text-sm font-bold text-gray-800">{c.title}</div>
                          <div className="text-xs text-gray-500 mt-1">{new Date(c.createdAt).toLocaleDateString()}</div>
                        </td>
                        <td className="p-4">
                          <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-bold rounded-full border border-gray-200">
                            {c.category}
                          </span>
                        </td>
                        <td className="p-4">
                          <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                            c.status === 'Open' ? 'bg-red-100 text-red-700' : 
                            c.status === 'In Progress' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'
                          }`}>
                            {c.status}
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <button className="text-orange-600 font-semibold text-sm hover:text-orange-800">Assign / View</button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
