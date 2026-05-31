'use client';
import React, { useState } from 'react';

export default function GuardApp() {
  const [scanMode, setScanMode] = useState(false);
  const [scannedCode, setScannedCode] = useState('');
  const [scanResult, setScanResult] = useState(null);

  const simulateScan = () => {
    setScanMode(true);
    setScannedCode('');
    setScanResult(null);
    
    // Simulate a 2-second scan delay
    setTimeout(() => {
      setScanMode(false);
      setScannedCode('QR-12345-VALID');
      setScanResult({
        name: 'Ramesh Kumar',
        type: 'Staff - Electrician',
        status: 'Valid',
        photo: '👤'
      });
    }, 2000);
  };

  const logEntry = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/staff/in', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ staff_name: scanResult.name, role: 'Electrician', shift: 'Morning', status: 'Inside' })
      });
      if (res.ok) {
        alert('Entry Logged Successfully!');
        setScanResult(null);
      }
    } catch (err) {
      alert('Error logging entry');
    }
  };

  return (
    <div className="p-6">
      <div className="max-w-md mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">🛡️ Security Guard Terminal</h1>
          <p className="text-gray-500 mt-1 text-sm">Scan QR Code or Barcode for Gate Entry</p>
        </div>

        <div className="bg-gray-900 text-white rounded-3xl overflow-hidden shadow-2xl border border-gray-700">
        
        {/* Scanner Viewport */}
        <div className="h-64 bg-black relative flex items-center justify-center border-b border-gray-700">
          {scanMode ? (
            <div className="w-48 h-48 border-4 border-green-500 rounded-xl relative animate-pulse">
              <div className="absolute top-0 left-0 w-full h-1 bg-green-500 animate-[scan_2s_ease-in-out_infinite]"></div>
              <p className="absolute -bottom-8 w-full text-center text-green-500 text-sm font-bold">Scanning...</p>
            </div>
          ) : scanResult ? (
            <div className="text-center">
              <span className="text-6xl">{scanResult.photo}</span>
              <p className="text-green-400 font-bold mt-4 text-xl">Match Found!</p>
            </div>
          ) : (
            <button onClick={simulateScan} className="bg-indigo-600 hover:bg-indigo-500 text-white p-4 rounded-full shadow-lg transform transition-transform hover:scale-110">
              <span className="text-3xl">📷</span>
            </button>
          )}
        </div>

        {/* Action Panel */}
        <div className="p-6">
          {!scanResult ? (
            <div className="text-center text-gray-400">
              <p>Ready to scan. Tap camera to start.</p>
            </div>
          ) : (
            <div className="space-y-4 animate-fade-in-up">
              <div className="bg-gray-700 p-4 rounded-xl">
                <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Pass Details</p>
                <h2 className="text-2xl font-bold text-white">{scanResult.name}</h2>
                <p className="text-indigo-400 font-semibold">{scanResult.type}</p>
              </div>

              <button onClick={logEntry} className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-4 rounded-xl text-lg shadow-lg">
                Mark Entry (Gate IN)
              </button>
              <button onClick={() => setScanResult(null)} className="w-full bg-transparent border border-gray-500 text-gray-300 font-bold py-3 rounded-xl hover:bg-gray-700">
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
      </div>
    </div>
  );
}
