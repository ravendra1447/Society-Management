'use client';
import React, { useState, useEffect } from 'react';

export default function SOSModule() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Auto-fetch SOS logs (simulate real-time monitoring for guards)
  useEffect(() => {
    // In a real app, this would be a WebSocket or interval polling
    const fetchLogs = async () => {
      // Mocking fetch since we don't have a specific API route for SOS yet, 
      // but the table exists in DB.
      setLogs([
        { id: 1, raised_by: 'Flat 402, Tower A', alert_type: 'Medical', status: 'Active', time: new Date() },
        { id: 2, raised_by: 'Flat 105, Tower C', alert_type: 'Stuck in Lift', status: 'Resolved', time: new Date(Date.now() - 3600000) }
      ]);
      setLoading(false);
    };
    fetchLogs();
  }, []);

  const triggerSOS = (type) => {
    alert(`🚨 EMERGENCY TRIGGERED: ${type} Alert sent to Security Desk immediately!`);
    setLogs([{ id: Date.now(), raised_by: 'My Flat', alert_type: type, status: 'Active', time: new Date() }, ...logs]);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-6 rounded-2xl shadow-sm border border-gray-200 border-l-4 border-l-red-600">
          <div>
            <h1 className="text-3xl font-extrabold text-red-700 tracking-tight">🚨 Emergency SOS</h1>
            <p className="text-gray-500 mt-1 text-sm">Instant alerts to the main security gate.</p>
          </div>
          <a href="/" className="mt-4 sm:mt-0 px-5 py-2.5 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors shadow-sm">
            Dashboard
          </a>
        </div>

        {/* SOS Trigger Panel for Residents */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <button onClick={() => triggerSOS('Medical')} className="group bg-white p-8 rounded-3xl shadow-sm border border-red-100 hover:bg-red-50 hover:shadow-xl transition-all flex flex-col items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-red-500 opacity-0 group-hover:opacity-10 transition-opacity"></div>
            <span className="text-6xl mb-4 group-hover:scale-110 transition-transform">🚑</span>
            <h3 className="text-xl font-bold text-red-900">Medical</h3>
            <p className="text-xs text-red-600 mt-2 font-medium">Ambulance / Doctor</p>
          </button>
          
          <button onClick={() => triggerSOS('Fire')} className="group bg-white p-8 rounded-3xl shadow-sm border border-orange-100 hover:bg-orange-50 hover:shadow-xl transition-all flex flex-col items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-orange-500 opacity-0 group-hover:opacity-10 transition-opacity"></div>
            <span className="text-6xl mb-4 group-hover:scale-110 transition-transform">🔥</span>
            <h3 className="text-xl font-bold text-orange-900">Fire</h3>
            <p className="text-xs text-orange-600 mt-2 font-medium">Fire Brigade Alert</p>
          </button>
          
          <button onClick={() => triggerSOS('Security')} className="group bg-white p-8 rounded-3xl shadow-sm border border-blue-100 hover:bg-blue-50 hover:shadow-xl transition-all flex flex-col items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-blue-500 opacity-0 group-hover:opacity-10 transition-opacity"></div>
            <span className="text-6xl mb-4 group-hover:scale-110 transition-transform">🛡️</span>
            <h3 className="text-xl font-bold text-blue-900">Security</h3>
            <p className="text-xs text-blue-600 mt-2 font-medium">Theft / Intruder</p>
          </button>
          
          <button onClick={() => triggerSOS('Stuck in Lift')} className="group bg-white p-8 rounded-3xl shadow-sm border border-purple-100 hover:bg-purple-50 hover:shadow-xl transition-all flex flex-col items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-purple-500 opacity-0 group-hover:opacity-10 transition-opacity"></div>
            <span className="text-6xl mb-4 group-hover:scale-110 transition-transform">🛗</span>
            <h3 className="text-xl font-bold text-purple-900">Lift Alert</h3>
            <p className="text-xs text-purple-600 mt-2 font-medium">Stuck in Elevator</p>
          </button>
        </div>

        {/* Live SOS Logs for Security Guards */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
            <h2 className="text-lg font-bold text-gray-800 flex items-center">
              <span className="w-3 h-3 rounded-full bg-red-600 animate-pulse mr-3"></span>
              Live Security Desk Feed
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white border-b border-gray-100 text-gray-500 text-xs uppercase tracking-wider font-semibold">
                  <th className="p-4">Time</th>
                  <th className="p-4">Location (Flat)</th>
                  <th className="p-4">Emergency Type</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {loading ? (
                  <tr><td colSpan="5" className="p-8 text-center text-gray-400">Monitoring feeds...</td></tr>
                ) : logs.map((log) => (
                  <tr key={log.id} className={log.status === 'Active' ? 'bg-red-50/30' : 'bg-white'}>
                    <td className="p-4 text-sm font-medium text-gray-600">
                      {log.time.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', second:'2-digit'})}
                    </td>
                    <td className="p-4 text-sm font-bold text-gray-900">{log.raised_by}</td>
                    <td className="p-4">
                      <span className="text-sm font-bold text-gray-800">{log.alert_type}</span>
                    </td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 text-xs font-bold rounded-md border ${
                        log.status === 'Active' ? 'bg-red-100 text-red-700 border-red-200 animate-pulse' : 'bg-green-50 text-green-700 border-green-200'
                      }`}>
                        {log.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      {log.status === 'Active' ? (
                        <button className="bg-red-600 text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-red-700 transition-colors shadow-sm">
                          Mark Resolved
                        </button>
                      ) : (
                        <span className="text-xs text-gray-400 font-medium">Closed</span>
                      )}
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
