'use client';
import React, { useState, useEffect } from 'react';
import { QrCode, Edit, Trash2, Plus, Package, Clock, CheckCircle, XCircle } from 'lucide-react';

export default function VendorModule() {
  const [vendorVisits, setVendorVisits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showQRModal, setShowQRModal] = useState(null);
  const [editingVendor, setEditingVendor] = useState(null);
  const [newVendor, setNewVendor] = useState({
    vendor_name: '',
    purpose: 'General Maintenance',
    status: 'Working'
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    // Load vendors from localStorage
    const storedVendors = localStorage.getItem('society_vendors');
    if (storedVendors) {
      setVendorVisits(JSON.parse(storedVendors));
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    // Save vendors to localStorage whenever they change
    localStorage.setItem('society_vendors', JSON.stringify(vendorVisits));
  }, [vendorVisits]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newVendor.vendor_name.trim()) return;
    
    if (editingVendor) {
      // Update existing vendor
      setVendorVisits(vendorVisits.map(v => v.id === editingVendor.id ? {
        ...v,
        vendor_name: newVendor.vendor_name,
        purpose: newVendor.purpose,
        status: newVendor.status
      } : v));
      setEditingVendor(null);
      alert('Vendor updated successfully!');
    } else {
      // Create new vendor
      const newVendorEntry = {
        id: vendorVisits.length + 1,
        vendor_name: newVendor.vendor_name,
        purpose: newVendor.purpose,
        status: newVendor.status,
        request_time: new Date().toISOString(),
        passCode: 'VP-' + Math.random().toString(36).substring(2, 8).toUpperCase()
      };
      setVendorVisits([newVendorEntry, ...vendorVisits]);
      alert('Vendor pass created successfully!');
    }
    
    setNewVendor({ vendor_name: '', purpose: 'General Maintenance', status: 'Working' });
    setIsModalOpen(false);
  };

  const handleEdit = (vendor) => {
    setEditingVendor(vendor);
    setNewVendor({
      vendor_name: vendor.vendor_name,
      purpose: vendor.purpose,
      status: vendor.status
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this vendor entry?')) {
      setVendorVisits(vendorVisits.filter(v => v.id !== id));
      alert('Vendor entry deleted successfully!');
    }
  };

  const handleViewQR = (vendor) => {
    setShowQRModal(vendor);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-black text-gray-900 flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/20">
                <Package size={24} className="text-white" />
              </div>
              Vendor Pass Module
            </h1>
            <p className="text-gray-500 mt-2 text-sm">Manage vendor visit requests & work logging</p>
          </div>
          <button 
            onClick={() => { setEditingVendor(null); setNewVendor({ vendor_name: '', purpose: 'General Maintenance', status: 'Working' }); setIsModalOpen(true); }}
            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-green-500/30 hover:shadow-green-500/50 transition-all flex items-center gap-2"
          >
            <Plus size={18} /> New Request
          </button>
        </div>

        {/* Vendor Visits Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 sm:p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Today's Vendor Visits</h2>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 text-gray-600 text-xs font-bold uppercase tracking-wider">
                    <th className="p-4 rounded-tl-lg">ID</th>
                    <th className="p-4">Company & Time</th>
                    <th className="p-4">Purpose</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Pass Code</th>
                    <th className="p-4 rounded-tr-lg text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {loading ? (
                    <tr><td colSpan="6" className="p-8 text-center text-gray-500">Loading...</td></tr>
                  ) : vendorVisits.length === 0 ? (
                    <tr><td colSpan="6" className="p-8 text-center text-gray-500">No vendor visits found.</td></tr>
                  ) : vendorVisits.map((visit) => (
                    <tr key={visit.id} className="hover:bg-gray-50 transition-colors">
                      <td className="p-4 text-sm font-bold text-gray-800">VND-{visit.id}</td>
                      <td className="p-4 text-sm text-gray-700">
                        <div className="font-bold text-gray-900">{visit.vendor_name}</div>
                        <div className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                          <Clock size={12} />
                          {visit.request_time ? new Date(visit.request_time).toLocaleString() : 'N/A'}
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="px-3 py-1 bg-green-50 text-green-700 text-xs font-bold rounded-lg">{visit.purpose}</span>
                      </td>
                      <td className="p-4">
                        <span className={`px-3 py-1 text-xs font-bold rounded-lg flex items-center gap-1 w-fit ${
                          visit.status === 'Working' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
                        }`}>
                          {visit.status === 'Working' ? <Clock size={12} /> : <CheckCircle size={12} />}
                          {visit.status}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className="font-mono bg-gray-100 px-3 py-1 rounded-lg text-xs font-bold text-gray-700">{visit.passCode}</span>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button 
                            onClick={() => handleViewQR(visit)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="View QR"
                          >
                            <QrCode size={18} />
                          </button>
                          <button 
                            onClick={() => handleEdit(visit)}
                            className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <Edit size={18} />
                          </button>
                          <button 
                            onClick={() => handleDelete(visit.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* New/Edit Vendor Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-black text-gray-900 flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                  {editingVendor ? <Edit size={20} className="text-white" /> : <Plus size={20} className="text-white" />}
                </div>
                {editingVendor ? 'Edit Vendor Pass' : 'New Vendor Pass'}
              </h2>
              <button 
                onClick={() => { setIsModalOpen(false); setEditingVendor(null); }}
                className="text-gray-400 hover:text-gray-600 text-2xl font-bold transition-colors"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                  Vendor / Service Provider Name
                </label>
                <input 
                  type="text"
                  required
                  value={newVendor.vendor_name}
                  onChange={(e) => setNewVendor({ ...newVendor, vendor_name: e.target.value })}
                  placeholder="e.g. John's Plumbing Services"
                  className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all text-gray-800 font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                  Purpose / Service Category
                </label>
                <select
                  value={newVendor.purpose}
                  onChange={(e) => setNewVendor({ ...newVendor, purpose: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all text-gray-800 font-bold"
                >
                  <option value="Plumbing Services">Plumbing Services</option>
                  <option value="Electrical Repair">Electrical Repair</option>
                  <option value="Delivery / Courier">Delivery / Courier</option>
                  <option value="Housekeeping / Cleaning">Housekeeping / Cleaning</option>
                  <option value="Broadband / Fiber Install">Broadband / Fiber Install</option>
                  <option value="General Maintenance">General Maintenance</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                  Current Status
                </label>
                <div className="flex gap-4">
                  <label className="flex-1 flex items-center justify-between p-3 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-green-500 hover:bg-green-50 transition-colors">
                    <span className="text-sm font-bold text-gray-700 flex items-center gap-2">
                      <Clock size={16} className="text-blue-500" /> Working
                    </span>
                    <input 
                      type="radio" 
                      name="status"
                      value="Working"
                      checked={newVendor.status === 'Working'}
                      onChange={() => setNewVendor({ ...newVendor, status: 'Working' })}
                      className="text-green-600 focus:ring-green-500"
                    />
                  </label>

                  <label className="flex-1 flex items-center justify-between p-3 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-green-500 hover:bg-green-50 transition-colors">
                    <span className="text-sm font-bold text-gray-700 flex items-center gap-2">
                      <CheckCircle size={16} className="text-green-500" /> Completed
                    </span>
                    <input 
                      type="radio" 
                      name="status"
                      value="Completed"
                      checked={newVendor.status === 'Completed'}
                      onChange={() => setNewVendor({ ...newVendor, status: 'Completed' })}
                      className="text-green-600 focus:ring-green-500"
                    />
                  </label>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => { setIsModalOpen(false); setEditingVendor(null); }}
                  className="px-6 py-3 text-gray-600 hover:text-gray-800 font-bold rounded-xl hover:bg-gray-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold rounded-xl shadow-lg shadow-green-500/30 hover:shadow-green-500/50 transition-all"
                >
                  {editingVendor ? 'Update' : 'Create Pass'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* QR Code Modal */}
      {showQRModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-8 shadow-2xl border border-gray-100 text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-500/20">
              <QrCode size={40} className="text-white" />
            </div>
            <h2 className="text-2xl font-black text-gray-900 mb-2">Vendor Pass QR</h2>
            <p className="text-gray-600 mb-6">
              <strong className="text-gray-900">{showQRModal.vendor_name}</strong>
            </p>
            <div className="bg-gray-100 p-6 rounded-2xl mb-6">
              <div className="text-4xl font-black text-gray-800 font-mono">{showQRModal.passCode}</div>
            </div>
            <div className="text-sm text-gray-500 mb-4">
              <p className="font-semibold text-gray-700">Purpose: {showQRModal.purpose}</p>
              <p className="font-semibold text-gray-700">Status: {showQRModal.status}</p>
            </div>
            <button
              onClick={() => setShowQRModal(null)}
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-xl shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
