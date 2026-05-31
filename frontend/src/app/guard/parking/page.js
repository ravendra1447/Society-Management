'use client';
import React, { useState } from 'react';
import { Car, AlertTriangle, CheckCircle, XCircle, MapPin, Clock } from 'lucide-react';

export default function ParkingManagementModule() {
  const [slots, setSlots] = useState([
    { id: 'B1-01', flat: 'A-402', vehicle: 'MH01AB1234', status: 'Occupied', entryTime: '09:30 AM' },
    { id: 'B1-02', flat: 'A-403', vehicle: '-', status: 'Vacant', entryTime: '-' },
    { id: 'B1-03', flat: 'B-105', vehicle: 'MH02XY9988', status: 'Occupied', entryTime: '10:15 AM' },
    { id: 'B1-04', flat: 'C-201', vehicle: 'DL4C9090', status: 'Violation', entryTime: '08:45 AM' },
    { id: 'B1-05', flat: 'C-202', vehicle: '-', status: 'Vacant', entryTime: '-' },
    { id: 'B1-06', flat: 'A-101', vehicle: 'MH12QW4455', status: 'Occupied', entryTime: '11:00 AM' },
    { id: 'B2-01', flat: 'B-302', vehicle: 'MH04EE1122', status: 'Occupied', entryTime: '07:30 AM' },
    { id: 'B2-02', flat: 'B-303', vehicle: '-', status: 'Vacant', entryTime: '-' },
  ]);

  const [violationModal, setViolationModal] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [showSlotModal, setShowSlotModal] = useState(false);
  const [formData, setFormData] = useState({ vehicle: '', flat: '' });

  const issueTicket = () => {
    setSlots(slots.map(s => s.id === violationModal.id ? { ...s, status: 'Occupied' } : s));
    alert(`Violation ticket issued successfully for vehicle ${violationModal.vehicle}`);
    setViolationModal(null);
  };

  const handleSlotClick = (slot) => {
    if (slot.status === 'Vacant') {
      setSelectedSlot(slot);
      setFormData({ vehicle: '', flat: '' });
      setShowSlotModal(true);
    } else if (slot.status === 'Occupied') {
      setSlots(slots.map(s => s.id === slot.id ? { ...s, status: 'Vacant', vehicle: '-', entryTime: '-' } : s));
      alert(`Vehicle ${slot.vehicle} vacated from slot ${slot.id}`);
    }
  };

  const handleAssign = (e) => {
    e.preventDefault();
    setSlots(slots.map(s => s.id === selectedSlot.id ? { 
      ...s, 
      vehicle: formData.vehicle, 
      flat: formData.flat, 
      status: 'Occupied',
      entryTime: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    } : s));
    setShowSlotModal(false);
    alert(`Vehicle ${formData.vehicle} assigned to slot ${selectedSlot.id}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-black text-gray-900 flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                <Car size={24} className="text-white" />
              </div>
              Parking Management
            </h1>
            <p className="text-gray-500 mt-2 text-sm">Monitor basement parking slots and manage violations</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow">
            <div>
              <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-1">Total Slots</p>
              <h2 className="text-3xl font-black text-gray-900">{slots.length}</h2>
            </div>
            <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
              <Car size={24} className="text-gray-600" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow">
            <div>
              <p className="text-sm font-bold text-green-600 uppercase tracking-wider mb-1">Available</p>
              <h2 className="text-3xl font-black text-green-700">{slots.filter(s => s.status === 'Vacant').length}</h2>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <CheckCircle size={24} className="text-green-600" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow">
            <div>
              <p className="text-sm font-bold text-red-600 uppercase tracking-wider mb-1">Violations</p>
              <h2 className="text-3xl font-black text-red-700">{slots.filter(s => s.status === 'Violation').length}</h2>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
              <AlertTriangle size={24} className="text-red-600" />
            </div>
          </div>
        </div>

        {/* Grid View */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <h3 className="font-bold text-gray-900 text-xl mb-6">Live Parking Grid</h3>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {slots.map((slot, i) => (
              <div 
                key={i} 
                onClick={() => slot.status === 'Violation' ? setViolationModal(slot) : handleSlotClick(slot)}
                className={`p-5 rounded-xl border-2 flex flex-col items-center justify-center text-center transition-all cursor-pointer ${
                  slot.status === 'Vacant' ? 'border-dashed border-gray-300 bg-gray-50 hover:border-blue-400 hover:bg-blue-50' :
                  slot.status === 'Violation' ? 'border-red-500 bg-red-50 hover:bg-red-100 shadow-lg shadow-red-500/20' :
                  'border-solid border-gray-200 bg-white hover:border-blue-400 hover:shadow-md'
                }`}
              >
                <div className="text-lg font-black text-gray-800 mb-2">{slot.id}</div>
                {slot.status === 'Vacant' ? (
                  <span className="text-xs font-bold text-gray-400">Click to Assign</span>
                ) : (
                  <>
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-black font-bold text-xs px-3 py-1 rounded-lg mb-2 font-mono shadow-sm">
                      {slot.vehicle}
                    </div>
                    <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider flex items-center gap-1">
                      <MapPin size={10} /> {slot.flat}
                    </div>
                    <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-1 flex items-center gap-1">
                      <Clock size={10} /> {slot.entryTime}
                    </div>
                  </>
                )}
                {slot.status === 'Violation' && (
                  <div className="mt-3 bg-red-600 text-white text-[10px] font-bold px-3 py-1 rounded-full animate-pulse">
                    VIOLATION
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Violation Modal */}
        {violationModal && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden p-8 text-center">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle size={40} className="text-red-600" />
              </div>
              <h2 className="text-2xl font-black text-gray-900 mb-2">Parking Violation!</h2>
              <p className="text-gray-600 mb-6">
                Vehicle <strong className="text-gray-900">{violationModal.vehicle}</strong> is parked in <strong className="text-gray-900">Slot {violationModal.id}</strong> which is assigned to <strong className="text-gray-900">Flat {violationModal.flat}</strong>.
              </p>
              
              <div className="flex gap-3">
                <button onClick={() => setViolationModal(null)} className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold rounded-xl transition-colors">
                  Cancel
                </button>
                <button onClick={issueTicket} className="flex-1 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold rounded-xl shadow-lg shadow-red-500/30 transition-all">
                  Issue Ticket
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Assign Vehicle Modal */}
        {showSlotModal && selectedSlot && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-black text-gray-900">Assign Vehicle</h2>
                <button onClick={() => setShowSlotModal(false)} className="text-gray-400 hover:text-gray-600 text-2xl font-bold">
                  &times;
                </button>
              </div>
              <form onSubmit={handleAssign} className="space-y-5">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                    Slot
                  </label>
                  <input 
                    type="text" 
                    value={selectedSlot.id}
                    disabled
                    className="w-full px-4 py-3 bg-gray-100 border-2 border-gray-200 rounded-xl text-gray-800 font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                    Vehicle Number
                  </label>
                  <input 
                    type="text"
                    value={formData.vehicle}
                    onChange={(e) => setFormData({ ...formData, vehicle: e.target.value })}
                    placeholder="e.g. MH01AB1234"
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-gray-800 font-bold font-mono"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                    Flat Number
                  </label>
                  <input 
                    type="text"
                    value={formData.flat}
                    onChange={(e) => setFormData({ ...formData, flat: e.target.value })}
                    placeholder="e.g. A-402"
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-gray-800 font-bold"
                    required
                  />
                </div>
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowSlotModal(false)}
                    className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold rounded-xl transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-xl shadow-lg shadow-blue-500/30 transition-all"
                  >
                    Assign
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
