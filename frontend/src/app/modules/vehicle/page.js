'use client';
import React from 'react';

export default function VehicleModule() {
  const vehicleLog = [
    { number: 'MH 12 AB 1234', type: 'Resident', time: '12:15 PM', status: 'Allowed (Boom Opened)', accuracy: '98%' },
    { number: 'MH 14 XX 9999', type: 'Unknown', time: '12:05 PM', status: 'Blocked (Guard Alerted)', accuracy: '95%' },
    { number: 'DL 01 CD 5678', type: 'Guest', time: '11:50 AM', status: 'Allowed (Temp Pass)', accuracy: '96%' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6 flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900">🚗 Vehicle ANPR Log</h1>
            <p className="text-gray-500 mt-1">Automatic Number Plate Recognition system</p>
          </div>
          <a href="/" className="px-5 py-2.5 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors">
            Home
          </a>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 sm:p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">Live Camera Feed & Logs</h2>
              <button className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700">Manual Entry Override</button>
            </div>
            
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-red-50 text-red-800 text-sm tracking-wider">
                  <th className="p-4 rounded-tl-lg font-semibold">Vehicle Number</th>
                  <th className="p-4 font-semibold">Type</th>
                  <th className="p-4 font-semibold">Time</th>
                  <th className="p-4 font-semibold">OCR Accuracy</th>
                  <th className="p-4 rounded-tr-lg font-semibold">Action Taken</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {vehicleLog.map((log, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="p-4 font-mono font-bold text-lg text-gray-800 border-l-4 border-transparent hover:border-red-500">
                      {log.number}
                    </td>
                    <td className="p-4 font-semibold text-gray-600">{log.type}</td>
                    <td className="p-4 text-gray-500">{log.time}</td>
                    <td className="p-4 text-sm font-medium text-gray-400">{log.accuracy}</td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        log.status.includes('Allowed') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {log.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
