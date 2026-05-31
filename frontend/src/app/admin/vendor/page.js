'use client';
import React, { useState, useEffect } from 'react';

export default function AdminVendorManagement() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', contact: '', type: 'DG Maintenance' });
  const [vendorHistory, setVendorHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [showQRModal, setShowQRModal] = useState(false);

  const fetchVendors = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/vendors');
      const data = await res.json();
      setVendorHistory(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVendors();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/vendor/visit-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ vendor_name: formData.name, purpose: formData.type, status: 'Approved' })
      });
      if (res.ok) {
        alert('Vendor created successfully! QR Code Generated.');
        setShowAddForm(false);
        fetchVendors();
      } else {
        alert('Failed to create. Please check backend connection.');
      }
    } catch (err) {
      console.error(err);
      alert('Error connecting to backend API.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div>
            <h1 className="text-3xl font-extrabold text-green-900">🛠️ Vendor Directory</h1>
            <p className="text-gray-500 mt-2">Manage society vendors and their visit history.</p>
          </div>
          <div className="mt-4 sm:mt-0 space-x-3 flex">
            <a href="/admin" className="px-5 py-2.5 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors">
              Back to Admin Menu
            </a>
            <button 
              onClick={() => setShowAddForm(!showAddForm)}
              className="px-5 py-2.5 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors shadow-sm"
            >
              {showAddForm ? 'View Directory' : '+ Add New Vendor'}
            </button>
          </div>
        </div>

        {!showAddForm && (
          <div className="bg-white p-6 rounded-2xl border-l-4 border-green-500 shadow-sm flex justify-between items-center mb-6 w-1/3">
            <div>
              <p className="text-sm font-semibold text-gray-500 uppercase">Active Vendors</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{vendorHistory.length}</p>
            </div>
            <span className="text-4xl">🛠️</span>
          </div>
        )}

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden p-6 sm:p-8">
          {showAddForm ? (
            <div className="max-w-2xl mx-auto animate-fade-in-up">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Register New Vendor</h2>
              <form className="space-y-6" onSubmit={handleCreate}>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Company Name</label>
                    <input type="text" name="name" onChange={handleInputChange} value={formData.name} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-600 outline-none" required />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                    <input type="tel" name="contact" onChange={handleInputChange} value={formData.contact} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-600 outline-none" required />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Service Type</label>
                  <select name="type" onChange={handleInputChange} value={formData.type} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-600 bg-white outline-none">
                    <option>DG Maintenance</option><option>STP Cleaning</option><option>Elevator Service</option><option>Water Tanker</option>
                  </select>
                </div>
                <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-xl shadow-md transition-all">Save Vendor & Generate QR</button>
              </form>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 text-gray-600 text-sm uppercase tracking-wider">
                    <th className="p-4 rounded-tl-lg font-semibold">ID</th>
                    <th className="p-4 font-semibold">Company & Time</th>
                    <th className="p-4 font-semibold">Service Type</th>
                    <th className="p-4 font-semibold">Status</th>
                    <th className="p-4 rounded-tr-lg font-semibold text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {loading ? (
                    <tr><td colSpan="5" className="p-4 text-center text-gray-500">Loading dynamic history...</td></tr>
                  ) : vendorHistory.length === 0 ? (
                    <tr><td colSpan="5" className="p-4 text-center text-gray-500">No vendors found.</td></tr>
                  ) : vendorHistory.map((item, idx) => (
                    <tr key={idx} className="hover:bg-gray-50">
                      <td className="p-4 text-sm font-medium">VND-{item.id}</td>
                      <td className="p-4 text-sm text-gray-700">
                        <div className="font-bold">{item.vendor_name}</div>
                        {item.request_time && <div className="text-xs text-gray-400 mt-1">Req: {new Date(item.request_time).toLocaleString()}</div>}
                      </td>
                      <td className="p-4"><span className="px-3 py-1 bg-green-50 text-green-700 text-xs font-bold rounded-full">{item.purpose}</span></td>
                      <td className="p-4"><span className="px-3 py-1 text-xs font-bold rounded-full bg-green-100 text-green-700">{item.status}</span></td>
                      <td className="p-4 text-right">
                        <button 
                          onClick={() => {
                            setSelectedVendor(item);
                            setShowQRModal(true);
                          }}
                          className="text-green-600 font-semibold text-sm hover:text-green-700"
                        >
                          View QR
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* QR Code Modal */}
        {showQRModal && selectedVendor && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl border border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-black text-gray-900">Vendor QR Code</h2>
                <button 
                  onClick={() => setShowQRModal(false)}
                  className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
                >
                  &times;
                </button>
              </div>
              <div className="text-center">
                <div className="bg-gray-100 p-6 rounded-2xl inline-block mb-6">
                  <div className="w-48 h-48 bg-white rounded-xl flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-6xl mb-2">📱</div>
                      <p className="text-xs text-gray-500">QR Code</p>
                      <p className="text-lg font-bold text-gray-800 mt-2">VND-{selectedVendor.id}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-2 mb-6">
                  <p className="text-sm font-semibold text-gray-700">Company: {selectedVendor.vendor_name}</p>
                  <p className="text-sm text-gray-500">Purpose: {selectedVendor.purpose}</p>
                  <p className="text-sm text-gray-500">Status: {selectedVendor.status}</p>
                </div>
                <button 
                  onClick={() => setShowQRModal(false)}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-xl transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
