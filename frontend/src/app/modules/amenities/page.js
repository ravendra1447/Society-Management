'use client';
import React, { useState } from 'react';

export default function AmenitiesModule() {
  const [selectedAmenity, setSelectedAmenity] = useState('Tennis Court');
  const [selectedDate, setSelectedDate] = useState('2026-05-25');
  const [selectedSlot, setSelectedSlot] = useState('');
  
  const amenities = ['Tennis Court', 'Clubhouse', 'Swimming Pool', 'Gymnasium', 'Party Hall'];
  const timeSlots = [
    { time: '06:00 AM - 07:00 AM', status: 'Available' },
    { time: '07:00 AM - 08:00 AM', status: 'Booked' },
    { time: '08:00 AM - 09:00 AM', status: 'Available' },
    { time: '05:00 PM - 06:00 PM', status: 'Booked' },
    { time: '06:00 PM - 07:00 PM', status: 'Available' },
    { time: '07:00 PM - 08:00 PM', status: 'Available' }
  ];

  const handleBook = () => {
    if (!selectedSlot) return alert('Please select a time slot!');
    alert(`Successfully booked ${selectedAmenity} for ${selectedDate} at ${selectedSlot}!`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
          <div>
            <h1 className="text-3xl font-extrabold text-indigo-900 tracking-tight">🎾 Smart Amenity Booking</h1>
            <p className="text-gray-500 mt-1 text-sm">Reserve clubhouse, courts, and party halls instantly.</p>
          </div>
          <a href="/" className="mt-4 sm:mt-0 px-5 py-2.5 bg-indigo-50 text-indigo-700 font-semibold rounded-lg hover:bg-indigo-100 transition-colors shadow-sm">
            Dashboard
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left - Select Amenity */}
          <div className="lg:col-span-1 space-y-4">
            <h3 className="font-bold text-gray-800 text-lg mb-4">1. Select Facility</h3>
            {amenities.map(a => (
              <button 
                key={a}
                onClick={() => setSelectedAmenity(a)}
                className={`w-full text-left p-4 rounded-xl border ${selectedAmenity === a ? 'bg-indigo-600 text-white border-indigo-700 shadow-md' : 'bg-white text-gray-700 border-gray-200 hover:border-indigo-300'}`}
              >
                <div className="font-bold">{a}</div>
                <div className={`text-xs mt-1 ${selectedAmenity === a ? 'text-indigo-200' : 'text-gray-400'}`}>Max capacity: 15 pax</div>
              </button>
            ))}
          </div>

          {/* Right - Calendar & Slots */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8">
            <h3 className="font-bold text-gray-800 text-lg mb-6">2. Select Date & Time</h3>
            
            <div className="mb-8">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Booking Date</label>
              <input 
                type="date" 
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full sm:w-1/2 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-600 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-4">Available Slots for {selectedAmenity}</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {timeSlots.map(slot => (
                  <button 
                    key={slot.time}
                    disabled={slot.status === 'Booked'}
                    onClick={() => setSelectedSlot(slot.time)}
                    className={`p-4 rounded-xl border text-center transition-all ${
                      slot.status === 'Booked' 
                        ? 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed opacity-60' 
                        : selectedSlot === slot.time 
                          ? 'bg-green-50 border-green-500 text-green-800 ring-2 ring-green-500 shadow-sm'
                          : 'bg-white border-gray-200 text-gray-700 hover:border-green-400'
                    }`}
                  >
                    <div className="font-bold text-sm">{slot.time}</div>
                    <div className={`text-xs mt-1 font-bold ${slot.status === 'Booked' ? 'text-red-500' : 'text-green-600'}`}>{slot.status.toUpperCase()}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-10 border-t border-gray-100 pt-6 flex justify-end">
               <button onClick={handleBook} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-xl shadow-lg transition-transform transform hover:-translate-y-0.5">
                 Confirm Booking
               </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
