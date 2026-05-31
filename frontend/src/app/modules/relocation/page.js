'use client';
import React, { useState } from 'react';
import { Truck, FileText, Calendar, MapPin, User, CheckCircle, XCircle, Clock } from 'lucide-react';

export default function RelocationModule() {
  const [requests, setRequests] = useState([
    { id: 1, flat: 'A-405', name: 'Vikram Singh', type: 'Move Out', date: '25 May 2026', status: 'Pending Approval', phone: '+91 98765 43210', items: 'Furniture, Appliances', reason: 'Job Transfer' },
    { id: 2, flat: 'C-201', name: 'Neha Sharma', type: 'Move In', date: '28 May 2026', status: 'Approved', phone: '+91 87654 32109', items: 'Household Items', reason: 'New Tenant' },
  ]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleViewDetails = (request) => {
    setSelectedRequest(request);
    setShowModal(true);
  };

  const handleApprove = (id) => {
    setRequests(requests.map(r => r.id === id ? { ...r, status: 'Approved' } : r));
    setShowModal(false);
    alert('Request approved successfully!');
  };

  const handleReject = (id) => {
    setRequests(requests.map(r => r.id === id ? { ...r, status: 'Rejected' } : r));
    setShowModal(false);
    alert('Request rejected!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-black text-gray-900 flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-lime-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg shadow-lime-500/20">
                <Truck size={24} className="text-white" />
              </div>
              Relocation Gatepass
            </h1>
            <p className="text-gray-500 mt-2 text-sm">Manage move-in and move-out clearances for tenants</p>
          </div>
          <button className="bg-gradient-to-r from-lime-600 to-green-600 hover:from-lime-700 hover:to-green-700 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-lime-500/30 hover:shadow-lime-500/50 transition-all flex items-center gap-2">
            <FileText size={18} /> New Request
          </button>
        </div>

        {/* Requests Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {requests.map((r) => (
            <div key={r.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-lime-300 transition-all">
              <div className="flex justify-between items-start mb-4">
                <span className={`px-3 py-1 text-xs font-bold rounded-lg ${
                  r.type === 'Move In' ? 'bg-blue-100 text-blue-700' : 'bg-orange-100 text-orange-700'
                }`}>{r.type.toUpperCase()}</span>
                <span className={`px-2 py-1 text-[10px] font-bold rounded-full ${
                  r.status === 'Approved' ? 'bg-green-100 text-green-700' : 
                  r.status === 'Rejected' ? 'bg-red-100 text-red-700' : 
                  'bg-yellow-100 text-yellow-700'
                }`}>{r.status}</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">{r.name}</h3>
              <p className="text-sm text-gray-500 font-medium mb-4">{r.flat}</p>
              <div className="flex items-center gap-2 text-xs text-gray-400 mb-4">
                <Calendar size={14} />
                {r.date}
              </div>
              <button 
                onClick={() => handleViewDetails(r)}
                className="w-full py-2.5 bg-lime-50 text-lime-700 font-bold rounded-xl hover:bg-lime-100 transition-colors text-sm"
              >
                View Details →
              </button>
            </div>
          ))}
        </div>

        {/* Details Modal */}
        {showModal && selectedRequest && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-lg w-full p-8 shadow-2xl border border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-black text-gray-900 flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-lime-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                    <FileText size={20} className="text-white" />
                  </div>
                  Request Details
                </h2>
                <button 
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600 text-2xl font-bold transition-colors"
                >
                  &times;
                </button>
              </div>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <User size={20} className="text-lime-600" />
                  <div>
                    <p className="text-xs text-gray-500 font-bold uppercase">Name</p>
                    <p className="font-semibold text-gray-900">{selectedRequest.name}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <MapPin size={20} className="text-lime-600" />
                  <div>
                    <p className="text-xs text-gray-500 font-bold uppercase">Flat</p>
                    <p className="font-semibold text-gray-900">{selectedRequest.flat}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <Calendar size={20} className="text-lime-600" />
                  <div>
                    <p className="text-xs text-gray-500 font-bold uppercase">Date</p>
                    <p className="font-semibold text-gray-900">{selectedRequest.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <FileText size={20} className="text-lime-600" />
                  <div>
                    <p className="text-xs text-gray-500 font-bold uppercase">Type</p>
                    <p className="font-semibold text-gray-900">{selectedRequest.type}</p>
                  </div>
                </div>
                <div className="p-3 bg-gray-50 rounded-xl">
                  <p className="text-xs text-gray-500 font-bold uppercase mb-1">Phone</p>
                  <p className="font-semibold text-gray-900">{selectedRequest.phone}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-xl">
                  <p className="text-xs text-gray-500 font-bold uppercase mb-1">Items</p>
                  <p className="font-semibold text-gray-900">{selectedRequest.items}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-xl">
                  <p className="text-xs text-gray-500 font-bold uppercase mb-1">Reason</p>
                  <p className="font-semibold text-gray-900">{selectedRequest.reason}</p>
                </div>
              </div>

              {selectedRequest.status === 'Pending Approval' && (
                <div className="flex gap-3 pt-4 border-t border-gray-100">
                  <button
                    onClick={() => handleReject(selectedRequest.id)}
                    className="flex-1 py-3 bg-red-50 text-red-700 font-bold rounded-xl hover:bg-red-100 transition-colors flex items-center justify-center gap-2"
                  >
                    <XCircle size={18} /> Reject
                  </button>
                  <button
                    onClick={() => handleApprove(selectedRequest.id)}
                    className="flex-1 py-3 bg-gradient-to-r from-lime-600 to-green-600 hover:from-lime-700 hover:to-green-700 text-white font-bold rounded-xl shadow-lg shadow-lime-500/30 hover:shadow-lime-500/50 transition-all flex items-center justify-center gap-2"
                  >
                    <CheckCircle size={18} /> Approve
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
