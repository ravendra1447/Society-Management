'use client';
import React, { useState } from 'react';

export default function AdminResidentManagement() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', contact: '', block: '', type: 'Owner' });
  
  // Static for now since Resident model wasn't explicitly requested in initial schema but is part of UI
  const [residentHistory, setResidentHistory] = useState([
    { id: 'FLT-402', name: 'Amit Sharma', type: 'Owner', block: 'Tower A', status: 'Verified' },
    { id: 'FLT-105', name: 'Priya Patel', type: 'Tenant', block: 'Tower B', status: 'Verified' },
  ]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreate = (e) => {
    e.preventDefault();
    alert('Resident created successfully! App Invite Link Sent.');
    setResidentHistory([...residentHistory, { 
      id: `FLT-${Math.floor(Math.random() * 900) + 100}`, 
      name: formData.name, 
      type: formData.type, 
      block: formData.block, 
      status: 'Pending' 
    }]);
    setShowAddForm(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div>
            <h1 className="text-3xl font-extrabold text-purple-900">👨‍👩‍👧‍👦 Resident Directory</h1>
            <p className="text-gray-500 mt-2">Manage society residents, owners, and tenants.</p>
          </div>
          <div className="mt-4 sm:mt-0 space-x-3 flex">
            <a href="/admin" className="px-5 py-2.5 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors">
              Back to Admin Menu
            </a>
            <button 
              onClick={() => setShowAddForm(!showAddForm)}
              className="px-5 py-2.5 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors shadow-sm"
            >
              {showAddForm ? 'View Directory' : '+ Add New Resident'}
            </button>
          </div>
        </div>

        {!showAddForm && (
          <div className="bg-white p-6 rounded-2xl border-l-4 border-purple-500 shadow-sm flex justify-between items-center mb-6 w-1/3">
            <div>
              <p className="text-sm font-semibold text-gray-500 uppercase">Registered Residents</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{residentHistory.length}</p>
            </div>
            <span className="text-4xl">👨‍👩‍👧‍👦</span>
          </div>
        )}

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden p-6 sm:p-8">
          {showAddForm ? (
            <div className="max-w-2xl mx-auto animate-fade-in-up">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Register New Resident</h2>
              <form className="space-y-6" onSubmit={handleCreate}>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                    <input type="text" name="name" onChange={handleInputChange} value={formData.name} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-600 outline-none" required />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                    <input type="tel" name="contact" onChange={handleInputChange} value={formData.contact} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-600 outline-none" required />
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Flat / Tower No.</label>
                    <input type="text" name="block" onChange={handleInputChange} value={formData.block} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-600 outline-none" placeholder="Tower A, Flat 402" required />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Resident Type</label>
                    <select name="type" onChange={handleInputChange} value={formData.type} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-600 bg-white outline-none">
                      <option>Owner</option><option>Tenant</option>
                    </select>
                  </div>
                </div>
                <button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 px-8 rounded-xl shadow-md transition-all">Save Resident & Send Invite</button>
              </form>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 text-gray-600 text-sm uppercase tracking-wider">
                    <th className="p-4 rounded-tl-lg font-semibold">Flat ID</th>
                    <th className="p-4 font-semibold">Resident Name</th>
                    <th className="p-4 font-semibold">Type</th>
                    <th className="p-4 font-semibold">Block / Tower</th>
                    <th className="p-4 rounded-tr-lg font-semibold text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {residentHistory.length === 0 ? (
                    <tr><td colSpan="5" className="p-4 text-center text-gray-500">No residents found.</td></tr>
                  ) : residentHistory.map((item, idx) => (
                    <tr key={idx} className="hover:bg-gray-50">
                      <td className="p-4 text-sm font-medium">{item.id}</td>
                      <td className="p-4 text-sm text-gray-700 font-bold">{item.name}</td>
                      <td className="p-4"><span className="px-3 py-1 bg-purple-50 text-purple-700 text-xs font-bold rounded-full">{item.type}</span></td>
                      <td className="p-4 text-sm text-gray-600">{item.block}</td>
                      <td className="p-4 text-right"><span className={`px-3 py-1 text-xs font-bold rounded-full ${item.status === 'Verified' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{item.status}</span></td>
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
